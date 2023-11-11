import React, { useContext } from 'react';
import { useAppSelector } from '../../../store/store';
import { useClearPartOfCollectionMutation } from '../../../store/userData/UserDataApi';
import GamesPanel from '../../textBookPage/components/GamesPanel';
import WordList from '../../textBookPage/components/WordList';
import ModalContext from '../../../components/modal/ModalContext';
import { CollectionType, WordType } from '../../../interfaces';

function CollectionPart({
  data,
  type,
}: {
  data: WordType[];
  type: CollectionType;
}) {
  const { user } = useAppSelector((state) => state.persist.auth);
  const [clearPartOfCollection] = useClearPartOfCollectionMutation();
  const { setContent } = useContext(ModalContext);

  return (
    <li>
      <h3>{`${type}`} words</h3>
      <button
        type="button"
        disabled={!data.length}
        onClick={() => {
          clearPartOfCollection({
            userId: user!.localId,
            collectionType: type,
          });
        }}
      >
        Clear this part of collection
      </button>

      <button
        type="button"
        disabled={!(data.length > 10)}
        onClick={() => {
          setContent(<GamesPanel data={data} />);
        }}
      >
        Play
      </button>

      <WordList data={data} />
    </li>
  );
}

export default CollectionPart;
