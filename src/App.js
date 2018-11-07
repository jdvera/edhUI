import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

class App extends Component {

  render() {
		return (
			<div>
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/">MtG Brewer</a>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav>
						<NavItem eventKey={1} href="#">
							Link1
						</NavItem>
						<NavItem eventKey={2} href="#">
							Link2
						</NavItem>
						<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>Action</MenuItem>
							<MenuItem eventKey={3.2}>Another action</MenuItem>
							<MenuItem eventKey={3.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.4}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
				</Navbar>

				<Router>
					<Switch>
						<Route exact path="/" component={Main} />
						{/* <Route path="/join" component={Main} />
						<Route component={FourOhFour} /> */}
					</Switch>
				</Router>
			</div>
    );
  }
}

export default App;
