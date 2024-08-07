import 'events';
import 'stream';
import { Headers as Headers$1, Request as Request$1, FormData, File, Response as Response$1, fetch as fetch$1 } from 'undici';
import crypto from 'crypto';
import Streams from 'stream/web';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var multipart$1 = {};

var hasRequiredMultipart;

function requireMultipart () {
	if (hasRequiredMultipart) return multipart$1;
	hasRequiredMultipart = 1;
	/**
	 * Multipart Parser (Finite State Machine)
	 * usage:
	 * const multipart = require('./multipart.js');
	 * const body = multipart.DemoData(); 							   // raw body
	 * const body = Buffer.from(event['body-json'].toString(),'base64'); // AWS case
	 * const boundary = multipart.getBoundary(event.params.header['content-type']);
	 * const parts = multipart.Parse(body,boundary);
	 * each part is:
	 * { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }
	 *  or { name: 'key', data: <Buffer 41 41 41 41 42 42 42 42> }
	 */
	Object.defineProperty(multipart$1, "__esModule", { value: true });
	multipart$1.DemoData = multipart$1.getBoundary = multipart$1.parse = void 0;
	var ParsingState;
	(function (ParsingState) {
	    ParsingState[ParsingState["INIT"] = 0] = "INIT";
	    ParsingState[ParsingState["READING_HEADERS"] = 1] = "READING_HEADERS";
	    ParsingState[ParsingState["READING_DATA"] = 2] = "READING_DATA";
	    ParsingState[ParsingState["READING_PART_SEPARATOR"] = 3] = "READING_PART_SEPARATOR";
	})(ParsingState || (ParsingState = {}));
	function parse(multipartBodyBuffer, boundary) {
	    var lastline = '';
	    var contentDispositionHeader = '';
	    var contentTypeHeader = '';
	    var state = ParsingState.INIT;
	    var buffer = [];
	    var allParts = [];
	    var currentPartHeaders = [];
	    for (var i = 0; i < multipartBodyBuffer.length; i++) {
	        var oneByte = multipartBodyBuffer[i];
	        var prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
	        // 0x0a => \n
	        // 0x0d => \r
	        var newLineDetected = oneByte === 0x0a && prevByte === 0x0d;
	        var newLineChar = oneByte === 0x0a || oneByte === 0x0d;
	        if (!newLineChar)
	            lastline += String.fromCharCode(oneByte);
	        if (ParsingState.INIT === state && newLineDetected) {
	            // searching for boundary
	            if ('--' + boundary === lastline) {
	                state = ParsingState.READING_HEADERS; // found boundary. start reading headers
	            }
	            lastline = '';
	        }
	        else if (ParsingState.READING_HEADERS === state && newLineDetected) {
	            // parsing headers. Headers are separated by an empty line from the content. Stop reading headers when the line is empty
	            if (lastline.length) {
	                currentPartHeaders.push(lastline);
	            }
	            else {
	                // found empty line. search for the headers we want and set the values
	                for (var _i = 0, currentPartHeaders_1 = currentPartHeaders; _i < currentPartHeaders_1.length; _i++) {
	                    var h = currentPartHeaders_1[_i];
	                    if (h.toLowerCase().startsWith('content-disposition:')) {
	                        contentDispositionHeader = h;
	                    }
	                    else if (h.toLowerCase().startsWith('content-type:')) {
	                        contentTypeHeader = h;
	                    }
	                }
	                state = ParsingState.READING_DATA;
	                buffer = [];
	            }
	            lastline = '';
	        }
	        else if (ParsingState.READING_DATA === state) {
	            // parsing data
	            if (lastline.length > boundary.length + 4) {
	                lastline = ''; // mem save
	            }
	            if ('--' + boundary === lastline) {
	                var j = buffer.length - lastline.length;
	                var part = buffer.slice(0, j - 1);
	                allParts.push(process({ contentDispositionHeader: contentDispositionHeader, contentTypeHeader: contentTypeHeader, part: part }));
	                buffer = [];
	                currentPartHeaders = [];
	                lastline = '';
	                state = ParsingState.READING_PART_SEPARATOR;
	                contentDispositionHeader = '';
	                contentTypeHeader = '';
	            }
	            else {
	                buffer.push(oneByte);
	            }
	            if (newLineDetected) {
	                lastline = '';
	            }
	        }
	        else if (ParsingState.READING_PART_SEPARATOR === state) {
	            if (newLineDetected) {
	                state = ParsingState.READING_HEADERS;
	            }
	        }
	    }
	    return allParts;
	}
	multipart$1.parse = parse;
	//  read the boundary from the content-type header sent by the http client
	//  this value may be similar to:
	//  'multipart/form-data; boundary=----WebKitFormBoundaryvm5A9tzU1ONaGP5B',
	function getBoundary(header) {
	    var items = header.split(';');
	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = new String(items[i]).trim();
	            if (item.indexOf('boundary') >= 0) {
	                var k = item.split('=');
	                return new String(k[1]).trim().replace(/^["']|["']$/g, '');
	            }
	        }
	    }
	    return '';
	}
	multipart$1.getBoundary = getBoundary;
	function DemoData() {
	    var body = 'trash1\r\n';
	    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n';
	    body += 'Content-Type: text/plain\r\n';
	    body +=
	        'Content-Disposition: form-data; name="uploads[]"; filename="A.txt"\r\n';
	    body += '\r\n';
	    body += '@11X';
	    body += '111Y\r\n';
	    body += '111Z\rCCCC\nCCCC\r\nCCCCC@\r\n\r\n';
	    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n';
	    body += 'Content-Type: text/plain\r\n';
	    body +=
	        'Content-Disposition: form-data; name="uploads[]"; filename="B.txt"\r\n';
	    body += '\r\n';
	    body += '@22X';
	    body += '222Y\r\n';
	    body += '222Z\r222W\n2220\r\n666@\r\n';
	    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n';
	    body += 'Content-Disposition: form-data; name="input1"\r\n';
	    body += '\r\n';
	    body += 'value1\r\n';
	    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp--\r\n';
	    return {
	        body: Buffer.from(body),
	        boundary: '----WebKitFormBoundaryvef1fLxmoUdYZWXp'
	    };
	}
	multipart$1.DemoData = DemoData;
	function process(part) {
	    // will transform this object:
	    // { header: 'Content-Disposition: form-data; name="uploads[]"; filename="A.txt"',
	    // info: 'Content-Type: text/plain',
	    // part: 'AAAABBBB' }
	    // into this one:
	    // { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }
	    var obj = function (str) {
	        var k = str.split('=');
	        var a = k[0].trim();
	        var b = JSON.parse(k[1].trim());
	        var o = {};
	        Object.defineProperty(o, a, {
	            value: b,
	            writable: true,
	            enumerable: true,
	            configurable: true
	        });
	        return o;
	    };
	    var header = part.contentDispositionHeader.split(';');
	    var filenameData = header[2];
	    var input = {};
	    if (filenameData) {
	        input = obj(filenameData);
	        var contentType = part.contentTypeHeader.split(':')[1].trim();
	        Object.defineProperty(input, 'type', {
	            value: contentType,
	            writable: true,
	            enumerable: true,
	            configurable: true
	        });
	    }
	    // always process the name field
	    Object.defineProperty(input, 'name', {
	        value: header[1].split('=')[1].replace(/"/g, ''),
	        writable: true,
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(input, 'data', {
	        value: Buffer.from(part.part),
	        writable: true,
	        enumerable: true,
	        configurable: true
	    });
	    return input;
	}
	
	return multipart$1;
}

var multipartExports = requireMultipart();
var multipart = /*@__PURE__*/getDefaultExportFromCjs(multipartExports);

var setCookie = {exports: {}};

var hasRequiredSetCookie;

function requireSetCookie () {
	if (hasRequiredSetCookie) return setCookie.exports;
	hasRequiredSetCookie = 1;

	var defaultParseOptions = {
	  decodeValues: true,
	  map: false,
	  silent: false,
	};

	function isNonEmptyString(str) {
	  return typeof str === "string" && !!str.trim();
	}

	function parseString(setCookieValue, options) {
	  var parts = setCookieValue.split(";").filter(isNonEmptyString);

	  var nameValuePairStr = parts.shift();
	  var parsed = parseNameValuePair(nameValuePairStr);
	  var name = parsed.name;
	  var value = parsed.value;

	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  try {
	    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
	  } catch (e) {
	    console.error(
	      "set-cookie-parser encountered an error while decoding a cookie with value '" +
	        value +
	        "'. Set options.decodeValues to false to disable this feature.",
	      e
	    );
	  }

	  var cookie = {
	    name: name,
	    value: value,
	  };

	  parts.forEach(function (part) {
	    var sides = part.split("=");
	    var key = sides.shift().trimLeft().toLowerCase();
	    var value = sides.join("=");
	    if (key === "expires") {
	      cookie.expires = new Date(value);
	    } else if (key === "max-age") {
	      cookie.maxAge = parseInt(value, 10);
	    } else if (key === "secure") {
	      cookie.secure = true;
	    } else if (key === "httponly") {
	      cookie.httpOnly = true;
	    } else if (key === "samesite") {
	      cookie.sameSite = value;
	    } else {
	      cookie[key] = value;
	    }
	  });

	  return cookie;
	}

	function parseNameValuePair(nameValuePairStr) {
	  // Parses name-value-pair according to rfc6265bis draft

	  var name = "";
	  var value = "";
	  var nameValueArr = nameValuePairStr.split("=");
	  if (nameValueArr.length > 1) {
	    name = nameValueArr.shift();
	    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
	  } else {
	    value = nameValuePairStr;
	  }

	  return { name: name, value: value };
	}

	function parse(input, options) {
	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  if (!input) {
	    if (!options.map) {
	      return [];
	    } else {
	      return {};
	    }
	  }

	  if (input.headers) {
	    if (typeof input.headers.getSetCookie === "function") {
	      // for fetch responses - they combine headers of the same type in the headers array,
	      // but getSetCookie returns an uncombined array
	      input = input.headers.getSetCookie();
	    } else if (input.headers["set-cookie"]) {
	      // fast-path for node.js (which automatically normalizes header names to lower-case
	      input = input.headers["set-cookie"];
	    } else {
	      // slow-path for other environments - see #25
	      var sch =
	        input.headers[
	          Object.keys(input.headers).find(function (key) {
	            return key.toLowerCase() === "set-cookie";
	          })
	        ];
	      // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
	      if (!sch && input.headers.cookie && !options.silent) {
	        console.warn(
	          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
	        );
	      }
	      input = sch;
	    }
	  }
	  if (!Array.isArray(input)) {
	    input = [input];
	  }

	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  if (!options.map) {
	    return input.filter(isNonEmptyString).map(function (str) {
	      return parseString(str, options);
	    });
	  } else {
	    var cookies = {};
	    return input.filter(isNonEmptyString).reduce(function (cookies, str) {
	      var cookie = parseString(str, options);
	      cookies[cookie.name] = cookie;
	      return cookies;
	    }, cookies);
	  }
	}

	/*
	  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
	  that are within a single set-cookie field-value, such as in the Expires portion.

	  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
	  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
	  React Native's fetch does this for *every* header, including set-cookie.

	  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
	  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
	*/
	function splitCookiesString(cookiesString) {
	  if (Array.isArray(cookiesString)) {
	    return cookiesString;
	  }
	  if (typeof cookiesString !== "string") {
	    return [];
	  }

	  var cookiesStrings = [];
	  var pos = 0;
	  var start;
	  var ch;
	  var lastComma;
	  var nextStart;
	  var cookiesSeparatorFound;

	  function skipWhitespace() {
	    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
	      pos += 1;
	    }
	    return pos < cookiesString.length;
	  }

	  function notSpecialChar() {
	    ch = cookiesString.charAt(pos);

	    return ch !== "=" && ch !== ";" && ch !== ",";
	  }

	  while (pos < cookiesString.length) {
	    start = pos;
	    cookiesSeparatorFound = false;

	    while (skipWhitespace()) {
	      ch = cookiesString.charAt(pos);
	      if (ch === ",") {
	        // ',' is a cookie separator if we have later first '=', not ';' or ','
	        lastComma = pos;
	        pos += 1;

	        skipWhitespace();
	        nextStart = pos;

	        while (pos < cookiesString.length && notSpecialChar()) {
	          pos += 1;
	        }

	        // currently special character
	        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
	          // we found cookies separator
	          cookiesSeparatorFound = true;
	          // pos is inside the next cookie, so back up and return it.
	          pos = nextStart;
	          cookiesStrings.push(cookiesString.substring(start, lastComma));
	          start = pos;
	        } else {
	          // in param ',' or param separator ';',
	          // we continue from that comma
	          pos = lastComma + 1;
	        }
	      } else {
	        pos += 1;
	      }
	    }

	    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
	      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
	    }
	  }

	  return cookiesStrings;
	}

	setCookie.exports = parse;
	setCookie.exports.parse = parse;
	setCookie.exports.parseString = parseString;
	setCookie.exports.splitCookiesString = splitCookiesString;
	return setCookie.exports;
}

requireSetCookie();

function nodeToWeb(nodeStream) {
  var destroyed = false;
  var listeners = {};

  function start(controller) {
    listeners["data"] = onData;
    listeners["end"] = onData;
    listeners["end"] = onDestroy;
    listeners["close"] = onDestroy;
    listeners["error"] = onDestroy;
    for (var name in listeners) nodeStream.on(name, listeners[name]);

    nodeStream.pause();

    function onData(chunk) {
      if (destroyed) return;
      controller.enqueue(chunk);
      nodeStream.pause();
    }

    function onDestroy(err) {
      if (destroyed) return;
      destroyed = true;

      for (var name in listeners) nodeStream.removeListener(name, listeners[name]);

      if (err) controller.error(err);
      else controller.close();
    }
  }

  function pull() {
    if (destroyed) return;
    nodeStream.resume();
  }

  function cancel() {
    destroyed = true;

    for (var name in listeners) nodeStream.removeListener(name, listeners[name]);

    nodeStream.push(null);
    nodeStream.pause();
    if (nodeStream.destroy) nodeStream.destroy();
    else if (nodeStream.close) nodeStream.close();
  }

  return new ReadableStream({ start: start, pull: pull, cancel: cancel });
}

function createHeaders(requestHeaders) {
  let headers = new Headers$1();

  for (let [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  return headers;
}

class NodeRequest extends Request$1 {
  constructor(input, init) {
    if (init && init.data && init.data.on) {
      init = {
        duplex: "half",
        ...init,
        body: init.data.headers["content-type"]?.includes("x-www")
          ? init.data
          : nodeToWeb(init.data)
      };
    }

    super(input, init);
  }

  // async json() {
  //   return JSON.parse(await this.text());
  // }

  async buffer() {
    return Buffer.from(await super.arrayBuffer());
  }

  // async text() {
  //   return (await this.buffer()).toString();
  // }

  // @ts-ignore
  async formData() {
    if (this.headers.get("content-type") === "application/x-www-form-urlencoded") {
      return await super.formData();
    } else {
      const data = await this.buffer();
      const input = multipart.parse(
        data,
        this.headers.get("content-type").replace("multipart/form-data; boundary=", "")
      );
      const form = new FormData();
      input.forEach(({ name, data, filename, type }) => {
        // file fields have Content-Type set,
        // whereas non-file fields must not
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#multipart-form-data
        const isFile = type !== undefined;
        if (isFile) {
          const value = new File([data], filename, { type });
          form.append(name, value, filename);
        } else {
          const value = data.toString("utf-8");
          form.append(name, value);
        }
      });
      return form;
    }
  }

  // @ts-ignore
  clone() {
    /** @type {BaseNodeRequest & { buffer?: () => Promise<Buffer>; formData?: () => Promise<FormData> }}  */
    let el = super.clone();
    el.buffer = this.buffer.bind(el);
    el.formData = this.formData.bind(el);
    return el;
  }
}

function createRequest(req) {
  let origin = req.headers.origin && 'null' !== req.headers.origin
      ? req.headers.origin
      : `http://${req.headers.host}`;
  let url = new URL(req.url, origin);

  let init = {
    method: req.method,
    headers: createHeaders(req.headers),
    // POST, PUT, & PATCH will be read as body by NodeRequest
    data: req.method.indexOf("P") === 0 ? req : null
  };

  return new NodeRequest(url.href, init);
}

Object.assign(globalThis, Streams, {
  Request: Request$1,
  Response: Response$1,
  fetch: fetch$1,
  Headers: Headers$1
});

if (globalThis.crypto != crypto.webcrypto) {
  // @ts-ignore
  globalThis.crypto = crypto.webcrypto;
}

var manifest = {
	"/*404": [
	{
		type: "script",
		href: "/assets/_...404_-0edd0d82.js"
	},
	{
		type: "script",
		href: "/assets/entry-client-d4701ccc.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-3cd3a2b5.css"
	},
	{
		type: "script",
		href: "/assets/HttpStatusCode-6c198899.js"
	}
],
	"/cv/": [
	{
		type: "script",
		href: "/assets/index-87b97c52.js"
	},
	{
		type: "script",
		href: "/assets/entry-client-d4701ccc.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-3cd3a2b5.css"
	},
	{
		type: "script",
		href: "/assets/Card-69aa90f9.js"
	},
	{
		type: "style",
		href: "/assets/Card-73b0cb51.css"
	},
	{
		type: "style",
		href: "/assets/index-bfe03ba4.css"
	}
],
	"/fun": [
	{
		type: "script",
		href: "/assets/fun-c597658b.js"
	},
	{
		type: "script",
		href: "/assets/entry-client-d4701ccc.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-3cd3a2b5.css"
	},
	{
		type: "script",
		href: "/assets/HttpStatusCode-6c198899.js"
	}
],
	"/": [
	{
		type: "script",
		href: "/assets/index-4588935a.js"
	},
	{
		type: "script",
		href: "/assets/entry-client-d4701ccc.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-3cd3a2b5.css"
	},
	{
		type: "script",
		href: "/assets/Card-69aa90f9.js"
	},
	{
		type: "style",
		href: "/assets/Card-73b0cb51.css"
	}
],
	"/research": [
	{
		type: "script",
		href: "/assets/research-0b1f6881.js"
	},
	{
		type: "script",
		href: "/assets/entry-client-d4701ccc.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-3cd3a2b5.css"
	},
	{
		type: "script",
		href: "/assets/Card-69aa90f9.js"
	},
	{
		type: "style",
		href: "/assets/Card-73b0cb51.css"
	}
],
	"/teaching": [
	{
		type: "script",
		href: "/assets/teaching-e5090b9a.js"
	},
	{
		type: "script",
		href: "/assets/entry-client-d4701ccc.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-3cd3a2b5.css"
	},
	{
		type: "script",
		href: "/assets/Card-69aa90f9.js"
	},
	{
		type: "style",
		href: "/assets/Card-73b0cb51.css"
	}
],
	"entry-client": [
	{
		type: "script",
		href: "/assets/entry-client-d4701ccc.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-3cd3a2b5.css"
	}
],
	"index.html": [
]
};

const ERROR = Symbol("error");
function castError(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "Unknown error", {
    cause: err
  });
}
function handleError(err) {
  const error = castError(err);
  const fns = lookup(Owner, ERROR);
  if (!fns) throw error;
  for (const f of fns) f(error);
}
const UNOWNED = {
  context: null,
  owner: null,
  owned: null,
  cleanups: null
};
let Owner = null;
function createOwner() {
  const o = {
    owner: Owner,
    context: null,
    owned: null,
    cleanups: null
  };
  if (Owner) {
    if (!Owner.owned) Owner.owned = [o];else Owner.owned.push(o);
  }
  return o;
}
function createRoot(fn, detachedOwner) {
  const owner = Owner,
    root = fn.length === 0 ? UNOWNED : {
      context: null,
      owner: detachedOwner === undefined ? owner : detachedOwner,
      owned: null,
      cleanups: null
    };
  Owner = root;
  let result;
  try {
    result = fn(fn.length === 0 ? () => {} : () => cleanNode(root));
  } catch (err) {
    handleError(err);
  } finally {
    Owner = owner;
  }
  return result;
}
function createSignal(value, options) {
  return [() => value, v => {
    return value = typeof v === "function" ? v(value) : v;
  }];
}
function createComputed(fn, value) {
  Owner = createOwner();
  try {
    fn(value);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
}
const createRenderEffect = createComputed;
function createMemo(fn, value) {
  Owner = createOwner();
  let v;
  try {
    v = fn(value);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
  return () => v;
}
function batch(fn) {
  return fn();
}
const untrack = batch;
function on(deps, fn, options = {}) {
  const isArray = Array.isArray(deps);
  const defer = options.defer;
  return () => {
    if (defer) return undefined;
    let value;
    if (isArray) {
      value = [];
      for (let i = 0; i < deps.length; i++) value.push(deps[i]());
    } else value = deps();
    return fn(value);
  };
}
function onCleanup(fn) {
  if (Owner) {
    if (!Owner.cleanups) Owner.cleanups = [fn];else Owner.cleanups.push(fn);
  }
  return fn;
}
function cleanNode(node) {
  if (node.owned) {
    for (let i = 0; i < node.owned.length; i++) cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (let i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
    node.cleanups = null;
  }
}
function catchError(fn, handler) {
  Owner = {
    owner: Owner,
    context: {
      [ERROR]: [handler]
    },
    owned: null,
    cleanups: null
  };
  try {
    return fn();
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
}
function createContext(defaultValue) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext(context) {
  let ctx;
  return (ctx = lookup(Owner, context.id)) !== undefined ? ctx : context.defaultValue;
}
function getOwner() {
  return Owner;
}
function children(fn) {
  const memo = createMemo(() => resolveChildren(fn()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
function runWithOwner(o, fn) {
  const prev = Owner;
  Owner = o;
  try {
    return fn();
  } catch (err) {
    handleError(err);
  } finally {
    Owner = prev;
  }
}
function lookup(owner, key) {
  return owner ? owner.context && owner.context[key] !== undefined ? owner.context[key] : lookup(owner.owner, key) : undefined;
}
function resolveChildren(children) {
  if (typeof children === "function" && !children.length) return resolveChildren(children());
  if (Array.isArray(children)) {
    const results = [];
    for (let i = 0; i < children.length; i++) {
      const result = resolveChildren(children[i]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children;
}
function createProvider(id) {
  return function provider(props) {
    return createMemo(() => {
      Owner.context = {
        [id]: props.value
      };
      return children(() => props.children);
    });
  };
}

function resolveSSRNode$1(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode$1(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode$1(node());
  return String(node);
}
const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? {
    ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  } : undefined;
}
function createUniqueId() {
  const ctx = sharedConfig.context;
  if (!ctx) throw new Error(`createUniqueId cannot be used under non-hydrating context`);
  return `${ctx.id}${ctx.count++}`;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
function mergeProps(...sources) {
  const target = {};
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i];
    if (typeof source === "function") source = source();
    if (source) {
      const descriptors = Object.getOwnPropertyDescriptors(source);
      for (const key in descriptors) {
        if (key in target) continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i = sources.length - 1; i >= 0; i--) {
              let s = sources[i] || {};
              if (typeof s === "function") s = s();
              const v = s[key];
              if (v !== undefined) return v;
            }
          }
        });
      }
    }
  }
  return target;
}
function splitProps(props, ...keys) {
  const descriptors = Object.getOwnPropertyDescriptors(props),
    split = k => {
      const clone = {};
      for (let i = 0; i < k.length; i++) {
        const key = k[i];
        if (descriptors[key]) {
          Object.defineProperty(clone, key, descriptors[key]);
          delete descriptors[key];
        }
      }
      return clone;
    };
  return keys.map(split).concat(split(Object.keys(descriptors)));
}
function Show(props) {
  let c;
  return props.when ? typeof (c = props.children) === "function" ? c(props.keyed ? props.when : () => props.when) : c : props.fallback || "";
}
function ErrorBoundary$1(props) {
  let error,
    res,
    clean,
    sync = true;
  const ctx = sharedConfig.context;
  const id = ctx.id + ctx.count;
  function displayFallback() {
    cleanNode(clean);
    ctx.writeResource(id, error, true);
    setHydrateContext({
      ...ctx,
      count: 0
    });
    const f = props.fallback;
    return typeof f === "function" && f.length ? f(error, () => {}) : f;
  }
  createMemo(() => {
    clean = Owner;
    return catchError(() => res = props.children, err => {
      error = err;
      !sync && ctx.replace("e" + id, displayFallback);
      sync = true;
    });
  });
  if (error) return displayFallback();
  sync = false;
  return {
    t: `<!!$e${id}>${resolveSSRNode$1(res)}<!!$/e${id}>`
  };
}
const SuspenseContext = createContext();
function suspenseComplete(c) {
  for (const r of c.resources.values()) {
    if (r.loading) return false;
  }
  return true;
}
function startTransition(fn) {
  fn();
}
function Suspense(props) {
  let done;
  const ctx = sharedConfig.context;
  const id = ctx.id + ctx.count;
  const o = createOwner();
  const value = ctx.suspense[id] || (ctx.suspense[id] = {
    resources: new Map(),
    completed: () => {
      const res = runSuspense();
      if (suspenseComplete(value)) {
        done(resolveSSRNode$1(res));
      }
    }
  });
  function suspenseError(err) {
    if (!done || !done(undefined, err)) {
      runWithOwner(o.owner, () => {
        throw err;
      });
    }
  }
  function runSuspense() {
    setHydrateContext({
      ...ctx,
      count: 0
    });
    cleanNode(o);
    return runWithOwner(o, () => createComponent(SuspenseContext.Provider, {
      value,
      get children() {
        return catchError(() => props.children, suspenseError);
      }
    }));
  }
  const res = runSuspense();
  if (suspenseComplete(value)) return res;
  done = ctx.async ? ctx.registerFragment(id) : undefined;
  return catchError(() => {
    if (ctx.async) {
      setHydrateContext({
        ...ctx,
        count: 0,
        id: ctx.id + "0-f",
        noHydrate: true
      });
      const res = {
        t: `<template id="pl-${id}"></template>${resolveSSRNode$1(props.fallback)}<!pl-${id}>`
      };
      setHydrateContext(ctx);
      return res;
    }
    setHydrateContext({
      ...ctx,
      count: 0,
      id: ctx.id + "0-f"
    });
    ctx.writeResource(id, "$$f");
    return props.fallback;
  }, suspenseError);
}

var I=(c=>(c[c.AggregateError=1]="AggregateError",c[c.ArrayPrototypeValues=2]="ArrayPrototypeValues",c[c.ArrowFunction=4]="ArrowFunction",c[c.BigInt=8]="BigInt",c[c.ErrorPrototypeStack=16]="ErrorPrototypeStack",c[c.Map=32]="Map",c[c.MethodShorthand=64]="MethodShorthand",c[c.ObjectAssign=128]="ObjectAssign",c[c.Promise=256]="Promise",c[c.Set=512]="Set",c[c.Symbol=1024]="Symbol",c[c.TypedArray=2048]="TypedArray",c[c.BigIntTypedArray=4096]="BigIntTypedArray",c))(I||{});var be="hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_",ve=be.length,Ae="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_",ge=Ae.length;function se(e){let r=e%ve,n=be[r];for(e=(e-r)/ve;e>0;)r=e%ge,n+=Ae[r],e=(e-r)/ge;return n}var Le={disabledFeatures:0};function h(e={}){let r=Object.assign({},Le,e||{});return {markedRefs:new Set,refs:new Map,features:8191^r.disabledFeatures}}function V(e){return {stack:[],vars:[],assignments:[],validRefs:[],refSize:0,features:e.features,markedRefs:new Set(e.markedRefs),valueMap:new Map}}function R(e,r){e.markedRefs.add(r);}function m(e,r){let n=e.validRefs[r];n==null&&(n=e.refSize++,e.validRefs[r]=n);let t=e.vars[n];return t==null&&(t=se(n),e.vars[n]=t),t}function P(e,r){let n=e.refs.get(r);return n==null?e.refs.size:n}function z(e,r){let n=e.refs.get(r);if(n==null){let t=e.refs.size;return e.refs.set(r,t),t}return R(e,n),n}function S(e,r){if(!e)throw new Error(r)}function A$2(e){let r="",n=0;for(let t=0,a=e.length;t<a;t++){let o;switch(e[t]){case'"':o='\\"';break;case"\\":o="\\\\";break;case"<":o="\\x3C";break;case`
`:o="\\n";break;case"\r":o="\\r";break;case"\u2028":o="\\u2028";break;case"\u2029":o="\\u2029";break;default:continue}r+=e.slice(n,t)+o,n=t+1;}return n===0?r=e:r+=e.slice(n),r}var Ie={[0]:"Symbol.asyncIterator",[1]:"Symbol.hasInstance",[2]:"Symbol.isConcatSpreadable",[3]:"Symbol.iterator",[4]:"Symbol.match",[5]:"Symbol.matchAll",[6]:"Symbol.replace",[7]:"Symbol.search",[8]:"Symbol.species",[9]:"Symbol.split",[10]:"Symbol.toPrimitive",[11]:"Symbol.toStringTag",[12]:"Symbol.unscopables"},O={[Symbol.asyncIterator]:0,[Symbol.hasInstance]:1,[Symbol.isConcatSpreadable]:2,[Symbol.iterator]:3,[Symbol.match]:4,[Symbol.matchAll]:5,[Symbol.replace]:6,[Symbol.search]:7,[Symbol.species]:8,[Symbol.split]:9,[Symbol.toPrimitive]:10,[Symbol.toStringTag]:11,[Symbol.unscopables]:12};var T={t:2,i:void 0,s:!0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},U={t:2,i:void 0,s:!1,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},j={t:4,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},M={t:3,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},D={t:5,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},_={t:6,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},L={t:7,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},x={t:8,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0};function F(e){return {t:0,i:void 0,s:e,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function K(e){return {t:1,i:void 0,s:A$2(e),l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function W(e,r){return S(e.features&8,'Unsupported type "BigInt"'),{t:9,i:void 0,s:""+r,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function Y(e){return {t:10,i:e,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function Z(e,r){return {t:11,i:e,s:r.toISOString(),l:void 0,c:void 0,m:void 0,d:void 0,f:void 0,a:void 0}}function G(e,r){return {t:12,i:e,s:void 0,l:void 0,c:r.source,m:r.flags,d:void 0,a:void 0,f:void 0}}function H(e,r,n){let t=n.constructor.name;S(e.features&2048,`Unsupported value type "${t}"`);let a=n.length,o=new Array(a);for(let i=0;i<a;i++)o[i]=""+n[i];return {t:22,i:r,s:o,l:n.byteOffset,c:t,m:void 0,d:void 0,a:void 0,f:void 0}}var ke=4104;function J(e,r,n){let t=n.constructor.name;S((e.features&ke)===ke,`Unsupported value type "${t}"`);let a=n.length,o=new Array(a);for(let i=0;i<a;i++)o[i]=""+n[i];return {t:23,i:r,s:o,l:n.byteOffset,c:t,m:void 0,d:void 0,a:void 0,f:void 0}}function $(e){return {t:24,i:void 0,s:O[e],l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function w(e){return e instanceof EvalError?"EvalError":e instanceof RangeError?"RangeError":e instanceof ReferenceError?"ReferenceError":e instanceof SyntaxError?"SyntaxError":e instanceof TypeError?"TypeError":e instanceof URIError?"URIError":"Error"}function C(e,r){let n,t=w(r);r.name!==t?n={name:r.name}:r.constructor.name!==t&&(n={name:r.constructor.name});let a=Object.getOwnPropertyNames(r);for(let o of a)o!=="name"&&o!=="message"&&(o==="stack"?e.features&16&&(n=n||{},n[o]=r[o]):(n=n||{},n[o]=r[o]));return n}function q(e){let r=Object.getOwnPropertyNames(e);if(r.length){let n={};for(let t of r)n[t]=e[t];return n}}function N(e){if(!e||typeof e!="object"||Array.isArray(e))return !1;switch(e.constructor){case Map:case Set:case Int8Array:case Int16Array:case Int32Array:case Uint8Array:case Uint16Array:case Uint32Array:case Uint8ClampedArray:case Float32Array:case Float64Array:case BigInt64Array:case BigUint64Array:return !1;}return Symbol.iterator in e}var xe=/^[$A-Z_][0-9A-Z_$]*$/i;function le(e){let r=e[0];return (r==="$"||r==="_"||r>="A"&&r<="Z"||r>="a"&&r<="z")&&xe.test(e)}function ne(e){switch(e.t){case"index":return e.s+"="+e.v;case"map":return e.s+".set("+e.k+","+e.v+")";case"set":return e.s+".add("+e.v+")";default:return ""}}function nr(e){let r=[],n=e[0],t=n,a;for(let o=1,i=e.length;o<i;o++){if(a=e[o],a.t===t.t)switch(a.t){case"index":a.v===t.v?n={t:"index",s:a.s,k:void 0,v:ne(n)}:(r.push(n),n=a);break;case"map":a.s===t.s?n={t:"map",s:ne(n),k:a.k,v:a.v}:(r.push(n),n=a);break;case"set":a.s===t.s?n={t:"set",s:ne(n),k:void 0,v:a.v}:(r.push(n),n=a);break;}else r.push(n),n=a;t=a;}return r.push(n),r}function Pe(e){if(e.length){let r="",n=nr(e);for(let t=0,a=n.length;t<a;t++)r+=ne(n[t])+",";return r}}function ze(e){return Pe(e.assignments)}function Be(e,r,n){e.assignments.push({t:"index",s:r,k:void 0,v:n});}function tr(e,r,n){R(e,r),e.assignments.push({t:"set",s:m(e,r),k:void 0,v:n});}function Se(e,r,n,t){R(e,r),e.assignments.push({t:"map",s:m(e,r),k:n,v:t});}function me(e,r,n,t){R(e,r),Be(e,m(e,r)+"["+n+"]",t);}function Te(e,r,n,t){R(e,r),Be(e,m(e,r)+"."+n,t);}function b(e,r,n){return e.markedRefs.has(r)?m(e,r)+"="+n:n}function k(e,r){return r.t===10&&e.stack.includes(r.i)}function ye(e,r){let n=r.l,t="",a,o=!1;for(let i=0;i<n;i++)i!==0&&(t+=","),a=r.a[i],a?k(e,a)?(me(e,r.i,i,m(e,a.i)),o=!0):(t+=y(e,a),o=!1):o=!0;return "["+t+(o?",]":"]")}function ar(e,r){e.stack.push(r.i);let n=ye(e,r);return e.stack.pop(),b(e,r.i,n)}function Ue(e,r,n){if(n.s===0)return "{}";let t="";e.stack.push(r);let a,o,i,d,s,u=!1;for(let l=0;l<n.s;l++)a=n.k[l],o=n.v[l],i=Number(a),d=i>=0||le(a),k(e,o)?(s=m(e,o.i),d&&Number.isNaN(i)?Te(e,r,a,s):me(e,r,d?a:'"'+A$2(a)+'"',s)):(t+=(u?",":"")+(d?a:'"'+A$2(a)+'"')+":"+y(e,o),u=!0);return e.stack.pop(),"{"+t+"}"}function or(e,r,n,t){let a=Ue(e,n,r);return a!=="{}"?"Object.assign("+t+","+a+")":t}function ir(e,r,n){e.stack.push(r);let t=[],a,o,i,d,s,u;for(let l=0;l<n.s;l++)a=e.stack,e.stack=[],o=y(e,n.v[l]),e.stack=a,i=n.k[l],d=Number(i),s=e.assignments,e.assignments=t,u=d>=0||le(i),u&&Number.isNaN(d)?Te(e,r,i,o):me(e,r,u?i:'"'+A$2(i)+'"',o),e.assignments=s;return e.stack.pop(),Pe(t)}function te(e,r,n,t){if(n)if(e.features&128)t=or(e,n,r,t);else {R(e,r);let a=ir(e,r,n);if(a)return "("+b(e,r,t)+","+a+m(e,r)+")"}return b(e,r,t)}function sr(e,r){return te(e,r.i,r.d,"Object.create(null)")}function lr(e,r){return b(e,r.i,Ue(e,r.i,r.d))}function dr(e,r){let n="new Set",t=r.l;if(t){let a="";e.stack.push(r.i);let o,i=!1;for(let d=0;d<t;d++)o=r.a[d],k(e,o)?tr(e,r.i,m(e,o.i)):(a+=(i?",":"")+y(e,o),i=!0);e.stack.pop(),a&&(n+="(["+a+"])");}return b(e,r.i,n)}function ur(e,r){let n="new Map";if(r.d.s){let t="";e.stack.push(r.i);let a,o,i,d,s,u=!1;for(let l=0;l<r.d.s;l++)a=r.d.k[l],o=r.d.v[l],k(e,a)?(i=m(e,a.i),k(e,o)?(d=m(e,o.i),Se(e,r.i,i,d)):(s=e.stack,e.stack=[],Se(e,r.i,i,y(e,o)),e.stack=s)):k(e,o)?(d=m(e,o.i),s=e.stack,e.stack=[],Se(e,r.i,y(e,a),d),e.stack=s):(t+=(u?",[":"[")+y(e,a)+","+y(e,o)+"]",u=!0);e.stack.pop(),t&&(n+="(["+t+"])");}return b(e,r.i,n)}function fr(e,r){e.stack.push(r.i);let n="new AggregateError("+ye(e,r)+',"'+A$2(r.m)+'")';return e.stack.pop(),te(e,r.i,r.d,n)}function cr(e,r){let n="new "+r.c+'("'+A$2(r.m)+'")';return te(e,r.i,r.d,n)}function Sr(e,r){let n;if(k(e,r.f)){let t=m(e,r.f.i);e.features&4?n="Promise.resolve().then(()=>"+t+")":n="Promise.resolve().then(function(){return "+t+"})";}else {e.stack.push(r.i);let t=y(e,r.f);e.stack.pop(),n="Promise.resolve("+t+")";}return b(e,r.i,n)}function mr(e,r){let n="",t=r.t===23;for(let o=0,i=r.s.length;o<i;o++)n+=(o!==0?",":"")+r.s[o]+(t?"n":"");let a="["+n+"]"+(r.l!==0?","+r.l:"");return b(e,r.i,"new "+r.c+"("+a+")")}function yr(e,r){let n=e.stack;e.stack=[];let t=ye(e,r);e.stack=n;let a=t;return e.features&2?a+=".values()":a+="[Symbol.iterator]()",e.features&4?a="{[Symbol.iterator]:()=>"+a+"}":e.features&64?a="{[Symbol.iterator](){return "+a+"}}":a="{[Symbol.iterator]:function(){return "+a+"}}",te(e,r.i,r.d,a)}function y(e,r){switch(r.t){case 0:return ""+r.s;case 1:return '"'+r.s+'"';case 2:return r.s?"!0":"!1";case 4:return "void 0";case 3:return "null";case 5:return "-0";case 6:return "1/0";case 7:return "-1/0";case 8:return "NaN";case 9:return r.s+"n";case 10:return m(e,r.i);case 15:return ar(e,r);case 16:return lr(e,r);case 17:return sr(e,r);case 11:return b(e,r.i,'new Date("'+r.s+'")');case 12:return b(e,r.i,"/"+r.c+"/"+r.m);case 13:return dr(e,r);case 14:return ur(e,r);case 23:case 22:return mr(e,r);case 20:return fr(e,r);case 19:return cr(e,r);case 21:return yr(e,r);case 18:return Sr(e,r);case 24:return Ie[r.s];default:throw new Error("Unsupported type")}}function Ne(e,r){let n=r.length,t=new Array(n),a=new Array(n),o;for(let i=0;i<n;i++)i in r&&(o=r[i],N(o)?a[i]=o:t[i]=g(e,o));for(let i=0;i<n;i++)i in a&&(t[i]=g(e,a[i]));return t}function Nr(e,r,n){return {t:15,i:r,s:void 0,l:n.length,c:void 0,m:void 0,d:void 0,a:Ne(e,n),f:void 0}}function pr(e,r,n){S(e.features&32,'Unsupported type "Map"');let t=n.size,a=new Array(t),o=new Array(t),i=new Array(t),d=new Array(t),s=0,u=0;for(let[l,f]of n.entries())N(l)||N(f)?(i[s]=l,d[s]=f,s++):(a[u]=g(e,l),o[u]=g(e,f),u++);for(let l=0;l<s;l++)a[u+l]=g(e,i[l]),o[u+l]=g(e,d[l]);return {t:14,i:r,s:void 0,l:void 0,c:void 0,m:void 0,d:{k:a,v:o,s:t},a:void 0,f:void 0}}function vr(e,r,n){S(e.features&512,'Unsupported type "Set"');let t=n.size,a=new Array(t),o=new Array(t),i=0,d=0;for(let s of n.keys())N(s)?o[i++]=s:a[d++]=g(e,s);for(let s=0;s<i;s++)a[d+s]=g(e,o[s]);return {t:13,i:r,s:void 0,l:t,c:void 0,m:void 0,d:void 0,a,f:void 0}}function oe(e,r){let n=Object.keys(r),t=n.length,a=new Array(t),o=new Array(t),i=new Array(t),d=new Array(t),s=0,u=0,l;for(let f of n)l=r[f],N(l)?(i[s]=f,d[s]=l,s++):(a[u]=f,o[u]=g(e,l),u++);for(let f=0;f<s;f++)a[u+f]=i[f],o[u+f]=g(e,d[f]);return {k:a,v:o,s:t}}function De(e,r,n){S(e.features&1024,'Unsupported type "Iterable"');let t=q(n),a=Array.from(n);return {t:21,i:r,s:void 0,l:a.length,c:void 0,m:void 0,d:t?oe(e,t):void 0,a:Ne(e,a),f:void 0}}function je(e,r,n,t){return Symbol.iterator in n?De(e,r,n):{t:t?17:16,i:r,s:void 0,l:void 0,c:void 0,m:void 0,d:oe(e,n),a:void 0,f:void 0}}function Me(e,r,n){let t=C(e,n),a=t?oe(e,t):void 0;return {t:20,i:r,s:void 0,l:n.errors.length,c:void 0,m:n.message,d:a,a:Ne(e,n.errors),f:void 0}}function ae(e,r,n){let t=C(e,n),a=t?oe(e,t):void 0;return {t:19,i:r,s:void 0,l:void 0,c:w(n),m:n.message,d:a,a:void 0,f:void 0}}function g(e,r){switch(typeof r){case"boolean":return r?T:U;case"undefined":return j;case"string":return K(r);case"number":switch(r){case 1/0:return _;case-1/0:return L;}return r!==r?x:Object.is(r,-0)?D:F(r);case"bigint":return W(e,r);case"object":{if(!r)return M;let n=z(e,r);if(e.markedRefs.has(n))return Y(n);if(Array.isArray(r))return Nr(e,n,r);switch(r.constructor){case Date:return Z(n,r);case RegExp:return G(n,r);case Int8Array:case Int16Array:case Int32Array:case Uint8Array:case Uint16Array:case Uint32Array:case Uint8ClampedArray:case Float32Array:case Float64Array:return H(e,n,r);case BigInt64Array:case BigUint64Array:return J(e,n,r);case Map:return pr(e,n,r);case Set:return vr(e,n,r);case Object:return je(e,n,r,!1);case void 0:return je(e,n,r,!0);case AggregateError:return e.features&1?Me(e,n,r):ae(e,n,r);case Error:case EvalError:case RangeError:case ReferenceError:case SyntaxError:case TypeError:case URIError:return ae(e,n,r);}if(r instanceof AggregateError)return e.features&1?Me(e,n,r):ae(e,n,r);if(r instanceof Error)return ae(e,n,r);if(Symbol.iterator in r)return De(e,n,r);throw new Error("Unsupported type")}case"symbol":return S(e.features&1024,'Unsupported type "symbol"'),S(r in O,"seroval only supports well-known symbols"),$(r);default:throw new Error("Unsupported type")}}function ie(e,r){let n=g(e,r),t=n.t===16||n.t===21;return [n,P(e,r),t]}function pe(e,r,n,t){if(e.vars.length){let a=ze(e),o=t;if(a){let d=m(e,r);o=t+","+a+d,t.startsWith(d+"=")||(o=d+"="+o);}let i=e.vars.length>1?e.vars.join(","):e.vars[0];return e.features&4?(i=e.vars.length>1||e.vars.length===0?"("+i+")":i,"("+i+"=>("+o+"))()"):"(function("+i+"){return "+o+"})()"}return n?"("+t+")":t}function gr(e,r){let n=h(r),[t,a,o]=ie(n,e),i=V(n),d=y(i,t);return pe(i,a,o,d)}

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
const BooleanAttributes = /*#__PURE__*/new Set(booleans);
const ChildProperties = /*#__PURE__*/new Set(["innerHTML", "textContent", "innerText", "children"]);
const Aliases = /*#__PURE__*/Object.assign(Object.create(null), {
  className: "class",
  htmlFor: "for"
});

const ES2017FLAG = I.AggregateError
| I.BigInt
| I.BigIntTypedArray;
function stringify(data) {
  return gr(data, {
    disabledFeatures: ES2017FLAG
  });
}

const VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
const REPLACE_SCRIPT = `function $df(e,n,t,o,d){if(t=document.getElementById(e),o=document.getElementById("pl-"+e)){for(;o&&8!==o.nodeType&&o.nodeValue!=="pl-"+e;)d=o.nextSibling,o.remove(),o=d;_$HY.done?o.remove():o.replaceWith(t.content)}t.remove(),_$HY.set(e,n),_$HY.fe(e)}`;
function renderToStringAsync(code, options = {}) {
  const {
    timeoutMs = 30000
  } = options;
  let timeoutHandle;
  const timeout = new Promise((_, reject) => {
    timeoutHandle = setTimeout(() => reject("renderToString timed out"), timeoutMs);
  });
  return Promise.race([renderToStream(code, options), timeout]).then(html => {
    clearTimeout(timeoutHandle);
    return html;
  });
}
function renderToStream(code, options = {}) {
  let {
    nonce,
    onCompleteShell,
    onCompleteAll,
    renderId
  } = options;
  let dispose;
  const blockingResources = [];
  const registry = new Map();
  const dedupe = new WeakMap();
  const checkEnd = () => {
    if (!registry.size && !completed) {
      writeTasks();
      onCompleteAll && onCompleteAll({
        write(v) {
          !completed && buffer.write(v);
        }
      });
      writable && writable.end();
      completed = true;
      setTimeout(dispose);
    }
  };
  const pushTask = task => {
    tasks += task + ";";
    if (!scheduled && firstFlushed) {
      Promise.resolve().then(writeTasks);
      scheduled = true;
    }
  };
  const writeTasks = () => {
    if (tasks.length && !completed && firstFlushed) {
      buffer.write(`<script${nonce ? ` nonce="${nonce}"` : ""}>${tasks}</script>`);
      tasks = "";
    }
    scheduled = false;
  };
  let context;
  let writable;
  let tmp = "";
  let tasks = "";
  let firstFlushed = false;
  let completed = false;
  let scriptFlushed = false;
  let scheduled = true;
  let buffer = {
    write(payload) {
      tmp += payload;
    }
  };
  sharedConfig.context = context = {
    id: renderId || "",
    count: 0,
    async: true,
    resources: {},
    lazy: {},
    suspense: {},
    assets: [],
    nonce,
    block(p) {
      if (!firstFlushed) blockingResources.push(p);
    },
    replace(id, payloadFn) {
      if (firstFlushed) return;
      const placeholder = `<!!$${id}>`;
      const first = html.indexOf(placeholder);
      if (first === -1) return;
      const last = html.indexOf(`<!!$/${id}>`, first + placeholder.length);
      html = html.replace(html.slice(first, last + placeholder.length + 1), resolveSSRNode(payloadFn()));
    },
    writeResource(id, p, error, wait) {
      const serverOnly = sharedConfig.context.noHydrate;
      if (error) return !serverOnly && pushTask(serializeSet(dedupe, id, p));
      if (!p || typeof p !== "object" || !("then" in p)) return !serverOnly && pushTask(serializeSet(dedupe, id, p));
      if (!firstFlushed) wait && blockingResources.push(p);else !serverOnly && pushTask(`_$HY.init("${id}")`);
      if (serverOnly) return;
      p.then(d => {
        !completed && pushTask(serializeSet(dedupe, id, d));
      }).catch(() => {
        !completed && pushTask(`_$HY.set("${id}", {})`);
      });
    },
    registerFragment(key) {
      if (!registry.has(key)) {
        registry.set(key, []);
        firstFlushed && pushTask(`_$HY.init("${key}")`);
      }
      return (value, error) => {
        if (registry.has(key)) {
          const keys = registry.get(key);
          registry.delete(key);
          if (waitForFragments(registry, key)) return;
          if ((value !== undefined || error) && !completed) {
            if (!firstFlushed) {
              Promise.resolve().then(() => html = replacePlaceholder(html, key, value !== undefined ? value : ""));
              error && pushTask(serializeSet(dedupe, key, error));
            } else {
              buffer.write(`<template id="${key}">${value !== undefined ? value : " "}</template>`);
              pushTask(`${keys.length ? keys.map(k => `_$HY.unset("${k}")`).join(";") + ";" : ""}$df("${key}"${error ? "," + stringify(error) : ""})${!scriptFlushed ? ";" + REPLACE_SCRIPT : ""}`);
              scriptFlushed = true;
            }
          }
        }
        if (!registry.size) Promise.resolve().then(checkEnd);
        return firstFlushed;
      };
    }
  };
  let html = createRoot(d => {
    dispose = d;
    return resolveSSRNode(escape(code()));
  });
  function doShell() {
    sharedConfig.context = context;
    context.noHydrate = true;
    html = injectAssets(context.assets, html);
    for (const key in context.resources) {
      if (!("data" in context.resources[key] || context.resources[key].ref[0].error)) pushTask(`_$HY.init("${key}")`);
    }
    for (const key of registry.keys()) pushTask(`_$HY.init("${key}")`);
    if (tasks.length) html = injectScripts(html, tasks, nonce);
    buffer.write(html);
    tasks = "";
    scheduled = false;
    onCompleteShell && onCompleteShell({
      write(v) {
        !completed && buffer.write(v);
      }
    });
  }
  return {
    then(fn) {
      function complete() {
        doShell();
        fn(tmp);
      }
      if (onCompleteAll) {
        ogComplete = onCompleteAll;
        onCompleteAll = options => {
          ogComplete(options);
          complete();
        };
      } else onCompleteAll = complete;
      if (!registry.size) Promise.resolve().then(checkEnd);
    },
    pipe(w) {
      Promise.allSettled(blockingResources).then(() => {
        doShell();
        buffer = writable = w;
        buffer.write(tmp);
        firstFlushed = true;
        if (completed) writable.end();else setTimeout(checkEnd);
      });
    },
    pipeTo(w) {
      Promise.allSettled(blockingResources).then(() => {
        doShell();
        const encoder = new TextEncoder();
        const writer = w.getWriter();
        writable = {
          end() {
            writer.releaseLock();
            w.close();
          }
        };
        buffer = {
          write(payload) {
            writer.write(encoder.encode(payload));
          }
        };
        buffer.write(tmp);
        firstFlushed = true;
        if (completed) writable.end();else setTimeout(checkEnd);
      });
    }
  };
}
function HydrationScript(props) {
  const {
    nonce
  } = sharedConfig.context;
  return ssr(generateHydrationScript({
    nonce,
    ...props
  }));
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function ssrClassList(value) {
  if (!value) return "";
  let classKeys = Object.keys(value),
    result = "";
  for (let i = 0, len = classKeys.length; i < len; i++) {
    const key = classKeys[i],
      classValue = !!value[key];
    if (!key || key === "undefined" || !classValue) continue;
    i && (result += " ");
    result += escape(key);
  }
  return result;
}
function ssrStyle(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  let result = "";
  const k = Object.keys(value);
  for (let i = 0; i < k.length; i++) {
    const s = k[i];
    const v = value[s];
    if (v != undefined) {
      if (i) result += ";";
      result += `${s}:${escape(v, true)}`;
    }
  }
  return result;
}
function ssrElement(tag, props, children, needsId) {
  if (props == null) props = {};else if (typeof props === "function") props = props();
  const skipChildren = VOID_ELEMENTS.test(tag);
  const keys = Object.keys(props);
  let result = `<${tag}${needsId ? ssrHydrationKey() : ""} `;
  let classResolved;
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i];
    if (ChildProperties.has(prop)) {
      if (children === undefined && !skipChildren) children = prop === "innerHTML" ? props[prop] : escape(props[prop]);
      continue;
    }
    const value = props[prop];
    if (prop === "style") {
      result += `style="${ssrStyle(value)}"`;
    } else if (prop === "class" || prop === "className" || prop === "classList") {
      if (classResolved) continue;
      let n;
      result += `class="${escape(((n = props.class) ? n + " " : "") + ((n = props.className) ? n + " " : ""), true) + ssrClassList(props.classList)}"`;
      classResolved = true;
    } else if (BooleanAttributes.has(prop)) {
      if (value) result += prop;else continue;
    } else if (value == undefined || prop === "ref" || prop.slice(0, 2) === "on") {
      continue;
    } else {
      result += `${Aliases[prop] || prop}="${escape(value, true)}"`;
    }
    if (i !== keys.length - 1) result += " ";
  }
  if (skipChildren) return {
    t: result + "/>"
  };
  if (typeof children === "function") children = children();
  return {
    t: result + `>${resolveSSRNode(children, true)}</${tag}>`
  };
}
function ssrAttribute(key, value, isBoolean) {
  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk="${hk}"` : "";
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (!attr && t === "function") return escape(s());
    if (!attr && Array.isArray(s)) {
      for (let i = 0; i < s.length; i++) s[i] = escape(s[i]);
      return s;
    }
    if (attr && t === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
    out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node, top) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let prev = {};
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) {
      if (!top && typeof prev !== "object" && typeof node[i] !== "object") mapped += `<!--!$-->`;
      mapped += resolveSSRNode(prev = node[i]);
    }
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
}
function useAssets(fn) {
  sharedConfig.context.assets.push(() => resolveSSRNode(fn()));
}
function generateHydrationScript({
  eventNames = ["click", "input"],
  nonce
} = {}) {
  return `<script${nonce ? ` nonce="${nonce}"` : ""}>(e=>{let t=e=>e&&e.hasAttribute&&(e.hasAttribute("data-hk")?e:t(e.host&&e.host.nodeType?e.host:e.parentNode));["${eventNames.join('", "')}"].forEach((o=>document.addEventListener(o,(o=>{let s=o.composedPath&&o.composedPath()[0]||o.target,a=t(s);a&&!e.completed.has(a)&&e.events.push([a,o])}))))})(window._$HY||(_$HY={events:[],completed:new WeakSet,r:{},fe(){},init(e,t){_$HY.r[e]=[new Promise((e=>t=e)),t]},set(e,t,o){(o=_$HY.r[e])&&o[1](t),_$HY.r[e]=[t]},unset(e){delete _$HY.r[e]},load:e=>_$HY.r[e]}));</script><!--xs-->`;
}
function NoHydration(props) {
  sharedConfig.context.noHydrate = true;
  return props.children;
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  return html.replace(`</head>`, out + `</head>`);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function waitForFragments(registry, key) {
  for (const k of [...registry.keys()].reverse()) {
    if (key.startsWith(k)) {
      registry.get(k).push(key);
      return true;
    }
  }
  return false;
}
function serializeSet(registry, key, value) {
  const exist = registry.get(value);
  if (exist) return `_$HY.set("${key}", _$HY.r["${exist}"][0])`;
  value !== null && typeof value === "object" && registry.set(value, key);
  return `_$HY.set("${key}", ${stringify(value)})`;
}
function replacePlaceholder(html, key, value) {
  const marker = `<template id="pl-${key}">`;
  const close = `<!pl-${key}>`;
  const first = html.indexOf(marker);
  if (first === -1) return html;
  const last = html.indexOf(close, first + marker.length);
  return html.slice(0, first) + value + html.slice(last + close.length);
}

const isServer = true;

const FETCH_EVENT = "$FETCH";

function getRouteMatches$1(routes, path, method) {
  const segments = path.split("/").filter(Boolean);
  routeLoop:
    for (const route of routes) {
      const matchSegments = route.matchSegments;
      if (segments.length < matchSegments.length || !route.wildcard && segments.length > matchSegments.length) {
        continue;
      }
      for (let index = 0; index < matchSegments.length; index++) {
        const match = matchSegments[index];
        if (!match) {
          continue;
        }
        if (segments[index] !== match) {
          continue routeLoop;
        }
      }
      const handler = route[method];
      if (handler === "skip" || handler === void 0) {
        return;
      }
      const params = {};
      for (const { type, name, index } of route.params) {
        if (type === ":") {
          params[name] = segments[index];
        } else {
          params[name] = segments.slice(index).join("/");
        }
      }
      return { handler, params };
    }
}

let apiRoutes$1;
const registerApiRoutes = (routes) => {
  apiRoutes$1 = routes;
};
async function internalFetch(route, init, env = {}, locals = {}) {
  if (route.startsWith("http")) {
    return await fetch(route, init);
  }
  let url = new URL(route, "http://internal");
  const request = new Request(url.href, init);
  const handler = getRouteMatches$1(apiRoutes$1, url.pathname, request.method.toUpperCase());
  if (!handler) {
    throw new Error(`No handler found for ${request.method} ${request.url}`);
  }
  let apiEvent = Object.freeze({
    request,
    params: handler.params,
    clientAddress: "127.0.0.1",
    env,
    locals,
    $type: FETCH_EVENT,
    fetch: internalFetch
  });
  const response = await handler.handler(apiEvent);
  return response;
}

const XSolidStartLocationHeader = "x-solidstart-location";
const LocationHeader = "Location";
const ContentTypeHeader = "content-type";
const XSolidStartResponseTypeHeader = "x-solidstart-response-type";
const XSolidStartContentTypeHeader = "x-solidstart-content-type";
const XSolidStartOrigin = "x-solidstart-origin";
const JSONResponseType = "application/json";
function redirect(url, init = 302) {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  if (url === "") {
    url = "/";
  }
  let headers = new Headers(responseInit.headers);
  headers.set(LocationHeader, url);
  const response = new Response(null, {
    ...responseInit,
    headers
  });
  return response;
}
const redirectStatusCodes = /* @__PURE__ */ new Set([204, 301, 302, 303, 307, 308]);
function isRedirectResponse(response) {
  return response && response instanceof Response && redirectStatusCodes.has(response.status);
}
class ResponseError extends Error {
  status;
  headers;
  name = "ResponseError";
  ok;
  statusText;
  redirected;
  url;
  constructor(response) {
    let message = JSON.stringify({
      $type: "response",
      status: response.status,
      message: response.statusText,
      headers: [...response.headers.entries()]
    });
    super(message);
    this.status = response.status;
    this.headers = new Map([...response.headers.entries()]);
    this.url = response.url;
    this.ok = response.ok;
    this.statusText = response.statusText;
    this.redirected = response.redirected;
    this.bodyUsed = false;
    this.type = response.type;
    this.response = () => response;
  }
  response;
  type;
  clone() {
    return this.response();
  }
  get body() {
    return this.response().body;
  }
  bodyUsed;
  async arrayBuffer() {
    return await this.response().arrayBuffer();
  }
  async blob() {
    return await this.response().blob();
  }
  async formData() {
    return await this.response().formData();
  }
  async text() {
    return await this.response().text();
  }
  async json() {
    return await this.response().json();
  }
}

const api = [
  {
    GET: "skip",
    path: "/*404"
  },
  {
    GET: "skip",
    path: "/fun"
  },
  {
    GET: "skip",
    path: "/"
  },
  {
    GET: "skip",
    path: "/research"
  },
  {
    GET: "skip",
    path: "/teaching"
  },
  {
    GET: "skip",
    path: "/cv/"
  }
];
function expandOptionals$1(pattern) {
  let match = /(\/?\:[^\/]+)\?/.exec(pattern);
  if (!match)
    return [pattern];
  let prefix = pattern.slice(0, match.index);
  let suffix = pattern.slice(match.index + match[0].length);
  const prefixes = [prefix, prefix += match[1]];
  while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
    prefixes.push(prefix += match[1]);
    suffix = suffix.slice(match[0].length);
  }
  return expandOptionals$1(suffix).reduce(
    (results, expansion) => [...results, ...prefixes.map((p) => p + expansion)],
    []
  );
}
function routeToMatchRoute(route) {
  const segments = route.path.split("/").filter(Boolean);
  const params = [];
  const matchSegments = [];
  let score = 0;
  let wildcard = false;
  for (const [index, segment] of segments.entries()) {
    if (segment[0] === ":") {
      const name = segment.slice(1);
      score += 3;
      params.push({
        type: ":",
        name,
        index
      });
      matchSegments.push(null);
    } else if (segment[0] === "*") {
      score -= 1;
      params.push({
        type: "*",
        name: segment.slice(1),
        index
      });
      wildcard = true;
    } else {
      score += 4;
      matchSegments.push(segment);
    }
  }
  return {
    ...route,
    score,
    params,
    matchSegments,
    wildcard
  };
}
const allRoutes = api.flatMap((route) => {
  const paths = expandOptionals$1(route.path);
  return paths.map((path) => ({ ...route, path }));
}).map(routeToMatchRoute).sort((a, b) => b.score - a.score);
registerApiRoutes(allRoutes);
function getApiHandler(url, method) {
  return getRouteMatches$1(allRoutes, url.pathname, method.toUpperCase());
}

const apiRoutes = ({ forward }) => {
  return async (event) => {
    let apiHandler = getApiHandler(new URL(event.request.url), event.request.method);
    if (apiHandler) {
      let apiEvent = Object.freeze({
        request: event.request,
        clientAddress: event.clientAddress,
        locals: event.locals,
        params: apiHandler.params,
        env: event.env,
        $type: FETCH_EVENT,
        fetch: internalFetch
      });
      try {
        return await apiHandler.handler(apiEvent);
      } catch (error) {
        if (error instanceof Response) {
          return error;
        }
        return new Response(JSON.stringify(error), {
          status: 500
        });
      }
    }
    return await forward(event);
  };
};
function normalizeIntegration(integration) {
    if (!integration) {
        return {
            signal: createSignal({ value: "" })
        };
    }
    else if (Array.isArray(integration)) {
        return {
            signal: integration
        };
    }
    return integration;
}
function staticIntegration(obj) {
    return {
        signal: [() => obj, next => Object.assign(obj, next)]
    };
}

function createBeforeLeave() {
    let listeners = new Set();
    function subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    let ignore = false;
    function confirm(to, options) {
        if (ignore)
            return !(ignore = false);
        const e = {
            to,
            options,
            defaultPrevented: false,
            preventDefault: () => (e.defaultPrevented = true)
        };
        for (const l of listeners)
            l.listener({
                ...e,
                from: l.location,
                retry: (force) => {
                    force && (ignore = true);
                    l.navigate(to, options);
                }
            });
        return !e.defaultPrevented;
    }
    return {
        subscribe,
        confirm
    };
}

const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|(\/)\/+$/g;
function normalizePath(path, omitSlash = false) {
    const s = path.replace(trimPathRegex, "$1");
    return s ? (omitSlash || /^[?#]/.test(s) ? s : "/" + s) : "";
}
function resolvePath(base, path, from) {
    if (hasSchemeRegex.test(path)) {
        return undefined;
    }
    const basePath = normalizePath(base);
    const fromPath = from && normalizePath(from);
    let result = "";
    if (!fromPath || path.startsWith("/")) {
        result = basePath;
    }
    else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
        result = basePath + fromPath;
    }
    else {
        result = fromPath;
    }
    return (result || "/") + normalizePath(path, !result);
}
function invariant(value, message) {
    if (value == null) {
        throw new Error(message);
    }
    return value;
}
function joinPaths(from, to) {
    return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
}
function extractSearchParams(url) {
    const params = {};
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}
function createMatcher(path, partial, matchFilters) {
    const [pattern, splat] = path.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    const len = segments.length;
    return (location) => {
        const locSegments = location.split("/").filter(Boolean);
        const lenDiff = locSegments.length - len;
        if (lenDiff < 0 || (lenDiff > 0 && splat === undefined && !partial)) {
            return null;
        }
        const match = {
            path: len ? "" : "/",
            params: {}
        };
        const matchFilter = (s) => matchFilters === undefined ? undefined : matchFilters[s];
        for (let i = 0; i < len; i++) {
            const segment = segments[i];
            const locSegment = locSegments[i];
            const dynamic = segment[0] === ":";
            const key = dynamic ? segment.slice(1) : segment;
            if (dynamic && matchSegment(locSegment, matchFilter(key))) {
                match.params[key] = locSegment;
            }
            else if (dynamic || !matchSegment(locSegment, segment)) {
                return null;
            }
            match.path += `/${locSegment}`;
        }
        if (splat) {
            const remainder = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
            if (matchSegment(remainder, matchFilter(splat))) {
                match.params[splat] = remainder;
            }
            else {
                return null;
            }
        }
        return match;
    };
}
function matchSegment(input, filter) {
    const isEqual = (s) => s.localeCompare(input, undefined, { sensitivity: "base" }) === 0;
    if (filter === undefined) {
        return true;
    }
    else if (typeof filter === "string") {
        return isEqual(filter);
    }
    else if (typeof filter === "function") {
        return filter(input);
    }
    else if (Array.isArray(filter)) {
        return filter.some(isEqual);
    }
    else if (filter instanceof RegExp) {
        return filter.test(input);
    }
    return false;
}
function scoreRoute(route) {
    const [pattern, splat] = route.pattern.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === undefined ? 0 : 1));
}
function createMemoObject(fn) {
    const map = new Map();
    const owner = getOwner();
    return new Proxy({}, {
        get(_, property) {
            if (!map.has(property)) {
                runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
            }
            return map.get(property)();
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true
            };
        },
        ownKeys() {
            return Reflect.ownKeys(fn());
        }
    });
}
function expandOptionals(pattern) {
    let match = /(\/?\:[^\/]+)\?/.exec(pattern);
    if (!match)
        return [pattern];
    let prefix = pattern.slice(0, match.index);
    let suffix = pattern.slice(match.index + match[0].length);
    const prefixes = [prefix, (prefix += match[1])];
    // This section handles adjacent optional params. We don't actually want all permuations since
    // that will lead to equivalent routes which have the same number of params. For example
    // `/:a?/:b?/:c`? only has the unique expansion: `/`, `/:a`, `/:a/:b`, `/:a/:b/:c` and we can
    // discard `/:b`, `/:c`, `/:b/:c` by building them up in order and not recursing. This also helps
    // ensure predictability where earlier params have precidence.
    while ((match = /^(\/\:[^\/]+)\?/.exec(suffix))) {
        prefixes.push((prefix += match[1]));
        suffix = suffix.slice(match[0].length);
    }
    return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map(p => p + expansion)], []);
}

const MAX_REDIRECTS$1 = 100;
const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "Make sure your app is wrapped in a <Router />");
let TempRoute;
const useRoute = () => TempRoute || useContext(RouteContextObj) || useRouter().base;
const useResolvedPath = (path) => {
    const route = useRoute();
    return createMemo(() => route.resolvePath(path()));
};
const useHref = (to) => {
    const router = useRouter();
    return createMemo(() => {
        const to_ = to();
        return to_ !== undefined ? router.renderPath(to_) : to_;
    });
};
const useLocation = () => useRouter().location;
function createRoutes(routeDef, base = "", fallback) {
    const { component, data, children } = routeDef;
    const isLeaf = !children || (Array.isArray(children) && !children.length);
    const shared = {
        key: routeDef,
        element: component
            ? () => createComponent(component, {})
            : () => {
                const { element } = routeDef;
                return element === undefined && fallback
                    ? createComponent(fallback, {})
                    : element;
            },
        preload: routeDef.component
            ? component.preload
            : routeDef.preload,
        data
    };
    return asArray(routeDef.path).reduce((acc, path) => {
        for (const originalPath of expandOptionals(path)) {
            const path = joinPaths(base, originalPath);
            const pattern = isLeaf ? path : path.split("/*", 1)[0];
            acc.push({
                ...shared,
                originalPath,
                pattern,
                matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
            });
        }
        return acc;
    }, []);
}
function createBranch(routes, index = 0) {
    return {
        routes,
        score: scoreRoute(routes[routes.length - 1]) * 10000 - index,
        matcher(location) {
            const matches = [];
            for (let i = routes.length - 1; i >= 0; i--) {
                const route = routes[i];
                const match = route.matcher(location);
                if (!match) {
                    return null;
                }
                matches.unshift({
                    ...match,
                    route
                });
            }
            return matches;
        }
    };
}
function asArray(value) {
    return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", fallback, stack = [], branches = []) {
    const routeDefs = asArray(routeDef);
    for (let i = 0, len = routeDefs.length; i < len; i++) {
        const def = routeDefs[i];
        if (def && typeof def === "object" && def.hasOwnProperty("path")) {
            const routes = createRoutes(def, base, fallback);
            for (const route of routes) {
                stack.push(route);
                const isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
                if (def.children && !isEmptyArray) {
                    createBranches(def.children, route.pattern, fallback, stack, branches);
                }
                else {
                    const branch = createBranch([...stack], branches.length);
                    branches.push(branch);
                }
                stack.pop();
            }
        }
    }
    // Stack will be empty on final return
    return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
    for (let i = 0, len = branches.length; i < len; i++) {
        const match = branches[i].matcher(location);
        if (match) {
            return match;
        }
    }
    return [];
}
function createLocation(path, state) {
    const origin = new URL("http://sar");
    const url = createMemo(prev => {
        const path_ = path();
        try {
            return new URL(path_, origin);
        }
        catch (err) {
            console.error(`Invalid path ${path_}`);
            return prev;
        }
    }, origin);
    const pathname = createMemo(() => url().pathname);
    const search = createMemo(() => url().search, true);
    const hash = createMemo(() => url().hash);
    const key = createMemo(() => "");
    return {
        get pathname() {
            return pathname();
        },
        get search() {
            return search();
        },
        get hash() {
            return hash();
        },
        get state() {
            return state();
        },
        get key() {
            return key();
        },
        query: createMemoObject(on(search, () => extractSearchParams(url())))
    };
}
function createRouterContext(integration, base = "", data, out) {
    const { signal: [source, setSource], utils = {} } = normalizeIntegration(integration);
    const parsePath = utils.parsePath || (p => p);
    const renderPath = utils.renderPath || (p => p);
    const beforeLeave = utils.beforeLeave || createBeforeLeave();
    const basePath = resolvePath("", base);
    const output = out
        ? Object.assign(out, {
            matches: [],
            url: undefined
        })
        : undefined;
    if (basePath === undefined) {
        throw new Error(`${basePath} is not a valid base path`);
    }
    else if (basePath && !source().value) {
        setSource({ value: basePath, replace: true, scroll: false });
    }
    const [isRouting, setIsRouting] = createSignal(false);
    const start = async (callback) => {
        setIsRouting(true);
        try {
            await startTransition(callback);
        }
        finally {
            setIsRouting(false);
        }
    };
    const [reference, setReference] = createSignal(source().value);
    const [state, setState] = createSignal(source().state);
    const location = createLocation(reference, state);
    const referrers = [];
    const baseRoute = {
        pattern: basePath,
        params: {},
        path: () => basePath,
        outlet: () => null,
        resolvePath(to) {
            return resolvePath(basePath, to);
        }
    };
    if (data) {
        try {
            TempRoute = baseRoute;
            baseRoute.data = data({
                data: undefined,
                params: {},
                location,
                navigate: navigatorFactory(baseRoute)
            });
        }
        finally {
            TempRoute = undefined;
        }
    }
    function navigateFromRoute(route, to, options) {
        // Untrack in case someone navigates in an effect - don't want to track `reference` or route paths
        untrack(() => {
            if (typeof to === "number") {
                if (!to) ;
                else if (utils.go) {
                    beforeLeave.confirm(to, options) && utils.go(to);
                }
                else {
                    console.warn("Router integration does not support relative routing");
                }
                return;
            }
            const { replace, resolve, scroll, state: nextState } = {
                replace: false,
                resolve: true,
                scroll: true,
                ...options
            };
            const resolvedTo = resolve ? route.resolvePath(to) : resolvePath("", to);
            if (resolvedTo === undefined) {
                throw new Error(`Path '${to}' is not a routable path`);
            }
            else if (referrers.length >= MAX_REDIRECTS$1) {
                throw new Error("Too many redirects");
            }
            const current = reference();
            if (resolvedTo !== current || nextState !== state()) {
                {
                    if (output) {
                        output.url = resolvedTo;
                    }
                    setSource({ value: resolvedTo, replace, scroll, state: nextState });
                }
            }
        });
    }
    function navigatorFactory(route) {
        // Workaround for vite issue (https://github.com/vitejs/vite/issues/3803)
        route = route || useContext(RouteContextObj) || baseRoute;
        return (to, options) => navigateFromRoute(route, to, options);
    }
    createRenderEffect(() => {
        const { value, state } = source();
        // Untrack this whole block so `start` doesn't cause Solid's Listener to be preserved
        untrack(() => {
            if (value !== reference()) {
                start(() => {
                    setReference(value);
                    setState(state);
                });
            }
        });
    });
    return {
        base: baseRoute,
        out: output,
        location,
        isRouting,
        renderPath,
        parsePath,
        navigatorFactory,
        beforeLeave
    };
}
function createRouteContext(router, parent, child, match, params) {
    const { base, location, navigatorFactory } = router;
    const { pattern, element: outlet, preload, data } = match().route;
    const path = createMemo(() => match().path);
    preload && preload();
    const route = {
        parent,
        pattern,
        get child() {
            return child();
        },
        path,
        params,
        data: parent.data,
        outlet,
        resolvePath(to) {
            return resolvePath(base.path(), to, path());
        }
    };
    if (data) {
        try {
            TempRoute = route;
            route.data = data({ data: parent.data, params, location, navigate: navigatorFactory(route) });
        }
        finally {
            TempRoute = undefined;
        }
    }
    return route;
}

const Router = props => {
  const {
    source,
    url,
    base,
    data,
    out
  } = props;
  const integration = source || (staticIntegration({
    value: url || ""
  }) );
  const routerState = createRouterContext(integration, base, data, out);
  return createComponent(RouterContextObj.Provider, {
    value: routerState,
    get children() {
      return props.children;
    }
  });
};
const Routes$1 = props => {
  const router = useRouter();
  const parentRoute = useRoute();
  const routeDefs = children(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), joinPaths(parentRoute.pattern, props.base || ""), Outlet));
  const matches = createMemo(() => getRouteMatches(branches(), router.location.pathname));
  const params = createMemoObject(() => {
    const m = matches();
    const params = {};
    for (let i = 0; i < m.length; i++) {
      Object.assign(params, m[i].params);
    }
    return params;
  });
  if (router.out) {
    router.out.matches.push(matches().map(({
      route,
      path,
      params
    }) => ({
      originalPath: route.originalPath,
      pattern: route.pattern,
      path,
      params
    })));
  }
  const disposers = [];
  let root;
  const routeStates = createMemo(on(matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];
    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;
        if (disposers[i]) {
          disposers[i]();
        }
        createRoot(dispose => {
          disposers[i] = dispose;
          next[i] = createRouteContext(router, next[i - 1] || parentRoute, () => routeStates()[i + 1], () => matches()[i], params);
        });
      }
    }
    disposers.splice(nextMatches.length).forEach(dispose => dispose());
    if (prev && equal) {
      return prev;
    }
    root = next[0];
    return next;
  }));
  return createComponent(Show, {
    get when() {
      return routeStates() && root;
    },
    keyed: true,
    children: route => createComponent(RouteContextObj.Provider, {
      value: route,
      get children() {
        return route.outlet();
      }
    })
  });
};
const Outlet = () => {
  const route = useRoute();
  return createComponent(Show, {
    get when() {
      return route.child;
    },
    keyed: true,
    children: child => createComponent(RouteContextObj.Provider, {
      value: child,
      get children() {
        return child.outlet();
      }
    })
  });
};
function A$1(props) {
  props = mergeProps({
    inactiveClass: "inactive",
    activeClass: "active"
  }, props);
  const [, rest] = splitProps(props, ["href", "state", "class", "activeClass", "inactiveClass", "end"]);
  const to = useResolvedPath(() => props.href);
  const href = useHref(to);
  const location = useLocation();
  const isActive = createMemo(() => {
    const to_ = to();
    if (to_ === undefined) return false;
    const path = normalizePath(to_.split(/[?#]/, 1)[0]).toLowerCase();
    const loc = normalizePath(location.pathname).toLowerCase();
    return props.end ? path === loc : loc.startsWith(path);
  });
  return ssrElement("a", mergeProps({
    link: true
  }, rest, {
    get href() {
      return href() || props.href;
    },
    get state() {
      return JSON.stringify(props.state);
    },
    get classList() {
      return {
        ...(props.class && {
          [props.class]: true
        }),
        [props.inactiveClass]: !isActive(),
        [props.activeClass]: isActive(),
        ...rest.classList
      };
    },
    get ["aria-current"]() {
      return isActive() ? "page" : undefined;
    }
  }), undefined, true);
}

class ServerError extends Error {
  constructor(message, {
    status,
    stack
  } = {}) {
    super(message);
    this.name = "ServerError";
    this.status = status || 400;
    if (stack) {
      this.stack = stack;
    }
  }
}
class FormError extends ServerError {
  constructor(message, {
    fieldErrors = {},
    form,
    fields,
    stack
  } = {}) {
    super(message, {
      stack
    });
    this.formError = message;
    this.name = "FormError";
    this.fields = fields || Object.fromEntries(typeof form !== "undefined" ? form.entries() : []) || {};
    this.fieldErrors = fieldErrors;
  }
}

const ServerContext = createContext({});

const A = A$1;
const Routes = Routes$1;

const server$ = (_fn) => {
  throw new Error("Should be compiled away");
};
async function parseRequest(event) {
  let request = event.request;
  let contentType = request.headers.get(ContentTypeHeader);
  let name = new URL(request.url).pathname, args = [];
  if (contentType) {
    if (contentType === JSONResponseType) {
      let text = await request.text();
      try {
        args = JSON.parse(text, (key, value) => {
          if (!value) {
            return value;
          }
          if (value.$type === "headers") {
            let headers = new Headers();
            request.headers.forEach((value2, key2) => headers.set(key2, value2));
            value.values.forEach(([key2, value2]) => headers.set(key2, value2));
            return headers;
          }
          if (value.$type === "request") {
            return new Request(value.url, {
              method: value.method,
              headers: value.headers
            });
          }
          return value;
        });
      } catch (e) {
        throw new Error(`Error parsing request body: ${text}`);
      }
    } else if (contentType.includes("form")) {
      let formData = await request.clone().formData();
      args = [formData, event];
    }
  }
  return [name, args];
}
function respondWith(request, data, responseType) {
  if (data instanceof ResponseError) {
    data = data.clone();
  }
  if (data instanceof Response) {
    if (isRedirectResponse(data) && request.headers.get(XSolidStartOrigin) === "client") {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartLocationHeader, data.headers.get(LocationHeader));
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(null, {
        status: 204,
        statusText: "Redirected",
        headers
      });
    } else if (data.status === 101) {
      return data;
    } else {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(data.body, {
        status: data.status,
        statusText: data.statusText,
        headers
      });
    }
  } else if (data instanceof FormError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: "",
          formError: data.formError,
          fields: data.fields,
          fieldErrors: data.fieldErrors
        }
      }),
      {
        status: 400,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "form-error"
        }
      }
    );
  } else if (data instanceof ServerError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: ""
        }
      }),
      {
        status: data.status,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "server-error"
        }
      }
    );
  } else if (data instanceof Error) {
    console.error(data);
    return new Response(
      JSON.stringify({
        error: {
          message: "Internal Server Error",
          stack: "",
          status: data.status
        }
      }),
      {
        status: data.status || 500,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "error"
        }
      }
    );
  } else if (typeof data === "object" || typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        [ContentTypeHeader]: "application/json",
        [XSolidStartResponseTypeHeader]: responseType,
        [XSolidStartContentTypeHeader]: "json"
      }
    });
  }
  return new Response("null", {
    status: 200,
    headers: {
      [ContentTypeHeader]: "application/json",
      [XSolidStartContentTypeHeader]: "json",
      [XSolidStartResponseTypeHeader]: responseType
    }
  });
}
async function handleServerRequest(event) {
  const url = new URL(event.request.url);
  if (server$.hasHandler(url.pathname)) {
    try {
      let [name, args] = await parseRequest(event);
      let handler = server$.getHandler(name);
      if (!handler) {
        throw {
          status: 404,
          message: "Handler Not Found for " + name
        };
      }
      const data = await handler.call(event, ...Array.isArray(args) ? args : [args]);
      return respondWith(event.request, data, "return");
    } catch (error) {
      return respondWith(event.request, error, "throw");
    }
  }
  return null;
}
const handlers = /* @__PURE__ */ new Map();
server$.createHandler = (_fn, hash, serverResource) => {
  let fn = function(...args) {
    let ctx;
    if (typeof this === "object") {
      ctx = this;
    } else if (sharedConfig.context && sharedConfig.context.requestContext) {
      ctx = sharedConfig.context.requestContext;
    } else {
      ctx = {
        request: new URL(hash, "http://localhost:3000").href,
        responseHeaders: new Headers()
      };
    }
    const execute = async () => {
      try {
        return serverResource ? _fn.call(ctx, args[0], ctx) : _fn.call(ctx, ...args);
      } catch (e) {
        if (e instanceof Error && /[A-Za-z]+ is not defined/.test(e.message)) {
          const error = new Error(
            e.message + "\n You probably are using a variable defined in a closure in your server function."
          );
          error.stack = e.stack;
          throw error;
        }
        throw e;
      }
    };
    return execute();
  };
  fn.url = hash;
  fn.action = function(...args) {
    return fn.call(this, ...args);
  };
  return fn;
};
server$.registerHandler = function(route, handler) {
  handlers.set(route, handler);
};
server$.getHandler = function(route) {
  return handlers.get(route);
};
server$.hasHandler = function(route) {
  return handlers.has(route);
};
server$.fetch = internalFetch;

const inlineServerFunctions = ({ forward }) => {
  return async (event) => {
    const url = new URL(event.request.url);
    if (server$.hasHandler(url.pathname)) {
      let contentType = event.request.headers.get(ContentTypeHeader);
      let origin = event.request.headers.get(XSolidStartOrigin);
      let formRequestBody;
      if (contentType != null && contentType.includes("form") && !(origin != null && origin.includes("client"))) {
        let [read1, read2] = event.request.body.tee();
        formRequestBody = new Request(event.request.url, {
          body: read2,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
        event.request = new Request(event.request.url, {
          body: read1,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
      }
      let serverFunctionEvent = Object.freeze({
        request: event.request,
        clientAddress: event.clientAddress,
        locals: event.locals,
        fetch: internalFetch,
        $type: FETCH_EVENT,
        env: event.env
      });
      const serverResponse = await handleServerRequest(serverFunctionEvent);
      let responseContentType = serverResponse.headers.get(XSolidStartContentTypeHeader);
      if (formRequestBody && responseContentType !== null && responseContentType.includes("error")) {
        const formData = await formRequestBody.formData();
        let entries = [...formData.entries()];
        return new Response(null, {
          status: 302,
          headers: {
            Location: new URL(event.request.headers.get("referer") || "").pathname + "?form=" + encodeURIComponent(
              JSON.stringify({
                url: url.pathname,
                entries,
                ...await serverResponse.json()
              })
            )
          }
        });
      }
      return serverResponse;
    }
    const response = await forward(event);
    return response;
  };
};

function renderAsync(fn, options) {
  return () => apiRoutes({
    forward: inlineServerFunctions({
      async forward(event) {
        let pageEvent = createPageEvent(event);
        let markup = await renderToStringAsync(() => fn(pageEvent), options);
        if (pageEvent.routerContext && pageEvent.routerContext.url) {
          return redirect(pageEvent.routerContext.url, {
            headers: pageEvent.responseHeaders
          });
        }
        markup = handleIslandsRouting(pageEvent, markup);
        return new Response(markup, {
          status: pageEvent.getStatusCode(),
          headers: pageEvent.responseHeaders
        });
      }
    })
  });
}
function createPageEvent(event) {
  let responseHeaders = new Headers({
    "Content-Type": "text/html"
  });
  const prevPath = event.request.headers.get("x-solid-referrer");
  let statusCode = 200;
  function setStatusCode(code) {
    statusCode = code;
  }
  function getStatusCode() {
    return statusCode;
  }
  const pageEvent = Object.freeze({
    request: event.request,
    prevUrl: prevPath || "",
    routerContext: {},
    tags: [],
    env: event.env,
    clientAddress: event.clientAddress,
    locals: event.locals,
    $type: FETCH_EVENT,
    responseHeaders,
    setStatusCode,
    getStatusCode,
    fetch: internalFetch
  });
  return pageEvent;
}
function handleIslandsRouting(pageEvent, markup) {
  return markup;
}

const MetaContext = createContext();
const cascadingTags = ["title", "meta"];
const getTagType = tag => tag.tag + (tag.name ? `.${tag.name}"` : "");
const MetaProvider = props => {
  const cascadedTagInstances = new Map();
  const actions = {
    addClientTag: tag => {
      let tagType = getTagType(tag);
      if (cascadingTags.indexOf(tag.tag) !== -1) {
        //  only cascading tags need to be kept as singletons
        if (!cascadedTagInstances.has(tagType)) {
          cascadedTagInstances.set(tagType, []);
        }
        let instances = cascadedTagInstances.get(tagType);
        let index = instances.length;
        instances = [...instances, tag];
        // track indices synchronously
        cascadedTagInstances.set(tagType, instances);
        return index;
      }
      return -1;
    },
    removeClientTag: (tag, index) => {
      const tagName = getTagType(tag);
      if (tag.ref) {
        const t = cascadedTagInstances.get(tagName);
        if (t) {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
            for (let i = index - 1; i >= 0; i--) {
              if (t[i] != null) {
                document.head.appendChild(t[i].ref);
              }
            }
          }
          t[index] = null;
          cascadedTagInstances.set(tagName, t);
        } else {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
          }
        }
      }
    }
  };
  {
    actions.addServerTag = tagDesc => {
      const {
        tags = []
      } = props;
      // tweak only cascading tags
      if (cascadingTags.indexOf(tagDesc.tag) !== -1) {
        const index = tags.findIndex(prev => {
          const prevName = prev.props.name || prev.props.property;
          const nextName = tagDesc.props.name || tagDesc.props.property;
          return prev.tag === tagDesc.tag && prevName === nextName;
        });
        if (index !== -1) {
          tags.splice(index, 1);
        }
      }
      tags.push(tagDesc);
    };
    if (Array.isArray(props.tags) === false) {
      throw Error("tags array should be passed to <MetaProvider /> in node");
    }
  }
  return createComponent(MetaContext.Provider, {
    value: actions,
    get children() {
      return props.children;
    }
  });
};
const MetaTag = (tag, props, setting) => {
  const id = createUniqueId();
  const c = useContext(MetaContext);
  if (!c) throw new Error("<MetaProvider /> should be in the tree");
  useHead({
    tag,
    props,
    setting,
    id,
    get name() {
      return props.name || props.property;
    }
  });
  return null;
};
function useHead(tagDesc) {
  const {
    addClientTag,
    removeClientTag,
    addServerTag
  } = useContext(MetaContext);
  createRenderEffect(() => {
    if (!isServer) ;
  });
  {
    addServerTag(tagDesc);
    return null;
  }
}
function renderTags(tags) {
  return tags.map(tag => {
    const keys = Object.keys(tag.props);
    // @ts-expect-error
    const props = keys.map(k => k === "children" ? "" : ` ${k}="${escape(tag.props[k], true)}"`).join("");
    if (tag.props.children) {
      // Tags might contain multiple text children:
      //   <Title>example - {myCompany}</Title>
      const children = Array.isArray(tag.props.children) ? tag.props.children.join("") : tag.props.children;
      if (tag.setting?.escape && typeof children === "string") {
        return `<${tag.tag} data-sm="${tag.id}"${props}>${escape(children)}</${tag.tag}>`;
      }
      return `<${tag.tag} data-sm="${tag.id}"${props}>${children}</${tag.tag}>`;
    }
    return `<${tag.tag} data-sm="${tag.id}"${props}/>`;
  }).join("");
}
const Title = props => MetaTag("title", props, {
  escape: true
});
const Meta$1 = props => MetaTag("meta", props, {
  escape: true
});

const _tmpl$$9 = ["<div", " style=\"", "\"><div style=\"", "\"><p style=\"", "\" id=\"error-message\">", "</p><button id=\"reset-errors\" style=\"", "\">Clear errors and retry</button><pre style=\"", "\">", "</pre></div></div>"];
function ErrorBoundary(props) {
  return createComponent(ErrorBoundary$1, {
    fallback: (e, reset) => {
      return createComponent(Show, {
        get when() {
          return !props.fallback;
        },
        get fallback() {
          return props.fallback && props.fallback(e, reset);
        },
        get children() {
          return createComponent(ErrorMessage, {
            error: e
          });
        }
      });
    },
    get children() {
      return props.children;
    }
  });
}
function ErrorMessage(props) {
  return ssr(_tmpl$$9, ssrHydrationKey(), "padding:" + "16px", "background-color:" + "rgba(252, 165, 165)" + (";color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";overflow:" + "scroll") + (";padding:" + "16px") + (";margin-bottom:" + "8px"), "font-weight:" + "bold", escape(props.error.message), "color:" + "rgba(252, 165, 165)" + (";background-color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";padding:" + "4px 8px"), "margin-top:" + "8px" + (";width:" + "100%"), escape(props.error.stack));
}

const routeLayouts = {
  "/*404": {
    "id": "/*404",
    "layouts": []
  },
  "/fun": {
    "id": "/fun",
    "layouts": []
  },
  "/": {
    "id": "/",
    "layouts": []
  },
  "/research": {
    "id": "/research",
    "layouts": []
  },
  "/teaching": {
    "id": "/teaching",
    "layouts": []
  },
  "/cv/": {
    "id": "/cv/",
    "layouts": []
  }
};

const _tmpl$$8 = ["<link", " rel=\"stylesheet\"", ">"],
  _tmpl$2$4 = ["<link", " rel=\"modulepreload\"", ">"];
function flattenIslands(match, manifest) {
  let result = [...match];
  match.forEach(m => {
    if (m.type !== "island") return;
    const islandManifest = manifest[m.href];
    if (islandManifest) {
      const res = flattenIslands(islandManifest.assets, manifest);
      result.push(...res);
    }
  });
  return result;
}
function getAssetsFromManifest(manifest, routerContext) {
  let match = routerContext.matches ? routerContext.matches.reduce((memo, m) => {
    if (m.length) {
      const fullPath = m.reduce((previous, match) => previous + match.originalPath, "");
      const route = routeLayouts[fullPath];
      if (route) {
        memo.push(...(manifest[route.id] || []));
        const layoutsManifestEntries = route.layouts.flatMap(manifestKey => manifest[manifestKey] || []);
        memo.push(...layoutsManifestEntries);
      }
    }
    return memo;
  }, []) : [];
  match.push(...(manifest["entry-client"] || []));
  match = manifest ? flattenIslands(match, manifest) : [];
  const links = match.reduce((r, src) => {
    r[src.href] = src.type === "style" ? ssr(_tmpl$$8, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : src.type === "script" ? ssr(_tmpl$2$4, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : undefined;
    return r;
  }, {});
  return Object.values(links);
}

/**
 * Links are used to load assets for the server rendered HTML
 * @returns {JSXElement}
 */
function Links() {
  const context = useContext(ServerContext);
  useAssets(() => getAssetsFromManifest(context.env.manifest, context.routerContext));
  return null;
}

function Meta() {
  const context = useContext(ServerContext);
  // @ts-expect-error The ssr() types do not match the Assets child types
  useAssets(() => ssr(renderTags(context.tags)));
  return null;
}

const _tmpl$4$3 = ["<script", " type=\"module\" async", "></script>"];
const isDev = "production" === "development";
const isIslands = false;
function Scripts() {
  const context = useContext(ServerContext);
  return [createComponent(HydrationScript, {}), isIslands , createComponent(NoHydration, {
    get children() {
      return (      ssr(_tmpl$4$3, ssrHydrationKey(), ssrAttribute("src", escape(context.env.manifest["entry-client"][0].href, true), false)) );
    }
  }), isDev ];
}

function Html(props) {
  {
    return ssrElement("html", props, undefined, false);
  }
}
function Head(props) {
  {
    return ssrElement("head", props, () => [escape(props.children), createComponent(Meta, {}), createComponent(Links, {})], false);
  }
}
function Body(props) {
  {
    return ssrElement("body", props, () => escape(props.children) , false);
  }
}

function HttpStatusCode(props) {
  const context = useContext(ServerContext);
  {
    context.setStatusCode(props.code);
  }
  onCleanup(() => {
    {
      context.setStatusCode(200);
    }
  });
  return null;
}

const _tmpl$$7 = ["<main", "><!--#-->", "<!--/--><!--#-->", "<!--/--><h1>Page Not Found</h1><p class=\"red\">Where are you going?</p></main>"];
function NotFound() {
  return ssr(_tmpl$$7, ssrHydrationKey(), escape(createComponent(Title, {
    children: "Page Not Found"
  })), escape(createComponent(HttpStatusCode, {
    code: 404
  })));
}

const _tmpl$$6 = ["<main", "><!--#-->", "<!--/--><!--#-->", "<!--/--><h1>Page Not Found</h1><p class=\"red\">Page coming soon...</p></main>"];
function Fun() {
  return ssr(_tmpl$$6, ssrHydrationKey(), escape(createComponent(Title, {
    children: "Fun - Foo Yong Qi"
  })), escape(createComponent(HttpStatusCode, {
    code: 404
  })));
}

const _tmpl$$5 = ["<div", " class=\"", "\"><h2", ">", "</h2><!--#-->", "<!--/--></div>"];
function Card(props) {
  return ssr(_tmpl$$5, ssrHydrationKey(), `${escape(props.border, true)}-border card`, ssrAttribute("class", escape(props.header_color, true), false), escape(props.header), escape(props.children));
}

const _tmpl$$4 = ["<p", "><em class=\"teal\">Instructor</em> and <em class=\"flamingo\">PhD in Computer Science candidate</em> at the Department of Computer Science, School of Computing, <em class=\"sky\">National University of Singapore</em>.</p>"],
  _tmpl$2$3 = ["<p", ">I like <em class=\"yellow\">ducks</em>, <em class=\"red\">type systems</em>, and <em class=\"lavender\">programming languages</em></p>"],
  _tmpl$3$3 = ["<div", "><strong>Email</strong>: <em class=\"sapphire\">yongqi@nus.edu.sg</em></div>"],
  _tmpl$4$2 = ["<div", "><strong>DID</strong>: <em class=\"rosewater\">+65 6516 7960</em></div>"],
  _tmpl$5$2 = ["<div", "><strong>Office</strong>: <em class=\"peach\">COM2-02-27, 15 Computing Drive, Singapore 117418</em></div>"],
  _tmpl$6$2 = ["<main", "><!--#-->", "<!--/--><img class=\"circle profile-pic\" src=\"../yongqi.jpg\"><h1><strong class=\"red\">Foo</strong> Yong Qi</h1><div><em>Keep it simple, stupid.</em></div><!--#-->", "<!--/--><!--#-->", "<!--/--></main>"];
function Home() {
  return ssr(_tmpl$6$2, ssrHydrationKey(), escape(createComponent(Title, {
    children: "Foo Yong Qi"
  })), escape(createComponent(Card, {
    border: "mauve",
    header_color: "green",
    header: "About",
    get children() {
      return [ssr(_tmpl$$4, ssrHydrationKey()), ssr(_tmpl$2$3, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    border: "flamingo",
    header_color: "teal",
    header: "Contact",
    get children() {
      return [ssr(_tmpl$3$3, ssrHydrationKey()), ssr(_tmpl$4$2, ssrHydrationKey()), ssr(_tmpl$5$2, ssrHydrationKey())];
    }
  })));
}

const _tmpl$$3 = ["<h3", ">Abstract</h3>"],
  _tmpl$2$2 = ["<p", ">-- withheld until publication date --</p>"],
  _tmpl$3$2 = ["<main", "><!--#-->", "<!--/--><h1>Research</h1><!--#-->", "<!--/--></main>"];
function Teaching$1() {
  return ssr(_tmpl$3$2, ssrHydrationKey(), escape(createComponent(Title, {
    children: "Research - Foo Yong Qi"
  })), escape(createComponent(Card, {
    header: "-- withheld --",
    header_color: "yellow",
    border: "peach",
    get children() {
      return [ssr(_tmpl$$3, ssrHydrationKey()), ssr(_tmpl$2$2, ssrHydrationKey())];
    }
  })));
}

const _tmpl$$2 = ["<em", ">Software Development Fundamentals</em>"],
  _tmpl$2$1 = ["<h3", ">Course Description</h3>"],
  _tmpl$3$1 = ["<p", ">This module aims to introduce non-computing students to the principles and concepts of software development at an accelerated pace. Students will be introduced to the basics of programming (control flow, code and data abstraction, recursion, types, OO), development methodology (ensuring correctness, testing, debugging), simple data structures and algorithms (lists, maps, sorting), and software engineering principles. Through hands on assignments and projects, students will learn good software development practices (documentation, style) and experience a typical software engineering cycle.</p>"],
  _tmpl$4$1 = ["<h3", "> Semesters Taught</h3>"],
  _tmpl$5$1 = ["<ul", "><li>AY23/24 Semester 2</li> <li>AY22/23 Semester 2</li> <li>AY22/23 Semester 1</li> <li>AY21/22 Semester 2</li> <li>AY21/22 Semester 1</li><li> AY20/21 Semester 2</li></ul>"],
  _tmpl$6$1 = ["<em", ">Industry Readiness: Security Best Practices</em>"],
  _tmpl$7$1 = ["<p", ">Malicious exploitation of vulnerable applications running on the web can have disastrous consequences. This module aims to introduce application security considerations and provide practical experience on secure coding practices, focusing on web-based applications. Topics covered include fundamental security concepts (e.g., encryption, authentication, authorization), secure coding practices (e.g., handling of cookies, passwords, errors), secure design and deployment principles (e.g., threat modelling, vulnerability scanning), along with industry standards (e.g., OWASP), tools, common threats and defense against them.</p>"],
  _tmpl$8$1 = ["<p", ">AY23/24 Semester 1</p>"],
  _tmpl$9$1 = ["<em", ">High-Throughput Stream Programming</em>"],
  _tmpl$10$1 = ["<p", ">The global availability of data has reached a level where aggregating data into generic, general-purpose \u201Cstores\u201D is no longer feasible. Having data collections statically available for querying by interested parties on demand is increasingly becoming the way of the past. Instead, a new paradigm, called Data Streaming, has emerged recently. In this paradigm, data is bundled into high-throughput \"streams\" that are sharded efficiently across a large number of network nodes. Consumers, sometimes counted in hundreds of thousands, or millions, \"subscribe\" to data subsets and are notified when new data becomes available, being under the obligation to process it immediately, or lose it. Consequently, data storage is no longer centralized, but rather distributed into many smaller-sized abstract collections. This new approach to \"Big Data\" requires a new set of tools, platforms, and solution patterns. In this course we propose to explore several facets of this new paradigm:</p>"],
  _tmpl$11$1 = ["<ul", "><li>The Stream paradigm introduced in Java 8.</li><li>Platforms that implement Data Streaming, such as Kafka, and the Java bindings in the library KafkaConnect.</li><li>Computing paradigms for stream processing, such as Reactive Programming, and the library RxJava.</li><li>High-performance stream computing platforms, such as Flink.</li></ul>"],
  _tmpl$12$1 = ["<p", ">The course will be using Java as the main vehicle for introducing concepts and showcasing examples.</p>"],
  _tmpl$13$1 = ["<p", ">AY23/24 Semester 2</p>"],
  _tmpl$14$1 = ["<em", ">Data Structures & Algorithms</em>"],
  _tmpl$15$1 = ["<p", ">This module introduces non-computing students to efficient computational problem solving in an accelerated pace. Students will learn to formulate a computational problem, identify the data required and come up with appropriate data structures to represent them, and apply known strategies to design an algorithm to solve the problem. Students will also learn to quantify the space and time complexity of an algorithm, prove the correctness of an algorithm, and the limits of computation. Topics include common data structures and their algorithms (lists, hash tables, heap, trees, graphs), algorithmic problem solving paradigms (greedy, divide and conquer, dynamic programming), and NP-completeness.</p>"],
  _tmpl$16$1 = ["<p", ">AY20/21 Semester 2</p>"],
  _tmpl$17$1 = ["<em", ">Enterprise Systems Architecture Fundamentals</em>"],
  _tmpl$18$1 = ["<p", ">This module aims to equip non-computing students with fundamental knowledge in architecting and designing modern Enterprise Systems in organisations that can be reasonably complex, scalable, distributed, component-based and missioncritical. Students will develop an understanding of high-level concepts such as enterprise architecture and software architecture. They will them move on to acquire fundamental systems analysis and design techniques such as object-oriented requirements analysis and design using the Unified Modelling Language.</p>"],
  _tmpl$19$1 = ["<em", ">Programming Methodology</em>"],
  _tmpl$20$1 = ["<p", ">This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing. Topics covered include computational thinking and computational problem solving, designing and specifying an algorithm, basic problem formulation and problem solving approaches, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures (arrays, strings, composite data types), basic sorting, and recursion.</p>"],
  _tmpl$21$1 = ["<ul", "><li>AY20/21 Semester 1</li><li>AY19/20 Special Term 2</li><li>AY19/20 Semester 2</li><li>AY19/20 Semester 1</li><li>AY18/19 Semester 2</li><li>AY18/19 Semester 1</li></ul>"],
  _tmpl$22$1 = ["<p", ">This module is a follow up to CS1010. It explores two modern programming paradigms, object-oriented programming and functional programming. Through a series of integrated assignments, students will learn to develop medium-scale software programs in the order of thousands of lines of code and tens of classes using objectoriented design principles and advanced programming constructs available in the two paradigms. Topics include objects and classes, composition, association, inheritance, interface, polymorphism, abstract classes, dynamic binding, lambda expression, effect-free programming, first class functions, closures, continuations, monad, etc.</p>"],
  _tmpl$23$1 = ["<ul", "><li>AY20/21 Semester 1</li><li>AY19/20 Special Term 1</li><li>AY19/20 Semester 2</li><li>AY19/20 Semester 1</li><li>AY18/19 Semester 2</li></ul>"],
  _tmpl$24$1 = ["<main", "><!--#-->", "<!--/--><h1>Teaching</h1><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></main>"];
function Teaching() {
  return ssr(_tmpl$24$1, ssrHydrationKey(), escape(createComponent(Title, {
    children: "Teaching - Foo Yong Qi"
  })), escape(createComponent(Card, {
    header: "IT5001",
    header_color: "yellow",
    border: "peach",
    get children() {
      return [ssr(_tmpl$$2, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$3$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$5$1, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    header: "IT5100E",
    header_color: "green",
    border: "lavender",
    get children() {
      return [ssr(_tmpl$6$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$7$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$8$1, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    header: "IT5100B",
    header_color: "blue",
    border: "maroon",
    get children() {
      return [ssr(_tmpl$9$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$10$1, ssrHydrationKey()), ssr(_tmpl$11$1, ssrHydrationKey()), ssr(_tmpl$12$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$13$1, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    header: "IT5003",
    header_color: "lavender",
    border: "red",
    get children() {
      return [ssr(_tmpl$14$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$15$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$16$1, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    header: "IT5004",
    header_color: "peach",
    border: "teal",
    get children() {
      return [ssr(_tmpl$17$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$18$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$16$1, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    header: "CS1010E",
    header_color: "rosewater",
    border: "green",
    get children() {
      return [ssr(_tmpl$19$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$20$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$21$1, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    header: "CS2030/S",
    header_color: "mauve",
    border: "flamingo",
    get children() {
      return [ssr(_tmpl$19$1, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey()), ssr(_tmpl$22$1, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey()), ssr(_tmpl$23$1, ssrHydrationKey())];
    }
  })));
}

const _tmpl$$1 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name green\">Ph.D. in Computer Science</div><div class=\"cv-item-date green\">Aug 2023 to Present</div></div><div class=\"cv-item-place green\">National University of Singapore</div></div>"],
  _tmpl$2 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name pink\">M.Sc. in Computer Science (by Research)</div><div class=\"cv-item-date pink\">Jan 2021 to Jun 2023</div></div><div class=\"cv-item-place pink\">National University of Singapore</div><p class=\"description\"><strong>Key modules</strong>: Program Analysis, Robotics, Algorithms<br><strong>CAP</strong>: 4.5/5.0<br><strong>Thesis</strong>: Compiling and Detecting Type Errors in Incomplete Java Programs with Generics<br><strong>Supervisor</strong>: Associate Professor Khoo Siau Cheng, Ph.D.</p></div>"],
  _tmpl$3 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name yellow\">B.Eng. (Hons) in Industrial & Systems Engineering</div><div class=\"cv-item-date yellow\">Aug 2017 to Dec 2020</div></div><div class=\"cv-item-place yellow\">National University of Singapore</div><p class=\"description\"><strong>Key modules</strong>: Programming Methodology, Algorithms, Software Engineering<br><strong>CAP</strong>: 4.28/5.0<br><strong>Dissertation</strong>: Regional Multi-Person Pose Estimation for Sports Analytics<br><strong>Supervisor</strong>: Professor Andrew Lim, Ph.D.</p></div>"],
  _tmpl$4 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name green\">Instructor</div><div class=\"cv-item-date green\">Jan 2023 to Present</div></div><div class=\"cv-item-place green\">National University of Singapore</div><p class=\"description\">Modules taught: IT5001, IT5100B, IT5100E</p></div>"],
  _tmpl$5 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name lavender\">Teaching Assistant</div><div class=\"cv-item-date lavender\">Aug 2018 to Dec 2022</div></div><div class=\"cv-item-place lavender\">National University of Singapore</div><p class=\"description\">Modules taught: CS1010E, CS2030/S, IT5001, IT5003, IT5004</p></div>"],
  _tmpl$6 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name sapphire\">PWA Developer</div><div class=\"cv-item-date sapphire\">Aug 2019 to Aug 2020</div></div><div class=\"cv-item-place sapphire\">National University of Singapore</div><p class=\"description\">Developed a Nuxt.js PWA for NUS Smart Dining Initiative</p></div>"],
  _tmpl$7 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name peach\">Business Development</div><div class=\"cv-item-date peach\">May 2018 to Jul 2020</div></div><div class=\"cv-item-place peach\">Sqkii</div><p class=\"description\">Liaised with corporate partners for business ventures and pitched projects to clients</p></div>"],
  _tmpl$8 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name teal\">Co-Founder, President</div><div class=\"cv-item-date teal\">Apr 2018 to Apr 2020</div></div><div class=\"cv-item-place teal\">Uncage</div><p class=\"description\">Started a Non-Profit Organization aimed at harnessing the power of community to rehabilitate people with Substance Use Disorders</p></div>"],
  _tmpl$9 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name mauve\">Compiling & Detecting Type Errors in Incomplete Java Programs with Generics</div><div class=\"cv-item-date mauve\">Jan 2021 to May 2023</div></div><div class=\"cv-item-header\"><div class=\"cv-item-place\">Master's Thesis</div><div class=\"cv-item-date\">Supervisor: Associate Professor Khoo Siau Cheng, Ph.D.</div></div><div class=\"cv-item-place\">National University of Singapore</div><p class=\"description\">Proposed a novel constraint-based algorithm that compiles incomplete Java programs in a typesafe manner and developed a prototype of this algorithm, JavaCIP</p></div>"],
  _tmpl$10 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name yellow\">Regional Multi-Person Pose Estimation for Sports Analytics</div><div class=\"cv-item-date yellow\">Aug 2020 to Dec 2020</div></div><div class=\"cv-item-header\"><div class=\"cv-item-place\">Bachelor's Thesis</div><div class=\"cv-item-date\">Supervisor: Professor Andrew Lim, Ph.D.</div></div><div class=\"cv-item-place\">National University of Singapore</div><p class=\"description\">Used AlphaPose and a novel LSTM network for Action Recognition in Basketball analysis</p></div>"],
  _tmpl$11 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name pink\">Fedora-SoC</div><div class=\"cv-item-date pink\">Aug 2020 to Dec 2020</div></div><div class=\"cv-item-place\">National University of Singapore</div><p class=\"description\">Developed a fork of Fedora (Linux Workstation) for exam-takers in NUS SoC during COVID-19 pandemic</p></div>"],
  _tmpl$12 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name maroon\">NUS Smart Dining</div><div class=\"cv-item-date maroon\">Aug 2019 to May 2020</div></div><div class=\"cv-item-place\">National University of Singapore</div><p class=\"description\">Used mmdetection computer vision framework to recognize orders from top-down camera view at Frontier Food Court\u2019s Drink Stall</p></div>"],
  _tmpl$13 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name flamingo\">Live Firing Systems Optimization</div><div class=\"cv-item-date flamingo\">Feb 2017</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div><p class=\"description\">Developed Live Firing scheduling system for use in the Multi-Mission Range Complex (MMRC), resulting in S$75,000 annual cost savings</p></div>"],
  _tmpl$14 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name red\">Full-Time Teaching Assistant Award</div><div class=\"cv-item-date red\">May 2022</div></div><div class=\"cv-item-place red\">National University of Singapore</div></div>"],
  _tmpl$15 = ["<div", " class=\"cv-item sapphire\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">Honour List of Student Tutors</div><div class=\"cv-item-date\">May 2021</div></div><div class=\"cv-item-place\">National University of Singapore</div></div>"],
  _tmpl$16 = ["<div", " class=\"cv-item lavender\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">Honour List of Student Tutors</div><div class=\"cv-item-date\">May 2019</div></div><div class=\"cv-item-place\">National University of Singapore</div></div>"],
  _tmpl$17 = ["<div", " class=\"cv-item peach\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">Dean's List</div><div class=\"cv-item-date\">Jan 2019</div></div><div class=\"cv-item-place\">National University of Singapore</div></div>"],
  _tmpl$18 = ["<div", " class=\"cv-item pink\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">3AMB Base Sergeant Major's Coin</div><div class=\"cv-item-date\">Nov 2016</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div></div>"],
  _tmpl$19 = ["<div", " class=\"cv-item sky\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">Letter of Commendation</div><div class=\"cv-item-date\">Oct 2016</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div></div>"],
  _tmpl$20 = ["<div", " class=\"cv-item flamingo\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">3AMB Commanding Officer's Coin</div><div class=\"cv-item-date\">Sep 2016</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div></div>"],
  _tmpl$21 = ["<div", " class=\"cv-item yellow\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">SCS L Coy Platoon Best Soldier</div><div class=\"cv-item-date\">Sep 2015</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div></div>"],
  _tmpl$22 = ["<div", " class=\"cv-item maroon\"><div class=\"cv-item-header\"><div class=\"cv-item-name\">BMTC 2 Coy Platoon Best Recruit</div><div class=\"cv-item-date\">Jul 2015</div></div><div class=\"cv-item-place\">Singapore Armed Forces</div></div>"],
  _tmpl$23 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name teal\">Languages</div><div class=\"cv-item-date\"></div></div><p class=\"description\">English, Mandarin</p></div>"],
  _tmpl$24 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name yellow\">Office</div><div class=\"cv-item-date\"></div></div><p class=\"description\">Microsoft Office Suite (PowerPoint, Excel, Word)</p></div>"],
  _tmpl$25 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name green\">Development</div><div class=\"cv-item-date\"></div></div><p class=\"description\">Java, Python, Scala, C/C++, JavaScript, TypeScript, Solid.js, Nuxt.js, Vue.js, React.js, Quasar, Node.js, ML, Haskell, Rust, Go, R, Firebase, PyTorch, OpenCV, Google Cloud Platform, LaTeX, Markdown, HTML, CSS</p></div>"],
  _tmpl$26 = ["<div", " class=\"cv-item\"><div class=\"cv-item-header\"><div class=\"cv-item-name rosewater\">Systems</div><div class=\"cv-item-date\"></div></div><p class=\"description\">Tableau, Stella Architect, Automod Simulation</p></div>"],
  _tmpl$27 = ["<main", "><!--#-->", "<!--/--><h1>CV</h1><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></main>"];
function CV() {
  return ssr(_tmpl$27, ssrHydrationKey(), escape(createComponent(Title, {
    children: "CV - Foo Yong Qi"
  })), escape(createComponent(Card, {
    header: "education",
    header_color: "mauve",
    border: "red",
    get children() {
      return [ssr(_tmpl$$1, ssrHydrationKey()), ssr(_tmpl$2, ssrHydrationKey()), ssr(_tmpl$3, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    header: "Employment",
    header_color: "red",
    border: "sky",
    get children() {
      return [ssr(_tmpl$4, ssrHydrationKey()), ssr(_tmpl$5, ssrHydrationKey()), ssr(_tmpl$6, ssrHydrationKey()), ssr(_tmpl$7, ssrHydrationKey()), ssr(_tmpl$8, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    header: "Projects",
    header_color: "teal",
    border: "peach",
    get children() {
      return [ssr(_tmpl$9, ssrHydrationKey()), ssr(_tmpl$10, ssrHydrationKey()), ssr(_tmpl$11, ssrHydrationKey()), ssr(_tmpl$12, ssrHydrationKey()), ssr(_tmpl$13, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    header: "Awards",
    header_color: "rosewater",
    border: "green",
    get children() {
      return [ssr(_tmpl$14, ssrHydrationKey()), ssr(_tmpl$15, ssrHydrationKey()), ssr(_tmpl$16, ssrHydrationKey()), ssr(_tmpl$17, ssrHydrationKey()), ssr(_tmpl$18, ssrHydrationKey()), ssr(_tmpl$19, ssrHydrationKey()), ssr(_tmpl$20, ssrHydrationKey()), ssr(_tmpl$21, ssrHydrationKey()), ssr(_tmpl$22, ssrHydrationKey())];
    }
  })), escape(createComponent(Card, {
    header: "Superpowers",
    header_color: "maroon",
    border: "yellow",
    get children() {
      return [ssr(_tmpl$23, ssrHydrationKey()), ssr(_tmpl$24, ssrHydrationKey()), ssr(_tmpl$25, ssrHydrationKey()), ssr(_tmpl$26, ssrHydrationKey())];
    }
  })));
}

/// <reference path="../server/types.tsx" />

const fileRoutes = [{
  component: NotFound,
  path: "/*404"
}, {
  component: Fun,
  path: "/fun"
}, {
  component: Home,
  path: "/"
}, {
  component: Teaching$1,
  path: "/research"
}, {
  component: Teaching,
  path: "/teaching"
}, {
  component: CV,
  path: "/cv/"
}];

/**
 * Routes are the file system based routes, used by Solid App Router to show the current page according to the URL.
 */

const FileRoutes = () => {
  return fileRoutes;
};

const _tmpl$ = ["<nav", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></nav>"];
function NavBar() {
  return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent(A, {
    "class": "navitem",
    href: "/",
    children: "Home"
  })), escape(createComponent(A, {
    "class": "navitem",
    href: "/cv",
    children: "CV"
  })), escape(createComponent(A, {
    "class": "navitem",
    href: "/teaching",
    children: "Teaching"
  })), escape(createComponent(A, {
    "class": "navitem",
    href: "/research",
    children: "Research"
  })), escape(createComponent(A, {
    "class": "navitem",
    href: "/fun",
    children: "Fun"
  })));
}

function Root() {
  return createComponent(Html, {
    lang: "en",
    get children() {
      return [createComponent(Head, {
        get children() {
          return [createComponent(Title, {
            children: "Foo Yong Qi"
          }), createComponent(Meta$1, {
            charset: "utf-8"
          }), createComponent(Meta$1, {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          })];
        }
      }), createComponent(Body, {
        get children() {
          return [createComponent(Suspense, {
            get children() {
              return createComponent(ErrorBoundary, {
                get children() {
                  return [createComponent(NavBar, {}), createComponent(Routes, {
                    get children() {
                      return createComponent(FileRoutes, {});
                    }
                  })];
                }
              });
            }
          }), createComponent(Scripts, {})];
        }
      })];
    }
  });
}

const rootData = Object.values(/* #__PURE__ */ Object.assign({

}))[0];
const dataFn = rootData ? rootData.default : undefined;

/** Function responsible for listening for streamed [operations]{@link Operation}. */

/** Input parameters for to an Exchange factory function. */

/** Function responsible for receiving an observable [operation]{@link Operation} and returning a [result]{@link OperationResult}. */

/** This composes an array of Exchanges into a single ExchangeIO function */
const composeMiddleware = exchanges => ({
  forward
}) => exchanges.reduceRight((forward, exchange) => exchange({
  forward
}), forward);
function createHandler(...exchanges) {
  const exchange = composeMiddleware(exchanges);
  return async event => {
    return await exchange({
      forward: async op => {
        return new Response(null, {
          status: 404
        });
      }
    })(event);
  };
}
function StartRouter(props) {
  return createComponent(Router, props);
}
const docType = ssr("<!DOCTYPE html>");
function StartServer({
  event
}) {
  const parsed = new URL(event.request.url);
  const path = parsed.pathname + parsed.search;

  // @ts-ignore
  sharedConfig.context.requestContext = event;
  return createComponent(ServerContext.Provider, {
    value: event,
    get children() {
      return createComponent(MetaProvider, {
        get tags() {
          return event.tags;
        },
        get children() {
          return createComponent(StartRouter, {
            url: path,
            get out() {
              return event.routerContext;
            },
            location: path,
            get prevLocation() {
              return event.prevUrl;
            },
            data: dataFn,
            routes: fileRoutes,
            get children() {
              return [docType, createComponent(Root, {})];
            }
          });
        }
      });
    }
  });
}

const entryServer = createHandler(renderAsync(event => createComponent(StartServer, {
  event: event
})));

const MAX_REDIRECTS = 10;
async function handleRequest(req) {
  req.headers = {};
  req.method = "GET";
  const webRes = await entryServer({
    request: createRequest(req),
    env: { manifest }
  });
  return webRes;
}

var server = async req => {
  let webRes = await handleRequest(req);
  if (webRes.status === 200) {
    return webRes.text();
  } else if (webRes.status === 302) {
    let redirects = 1;
    while (redirects < MAX_REDIRECTS) {
      webRes = await handleRequest({ url: webRes.headers.get("location") });
      if (webRes.status === 200) {
        return webRes.text();
      } else if (webRes.status === 302) {
        redirects++;
      } else {
        return "<h1>Error</h1>";
      }
    }
  }
  return webRes.text();
};

export { server as default };
