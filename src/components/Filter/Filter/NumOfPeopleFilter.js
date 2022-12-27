import React from 'react';
import FilterItem from '../FilterItem';
import SelectModal from '../SelectModal/SelectModal';
import PlusMinusBtnInput from '../SelectModal/PlusMinusBtnInput';
import { useLocation, useNavigate } from 'react-router-dom';

function NumOfPeopleFilter(props) {
  const filterType = 'NumOfPeople';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const submitHandler = event => {
    event.preventDefault();
    const SumSelectedNum = Array.from(event.target.NumOfPeople)
      .map(el => +el.value)
      .reduce((acc, cur) => acc + cur);

    queryParams.set('max_limit', SumSelectedNum);
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
        인원
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
          <form onSubmit={submitHandler} id="NumOfPeople">
            <PlusMinusBtnInput type="성인" name="NumOfPeople" />
            <PlusMinusBtnInput
              type="아동"
              desc="24개월~12개월"
              name={filterType}
            />
            <PlusMinusBtnInput
              type="영아"
              desc="24개월 미만"
              name={filterType}
            />
          </form>
        </SelectModal>
      )}
    </div>
  );
}

export default NumOfPeopleFilter;
