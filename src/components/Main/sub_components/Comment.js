import { Card } from "react-bootstrap";

function Comment(props) {
    return (
        <Card id={props.id} className='w-100'>
            <Card.Body className='pt-0'>
                <Card.Title className='mb-2 text-muted'>
                    {props.author}
                </Card.Title>
                <Card.Text>
                    {props.comment}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Comment;