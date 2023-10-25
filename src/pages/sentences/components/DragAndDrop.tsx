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
import { WordForDrop, DropData } from '../../../interfaces';
import { makeWordList } from '../../../utils';

const reorder = (list: WordForDrop[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function DragAndDrop({
  source,
  returnResult,
}: {
  source: string;
  returnResult: (value: string) => void;
}) {
  const updater = useCallback(
    () => ({
      source: makeWordList(source),
      result: [],
    }),
    [source]
  );

  const [sentence, setSentence] = useState<DropData>(updater);

  useEffect(() => {
    setSentence(updater);
  }, [source, updater]);

  useEffect(() => {
    returnResult(sentence.result.map((item) => item.word).join(' '));
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
    <div className="dragPlace">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="result" direction="horizontal">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="list1"
            >
              {sentence.result.map((item, index) => (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.word}
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
              className="list2"
            >
              {sentence.source.map((item, index) => (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.word}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default DragAndDrop;
