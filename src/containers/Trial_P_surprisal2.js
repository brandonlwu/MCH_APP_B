import React, {Component} from 'react';

import {setComponentData} from '../store.js';
import {Redirect} from "react-router-dom";
import Trial2 from './Trial2.js';
import SurprisalClips from "../lib/PracticeSurprisalAudio.js";


var _ = require('lodash');

class Trial_P_Surprisal extends Component {
  constructor(props) {
    super(props);
    this.startTimestamp = new Date().getTime();
  }

  trialCompleteRenderer = (decibels, response) => {
    // count how many were correct
    let correct = 0;
    for (let i = 0; i < response.length; i++) {
      correct += response[i] == (decibels[i] > 0);
    }

    if (correct > 0.7 * decibels.length) {
      return <Redirect to="/Continue_surprisal" />
    } else {
      return <Redirect to="/OnceMore_surprisal" />;
    }
  }

  dataHandler = (decibels, response, responseSurprisal, responseTime, responseSurprisalTime, ratings, ratingsRaw, surprisals,  surprisalsRaw, timestamps) => {
    setComponentData(
      "practice_surprisal",
      decibels,
      response,
      responseSurprisal,
      responseTime,
      responseSurprisalTime,
      ratings,
      ratingsRaw,
      surprisals,
      surprisalsRaw,
      timestamps,
      this.startTimestamp
    );
  }

  render() {
    return (
      <Trial2
        audioSource={SurprisalClips}
        shouldRecordRatings={true}
        shouldRecordSurprisals={true}
        trialCompleteRenderer={this.trialCompleteRenderer}
        dataHandler={this.dataHandler}
      />
    );

  } // end render
} // end class

export default Trial_P_Surprisal;
