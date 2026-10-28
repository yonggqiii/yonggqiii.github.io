export default function Icon(props: { name?: "arrow" | "external" | "mail" | "menu" | "close" | "reset" | "sun" | "moon"; class?: string }) {
  const paths = {
    arrow: "M4 12h16m-6-6 6 6-6 6",
    external: "M6 18 18 6M6 6h12v12",
    mail: "M3 6h18v12H3V6Zm0 0 9 7 9-7",
    menu: "M4 7h16M4 12h16M4 17h16",
    close: "m6 6 12 12M6 18 18 6",
    reset: "M4 10a8 8 0 1 1 2 8M4 4v6h6",
    sun: "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5",
    moon: "M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z",
  };

  return (
    <svg class={props.class} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d={paths[props.name ?? "arrow"]} />
    </svg>
  );
}
