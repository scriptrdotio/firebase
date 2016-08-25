/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
var http = require("http");

function HttpClient(dto) {
  
  this.username = dto ? dto.username :  "";
}

HttpClient.prototype.callApi = function(params) {
  
  try {   
     return this._callApi(params);
  } catch(response) {
     this._handleError(response);    
  }
};

HttpClient.prototype._callApi = function(params) {
  
  params.headers = { "Content-Type": "application/json" };
  
  //console.log(JSON.stringify(params));
  var response = http.request(params);
  //console.log("Received following response  : " + JSON.stringify(response));
  if (response.status >= "200" && response.status < "300") {
    
    if (response.body && response.body != null) {
      var responseBody = JSON.parse(response.body);
      if (responseBody.message) {
        throw response;
      } else {
        return responseBody;
      }
    }
    else {
      return response;
    }
  } else {
    throw response;
  }
};
  
HttpClient.prototype._handleError = function(response) {
   
  var errorObj = "";
  try {
    
    errorObj = JSON.parse(response.body);
  }catch(e) {
    
    try {
      errorObj = JSON.parse(response);
    }catch(e) {
      errorObj = response;
    }
  };

  throw {
    "errorCode": "Invocation_Error",
    "errorDetail": errorObj
  };
};