import React, { useState } from 'react';

interface VoiceMessageProps {
  audioSrc: string; 
  duration: string;
}

const Voice: React.FC<VoiceMessageProps> = ({ audioSrc, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(audioSrc));

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-start gap-2.5">
      <button
        onClick={handlePlayPause}
        className="p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
        type="button"
      >
        {isPlaying ? (
          <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.5 0C2.015 0 0 2.015 0 4.5v7c0 2.485 2.015 4.5 4.5 4.5h7c2.485 0 4.5-2.015 4.5-4.5v-7C16 2.015 13.985 0 11.5 0h-7zM5 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9A.5.5 0 0 1 5 3.5zm5 .5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.5 0C1.015 0 0 1.015 0 3.5v9C0 13.985 1.015 15 3.5 15h9C13.985 15 15 13.985 15 11.5v-9C15 1.015 13.985 0 11.5 0h-9zM5 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 5 4zm6-.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5z" />
          </svg>
        )}
      </button>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{duration}</span>
    </div>
  );
};

export default React.memo(Voice);
