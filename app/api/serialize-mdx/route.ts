import { NextRequest, NextResponse } from "next/server";
import { serializeMDX } from "@/lib/mdx";

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required and must be a string" },
        { status: 400 }
      );
    }

    const mdxContent = await serializeMDX(content);

    return NextResponse.json({ mdxContent });
  } catch (error) {
    console.error("Error serializing MDX:", error);
    return NextResponse.json(
      { error: "Failed to serialize MDX content" },
      { status: 500 }
    );
  }
}

