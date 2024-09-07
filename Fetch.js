
/*
 * Fetch
 */

class Fetch {
  
  options = {
    defaultRespType: 'json'
  };
  
  
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
  methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'];
  
  
  constructor() {
    
    const { defaultRespType } = this.options;
    
    this.methods.forEach(method => {
      
      method = method.toLowerCase();

      this[method] = this.getMethod(method);
      
    });
    
  }
  
  getMethod(method) {
    
    method = method.toUpperCase();
    
    return ((resource, options = {}) => {
      
      options.method = method;
      
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
    
    
    await this.setRespBody(resp, options);
    
    
    if (options.onlyBody !== false) {

      return resp.body;
      
    }
    
    
    return resp;
    
  }


  async setRespBody(resp, options) {

    if (options.respType === 'stream') return;

    if (options.respType in resp &&
        typeof resp[options.respType] === 'function') {
    
      const parse = resp[options.respType];
    
      const body = await parse();

    } else if (this.options.defaultRespType in resp &&
               typeof resp[this.options.defaultRespType] === 'function') {

      const parse = resp[this.options.defaultRespType];
    
      const body = await parse();

    } else {

      return;
      
    }
    
    setReadOnlyProp(resp, 'body', body);

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

