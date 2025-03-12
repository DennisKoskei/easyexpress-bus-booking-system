//import { NextResponse } from "next/server";

//import { prisma } from "@utils/prisma";
//
//const prisma = new PrismaClient();
//
//// 🟢 GET: Fetch all users
//export async function GET() {
//  try {
//    const users = await prisma.user.findMany();
//    console.log("API Fetch Users:", users); // ✅ Console log in API route
//    return NextResponse.json(users);
//  } catch (error) {
//    console.error("API Error fetching users:", error);
//    return NextResponse.json(
//      { error: "Failed to fetch users" },
//      { status: 500 },
//    );
//  }
//}
//
//// 🔵 POST: Add a new user
//export async function POST(req: Request) {
//  try {
//    const { name, email, role } = await req.json();
//
//    if (!name || !email || !role) {
//      return NextResponse.json(
//        { error: "Missing required fields" },
//        { status: 400 },
//      );
//    }
//
//    //const newUser = await prisma.user.create({
//    //data: { name, email, role },
//    //});
//
//    console.log("User Created:", newUser);
//    return NextResponse.json(newUser, { status: 201 });
//  } catch (error) {
//    console.error("API Error creating user:", error);
//    return NextResponse.json(
//      { error: "Failed to create user" },
//      { status: 500 },
//    );
//  }
//}
//
//// 🟠 PUT: Update a user by ID
//export async function PUT(req: Request) {
//  try {
//    const { id, name, email, role } = await req.json();
//
//    if (!id) {
//      return NextResponse.json(
//        { error: "User ID is required" },
//        { status: 400 },
//      );
//    }
//
//    const updatedUser = await prisma.user.update({
//      where: { id },
//      data: { name, email, role },
//    });
//
//    console.log("User Updated:", updatedUser);
//    return NextResponse.json(updatedUser, { status: 200 });
//  } catch (error) {
//    console.error("API Error updating user:", error);
//    return NextResponse.json(
//      { error: "Failed to update user" },
//      { status: 500 },
//    );
//  }
//}
//
//// 🔴 DELETE: Remove a user by ID
//export async function DELETE(req: Request) {
//  try {
//    const { id } = await req.json();
//
//    if (!id) {
//      return NextResponse.json(
//        { error: "User ID is required" },
//        { status: 400 },
//      );
//    }
//
//    await prisma.user.delete({ where: { id } });
//
//    console.log("User Deleted:", id);
//    return NextResponse.json(
//      { message: "User deleted successfully" },
//      { status: 200 },
//    );
//  } catch (error) {
//    console.error("API Error deleting user:", error);
//    return NextResponse.json(
//      { error: "Failed to delete user" },
//      { status: 500 },
//    );
//  }
//}
