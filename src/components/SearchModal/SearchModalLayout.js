import ButtonRound from '../UI/Button/ButtonRound';
import Card from '../UI/Card/Card';
import ModalLayout from '../UI/Modal/ModalLayout';
import SearchHeader from './SearchModalHeader';
import css from './SearchModalLayout.module.scss';

function SearchModalLayout(props) {
  return (
    <ModalLayout onClose={props.onClose}>
      <Card className={css.modal}>
        <SearchHeader onClose={props.onClose}>{props.header}</SearchHeader>
        <section className={css.content}>{props.children}</section>
        <ButtonRound className={css.searchBtn} onClick={props.onSearch}>
          Search →
        </ButtonRound>
      </Card>
    </ModalLayout>
  );
}

export default SearchModalLayout;
