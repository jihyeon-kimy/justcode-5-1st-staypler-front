import { TfiClose } from 'react-icons/tfi';
import css from './SelectModal.module.scss';
import ButtonRound from '../../UI/Button/ButtonRound';

function SelectModal(props) {
  return (
    <div className={css.modal}>
      <div className={css.header}>
        <h5>{props.header}</h5>
        <TfiClose onClick={props.onClose} />
      </div>
      <ButtonRound
        type="submit"
        className={css['submit-btn']}
        form={props.type}
      >
        적용하기
      </ButtonRound>
      {props.children}
    </div>
  );
}

export default SelectModal;
