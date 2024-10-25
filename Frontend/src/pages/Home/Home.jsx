import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Create this CSS file for custom styles
import landing from '../../assets/images/landing.png'
import feaure1 from '../../assets/images/managepond.png'
import feaure2 from '../../assets/images/calculation.png'
import feaure3 from '../../assets/images/shop.png'
import feaure4 from '../../assets/images/news.png'
import logoFeature1 from '../../assets/icon-managepond.svg'
import logoFeature2 from '../../assets/icon-calculation.svg'
import logoFeature3 from '../../assets/icon-shop.svg'
import logoFeature4 from '../../assets/icon-news.svg'
import { useAuth } from '../Login/AuthProvider';

const Home = () => {
  const navigate = useNavigate();
  const user = useAuth();
  return (
    <>
      <Container fluid className="homepage">
        <div className='landing'>
          <Row className="hero-section">
            <Col md={4} >
            <div className="text-section">
              <h1>FPT TT Koi</h1>
              <h2>Koi Care System at Home</h2>
              <p>
                This website is designed for Koi enthusiasts, offering features to assist with feeding, pond maintenance, and health monitoring, helping ensure your Koi thrive.
              </p>
              <Button className="get-sta ted" variant="primary" onClick={() => {user ?  navigate('pond') : navigate('login')} } >Get Started</Button>
            </div>
            </Col>
            <Col md={8} className="image-section">
              <img src={landing} alt="Koi" className="hero-image" />
            </Col>
          </Row>
        </div>
      </Container>

      <Container fluid className="features-section">
        <div className='feature'>
          
        <h1>Features</h1>
        <Row>
          {/* Manage Ponds */}
          <Col md={3} sm={3}>
            <Card className="h-100 text-center home-card">
              <div className="icon-container">
                <img src={logoFeature1} alt="Manage Ponds Icon" />
                <h2>Manage Pond</h2>
              </div>
              <Card.Img variant="top" src={feaure1} className="card-img-top" />
              <Card.Body>
                <Card.Text>
                  Helps users track pond details and fish health, ensuring efficient
                  management and the well-being of their Koi.
                </Card.Text>
                <Card.Footer>
                <Link to="/pond">Learn more </Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>

          {/* Calculation Tools */}
          <Col md={3} sm={3}>
            <Card className="h-100 text-center home-card">
              <div className="icon-container">
                <img src={logoFeature2} alt="Manage Ponds Icon" />
                <h2>Calculation Tools</h2>
              </div>
              <Card.Img variant="top" src={feaure2} className="p-2 card-img-top" />
              <Card.Body>
                <Card.Text>
                Helps users determine the right amount of food for Koi at different 
                growth stages and calculates the necessary salt for each pond to maintain optimal conditions.
                </Card.Text>
                <Card.Footer>
                <Link to="/calculation">Learn more </Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>

          {/* Shop */}
          <Col md={3} sm={3}>
            <Card className="h-100 text-center home-card">
              <div className="icon-container">
                <img src={logoFeature3} alt="Manage Ponds Icon" />
                <h2>Shop</h2>
              </div>
              <Card.Img variant="top" src={feaure3} className="p-2 card-img-top"  />
              <Card.Body>
                <Card.Text>
                Lets users open their own store or buy Koi-related products 
                from others, offering a marketplace for supplies, and pond equipment.
                </Card.Text>
                <Card.Footer>
                <Link to="/shop">Learn more </Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          {/* News / Blogs */}
          <Col md={3} sm={3}>
            <Card className="h-100 text-center home-card">
              <div className="icon-container">
                <img src={logoFeature4} alt="Manage Ponds Icon" />
                <h2>News/Blogs</h2>
              </div>
              <Card.Img variant="top" src={feaure4} className="p-2 card-img-top" />
              <Card.Body>
                <Card.Text>
                The "News / Blogs" feature keeps users updated with the latest news and 
                informative blogs and lets them share their own insights with the Koi community.
                </Card.Text>
                <Card.Footer>
                <Link to="/news">Learn more </Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </div>
      </Container>
    </>
  );
}

export default Home