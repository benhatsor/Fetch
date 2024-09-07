
/*
 * Fetch
 */

class Fetch {
  
  fetchOptions = {
    defaultRespType: ['json', 'text']
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
  
    const { isString, coerceValueToString } = this.util;
    
    
    if (isString(resource) && options.prefix) {
  
      resource = coerceValueToString(resource);
  
      resource = options.prefix + resource;
      
    }
    
    
    const request = fetch(resource, options);
    
    let resp = await request;
    

    if ('respType' in options) {

      await this.parseRespBody(resp, options.respType);

    } else {
      
      await this.parseRespBody(resp, this.options.defaultRespType);
      
    }
    
    
    if (options.onlyBody !== false) {

      return resp.body;
      
    }
    
    
    return resp;
    
  }


  async parseRespBody(resp, respType) {

    const { isValidFunction, setReadOnlyProp } = this.util;


    if (!Array.isArray(respType)) {
      
      if (isValidFunction(respType, resp)) {

        const parse = resp[respType];
        const body = await parse();
        
        setReadOnlyProp(resp, 'body', body);

        return true;
        
      }

    } else if (respType.length !== 0) {

      const didParseBody = await this.parseRespBody(resp, respType[0]);

      if (!didParseBody) {
      
        respType.shift();

        return await this.parseRespBody(resp, respType);

      }

      return didParseBody;

    }

  }
  
  
  
  util = {

    isValidFunction(prop, obj) {

      return (prop in obj &&
              typeof obj[prop] === 'function');
      
    },
    
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

