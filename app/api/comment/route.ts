import { NextRequest, NextResponse } from "next/server";
import { comment } from "@/app/profile/[username]/components/actions";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    await comment({ formData });
    return new NextResponse(
      JSON.stringify({ message: "Comment added successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to add comment" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
