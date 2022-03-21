import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-center text-white text-lg-start">
      <Container className="p-4">
        <Row>
          <Col lg={12} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Footer text</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </p>
          </Col>
          <Col lg={12} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Footer text</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </p>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3">
        <p>© 2022 Copyright:</p>
        <a className="text-light" href="https://ettudo.com/">
          Ettudo.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
