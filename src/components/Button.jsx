import { Link } from 'react-router-dom';

export const Button = (props) => {
  if (props.onClick) {
    return (
      <button className="button" onClick={props.onClick}>
        {props.text}
      </button>
    );
  } else if (props.page) {
    return (
      <Link to={props.page}>
        <button className="button">{props.text}</button>
      </Link>
    );
  }
  return <button>{props.text}</button>;
};
