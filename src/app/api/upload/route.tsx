import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  if (files.length === 0) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  try {
    const uploadPromises = files.map(async (file) => {
      const buffer = await file.arrayBuffer();
      const base64File = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${file.type};base64,${base64File}`;

      return cloudinary.uploader.upload(dataURI, {
        folder: "cloudComputing",
      });
    });

    const results = await Promise.all(uploadPromises);

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
