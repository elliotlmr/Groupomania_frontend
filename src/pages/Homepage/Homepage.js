import './Homepage.scss';
import { 
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import BrandLogo from '../../components/Header/BrandLogo';
import SearchBar from '../../components/Header/SearchBar';
import Menu from '../../components/Header/Menu';
import CreatePost from '../../components/Main/CreatePost';
import PostsList from '../../components/Main/PostsList';
import FooterMenu from '../../components/Footer/FooterMenu';


function Homepage() {

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
                        <CreatePost profilePicture='PPTest' />
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