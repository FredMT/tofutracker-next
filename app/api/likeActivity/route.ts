import { NextRequest, NextResponse } from "next/server";
import { likeActivity } from "@/app/profile/[username]/components/actions";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    await likeActivity({ formData });
    return new NextResponse(
      JSON.stringify({ message: "Activity liked successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to like activity" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
