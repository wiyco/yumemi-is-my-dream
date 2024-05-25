import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemeProvider } from "next-themes";

/** @see {@link https://github.com/pacocoursey/next-themes} */

export function Provider(props: {
  children: React.ReactNode;
  jotaiProviderProps?: Omit<
    React.ComponentProps<typeof JotaiProvider>,
    "children"
  >;
  nextThemeProviderProps?: Omit<
    React.ComponentProps<typeof NextThemeProvider>,
    "children"
  >;
}) {
  return (
    <JotaiProvider {...props.jotaiProviderProps}>
      <NextThemeProvider {...props.nextThemeProviderProps}>
        {props.children}
      </NextThemeProvider>
    </JotaiProvider>
  );
}
