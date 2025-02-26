import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const e_user = await User.findOne({ email }).select("_id");
        console.log(e_user);
        return NextResponse.json({ e_user })

    } catch (error) {
        console.log("Error occured");
    }
}