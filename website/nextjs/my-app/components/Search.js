import { Form, InputGroup, FormControl, Button } from "react-bootstrap";


// create a search component that can be used to search for rooms
export default function Search() {
    return (
        <Form action="/" method="get">
            <input
            type="text"
            id="header-search"
            placeholder="Zoek een kamer"
            name="kamer" 
            />
        </Form>
   );
}