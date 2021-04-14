import { useEffect, useState } from "react";
import "./FileInput.scss";

function FileInput(props, {newFile, setNewFile}) {
  //const [newFile, setNewFile] = useState();
  //const [isSelected, setIsSelected] = useState(false);
  //const { getFile } = props;

  const handleChange = (event) => {
    setNewFile(event.target.files[0]);   
  };

  return (
    <>
      <form
        action="/"
        method="post"
        encType="multipart/form-data"
        target="_self"
      >
        <input
          type="file"
          name={props.filename}
          id={props.id}
          accept={props.accept}
          className="file-input"
          onChange={(event) => handleChange(event)}
        />
        <label
          className={
            newFile && newFile.name.length > 10
              ? "file-label long-file"
              : "file-label"
          }
          htmlFor={props.id}
        >
          {newFile ? `${newFile.name.substr(0, 13)} ...` : props.text}
        </label>
      </form>
      <button onClick={() => console.log(newFile)} />
    </>
  );
}

export default FileInput;
