import { NextResponse } from "next/server";

import type { ReasasPrefecturesResponse } from "@/types/resas";

export async function GET() {
  const data = (await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": process.env.RESAS_API_KEY!,
      },
    }
  )
    .then((res) => res.json())
    .catch(() => null)) as ReasasPrefecturesResponse | null;

  if (!data) {
    return NextResponse.json(
      { message: "Error!", result: [] },
      { status: 500 }
    );
  }

  return NextResponse.json(data, {
    status: 200,
  });
}
