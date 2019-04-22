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
  Button
} from 'reactstrap';
import logolsm from '../Images/logoLSm.png';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.logout.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logout() {
    Axios.get('http://35.202.24.146:3002/auth/logout', { withCredentials: true })
      .then(res => {
        console.log('logout', res);
        var loggedOut = true;
        this.setState({ loggedOut });
      })
      .catch(e => console.error('this logout error', e));
  }
  render() {
    if (this.state.loggedOut) {
      return <Redirect to="/" />
    }
    const Specialized = () => {
      if(this.props.profile){

        switch (this.props.profile.$class) {
          case 'org.bitpoll.net.Voter':
            return <span> <NavItem>
              <NavLink href="/VoterProfile/">Voter</NavLink>
            </NavItem>
              <NavItem>
                <NavLink href="/Feed/">Feed</NavLink>
              </NavItem>
            </span>
          case 'org.bitpoll.net.Admin':
            return <div>
              <NavItem>
                <NavLink href="/IDashboard/">Dashboard</NavLink>
              </NavItem>
            </div>
          case 'org.bitpoll.net.Regulator':
            return <div>
              <NavItem>
                <NavLink href="/RegulatorDashboard/">Reg Dashboard</NavLink>
              </NavItem>
            </div>
          default:
        }
        }else{
          return  <NavItem>
          <NavLink>Loading Nav Items...</NavLink>
        </NavItem>
      }
      
    }
    const Profile = () => {
      if (!this.props.profile) {
        return <Button href="/SignIn" outline color="success">Sign In</Button>
      } else {
        return <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Profile
                  </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <NavLink href="/" onClick={e => this.logout}>Log Out</NavLink>
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
                <NavLink href="/LoggingIn/">Logging In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/DumbFeed/">General Feed</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="https://github.com/mtsammy40">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={e => this.logout()}>logout</NavLink>
              </NavItem>
              <Profile></Profile>
              <Specialized></Specialized>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}