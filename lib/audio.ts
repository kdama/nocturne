export interface PlayOptions {
  volume: number;
  speed: number;
  loop: boolean;
  randomizeSpeedEachLoop: boolean;
}

export default class Audio {
  audioContext: AudioContext;
  bufferSource: AudioBufferSourceNode | null;
  gain: GainNode | null;
  playOptions: PlayOptions;

  constructor({ playOptions }: { playOptions: PlayOptions }) {
    console.log("audio context creating...");
    this.audioContext = new AudioContext();
    this.bufferSource = null;
    this.gain = null;
    this.playOptions = playOptions;
    console.log("audio context successfully created");
  }

  play({
    file,
    onNextLoop,
  }: {
    file: File;
    onNextLoop: ({ nextPlayOptions }: { nextPlayOptions: PlayOptions }) => void;
  }) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      if (reader.result === null || typeof reader.result === "string") {
        console.log("file load failed");
        return;
      }
      console.log("file successfully loaded");
      console.log("audio preparing...");

      this.bufferSource = this.audioContext.createBufferSource();
      this.gain = this.audioContext.createGain();

      if (this.bufferSource === null || this.gain === null) {
        console.log("bufferSource or gain not initialized (bug?)");
        return;
      }

      this.bufferSource.connect(this.gain);
      this.gain.connect(this.audioContext.destination);
      console.log("audio successfully prepared");

      console.log("audio decoding...");
      const buffer = await this.audioContext.decodeAudioData(reader.result);
      console.log("audio successfully decoded");

      console.log("audio play starting...");
      this.bufferSource.buffer = buffer;
      this.bufferSource.playbackRate.setValueAtTime(this.playOptions.speed, 0);
      this.gain.gain.setValueAtTime(this.playOptions.volume, 0);
      this.bufferSource.start(0);
      console.log("audio play successfully started");

      const onended = async () => {
        console.log("audio stopped");
        if (this.bufferSource && this.playOptions.loop) {
          console.log("next loop starting...");
          if (this.playOptions.randomizeSpeedEachLoop) {
            this.playOptions = {
              ...this.playOptions,
              speed:
                Math.round((Math.random() * (2 - 0.25) + 0.25) / 0.01) * 0.01,
            };
          }

          this.bufferSource = this.audioContext.createBufferSource();
          this.gain = this.audioContext.createGain();
          this.bufferSource.connect(this.gain);
          this.gain.connect(this.audioContext.destination);

          this.bufferSource.buffer = buffer;
          this.bufferSource.playbackRate.setValueAtTime(
            this.playOptions.speed,
            0,
          );
          this.gain.gain.setValueAtTime(this.playOptions.volume, 0);
          this.bufferSource.start(0);

          this.bufferSource.onended = onended;

          onNextLoop({ nextPlayOptions: this.playOptions });
          console.log("next loop successfully started");
        }
      };
      this.bufferSource.onended = onended;
    };
    reader.readAsArrayBuffer(file);
    console.log("file read started");
  }

  stop() {
    if (this.bufferSource) {
      console.log("audio already playing");
      this.bufferSource.onended = null;
      this.bufferSource.stop(0);
      console.log("audio force-stopped");
    }
  }

  setPlayOptions(playOptions: PlayOptions) {
    this.playOptions = playOptions;
    if (this.bufferSource === null || this.gain === null) {
      return;
    }
    this.bufferSource.playbackRate.setValueAtTime(this.playOptions.speed, 0);
    this.gain.gain.setValueAtTime(this.playOptions.volume, 0);
  }
}
