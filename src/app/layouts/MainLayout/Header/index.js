import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import './Header.scss'

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render(){
        const {username, onSignOut } = this.props;
        return (
            <div>
                <Navbar className="main-header" dark expand="md">
                <NavbarBrand href="/">RESTAURANT APP</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link className="nav-link" to="/browse">Browse</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/my-collections">My Collection</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="https://github.com/gilvent/restaurant-app-frontend">GitHub</Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                        {username}
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem onClick={onSignOut}>
                            Sign Out
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    }
}



export default Header;