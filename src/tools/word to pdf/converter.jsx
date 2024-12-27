import { useEffect, useState } from "react";
import "./style.css";

function WordToPDF() {
  const { files, setFiles } = useState([]);

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
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // const renderFileList = async () => {
  //   files.map((file, index) => (
  //     <li key={index}>
  //       {file.name} - {Math.round(file.size / 1024)} KB
  //     </li>
  //   ))};

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
          </form>
        </div>
      </div>
    </>
  );
}

export { WordToPDF };
