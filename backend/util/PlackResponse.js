export class PlackResponse {
    constructor(status) {
      this.status = status;
      this.headers = {};
      this.responseBody = ''; // Changed property name to responseBody
    }
  
    contentType(type) {
      this.headers['Content-Type'] = type;
    }
  
    setBody(content) { // Renamed the method to setBody
      this.responseBody = content;
    }
  
    finalize() {
      return {
        statusCode: this.status,
        headers: this.headers,
        body: this.responseBody,
      };
    }
  }