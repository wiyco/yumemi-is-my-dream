import "@styles/globals.scss";

import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Image from "next/image";

import { Header } from "@/components/Header";
import { cn } from "@/utils/cn";

import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "YUMEMI is My Dream",
  description: "Challenge from YUMEMI Inc. created by @wiyco",
};

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div className={cn("yumemi-is-my-dream-root", notoSansJp.className)}>
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
        </div>
      </body>
    </html>
  );
}
