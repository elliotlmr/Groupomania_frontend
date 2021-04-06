import { useState } from "react";
import "./FileInput.scss";

function FileInput(props) {
  const [filename, setFilename] = useState("");

  function handleChange(event) {
    setFilename(event.target.value.split(/(\\|\/)/g).pop());
  }

  return (
    <>
      <input
        type="file"
        name={props.name}
        id={props.id}
        accept={props.accept}
        className="file-input"
        onChange={handleChange}
      />
      <label
        className={filename.length > 10 ? "file-label long-file" : "file-label"}
        htmlFor={props.id}
      >
        {filename ? `${filename.substr(0, 13)} ...` : props.text}
      </label>
    </>
  );
}

export default FileInput;
