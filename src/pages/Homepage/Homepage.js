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
import MainPost from '../../components/Main/MainPost';
import FooterMenu from '../../components/Footer/FooterMenu';


function Homepage() {

    let { path } = useRouteMatch();

    return (
        <Container fluid className='page-container'>
            <Row className='logs-header mb-1 pt-2'>
                <Col xs={6} sm={6} md={4}>
                    <BrandLogo />
                </Col>
                <Col>
                    <SearchBar />
                </Col>
                <Col xs={6} sm={6} md={4}>
                    <Menu />
                </Col>
            </Row>

            <Row className='logs-main justify-content-center'>
                <Col md={3} className='text-center'>
                    <Badge pill variant='dark'> Votre dernier post : </Badge>
                </Col>
                <Col md={6}>
                    <Row>
                        <CreatePost />
                    </Row>
                    <Row className='mt-3'>
                        <MainPost /> //Faire un compo liste qui récup tous les json (cf )
                    </Row>
                </Col>
                <Col md={3} className='text-center'>
                    <Badge pill variant='dark'> Post le plus aimé : </Badge>
                </Col>
            </Row>

            <Row className='home-footer fixed-bottom'>
                <Col md={12}>
                    <FooterMenu />
                </Col>
            </Row>
        </Container>
    );
}

export default Homepage;