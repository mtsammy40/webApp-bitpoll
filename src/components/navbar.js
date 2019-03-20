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
  DropdownItem,
  Button } from 'reactstrap';
import logolsm from '../Images/logoLSm.png';

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
    const Profile = () =>{
      if(!this.props.profile){
        return <Button href="/SignIn" outline color="success">Sign In</Button>
      } else {
        return <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Profile
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                    <NavLink href="/Profile">{this.props.profile.email}</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                    <NavLink href="/Profile">Log Out</NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
      }
    }
    
    return (
      <div>
        <Navbar color="light" light expand="md" className="zindex">
          <NavbarBrand href="/"><img src={logolsm} alt="Logo" width="200px"></img></NavbarBrand>
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
                <NavLink href="/LoggingIn/">Logging In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/RegulatorDashboard/">Reg Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/mtsammy40">GitHub</NavLink>
              </NavItem>
              <Profile></Profile>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}