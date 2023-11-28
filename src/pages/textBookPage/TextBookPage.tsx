import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import PagePicker from './components/PagePicker';
import GroupSelect from './components/GroupSelect';
import { useGetAllWordsQuery } from '../../store/wordsApi';
import WordList from './components/WordList';
import ModalContext from '../../components/modal/ModalContext';
import GamesPanel from './components/GamesPanel';
import { StyledMain } from '../../styled/SharedStyles';
import Spinner from '../../components/spinner/Spinner';

const StyledTextBook = styled(StyledMain)`
  justify-content: space-between;
`;

const StyledTextBookSettings = styled('div')`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  position: sticky;
  bottom: 0;
  left: 0;
  background-color: white;
  width: 100%;
`;

function TextBookPage() {
  const [page, setPage] = useState(0);
  const [group, setGroup] = useState(0);

  const { data, isLoading } = useGetAllWordsQuery(
    { group, page },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const pageMemo = useMemo(() => ({ page, setPage }), [page]);
  const groupMemo = useMemo(() => ({ group, setGroup }), [group]);

  const { setContent } = useContext(ModalContext);

  if (isLoading) return <Spinner />;

  if (data) {
    return (
      <StyledTextBook>
        <WordList data={data} />
        <StyledTextBookSettings>
          <PagePicker values={pageMemo} />
          <GroupSelect values={groupMemo} />
          <button
            type="button"
            onClick={() => {
              setContent(<GamesPanel data={data} />);
            }}
          >
            Practice this set of words
          </button>
        </StyledTextBookSettings>
      </StyledTextBook>
    );
  }

  return <div>No data found</div>;
}

export default TextBookPage;
