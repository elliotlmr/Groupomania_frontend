import './LogMenu.scss';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';

function LogMenu() {

    let { url } = useRouteMatch();

    return (
        <Navbar sticky='top' bg='light' expand='md' id='log-menu'>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    <LinkContainer to={`/signup`}>
                        <Nav.Link> Inscription </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={`/`}>
                        <Nav.Link> Connexion </Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default LogMenu;