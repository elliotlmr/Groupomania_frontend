import { 
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Logs.scss';

//Components
import BrandLogo from '../../components/Header/BrandLogo';
import LogMenu from '../../components/Header/LogMenu';
import LoginCard from '../../components/Main/LoginCard';
import SignupCard from '../../components/Main/SignupCard';

function Logs() {

    let { path } = useRouteMatch();

    return (
        <Container className='page-container'>
            <Row className='logs-header mb-1 pt-2'>
                <Col xs={6} sm={6} md={4}>
                    <BrandLogo />
                </Col>
                <Col xs={6} sm={6} md={{ span: 4, offset: 4 }}>
                    <LogMenu />
                </Col>
            </Row>

            <Row className='logs-main align-items-center justify-content-center'>
                <Col md={{ span: 6}}>
                    <Switch>
                        <Route path={`/signup`}>
                            <SignupCard />
                        </Route>
                        <Route path={`/`}>
                            <LoginCard />
                        </Route>
                    </Switch>
                </Col>
            </Row>

            <Row className='logs-footer mt-auto'>
                <Col md={12}>
                    <p>
                        footer
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Logs;