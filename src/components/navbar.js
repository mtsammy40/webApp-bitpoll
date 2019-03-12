import React from 'react';
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

export default class Navigation extends React.Component {
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
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Bitpoll</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/SignIn/">Sign In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Feed/">Feed</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/IDashboard/">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/VoterProfile/">Voter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/RegulatorDashboard/">Reg Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/mtsammy40">GitHub</NavLink>
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Email
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <NavLink href="/Profile">My Profile</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    Log Out
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}