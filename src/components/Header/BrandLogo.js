import { Navbar, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../images/logo-black.png';
import './BrandLogo.scss';

function BrandLogo() {
    return (
        <LinkContainer to='/homepage'>
            <Navbar.Brand>
                <Image src={logo} fluid id='brand-logo' />
            </Navbar.Brand>
        </LinkContainer>
    );
}

export default BrandLogo;