import "./NewsItem.css";
export default function NewsItem(props) {
  let current_date = Date.now()
  let elapsed = Math.floor((current_date - props.date) / (3600000 * 24))
  let is_new = elapsed < 31 ? " <span class=\"recent\">(New!)</span>" : ""
  let item_date = new Date(props.date)
  let day = item_date.getDate()
  let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][item_date.getMonth()]
  if (is_new) {
    return (
      <div class="tr"><div class="left-col"><strong>{day} {month}</strong> <span class="recent">(New!)</span></div><div>{props.children}</div></div>
    );
  } else {
    return (
      <div class="tr"><div class="left-col"><strong>{day} {month}</strong></div><div>{props.children}</div></div>
    );

  }
}
