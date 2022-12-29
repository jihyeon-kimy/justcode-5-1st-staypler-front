import React from 'react';
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

function RoomThemeFilter(props) {
  const filterType = 'theme';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  let checkedItems = queryParams.get(filterType);
  const checkedItemsToArray = queryParams.get(filterType)?.split(',');
  if (checkedItemsToArray?.length > 1) {
    checkedItems = `${checkedItemsToArray[0]} 외${
      checkedItemsToArray?.length - 1
    } `;
  }

  const submitHandler = event => {
    event.preventDefault();

    const checkedValues = Array.from(event.target.theme)
      .filter(el => el.checked === true)
      .map(el => el.id)
      .toString();

    queryParams.set(filterType, checkedValues);
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
        {checkedItems || '테마'}
      </FilterItem>

      {props.selectedFilter === filterType && (
        <SelectModal
          header="테마"
          onClose={() => {
            props.onClick(filterType);
          }}
          type={filterType}
          submitBtn="top"
        >
          <CheckList
            checkList={THEME_LIST}
            type={filterType}
            onSubmit={submitHandler}
          />
        </SelectModal>
      )}
    </div>
  );
}

export default RoomThemeFilter;
