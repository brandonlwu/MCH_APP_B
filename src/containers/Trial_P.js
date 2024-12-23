import React, {Component} from 'react';

import {Redirect} from "react-router-dom";
import Trial from './Trial';
import {setComponentData} from '../store';

import HearClips from "../lib/PracticeHearAudio.js";

var _ = require('lodash');

class Trial_P extends Component {
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
      return <Redirect to="/Continue" />
    } else {
      return <Redirect to="/OnceMore" />;
    }
  }

  dataHandler = (  decibels, response, responseSurprisal, responseTime, responseSurprisalTime, ratings, ratingsRaw, surprisals,  surprisalsRaw, timestamps
  ) => {
    setComponentData(
      "practice",
      decibels,
      response,
      undefined, //no response surprisal
      responseTime,
      undefined, // no responsesurprislatime
      undefined, // no ratings
      undefined, // no ratings
      undefined, // no surprisals
      undefined, // no surprisalsRaw
      timestamps,
      this.startTimestamp
    );
  }

  render() {
    return (
      <Trial
        audioSource={HearClips}
        shouldRecordRatings={false}
        trialCompleteRenderer={this.trialCompleteRenderer}
        dataHandler={this.dataHandler}
      />
    );

  } // end render
} // end class

export default Trial_P;
