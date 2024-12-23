import React, {Component} from 'react';

import {setComponentData} from '../store';
import {Redirect} from "react-router-dom";
import Trial from './Trial';
import ConfidenceClips from "../lib/PracticeConfidenceAudio.js";

var _ = require('lodash');

class Trial_P_Rating extends Component {
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
      return <Redirect to="/Continue_rating" />
    } else {
      return <Redirect to="/OnceMore_rating" />;
    }
  }

  dataHandler = (  decibels, response, responseSurprisal, responseTime, responseSurprisalTime, ratings, ratingsRaw, surprisals,  surprisalsRaw, timestamps
  ) => {
    setComponentData(
      "practice_rating",
      decibels,
      response,
      undefined, // no resonseSurprisal
      responseTime,
      undefined, //no responseSurprisalTime
      ratings,
      ratingsRaw,
      undefined, //no surprisals
      undefined, //no surprisalsRaw
      timestamps,
      this.startTimestamp
    );
  }

  render() {
    return (
      <Trial
        audioSource={ConfidenceClips}
        shouldRecordRatings={true}
        trialCompleteRenderer={this.trialCompleteRenderer}
        dataHandler={this.dataHandler}
      />
    );

  } // end render
} // end class

export default Trial_P_Rating;
