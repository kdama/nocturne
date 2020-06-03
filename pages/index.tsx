import { useState, useEffect } from "react";
import Audio, { PlayOptions } from "../lib/audio";

export default () => {
  const [audio, setAudio] = useState<Audio | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [playOptions, setPlayOptions] = useState<PlayOptions>({
    loop: false,
    randomizeSpeedEachLoop: false,
    speed: 1,
    volume: 1,
  });

  useEffect(() => {
    setAudio(new Audio({ playOptions }));
  }, []);

  function handleFileSelect(e: React.DragEvent<HTMLDivElement>) {
    console.log("file select detected");
    e.stopPropagation();
    e.preventDefault();
    setIsDraggingOver(false);

    if (!audio) {
      console.log("audio not initialized (bug?)");
      return;
    }

    const file = e.dataTransfer.files[0];
    audio.play({
      file,
      onNextLoop: ({ nextPlayOptions }) => {
        setPlayOptions(nextPlayOptions);
      },
    });
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.preventDefault();
    setIsDraggingOver(true);
  }

  function handleDragExit(_: React.DragEvent<HTMLDivElement>) {
    setIsDraggingOver(false);
  }

  function handleChangeSpeed(e: React.ChangeEvent<HTMLInputElement>) {
    modifyPlayOptions({ speed: Number(e.target.value) });
  }

  function handleChangeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    modifyPlayOptions({ volume: Number(e.target.value) });
  }

  function handleToggleLoop(e: React.ChangeEvent<HTMLInputElement>) {
    modifyPlayOptions({ loop: e.target.checked });
  }

  function handleToogleRandomSpeed(e: React.ChangeEvent<HTMLInputElement>) {
    modifyPlayOptions({ randomizeSpeedEachLoop: e.target.checked });
  }

  function modifyPlayOptions(mod: Partial<PlayOptions>) {
    const newPlayOptions: PlayOptions = { ...playOptions, ...mod };
    if (!audio) {
      console.log("audio not initialized (bug?)");
      setPlayOptions(newPlayOptions);
      return;
    }
    audio.setPlayOptions(newPlayOptions);
    setPlayOptions(newPlayOptions);
  }

  return (
    <div
      style={{
        backgroundColor: isDraggingOver ? "lightyellow" : "white",
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%",
      }}
      onDragOver={handleDragOver}
      onDrop={handleFileSelect}
      onDragLeave={handleDragExit}
    >
      <ul>
        <li>
          Volume:
          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={playOptions.volume}
            onChange={handleChangeVolume}
          />
          {playOptions.volume}
        </li>
        <li>
          Speed:
          <input
            type="range"
            min="0.25"
            max="2"
            step="0.01"
            value={playOptions.speed.toFixed(2)}
            onChange={handleChangeSpeed}
          />
          {playOptions.speed}
        </li>
        <li>
          Loop:
          <input
            type="checkbox"
            checked={playOptions.loop}
            onChange={handleToggleLoop}
          />
          {playOptions.loop ? "Enabled" : "Disabled"}
        </li>
        {playOptions.loop && (
          <ul>
            <li>
              Randomize speed:
              <input
                type="checkbox"
                checked={playOptions.randomizeSpeedEachLoop}
                onChange={handleToogleRandomSpeed}
              />
              {playOptions.randomizeSpeedEachLoop ? "Enabled" : "Disabled"}
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};
