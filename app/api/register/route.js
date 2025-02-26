import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { username, email, password, class_name } = await req.json();
        const hashedpassword = await bcrypt.hash(password,10)
        await connectMongoDB();
        await User.create({username,email,password:hashedpassword,class_name});

        return NextResponse.json({ message: "User registered" }, { status: 201 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Error occurred" }, { status: 500 });
    }
}
