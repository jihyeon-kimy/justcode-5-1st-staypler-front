import { useLocation } from 'react-router-dom';
import WhenModal from '../../SearchModal/WhenModal/WhenModal';
import WhereModal from '../../SearchModal/WhereModal/WhereModal';
import FilterItem from '../FilterItem';
import css from './WhenWhereFilter.module.scss';

function WhenWhereFilter(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let checkedDates = { start_date: '', end_date: '' };
  if (queryParams.has('start_date') && queryParams.has('end_date')) {
    checkedDates = {
      start_date: queryParams.get('start_date'),
      end_date:
        queryParams.get('end_date') === 'null'
          ? ''
          : queryParams.get('end_date'),
    };
  }

  const SearchHandler = e => {
    if (e.key === 'Enter') {
      props.onSearch();
    }
  };

  return (
    <>
      {props.selectedFilter === 'where' && (
        <WhereModal
          onClose={() => {
            props.onClick('where');
          }}
        />
      )}
      {props.selectedFilter === 'when' && (
        <WhenModal
          onClose={() => {
            props.onClick('when');
          }}
        />
      )}

      <div className={css.container}>
        <div className={css.row}>
          <label className={`${css.label} ${css['stay-label']} `}>
            여행지/숙소
          </label>
          <input
            type="text"
            className={css['stay-input']}
            ref={props.stayInputRef}
            onKeyDown={SearchHandler}
          />
          <button
            className={css['stay-search-btn']}
            type="button"
            onClick={() => {
              props.onClick('where');
            }}
          >
            해외전체
          </button>
        </div>

        <div className={css.row}>
          <span className={css.label}>체크인</span>
          <FilterItem
            className={css['checkinout-filter']}
            onClick={() => {
              props.onClick('when');
            }}
          >
            {checkedDates.start_date || '체크인'}
          </FilterItem>
          <span className={css.label}>체크아웃</span>
          <FilterItem
            className={css['checkinout-filter']}
            onClick={() => {
              props.onClick('when');
            }}
          >
            {checkedDates.end_date || '체크아웃'}
          </FilterItem>
        </div>
      </div>
    </>
  );
}

export default WhenWhereFilter;
