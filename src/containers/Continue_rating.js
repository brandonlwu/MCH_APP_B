import React, { Component } from 'react';
import './Continue_rating.css';
import { Redirect } from "react-router-dom";

class Continue_rating extends Component {

    constructor(props) {
        super(props);
      this.state = {
        continue: false,
      }
    }

    keyFunction = (event) => {
    if(event.keyCode === 81) {
      this.setState((state, props) => ({
        continue: true
      }));
    }
  }

   componentDidMount(){
    document.addEventListener("keydown", this.keyFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyFunction, false);
  }


      render() {
        if(this.state.continue === true){
          //return <Redirect to="/TrialQ" /> //Previous code
          return <Redirect to="/Trial_P_surprisal" /> 

        }

      return (
        <div className="Continue_rating">
          <header className="Continue_rating-header">
          <div className="text-container">
            <p className="Continue_rating-text">
            Great!
            <br /><br /> Second task complete! You will do the same thing in the next task, with some important differences:
            <br /><br /> After the certainty rating screen you will see another rating screen. A note will be played, and your job is   
            <br /><br /> to indicate whether the final note of the melody was higher or lower than the note that was just played.
            <br /><br /> If you believe the final note of the melody was higher than the note that is played, press the UP key.
            <br /><br /> If you believe the final note of the melody was lower than the note that is played, press the DOWN key.
            <br /><br /> The longer you press the UP key, the higher the final note of the melody was compared to the note that was just played.
            <br /><br /> The longer you press the DOWN key, the lower the final note of the melody was compared to the note that was just played.
            <br /><br /> It can help to hum the final note of the melody that you heard while responding to the questions.
            <br /><br /> Please respond as <b> QUICKLY </b> and as <b> ACCURATELY </b> as you <b> POSSIBLY CAN </b>
            <br /><br /> Please remember to keep your eyes on the fixation cross throughout the task!
            <br /><br /><br /> PRESS "Q"/YES WHEN READY TO CONTINUE.
            </p>
          </div>
          </header>
        </div>
      );
    }
}

export default Continue_rating;
