import { TfiClose } from 'react-icons/tfi';
import css from './SearchModalHeader.module.scss';

function SearchHeader(props) {
  return (
    <header className={css.header}>
      <h3>{props.children}</h3>
      <TfiClose onClick={props.onClose} />
    </header>
  );
}

export default SearchHeader;
