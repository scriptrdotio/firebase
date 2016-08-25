/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
var config = require("./config");
var httpClient = require("./httpclient");

function Firebase(dto) {
  this.projectName = dto && dto.projectName? dto.projectName: config.projectName;
  this.secret = config.secret;
  
  this.httpClient = new httpClient.HttpClient();
}

/**
 * @method getData
 * @param {String} [tree] : name of the requested data tree. Optional
 * @return {Object} data stored at location
 * @throw {Error} the method can throw exceptions
 */
Firebase.prototype.getData = function(tree) {
  var req = {};

  req.url = this.projectName + tree + ".json";
  req.url = req.url + "?auth=" + this.secret;
  
  req.method = "GET";  
  
  var response  = this.httpClient.callApi(req);
  if (response.timeout) {
    throw {
      errorCode: "Invocation_Error",
      errorDetail: "timeout"
    }
  }
  
  return response;
};

Firebase.prototype.putData = function(key, data) {
  var req = {};

  req.url = this.projectName + key + ".json";
  req.url = req.url + "?auth=" + this.secret;
  req.method = "PUT";
  req.bodyString = JSON.stringify(data);
  
  var http = require('http');
  console.log(JSON.stringify(req));
  var response  = http.request(req);
  
  return response;
};

Firebase.prototype.patchData = function(key, data) {
  var req = {};

  req.url = this.projectName + key + ".json";
  req.url = req.url + "?auth=" + this.secret;
  req.method = "PATCH";
  req.bodyString = JSON.stringify(data);
  
  var http = require('http');
  //console.log(JSON.stringify(req));
  var response  = http.request(req);
  console.log(JSON.stringify(response));
  return response;
};

Firebase.prototype.postData = function(key, data) {
  var req = {};

  req.url = this.projectName + key + ".json";
  req.url = req.url + "?auth=" + this.secret;
  req.method = "POST";
  req.bodyString = JSON.stringify(data);
  
  var response  = this.httpClient.callApi(req);
  if (response.timeout) {
    throw {
      errorCode: "Invocation_Error",
      errorDetail: "timeout"
    }
  }
  
  return response;
};

Firebase.prototype.queryData = function(key, query) {
  var req = {};

  req.url = this.projectName + key + ".json";
  req.url = req.url + "?auth=" + this.secret;
  req.url = req.url + "&orderBy=%22" + query.orderBy + "%22";
  req.url = req.url + "&equalTo=%22" + query.equalTo + "%22";
  req.method = "GET";
  
  var response  = this.httpClient.callApi(req);
  if (response.timeout) {
    throw {
      errorCode: "Invocation_Error",
      errorDetail: "timeout"
    }
  }
  
  return response;
};