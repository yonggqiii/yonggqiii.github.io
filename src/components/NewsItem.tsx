import type { NewsEntry } from "../data/news";
import { formatNewsDate } from "../data/news";

export default function NewsItem(props: { entry: NewsEntry; includeYear?: boolean }) {
  return (
    <div class="news-item">
      <time class="news-date" dateTime={props.entry.date}>{formatNewsDate(props.entry.date, props.includeYear)}</time>
      <div class="news-copy">{props.entry.content()}</div>
    </div>
  );
}
