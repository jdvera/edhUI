import React from "react";
import "./Grid.css";
import Card from "../Card";

const Grid = props =>
    <div className="grid-container">
        {props.state.searchMessage ? <p>{props.state.searchMessage}</p> :
            (props.state.pileToShow !== null ?
            props.state.pilesArr[props.state.pileToShow].cards.map((card, index) =>
                <div className="card" key={index}>
                    <img src={card.image_uris.small} alt="Card" />
                    <p>{card.name}</p>
                </div>
            )
            :
            props.state.resultsArr.map((result, index) => {
                const backgroundColor = result.background ? "lightblue" : "lightgreen";

                return (
                    <div className="card" style={{ backgroundColor }} key={index}>
                        <Card result={result} key={index} handleDrop={props.handleDrop} img={result.image_uris.small} />
                        <p>{result.name}</p>
                    </div>
                );
            })
        )}
    </div>

export default Grid;