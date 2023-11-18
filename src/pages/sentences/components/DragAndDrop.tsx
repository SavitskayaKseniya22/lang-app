/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { WordForDrop, DropData } from '../../../interfaces';
import { convertArray, shuffle } from '../../../utils';

const reorder = (list: WordForDrop[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const StyledDragContainer = styled('div')<{ $isItActive: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  pointer-events: ${(props) => (props.$isItActive ? 'auto' : 'none')};

  .list_droppable,
  .list_draggable {
    border-radius: 1.5rem;
    background-color: gainsboro;
    min-height: 3rem;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: smaller;

    li {
      border-radius: 1rem;
      background-color: white;
      padding: 0.5rem;
      text-align: center;
    }
  }
`;

function DragAndDrop({
  source,
  returnResult,
  isItActive,
}: {
  source: string[];
  returnResult: (value: string) => void;
  isItActive: boolean;
}) {
  const updater = useCallback(
    () => ({
      source: shuffle(convertArray(source)),
      result: [],
    }),
    [source]
  );

  const [sentence, setSentence] = useState<DropData>(updater);

  useEffect(() => {
    setSentence(updater);
  }, [source, updater]);

  useEffect(() => {
    returnResult(sentence.result.map((item) => item.element).join(' '));
  }, [sentence, returnResult]);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId === result.destination.droppableId) {
      const { droppableId } = result.source;
      const items = reorder(
        sentence[droppableId as 'source' | 'result'],
        result.source.index,
        result.destination.index
      );
      setSentence({ ...sentence, [droppableId]: items });
    }

    if (result.source.droppableId !== result.destination.droppableId) {
      if (result.source.droppableId === 'source') {
        const changedSource = [...sentence.source];
        const [removed] = changedSource.splice(result.source.index, 1);

        const changedResult = [...sentence.result];
        changedResult.splice(result.destination.index, 0, removed);

        setSentence({
          ...sentence,
          source: changedSource,
          result: changedResult,
        });
      } else if (result.source.droppableId === 'result') {
        const changedResult = [...sentence.result];
        const [removed] = changedResult.splice(result.source.index, 1);

        const changedSource = [...sentence.source];
        changedSource.splice(result.destination.index, 0, removed);

        setSentence({
          ...sentence,
          source: changedSource,
          result: changedResult,
        });
      }
    }
  }

  return (
    <StyledDragContainer $isItActive={isItActive}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="result" direction="horizontal">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="list_droppable"
            >
              {sentence.result.map((item, index) => (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.element}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        <Droppable droppableId="source" direction="horizontal">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="list_draggable"
            >
              {sentence.source.map((item, index) => (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => {
                        const sourceCopy = [...sentence.source];
                        sourceCopy.splice(index, 1);

                        setSentence({
                          ...sentence,
                          source: sourceCopy,
                          result: [...sentence.result, item],
                        });
                      }}
                    >
                      {item.element}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </StyledDragContainer>
  );
}

export default DragAndDrop;
