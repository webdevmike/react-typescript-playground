import { useTheme } from "~/routes/Theme/ThemeProvider";
import { ThemeProvider } from "~/routes/Theme/ThemeProvider";

export default function Theme() {
  return (
    <ThemeProvider>
      <Child />
    </ThemeProvider>
  );
}

function Child() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}
