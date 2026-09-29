import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const contentType = request.headers.get("content-type") || "";

		let body: Record<string, unknown> = {};

		if (contentType.includes("application/json")) {
			// JSON
			body = await request.json();
            
		} else if (contentType.includes("application/x-www-form-urlencoded")) {
			// Form URL Encoded
			const formData = await request.formData();

			formData.forEach((value, key) => {
				body[key] = value;
			});
		} else if (contentType.includes("multipart/form-data")) {
			// Multipart Form Data
			const formData = await request.formData();

			formData.forEach((value, key) => {
				body[key] = value;
			});
		} else {
			return NextResponse.json(
				{ success: false, message: "Unsupported Content-Type" },
				{ status: 415 }
			);
		}

		const username = body.username;
		const password = body.password;
		const hwId = body.hwId;

		if (!username) {
			return NextResponse.json(
				{ success: false, message: "Username is required" },
				{ status: 400 }
			);
		}

		if (!password) {
			return NextResponse.json(
				{ success: false, message: "Password is required" },
				{ status: 400 }
			);
		}

		if (!hwId) {
			return NextResponse.json(
				{ success: false, message: "hwId is required" },
				{ status: 400 }
			);
		}

		// Static credentials for testing
		if (username !== "admin") {
			return NextResponse.json(
				{ success: false, message: "User not found" },
				{ status: 401 }
			);
		}
		if (password !== "password") {
			return NextResponse.json(
				{ success: false, message: "Invalid password" },
				{ status: 401 }
			);
		}

		return NextResponse.json({
			success: true,
			message: "Login successful",
			username,
			hwId,
		});
	} catch {
		return NextResponse.json(
			{ success: false, message: "Invalid request body" },
			{ status: 400 }
		);
	}
}
