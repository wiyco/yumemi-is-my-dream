import { describe, expect, test } from "vitest";

describe("Prefectures API", () => {
  test("GET /api/v1/prefectures", async () => {
    const res = await fetch(`http://localhost:3000/api/v1/prefectures`);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBe(null);
    expect(data.result.length).toBe(47);
  });
});
