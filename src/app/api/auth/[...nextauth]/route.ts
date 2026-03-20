import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		status: "ok",
		message: "Auth endpoint placeholder",
	});
}

export async function POST(request: Request) {
	const body = await request.json();
	return NextResponse.json({ status: "ok", data: body });
}
