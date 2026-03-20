import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const signature = request.headers.get("x-webhook-signature");

	if (!signature) {
		return NextResponse.json(
			{ error: "Missing signature" },
			{ status: 401 },
		);
	}

	const body = await request.json();

	return NextResponse.json({ received: true, type: body.type });
}
