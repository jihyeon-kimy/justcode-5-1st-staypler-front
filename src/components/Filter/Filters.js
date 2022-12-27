import React, { useRef, useState } from 'react';
import PriceFilter from './Filter/PriceFilter';
import RoomTypeFilter from './Filter/RoomTypeFilter';
import RoomThemeFilter from './Filter/RoomThemeFilter';
import NumOfPeopleFilter from './Filter/NumOfPeopleFilter';
import css from './Filters.module.scss';
import ButtonRound from '../UI/Button/ButtonRound';
import { useLocation, useNavigate } from 'react-router-dom';
import WhenWhereFilter from './Filter/WhenWherFilter';

function Filters() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const stayInputRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('');

  const toggleSelectModalHandler = filterType => {
    setSelectedFilter(prev => (prev === filterType ? '' : filterType));
  };

  const searchHandler = () => {
    queryParams.set('search', stayInputRef.current.value);
    navigate(`?${queryParams.toString()}`);
  };

  return (
    <div>
      <div className={css['filter-wrapper']}>
        <WhenWhereFilter
          onClick={toggleSelectModalHandler}
          selectedFilter={selectedFilter}
          stayInputRef={stayInputRef}
        />
      </div>

      <div className={css['filter-wrapper']}>
        <NumOfPeopleFilter
          onClick={toggleSelectModalHandler}
          selectedFilter={selectedFilter}
        />
        <PriceFilter
          onClick={toggleSelectModalHandler}
          selectedFilter={selectedFilter}
        />
        <RoomTypeFilter
          onClick={toggleSelectModalHandler}
          selectedFilter={selectedFilter}
        />
        <RoomThemeFilter
          onClick={toggleSelectModalHandler}
          selectedFilter={selectedFilter}
        />
      </div>

      <ButtonRound
        type="button"
        className={css['search-btn']}
        onClick={searchHandler}
      >
        SEARCH →
      </ButtonRound>
    </div>
  );
}

export default Filters;
