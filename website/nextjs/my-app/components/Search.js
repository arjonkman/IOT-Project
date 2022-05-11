import { Form } from "react-bootstrap";


function handleChange(e) {
    console.log(e.target.value);
}

export default function Search() {
    return (
        <form>
            <Form.Control onChange={handleChange} type='text' placeholder='Search' />
        </form>
    );
}