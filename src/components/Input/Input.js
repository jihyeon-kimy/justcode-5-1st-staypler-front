import css from './Input.module.scss';

function Input(props) {
  return (
    <div className={`${css.inputbox} ${props.hasError ? css.invalid : ''}`}>
      <label htmlFor={props.id}>{props.title}</label>
      <input
        name={props.id}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <p className={css.error}>{props.hasError && props.errorMessage}</p>
    </div>
  );
}

export default Input;
