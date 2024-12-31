import { useEffect, useState } from "react";
import axios from "axios";
import download from "downloadjs";
import Nav from "/src/components/navbar/navbar.jsx";
import "./style.css";

function WordToPDF() {
  const [files, setFiles] = useState([]);
  const [base63Str, setBase64Str] = useState(null);
  const [responseApi, setResponseApi] = useState(null);
  const [reverse, setReverse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("file =", files);
  }, [files]);

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
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      if (file.size > 1024 * 1024 * 10) {
        alert("File size is too large. Please select a file less than 10MB.");
        return;
      }
      setFiles((prevFiles) => [...prevFiles, file]);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        const base64String = result.split(",")[1];
        setBase64Str(base64String);
      };

      reader.readAsDataURL(selectedFiles[0]);
    }
  };

  // Api call
  async function handleConvert() {
    const apiToken = "secret_ly9ehTQfZfOrNuEd";
    const url = reverse
      ? "https://v2.convertapi.com/convert/pdf/to/docx"
      : "https://v2.convertapi.com/convert/doc/to/pdf";
    setIsLoading(true);
    axios
      .post(
        url,
        {
          Parameters: [
            {
              Name: "File",
              FileValue: {
                Name: files[0].name,
                Data: base63Str,
              },
            },
            {
              Name: "StoreFile",
              Value: true,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setResponseApi(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  const handleDownload = () => {
    if (responseApi) {
      console.log(responseApi.Files[0].Url);
      const fileUrl = responseApi.Files[0].Url;

      fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const fileName = responseApi.Files[0].Name;
          download(blob, fileName, "application/pdf");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleReverse = () => {
    setReverse(!reverse);
    console.log("reverse", reverse);
  };

  const loader = () => {
    if (isLoading === true) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return <div className="loader"></div>;
    }
  };

  return (
    <>
      <div
        className="area"
        onDragEnter={preventDefault}
        onDragOver={preventDefault}
        onDrop={handleDrop}
      >
        <h1>{reverse ? "Pdf to Word" : "Word to Pdf"}</h1>
        <div id="drop-area">
          {loader()}
          <form action="POST">
            <label htmlFor="file">{reverse ? "Pdf" : "Word"}</label>
            <input
              type="file"
              name="file"
              id="file"
              accept={reverse ? ".pdf" : ".doc,.docx"}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file" id="button">
              {" "}
              Select File
            </label>
            {files.length > 0 &&
              (responseApi ? (
                <input
                  type="button"
                  value="Download"
                  className="button"
                  onClick={handleDownload}
                />
              ) : (
                <input
                  type="button"
                  value="Convert"
                  className="button"
                  onClick={handleConvert}
                />
              ))}
            {/* <input type="button" value="Convert" onClick={handleConvert} className="button" /> */}
          </form>
          <button id="Reverse" onClick={handleReverse}>
            ~<p>Reverse</p>
          </button>
        </div>
        <ul id="file-list">
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      <div className="navbar">
        <Nav />
      </div>
    </>
  );
}

export default WordToPDF ;
