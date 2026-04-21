
import { NextResponse } from "next/server";

export function errorResponse(err) {
  console.error(`[API Error] ${err.name || "Error"}: ${err.message}`);

  let message = err.message || "Server Error";
  let statusCode = err.statusCode || 500;
  let code = err.code || undefined;

  // MongoDB CastError (invalid ObjectId)
  if (err.name === "CastError") {
    message = "Resource not found";
    statusCode = 404;
  }

  // MongoDB Duplicate Key
  if (err.code === 11000) {
    message = "Duplicate field value entered";
    statusCode = 400;
  }

  // Mongoose Validation
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((v) => v.message)
      .join(", ");
    statusCode = 400;
  }

  // JWT errors
  if (err.name === "TokenExpiredError") {
    message = "Token expired";
    statusCode = 401;
    code = "TOKEN_EXPIRED";
  }

  if (err.name === "JsonWebTokenError") {
    message = "Invalid token";
    statusCode = 401;
  }

  return NextResponse.json(
    { success: false, error: message, ...(code && { code }) },
    { status: statusCode }
  );
}
