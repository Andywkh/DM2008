import React, { useEffect, useState } from "react";

import { Container } from "semantic-ui-react";
import { List, Header} from "semantic-ui-react";

import picture from "./images/picture.png"

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            highScoreNameValues: [],
            highScoreLengthValues: []
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState(this.fetchScore()), 1000);
    }

    fetchScore() {
        const pointerToThis = this;
        console.log(pointerToThis);
        let API_Call = "/scores";
        let highScoreNameFunction = [];
        let highScoreLengthFunction = [];
       
        fetch(API_Call)
          .then(
            function(response) {
              return response.json();
            }
          )
          .then(
            function(data) {
                console.log(data);    
    
                const object = Object.values(data);
                const array = object[0];
                console.log(array);
    
                for (let i=0; i<array.length;i++) {
                  
                    highScoreNameFunction.push(array[i].scorerName);
                    highScoreLengthFunction.push(array[i].scorerLength);
                  
                }         
    
                pointerToThis.setState({
                    highScoreNameValues: highScoreNameFunction,
                    highScoreLengthValues: highScoreLengthFunction
                });
            }
          )
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }  

    /*
    render() {
        return (
            <Container style={{ marginTop: 40 }}>
                <List>
                   <List.Item key={this.state.highScoreNameValues}>
                        <Header>{this.state.highScoreNameValues}</Header>
                    </List.Item>
                </List>
            </Container>
        );
    }
    */
   render() {
    return (
        <div>
            <img src={picture} />
        </div>
    );
}
}

export default Board;