import { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import axios from "axios";

function ModifyPost(props) {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [newText, setNewText] = useState("");
  const { finishModify } = props;

  function textIsValid() {
    return newText.length > 1;
  }

  function handleModify(e) {
    e.preventDefault(e);

    axios
      .put(
        `http://localhost:1331/api/posts/${props.postId}`,
        {
          description: newText,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        finishModify(res.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <InputGroup>
      <FormControl
        placeholder={props.placeholder}
        aria-label="Modifiez votre commentaire .."
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          type="button"
          onClick={(e) => handleModify(e)}
          disabled={!textIsValid()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default ModifyPost;
