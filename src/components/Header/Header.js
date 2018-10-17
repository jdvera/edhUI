import React, { Component } from "react";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {

    // componentDidMount = () => {
    //     console.log("Header");
    // }

    render() {
        // const commanderObj =  this.props.state.commander || null;

        return (
            <div className="header-container">


                <input name="search" className="search-input" placeholder="Search" onChange={this.props.handleInputChange} />
                <button className="search-button" onClick={this.props.handleSearch}>Submit</button>

                <div className="options"><FontAwesomeIcon icon="stroopwafel" /></div>

                MtG Brewer
            </div>
        );
    }
}

export default Header;