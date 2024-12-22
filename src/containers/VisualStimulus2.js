import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RATINGS_1_SRC from "../media/rating_keydown_1.png";
import RATINGS_2_SRC from "../media/rating_keydown_2.png";
import RATINGS_3_SRC from "../media/rating_keydown_3.png";
import RATINGS_4_SRC from "../media/rating_keydown_4.png";
import RATINGS_5_SRC from "../media/rating_keydown_5.png";
import SURPRISAL_1_SRC from "../media/white_keydown_1.png";
import SURPRISAL_2_SRC from "../media/white_keydown_2.png";
import SURPRISAL_3_SRC from "../media/white_keydown_3.png";
import SURPRISAL_4_SRC from "../media/white_keydown_4.png";
import SURPRISAL_5_SRC from "../media/white_keydown_5.png";
import SURPRISAL_6_SRC from "../media/white_keydown_6.png";
import SURPRISAL_7_SRC from "../media/white_keydown_7.png";
import './Trial.css';

var _ = require('lodash');
var SimplexNoise = require('simplex-noise');

const IMG_SRC = "https://raw.githubusercontent.com/PowersLab1/VCH_APP_SMITH/master/src/media/fix_cross.png";
const CANVAS_LENGTH = 256;

const ratingToImgSrc = {
  0: "", // Default
  1: RATINGS_1_SRC,
  2: RATINGS_2_SRC,
  3: RATINGS_3_SRC,
  4: RATINGS_4_SRC,
  5: RATINGS_5_SRC,
}

const surprisalToImgSrc = {
  0: "", // Default
  1: SURPRISAL_1_SRC,
  2: SURPRISAL_2_SRC,
  3: SURPRISAL_3_SRC,
  4: SURPRISAL_4_SRC,
  5: SURPRISAL_5_SRC,
  6: SURPRISAL_6_SRC,
  7: SURPRISAL_7_SRC
}

class VisualStimulus extends Component {
  constructor(props) {
    super(props);
  }

  drawCanvas() {
    this.resizeCanvas();

    var canvas = document.getElementById('c'),
      ctx = canvas.getContext('2d'),
      imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height),
      data = imgdata.data;

    const w = canvas.width;
    const h = canvas.height;
    const l = Math.max(1, canvas.height / 18);
    const xFloor = Math.floor(w / l);
    const yFloor = Math.floor(h / l);
    let xOffset = ((w / l) - xFloor) / 2 * l;
    let yOffset = ((h / l) - yFloor) / 2 * l;

    // if floor is odd, then move offset by half of l
    if (xFloor % 2 == 1) {
      // if floor is odd, then move offset by half of l
      xOffset += l / 2;
    }
    if (yFloor % 2 == 1) {
      // if floor is odd, then move offset by half of l
      yOffset += l / 2;
    }

    for (var x = 0; x < w; x++) {
      for (var y = 0; y < h; y++) {
        if (this.props.showContrast) {
          //const val = (Math.abs(Math.floor((x - xOffset + l) / l) % 2) ^ Math.abs(Math.floor((y - yOffset) / l) % 2)) * 163;
          const val = Math.abs(Math.floor((y - yOffset) / l) % 2) * 163 ; //horizontal stripes
          data[(x + y * w) * 4 + 0] = val*0.80224;
          data[(x + y * w) * 4 + 1] = 0;
          data[(x + y * w) * 4 + 2] = 0;
          data[(x + y * w) * 4 + 3] = 255;
        } else {
          data[(x + y * w) * 4 + 0] = 0;
          data[(x + y * w) * 4 + 1] = 0;
          data[(x + y * w) * 4 + 2] = 0;
          data[(x + y * w) * 4 + 3] = 255;
        }
      }
    }

    ctx.putImageData(imgdata, 0, 0);
  }

  resizeCanvas() {
    var canvas = document.getElementById('c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate(prevProps) {
    this.drawCanvas();
  }

  render() {
    return (
      <div>
        {this.props.surprisalReady ? <>
        <img src={surprisalToImgSrc[this.props.currentSurprisal]} width={CANVAS_LENGTH} height={CANVAS_LENGTH} className="center"
        style={
          {
            zIndex: 101,
            width: '79vh',
            height: '70vh',
            backgroundColor: "black",
            visibility: this.props.showSurprisals ? 'visible' : 'hidden',
          }
         }
        />
        <div style={
          {
            zIndex: 100,
            backgroundColor: "black",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            visibility: this.props.showSurprisals ? 'visible' : 'hidden',
          }
         }
        ></div></>
        :<></>}

        {(this.props.transitionReady)? <>
        <img src={SURPRISAL_4_SRC} width={CANVAS_LENGTH} height={CANVAS_LENGTH} className="center"
        style={
          {
            zIndex: 101,
            width: '79vh',
            height: '70vh',
            backgroundColor: "black",
            visibility: this.props.showSurprisals ? 'visible' : 'hidden',
          }
         }
        />
        <div style={
          {
            zIndex: 100,
            backgroundColor: "black",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            visibility: this.props.showSurprisals ? 'visible' : 'hidden',
          }
         }
        ></div></>
        :<></>}
        
        {this.props.transitionReady ? <></>:
        <>
        <img src={ratingToImgSrc[this.props.currentRating]} width={CANVAS_LENGTH} height={CANVAS_LENGTH} className="center"
        style={
          {
            zIndex: 101,
            width: '95vh',
            height: '50vh',
            backgroundColor: "black",
            visibility: this.props.showRatings ? 'visible' : 'hidden',
          }
         }
        />
        <div style={
          {
            zIndex: 100,
            backgroundColor: "black",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            visibility: this.props.showRatings ? 'visible' : 'hidden',
          }
         }
        ></div></>}
        <canvas id="c"
          style={
            {
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1,
              width: '100%',
              height: '100%',
            }
          }></canvas>
        <div className="center cross-1" style={{zIndex: 10}}></div>
        <div className="center cross-2" style={{zIndex: 10}}></div>
      </div>
    );
  } // end render
} // end class


VisualStimulus.defaultProps = {
  showContrast: false,
  showRatings: false,
  showSurprisals: false,
  contrast: 0,
  surprisalReady: false,
  transitionReady: false,
}

VisualStimulus.propTypes = {
  showContrast: PropTypes.bool.isRequired,
  showRatings: PropTypes.bool,
  showSurprisals: PropTypes.bool,
  currentRating: PropTypes.number,
  currentSurprisal: PropTypes.number,
  contast: PropTypes.number,
  surprisalReady: PropTypes.bool,
  transitionReady: PropTypes.bool,
}

export default VisualStimulus;
