import React from 'react';
import { useLocation } from 'react-router-dom';
import css from './CheckList.module.scss';

function CheckList(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <form
      id={props.type}
      className={css['check-list']}
      onSubmit={props.onSubmit}
    >
      <ul>
        {props.checkList.map(item => {
          return (
            <li key={item.id} className={css.item}>
              <label id={item.name} value={item.name}>
                {item.type}
              </label>
              <input
                type="checkbox"
                htmlFor={item.name}
                id={item.name}
                name={props.type}
                defaultChecked={queryParams.get(props.type).includes(item.name)}
              />
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default CheckList;
