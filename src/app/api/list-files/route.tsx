import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:cloudComputing")
      .execute();

    const files = result.resources.map((resource: any) => ({
      public_id: resource.public_id,
      format: resource.format,
      url: resource.secure_url,
      resource_type: resource.resource_type,
    }));

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error listing files:", error);
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}
