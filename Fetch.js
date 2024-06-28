
/*
 * Fetch
 */

class Fetch {
  
  options = {
    defaultResponseType: 'json'
  };
  
  
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
  methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'];
  
  responseTypes = ['json', 'text', 'stream'];
  
  
  constructor() {
    
    const { defaultRespType } = this.options;
    
    this.methods.forEach(method => {
      
      // define methods for default resp type
      this[method] =
        this.getMethod(
          method,
          defaultRespType
        );

      // define methods for all resp types
      this.responseTypes.forEach(respType => {
        
        this[method][respType] =
          this.getMethod(
            method,
            respType
          );
        
      });
      
    });
    
  }
  
  getMethod(method, respType) {
    
    return ((resource, options = {}) => {
      
      options.method = method;
      options.respType = respType;
      
      this.fetch(resource, options);
      
    });
    
  }
  
  
  async function fetch(resource, options) {
  
    const { isString, coerceValueToString } = this.util;
    
    
    if (isString(resource)) {
  
      resource = coerceValueToString(resource);
  
      resource = options.urlPrefix + resource;
      
    }
    
    
    const request = fetch(url, options);
    
    let resp = await request;
    
    
    if (options.respType === 'json') {
      
      resp.body = await resp.json();
      
    } else if (options.respType === 'text') {
      
      resp.body = await resp.text();
      
    }
    
    
    if (options.onlyBody) {
      
      return resp.body;
      
    }
    
    
    return resp;
    
  }
  
  
  util = {
    
    isString(x) {
      return Object.prototype.toString.call(x) === '[object String]'
    },
    
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion
    coerceValueToString(value) {
      
      return `${value}`;
      
    }
    
  }
  
}

window.Fetch = new Fetch();

