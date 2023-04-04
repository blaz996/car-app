import React from 'react';
import { observer } from 'mobx-react';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';

import './Pagination.scss';

type PaginationProps = {
  currPage: number;
  nextPage: () => void;
  previousPage: () => void;
};

export const Pagination = observer(
  ({ currPage, nextPage, previousPage }: PaginationProps) => {
    return (
      <div className='pagination'>
        <button onClick={previousPage} className='pagination__btn'>
          <HiOutlineChevronLeft />
        </button>
        <button className='pagination__btn'>{currPage}</button>
        <button onClick={nextPage} className='pagination__btn'>
          <HiOutlineChevronRight />
        </button>
      </div>
    );
  }
);
