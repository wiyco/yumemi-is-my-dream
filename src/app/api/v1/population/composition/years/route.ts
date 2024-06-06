import { type NextRequest, NextResponse } from "next/server";

import type { ResasPopulationCompositionPerYearResponse } from "@/types/resas";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  /** @note prefCode */
  const pref = parseInt(request.nextUrl.searchParams.get("pref") ?? "");

  /** @note if the pref code is invalid, return 404 */
  if (isNaN(pref) || pref < 1 || pref > 47) {
    return NextResponse.json(
      { message: "Invalid pref code", result: [] },
      { status: 404 }
    );
  }

  try {
    /** @see {@link https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html} */
    const res = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${pref}`,
      {
        headers: {
          "X-API-KEY": process.env.RESAS_API_KEY!,
        },
      }
    );
    if (!res.ok)
      return NextResponse.json(
        { message: "Error", result: [] },
        { status: 500 }
      );

    const data: ResasPopulationCompositionPerYearResponse = await res.json();
    if (!data)
      return NextResponse.json(
        { message: "Error", result: [] },
        { status: 500 }
      );

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error", result: [] }, { status: 500 });
  }
}
