import css from './Card.module.scss';

function Card(props) {
  return (
    <div className={`${css.card} ${props.className}`}>{props.children}</div>
  );
}

export default Card;
