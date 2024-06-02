# YUMEMI is My Dream

This project was created by `npx create-next-app@latest` command.

[Next.js](https://github.com/vercel/next.js) framework starter repository.

## Docs

- [Next.js](https://nextjs.org/docs)

## Development

First, you must install packages.

```bash
npm i
```

### Environment Variables

Create a `.env.local` file in the project's root directory and define the following variables:

```bash
RESAS_API_KEY=YourApiKey
```

#### RESAS

RESAS is Japan's Regional Economy and Society Analyzing System.

For more details, please refer to the [official page](https://resas.go.jp). The API documentation can be found [here](https://opendata.resas-portal.go.jp/docs/api/v1/index.html).

## Tech Stack

I wanted to use SafeParse with [Zod](https://zod.dev), but for better readability (easier to review), I aimed for simpler code.

| Environments | Languages | Frameworks | Libraries | Testing | CI/CD |
| :---         | :---      | :---       | :---      | :---    | :---  |
| ![node-logo]<br>![vercel-logo]<br>![eslint-logo]<br>![stylelint-logo]<br>![prettier-logo] | ![ts-logo]<br>![sass-logo] | ![react-logo]<br>![next-logo]<br>![tailwind-logo] | ![swr-logo] | ![vitest-logo] | ![githubactions-logo] |

[ts-logo]: https://img.shields.io/badge/-TypeScript-3178C6.svg?logo=typescript&style=flat&logoColor=ffffff
[sass-logo]: https://img.shields.io/badge/-Sass-CC6699.svg?logo=sass&style=flat&logoColor=ffffff
[eslint-logo]: https://img.shields.io/badge/-ESLint-4B32C3.svg?logo=eslint&style=flat&logoColor=ffffff
[stylelint-logo]: https://img.shields.io/badge/-Stylelint-263238.svg?logo=stylelint&style=flat&logoColor=ffffff
[prettier-logo]: https://img.shields.io/badge/-Prettier-F7B93E.svg?logo=prettier&style=flat&logoColor=262626
[node-logo]: https://img.shields.io/badge/-Node.js-5FA04E.svg?logo=nodedotjs&style=flat&logoColor=ffffff
[vercel-logo]: https://img.shields.io/badge/-Vercel-000000.svg?logo=vercel&style=flat&logoColor=ffffff
[githubactions-logo]: https://img.shields.io/badge/-GitHub%20Actions-2088FF.svg?logo=githubactions&style=flat&logoColor=ffffff
[react-logo]: https://img.shields.io/badge/-React-61DAFB.svg?logo=react&style=flat&logoColor=262626
[next-logo]: https://img.shields.io/badge/-Next.js-000000.svg?logo=nextdotjs&style=flat&logoColor=ffffff
[vitest-logo]: https://img.shields.io/badge/-Vitest-6E9F18.svg?logo=vitest&style=flat&logoColor=ffffff
[tailwind-logo]: https://img.shields.io/badge/-Tailwind%20CSS-06B6D4.svg?logo=tailwindcss&style=flat&logoColor=ffffff
[swr-logo]: https://img.shields.io/badge/-SWR-000000.svg?logo=swr&style=flat&logoColor=ffffff

## Packages

1. [clsx & tailwind-merge](#1-clsx--tailwind-merge)
2. [next-themes](#2-next-themes)
3. [swr](#3-swr)
4. [vitest](#4-vitest)
5. [chart.js & react-chartjs-2](#5-chartjs--react-chartjs-2)

### 1. clsx & tailwind-merge

By using these two packages, you can concatenate class names and prevent duplication in Tailwind.

> [!NOTE]
>
> The script is located in `src/utils/cn.ts`.

### 2. [next-themes](https://github.com/pacocoursey/next-themes)

For applying color themes.

This package supports light mode and dark mode by default.

### 3. [swr](https://swr.vercel.app)

Useful libraries for client-side (means: `use client`) fetching.

### 4. [vitest](https://vitest.dev/guide)

This package is used for testing (such as unit tests).

> [!IMPORTANT]
>
> To perform UI testing, you need to configure the [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) package and set up [Vitest config](https://github.com/wiyco/yumemi-is-my-dream/blob/284412168517d30dbf626fd694ff769159d15069/vitest.config.mts#L16).

### 5. chart.js & react-chartjs-2

A component for drawing charts. Good design and expandability.

- [chart.js](https://www.chartjs.org/docs/latest)
- [react-chartjs-2](https://react-chartjs-2.js.org)

---

🐢
