import css from './Input.module.css';

function Input(props) {
  return (
    <div className={css.inputbox}>
      <label htmlFor={props.id}>{props.title}</label>
      <input
        name={props.id}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <p className={css.error}>{props.hasError && props.errorMessage}</p>
    </div>
  );
}

export default Input;
