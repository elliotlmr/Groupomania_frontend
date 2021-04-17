import { useEffect, useState } from "react";
import "./FileInput.scss";

function FileInput(props/*{newFile, setNewFile}*/) {
  //const [newFile, setNewFile] = useState();
  //const [isSelected, setIsSelected] = useState(false);
  //const { getFile } = props;

  const handleChange = (event) => {
    props.setNewFile(event.target.files[0]);   
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
          name='media'
          id='photos-input'
          accept={props.accept}
          className="file-input"
          onChange={(event) => handleChange(event)}
        />
        <label
          className={
            props.newFile && props.newFile.name.length > 9
              ? `${props.class} file-label long-file`
              : `${props.class} file-label`
          }
          htmlFor='photos-input'
        >
          {props.newFile ? `${props.newFile.name.substr(0, 13)} ...` : props.text}
        </label>
      </form>
    </>
  );
}

export default FileInput;
