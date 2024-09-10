
/*
 * Fetch
 */

class Fetch {
  
  defaults = {
    responseType: ['json', 'text'],
    onlyBody: true
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
  
  
  async fetch(resource, options = {}) {
  
    const { isString, coerceValueToString } = this.util;
    

    if ('prefix' in options &&
        isString(options.prefix) &&
        isString(resource)) {
  
      resource = coerceValueToString(resource);
      const prefix = coerceValueToString(options.prefix);
      
      resource = prefix + resource;
      
    }
    
    
    const request = fetch(resource, options);
    
    let resp = await request;
    

    // set default options
    for (option in this.defaults) {

      if (!(option in options)) {

        options[option] = this.defaults[option];

      }

    }

    
    await this.parseRespBody(resp, options.responseType);

    if (options.onlyBody) {
      
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

