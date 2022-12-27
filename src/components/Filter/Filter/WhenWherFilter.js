import WhenModal from '../../SearchModal/WhenModal/WhenModal';
import WhereModal from '../../SearchModal/WhereModal/WhereModal';
import FilterItem from '../FilterItem';
import css from './WhenWhereFilter.module.scss';

function WhenWhereFilter(props) {
  return (
    <>
      <label className={css.label}>여행지/숙소</label>
      <input
        type="text"
        className={css['stay-input']}
        ref={props.stayInputRef}
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
      {props.selectedFilter === 'where' && (
        <WhereModal
          onClose={() => {
            props.onClick('where');
          }}
        />
      )}

      <span className={css.label}>체크인</span>
      <FilterItem
        onClick={() => {
          props.onClick('when');
        }}
      >
        체크인
      </FilterItem>
      <span className={css.label}>체크아웃</span>
      <FilterItem
        onClick={() => {
          props.onClick('when');
        }}
      >
        체크아웃
      </FilterItem>
      {props.selectedFilter === 'when' && (
        <WhenModal
          onClose={() => {
            props.onClick('when');
          }}
        />
      )}
    </>
  );
}

export default WhenWhereFilter;
