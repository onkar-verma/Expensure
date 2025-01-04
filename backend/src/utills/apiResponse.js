export const apiResponse = (
    res,
    statusCode,
    data = null,
    message,
    meta = null,
    success
  ) => {
    if (!Number.isInteger(statusCode) || statusCode < 100 || statusCode > 599) {
      throw new Error("Invalid status code");
    }
  
    if (typeof success !== "boolean") {
      throw new Error("Invalid success value provided to apiResponse");
    }
  
    const response = {
      success,
      statusCode,
      success: true,
      data: data || null,
      ...(meta ? { meta } : {}),
      message: message || (success ? "Request successful" : "An error occurred"),
      timestamp: new Date().toISOString(),
    };
  
    return res.status(statusCode).json(response);
  };
  