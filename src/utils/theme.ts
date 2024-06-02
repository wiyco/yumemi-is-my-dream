import { useTheme } from "next-themes";

function isDarkTheme() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark";
}

export { isDarkTheme };
