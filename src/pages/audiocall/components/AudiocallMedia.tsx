/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledAudiocallMediaControl = styled('button')`
  font-size: 4rem;
`;

export function AudiocallMedia({ source }: { source: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <StyledAudiocallMediaControl
        type="button"
        onClick={() => {
          audioRef.current?.play();
        }}
      >
        <i className="fa-regular fa-circle-play" />
      </StyledAudiocallMediaControl>
      <audio
        ref={audioRef}
        src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${source}`}
      />
    </>
  );
}

export default AudiocallMedia;
