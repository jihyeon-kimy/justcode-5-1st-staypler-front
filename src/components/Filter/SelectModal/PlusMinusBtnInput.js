import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import css from './PlusMinusBtnInput.module.scss';

function PlusMinusBtnInput(props) {
  const [numOfPeople, setNumOfPeople] = useState(0);

  const PlusNumOfPeople = () => {
    setNumOfPeople(prev => prev + 1);
  };

  const MinusNumOfPeople = () => {
    if (numOfPeople > 0) {
      setNumOfPeople(prev => prev - 1);
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.title}>
        <label id={props.type}>{props.type}</label>
        <p>{props?.desc}</p>
      </div>
      <div className={css.counter}>
        <button type="button" onClick={MinusNumOfPeople}>
          <AiOutlineMinus />
        </button>
        <input
          name={props.name}
          id={props.type}
          htmlFor={props.type}
          value={numOfPeople}
          onChange={e => setNumOfPeople(e.target.value)}
        />
        <button type="button" onClick={PlusNumOfPeople}>
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}

export default PlusMinusBtnInput;
