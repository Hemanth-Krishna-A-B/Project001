import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { username, password, class_name } = await req.json();

        console.log("Received Data:");
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Class Name:", class_name);

        return NextResponse.json({ message: "User registered" }, { status: 201 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Error occurred" }, { status: 500 });
    }
}
