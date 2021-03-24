const Button = (props) => (
    <button className={"App-box " + props.className} onClick={props.onClick}>
      {props.label}
    </button>)
  export default Button;
  