import { NextResponse } from "next/server";

import type { ReasasPrefecturesResponse } from "@/types/resas";

export async function GET() {
  try {
    /** @see {@link https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html} */
    const res = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
      {
        headers: {
          "X-API-KEY": process.env.RESAS_API_KEY!,
        },
      }
    );
    if (!res.ok) {
      return NextResponse.json(
        { message: "Error", result: [] },
        { status: 500 }
      );
    }

    const data: ReasasPrefecturesResponse = await res.json();
    if (!data) {
      return NextResponse.json(
        { message: "Error", result: [] },
        { status: 500 }
      );
    }

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error", result: [] }, { status: 500 });
  }
}
