// /app/api/user/route-suggestions/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

// Define the type of the results from the Prisma query
// interface Route {
//   departure: string;
//   destination: string;
// }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // "departure" or "destination"
  const query = searchParams.get("query");
  console.log("Type: --> ", type);
  console.log("Query: --> ", query);

  if (!type || !query || (type !== "departure" && type !== "destination")) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  try {
    const results = await prisma.route.findMany({
      where: {
        [type]: {
          contains: query,
        },
      },
      distinct: [type],
      select: {
        [type]: true,
      },
    });

    // Explicitly type cast the results based on the defined Route interface
    const suggestions = results
      .map((r) => r[type as "departure" | "destination"])
      .filter((v) => typeof v === "string");

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
