import { createSignal, onCleanup, onMount } from "solid-js";
import Icon from "./Icon";

type Theme = "light" | "dark";

export const themeInitialization = `(() => {
  let saved;
  try { saved = localStorage.getItem("theme"); } catch {}
  const theme = saved === "light" || saved === "dark"
    ? saved
    : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#16161d" : "#f9f8f4");
})();`;

export default function ThemeToggle() {
  const [theme, setTheme] = createSignal<Theme>("light");
  let preference: Theme | null = null;

  const applyTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#16161d" : "#f9f8f4");
  };

  onMount(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") preference = saved;
    } catch {}
    applyTheme(preference ?? (systemTheme.matches ? "dark" : "light"));

    const followSystemTheme = () => {
      if (!preference) applyTheme(systemTheme.matches ? "dark" : "light");
    };
    systemTheme.addEventListener("change", followSystemTheme);
    onCleanup(() => systemTheme.removeEventListener("change", followSystemTheme));
  });

  const toggleTheme = () => {
    preference = theme() === "light" ? "dark" : "light";
    applyTheme(preference);
    try { localStorage.setItem("theme", preference); } catch {}
  };

  return (
    <button class="theme-toggle" type="button" aria-label={theme() === "dark" ? "Switch to light theme" : "Switch to dark theme"} title={theme() === "dark" ? "Switch to light theme" : "Switch to dark theme"} onClick={toggleTheme}>
      <Icon name="sun" class="theme-icon-light" />
      <Icon name="moon" class="theme-icon-dark" />
    </button>
  );
}
