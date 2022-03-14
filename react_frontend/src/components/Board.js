import React, { useEffect, useState } from "react";

import { Container } from "semantic-ui-react";
import { List, Header, Image} from "semantic-ui-react";

import './style/Board.css'

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            highScoreNameValues: [],
            highScoreLengthValues: 0,
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
        let highScoreNameMax = [];
        let highScoreLengthMax = [];
       
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
                  
                    highScoreNameMax.push(array[i].scorerName);
                    highScoreLengthMax.push(array[i].scorerLength);
            
                }   

                console.log(highScoreNameMax);
                console.log(highScoreLengthMax);

                var max = Math.max.apply(null, highScoreLengthMax);

                console.log(max);
                var indexing = highScoreLengthMax.indexOf(max);

                console.log(indexing);

                highScoreNameFunction.push(highScoreNameMax[indexing]);
                highScoreLengthFunction.push(highScoreLengthMax[indexing]);

                console.log(highScoreNameMax[indexing])
                console.log(highScoreLengthMax[indexing])

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

    render() {
        return (
            <Container className="Container" style={{ marginTop: 40 }}>
                <List className="Board" horizontal relaxed>
                    <List.Item>
                        {this.state.highScoreNameValues}
                    </List.Item>
                    <List.Item>
                        {this.state.highScoreLengthValues}
                    </List.Item>
                </List>
            </Container>
        );
    }

}

export default Board;