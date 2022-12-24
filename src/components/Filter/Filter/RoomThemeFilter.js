import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckList from '../SelectModal/CheckList';
import FilterItem from '../FilterItem';
import SelectModal from '../SelectModal/SelectModal';

const THEME_LIST = [
  { id: 1, type: '사색', name: '사색' },
  { id: 2, type: '갤러리', name: '갤러리' },
  { id: 3, type: '노천탕', name: '노천탕' },
  { id: 4, type: '가족여행', name: '가족여행' },
  { id: 5, type: '파티하우스', name: '파티하우스' },
  { id: 6, type: '디자인투어', name: '디자인투어' },
  { id: 7, type: '도심속휴식', name: '도심속휴식' },
  { id: 8, type: '정적인휴식', name: '정적인휴식' },
  { id: 9, type: '오션뷰', name: '오션뷰' },
  { id: 10, type: '풀빌라', name: '풀빌라' },
];

function RoomThemeFilter() {
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

    const checkedValues = Array.from(event.target.theme)
      .filter(el => el.checked === true)
      .map(el => el.id)
      .toString();

    queryParams.set('theme', checkedValues);
    navigate(`?${queryParams.toString()}`);
    closeCheckboxHandler();
  };

  return (
    <div>
      <FilterItem onClick={toggleCheckboxHandler}>테마</FilterItem>

      {visibleCheckBox && (
        <SelectModal
          header="테마"
          onClose={closeCheckboxHandler}
          type="theme"
          submitBtn="top"
        >
          <CheckList
            checkList={THEME_LIST}
            type="theme"
            onSubmit={submitHandler}
          />
        </SelectModal>
      )}
    </div>
  );
}

export default RoomThemeFilter;
