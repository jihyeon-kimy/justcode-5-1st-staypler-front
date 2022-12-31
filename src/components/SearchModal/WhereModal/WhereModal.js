import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import css from './WhereModal.module.scss';
import SearchModalLayout from '../SearchModalLayout';

const regionsList = [
  {
    id: 1,
    name: 'Texas',
  },
  {
    id: 2,
    name: 'California',
  },
  {
    id: 3,
    name: 'New York',
  },
  {
    id: 4,
    name: 'Kansas',
  },
  {
    id: 5,
    name: 'Georgia',
  },
  {
    id: 6,
    name: 'Washington',
  },
  {
    id: 7,
    name: 'Kentucky',
  },
  {
    id: 8,
    name: 'Pennsylvania',
  },
  {
    id: 9,
    name: 'Florida',
  },
];

function WhereModal({ onClose }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('');

  const clickLocationHandler = e => {
    setSelectedRegion(e.currentTarget.innerText);
  };

  const searchLocationHandler = () => {
    queryParams.set('province', selectedRegion);
    navigate(`/findstay?${queryParams.toString()}`);
    onClose();
  };

  return (
    <SearchModalLayout
      header="어디로 떠날까요?"
      onClose={onClose}
      onSearch={searchLocationHandler}
    >
      <div className={css.search}>
        <AiOutlineSearch />
        <div className={css.inputbox}>
          <label hidden htmlFor="search">
            지역 검색
          </label>
          <input
            id="search"
            type="text"
            placeholder="원하는 스테이지/지역을 검색해 보세요."
          />
        </div>
      </div>
      <h5 className={css.tagsTitle}>해외</h5>
      <ul className={css.tags}>
        {regionsList.map(city => (
          <li
            className={city.name === selectedRegion ? css.selected : ''}
            key={city.id}
            onClick={clickLocationHandler}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </SearchModalLayout>
  );
}

export default WhereModal;
