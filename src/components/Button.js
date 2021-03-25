const Button = (props) => (
    
    <button className={"App-box " + props.className} data-pro={props.label} onClick={props.onClick}>
      {props.label}
      
    </button>)
  export default Button;
