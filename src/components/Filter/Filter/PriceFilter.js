import React from 'react';
import MultiRangeSlider from '../SelectModal/MultiRangeSlider';
import FilterItem from '../FilterItem';
import SelectModal from '../SelectModal/SelectModal';
import { useLocation, useNavigate } from 'react-router-dom';

const PriceFilter = props => {
  const filterType = 'price';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const submitHandler = event => {
    event.preventDefault();

    let newQuery = {};
    Array.from(event.target.price).forEach(el => (newQuery[el.id] = el.value));

    queryParams.set('min_price', newQuery.min_price * 10000);
    queryParams.set('max_price', newQuery.max_price * 10000);
    navigate(`?${queryParams.toString()}`);
    props.onClick(filterType);
  };

  return (
    <div>
      <FilterItem
        onClick={() => {
          props.onClick(filterType);
        }}
      >
        가격 범위
      </FilterItem>

      {props.selectedFilter === filterType && (
        <SelectModal
          header="가격 범위"
          onClose={() => {
            props.onClick(filterType);
          }}
          type={filterType}
          submitBtn="bottom"
        >
          <MultiRangeSlider
            type={filterType}
            onSubmit={submitHandler}
            min={0}
            max={100}
          />
        </SelectModal>
      )}
    </div>
  );
};

export default PriceFilter;
