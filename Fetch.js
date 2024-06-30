
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
    
    
    if (!resp.ok) {
      
      const descriptor = this.getStatusCodeDescriptor(resp.status);
      
      if (descriptor) {
      
        console.error('Request failed: ' + descriptor);
        
      }
      
    }
    
    
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
  
  

  // Status code descriptors
  // Auto-generated from:
  // https://httpwg.org/specs/rfc9110.html#overview.of.status.codes
  
  // Generation code:
  /* const wrapper = document
       .querySelector('[id="status.codes"]');
     const classEl = wrapper
       .querySelectorAll(':scope > section[id^="status"] > h3 > a[href^="#status"]');
     const codeEl = wrapper
       .querySelectorAll(':scope > section[id^="status"] > section[id^="status"] > h4 > a[href^="#status"]');
  
    let statusCodeClasses = [];
    classEl.forEach(classTitle => {
      let className = classTitle.textContent.split(' ');
      className.pop();
      statusCodeClasses.push(className.join(' '));
    });
    
    let statusCodeDescriptors = {};
    codeEl.forEach(codeTitle => {
      const [code, ...descriptor] = codeTitle.textContent.split(' ');
      if (descriptor.includes('(Unused)')) return;
      statusCodeDescriptors[code] = descriptor.join(' ');
    });
  */
  
  statusCodeClasses = ['Informational', 'Successful', 'Redirection', 'Client Error', 'Server Error'];
  
  statusCodeDescriptors = {"100":"Continue","101":"Switching Protocols","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Content Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","421":"Misdirected Request","422":"Unprocessable Content","426":"Upgrade Required","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported"};
  
  
  getStatusCodeDescriptor(code) {
    
    code = String(code);
    const firstDigit = Number(code[0]);
    
    const codeClass = this.statusCodeClasses[firstDigit];
    const codeDescriptor = this.statusCodeDescriptors[code];
    
    if (!codeClass || !codeDescriptor) return;
    
    return `${codeDescriptor} (${codeClass})`;
    
  }
  
}

Fetch = new Fetch();

