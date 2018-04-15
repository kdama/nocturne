import * as React from "react";

interface IState {
  enableLoop: boolean;
  isDraggingOver: boolean;
  speed: number;
  volume: number;
}

export class Root extends React.Component<{}, IState> {
  private audioContext: AudioContext;
  private bufferSource: AudioBufferSourceNode;
  private gain: GainNode;

  constructor(props: {}) {
    super(props);

    this.audioContext = new AudioContext();
    this.bufferSource = this.audioContext.createBufferSource();
    this.gain = this.audioContext.createGain();
    this.bufferSource.connect(this.gain);
    this.gain.connect(this.audioContext.destination);

    this.state = {
      enableLoop: false,
      isDraggingOver: false,
      speed: 1,
      volume: 1,
    };
  }

  public render() {
    return (
      <div
        style={{
          backgroundColor: this.state.isDraggingOver ? "lightyellow" : "white",
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
        onDragOver={this.handleDragOver}
        onDrop={this.handleFileSelect}
        onDragLeave={this.handleDragExit}
      >
        <div>
          Volume:
          <input
            type="range"
            min="0.001"
            max="2"
            step="0.001"
            value={this.state.volume}
            onChange={this.handleChangeVolume}
          />
          {this.state.volume}
        </div>
        <div>
          Speed:
          <input
            type="range"
            min="0.001"
            max="2"
            step="0.001"
            value={this.state.speed}
            onChange={this.handleChangeSpeed}
          />
          {this.state.speed}
        </div>
        <div>
          Loop:
          <input
            type="checkbox"
            checked={this.state.enableLoop}
            onChange={this.handleChangeLoop}
          />
          {this.state.enableLoop ? "Enabled" : "Disabled"}
        </div>
      </div>
    );
  }

  private handleFileSelect = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isDraggingOver: false,
    });

    const files = e.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    for (let i = 0; files[i]; i++) {
      const reader = new FileReader();
      reader.onloadend = async _ => {
        this.bufferSource.buffer = await this.audioContext.decodeAudioData(
          reader.result,
        );
        this.bufferSource.start(0);
      };
      reader.readAsArrayBuffer(files[i]);
    }
  };

  private handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      isDraggingOver: true,
    });
  };

  private handleDragExit = (_: React.DragEvent<HTMLDivElement>) => {
    this.setState({
      isDraggingOver: false,
    });
  };

  private handleChangeSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Number(e.target.value);
    this.bufferSource.playbackRate.setValueAtTime(speed, 0);
    this.setState({ speed });
  };

  private handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value);
    this.gain.gain.setValueAtTime(volume, 0);
    this.setState({ volume });
  };

  private handleChangeLoop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const loop = e.target.checked;
    this.bufferSource.loop = loop;
    this.setState({ enableLoop: loop });
  };
}
