import './FooterMenu.scss';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap';

function FooterMenu() {
    return (
        <Breadcrumb className='footer-menu'>
            <LinkContainer to='/privacy-policy'>
                <Breadcrumb.Item> Confidentialité </Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to='/copyrights'>
                <Breadcrumb.Item> Copyrights </Breadcrumb.Item>
            </LinkContainer>
        </Breadcrumb>
    );
}

export default FooterMenu;