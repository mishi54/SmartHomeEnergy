class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.status = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    this.data = data;
  }
}

export { ApiResponse };
