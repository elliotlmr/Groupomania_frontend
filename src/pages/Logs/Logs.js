import { 
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from 'react-router-dom';
import {withRouter} from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import './Logs.scss';

//Components
import BrandLogo from '../../globals/Header/BrandLogo';
import LogMenu from './components/LogMenu';
import LoginCard from './components/LoginCard';
import SignupCard from './components/SignupCard';
import FooterMenu from '../../globals/Footer/FooterMenu';

function Logs(props) {

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

            <Row className='logs-footer fixed-bottom'>
                <Col md={4}>
                    <FooterMenu />
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(Logs);