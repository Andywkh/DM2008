import React from 'react'
import p5 from 'p5'

class Sketch extends React.Component {

    constructor(props) {
        super(props)
        //p5 instance mode requires a reference on the DOM to mount the sketch
        //So we use react's createRef function to give p5 a reference
        this.myRef = React.createRef()

        this.state = {
            
            directionValues: [],
            globalVariable: 2,

            startValues: [],
            startVariable: 0,

            scoreValues: []
        }
    }

    fetchScore() {
        const pointerToThis = this;
        console.log(pointerToThis);
        let API_Call = "/directions";
        let directionFunction = [];
        let startFunction = [];
       
        console.log(this.state.startVariable);
        console.log(this.state.globalVariable);

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
                
                directionFunction.pop();
                directionFunction.push(array[0].stickDirection);
                startFunction.push(array[0].buttonPressed);
    
                pointerToThis.setState({
                    directionValues: directionFunction,
                    startValues: startFunction
                });

            }
          )
        
        console.log("Button Value");
        console.log(this.state.startFunction);
        console.log(this.state.startVariable);
        console.log("Direction Value");
        console.log(this.state.directionFunction);
        console.log(this.state.directionValues[0]);
        if (this.state.directionValues[0] === 1) {
            this.state.globalVariable = 1;
            console.log(1);
        }
        if (this.state.directionValues[0] === 2) {
            this.state.globalVariable = 2;
            console.log(2);
        }
        if (this.state.directionValues[0] === 3) {
            this.state.globalVariable = 3;
            console.log(3);
        }
        if (this.state.directionValues[0] === 4) {
            this.state.globalVariable = 4;
            console.log(4);
        }
        if (this.state.startValues[0] === 1) {
            this.state.startVariable = 1;
        }
    }

    // Post Score to ScoreBoard

    postScore(score) {
        fetch('http://127.0.0.1:5000/add_score', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "scorerName": "Player2",
                "scorerLength": score,
            })
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // This uses p5's instance mode for sketch creation and namespacing
    Sketch = (p) => {

        const W = 1200, H = 600; // dimensions of canvas

        function Snake() {
            this.x = 0;
            this.y = 0;
            this.xspeed = 1;
            this.yspeed = 0;
            this.total = 0;
            this.tail = [];
            this.score = 0;
          
            this.eat = function(pos) {
              let d = p.dist(this.x, this.y, pos.x, pos.y);
              if (d < 1) {
                this.total++;
                return true;
              } else {
                return false;
              }
            };
          
            this.dir = function(x, y) {
              this.xspeed = x;
              this.yspeed = y;
            };
          
            this.death = function() {
              for (let i = 0; i < this.tail.length; i++) {
                let pos = this.tail[i];
                let d = p.dist(this.x, this.y, pos.x, pos.y);
                if (d < 1) {
                  //console.log('starting over');
                  this.score = this.tail.length+1
                  p.deathRestart();
                }
              }
            };
          
            this.update = function() {
              for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
              }
              if (this.total >= 1) {
                this.tail[this.total - 1] = p.createVector(this.x, this.y);
              }
          
              this.x = this.x + this.xspeed * scl;
              this.y = this.y + this.yspeed * scl;
          
              this.x = p.constrain(this.x, 0, W - scl);
              this.y = p.constrain(this.y, 0, H - scl);
            };
          
            this.show = function() {
              p.fill(255);
              for (let i = 0; i < this.tail.length; i++) {
                p.rect(this.tail[i].x, this.tail[i].y, scl, scl);
              }
              p.rect(this.x, this.y, scl, scl);
            };
        }

        var gameScreen = 0;

        var s;
        var scl = 20;
        var food;

        // Native p5 functions work as they would normally but prefixed with 
        // a p5 object "p"
        p.setup = () => {
            //Everything that normally happens in setup works
            p.createCanvas(W,H)
            
            //p.size(720,400)
            p.background(100)
            
            s = new Snake();
            p.frameRate(15);
            p.pickLocation();
            
        }
        
        p.pickLocation = () => {
            //var cols = p.floor(width / scl);
            var cols = p.floor(W / scl);
            //var rows = p.floor(height / scl);
            var rows = p.floor(H / scl);
            food = p.createVector(p.floor(p.random(cols)), p.floor(p.random(rows)));
            food.mult(scl);
        }

        p.startGame = () => {
            gameScreen=1;
        }

        p.deathRestart = () => {
            gameScreen=2;
        }

        p.draw = () => {
            // And everything that normally goes in draw in here
            //p.background(0)
            //p.circle(p.mouseX, p.mouseY, 50)
            
            //console.log(this.state.globalVariable);

            if (gameScreen === 0) {
                if (this.state.startVariable === 1) {
                    p.startGame();
                }
            }

            // gameScreen integration
            if (gameScreen === 0) {
                p.initScreen();
            } else if (gameScreen === 1) {
                p.gameScreen();
            } else if (gameScreen === 2) {
                p.gameOverScreen();
            }

            if (this.state.globalVariable === 1) {
                s.dir(0, -1);
            } else if (this.state.globalVariable === 2) {
                s.dir(0, 1);
            } else if (this.state.globalVariable === 3) {
                s.dir(1, 0);
            } else if (this.state.globalVariable === 4) {
                s.dir(-1, 0);
            }
        }

        //function initScreen() {
        p.initScreen = () => {
            p.background(236, 240, 241);
            p.textAlign(p.CENTER);
            p.fill(52, 73, 94);
            p.textSize(70);
            p.text("DM2008 Snake Game", W/2, H/2);
            p.textSize(15); 
            p.text("Click to start", W/2, H-30);
        }

        //function gameScreen() {
        p.gameScreen = () => {
            p.background(0);
    
            if (s.eat(food)) {
                p.pickLocation();
            }
            s.death();
            s.update();
            s.show();
            p.fill(255, 0, 100);
            p.rect(food.x, food.y, scl, scl);
        }

        var delayInMilliseconds = 3000; //1 second

        //function gameOverScreen() {
        p.gameOverScreen = () => {
            p.background(44, 62, 80);
            p.textAlign(p.CENTER);
            p.fill(236, 240, 241);
            p.textSize(12);
            //p.text("Your Score", W/2, H/2 - 120);
            p.text("Visit /scoreBoard to see best player", W/2, H/2 - 120);
            this.state.startVariable = 0;
            p.textSize(120);
            //console.log(s.tail.length+1)
            p.text(s.score, W/2, H/2 + 120);
            console.log(s.score);
            this.postScore(s.score);
            s.total = 0;
            s.tail = [];
            p.textSize(130);
            //p.text(p.s.tail.length, W/2, H/2);
            
            setTimeout(function() {
                gameScreen = 0;
            }, delayInMilliseconds);
        }

        //p.keyPressed = () => {
        //    if (p.keyCode === p.UP_ARROW) {
        //        s.dir(0, -1);
        //    } else if (p.keyCode === p.DOWN_ARROW) {
        //        s.dir(0, 1);
        //    } else if (p.keyCode === p.RIGHT_ARROW) {
        //        s.dir(1, 0);
        //    } else if (p.keyCode === p.LEFT_ARROW) {
        //        s.dir(-1, 0);
        //    }
        //}

        p.keyPressed = () => {

            if (this.state.globalVariable === 1) {
                s.dir(0, -1);
            } else if (this.state.globalVariable === 2) {
                s.dir(0, 1);
            } else if (this.state.globalVariable === 3) {
                s.dir(1, 0);
            } else if (this.state.globalVariable === 4) {
                s.dir(-1, 0);
            }
        }

    }

    componentDidMount() {

        this.interval = setInterval(() => this.setState(this.fetchScore()), 10);

        //We create a new p5 object on component mount, feed it 
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return (
            //This div will contain our p5 sketch
            <div ref={this.myRef}>

            </div>
        )
    }
}

export default Sketch