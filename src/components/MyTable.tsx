import "./MyTable.css";
export default function MyTable(props) {
  return (
    <div class="table">{props.children}</div>
  );
}
