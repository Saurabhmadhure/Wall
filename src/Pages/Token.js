import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "../Component/Card";

function Token() {
  return (
    <Card>
      <h1 align="center">Verify YourSelf</h1>
      <Form bg="dark" variant="dark">
        <Form.Group className="mb-1">
          <Form.Label>Insert Token</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">Check your Entered mail</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default Token;
