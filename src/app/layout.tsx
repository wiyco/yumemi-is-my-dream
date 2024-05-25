import "@styles/globals.scss";

import type { Metadata } from "next";
import Image from "next/image";

import { Header } from "@/components/Header";

import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "YUMEMI is My Dream",
  description: "Challenge from YUMEMI Inc. created by @wiyco",
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
          <Header className="px-6">
            <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between">
              <h1 className="font-semibold">Challenge from YUMEMI Inc.</h1>
              <Image
                src="/logo/logo-color.png"
                alt="logo"
                width={36}
                height={36}
              />
            </div>
          </Header>
          {children}
        </Provider>
      </body>
    </html>
  );
}
