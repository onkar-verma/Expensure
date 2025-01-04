import ApiError from "../utils/ApiError.js";
import { apiResponse } from "../utils/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (err instanceof ApiError) {
    return apiResponse(
      res,
      statusCode,
      false,
      err.message || "An error occurred",
      err.data || null,
      { errors: err.errors || [] }
    );
  }

  // Loging unexpected errors
  console.error(`[Unhandled Error]: ${err.message}`, {
    stack: err.stack,
  });

  // Handling unexpected errors
  return apiResponse(
    res,
    500,
    false,
    "Internal Server Error",
    null,
    process.env.NODE_ENV === "development" ? { stack: err.stack } : {}
  );
};

export default errorHandler;
