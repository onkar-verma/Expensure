class ApiError extends Error {
    constructor(
      statusCode,
      message = "Something Went Wrong!",
      errors = [],
      data = null,
      stack = " "
    ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false;
      this.errors = errors;
      this.data = data;
      this.timestamp = new Date().toISOString();
      this.stack =
        process.env.NODE_ENV === "development" ? stack || this.stack : undefined;
    }
  
    static badRequest(message, errors = [], data = null) {
      return new ApiError(400, message, errors, data);
    }
  
    static unauthorizedAccess(message, errors = [], data = null) {
      return new ApiError(401, message, errors, data);
    }
  
    static internalServerError(
      message = "Internal Server Error",
      errors = [],
      data = null
    ) {
      return new ApiError(500, message, errors, data);
    }
  
    static notFound(message, errors = [], data = null) {
      return new ApiError(404, message, errors, data);
    }
  }
  
  export default ApiError;
  