import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RxDotFilled } from 'react-icons/rx';
import css from './SortFilter.module.scss';

const SortFilter = () => {
  const filterType = 'sort';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const submitHandler = event => {
    let selectedItem = event.target.id === 'latest' ? '' : event.target.id;

    if (queryParams.get(filterType) !== selectedItem) {
      queryParams.set(filterType, selectedItem);
      navigate(`?${queryParams.toString()}`);
    }
  };

  return (
    <div className={css['sort-filter']}>
      <input
        type="radio"
        id="latest"
        name="sort"
        onClick={submitHandler}
        defaultChecked
      />
      <label className={css.tag} htmlFor="latest">
        <RxDotFilled />
        최신순
      </label>
      <input type="radio" id="likes" name="sort" onClick={submitHandler} />
      <label className={css.tag} htmlFor="likes">
        <RxDotFilled />
        인기순
      </label>
      <input type="radio" id="min_price" name="sort" onClick={submitHandler} />
      <label className={css.tag} htmlFor="min_price">
        <RxDotFilled />
        낮은 가격순
      </label>
    </div>
  );
};

export default SortFilter;
