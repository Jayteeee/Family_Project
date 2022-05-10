import React, { Component } from "react";
import { string, number, bool, func } from "prop-types";
import Visualizer from "./Visualizer";
import AudioPlayer from "./AudioPlayer";

export default class ReactMic extends Component {
  constructor(props) {
    super(props);

    this.visualizerRef = React.createRef();

    this.state = {
      microphoneRecorder: null,
      canvas: null,
      canvasCtx: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { record, onStop } = this.props;
    const { microphoneRecorder } = this.state;
    if (prevProps.record !== record) {
      if (record) {
        if (microphoneRecorder) {
          microphoneRecorder.startRecording();
        }
      } else if (microphoneRecorder) {
        microphoneRecorder.stopRecording(onStop);
        this.clear();
      }
    }
  }

  componentDidMount() {
    const {
      onSave,
      onStop,
      onStart,
      onData,
      audioElem,
      audioBitsPerSecond,
      echoCancellation,
      autoGainControl,
      noiseSuppression,
      mimeType,
    } = this.props;
    const visualizer = this.visualizerRef.current;
    const canvas = visualizer;
    const canvasCtx = canvas.getContext("2d");
    const options = {
      audioBitsPerSecond,
      mimeType,
    };
    const soundOptions = {
      echoCancellation,
      autoGainControl,
      noiseSuppression,
    };

    if (audioElem) {
      AudioPlayer.create(audioElem);

      this.setState(
        {
          canvas,
          canvasCtx,
        },
        () => {
          this.visualize();
        }
      );
    } else {
      this.setState(
        {
          canvas,
          canvasCtx,
        },
        () => {
          this.visualize();
        }
      );
    }
  }

  visualize = () => {
    const { backgroundColor, strokeColor, width, height, visualSetting } =
      this.props;
    const { canvas, canvasCtx } = this.state;

    if (visualSetting === "sinewave") {
      Visualizer.visualizeSineWave(
        canvasCtx,
        canvas,
        width,
        height,
        backgroundColor,
        strokeColor
      );
    } else if (visualSetting === "frequencyBars") {
      Visualizer.visualizeFrequencyBars(
        canvasCtx,
        canvas,
        width,
        height,
        backgroundColor,
        strokeColor
      );
    } else if (visualSetting === "frequencyCircles") {
      Visualizer.visualizeFrequencyCircles(
        canvasCtx,
        canvas,
        width,
        height,
        backgroundColor,
        strokeColor
      );
    }
  };

  clear() {
    const { width, height } = this.props;
    const { canvasCtx } = this.state;
    canvasCtx.clearRect(0, 0, width, height);
  }

  render() {
    const { width, height } = this.props;

    return (
      <canvas
        ref={this.visualizerRef}
        height={height}
        width={width}
        className={this.props.className}
      />
    );
  }
}

ReactMic.propTypes = {
  backgroundColor: string,
  strokeColor: string,
  className: string,
  audioBitsPerSecond: number,
  mimeType: string,
  height: number,
  record: bool.isRequired,
  onStop: func,
  onData: func,
  onSave: func,
};

ReactMic.defaultProps = {
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  strokeColor: "#000000",
  className: "visualizer",
  audioBitsPerSecond: 128000,
  mimeType: "audio/webm;codecs=opus",
  record: false,
  width: 640,
  height: 100,
  visualSetting: "sinewave",
  echoCancellation: false,
  autoGainControl: false,
  noiseSuppression: false,
  channelCount: 2,
};