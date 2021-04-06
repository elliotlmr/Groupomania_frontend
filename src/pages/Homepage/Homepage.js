import './Homepage.scss';
import { 
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import BrandLogo from '../../globals/Header/BrandLogo';
import SearchBar from '../../globals/Header/SearchBar';
import Menu from '../../globals/Header/Menu';
import CreatePost from './components/CreatePost';
import PostsList from './components/Posts/PostsList';
import FooterMenu from '../../globals/Footer/FooterMenu';


function Homepage() {
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage);

    return (
        <Container fluid className='page-container homepage'>
            <Row className='logs-header mb-1 pt-2'>
                <Col xs={6} sm={6} md={3}>
                    <BrandLogo />
                </Col>
                <Col>
                    <SearchBar md={6} />
                </Col>
                <Col xs={6} sm={6} md={3}>
                    <Menu />
                </Col>
            </Row>

            <Row className='logs-main justify-content-center'>
                <Col md={3} className='text-center'>
                    <Badge pill variant='dark'> Votre dernier post : </Badge>
                </Col>
                <Col md={6} className='px-5'>
                    <Row>
                        <CreatePost profilePicture={user.profile_picture} />
                    </Row>
                    <Row className='mt-3 justify-content-center'>
                        <PostsList />
                    </Row>
                </Col>
                <Col md={3} className='text-center'>
                    <Badge pill variant='dark'> Post le plus aimé : </Badge>
                </Col>
            </Row>

            <Row className='home-footer fixed-bottom'>
                <Col md={4}>
                    <FooterMenu />
                </Col>
            </Row>
        </Container>
    );
}

export default Homepage;