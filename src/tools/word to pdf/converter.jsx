import { useEffect, useState } from "react";
import axios from "axios";
import Nav from '/src/components/navbar/navbar.jsx';
import "./style.css";

function WordToPDF() {
  const [ files, setFiles ] = useState([]);
  const [base63Str, setBase64Str] = useState(null);
  const [responseApi, setResponseApi] = useState(null);

  useEffect(()=> {
    console.log("file =", files);
  },[files]);

  const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    preventDefault(e);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if(selectedFiles.length > 0) {
      const file = selectedFiles[0];
      if (file.type !== 'application/msword' && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        alert("Invalid file type. Please select a .doc or .docx file.");
        return;
      }
      if(file.size > 1024 * 1024 * 10) {
        alert("File size is too large. Please select a file less than 10MB.");
        return;
      }
      setFiles((prevFiles) => [...prevFiles, file]);

      const reader = new FileReader();
      reader.onload = (e) => {
          const result = e.target.result;
          const base64String = result.split(',')[1];
          setBase64Str(base64String);
      };

      reader.readAsDataURL(selectedFiles[0]);
    }
  };

  // Api call 
   async function handleConvert(){
      const apiToken = 'secret_ly9ehTQfZfOrNuEd';
      const url = 'https://v2.convertapi.com/convert/doc/to/pdf';

      axios.post(url, {
        Parameters: [
          {
            Name: 'File',
            FileValue: {
              Name: files[0].name,
              Data: base63Str
            }
          },
          {
            Name: 'StoreFile',
            Value: true
          }
        ]
      },{
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        setResponseApi(res.data);
        console.log(res);
      }).catch((err) => {
        console.error(err);
        throw err;
      })
    };

    const handleDownload = () => {
      if(responseApi) {
        console.log(responseApi.Files[0].Url);
        const link = responseApi.Files[0].Url;
      //  window.open(link, '_blank', 'noopener,noreferrer');
      }
    }
    
  return (
    <>
      <div
        className="area"
        onDragEnter={preventDefault}
        onDragOver={preventDefault}
        onDrop={handleDrop}
      >
        <h1>word to pdf</h1>
        <div id="drop-area">
          <form action="POST">
            <label htmlFor="file">Word File</label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".doc,.docx"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {/* <ul>{renderFileList()}</ul> */}
            <label htmlFor="file" id="button">
              {" "}
              Select File
            </label>
            {
              responseApi? (
                <input type="button" value="Downloads"className="button" onClick={handleDownload}/>
              ) : (<input type="button" value="Convert" onClick={handleConvert} className="button" />)
            }
            {/* <input type="button" value="Convert" onClick={handleConvert} className="button" /> */}
          </form>
        </div>
        <ul id="file-list">{files.map((file, index) => <li key={index}>{file.name}</li>) }</ul>
      </div>
      <div className="navbar">
        <Nav />
      </div>
    </>
  );
}

export { WordToPDF };
