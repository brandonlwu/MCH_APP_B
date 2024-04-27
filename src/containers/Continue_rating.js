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
            <br /><br /> After the certainty rating screen you will see another rating screen following each diagonal red stripes, press
            <br /><br /> and then hold the same key from the previous rating screen.
            <br /><br /> The longer you hold it down, the better the final note fit into the melody.
            <br /><br /> If you hold the key down for a long time, the final note was a <b> GOOD FIT </b>.
            <br /><br /> If you hold the key down for a short time, the final note was a <b> BAD FIT </b>.
            <br /><br /> Please respond as <b> QUICKLY </b> and as <b> ACCURATELY </b> as you <b> POSSIBLY CAN </b>
            <br /><br /><br /> PRESS "Q"/YES WHEN READY TO CONTINUE.
            </p>
          </div>
          </header>
        </div>
      );
    }
}

export default Continue_rating;
