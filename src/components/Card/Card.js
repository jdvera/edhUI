import React, { Component } from "react";
import "./Card.css";
import { DragSource } from 'react-dnd';

const cardSource = {
    beginDrag: props => props.result,
    endDrag: (props, monitor, component) => {
        if (!monitor.didDrop()) {
            return;
        }
        return props.handleDrop(props.result, monitor.getDropResult());
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
};

class Card extends Component {
    render() {
        const { isDragging, connectDragSource, img } = this.props;

        return connectDragSource(
            <img src={img} style={{ opacity: isDragging ? 0.1 : 1 }} alt="Card" />
        )
    }
}

export default DragSource("card", cardSource, collect)(Card);