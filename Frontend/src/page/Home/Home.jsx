import { Container, Row, Col, Button } from 'react-bootstrap';
import './Home.css'; // Create this CSS file for custom styles
import landing from '../../assets/landing-pic.png'
import feaure1 from '../../assets/managepond.png'
import feaure2 from '../../assets/calculation.png'
import feaure3 from '../../assets/shop.png'
import feaure4 from '../../assets/news-pic.png'

function Home() {
    
  return (
    <>
         <Container fluid className="homepage">
            <div className='landing'>
      <Row className="hero-section">
        <Col md={4} className="text-section">
          <h1>FPT TTKoi</h1>
          <h2>Koi Care System at Home</h2>
          <p>
            This website is designed for Koi enthusiasts, offering features to assist with feeding, pond maintenance, and health monitoring, helping ensure your Koi thrive.
          </p>
          <Button variant="primary">Get Started</Button>
        </Col>
        <Col md={8} className="image-section">
          <img src={landing} alt="Koi" className="hero-image" />
        </Col>
      </Row>
            </div>
      <Row className="features-section">
        <h2>Features</h2>
        <Col md={3} className="feature">
          <h3>Manage Ponds</h3>
          <img src={feaure1} alt="Koi" className='feature-img'></img>
          <p>Helps users track pond details and fish health, ensuring efficient management and the well-being of their Koi.</p>
          <Button variant="link">Learn more</Button>
        </Col>
        <Col md={3} className="feature">
          <h3>Calculation Tools</h3>
          <img src={feaure2} alt="Koi" className='feature-img'></img>
          <p>Helps users determine the right amount of food for Koi at different growth stages and calculates the necessary salt for each pond to maintain optimal conditions.</p>
          <Button variant="link">Learn more</Button>
        </Col>
        <Col md={3} className="feature">
          <h3>Shop</h3>
          <img src={feaure3} alt="Koi" className='feature-img'></img>
          <p>Lets users open their own store or buy Koi-related products from others, offering a marketplace for supplies and pond equipment.</p>
          <Button variant="link">Learn more</Button>
        </Col>
        <Col md={3} className="feature">
          <h3>News / Blogs</h3>
          <img src={feaure4} alt="Koi" className='feature-img'></img>
          <p>The "News / Blogs" feature keeps users updated with the latest news and informative blogs and lets them share their own insights with the Koi community.</p>
          <Button variant="link">Learn more</Button>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Home