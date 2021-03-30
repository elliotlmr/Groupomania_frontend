import { useState } from "react";
import "./FileInput.scss";

function FileInput(props) {
  /*const file = document.querySelector("#media-input");
  file.addEventListener("change", (e) => {
    // Get the selected file
    const [file] = e.target.files;
    // Get the file name and size
    const { name: fileName, size } = file;
    // Convert size in bytes to kilo bytes
    const fileSize = (size / 1000).toFixed(2);
    // Set the text content
    const fileNameAndSize = `${fileName} - ${fileSize}KB`;
    document.querySelector(".file-name").textContent = fileNameAndSize;
  });*/

  const [filename, setFilename] = useState('');

  function handleChange(event) {
	  const [file] = event.target.files;
	  const { name: fileName, size } = file;
	  const fileSize = (size / 1000).toFixed(2);
	  const fileNameAndSize = `${fileName} - ${fileSize}KB`;
	  return setFilename = fileNameAndSize;
  }

  return (
    <>
      <input
        type="file"
        name="file"
        id="media-input"
        className="file-input"
        onChange={handleChange}
      />
      <label className="file-label" htmlFor="media-input">
        {props.text}
        <p className="file-name"> {filename} </p>
      </label>
    </>
  );
}

export default FileInput;
