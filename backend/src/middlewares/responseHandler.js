import { apiResponse } from "../utils/ApiResponse.js";

const responseHandler = (req, res, next) => {
  
  res.apiResponse = (statusCode, success, message, data = null, meta = null) => {
    return apiResponse(res, statusCode, success, message, data, meta);
  };

  next();
};

export default responseHandler;
