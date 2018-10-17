import React, { Component } from "react";
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import "./Main.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Grid from "../../components/Grid";
import API from "../../utils/API";
import cardback from "./images/magic_card_back.jpg";

class Main extends Component {
    state = {
        search: "",
        prevSearch: "",
        searchMessage: null,
        commander: null,
        resultsArr: [],
        showForm: false,
        cardObj: null,
        newGroupName: "",
        pilesArr: [
            { name: "ramp", cards: [] },
            { name: "boardwipes", cards: [] },
            { name: "spot removal", cards: [] },
            { name: "sac outlets", cards: [] },
            { name: "lords", cards: [] },
            { name: "graveyard hate", cards: [] },
            { name: "card draw", cards: [] }
        ],
        idArr: [],
        pileToShow: null
    };

    getCommander = () => {
        if (this.state.commander === null) {
            const reqObj = { name: "Slimefoot" };
            API.search(reqObj).then(response => this.setState({ commander: JSON.parse(response).data[0] }));
        }
    }

    handleInputChange = event => {
        let { name, value } = event.target;
        this.setState({
            [name]: value,
            message: ""
        });
    };

    handleSearch = () => {
        const { search, prevSearch } = this.state;
        if (search !== prevSearch) {
            const reqObj = { name: this.state.search };
            API.search(reqObj).then(response => {
                const newRes = [].concat(JSON.parse(response).data);
                const { idArr } = this.state;
                for (let i = 0; i < newRes.length; i++) {
                    if (!newRes[i].image_uris) {
                        console.log("added uris");
                        newRes[i].image_uris = { small: cardback };
                    }
                    else if (!newRes[i].image_uris.small) {
                        console.log("added small");
                        newRes[i].image_uris.small = cardback;
                    }

                    if (idArr.includes(newRes[i].id)) {
                        newRes[i].background = true;
                    }
                }
                this.setState({
                    prevSearch: search,
                    searchMessage: null,
                    resultsArr: newRes,
                    pileToShow: null
                });
            }).catch(err => {
                if (err.statusCode === 404) {
                    this.setState({
                        searchMessage: "No results :("
                    });
                }
            });
        }
        else {
            this.setState({
                pileToShow: null
            });
        }
    };

    handleOverlay = overlayObj => {
        this.setState(overlayObj);
    };

    handleDrop = (cardObj, pileObj) => {
        if (pileObj.name === "New Pile") {
            const stateObj = {
                resultsArr: this.state.resultsArr,
                idArr: this.state.idArr,
                showForm: true,
                cardObj
            };
            const resultIndex = this.state.resultsArr.findIndex(card => card.id === cardObj.id);
            stateObj.resultsArr[resultIndex].background = true;
            stateObj.idArr.push(cardObj.id);

            this.handleOverlay(stateObj);
        }
        else {
            const pileIndex = this.state.pilesArr.findIndex(pile => pile.name === pileObj.name);
            const cardIndex = this.state.pilesArr[pileIndex].cards.findIndex(card => card.id === cardObj.id);
            if (cardIndex === -1) {
                const resultIndex = this.state.resultsArr.findIndex(card => card.id === cardObj.id);

                const stateObj = {
                    idArr: this.state.idArr,
                    resultsArr: this.state.resultsArr,
                    pilesArr: this.state.pilesArr
                };

                stateObj.resultsArr[resultIndex].background = true;
                stateObj.pilesArr[pileIndex].cards.push(cardObj);
                stateObj.idArr.push(cardObj.id);

                this.setState(stateObj);
            }
        }
    };

    showPileContents = key => {
        this.setState({ pileToShow: key });
    }

    createNewGroup = () => {
        const newObj = {
            name: this.state.newGroupName,
            cards: [this.state.cardObj]
        }
        const { pilesArr, idArr } = this.state;
        pilesArr.push(newObj);
        idArr.push(this.state.cardObj.id);
        this.setState({
            cardObj: null,
            showForm: false,
            newGroupName: "",
            pilesArr,
            idArr
        })
    }

    render() {
        return (
            <div className="main-container">
                <Header handleInputChange={this.handleInputChange} handleSearch={this.handleSearch} />
                <div className="content-container">
                    <Grid state={this.state} handleDrop={this.handleDrop} />
                    <Sidebar getCommander={this.getCommander} showPileContents={this.showPileContents} state={this.state} />
                </div>

                <div id="new-group-form" style={{ display: this.state.showForm ? "block" : "none" }}>
                    New Group Name: <br />
                    <input id="new-group-name" name="newGroupName" value={this.state.newGroupName} onChange={this.handleInputChange} />
                    <button onClick={this.createNewGroup}>Submit</button>
                </div>
                <div id="overlay-background" style={{ display: this.state.showForm ? "block" : "none" }} onClick={() => this.handleOverlay({ showForm: false })}></div>
            </div>
        );
    };
}

export default DragDropContext(HTML5Backend)(Main);

