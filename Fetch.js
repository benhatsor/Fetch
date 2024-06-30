
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
      
      method = method.toLowerCase();
      
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
    
    method = method.toUpperCase();
    
    return ((resource, options = {}) => {
      
      options.method = method;
      options.respType = respType;
      
      return this.fetch(resource, options);
      
    });
    
  }
  
  
  async fetch(resource, options) {
  
    const { isString, coerceValueToString } = this.util;
    
    
    if (isString(resource) && options.prefix) {
  
      resource = coerceValueToString(resource);
  
      resource = options.prefix + resource;
      
    }
    
    
    const request = fetch(resource, options);
    
    let resp = await request;
      
    resp = new Response(resp);
    
    
    if (options.respType === 'json') {
      
      resp.json = await resp.json();
      
    } else if (options.respType === 'text') {
      
      resp.text = await resp.text();
      
    } else if (options.respType === 'stream') {
      
      resp.stream = resp.body;
      
    }
    
    
    if (options.onlyBody) {
      
      if (options.respType === 'json') {
      
        return resp.json;
        
      } else if (options.respType === 'text') {
        
        return resp.text;
        
      } else if (options.respType === 'stream') {
      
        return resp.stream;
        
      }
      
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

Fetch = new Fetch();

