import "@styles/globals.scss";

import type { Metadata } from "next";

import { Header } from "@/components/Header";

import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "Yumemi Front Exam",
  description: "Yumemi Front Exam created by @wiyco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Provider
          nextThemeProviderProps={{
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
            disableTransitionOnChange: true,
          }}
        >
          <Header className="grid place-content-center">
            Yumemi Front Exam
          </Header>
          {children}
        </Provider>
      </body>
    </html>
  );
}
