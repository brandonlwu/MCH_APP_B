import React, {Component} from 'react';

import {Redirect} from "react-router-dom";
import Trial2 from './Trial2';

import {setComponentData} from '../store';
import {create_blocks_singleton} from '../lib/tt_blocks';

import TestClips from '../lib/TestStimAudio';

var _ = require('lodash');

const TRIAL_NUM = 2;
const BLOCK_START = 3;
const BLOCK_END = 6; // not inclusive

const TestClips_TT_2 = TestClips.slice(21, 42)


class Trial_TT_2 extends Component {
  constructor(props) {
    super(props);

    // initial states
    this.startTimestamp = new Date().getTime();
    this.state = {
      decibels: _.flatten(
        _.slice(create_blocks_singleton(), BLOCK_START, BLOCK_END)
      ),
    };
  }

  trialCompleteRenderer = (decibels, response) => {
    return <Redirect to="/Break2" />
  }

  dataHandler = (decibels, response, responseTime, ratings, ratingsRaw, surprisals, surprisalsRaw, timestamps) => {
    setComponentData(
      TRIAL_NUM,
      decibels,
      response,
      responseTime,
      ratings,
      ratingsRaw,
      surprisals, 
      surprisalsRaw,
      timestamps,
      this.startTimestamp
    );
  }

  render() {
    // Something went wrong and we don't have contrast values from Quest.
    if (_.isEmpty(this.state.decibels)) {
      return <Redirect to="/Error" />
    }

    return (
      <Trial2
        audioSource={TestClips_TT_2}
        decibels={this.state.decibels}
        shouldRecordRatings={true}
        shouldRecordSurprisals={true}
        trialCompleteRenderer={this.trialCompleteRenderer}
        dataHandler={this.dataHandler}
      />
    );

  } // end render
} // end class

export default Trial_TT_2;
