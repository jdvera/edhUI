import React, { Component } from "react";
import "./Sidebar.css";
import cardPlus from "./images/plus.jpg";
import Pile from "../Pile";

class GroupForm extends Component {

    componentDidMount = () => {
        if (!this.props.state.commander) {
            this.props.getCommander();
        }
    }

    render() {
        const commanderObj = this.props.state.commander || null;
        const newPile = {
            name: "New Pile",
            cards: [{
                image_uris: {
                    small: cardPlus
                }
            }]
        };

        return (
            <div className="sidebar-container">
                <div className="piles-container" >
                    {this.props.state.pilesArr.map((pile, index) =>
                        <div key={index} onClick={() => this.props.showPileContents(index)}>
                            <Pile pile={pile} key={index} />
                        </div>
                    )}
                    <Pile pile={newPile} />
                </div>

                <div className="commander-div">
                    <img src={commanderObj ? commanderObj.image_uris.art_crop : ""} alt="Commander " />
                    <h3>Deck Title</h3>
                </div>
            </div>
        );
    }
}

export default GroupForm;