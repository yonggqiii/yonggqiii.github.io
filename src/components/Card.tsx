import "./Card.css";
export default function Card(props) {
  return (
    <div class={`${props.border}-border card`}>
      <h2 class={props.header_color}>{props.header}</h2>
      {props.children}
    </div>
  );
}
