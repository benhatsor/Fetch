
/*
 * Fetch
 */

class Fetch {
  
  fetchOptions = {
    defaultResponseType: ['json', 'text']
  };
  
  
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
  methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'];
  
  
  constructor() {
        
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
    

    let prefix = options.prefix;
    
    if ('prefix' in options &&
        isString(prefix) &&
        isString(resource)) {
  
      resource = coerceValueToString(resource);
      prefix = coerceValueToString(prefix);
      
      resource = prefix + resource;
      
    }
    
    
    const request = fetch(resource, options);
    
    let resp = await request;
    

    if ('responseType' in options) {

      await this.parseRespBody(resp, options.responseType);

    } else {
      
      await this.parseRespBody(resp, this.fetchOptions.defaultResponseType);
      
    }
    
    
    if (options.onlyBody !== false) {

      return resp.body;
      
    }
    
    
    return resp;
    
  }


  async parseRespBody(resp, responseType) {

    const { isValidFunction, setReadOnlyProp } = this.util;


    if (!Array.isArray(responseType)) {
      
      if (isValidFunction(responseType, resp)) {

        const parse = resp[responseType];
        
        let body;
        
        try {
          
          body = await parse.call(resp);
          
        } catch(e) {
          
          return;
          
        }
        
        setReadOnlyProp(resp, 'body', body);

        return true;
        
      }

    } else if (responseType.length !== 0) {

      const didParseBody = await this.parseRespBody(resp, responseType[0]);

      if (!didParseBody) {
      
        responseType.shift();

        return await this.parseRespBody(resp, responseType);

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

