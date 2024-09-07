
/*
 * Fetch
 */

class Fetch {
  
  options = {
    defaultRespType: 'json'
  };
  
  
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
  methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'];
  
  respTypes = ['json', 'text', 'stream'];
  
  
  constructor() {
    
    const { defaultRespType } = this.options;
    
    this.methods.forEach(method => {
      
      method = method.toLowerCase();
      debugger;
      // define methods for default resp type
      this[method] =
        this.getMethod(
          method,
          defaultRespType
        );

      // define methods for all resp types
      this.respTypes.forEach(respType => {
        
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
  
    const { setReadOnlyProp, isString, coerceValueToString } = this.util;
    
    
    if (isString(resource) && options.prefix) {
  
      resource = coerceValueToString(resource);
  
      resource = options.prefix + resource;
      
    }
    
    
    const request = fetch(resource, options);
    
    let resp = await request;
    
    
    if (options.respType === 'json') {

      const body = await resp.json();
      
      setReadOnlyProp(resp, 'body', body);
      
    } else if (options.respType === 'text') {
      
      const body = await resp.text();
      
      setReadOnlyProp(resp, 'body', body);
      
    }
    
    
    if (options.onlyBody !== false) {

      return resp.body;
      
    }
    
    
    return resp;
    
  }
  
  
  util = {

    setReadOnlyProp(obj, prop, value) {
      
      Object.defineProperty(obj, prop, {
        value: value
      });
      
    },
    
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

