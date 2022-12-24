import React, { useState } from 'react';
import MultiRangeSlider from './MultiRangeSlider';
import FilterItem from '../FilterItem';
import SelectModal from '../SelectModal/SelectModal';
import { useLocation, useNavigate } from 'react-router-dom';

const SelectPrice = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [visibleCheckBox, setVisibleCheckBox] = useState(false);

  const toggleCheckboxHandler = () => {
    setVisibleCheckBox(prev => !prev);
  };

  const closeCheckboxHandler = () => {
    setVisibleCheckBox(false);
  };

  const submitHandler = event => {
    event.preventDefault();

    let newQuery = {};
    Array.from(event.target.price).forEach(el => (newQuery[el.id] = el.value));

    queryParams.set('min_price', newQuery.min_price);
    queryParams.set('max_price', newQuery.max_price);
    navigate(`?${queryParams.toString()}`);
    closeCheckboxHandler();
  };

  return (
    <div>
      <FilterItem onClick={toggleCheckboxHandler}>가격 범위</FilterItem>

      {visibleCheckBox && (
        <SelectModal
          header="가격 범위"
          onClose={closeCheckboxHandler}
          type="price"
          submitBtn="bottom"
        >
          <MultiRangeSlider
            type="price"
            onSubmit={submitHandler}
            min={0}
            max={100}
          />
        </SelectModal>
      )}
    </div>
  );
};

export default SelectPrice;
