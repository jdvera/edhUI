import React, { Component } from "react";
import "./Pile.css";
import { DropTarget } from 'react-dnd';
import cardback from "./images/magic_card_back.jpg";
import cardPlus from "./images/plus.jpg";

const pileTarget = {
    drop: props => props.pile
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        card: monitor.getItem(),
    };
};

class Pile extends Component {
    render() {
        const { connectDropTarget, hovered } = this.props;

        return connectDropTarget(
            <div className="pile" key={this.props.key} name={this.props.pile.name}>
                <img className="pile-img" src={hovered ? cardPlus : (this.props.pile.cards.length > 0 ? this.props.pile.cards[this.props.pile.cards.length - 1].image_uris.small : cardback)} alt="Card" />
                <div className="pile-text">
                    <h3>{this.props.pile.name}</h3>
                </div>
            </div>
        )
    }
}

export default DropTarget("card", pileTarget, collect)(Pile);
