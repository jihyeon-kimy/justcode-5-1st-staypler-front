import css from './FilterItem.module.scss';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

function FilterItem(props) {
  return (
    <button
      className={`${css.item} ${props.className}`}
      onClick={props.onClick}
    >
      <p>{props.children}</p>
      <MdOutlineKeyboardArrowDown />
    </button>
  );
}

export default FilterItem;
