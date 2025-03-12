import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@utils/auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Define upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, `${userId}-${file.name}`);

    // Save file to the filesystem
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const profilePhotoUrl = `/uploads/${userId}-${file.name}`;

    // Update user profile photo URL in database
    await prisma.user.update({
      where: { id: userId },
      data: { profilePhoto: profilePhotoUrl },
    });

    return NextResponse.json({ profilePhoto: profilePhotoUrl });
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    return NextResponse.json(
      { error: "Failed to upload profile photo" },
      { status: 500 },
    );
  }
}
