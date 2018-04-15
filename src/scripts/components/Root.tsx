import * as React from "react";

interface IState {
  isDraggingOver: boolean;
  isLoopEnabled: boolean;
  isRandomSpeedEnabled: boolean;
  speed: number;
  volume: number;
}

export class Root extends React.Component<{}, IState> {
  private audioContext: AudioContext;
  private bufferSource: AudioBufferSourceNode | null;
  private gain: GainNode | null;

  constructor(props: {}) {
    super(props);

    this.audioContext = new AudioContext();
    this.bufferSource = null;
    this.gain = null;

    this.state = {
      isDraggingOver: false,
      isLoopEnabled: false,
      isRandomSpeedEnabled: false,
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
            min="0"
            max="2"
            step="0.01"
            value={this.state.volume}
            onChange={this.handleChangeVolume}
          />
          {this.state.volume}
        </div>
        <div>
          Speed:
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.01"
            value={this.state.speed}
            onChange={this.handleChangeSpeed}
          />
          {this.state.speed}
        </div>
        <div>
          Loop:
          <input
            type="checkbox"
            checked={this.state.isLoopEnabled}
            onChange={this.handleToggleLoop}
          />
          {this.state.isLoopEnabled ? "Enabled" : "Disabled"}
        </div>
        {this.state.isLoopEnabled && (
          <div>
            Randomize the speed for each loop:
            <input
              type="checkbox"
              checked={this.state.isRandomSpeedEnabled}
              onChange={this.handleToogleRandomSpeed}
            />
            {this.state.isRandomSpeedEnabled ? "Enabled" : "Disabled"}
          </div>
        )}
      </div>
    );
  }

  private handleFileSelect = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isDraggingOver: false,
    });

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = async _ => {
      if (this.bufferSource) {
        this.bufferSource.stop(0);
      }
      this.bufferSource = this.audioContext.createBufferSource();
      this.gain = this.audioContext.createGain();
      this.bufferSource.connect(this.gain);
      this.gain.connect(this.audioContext.destination);

      const buffer = await this.audioContext.decodeAudioData(reader.result);
      this.bufferSource.buffer = buffer;
      this.bufferSource.playbackRate.setValueAtTime(this.state.speed, 0);
      this.gain.gain.setValueAtTime(this.state.volume, 0);
      this.bufferSource.start(0);

      const onended = async () => {
        if (this.bufferSource && this.state.isLoopEnabled) {
          if (this.state.isRandomSpeedEnabled) {
            this.setState({
              speed:
                Math.round((Math.random() * (2 - 0.1) + 0.1) / 0.01) * 0.01,
            });
          }

          this.bufferSource = this.audioContext.createBufferSource();
          this.gain = this.audioContext.createGain();
          this.bufferSource.connect(this.gain);
          this.gain.connect(this.audioContext.destination);

          this.bufferSource.buffer = buffer;
          this.bufferSource.playbackRate.setValueAtTime(this.state.speed, 0);
          this.gain.gain.setValueAtTime(this.state.volume, 0);
          this.bufferSource.start(0);

          this.bufferSource.onended = onended;
        }
      };
      this.bufferSource.onended = onended;
    };
    reader.readAsArrayBuffer(file);
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
    if (this.bufferSource) {
      this.bufferSource.playbackRate.setValueAtTime(speed, 0);
    }
    this.setState({ speed });
  };

  private handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value);
    if (this.gain) {
      this.gain.gain.setValueAtTime(volume, 0);
    }
    this.setState({ volume });
  };

  private handleToggleLoop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const loop = e.target.checked;
    this.setState({ isLoopEnabled: loop });
  };

  private handleToogleRandomSpeed = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const randomSpeed = e.target.checked;
    this.setState({ isRandomSpeedEnabled: randomSpeed });
  };
}
