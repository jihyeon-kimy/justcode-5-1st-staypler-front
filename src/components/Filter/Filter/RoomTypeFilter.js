import React from 'react';
import SelectModal from '../SelectModal/SelectModal';
import CheckList from '../SelectModal/CheckList';
import FilterItem from '../FilterItem';
import { useLocation, useNavigate } from 'react-router-dom';

const ROOM_TYPE_LIST = [
  { id: 1, type: '게스트하우스', name: 'Guest_house' },
  { id: 2, type: '호텔', name: 'Hotel' },
  { id: 3, type: '민박', name: 'Bed_Breakfast' },
  { id: 4, type: '펜션', name: 'Pension' },
  { id: 5, type: '모텔', name: 'Motel' },
];

function RoomTypeFilter(props) {
  const filterType = 'type';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const submitHandler = event => {
    event.preventDefault();

    const checkedValues = Array.from(event.target.type)
      .filter(el => el.checked === true)
      .map(el => el.id)
      .toString();

    queryParams.set('type', checkedValues);
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
        스테이 유형
      </FilterItem>

      {props.selectedFilter === filterType && (
        <SelectModal
          header="스테이 유형"
          onClose={() => {
            props.onClick(filterType);
          }}
          type={filterType}
          submitBtn="top"
        >
          <CheckList
            checkList={ROOM_TYPE_LIST}
            type={filterType}
            onSubmit={submitHandler}
          />
        </SelectModal>
      )}
    </div>
  );
}

export default RoomTypeFilter;
