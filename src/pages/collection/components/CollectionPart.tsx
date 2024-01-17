import React, { useContext } from 'react';
import GamesPanel from '../../textBookPage/components/GamesPanel';
import WordList from '../../textBookPage/components/WordList';
import ModalContext from '../../../components/modal/ModalContext';
import {
  CollectionLikeArraysType,
  CollectionType,
  WordWithIdType,
} from '../../../interfaces';
import { useAppSelector } from '../../../store/store';
import { useAddToUserWordsMutation } from '../../../store/userWordsApi';

function CollectionPart({
  data,
  type,
}: {
  data: CollectionLikeArraysType;
  type: CollectionType;
}) {
  const { user } = useAppSelector((state) => state.persist.auth);
  const { setContent } = useContext(ModalContext);
  const [addToUserWords] = useAddToUserWordsMutation();

  const isItLearned = (data && data[CollectionType.LEARNED]) || false;

  return (
    <li>
      <h3>{`${type}`} words</h3>
      <button
        type="button"
        disabled={!data[type].length}
        onClick={() => {
          const updatedWords: WordWithIdType = {} as WordWithIdType;

          data[type].forEach((word) => {
            const temp = { ...word };
            if (type === CollectionType.SELECTED) {
              Object.assign(temp, { selected: false });
            }
            if (type === CollectionType.LEARNED) {
              Object.assign(temp, { learned: false, guessed: 0 });
            }
            if (type === CollectionType.DIFFICULT) {
              Object.assign(temp, {
                difficult: false,
                guessed: isItLearned ? 3 : 0,
              });
            }
            Object.assign(updatedWords, { [word.id]: temp });
          });

          addToUserWords({
            userId: user!.localId,
            data: updatedWords,
            tokenId: user!.idToken,
          });
        }}
      >
        Clear this part of collection
      </button>

      <button
        type="button"
        disabled={!(data[type].length > 10)}
        onClick={() => {
          setContent(<GamesPanel data={data[type]} />);
        }}
      >
        Play
      </button>

      <WordList data={data[type]} />
    </li>
  );
}

export default CollectionPart;
