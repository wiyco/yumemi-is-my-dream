import "@styles/globals.scss";

import type { Metadata } from "next";

import { Header } from "@/components/Header";

import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "Yumemi is my dream",
  description: "Yumemi front exam created by @wiyco",
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
