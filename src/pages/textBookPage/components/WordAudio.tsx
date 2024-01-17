/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledWordAudioControl = styled('button')`
  font-size: 4rem;
`;

function WordAudio({ source }: { source: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <StyledWordAudioControl
        type="button"
        onClick={() => {
          audioRef.current?.play();
        }}
      >
        <i className="fa-regular fa-circle-play" />
      </StyledWordAudioControl>
      <audio
        ref={audioRef}
        src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${source}`}
      />
    </>
  );
}

export default WordAudio;
