import React, { useState } from 'react';
import SelectModal from '../SelectModal/SelectModal';
import CheckList from '../CheckList/CheckList';
import FilterItem from '../FilterItem';
import { useLocation, useNavigate } from 'react-router-dom';

const ROOM_TYPE_LIST = [
  { id: 1, type: '게스트하우스', name: 'Guest_house' },
  { id: 2, type: '호텔', name: 'Hotel' },
  { id: 3, type: '민박', name: 'Bed_Breakfast' },
  { id: 4, type: '펜션', name: 'Pension' },
  { id: 5, type: '모텔', name: 'Motel' },
];

function SelectType() {
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

    const checkedValues = Array.from(event.target.type)
      .filter(el => el.checked === true)
      .map(el => el.id)
      .toString();

    queryParams.set('type', checkedValues);
    navigate(`?${queryParams.toString()}`);
    closeCheckboxHandler();
  };

  return (
    <div>
      <FilterItem onClick={toggleCheckboxHandler}>스테이 유형</FilterItem>

      {visibleCheckBox && (
        <SelectModal
          header="스테이 유형"
          onClose={closeCheckboxHandler}
          type="type"
          submitBtn="top"
        >
          <CheckList
            checkList={ROOM_TYPE_LIST}
            type="type"
            onSubmit={submitHandler}
          />
        </SelectModal>
      )}
    </div>
  );
}

export default SelectType;
