/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Style

	__webpack_require__(1);

	// Package
	window.app = __webpack_require__(2);

	// Libs
	__webpack_require__(3);
	window.Promise = __webpack_require__(12);
	window.marked = __webpack_require__(15);
	__webpack_require__(53);

	Promise.onPossiblyUnhandledRejection(function (error, promise) {
	    throw error;
	});

	// Globals
	__webpack_require__(16);

	// Helpers
	window.ResourceHelper = __webpack_require__(17);
	window.SettingsHelper = __webpack_require__(18);
	window.InputHelper = __webpack_require__(19);
	window.IssueHelper = __webpack_require__(20);
	window.DebugHelper = __webpack_require__(21);
	window.GraphHelper = __webpack_require__(22);
	window.debug = window.DebugHelper;
	window.debug.verbosity = 1;

	var GitHubApi = __webpack_require__(23);
	var BitBucketApi = __webpack_require__(25);

	switch (getSource()) {
	    case 'bitbucket':
	        window.ApiHelper = new BitBucketApi();
	        break;

	    case 'github':
	        window.ApiHelper = new GitHubApi();
	        break;

	    default:
	        location = '/login';

	        debug.error('No source provided', undefined);
	        break;
	}

	// Models
	window.Issue = __webpack_require__(26);
	window.Milestone = __webpack_require__(27);
	window.User = __webpack_require__(28);
	window.Repository = __webpack_require__(29);
	window.Attachment = __webpack_require__(30);
	window.Organization = __webpack_require__(31);

	// Views
	window.Navbar = __webpack_require__(32);
	window.RepositoryBar = __webpack_require__(34);
	window.IssueEditor = __webpack_require__(36);
	window.MilestoneEditor = __webpack_require__(38);
	window.ResourceEditor = __webpack_require__(40);
	window.PlanItemEditor = __webpack_require__(42);
	window.PlanEditor = __webpack_require__(44);
	window.RepositoryEditor = __webpack_require__(46);
	window.FilterEditor = __webpack_require__(48);
	window.BurnDownChart = __webpack_require__(50);

	// Routes
	__webpack_require__(52);

	// Title
	$('head title').html((Router.params.repository ? Router.params.repository + ' - ' : '') + 'Samoosa');

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		"name": "samoosa",
		"version": "0.3.0",
		"description": "",
		"main": "index.html",
		"scripts": {
			"test": "echo \"Error: no test specified\" && exit 1"
		},
		"author": "Putaitu Productions",
		"license": "ISC",
		"devDependencies": {
			"babel-core": "^6.18.0",
			"babel-loader": "^6.2.7",
			"babel-preset-es2015": "^6.18.0",
			"bluebird": "^3.3.3",
			"css-loader": "^0.25.0",
			"exomon": "^1.1.0",
			"extract-text-webpack-plugin": "^1.0.1",
			"json-loader": "^0.5.4",
			"marked": "^0.3.5",
			"node-sass": "^3.10.1",
			"path-to-regexp": "^1.2.1",
			"sass-loader": "^4.0.2",
			"sass-material-colors": "0.0.5",
			"style-loader": "^0.13.1",
			"webpack": "^1.13.3"
		},
		"dependencies": {
			"babel-polyfill": "^6.16.0"
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(4);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var pathToRegexp = __webpack_require__(5);

	var routes = [];

	var Router = function () {
	    function Router() {
	        _classCallCheck(this, Router);
	    }

	    _createClass(Router, null, [{
	        key: 'route',
	        value: function route(path, controller) {
	            routes[path] = {
	                controller: controller
	            };
	        }
	    }, {
	        key: 'go',
	        value: function go(url) {
	            location.hash = url;
	        }
	    }, {
	        key: 'goToBaseDir',
	        value: function goToBaseDir() {
	            var url = this.url || '/';
	            var base = new String(url).substring(0, url.lastIndexOf('/'));

	            this.go(base);
	        }
	    }, {
	        key: 'query',
	        value: function query(name) {
	            var url = window.location.href;

	            name = name.replace(/[\[\]]/g, "\\$&");

	            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	            var results = regex.exec(url);

	            if (!results) return null;
	            if (!results[2]) return '';

	            return decodeURIComponent(results[2].replace(/\+/g, " "));
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            // Get the url
	            var url = location.hash.slice(1) || '/';
	            var trimmed = url.substring(0, url.indexOf('?'));

	            Router.params = {};

	            if (trimmed) {
	                url = trimmed;
	            }
	            // Look for route
	            var context = {};
	            var route = void 0;

	            // Exact match
	            if (routes[url]) {
	                route = routes[url];

	                // Use path to regexp
	            } else {
	                for (var path in routes) {
	                    var keys = [];
	                    var re = pathToRegexp(path, keys);
	                    var values = re.exec(url);

	                    // A match was found
	                    if (re.test(url)) {
	                        // Set the route
	                        route = routes[path];

	                        // Add context variables (first result (0) is the entire path,
	                        // so assign that manually and start the counter at 1 instead)
	                        route.url = url;
	                        var counter = 1;

	                        var _iteratorNormalCompletion = true;
	                        var _didIteratorError = false;
	                        var _iteratorError = undefined;

	                        try {
	                            for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                                var key = _step.value;

	                                route[key.name] = values[counter];
	                                Router.params[key.name] = values[counter];

	                                counter++;
	                            }
	                        } catch (err) {
	                            _didIteratorError = true;
	                            _iteratorError = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion && _iterator.return) {
	                                    _iterator.return();
	                                }
	                            } finally {
	                                if (_didIteratorError) {
	                                    throw _iteratorError;
	                                }
	                            }
	                        }

	                        break;
	                    }
	                }
	            }

	            if (route) {
	                route.controller();
	            }

	            Router.url = url;
	        }
	    }]);

	    return Router;
	}();

	window.addEventListener('hashchange', Router.init);
	window.Router = Router;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var isarray = __webpack_require__(6);

	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp;
	module.exports.parse = parse;
	module.exports.compile = compile;
	module.exports.tokensToFunction = tokensToFunction;
	module.exports.tokensToRegExp = tokensToRegExp;

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	// Match escaped characters that would otherwise appear in future matches.
	// This allows the user to escape special characters that won't transform.
	'(\\\\.)',
	// Match Express-style parameters and un-named parameters with a prefix
	// and optional suffixes. Matches appear as:
	//
	// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse(str, options) {
	  var tokens = [];
	  var key = 0;
	  var index = 0;
	  var path = '';
	  var defaultDelimiter = options && options.delimiter || '/';
	  var res;

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0];
	    var escaped = res[1];
	    var offset = res.index;
	    path += str.slice(index, offset);
	    index = offset + m.length;

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1];
	      continue;
	    }

	    var next = str[index];
	    var prefix = res[2];
	    var name = res[3];
	    var capture = res[4];
	    var group = res[5];
	    var modifier = res[6];
	    var asterisk = res[7];

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path);
	      path = '';
	    }

	    var partial = prefix != null && next != null && next !== prefix;
	    var repeat = modifier === '+' || modifier === '*';
	    var optional = modifier === '?' || modifier === '*';
	    var delimiter = res[2] || defaultDelimiter;
	    var pattern = capture || group;

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
	    });
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index);
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path);
	  }

	  return tokens;
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile(str, options) {
	  return tokensToFunction(parse(str, options));
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty(str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	  });
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk(str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	  });
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction(tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length);

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (_typeof(tokens[i]) === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
	    }
	  }

	  return function (obj, opts) {
	    var path = '';
	    var data = obj || {};
	    var options = opts || {};
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i];

	      if (typeof token === 'string') {
	        path += token;

	        continue;
	      }

	      var value = data[token.name];
	      var segment;

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix;
	          }

	          continue;
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined');
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue;
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty');
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j]);

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment;
	        }

	        continue;
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
	      }

	      path += token.prefix + segment;
	    }

	    return path;
	  };
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString(str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup(group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1');
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys(re, keys) {
	  re.keys = keys;
	  return re;
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags(options) {
	  return options.sensitive ? '' : 'i';
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp(path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g);

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      });
	    }
	  }

	  return attachKeys(path, keys);
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp(path, keys, options) {
	  var parts = [];

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source);
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

	  return attachKeys(regexp, keys);
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp(path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options);
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp(tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */keys || options;
	    keys = [];
	  }

	  options = options || {};

	  var strict = options.strict;
	  var end = options.end !== false;
	  var route = '';
	  var lastToken = tokens[tokens.length - 1];
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i];

	    if (typeof token === 'string') {
	      route += escapeString(token);
	    } else {
	      var prefix = escapeString(token.prefix);
	      var capture = '(?:' + token.pattern + ')';

	      keys.push(token);

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*';
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?';
	        } else {
	          capture = prefix + '(' + capture + ')?';
	        }
	      } else {
	        capture = prefix + '(' + capture + ')';
	      }

	      route += capture;
	    }
	  }

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
	  }

	  if (end) {
	    route += '$';
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)';
	  }

	  return attachKeys(new RegExp('^' + route, flags(options)), keys);
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp(path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */keys || options;
	    keys = [];
	  }

	  options = options || {};

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */keys);
	  }

	  if (isarray(path)) {
	    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
	  }

	  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var FunctionTemplating = {};

	/**
	 * Appends content to an element
	 *
	 * @param {HTMLElement} element
	 * @param {Object} content
	 */
	function append(element, content) {
	    if (Object.prototype.toString.call(content) === '[object Array]') {
	        for (var _i in content) {
	            append(element, content[_i]);
	        }
	    } else if (content) {
	        // jQuery logic
	        if (typeof jQuery !== 'undefined' && element instanceof jQuery) {
	            element.append(content);

	            // Native JavaScript logic
	        } else {
	            element.appendChild(content);
	        }
	    }
	}

	/**
	 * Assigns event handler shorthands to element
	 * This is done to prevent extending the HTMLElement prototype
	 *
	 * @param {HTMLElement} element
	 */
	function assignEvents(element) {
	    /**
	     * Handles the 'addEventListener' method
	     *
	     * @param {String} type
	     * @param {Function} callback
	     */
	    element.on = function on(type, callback) {
	        element.addEventListener(type, callback);

	        return element;
	    };

	    /**
	     * Handles the 'removeEventListener' method
	     *
	     * @param {String} type
	     * @param {Function} callback
	     */
	    element.off = function off(type, callback) {
	        element.removeEventListener(type, callback);

	        return element;
	    };

	    /**
	     * Removes an element
	     */
	    element.remove = function remove() {
	        element.parentNode.removeChild(element);
	    };

	    // Define shorthand methods
	    var shorthands = ['blur', 'change', 'click', 'focus', 'hover', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mouseout', 'mouseover', 'mouseup', 'select'];

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        var _loop = function _loop() {
	            var shorthand = _step.value;

	            element[shorthand] = function click(callback) {
	                return element.on(shorthand, callback);
	            };
	        };

	        for (var _iterator = shorthands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            _loop();
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	}

	/**
	 * Creates an element
	 *
	 * @param {String} tag
	 * @param {Object} attr
	 * @param {Object} contents
	 *
	 * @returns {HTMLElement} element
	 */
	function create(tag, attr, contents) {
	    var element = document.createElement(tag.toUpperCase());

	    // jQuery logic
	    if (typeof jQuery !== 'undefined') {
	        element = $(element);

	        // If the attribute parameter is a jQuery instance, just reassign the parameter values
	        if (attr instanceof jQuery || typeof attr === 'string') {
	            contents = attr;
	        } else {
	            for (var k in attr) {
	                element.attr(k, attr[k]);
	            }
	        }

	        // Native JavaScript logic
	    } else {
	        // Assign custom event functions to element instead of extending the prototype
	        assignEvents(element);

	        // If the attribute parameter is a HTMLElement instance, just reassign the parameter values
	        if (attr instanceof HTMLElement || typeof attr === 'string') {
	            contents = attr;
	        } else {
	            for (var k in attr) {
	                element.setAttribute(k, attr[k]);
	            }
	        }
	    }

	    append(element, contents);

	    return element;
	}

	/**
	 * Declares a rendering method
	 *
	 * @param {String} tag
	 */
	function declareMethod(tag) {
	    FunctionTemplating[tag] = function (attr) {
	        for (var _len = arguments.length, contents = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            contents[_key - 1] = arguments[_key];
	        }

	        return create(tag, attr, contents);
	    };
	}

	/**
	 * Appends content using the function templating rules
	 *
	 * @params {HTMLElement} parentElement
	 * @params {HTMLElement} contents
	 */
	FunctionTemplating.append = function (parentElement) {
	    for (var _len2 = arguments.length, contents = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        contents[_key2 - 1] = arguments[_key2];
	    }

	    append(parentElement, contents);
	};

	/**
	 * Renders content based on a condition
	 * 
	 * @param {Boolean} condition
	 * @param {HTMLElement} contents
	 *
	 * @returns {HTMLElement} contents
	 */
	FunctionTemplating.if = function (condition) {
	    if (condition != false && condition != null && condition != undefined) {
	        for (var _len3 = arguments.length, contents = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	            contents[_key3 - 1] = arguments[_key3];
	        }

	        return contents;
	    }
	};

	/**
	 * Loops through an array or object, rendering elements from model data
	 *
	 * @param {Object} array
	 * @param {Function} callback
	 *
	 * @returns {HTMLElement} elements
	 */
	FunctionTemplating.each = function (array, callback) {
	    var elements = [];

	    for (var i in array) {
	        var element = callback(i, array[i]);

	        if (element) {
	            elements.push(element);
	        }
	    }

	    return elements;
	};

	/**
	 * Loops a given number of times, rendering elements for each pass
	 *
	 * @param {Number} iterations
	 * @param {Function} callback
	 *
	 * @returns {HTMLElement} elements
	 */
	FunctionTemplating.loop = function (iterations, callback) {
	    var elements = [];

	    for (var i = 0; i <= iterations; i++) {
	        var element = callback(i);

	        if (element) {
	            elements.push(element);
	        }
	    }

	    return elements;
	};

	/**
	 * A shorthand for document.querySelector
	 *
	 * @param {String} query
	 *
	 * @returns {HTMLElement} element
	 */
	FunctionTemplating.find = function (query) {
	    var element = document.querySelector(query);

	    if (element) {
	        if (typeof jQuery !== 'undefined') {
	            return $(element);
	        } else {
	            assignEvents(element);

	            return element;
	        }
	    }
	};

	/**
	 * A shorthand for document.querySelectorAll
	 *
	 * @param {String} query
	 *
	 * @returns {HTMLElement[]} element
	 */
	FunctionTemplating.findAll = function (query) {
	    var elements = document.querySelectorAll(query);

	    if (elements) {
	        if (typeof jQuery !== 'undefined') {
	            return $(elements);
	        } else {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var element = _step2.value;

	                    assignEvents(element);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            return elements;
	        }
	    }
	};

	// ----------
	// Init all element types
	// ----------
	var elementTypes = [
	// Block elements
	'div', 'section', 'nav', 'hr', 'label', 'textarea', 'audio', 'video', 'canvas', 'iframe',

	// Inline elements
	'img',

	// Table elements
	'table', 'thead', 'tbody', 'th', 'td', 'tr',

	// Select
	'select', 'option', 'optgroup', 'input',

	// Headings
	'h1', 'h2', 'h3', 'h4', 'h5', 'h6',

	// Body text
	'span', 'p', 'strong', 'b',

	// Action buttons
	'a', 'button',

	// SVG
	'polygon', 'svg',

	// List
	'ol', 'ul', 'li',

	// Forms
	'form', 'input'];

	for (var i in elementTypes) {
	    declareMethod(elementTypes[i]);
	}

	window._ = FunctionTemplating;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var elementTags = [
	// Block elements
	'div', 'section', 'nav', 'hr', 'label', 'textarea', 'audio', 'video', 'canvas', 'iframe',

	// Inline elements
	'img',

	// Table elements
	'table', 'thead', 'tbody', 'th', 'td', 'tr',

	// Select
	'select', 'option', 'input',

	// Headings
	'h1', 'h2', 'h3', 'h4', 'h5', 'h6',

	// Body text
	'span', 'p', 'strong', 'b',

	// Action buttons
	'a', 'button',

	// List
	'ol', 'ul', 'li',

	// Forms
	'form', 'input'];

	var ObjectTemplating = function () {
	    function ObjectTemplating(object) {
	        _classCallCheck(this, ObjectTemplating);

	        var template = this;
	        var $elements = [];

	        this.$elements = {};

	        function getTagName(key) {
	            for (var i in elementTags) {
	                var elementTagName = elementTags[i];

	                if (key.indexOf(elementTagName) == 0) {
	                    return elementTagName;
	                }
	            }

	            return null;
	        }

	        function createElement(tag) {
	            return $('<' + tag + '></' + tag + '>');
	        }

	        function parseObject(obj, $parentElement) {
	            if (typeof obj === 'string' && $parentElement) {
	                $parentElement.append(obj);
	            } else {
	                for (var k in obj) {
	                    var v = obj[k];

	                    // ----------
	                    // Function keywords
	                    // ----------
	                    // Each
	                    if (k == 'each') {
	                        if (Array.isArray(v)) {
	                            var array = v[0];
	                            var iterator = v[1];

	                            for (var i in array) {
	                                var newObject = iterator(i, array[i]);

	                                if (newObject) {
	                                    var $newElement = new ObjectTemplating(newObject);

	                                    if ($newElement) {
	                                        if ($parentElement) {
	                                            $parentElement.append($newElement);
	                                        } else {
	                                            $elements[$elements.length] = $newElement;
	                                        }
	                                    }
	                                }
	                            }
	                        } else {
	                            console.log('[Exomon] Usage of "each": Array([Array/Object], [Function]). Argument provided was of type "' + (typeof v === 'undefined' ? 'undefined' : _typeof(v)) + '"');
	                        }

	                        // Content / HTML
	                    } else if (k == 'content' || k == 'html') {
	                        if ($parentElement) {
	                            $parentElement.append(v);
	                        } else {
	                            $elements[$elements.length] = v;
	                        }

	                        // Events / on
	                    } else if (k == 'events' || k == 'on') {
	                        if ($parentElement) {
	                            for (var eventName in v) {
	                                $parentElement.on(eventName, v[eventName]);
	                            }
	                        }
	                    } else {
	                        // ----------
	                        // Create element
	                        // ----------
	                        var keyTagName = getTagName(k);

	                        if (keyTagName) {
	                            var _$newElement = createElement(keyTagName);
	                            var elementName = k.replace(keyTagName, '');

	                            if (elementName) {
	                                if (elementName[0] == '_') {
	                                    elementName = elementName.slice(1);
	                                }

	                                elementName = elementName.charAt(0).toLowerCase() + elementName.slice(1);

	                                template.$elements[elementName] = _$newElement;
	                            }

	                            parseObject(v, _$newElement);

	                            if ($parentElement) {
	                                $parentElement.append(_$newElement);
	                            } else {
	                                $elements[$elements.length] = _$newElement;
	                            }

	                            // ----------
	                            // Add attributes to parent element
	                            // ----------
	                        } else {
	                            if ($parentElement) {
	                                $parentElement.attr(k, v);
	                            }
	                        }
	                    }
	                }
	            }
	        }

	        parseObject(object);

	        if ($elements.length < 1) {
	            this.html = null;
	        } else if ($elements.length == 1) {
	            this.html = $elements[0];
	        } else {
	            this.html = $elements;
	        }
	    }

	    /**
	     * Returns the generated html
	     */


	    _createClass(ObjectTemplating, [{
	        key: 'html',
	        value: function html() {
	            return this.html;
	        }
	    }]);

	    return ObjectTemplating;
	}();

	module.exports = ObjectTemplating;

	window.Template = ObjectTemplating;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Generates a new GUID
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function guid() {
	    function s4() {
	        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	    }
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	var instances = [];

	/**
	 * Helper class for getting instances of Views
	 *
	 * @class ViewHelper
	 */

	var ViewHelper = function () {
	    function ViewHelper() {
	        _classCallCheck(this, ViewHelper);
	    }

	    _createClass(ViewHelper, null, [{
	        key: 'getAll',
	        value: function getAll(type) {
	            var results = [];

	            if (type) {
	                for (var i in instances) {
	                    var instance = instances[i];
	                    var name = instance.name;

	                    if (name == type) {
	                        results.push(instance);
	                    }
	                }
	            } else {
	                results = instances;
	            }

	            return results;
	        }
	    }, {
	        key: 'get',
	        value: function get(type) {
	            var results = ViewHelper.getAll(type);
	            var view = results.length > 0 ? results[0] : null;

	            return view;
	        }
	    }, {
	        key: 'clear',
	        value: function clear(type) {
	            for (var _guid in instances) {
	                var instance = instances[_guid];
	                var name = instance.constructor.name;

	                if (!type || name == type) {
	                    instance.remove();
	                }
	            }
	        }
	    }, {
	        key: 'removeAll',
	        value: function removeAll(type) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = ViewHelper.getAll(type)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var view = _step.value;

	                    view.remove();
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }]);

	    return ViewHelper;
	}();

	window.ViewHelper = ViewHelper;

	/**
	 * View class
	 *
	 * @class View
	 *
	 * @param {Object} params
	 */

	var View = function () {
	    function View(params) {
	        _classCallCheck(this, View);

	        this.name = this.constructor.name;
	        this.guid = guid();
	        this.events = {};

	        this.adopt(params);

	        instances[this.guid] = this;
	    }

	    /**
	     * Gets the name of this View
	     */


	    _createClass(View, [{
	        key: 'getName',
	        value: function getName() {
	            var name = this.constructor.toString();
	            name = name.substring('function '.length);
	            name = name.substring(0, name.indexOf('('));

	            return name;
	        }

	        /**
	         * Init
	         */

	    }, {
	        key: 'init',
	        value: function init() {
	            var _this = this;

	            this.prerender();
	            this.render();
	            this.postrender();

	            var element = this.element || this.$element[0];

	            element.addEventListener('DOMNodeRemovedFromDocument', function () {
	                // Wait a few cycles before removing, as the element might just have been relocated
	                setTimeout(function () {
	                    var element = _this.element || _this.$element[0];

	                    if (!element || !element.parentNode) {
	                        _this.remove();
	                    }
	                }, 10);
	            });

	            this.trigger('ready', this);
	            this.isReady = true;
	        }

	        /**
	         * Shorthand for .on('ready')
	         */

	    }, {
	        key: 'ready',
	        value: function ready(callback) {
	            if (this.isReady) {
	                callback(this);
	            } else {
	                this.on('ready', callback);
	            }
	        }

	        /**
	         * Adopts values
	         *
	         * @param {Object} values
	         */

	    }, {
	        key: 'adopt',
	        value: function adopt(params) {
	            for (var k in params) {
	                this[k] = params[k];
	            }

	            return this;
	        }

	        /**
	         * Runs before render
	         */

	    }, {
	        key: 'prerender',
	        value: function prerender() {}

	        /**
	         * Renders this view
	         */

	    }, {
	        key: 'render',
	        value: function render() {
	            var output = void 0;

	            if (typeof this.template === 'function') {
	                output = this.template.call(this, this);
	            }

	            if (output) {
	                // jQuery
	                if (typeof jQuery !== 'undefined') {
	                    if (this.$element) {
	                        this.$element.html(output.children());
	                    } else {
	                        this.$element = output;
	                    }

	                    // Native JavaScript
	                } else {
	                    if (this.element) {
	                        this.element.innerHTML = output.innerHTML;
	                    } else {
	                        this.element = output;
	                    }
	                }
	            }
	        }

	        /**
	         * Runs after render
	         */

	    }, {
	        key: 'postrender',
	        value: function postrender() {}

	        /**
	         * Removes the view from DOM and memory
	         */

	    }, {
	        key: 'remove',
	        value: function remove(timeout) {
	            var _this2 = this;

	            if (!this.destroyed) {
	                this.destroyed = true;

	                setTimeout(function () {
	                    _this2.trigger('remove');

	                    // jQuery
	                    if (typeof jQuery !== 'undefined' && _this2.$element && _this2.$element.length > 0) {
	                        _this2.$element.remove();

	                        // Native JavaScript
	                    } else if (_this2.element) {
	                        _this2.element.parentElement.removeChild(_this2.element);
	                    }

	                    delete instances[_this2.guid];
	                }, timeout || 0);
	            }
	        }

	        /**
	         * Call an event (for internal use)
	         */

	    }, {
	        key: 'call',
	        value: function call(callback, data, ui) {
	            callback(data, ui, this);
	        }

	        /**
	         * Trigger an event
	         */

	    }, {
	        key: 'trigger',
	        value: function trigger(e, obj) {
	            if (this.events[e]) {
	                if (typeof this.events[e] === 'function') {
	                    this.events[e](obj);
	                } else {
	                    for (var i in this.events[e]) {
	                        if (this.events[e][i]) {
	                            this.events[e][i](obj);
	                        }
	                    }
	                }
	            }
	        }

	        /**
	         * Bind an event
	         */

	    }, {
	        key: 'on',
	        value: function on(e, callback) {
	            var view = this;

	            // No events registered, register this as the only event
	            if (!this.events[e]) {
	                this.events[e] = function (data) {
	                    view.call(callback, data, this);
	                };

	                // Events have already been registered, add to callback array
	            } else {
	                // Only one event is registered, so convert from a single reference to an array
	                if (!this.events[e].length) {
	                    this.events[e] = [this.events[e]];
	                }

	                // Insert the event call into the array 
	                this.events[e].push(function (data) {
	                    view.call(callback, data, this);
	                });
	            }
	        }

	        /**
	         * Check if event exists
	         */

	    }, {
	        key: 'hasEvent',
	        value: function hasEvent(name) {
	            for (var k in this.events) {
	                if (k == name) {
	                    return true;
	                }
	            }

	            return false;
	        }

	        /**
	         * Fetch model data
	         */

	    }, {
	        key: 'fetch',
	        value: function fetch() {
	            var view = this;

	            function getModel() {
	                // Get model from URL
	                if (!view.model && typeof view.modelUrl === 'string') {
	                    var request = new XMLHttpRequest();
	                    request.open('GET', view.modelUrl, true);

	                    request.onload = function () {
	                        if (request.status >= 200 && request.status < 400) {
	                            // Success!
	                            var data = JSON.parse(request.responseText);

	                            view.model = data;

	                            view.init();
	                        } else {
	                            // We reached our target server, but it returned an error
	                            throw new Error('Couldn\'t fetch model data');
	                        }
	                    };

	                    request.onerror = function (e) {
	                        throw e;
	                    };

	                    request.send();

	                    // Get model with function
	                } else if (!view.model && typeof view.modelFunction === 'function') {
	                    view.modelFunction(function (data) {
	                        view.model = data;

	                        view.init();
	                    });

	                    // Just perform the initialisation
	                } else {
	                    view.init();
	                }
	            }

	            // Get the model
	            getModel();
	        }
	    }]);

	    return View;
	}();

	window.View = View;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ContextMenu = function (_View) {
	    _inherits(ContextMenu, _View);

	    function ContextMenu(params) {
	        _classCallCheck(this, ContextMenu);

	        // Recycle other context menus
	        var _this = _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call(this, params));

	        if ($('.context-menu').length > 0) {
	            _this.$element = $('.context-menu');
	        } else {
	            _this.$element = _.ul({ class: 'context-menu dropdown-menu', role: 'menu' });
	        }

	        _this.$element.css({
	            position: 'absolute',
	            'z-index': 1200,
	            top: _this.pos.y,
	            left: _this.pos.x,
	            display: 'block'
	        });

	        _this.fetch();
	        return _this;
	    }

	    _createClass(ContextMenu, [{
	        key: 'render',
	        value: function render() {
	            var view = this;

	            view.$element.html(_.each(view.model, function (label, func) {
	                if (func == '---') {
	                    return _.li({ class: 'dropdown-header' }, label);
	                } else {
	                    return _.li({ class: typeof func === 'function' ? '' : 'disabled' }, _.a({ tabindex: '-1', href: '#' }, label).click(function (e) {
	                        e.preventDefault();
	                        e.stopPropagation();

	                        if (func) {
	                            func(e);

	                            view.remove();
	                        }
	                    }));
	                }
	            }));

	            $('body').append(view.$element);
	        }
	    }]);

	    return ContextMenu;
	}(View);

	if (typeof jQuery !== 'undefined') {
	    jQuery.fn.extend({
	        exocontext: function exocontext(menuItems) {
	            return this.each(function () {
	                $(this).on('contextmenu', function (e) {
	                    if (e.ctrlKey) {
	                        return;
	                    }

	                    $('.context-menu-target-element').removeClass('context-menu-target-element');

	                    e.preventDefault();
	                    e.stopPropagation();

	                    if (e.which == 3) {
	                        $(this).toggleClass('context-menu-target-element', true);

	                        var menu = new ContextMenu({
	                            model: menuItems,
	                            pos: {
	                                x: e.pageX,
	                                y: e.pageY
	                            }
	                        });
	                    }
	                });
	            });
	        }
	    });

	    // Event handling
	    $('body').click(function (e) {
	        if ($(e.target).parents('.context-menu').length < 1) {
	            $('.context-menu-target-element').removeClass('context-menu-target-element');
	            ViewHelper.removeAll('ContextMenu');
	        }
	    });
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	// ----------
	// Event handlers
	// ----------

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function dragHandler(e) {
	    DragDrop.current.onDrag(e);
	}

	function releaseHandler(e) {
	    DragDrop.current.onReleaseDragHandle(e);
	}

	// ----------
	// Registered DragDrop instances
	// ----------
	var instances = [];

	/**
	 * An instance that allows for elements to be dragged and dropped, using pure JavaScript
	 */

	var DragDrop = function () {
	    _createClass(DragDrop, null, [{
	        key: 'getInstances',

	        /**
	         * Gets all instances
	         *
	         * @returns {Array} instances
	         */
	        value: function getInstances() {
	            return instances;
	        }

	        /**
	         * Destroys a DragDrop instance
	         *
	         * @param {HTMLelement} element
	         */

	    }, {
	        key: 'destroy',
	        value: function destroy(element) {
	            for (var i in instances) {
	                var _instance = instances[i];

	                if (_instance.element == element) {
	                    _instance.element.removeAttribute('data-dragdrop-enabled');
	                    _instance.removeListeners();
	                    instances.splice(i, 1);
	                    break;
	                }
	            }
	        }

	        /**
	         * Checks whether 2 rects intersect
	         *
	         * @param {Rect} r1
	         * @param {Rect} r2
	         *
	         * @returns {Boolean} intersects
	         */

	    }, {
	        key: 'intersectsRect',
	        value: function intersectsRect(r1, r2) {
	            return r1.left < r2.right && r1.right > r2.left && r1.top < r2.bottom && r1.bottom > r2.top;
	        }

	        /**
	         * Gets elements stack by position
	         *
	         * @param {Number} x
	         * @param {Number} y
	         *
	         * @returns {Array} stack
	         */

	    }, {
	        key: 'getElementStack',
	        value: function getElementStack(x, y) {
	            var stack = [];
	            var el = document.elementFromPoint(x, y);
	            var handbrake = 0;

	            while (el && el != document.body && handbrake < 20) {
	                stack[stack.length] = el;
	                el.style.display = 'none';
	                handbrake++;

	                el = document.elementFromPoint(x, y);
	            }

	            for (var i in stack) {
	                stack[i].style.display = null;
	            }

	            return stack;
	        }

	        /**
	         * Sorts an array on elements by z proximity to the cursor
	         *
	         * @param {Array} elements
	         * @param {Number} x
	         * @paraa {Number} y
	         *
	         * @return {Array} ranking
	         */

	    }, {
	        key: 'sortByZProximity',
	        value: function sortByZProximity(elements, x, y) {
	            if (!elements) {
	                throw new Error('sortByZProximity: Elements array is null');
	            }

	            if (elements instanceof NodeList) {
	                throw new Error('sortByZProximity: Elements array is a NodeList');
	            }

	            var result = [];
	            var stack = DragDrop.getElementStack(x, y);

	            for (var i in stack) {
	                if (elements.indexOf(stack[i]) > -1) {
	                    result[result.length] = stack[i];
	                }
	            }

	            return result;
	        }

	        /**
	         * Constructs a new instance
	         *
	         * @param {HTMLElement} element
	         * @param {Object} config
	         */

	    }]);

	    function DragDrop(element, config) {
	        _classCallCheck(this, DragDrop);

	        var instance = this;

	        // Register this instance
	        instances.push(instance);

	        // Init element
	        this.element = element;
	        this.element.setAttribute('data-dragdrop-enabled', 'true');

	        // Init listener array
	        this.listeners = [];

	        // Adopt config
	        config = config || {};

	        this.config = {
	            dragThreshold: 2,
	            dragScrollSpeed: 5,
	            dropContainerSelector: '',
	            dropContainers: [],
	            lockY: false,
	            lockX: false,
	            onDrag: function onDrag() {},
	            onBeginDrag: function onBeginDrag() {},
	            onEndDrag: function onEndDrag() {}
	        };

	        for (var k in config) {
	            this.config[k] = config[k];
	        }

	        // Detect initial click
	        function downHandler(mousedownEvent) {
	            mousedownEvent.stopPropagation();

	            if (mousedownEvent.which == 1) {
	                (function () {

	                    // Detect initial move
	                    var moveHandler = function moveHandler(mousemoveEvent) {
	                        dragFrames++;

	                        if (dragFrames >= instance.config.dragThreshold) {
	                            instance.onMoveDragHandle(mousemoveEvent);

	                            instance.off(instance.element, 'mousemove', moveHandler);
	                            instance.off(document, 'mouseup', upHandler);
	                        }
	                    };

	                    // Detect immediate pointer release


	                    var upHandler = function upHandler(upEvent) {
	                        instance.off(instance.element, 'mousemove', moveHandler);
	                        instance.off(document, 'mouseup', upHandler);
	                    };

	                    mousedownEvent.preventDefault();

	                    var dragFrames = 0;

	                    instance.on(instance.element, 'mousemove', moveHandler);
	                    instance.on(document, 'mouseup', upHandler);
	                })();
	            }
	        }

	        // Add pointer event
	        this.on(this.element, 'mousedown', downHandler);
	    }

	    /**
	     * Register listener
	     *
	     * @param {HTMLElement} element
	     * @param {String} event
	     * @param {Function} handler
	     */


	    _createClass(DragDrop, [{
	        key: 'on',
	        value: function on(element, event, handler) {
	            element.addEventListener(event, handler);

	            this.listeners.push({
	                element: element,
	                event: event,
	                handler: handler
	            });
	        }

	        /**
	         * Unregister listener
	         *
	         * @param {HTMLElement} element
	         * @param {String} event
	         * @param {Function} handler
	         */

	    }, {
	        key: 'off',
	        value: function off(element, event, handler) {
	            element.removeEventListener(event, handler);

	            for (var i in this.listeners) {
	                var listener = this.listeners[i];

	                if (listener.element == element && listener.event == event && listener.handler == handler) {
	                    this.listeners.splice(i, 1);
	                    break;
	                }
	            }
	        }

	        /**
	         * Removes all event listeners
	         */

	    }, {
	        key: 'removeListeners',
	        value: function removeListeners() {
	            for (var i in this.listeners) {
	                var listener = this.listeners[i];

	                listener.element.removeEventListener(listener.event, listener.handler);
	            }

	            this.listeners = [];
	        }

	        /**
	         * Gets all drop containers
	         *
	         * @returns {Array} containers
	         */

	    }, {
	        key: 'updateDropContainers',
	        value: function updateDropContainers() {
	            var _this = this;

	            DragDrop.currentDropContainers = [];

	            // An array of elements are specified
	            if (this.config.dropContainers && this.config.dropContainers.length > 0) {
	                DragDrop.currentDropContainers = this.config.dropContainers;

	                // A selector is specified
	            } else if (this.config.dropContainerSelector) {
	                DragDrop.currentDropContainers = document.querySelectorAll(this.config.dropContainerSelector);

	                // Nothing was specified, use immediate parent
	            } else {
	                DragDrop.currentDropContainers = [this.element.parentElement];
	            }

	            // Convert NodeList to Array
	            if (DragDrop.currentDropContainers instanceof NodeList) {
	                var array = [];
	                var nodeList = DragDrop.currentDropContainers;

	                for (var i = nodeList.length; i--; array.unshift(nodeList[i])) {}

	                DragDrop.currentDropContainers = array;
	            }

	            // If the element itself was found, filter it out
	            DragDrop.currentDropContainers = DragDrop.currentDropContainers.filter(function (dropContainer) {
	                var isSelf = dropContainer == _this.element || dropContainer.parentElement == _this.element;

	                if (isSelf) {
	                    return false;
	                } else {
	                    dropContainer.dataset.dragdropDropContainer = true;
	                    return true;
	                }
	            });
	        }

	        /**
	         * Event: Move drag handle
	         *
	         * @param {Event} e
	         */

	    }, {
	        key: 'onMoveDragHandle',
	        value: function onMoveDragHandle(e) {
	            e.preventDefault();
	            e.stopPropagation();

	            DragDrop.current = this;

	            // Prevent overlapping mouse interaction on body
	            document.body.style.userSelect = 'none';
	            document.body.style.pointerAction = 'none';

	            // Find parent element with position set to anything but static
	            var positionParent = this.element.parentElement;

	            while (window.getComputedStyle(positionParent).position == 'static' && positionParent != document.body) {
	                positionParent = positionParent.parentElement;
	            }

	            // Get rects of element and position parent
	            var positionParentRect = positionParent.getBoundingClientRect();
	            var elementRect = this.element.getBoundingClientRect();

	            // Calculate element offset
	            var elementOffset = {
	                top: elementRect.top - positionParentRect.top,
	                left: elementRect.left - positionParentRect.left
	            };

	            // Get computed style
	            var computedStyle = window.getComputedStyle(this.element);

	            // Calculate pointer offset
	            var pointerOffset = {
	                top: elementOffset.top - e.pageY,
	                left: elementOffset.left - e.pageX
	            };

	            // Cache the pointer offset
	            this.pointerOffset = pointerOffset;

	            // Cache the previous parent element
	            this.previousParent = this.element.parentElement;

	            // Set temporary styling
	            this.element.style.position = 'absolute';
	            this.element.style.top = elementOffset.top;
	            this.element.style.left = elementOffset.left;
	            this.element.style.width = elementRect.width;
	            this.element.style.height = elementRect.height;
	            this.element.style.zIndex = 999;

	            // Cache drop containers
	            this.updateDropContainers();

	            // Insert placeholder
	            var placeholder = document.createElement('DIV');

	            placeholder.id = 'dragdrop-placeholder';
	            placeholder.style.height = computedStyle.height;
	            placeholder.style.width = computedStyle.width;

	            this.element.parentElement.insertBefore(placeholder, this.element);

	            // Add pointer movement logic
	            this.on(document, 'mousemove', dragHandler);

	            // Add pointer release logic
	            this.on(document, 'mouseup', releaseHandler);

	            // Fire begin drag event
	            if (typeof this.config.onBeginDrag === 'function') {
	                this.config.onBeginDrag(this);
	            }
	        }

	        /**
	         * Event: On drag
	         *
	         * @param {Event} e
	         */

	    }, {
	        key: 'onDrag',
	        value: function onDrag(e) {
	            e.preventDefault();
	            e.stopPropagation();

	            // Apply new styling to element
	            if (!this.config.lockY) {
	                this.element.style.top = e.pageY + this.pointerOffset.top;
	            }

	            if (!this.config.lockX) {
	                this.element.style.left = e.pageX + this.pointerOffset.left;
	            }

	            // Calculate viewport
	            var viewport = {
	                x: document.scrollLeft,
	                y: document.scrollTop,
	                w: window.width,
	                h: window.height
	            };

	            // Scroll page if dragging near the top or bottom
	            // TODO: Implement for sides too
	            if (e.pageY > viewport.y + viewport.h - 100) {
	                //   scroll(1 * this.dragScrollSpeed);

	            } else if (e.pageY < viewport.y + 100) {}
	            //  scroll(-1 * this.dragScrollSpeed);

	            // Fire drag event
	            if (typeof this.config.onDrag === 'function') {
	                this.config.onDrag(this);
	            }

	            // Scan for drop containers
	            var elementRect = this.element.getBoundingClientRect();

	            elementRect.center = elementRect.left + elementRect.width / 2;
	            elementRect.middle = elementRect.top + elementRect.height / 2;

	            // Use array of drop containers sorted by their "proximity" to the pointer on the Z axis
	            var hoveredDropContainers = DragDrop.sortByZProximity(DragDrop.currentDropContainers, elementRect.center, elementRect.middle);
	            var foundDropContainer = void 0;

	            // We only need the first index, as that is the closest to the cursor
	            if (hoveredDropContainers.length > 0) {
	                foundDropContainer = hoveredDropContainers[0];

	                this.onHoverDropContainer(foundDropContainer);
	            }

	            // Make sure to trigger the leave event on any other drop containers, if they were previously hovered
	            for (var i = 0; i < DragDrop.currentDropContainers.length; i++) {
	                var dropContainer = DragDrop.currentDropContainers[i];

	                if (dropContainer != foundDropContainer && dropContainer.dataset.dragdropHovering) {
	                    this.onLeaveDropContainer(dropContainer, e);
	                }
	            }
	        }

	        /**
	         * Event: On release drag handle
	         *
	         * @param {Event} e
	         */

	    }, {
	        key: 'onReleaseDragHandle',
	        value: function onReleaseDragHandle(e) {
	            e.preventDefault();
	            e.stopPropagation();

	            DragDrop.current = null;

	            // Remove pointer events
	            this.off(document, 'mousemove', dragHandler);
	            this.off(document, 'mouseup', releaseHandler);

	            // Grab hovered drop container
	            var hoveredDropContainer = document.querySelector('*[data-dragdrop-drop-container="true"][data-dragdrop-hovering="true"]');

	            // Remove drop container events
	            for (var i = 0; i < DragDrop.currentDropContainers.length; i++) {
	                var dropContainer = DragDrop.currentDropContainers[i];

	                delete dropContainer.dataset.dragdropDropContainer;
	                delete dropContainer.dataset.dragdropHovering;
	            }

	            // Get placeholder
	            var placeholder = document.getElementById('dragdrop-placeholder');

	            // Set new parent
	            // NOTE: Somehow this can delete the inner HTML of an element. Why?
	            placeholder.parentElement.insertBefore(this.element, placeholder);

	            // Remove placeholder
	            placeholder.parentElement.removeChild(placeholder);

	            // Remove temporary styling
	            document.body.removeAttribute('style');
	            this.element.removeAttribute('style');

	            // Add back the grab cursor style
	            this.element.style.cursor = 'grab';

	            // Remove cached variables
	            this.pointerOffset = null;
	            this.previousParent = null;
	            this.dragHandler = null;

	            // Fire end drag event
	            if (typeof this.config.onEndDrag === 'function') {
	                this.config.onEndDrag(this, hoveredDropContainer);
	            }
	        }

	        /**
	         * Event: Hover drop container
	         *
	         * @param {HTMLElement} dropContainer
	         * @param {Event} e
	         */

	    }, {
	        key: 'onHoverDropContainer',
	        value: function onHoverDropContainer(dropContainer, e) {
	            dropContainer.dataset.dragdropHovering = true;

	            var elementRect = this.element.getBoundingClientRect();
	            var placeholder = document.getElementById('dragdrop-placeholder');
	            var childNodes = dropContainer.querySelectorAll('*[data-dragdrop-enabled="true"]');

	            if (dropContainer.dataset.dragdropUnsorted) {
	                // Do nothing so far

	            } else if (childNodes.length < 1) {
	                dropContainer.appendChild(placeholder);
	            } else {
	                for (var i = 0; i < childNodes.length; i++) {
	                    var child = childNodes[i];
	                    var childRect = child.getBoundingClientRect();

	                    // If we're dropping onto a new parent drop container,
	                    // set pointer events of children to none,
	                    // so they don't interfere with drop container selection
	                    if (dropContainer != this.previousParent) {
	                        child.style.pointerEvents = 'none';
	                    }

	                    childRect.center = childRect.left + childRect.width / 2;
	                    childRect.middle = childRect.top + childRect.height / 2;

	                    if (this.config.lockX) {
	                        if (elementRect.top > childRect.top && elementRect.top < childRect.bottom) {
	                            child.parentElement.insertBefore(placeholder, child.nextSibling);
	                            break;
	                        } else if (elementRect.top < childRect.top && elementRect.bottom > childRect.top) {
	                            child.parentElement.insertBefore(placeholder, child);
	                            break;
	                        }
	                    } else if (this.config.lockY) {
	                        if (elementRect.left > childRect.left && elementRect.left < childRect.right) {
	                            child.parentElement.insertBefore(placeholder, child.nextSibling);
	                            break;
	                        } else if (elementRect.left < childRect.left && elementRect.right > childRect.left) {
	                            child.parentElement.insertBefore(placeholder, child);
	                            break;
	                        }
	                    } else {
	                        if (DragDrop.intersectsRect(elementRect, childRect) && child.nextSibling) {
	                            child.parentElement.insertBefore(placeholder, child.nextSibling);
	                            break;
	                        }
	                    }
	                }
	            }
	        }

	        /**
	         * Event: Leave drop container
	         *
	         * @param {HTMLElement} dropContainer
	         * @param {Event} e
	         */

	    }, {
	        key: 'onLeaveDropContainer',
	        value: function onLeaveDropContainer(dropContainer, e) {
	            dropContainer.removeAttribute('data-dragdrop-hovering');

	            var childNodes = dropContainer.querySelectorAll('*[data-dragdrop-enabled="true"]');

	            for (var i = 0; i < childNodes.length; i++) {
	                var child = childNodes[i];

	                //  Remove custom pointer events style
	                child.style.pointerEvents = null;
	            }
	        }
	    }]);

	    return DragDrop;
	}();

	window.DragDrop = DragDrop;

	if (typeof jQuery !== 'undefined') {
	    jQuery.fn.extend({
	        exodragdrop: function exodragdrop(config) {
	            return this.each(function () {
	                if (config == 'destroy') {
	                    DragDrop.destroy(this);
	                } else {
	                    new DragDrop(this, config);
	                }
	            });
	        }
	    });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/* @preserve
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2013-2015 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 *//**
	 * bluebird build version 3.4.6
	 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
	*/!function(e){if("object"==( false?"undefined":_typeof(exports))&&"undefined"!=typeof module)module.exports=e();else if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e();}}(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise){var SomePromiseArray=Promise._SomePromiseArray;function any(promises){var ret=new SomePromiseArray(promises);var promise=ret.promise();ret.setHowMany(1);ret.setUnwrap();ret.init();return promise;}Promise.any=function(promises){return any(promises);};Promise.prototype.any=function(){return any(this);};};},{}],2:[function(_dereq_,module,exports){"use strict";var firstLineError;try{throw new Error();}catch(e){firstLineError=e;}var schedule=_dereq_("./schedule");var Queue=_dereq_("./queue");var util=_dereq_("./util");function Async(){this._customScheduler=false;this._isTickUsed=false;this._lateQueue=new Queue(16);this._normalQueue=new Queue(16);this._haveDrainedQueues=false;this._trampolineEnabled=true;var self=this;this.drainQueues=function(){self._drainQueues();};this._schedule=schedule;}Async.prototype.setScheduler=function(fn){var prev=this._schedule;this._schedule=fn;this._customScheduler=true;return prev;};Async.prototype.hasCustomScheduler=function(){return this._customScheduler;};Async.prototype.enableTrampoline=function(){this._trampolineEnabled=true;};Async.prototype.disableTrampolineIfNecessary=function(){if(util.hasDevTools){this._trampolineEnabled=false;}};Async.prototype.haveItemsQueued=function(){return this._isTickUsed||this._haveDrainedQueues;};Async.prototype.fatalError=function(e,isNode){if(isNode){process.stderr.write("Fatal "+(e instanceof Error?e.stack:e)+"\n");process.exit(2);}else{this.throwLater(e);}};Async.prototype.throwLater=function(fn,arg){if(arguments.length===1){arg=fn;fn=function fn(){throw arg;};}if(typeof setTimeout!=="undefined"){setTimeout(function(){fn(arg);},0);}else try{this._schedule(function(){fn(arg);});}catch(e){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");}};function AsyncInvokeLater(fn,receiver,arg){this._lateQueue.push(fn,receiver,arg);this._queueTick();}function AsyncInvoke(fn,receiver,arg){this._normalQueue.push(fn,receiver,arg);this._queueTick();}function AsyncSettlePromises(promise){this._normalQueue._pushOne(promise);this._queueTick();}if(!util.hasDevTools){Async.prototype.invokeLater=AsyncInvokeLater;Async.prototype.invoke=AsyncInvoke;Async.prototype.settlePromises=AsyncSettlePromises;}else{Async.prototype.invokeLater=function(fn,receiver,arg){if(this._trampolineEnabled){AsyncInvokeLater.call(this,fn,receiver,arg);}else{this._schedule(function(){setTimeout(function(){fn.call(receiver,arg);},100);});}};Async.prototype.invoke=function(fn,receiver,arg){if(this._trampolineEnabled){AsyncInvoke.call(this,fn,receiver,arg);}else{this._schedule(function(){fn.call(receiver,arg);});}};Async.prototype.settlePromises=function(promise){if(this._trampolineEnabled){AsyncSettlePromises.call(this,promise);}else{this._schedule(function(){promise._settlePromises();});}};}Async.prototype.invokeFirst=function(fn,receiver,arg){this._normalQueue.unshift(fn,receiver,arg);this._queueTick();};Async.prototype._drainQueue=function(queue){while(queue.length()>0){var fn=queue.shift();if(typeof fn!=="function"){fn._settlePromises();continue;}var receiver=queue.shift();var arg=queue.shift();fn.call(receiver,arg);}};Async.prototype._drainQueues=function(){this._drainQueue(this._normalQueue);this._reset();this._haveDrainedQueues=true;this._drainQueue(this._lateQueue);};Async.prototype._queueTick=function(){if(!this._isTickUsed){this._isTickUsed=true;this._schedule(this.drainQueues);}};Async.prototype._reset=function(){this._isTickUsed=false;};module.exports=Async;module.exports.firstLineError=firstLineError;},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL,tryConvertToPromise,debug){var calledBind=false;var rejectThis=function rejectThis(_,e){this._reject(e);};var targetRejected=function targetRejected(e,context){context.promiseRejectionQueued=true;context.bindingPromise._then(rejectThis,rejectThis,null,this,e);};var bindingResolved=function bindingResolved(thisArg,context){if((this._bitField&50397184)===0){this._resolveCallback(context.target);}};var bindingRejected=function bindingRejected(e,context){if(!context.promiseRejectionQueued)this._reject(e);};Promise.prototype.bind=function(thisArg){if(!calledBind){calledBind=true;Promise.prototype._propagateFrom=debug.propagateFromFunction();Promise.prototype._boundValue=debug.boundValueFunction();}var maybePromise=tryConvertToPromise(thisArg);var ret=new Promise(INTERNAL);ret._propagateFrom(this,1);var target=this._target();ret._setBoundTo(maybePromise);if(maybePromise instanceof Promise){var context={promiseRejectionQueued:false,promise:ret,target:target,bindingPromise:maybePromise};target._then(INTERNAL,targetRejected,undefined,ret,context);maybePromise._then(bindingResolved,bindingRejected,undefined,ret,context);ret._setOnCancel(maybePromise);}else{ret._resolveCallback(target);}return ret;};Promise.prototype._setBoundTo=function(obj){if(obj!==undefined){this._bitField=this._bitField|2097152;this._boundTo=obj;}else{this._bitField=this._bitField&~2097152;}};Promise.prototype._isBound=function(){return(this._bitField&2097152)===2097152;};Promise.bind=function(thisArg,value){return Promise.resolve(value).bind(thisArg);};};},{}],4:[function(_dereq_,module,exports){"use strict";var old;if(typeof Promise!=="undefined")old=Promise;function noConflict(){try{if(Promise===bluebird)Promise=old;}catch(e){}return bluebird;}var bluebird=_dereq_("./promise")();bluebird.noConflict=noConflict;module.exports=bluebird;},{"./promise":22}],5:[function(_dereq_,module,exports){"use strict";var cr=Object.create;if(cr){var callerCache=cr(null);var getterCache=cr(null);callerCache[" size"]=getterCache[" size"]=0;}module.exports=function(Promise){var util=_dereq_("./util");var canEvaluate=util.canEvaluate;var isIdentifier=util.isIdentifier;var getMethodCaller;var getGetter;if(false){var makeMethodCaller=function makeMethodCaller(methodName){return new Function("ensureMethod","                                    \n\
	        return function(obj) {                                               \n\
	            'use strict'                                                     \n\
	            var len = this.length;                                           \n\
	            ensureMethod(obj, 'methodName');                                 \n\
	            switch(len) {                                                    \n\
	                case 1: return obj.methodName(this[0]);                      \n\
	                case 2: return obj.methodName(this[0], this[1]);             \n\
	                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
	                case 0: return obj.methodName();                             \n\
	                default:                                                     \n\
	                    return obj.methodName.apply(obj, this);                  \n\
	            }                                                                \n\
	        };                                                                   \n\
	        ".replace(/methodName/g,methodName))(ensureMethod);};var makeGetter=function makeGetter(propertyName){return new Function("obj","                                             \n\
	        'use strict';                                                        \n\
	        return obj.propertyName;                                             \n\
	        ".replace("propertyName",propertyName));};var getCompiled=function getCompiled(name,compiler,cache){var ret=cache[name];if(typeof ret!=="function"){if(!isIdentifier(name)){return null;}ret=compiler(name);cache[name]=ret;cache[" size"]++;if(cache[" size"]>512){var keys=Object.keys(cache);for(var i=0;i<256;++i){delete cache[keys[i]];}cache[" size"]=keys.length-256;}}return ret;};getMethodCaller=function getMethodCaller(name){return getCompiled(name,makeMethodCaller,callerCache);};getGetter=function getGetter(name){return getCompiled(name,makeGetter,getterCache);};}function ensureMethod(obj,methodName){var fn;if(obj!=null)fn=obj[methodName];if(typeof fn!=="function"){var message="Object "+util.classString(obj)+" has no method '"+util.toString(methodName)+"'";throw new Promise.TypeError(message);}return fn;}function caller(obj){var methodName=this.pop();var fn=ensureMethod(obj,methodName);return fn.apply(obj,this);}Promise.prototype.call=function(methodName){var args=[].slice.call(arguments,1);;if(false){if(canEvaluate){var maybeCaller=getMethodCaller(methodName);if(maybeCaller!==null){return this._then(maybeCaller,undefined,undefined,args,undefined);}}}args.push(methodName);return this._then(caller,undefined,undefined,args,undefined);};function namedGetter(obj){return obj[this];}function indexedGetter(obj){var index=+this;if(index<0)index=Math.max(0,index+obj.length);return obj[index];}Promise.prototype.get=function(propertyName){var isIndex=typeof propertyName==="number";var getter;if(!isIndex){if(canEvaluate){var maybeGetter=getGetter(propertyName);getter=maybeGetter!==null?maybeGetter:namedGetter;}else{getter=namedGetter;}}else{getter=indexedGetter;}return this._then(getter,undefined,undefined,propertyName,undefined);};};},{"./util":36}],6:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,apiRejection,debug){var util=_dereq_("./util");var tryCatch=util.tryCatch;var errorObj=util.errorObj;var async=Promise._async;Promise.prototype["break"]=Promise.prototype.cancel=function(){if(!debug.cancellation())return this._warn("cancellation is disabled");var promise=this;var child=promise;while(promise._isCancellable()){if(!promise._cancelBy(child)){if(child._isFollowing()){child._followee().cancel();}else{child._cancelBranched();}break;}var parent=promise._cancellationParent;if(parent==null||!parent._isCancellable()){if(promise._isFollowing()){promise._followee().cancel();}else{promise._cancelBranched();}break;}else{if(promise._isFollowing())promise._followee().cancel();promise._setWillBeCancelled();child=promise;promise=parent;}}};Promise.prototype._branchHasCancelled=function(){this._branchesRemainingToCancel--;};Promise.prototype._enoughBranchesHaveCancelled=function(){return this._branchesRemainingToCancel===undefined||this._branchesRemainingToCancel<=0;};Promise.prototype._cancelBy=function(canceller){if(canceller===this){this._branchesRemainingToCancel=0;this._invokeOnCancel();return true;}else{this._branchHasCancelled();if(this._enoughBranchesHaveCancelled()){this._invokeOnCancel();return true;}}return false;};Promise.prototype._cancelBranched=function(){if(this._enoughBranchesHaveCancelled()){this._cancel();}};Promise.prototype._cancel=function(){if(!this._isCancellable())return;this._setCancelled();async.invoke(this._cancelPromises,this,undefined);};Promise.prototype._cancelPromises=function(){if(this._length()>0)this._settlePromises();};Promise.prototype._unsetOnCancel=function(){this._onCancelField=undefined;};Promise.prototype._isCancellable=function(){return this.isPending()&&!this._isCancelled();};Promise.prototype.isCancellable=function(){return this.isPending()&&!this.isCancelled();};Promise.prototype._doInvokeOnCancel=function(onCancelCallback,internalOnly){if(util.isArray(onCancelCallback)){for(var i=0;i<onCancelCallback.length;++i){this._doInvokeOnCancel(onCancelCallback[i],internalOnly);}}else if(onCancelCallback!==undefined){if(typeof onCancelCallback==="function"){if(!internalOnly){var e=tryCatch(onCancelCallback).call(this._boundValue());if(e===errorObj){this._attachExtraTrace(e.e);async.throwLater(e.e);}}}else{onCancelCallback._resultCancelled(this);}}};Promise.prototype._invokeOnCancel=function(){var onCancelCallback=this._onCancel();this._unsetOnCancel();async.invoke(this._doInvokeOnCancel,this,onCancelCallback);};Promise.prototype._invokeInternalOnCancel=function(){if(this._isCancellable()){this._doInvokeOnCancel(this._onCancel(),true);this._unsetOnCancel();}};Promise.prototype._resultCancelled=function(){this.cancel();};};},{"./util":36}],7:[function(_dereq_,module,exports){"use strict";module.exports=function(NEXT_FILTER){var util=_dereq_("./util");var getKeys=_dereq_("./es5").keys;var tryCatch=util.tryCatch;var errorObj=util.errorObj;function catchFilter(instances,cb,promise){return function(e){var boundTo=promise._boundValue();predicateLoop:for(var i=0;i<instances.length;++i){var item=instances[i];if(item===Error||item!=null&&item.prototype instanceof Error){if(e instanceof item){return tryCatch(cb).call(boundTo,e);}}else if(typeof item==="function"){var matchesPredicate=tryCatch(item).call(boundTo,e);if(matchesPredicate===errorObj){return matchesPredicate;}else if(matchesPredicate){return tryCatch(cb).call(boundTo,e);}}else if(util.isObject(e)){var keys=getKeys(item);for(var j=0;j<keys.length;++j){var key=keys[j];if(item[key]!=e[key]){continue predicateLoop;}}return tryCatch(cb).call(boundTo,e);}}return NEXT_FILTER;};}return catchFilter;};},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise){var longStackTraces=false;var contextStack=[];Promise.prototype._promiseCreated=function(){};Promise.prototype._pushContext=function(){};Promise.prototype._popContext=function(){return null;};Promise._peekContext=Promise.prototype._peekContext=function(){};function Context(){this._trace=new Context.CapturedTrace(peekContext());}Context.prototype._pushContext=function(){if(this._trace!==undefined){this._trace._promiseCreated=null;contextStack.push(this._trace);}};Context.prototype._popContext=function(){if(this._trace!==undefined){var trace=contextStack.pop();var ret=trace._promiseCreated;trace._promiseCreated=null;return ret;}return null;};function createContext(){if(longStackTraces)return new Context();}function peekContext(){var lastIndex=contextStack.length-1;if(lastIndex>=0){return contextStack[lastIndex];}return undefined;}Context.CapturedTrace=null;Context.create=createContext;Context.deactivateLongStackTraces=function(){};Context.activateLongStackTraces=function(){var Promise_pushContext=Promise.prototype._pushContext;var Promise_popContext=Promise.prototype._popContext;var Promise_PeekContext=Promise._peekContext;var Promise_peekContext=Promise.prototype._peekContext;var Promise_promiseCreated=Promise.prototype._promiseCreated;Context.deactivateLongStackTraces=function(){Promise.prototype._pushContext=Promise_pushContext;Promise.prototype._popContext=Promise_popContext;Promise._peekContext=Promise_PeekContext;Promise.prototype._peekContext=Promise_peekContext;Promise.prototype._promiseCreated=Promise_promiseCreated;longStackTraces=false;};longStackTraces=true;Promise.prototype._pushContext=Context.prototype._pushContext;Promise.prototype._popContext=Context.prototype._popContext;Promise._peekContext=Promise.prototype._peekContext=peekContext;Promise.prototype._promiseCreated=function(){var ctx=this._peekContext();if(ctx&&ctx._promiseCreated==null)ctx._promiseCreated=this;};};return Context;};},{}],9:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,Context){var getDomain=Promise._getDomain;var async=Promise._async;var Warning=_dereq_("./errors").Warning;var util=_dereq_("./util");var canAttachTrace=util.canAttachTrace;var unhandledRejectionHandled;var possiblyUnhandledRejection;var bluebirdFramePattern=/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;var nodeFramePattern=/\((?:timers\.js):\d+:\d+\)/;var parseLinePattern=/[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;var stackFramePattern=null;var formatStack=null;var indentStackFrames=false;var printWarning;var debugging=!!(util.env("BLUEBIRD_DEBUG")!=0&&(true||util.env("BLUEBIRD_DEBUG")||util.env("NODE_ENV")==="development"));var warnings=!!(util.env("BLUEBIRD_WARNINGS")!=0&&(debugging||util.env("BLUEBIRD_WARNINGS")));var longStackTraces=!!(util.env("BLUEBIRD_LONG_STACK_TRACES")!=0&&(debugging||util.env("BLUEBIRD_LONG_STACK_TRACES")));var wForgottenReturn=util.env("BLUEBIRD_W_FORGOTTEN_RETURN")!=0&&(warnings||!!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));Promise.prototype.suppressUnhandledRejections=function(){var target=this._target();target._bitField=target._bitField&~1048576|524288;};Promise.prototype._ensurePossibleRejectionHandled=function(){if((this._bitField&524288)!==0)return;this._setRejectionIsUnhandled();async.invokeLater(this._notifyUnhandledRejection,this,undefined);};Promise.prototype._notifyUnhandledRejectionIsHandled=function(){fireRejectionEvent("rejectionHandled",unhandledRejectionHandled,undefined,this);};Promise.prototype._setReturnedNonUndefined=function(){this._bitField=this._bitField|268435456;};Promise.prototype._returnedNonUndefined=function(){return(this._bitField&268435456)!==0;};Promise.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var reason=this._settledValue();this._setUnhandledRejectionIsNotified();fireRejectionEvent("unhandledRejection",possiblyUnhandledRejection,reason,this);}};Promise.prototype._setUnhandledRejectionIsNotified=function(){this._bitField=this._bitField|262144;};Promise.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField=this._bitField&~262144;};Promise.prototype._isUnhandledRejectionNotified=function(){return(this._bitField&262144)>0;};Promise.prototype._setRejectionIsUnhandled=function(){this._bitField=this._bitField|1048576;};Promise.prototype._unsetRejectionIsUnhandled=function(){this._bitField=this._bitField&~1048576;if(this._isUnhandledRejectionNotified()){this._unsetUnhandledRejectionIsNotified();this._notifyUnhandledRejectionIsHandled();}};Promise.prototype._isRejectionUnhandled=function(){return(this._bitField&1048576)>0;};Promise.prototype._warn=function(message,shouldUseOwnTrace,promise){return warn(message,shouldUseOwnTrace,promise||this);};Promise.onPossiblyUnhandledRejection=function(fn){var domain=getDomain();possiblyUnhandledRejection=typeof fn==="function"?domain===null?fn:util.domainBind(domain,fn):undefined;};Promise.onUnhandledRejectionHandled=function(fn){var domain=getDomain();unhandledRejectionHandled=typeof fn==="function"?domain===null?fn:util.domainBind(domain,fn):undefined;};var disableLongStackTraces=function disableLongStackTraces(){};Promise.longStackTraces=function(){if(async.haveItemsQueued()&&!config.longStackTraces){throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");}if(!config.longStackTraces&&longStackTracesIsSupported()){var Promise_captureStackTrace=Promise.prototype._captureStackTrace;var Promise_attachExtraTrace=Promise.prototype._attachExtraTrace;config.longStackTraces=true;disableLongStackTraces=function disableLongStackTraces(){if(async.haveItemsQueued()&&!config.longStackTraces){throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");}Promise.prototype._captureStackTrace=Promise_captureStackTrace;Promise.prototype._attachExtraTrace=Promise_attachExtraTrace;Context.deactivateLongStackTraces();async.enableTrampoline();config.longStackTraces=false;};Promise.prototype._captureStackTrace=longStackTracesCaptureStackTrace;Promise.prototype._attachExtraTrace=longStackTracesAttachExtraTrace;Context.activateLongStackTraces();async.disableTrampolineIfNecessary();}};Promise.hasLongStackTraces=function(){return config.longStackTraces&&longStackTracesIsSupported();};var fireDomEvent=function(){try{if(typeof CustomEvent==="function"){var event=new CustomEvent("CustomEvent");util.global.dispatchEvent(event);return function(name,event){var domEvent=new CustomEvent(name.toLowerCase(),{detail:event,cancelable:true});return!util.global.dispatchEvent(domEvent);};}else if(typeof Event==="function"){var event=new Event("CustomEvent");util.global.dispatchEvent(event);return function(name,event){var domEvent=new Event(name.toLowerCase(),{cancelable:true});domEvent.detail=event;return!util.global.dispatchEvent(domEvent);};}else{var event=document.createEvent("CustomEvent");event.initCustomEvent("testingtheevent",false,true,{});util.global.dispatchEvent(event);return function(name,event){var domEvent=document.createEvent("CustomEvent");domEvent.initCustomEvent(name.toLowerCase(),false,true,event);return!util.global.dispatchEvent(domEvent);};}}catch(e){}return function(){return false;};}();var fireGlobalEvent=function(){if(util.isNode){return function(){return process.emit.apply(process,arguments);};}else{if(!util.global){return function(){return false;};}return function(name){var methodName="on"+name.toLowerCase();var method=util.global[methodName];if(!method)return false;method.apply(util.global,[].slice.call(arguments,1));return true;};}}();function generatePromiseLifecycleEventObject(name,promise){return{promise:promise};}var eventToObjectGenerator={promiseCreated:generatePromiseLifecycleEventObject,promiseFulfilled:generatePromiseLifecycleEventObject,promiseRejected:generatePromiseLifecycleEventObject,promiseResolved:generatePromiseLifecycleEventObject,promiseCancelled:generatePromiseLifecycleEventObject,promiseChained:function promiseChained(name,promise,child){return{promise:promise,child:child};},warning:function warning(name,_warning){return{warning:_warning};},unhandledRejection:function unhandledRejection(name,reason,promise){return{reason:reason,promise:promise};},rejectionHandled:generatePromiseLifecycleEventObject};var activeFireEvent=function activeFireEvent(name){var globalEventFired=false;try{globalEventFired=fireGlobalEvent.apply(null,arguments);}catch(e){async.throwLater(e);globalEventFired=true;}var domEventFired=false;try{domEventFired=fireDomEvent(name,eventToObjectGenerator[name].apply(null,arguments));}catch(e){async.throwLater(e);domEventFired=true;}return domEventFired||globalEventFired;};Promise.config=function(opts){opts=Object(opts);if("longStackTraces"in opts){if(opts.longStackTraces){Promise.longStackTraces();}else if(!opts.longStackTraces&&Promise.hasLongStackTraces()){disableLongStackTraces();}}if("warnings"in opts){var warningsOption=opts.warnings;config.warnings=!!warningsOption;wForgottenReturn=config.warnings;if(util.isObject(warningsOption)){if("wForgottenReturn"in warningsOption){wForgottenReturn=!!warningsOption.wForgottenReturn;}}}if("cancellation"in opts&&opts.cancellation&&!config.cancellation){if(async.haveItemsQueued()){throw new Error("cannot enable cancellation after promises are in use");}Promise.prototype._clearCancellationData=cancellationClearCancellationData;Promise.prototype._propagateFrom=cancellationPropagateFrom;Promise.prototype._onCancel=cancellationOnCancel;Promise.prototype._setOnCancel=cancellationSetOnCancel;Promise.prototype._attachCancellationCallback=cancellationAttachCancellationCallback;Promise.prototype._execute=cancellationExecute;_propagateFromFunction=cancellationPropagateFrom;config.cancellation=true;}if("monitoring"in opts){if(opts.monitoring&&!config.monitoring){config.monitoring=true;Promise.prototype._fireEvent=activeFireEvent;}else if(!opts.monitoring&&config.monitoring){config.monitoring=false;Promise.prototype._fireEvent=defaultFireEvent;}}};function defaultFireEvent(){return false;}Promise.prototype._fireEvent=defaultFireEvent;Promise.prototype._execute=function(executor,resolve,reject){try{executor(resolve,reject);}catch(e){return e;}};Promise.prototype._onCancel=function(){};Promise.prototype._setOnCancel=function(handler){;};Promise.prototype._attachCancellationCallback=function(onCancel){;};Promise.prototype._captureStackTrace=function(){};Promise.prototype._attachExtraTrace=function(){};Promise.prototype._clearCancellationData=function(){};Promise.prototype._propagateFrom=function(parent,flags){;;};function cancellationExecute(executor,resolve,reject){var promise=this;try{executor(resolve,reject,function(onCancel){if(typeof onCancel!=="function"){throw new TypeError("onCancel must be a function, got: "+util.toString(onCancel));}promise._attachCancellationCallback(onCancel);});}catch(e){return e;}}function cancellationAttachCancellationCallback(onCancel){if(!this._isCancellable())return this;var previousOnCancel=this._onCancel();if(previousOnCancel!==undefined){if(util.isArray(previousOnCancel)){previousOnCancel.push(onCancel);}else{this._setOnCancel([previousOnCancel,onCancel]);}}else{this._setOnCancel(onCancel);}}function cancellationOnCancel(){return this._onCancelField;}function cancellationSetOnCancel(onCancel){this._onCancelField=onCancel;}function cancellationClearCancellationData(){this._cancellationParent=undefined;this._onCancelField=undefined;}function cancellationPropagateFrom(parent,flags){if((flags&1)!==0){this._cancellationParent=parent;var branchesRemainingToCancel=parent._branchesRemainingToCancel;if(branchesRemainingToCancel===undefined){branchesRemainingToCancel=0;}parent._branchesRemainingToCancel=branchesRemainingToCancel+1;}if((flags&2)!==0&&parent._isBound()){this._setBoundTo(parent._boundTo);}}function bindingPropagateFrom(parent,flags){if((flags&2)!==0&&parent._isBound()){this._setBoundTo(parent._boundTo);}}var _propagateFromFunction=bindingPropagateFrom;function _boundValueFunction(){var ret=this._boundTo;if(ret!==undefined){if(ret instanceof Promise){if(ret.isFulfilled()){return ret.value();}else{return undefined;}}}return ret;}function longStackTracesCaptureStackTrace(){this._trace=new CapturedTrace(this._peekContext());}function longStackTracesAttachExtraTrace(error,ignoreSelf){if(canAttachTrace(error)){var trace=this._trace;if(trace!==undefined){if(ignoreSelf)trace=trace._parent;}if(trace!==undefined){trace.attachExtraTrace(error);}else if(!error.__stackCleaned__){var parsed=parseStackAndMessage(error);util.notEnumerableProp(error,"stack",parsed.message+"\n"+parsed.stack.join("\n"));util.notEnumerableProp(error,"__stackCleaned__",true);}}}function checkForgottenReturns(returnValue,promiseCreated,name,promise,parent){if(returnValue===undefined&&promiseCreated!==null&&wForgottenReturn){if(parent!==undefined&&parent._returnedNonUndefined())return;if((promise._bitField&65535)===0)return;if(name)name=name+" ";var handlerLine="";var creatorLine="";if(promiseCreated._trace){var traceLines=promiseCreated._trace.stack.split("\n");var stack=cleanStack(traceLines);for(var i=stack.length-1;i>=0;--i){var line=stack[i];if(!nodeFramePattern.test(line)){var lineMatches=line.match(parseLinePattern);if(lineMatches){handlerLine="at "+lineMatches[1]+":"+lineMatches[2]+":"+lineMatches[3]+" ";}break;}}if(stack.length>0){var firstUserLine=stack[0];for(var i=0;i<traceLines.length;++i){if(traceLines[i]===firstUserLine){if(i>0){creatorLine="\n"+traceLines[i-1];}break;}}}}var msg="a promise was created in a "+name+"handler "+handlerLine+"but was not returned from it, "+"see http://goo.gl/rRqMUw"+creatorLine;promise._warn(msg,true,promiseCreated);}}function deprecated(name,replacement){var message=name+" is deprecated and will be removed in a future version.";if(replacement)message+=" Use "+replacement+" instead.";return warn(message);}function warn(message,shouldUseOwnTrace,promise){if(!config.warnings)return;var warning=new Warning(message);var ctx;if(shouldUseOwnTrace){promise._attachExtraTrace(warning);}else if(config.longStackTraces&&(ctx=Promise._peekContext())){ctx.attachExtraTrace(warning);}else{var parsed=parseStackAndMessage(warning);warning.stack=parsed.message+"\n"+parsed.stack.join("\n");}if(!activeFireEvent("warning",warning)){formatAndLogError(warning,"",true);}}function reconstructStack(message,stacks){for(var i=0;i<stacks.length-1;++i){stacks[i].push("From previous event:");stacks[i]=stacks[i].join("\n");}if(i<stacks.length){stacks[i]=stacks[i].join("\n");}return message+"\n"+stacks.join("\n");}function removeDuplicateOrEmptyJumps(stacks){for(var i=0;i<stacks.length;++i){if(stacks[i].length===0||i+1<stacks.length&&stacks[i][0]===stacks[i+1][0]){stacks.splice(i,1);i--;}}}function removeCommonRoots(stacks){var current=stacks[0];for(var i=1;i<stacks.length;++i){var prev=stacks[i];var currentLastIndex=current.length-1;var currentLastLine=current[currentLastIndex];var commonRootMeetPoint=-1;for(var j=prev.length-1;j>=0;--j){if(prev[j]===currentLastLine){commonRootMeetPoint=j;break;}}for(var j=commonRootMeetPoint;j>=0;--j){var line=prev[j];if(current[currentLastIndex]===line){current.pop();currentLastIndex--;}else{break;}}current=prev;}}function cleanStack(stack){var ret=[];for(var i=0;i<stack.length;++i){var line=stack[i];var isTraceLine="    (No stack trace)"===line||stackFramePattern.test(line);var isInternalFrame=isTraceLine&&shouldIgnore(line);if(isTraceLine&&!isInternalFrame){if(indentStackFrames&&line.charAt(0)!==" "){line="    "+line;}ret.push(line);}}return ret;}function stackFramesAsArray(error){var stack=error.stack.replace(/\s+$/g,"").split("\n");for(var i=0;i<stack.length;++i){var line=stack[i];if("    (No stack trace)"===line||stackFramePattern.test(line)){break;}}if(i>0){stack=stack.slice(i);}return stack;}function parseStackAndMessage(error){var stack=error.stack;var message=error.toString();stack=typeof stack==="string"&&stack.length>0?stackFramesAsArray(error):["    (No stack trace)"];return{message:message,stack:cleanStack(stack)};}function formatAndLogError(error,title,isSoft){if(typeof console!=="undefined"){var message;if(util.isObject(error)){var stack=error.stack;message=title+formatStack(stack,error);}else{message=title+String(error);}if(typeof printWarning==="function"){printWarning(message,isSoft);}else if(typeof console.log==="function"||_typeof(console.log)==="object"){console.log(message);}}}function fireRejectionEvent(name,localHandler,reason,promise){var localEventFired=false;try{if(typeof localHandler==="function"){localEventFired=true;if(name==="rejectionHandled"){localHandler(promise);}else{localHandler(reason,promise);}}}catch(e){async.throwLater(e);}if(name==="unhandledRejection"){if(!activeFireEvent(name,reason,promise)&&!localEventFired){formatAndLogError(reason,"Unhandled rejection ");}}else{activeFireEvent(name,promise);}}function formatNonError(obj){var str;if(typeof obj==="function"){str="[function "+(obj.name||"anonymous")+"]";}else{str=obj&&typeof obj.toString==="function"?obj.toString():util.toString(obj);var ruselessToString=/\[object [a-zA-Z0-9$_]+\]/;if(ruselessToString.test(str)){try{var newStr=JSON.stringify(obj);str=newStr;}catch(e){}}if(str.length===0){str="(empty array)";}}return"(<"+snip(str)+">, no stack trace)";}function snip(str){var maxChars=41;if(str.length<maxChars){return str;}return str.substr(0,maxChars-3)+"...";}function longStackTracesIsSupported(){return typeof captureStackTrace==="function";}var shouldIgnore=function shouldIgnore(){return false;};var parseLineInfoRegex=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;function parseLineInfo(line){var matches=line.match(parseLineInfoRegex);if(matches){return{fileName:matches[1],line:parseInt(matches[2],10)};}}function setBounds(firstLineError,lastLineError){if(!longStackTracesIsSupported())return;var firstStackLines=firstLineError.stack.split("\n");var lastStackLines=lastLineError.stack.split("\n");var firstIndex=-1;var lastIndex=-1;var firstFileName;var lastFileName;for(var i=0;i<firstStackLines.length;++i){var result=parseLineInfo(firstStackLines[i]);if(result){firstFileName=result.fileName;firstIndex=result.line;break;}}for(var i=0;i<lastStackLines.length;++i){var result=parseLineInfo(lastStackLines[i]);if(result){lastFileName=result.fileName;lastIndex=result.line;break;}}if(firstIndex<0||lastIndex<0||!firstFileName||!lastFileName||firstFileName!==lastFileName||firstIndex>=lastIndex){return;}shouldIgnore=function shouldIgnore(line){if(bluebirdFramePattern.test(line))return true;var info=parseLineInfo(line);if(info){if(info.fileName===firstFileName&&firstIndex<=info.line&&info.line<=lastIndex){return true;}}return false;};}function CapturedTrace(parent){this._parent=parent;this._promisesCreated=0;var length=this._length=1+(parent===undefined?0:parent._length);captureStackTrace(this,CapturedTrace);if(length>32)this.uncycle();}util.inherits(CapturedTrace,Error);Context.CapturedTrace=CapturedTrace;CapturedTrace.prototype.uncycle=function(){var length=this._length;if(length<2)return;var nodes=[];var stackToIndex={};for(var i=0,node=this;node!==undefined;++i){nodes.push(node);node=node._parent;}length=this._length=i;for(var i=length-1;i>=0;--i){var stack=nodes[i].stack;if(stackToIndex[stack]===undefined){stackToIndex[stack]=i;}}for(var i=0;i<length;++i){var currentStack=nodes[i].stack;var index=stackToIndex[currentStack];if(index!==undefined&&index!==i){if(index>0){nodes[index-1]._parent=undefined;nodes[index-1]._length=1;}nodes[i]._parent=undefined;nodes[i]._length=1;var cycleEdgeNode=i>0?nodes[i-1]:this;if(index<length-1){cycleEdgeNode._parent=nodes[index+1];cycleEdgeNode._parent.uncycle();cycleEdgeNode._length=cycleEdgeNode._parent._length+1;}else{cycleEdgeNode._parent=undefined;cycleEdgeNode._length=1;}var currentChildLength=cycleEdgeNode._length+1;for(var j=i-2;j>=0;--j){nodes[j]._length=currentChildLength;currentChildLength++;}return;}}};CapturedTrace.prototype.attachExtraTrace=function(error){if(error.__stackCleaned__)return;this.uncycle();var parsed=parseStackAndMessage(error);var message=parsed.message;var stacks=[parsed.stack];var trace=this;while(trace!==undefined){stacks.push(cleanStack(trace.stack.split("\n")));trace=trace._parent;}removeCommonRoots(stacks);removeDuplicateOrEmptyJumps(stacks);util.notEnumerableProp(error,"stack",reconstructStack(message,stacks));util.notEnumerableProp(error,"__stackCleaned__",true);};var captureStackTrace=function stackDetection(){var v8stackFramePattern=/^\s*at\s*/;var v8stackFormatter=function v8stackFormatter(stack,error){if(typeof stack==="string")return stack;if(error.name!==undefined&&error.message!==undefined){return error.toString();}return formatNonError(error);};if(typeof Error.stackTraceLimit==="number"&&typeof Error.captureStackTrace==="function"){Error.stackTraceLimit+=6;stackFramePattern=v8stackFramePattern;formatStack=v8stackFormatter;var captureStackTrace=Error.captureStackTrace;shouldIgnore=function shouldIgnore(line){return bluebirdFramePattern.test(line);};return function(receiver,ignoreUntil){Error.stackTraceLimit+=6;captureStackTrace(receiver,ignoreUntil);Error.stackTraceLimit-=6;};}var err=new Error();if(typeof err.stack==="string"&&err.stack.split("\n")[0].indexOf("stackDetection@")>=0){stackFramePattern=/@/;formatStack=v8stackFormatter;indentStackFrames=true;return function captureStackTrace(o){o.stack=new Error().stack;};}var hasStackAfterThrow;try{throw new Error();}catch(e){hasStackAfterThrow="stack"in e;}if(!("stack"in err)&&hasStackAfterThrow&&typeof Error.stackTraceLimit==="number"){stackFramePattern=v8stackFramePattern;formatStack=v8stackFormatter;return function captureStackTrace(o){Error.stackTraceLimit+=6;try{throw new Error();}catch(e){o.stack=e.stack;}Error.stackTraceLimit-=6;};}formatStack=function formatStack(stack,error){if(typeof stack==="string")return stack;if(((typeof error==="undefined"?"undefined":_typeof(error))==="object"||typeof error==="function")&&error.name!==undefined&&error.message!==undefined){return error.toString();}return formatNonError(error);};return null;}([]);if(typeof console!=="undefined"&&typeof console.warn!=="undefined"){printWarning=function printWarning(message){console.warn(message);};if(util.isNode&&process.stderr.isTTY){printWarning=function printWarning(message,isSoft){var color=isSoft?"\x1B[33m":"\x1B[31m";console.warn(color+message+"\x1B[0m\n");};}else if(!util.isNode&&typeof new Error().stack==="string"){printWarning=function printWarning(message,isSoft){console.warn("%c"+message,isSoft?"color: darkorange":"color: red");};}}var config={warnings:warnings,longStackTraces:false,cancellation:false,monitoring:false};if(longStackTraces)Promise.longStackTraces();return{longStackTraces:function longStackTraces(){return config.longStackTraces;},warnings:function warnings(){return config.warnings;},cancellation:function cancellation(){return config.cancellation;},monitoring:function monitoring(){return config.monitoring;},propagateFromFunction:function propagateFromFunction(){return _propagateFromFunction;},boundValueFunction:function boundValueFunction(){return _boundValueFunction;},checkForgottenReturns:checkForgottenReturns,setBounds:setBounds,warn:warn,deprecated:deprecated,CapturedTrace:CapturedTrace,fireDomEvent:fireDomEvent,fireGlobalEvent:fireGlobalEvent};};},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise){function returner(){return this.value;}function thrower(){throw this.reason;}Promise.prototype["return"]=Promise.prototype.thenReturn=function(value){if(value instanceof Promise)value.suppressUnhandledRejections();return this._then(returner,undefined,undefined,{value:value},undefined);};Promise.prototype["throw"]=Promise.prototype.thenThrow=function(reason){return this._then(thrower,undefined,undefined,{reason:reason},undefined);};Promise.prototype.catchThrow=function(reason){if(arguments.length<=1){return this._then(undefined,thrower,undefined,{reason:reason},undefined);}else{var _reason=arguments[1];var handler=function handler(){throw _reason;};return this.caught(reason,handler);}};Promise.prototype.catchReturn=function(value){if(arguments.length<=1){if(value instanceof Promise)value.suppressUnhandledRejections();return this._then(undefined,returner,undefined,{value:value},undefined);}else{var _value=arguments[1];if(_value instanceof Promise)_value.suppressUnhandledRejections();var handler=function handler(){return _value;};return this.caught(value,handler);}};};},{}],11:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL){var PromiseReduce=Promise.reduce;var PromiseAll=Promise.all;function promiseAllThis(){return PromiseAll(this);}function PromiseMapSeries(promises,fn){return PromiseReduce(promises,fn,INTERNAL,INTERNAL);}Promise.prototype.each=function(fn){return PromiseReduce(this,fn,INTERNAL,0)._then(promiseAllThis,undefined,undefined,this,undefined);};Promise.prototype.mapSeries=function(fn){return PromiseReduce(this,fn,INTERNAL,INTERNAL);};Promise.each=function(promises,fn){return PromiseReduce(promises,fn,INTERNAL,0)._then(promiseAllThis,undefined,undefined,promises,undefined);};Promise.mapSeries=PromiseMapSeries;};},{}],12:[function(_dereq_,module,exports){"use strict";var es5=_dereq_("./es5");var Objectfreeze=es5.freeze;var util=_dereq_("./util");var inherits=util.inherits;var notEnumerableProp=util.notEnumerableProp;function subError(nameProperty,defaultMessage){function SubError(message){if(!(this instanceof SubError))return new SubError(message);notEnumerableProp(this,"message",typeof message==="string"?message:defaultMessage);notEnumerableProp(this,"name",nameProperty);if(Error.captureStackTrace){Error.captureStackTrace(this,this.constructor);}else{Error.call(this);}}inherits(SubError,Error);return SubError;}var _TypeError,_RangeError;var Warning=subError("Warning","warning");var CancellationError=subError("CancellationError","cancellation error");var TimeoutError=subError("TimeoutError","timeout error");var AggregateError=subError("AggregateError","aggregate error");try{_TypeError=TypeError;_RangeError=RangeError;}catch(e){_TypeError=subError("TypeError","type error");_RangeError=subError("RangeError","range error");}var methods=("join pop push shift unshift slice filter forEach some "+"every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");for(var i=0;i<methods.length;++i){if(typeof Array.prototype[methods[i]]==="function"){AggregateError.prototype[methods[i]]=Array.prototype[methods[i]];}}es5.defineProperty(AggregateError.prototype,"length",{value:0,configurable:false,writable:true,enumerable:true});AggregateError.prototype["isOperational"]=true;var level=0;AggregateError.prototype.toString=function(){var indent=Array(level*4+1).join(" ");var ret="\n"+indent+"AggregateError of:"+"\n";level++;indent=Array(level*4+1).join(" ");for(var i=0;i<this.length;++i){var str=this[i]===this?"[Circular AggregateError]":this[i]+"";var lines=str.split("\n");for(var j=0;j<lines.length;++j){lines[j]=indent+lines[j];}str=lines.join("\n");ret+=str+"\n";}level--;return ret;};function OperationalError(message){if(!(this instanceof OperationalError))return new OperationalError(message);notEnumerableProp(this,"name","OperationalError");notEnumerableProp(this,"message",message);this.cause=message;this["isOperational"]=true;if(message instanceof Error){notEnumerableProp(this,"message",message.message);notEnumerableProp(this,"stack",message.stack);}else if(Error.captureStackTrace){Error.captureStackTrace(this,this.constructor);}}inherits(OperationalError,Error);var errorTypes=Error["__BluebirdErrorTypes__"];if(!errorTypes){errorTypes=Objectfreeze({CancellationError:CancellationError,TimeoutError:TimeoutError,OperationalError:OperationalError,RejectionError:OperationalError,AggregateError:AggregateError});es5.defineProperty(Error,"__BluebirdErrorTypes__",{value:errorTypes,writable:false,enumerable:false,configurable:false});}module.exports={Error:Error,TypeError:_TypeError,RangeError:_RangeError,CancellationError:errorTypes.CancellationError,OperationalError:errorTypes.OperationalError,TimeoutError:errorTypes.TimeoutError,AggregateError:errorTypes.AggregateError,Warning:Warning};},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){var isES5=function(){"use strict";return this===undefined;}();if(isES5){module.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,getDescriptor:Object.getOwnPropertyDescriptor,keys:Object.keys,names:Object.getOwnPropertyNames,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:isES5,propertyIsWritable:function propertyIsWritable(obj,prop){var descriptor=Object.getOwnPropertyDescriptor(obj,prop);return!!(!descriptor||descriptor.writable||descriptor.set);}};}else{var has={}.hasOwnProperty;var str={}.toString;var proto={}.constructor.prototype;var ObjectKeys=function ObjectKeys(o){var ret=[];for(var key in o){if(has.call(o,key)){ret.push(key);}}return ret;};var ObjectGetDescriptor=function ObjectGetDescriptor(o,key){return{value:o[key]};};var ObjectDefineProperty=function ObjectDefineProperty(o,key,desc){o[key]=desc.value;return o;};var ObjectFreeze=function ObjectFreeze(obj){return obj;};var ObjectGetPrototypeOf=function ObjectGetPrototypeOf(obj){try{return Object(obj).constructor.prototype;}catch(e){return proto;}};var ArrayIsArray=function ArrayIsArray(obj){try{return str.call(obj)==="[object Array]";}catch(e){return false;}};module.exports={isArray:ArrayIsArray,keys:ObjectKeys,names:ObjectKeys,defineProperty:ObjectDefineProperty,getDescriptor:ObjectGetDescriptor,freeze:ObjectFreeze,getPrototypeOf:ObjectGetPrototypeOf,isES5:isES5,propertyIsWritable:function propertyIsWritable(){return true;}};}},{}],14:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL){var PromiseMap=Promise.map;Promise.prototype.filter=function(fn,options){return PromiseMap(this,fn,options,INTERNAL);};Promise.filter=function(promises,fn,options){return PromiseMap(promises,fn,options,INTERNAL);};};},{}],15:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,tryConvertToPromise){var util=_dereq_("./util");var CancellationError=Promise.CancellationError;var errorObj=util.errorObj;function PassThroughHandlerContext(promise,type,handler){this.promise=promise;this.type=type;this.handler=handler;this.called=false;this.cancelPromise=null;}PassThroughHandlerContext.prototype.isFinallyHandler=function(){return this.type===0;};function FinallyHandlerCancelReaction(finallyHandler){this.finallyHandler=finallyHandler;}FinallyHandlerCancelReaction.prototype._resultCancelled=function(){checkCancel(this.finallyHandler);};function checkCancel(ctx,reason){if(ctx.cancelPromise!=null){if(arguments.length>1){ctx.cancelPromise._reject(reason);}else{ctx.cancelPromise._cancel();}ctx.cancelPromise=null;return true;}return false;}function succeed(){return finallyHandler.call(this,this.promise._target()._settledValue());}function fail(reason){if(checkCancel(this,reason))return;errorObj.e=reason;return errorObj;}function finallyHandler(reasonOrValue){var promise=this.promise;var handler=this.handler;if(!this.called){this.called=true;var ret=this.isFinallyHandler()?handler.call(promise._boundValue()):handler.call(promise._boundValue(),reasonOrValue);if(ret!==undefined){promise._setReturnedNonUndefined();var maybePromise=tryConvertToPromise(ret,promise);if(maybePromise instanceof Promise){if(this.cancelPromise!=null){if(maybePromise._isCancelled()){var reason=new CancellationError("late cancellation observer");promise._attachExtraTrace(reason);errorObj.e=reason;return errorObj;}else if(maybePromise.isPending()){maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));}}return maybePromise._then(succeed,fail,undefined,this,undefined);}}}if(promise.isRejected()){checkCancel(this);errorObj.e=reasonOrValue;return errorObj;}else{checkCancel(this);return reasonOrValue;}}Promise.prototype._passThrough=function(handler,type,success,fail){if(typeof handler!=="function")return this.then();return this._then(success,fail,undefined,new PassThroughHandlerContext(this,type,handler),undefined);};Promise.prototype.lastly=Promise.prototype["finally"]=function(handler){return this._passThrough(handler,0,finallyHandler,finallyHandler);};Promise.prototype.tap=function(handler){return this._passThrough(handler,1,finallyHandler);};return PassThroughHandlerContext;};},{"./util":36}],16:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,apiRejection,INTERNAL,tryConvertToPromise,Proxyable,debug){var errors=_dereq_("./errors");var TypeError=errors.TypeError;var util=_dereq_("./util");var errorObj=util.errorObj;var tryCatch=util.tryCatch;var yieldHandlers=[];function promiseFromYieldHandler(value,yieldHandlers,traceParent){for(var i=0;i<yieldHandlers.length;++i){traceParent._pushContext();var result=tryCatch(yieldHandlers[i])(value);traceParent._popContext();if(result===errorObj){traceParent._pushContext();var ret=Promise.reject(errorObj.e);traceParent._popContext();return ret;}var maybePromise=tryConvertToPromise(result,traceParent);if(maybePromise instanceof Promise)return maybePromise;}return null;}function PromiseSpawn(generatorFunction,receiver,yieldHandler,stack){if(debug.cancellation()){var internal=new Promise(INTERNAL);var _finallyPromise=this._finallyPromise=new Promise(INTERNAL);this._promise=internal.lastly(function(){return _finallyPromise;});internal._captureStackTrace();internal._setOnCancel(this);}else{var promise=this._promise=new Promise(INTERNAL);promise._captureStackTrace();}this._stack=stack;this._generatorFunction=generatorFunction;this._receiver=receiver;this._generator=undefined;this._yieldHandlers=typeof yieldHandler==="function"?[yieldHandler].concat(yieldHandlers):yieldHandlers;this._yieldedPromise=null;this._cancellationPhase=false;}util.inherits(PromiseSpawn,Proxyable);PromiseSpawn.prototype._isResolved=function(){return this._promise===null;};PromiseSpawn.prototype._cleanup=function(){this._promise=this._generator=null;if(debug.cancellation()&&this._finallyPromise!==null){this._finallyPromise._fulfill();this._finallyPromise=null;}};PromiseSpawn.prototype._promiseCancelled=function(){if(this._isResolved())return;var implementsReturn=typeof this._generator["return"]!=="undefined";var result;if(!implementsReturn){var reason=new Promise.CancellationError("generator .return() sentinel");Promise.coroutine.returnSentinel=reason;this._promise._attachExtraTrace(reason);this._promise._pushContext();result=tryCatch(this._generator["throw"]).call(this._generator,reason);this._promise._popContext();}else{this._promise._pushContext();result=tryCatch(this._generator["return"]).call(this._generator,undefined);this._promise._popContext();}this._cancellationPhase=true;this._yieldedPromise=null;this._continue(result);};PromiseSpawn.prototype._promiseFulfilled=function(value){this._yieldedPromise=null;this._promise._pushContext();var result=tryCatch(this._generator.next).call(this._generator,value);this._promise._popContext();this._continue(result);};PromiseSpawn.prototype._promiseRejected=function(reason){this._yieldedPromise=null;this._promise._attachExtraTrace(reason);this._promise._pushContext();var result=tryCatch(this._generator["throw"]).call(this._generator,reason);this._promise._popContext();this._continue(result);};PromiseSpawn.prototype._resultCancelled=function(){if(this._yieldedPromise instanceof Promise){var promise=this._yieldedPromise;this._yieldedPromise=null;promise.cancel();}};PromiseSpawn.prototype.promise=function(){return this._promise;};PromiseSpawn.prototype._run=function(){this._generator=this._generatorFunction.call(this._receiver);this._receiver=this._generatorFunction=undefined;this._promiseFulfilled(undefined);};PromiseSpawn.prototype._continue=function(result){var promise=this._promise;if(result===errorObj){this._cleanup();if(this._cancellationPhase){return promise.cancel();}else{return promise._rejectCallback(result.e,false);}}var value=result.value;if(result.done===true){this._cleanup();if(this._cancellationPhase){return promise.cancel();}else{return promise._resolveCallback(value);}}else{var maybePromise=tryConvertToPromise(value,this._promise);if(!(maybePromise instanceof Promise)){maybePromise=promiseFromYieldHandler(maybePromise,this._yieldHandlers,this._promise);if(maybePromise===null){this._promiseRejected(new TypeError("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s",value)+"From coroutine:\n"+this._stack.split("\n").slice(1,-7).join("\n")));return;}}maybePromise=maybePromise._target();var bitField=maybePromise._bitField;;if((bitField&50397184)===0){this._yieldedPromise=maybePromise;maybePromise._proxy(this,null);}else if((bitField&33554432)!==0){Promise._async.invoke(this._promiseFulfilled,this,maybePromise._value());}else if((bitField&16777216)!==0){Promise._async.invoke(this._promiseRejected,this,maybePromise._reason());}else{this._promiseCancelled();}}};Promise.coroutine=function(generatorFunction,options){if(typeof generatorFunction!=="function"){throw new TypeError("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");}var yieldHandler=Object(options).yieldHandler;var PromiseSpawn$=PromiseSpawn;var stack=new Error().stack;return function(){var generator=generatorFunction.apply(this,arguments);var spawn=new PromiseSpawn$(undefined,undefined,yieldHandler,stack);var ret=spawn.promise();spawn._generator=generator;spawn._promiseFulfilled(undefined);return ret;};};Promise.coroutine.addYieldHandler=function(fn){if(typeof fn!=="function"){throw new TypeError("expecting a function but got "+util.classString(fn));}yieldHandlers.push(fn);};Promise.spawn=function(generatorFunction){debug.deprecated("Promise.spawn()","Promise.coroutine()");if(typeof generatorFunction!=="function"){return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");}var spawn=new PromiseSpawn(generatorFunction,this);var ret=spawn.promise();spawn._run(Promise.spawn);return ret;};};},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,tryConvertToPromise,INTERNAL,async,getDomain){var util=_dereq_("./util");var canEvaluate=util.canEvaluate;var tryCatch=util.tryCatch;var errorObj=util.errorObj;var reject;if(false){if(canEvaluate){var thenCallback=function thenCallback(i){return new Function("value","holder","                             \n\
	            'use strict';                                                    \n\
	            holder.pIndex = value;                                           \n\
	            holder.checkFulfillment(this);                                   \n\
	            ".replace(/Index/g,i));};var promiseSetter=function promiseSetter(i){return new Function("promise","holder","                           \n\
	            'use strict';                                                    \n\
	            holder.pIndex = promise;                                         \n\
	            ".replace(/Index/g,i));};var generateHolderClass=function generateHolderClass(total){var props=new Array(total);for(var i=0;i<props.length;++i){props[i]="this.p"+(i+1);}var assignment=props.join(" = ")+" = null;";var cancellationCode="var promise;\n"+props.map(function(prop){return"                                                         \n\
	                promise = "+prop+";                                      \n\
	                if (promise instanceof Promise) {                            \n\
	                    promise.cancel();                                        \n\
	                }                                                            \n\
	            ";}).join("\n");var passedArguments=props.join(", ");var name="Holder$"+total;var code="return function(tryCatch, errorObj, Promise, async) {    \n\
	            'use strict';                                                    \n\
	            function [TheName](fn) {                                         \n\
	                [TheProperties]                                              \n\
	                this.fn = fn;                                                \n\
	                this.asyncNeeded = true;                                     \n\
	                this.now = 0;                                                \n\
	            }                                                                \n\
	                                                                             \n\
	            [TheName].prototype._callFunction = function(promise) {          \n\
	                promise._pushContext();                                      \n\
	                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
	                promise._popContext();                                       \n\
	                if (ret === errorObj) {                                      \n\
	                    promise._rejectCallback(ret.e, false);                   \n\
	                } else {                                                     \n\
	                    promise._resolveCallback(ret);                           \n\
	                }                                                            \n\
	            };                                                               \n\
	                                                                             \n\
	            [TheName].prototype.checkFulfillment = function(promise) {       \n\
	                var now = ++this.now;                                        \n\
	                if (now === [TheTotal]) {                                    \n\
	                    if (this.asyncNeeded) {                                  \n\
	                        async.invoke(this._callFunction, this, promise);     \n\
	                    } else {                                                 \n\
	                        this._callFunction(promise);                         \n\
	                    }                                                        \n\
	                                                                             \n\
	                }                                                            \n\
	            };                                                               \n\
	                                                                             \n\
	            [TheName].prototype._resultCancelled = function() {              \n\
	                [CancellationCode]                                           \n\
	            };                                                               \n\
	                                                                             \n\
	            return [TheName];                                                \n\
	        }(tryCatch, errorObj, Promise, async);                               \n\
	        ";code=code.replace(/\[TheName\]/g,name).replace(/\[TheTotal\]/g,total).replace(/\[ThePassedArguments\]/g,passedArguments).replace(/\[TheProperties\]/g,assignment).replace(/\[CancellationCode\]/g,cancellationCode);return new Function("tryCatch","errorObj","Promise","async",code)(tryCatch,errorObj,Promise,async);};var holderClasses=[];var thenCallbacks=[];var promiseSetters=[];for(var i=0;i<8;++i){holderClasses.push(generateHolderClass(i+1));thenCallbacks.push(thenCallback(i+1));promiseSetters.push(promiseSetter(i+1));}reject=function reject(reason){this._reject(reason);};}}Promise.join=function(){var last=arguments.length-1;var fn;if(last>0&&typeof arguments[last]==="function"){fn=arguments[last];if(false){if(last<=8&&canEvaluate){var ret=new Promise(INTERNAL);ret._captureStackTrace();var HolderClass=holderClasses[last-1];var holder=new HolderClass(fn);var callbacks=thenCallbacks;for(var i=0;i<last;++i){var maybePromise=tryConvertToPromise(arguments[i],ret);if(maybePromise instanceof Promise){maybePromise=maybePromise._target();var bitField=maybePromise._bitField;;if((bitField&50397184)===0){maybePromise._then(callbacks[i],reject,undefined,ret,holder);promiseSetters[i](maybePromise,holder);holder.asyncNeeded=false;}else if((bitField&33554432)!==0){callbacks[i].call(ret,maybePromise._value(),holder);}else if((bitField&16777216)!==0){ret._reject(maybePromise._reason());}else{ret._cancel();}}else{callbacks[i].call(ret,maybePromise,holder);}}if(!ret._isFateSealed()){if(holder.asyncNeeded){var domain=getDomain();if(domain!==null){holder.fn=util.domainBind(domain,holder.fn);}}ret._setAsyncGuaranteed();ret._setOnCancel(holder);}return ret;}}}var args=[].slice.call(arguments);;if(fn)args.pop();var ret=new PromiseArray(args).promise();return fn!==undefined?ret.spread(fn):ret;};};},{"./util":36}],18:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL,debug){var getDomain=Promise._getDomain;var util=_dereq_("./util");var tryCatch=util.tryCatch;var errorObj=util.errorObj;var async=Promise._async;function MappingPromiseArray(promises,fn,limit,_filter){this.constructor$(promises);this._promise._captureStackTrace();var domain=getDomain();this._callback=domain===null?fn:util.domainBind(domain,fn);this._preservedValues=_filter===INTERNAL?new Array(this.length()):null;this._limit=limit;this._inFlight=0;this._queue=[];async.invoke(this._asyncInit,this,undefined);}util.inherits(MappingPromiseArray,PromiseArray);MappingPromiseArray.prototype._asyncInit=function(){this._init$(undefined,-2);};MappingPromiseArray.prototype._init=function(){};MappingPromiseArray.prototype._promiseFulfilled=function(value,index){var values=this._values;var length=this.length();var preservedValues=this._preservedValues;var limit=this._limit;if(index<0){index=index*-1-1;values[index]=value;if(limit>=1){this._inFlight--;this._drainQueue();if(this._isResolved())return true;}}else{if(limit>=1&&this._inFlight>=limit){values[index]=value;this._queue.push(index);return false;}if(preservedValues!==null)preservedValues[index]=value;var promise=this._promise;var callback=this._callback;var receiver=promise._boundValue();promise._pushContext();var ret=tryCatch(callback).call(receiver,value,index,length);var promiseCreated=promise._popContext();debug.checkForgottenReturns(ret,promiseCreated,preservedValues!==null?"Promise.filter":"Promise.map",promise);if(ret===errorObj){this._reject(ret.e);return true;}var maybePromise=tryConvertToPromise(ret,this._promise);if(maybePromise instanceof Promise){maybePromise=maybePromise._target();var bitField=maybePromise._bitField;;if((bitField&50397184)===0){if(limit>=1)this._inFlight++;values[index]=maybePromise;maybePromise._proxy(this,(index+1)*-1);return false;}else if((bitField&33554432)!==0){ret=maybePromise._value();}else if((bitField&16777216)!==0){this._reject(maybePromise._reason());return true;}else{this._cancel();return true;}}values[index]=ret;}var totalResolved=++this._totalResolved;if(totalResolved>=length){if(preservedValues!==null){this._filter(values,preservedValues);}else{this._resolve(values);}return true;}return false;};MappingPromiseArray.prototype._drainQueue=function(){var queue=this._queue;var limit=this._limit;var values=this._values;while(queue.length>0&&this._inFlight<limit){if(this._isResolved())return;var index=queue.pop();this._promiseFulfilled(values[index],index);}};MappingPromiseArray.prototype._filter=function(booleans,values){var len=values.length;var ret=new Array(len);var j=0;for(var i=0;i<len;++i){if(booleans[i])ret[j++]=values[i];}ret.length=j;this._resolve(ret);};MappingPromiseArray.prototype.preservedValues=function(){return this._preservedValues;};function map(promises,fn,options,_filter){if(typeof fn!=="function"){return apiRejection("expecting a function but got "+util.classString(fn));}var limit=0;if(options!==undefined){if((typeof options==="undefined"?"undefined":_typeof(options))==="object"&&options!==null){if(typeof options.concurrency!=="number"){return Promise.reject(new TypeError("'concurrency' must be a number but it is "+util.classString(options.concurrency)));}limit=options.concurrency;}else{return Promise.reject(new TypeError("options argument must be an object but it is "+util.classString(options)));}}limit=typeof limit==="number"&&isFinite(limit)&&limit>=1?limit:0;return new MappingPromiseArray(promises,fn,limit,_filter).promise();}Promise.prototype.map=function(fn,options){return map(this,fn,options,null);};Promise.map=function(promises,fn,options,_filter){return map(promises,fn,options,_filter);};};},{"./util":36}],19:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL,tryConvertToPromise,apiRejection,debug){var util=_dereq_("./util");var tryCatch=util.tryCatch;Promise.method=function(fn){if(typeof fn!=="function"){throw new Promise.TypeError("expecting a function but got "+util.classString(fn));}return function(){var ret=new Promise(INTERNAL);ret._captureStackTrace();ret._pushContext();var value=tryCatch(fn).apply(this,arguments);var promiseCreated=ret._popContext();debug.checkForgottenReturns(value,promiseCreated,"Promise.method",ret);ret._resolveFromSyncValue(value);return ret;};};Promise.attempt=Promise["try"]=function(fn){if(typeof fn!=="function"){return apiRejection("expecting a function but got "+util.classString(fn));}var ret=new Promise(INTERNAL);ret._captureStackTrace();ret._pushContext();var value;if(arguments.length>1){debug.deprecated("calling Promise.try with more than 1 argument");var arg=arguments[1];var ctx=arguments[2];value=util.isArray(arg)?tryCatch(fn).apply(ctx,arg):tryCatch(fn).call(ctx,arg);}else{value=tryCatch(fn)();}var promiseCreated=ret._popContext();debug.checkForgottenReturns(value,promiseCreated,"Promise.try",ret);ret._resolveFromSyncValue(value);return ret;};Promise.prototype._resolveFromSyncValue=function(value){if(value===util.errorObj){this._rejectCallback(value.e,false);}else{this._resolveCallback(value,true);}};};},{"./util":36}],20:[function(_dereq_,module,exports){"use strict";var util=_dereq_("./util");var maybeWrapAsError=util.maybeWrapAsError;var errors=_dereq_("./errors");var OperationalError=errors.OperationalError;var es5=_dereq_("./es5");function isUntypedError(obj){return obj instanceof Error&&es5.getPrototypeOf(obj)===Error.prototype;}var rErrorKey=/^(?:name|message|stack|cause)$/;function wrapAsOperationalError(obj){var ret;if(isUntypedError(obj)){ret=new OperationalError(obj);ret.name=obj.name;ret.message=obj.message;ret.stack=obj.stack;var keys=es5.keys(obj);for(var i=0;i<keys.length;++i){var key=keys[i];if(!rErrorKey.test(key)){ret[key]=obj[key];}}return ret;}util.markAsOriginatingFromRejection(obj);return obj;}function nodebackForPromise(promise,multiArgs){return function(err,value){if(promise===null)return;if(err){var wrapped=wrapAsOperationalError(maybeWrapAsError(err));promise._attachExtraTrace(wrapped);promise._reject(wrapped);}else if(!multiArgs){promise._fulfill(value);}else{var args=[].slice.call(arguments,1);;promise._fulfill(args);}promise=null;};}module.exports=nodebackForPromise;},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise){var util=_dereq_("./util");var async=Promise._async;var tryCatch=util.tryCatch;var errorObj=util.errorObj;function spreadAdapter(val,nodeback){var promise=this;if(!util.isArray(val))return successAdapter.call(promise,val,nodeback);var ret=tryCatch(nodeback).apply(promise._boundValue(),[null].concat(val));if(ret===errorObj){async.throwLater(ret.e);}}function successAdapter(val,nodeback){var promise=this;var receiver=promise._boundValue();var ret=val===undefined?tryCatch(nodeback).call(receiver,null):tryCatch(nodeback).call(receiver,null,val);if(ret===errorObj){async.throwLater(ret.e);}}function errorAdapter(reason,nodeback){var promise=this;if(!reason){var newReason=new Error(reason+"");newReason.cause=reason;reason=newReason;}var ret=tryCatch(nodeback).call(promise._boundValue(),reason);if(ret===errorObj){async.throwLater(ret.e);}}Promise.prototype.asCallback=Promise.prototype.nodeify=function(nodeback,options){if(typeof nodeback=="function"){var adapter=successAdapter;if(options!==undefined&&Object(options).spread){adapter=spreadAdapter;}this._then(adapter,errorAdapter,undefined,this,nodeback);}return this;};};},{"./util":36}],22:[function(_dereq_,module,exports){"use strict";module.exports=function(){var makeSelfResolutionError=function makeSelfResolutionError(){return new TypeError("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");};var reflectHandler=function reflectHandler(){return new Promise.PromiseInspection(this._target());};var apiRejection=function apiRejection(msg){return Promise.reject(new TypeError(msg));};function Proxyable(){}var UNDEFINED_BINDING={};var util=_dereq_("./util");var getDomain;if(util.isNode){getDomain=function getDomain(){var ret=process.domain;if(ret===undefined)ret=null;return ret;};}else{getDomain=function getDomain(){return null;};}util.notEnumerableProp(Promise,"_getDomain",getDomain);var es5=_dereq_("./es5");var Async=_dereq_("./async");var async=new Async();es5.defineProperty(Promise,"_async",{value:async});var errors=_dereq_("./errors");var TypeError=Promise.TypeError=errors.TypeError;Promise.RangeError=errors.RangeError;var CancellationError=Promise.CancellationError=errors.CancellationError;Promise.TimeoutError=errors.TimeoutError;Promise.OperationalError=errors.OperationalError;Promise.RejectionError=errors.OperationalError;Promise.AggregateError=errors.AggregateError;var INTERNAL=function INTERNAL(){};var APPLY={};var NEXT_FILTER={};var tryConvertToPromise=_dereq_("./thenables")(Promise,INTERNAL);var PromiseArray=_dereq_("./promise_array")(Promise,INTERNAL,tryConvertToPromise,apiRejection,Proxyable);var Context=_dereq_("./context")(Promise);/*jshint unused:false*/var createContext=Context.create;var debug=_dereq_("./debuggability")(Promise,Context);var CapturedTrace=debug.CapturedTrace;var PassThroughHandlerContext=_dereq_("./finally")(Promise,tryConvertToPromise);var catchFilter=_dereq_("./catch_filter")(NEXT_FILTER);var nodebackForPromise=_dereq_("./nodeback");var errorObj=util.errorObj;var tryCatch=util.tryCatch;function check(self,executor){if(typeof executor!=="function"){throw new TypeError("expecting a function but got "+util.classString(executor));}if(self.constructor!==Promise){throw new TypeError("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");}}function Promise(executor){this._bitField=0;this._fulfillmentHandler0=undefined;this._rejectionHandler0=undefined;this._promise0=undefined;this._receiver0=undefined;if(executor!==INTERNAL){check(this,executor);this._resolveFromExecutor(executor);}this._promiseCreated();this._fireEvent("promiseCreated",this);}Promise.prototype.toString=function(){return"[object Promise]";};Promise.prototype.caught=Promise.prototype["catch"]=function(fn){var len=arguments.length;if(len>1){var catchInstances=new Array(len-1),j=0,i;for(i=0;i<len-1;++i){var item=arguments[i];if(util.isObject(item)){catchInstances[j++]=item;}else{return apiRejection("expecting an object but got "+"A catch statement predicate "+util.classString(item));}}catchInstances.length=j;fn=arguments[i];return this.then(undefined,catchFilter(catchInstances,fn,this));}return this.then(undefined,fn);};Promise.prototype.reflect=function(){return this._then(reflectHandler,reflectHandler,undefined,this,undefined);};Promise.prototype.then=function(didFulfill,didReject){if(debug.warnings()&&arguments.length>0&&typeof didFulfill!=="function"&&typeof didReject!=="function"){var msg=".then() only accepts functions but was passed: "+util.classString(didFulfill);if(arguments.length>1){msg+=", "+util.classString(didReject);}this._warn(msg);}return this._then(didFulfill,didReject,undefined,undefined,undefined);};Promise.prototype.done=function(didFulfill,didReject){var promise=this._then(didFulfill,didReject,undefined,undefined,undefined);promise._setIsFinal();};Promise.prototype.spread=function(fn){if(typeof fn!=="function"){return apiRejection("expecting a function but got "+util.classString(fn));}return this.all()._then(fn,undefined,undefined,APPLY,undefined);};Promise.prototype.toJSON=function(){var ret={isFulfilled:false,isRejected:false,fulfillmentValue:undefined,rejectionReason:undefined};if(this.isFulfilled()){ret.fulfillmentValue=this.value();ret.isFulfilled=true;}else if(this.isRejected()){ret.rejectionReason=this.reason();ret.isRejected=true;}return ret;};Promise.prototype.all=function(){if(arguments.length>0){this._warn(".all() was passed arguments but it does not take any");}return new PromiseArray(this).promise();};Promise.prototype.error=function(fn){return this.caught(util.originatesFromRejection,fn);};Promise.getNewLibraryCopy=module.exports;Promise.is=function(val){return val instanceof Promise;};Promise.fromNode=Promise.fromCallback=function(fn){var ret=new Promise(INTERNAL);ret._captureStackTrace();var multiArgs=arguments.length>1?!!Object(arguments[1]).multiArgs:false;var result=tryCatch(fn)(nodebackForPromise(ret,multiArgs));if(result===errorObj){ret._rejectCallback(result.e,true);}if(!ret._isFateSealed())ret._setAsyncGuaranteed();return ret;};Promise.all=function(promises){return new PromiseArray(promises).promise();};Promise.cast=function(obj){var ret=tryConvertToPromise(obj);if(!(ret instanceof Promise)){ret=new Promise(INTERNAL);ret._captureStackTrace();ret._setFulfilled();ret._rejectionHandler0=obj;}return ret;};Promise.resolve=Promise.fulfilled=Promise.cast;Promise.reject=Promise.rejected=function(reason){var ret=new Promise(INTERNAL);ret._captureStackTrace();ret._rejectCallback(reason,true);return ret;};Promise.setScheduler=function(fn){if(typeof fn!=="function"){throw new TypeError("expecting a function but got "+util.classString(fn));}return async.setScheduler(fn);};Promise.prototype._then=function(didFulfill,didReject,_,receiver,internalData){var haveInternalData=internalData!==undefined;var promise=haveInternalData?internalData:new Promise(INTERNAL);var target=this._target();var bitField=target._bitField;if(!haveInternalData){promise._propagateFrom(this,3);promise._captureStackTrace();if(receiver===undefined&&(this._bitField&2097152)!==0){if(!((bitField&50397184)===0)){receiver=this._boundValue();}else{receiver=target===this?undefined:this._boundTo;}}this._fireEvent("promiseChained",this,promise);}var domain=getDomain();if(!((bitField&50397184)===0)){var handler,value,settler=target._settlePromiseCtx;if((bitField&33554432)!==0){value=target._rejectionHandler0;handler=didFulfill;}else if((bitField&16777216)!==0){value=target._fulfillmentHandler0;handler=didReject;target._unsetRejectionIsUnhandled();}else{settler=target._settlePromiseLateCancellationObserver;value=new CancellationError("late cancellation observer");target._attachExtraTrace(value);handler=didReject;}async.invoke(settler,target,{handler:domain===null?handler:typeof handler==="function"&&util.domainBind(domain,handler),promise:promise,receiver:receiver,value:value});}else{target._addCallbacks(didFulfill,didReject,promise,receiver,domain);}return promise;};Promise.prototype._length=function(){return this._bitField&65535;};Promise.prototype._isFateSealed=function(){return(this._bitField&117506048)!==0;};Promise.prototype._isFollowing=function(){return(this._bitField&67108864)===67108864;};Promise.prototype._setLength=function(len){this._bitField=this._bitField&-65536|len&65535;};Promise.prototype._setFulfilled=function(){this._bitField=this._bitField|33554432;this._fireEvent("promiseFulfilled",this);};Promise.prototype._setRejected=function(){this._bitField=this._bitField|16777216;this._fireEvent("promiseRejected",this);};Promise.prototype._setFollowing=function(){this._bitField=this._bitField|67108864;this._fireEvent("promiseResolved",this);};Promise.prototype._setIsFinal=function(){this._bitField=this._bitField|4194304;};Promise.prototype._isFinal=function(){return(this._bitField&4194304)>0;};Promise.prototype._unsetCancelled=function(){this._bitField=this._bitField&~65536;};Promise.prototype._setCancelled=function(){this._bitField=this._bitField|65536;this._fireEvent("promiseCancelled",this);};Promise.prototype._setWillBeCancelled=function(){this._bitField=this._bitField|8388608;};Promise.prototype._setAsyncGuaranteed=function(){if(async.hasCustomScheduler())return;this._bitField=this._bitField|134217728;};Promise.prototype._receiverAt=function(index){var ret=index===0?this._receiver0:this[index*4-4+3];if(ret===UNDEFINED_BINDING){return undefined;}else if(ret===undefined&&this._isBound()){return this._boundValue();}return ret;};Promise.prototype._promiseAt=function(index){return this[index*4-4+2];};Promise.prototype._fulfillmentHandlerAt=function(index){return this[index*4-4+0];};Promise.prototype._rejectionHandlerAt=function(index){return this[index*4-4+1];};Promise.prototype._boundValue=function(){};Promise.prototype._migrateCallback0=function(follower){var bitField=follower._bitField;var fulfill=follower._fulfillmentHandler0;var reject=follower._rejectionHandler0;var promise=follower._promise0;var receiver=follower._receiverAt(0);if(receiver===undefined)receiver=UNDEFINED_BINDING;this._addCallbacks(fulfill,reject,promise,receiver,null);};Promise.prototype._migrateCallbackAt=function(follower,index){var fulfill=follower._fulfillmentHandlerAt(index);var reject=follower._rejectionHandlerAt(index);var promise=follower._promiseAt(index);var receiver=follower._receiverAt(index);if(receiver===undefined)receiver=UNDEFINED_BINDING;this._addCallbacks(fulfill,reject,promise,receiver,null);};Promise.prototype._addCallbacks=function(fulfill,reject,promise,receiver,domain){var index=this._length();if(index>=65535-4){index=0;this._setLength(0);}if(index===0){this._promise0=promise;this._receiver0=receiver;if(typeof fulfill==="function"){this._fulfillmentHandler0=domain===null?fulfill:util.domainBind(domain,fulfill);}if(typeof reject==="function"){this._rejectionHandler0=domain===null?reject:util.domainBind(domain,reject);}}else{var base=index*4-4;this[base+2]=promise;this[base+3]=receiver;if(typeof fulfill==="function"){this[base+0]=domain===null?fulfill:util.domainBind(domain,fulfill);}if(typeof reject==="function"){this[base+1]=domain===null?reject:util.domainBind(domain,reject);}}this._setLength(index+1);return index;};Promise.prototype._proxy=function(proxyable,arg){this._addCallbacks(undefined,undefined,arg,proxyable,null);};Promise.prototype._resolveCallback=function(value,shouldBind){if((this._bitField&117506048)!==0)return;if(value===this)return this._rejectCallback(makeSelfResolutionError(),false);var maybePromise=tryConvertToPromise(value,this);if(!(maybePromise instanceof Promise))return this._fulfill(value);if(shouldBind)this._propagateFrom(maybePromise,2);var promise=maybePromise._target();if(promise===this){this._reject(makeSelfResolutionError());return;}var bitField=promise._bitField;if((bitField&50397184)===0){var len=this._length();if(len>0)promise._migrateCallback0(this);for(var i=1;i<len;++i){promise._migrateCallbackAt(this,i);}this._setFollowing();this._setLength(0);this._setFollowee(promise);}else if((bitField&33554432)!==0){this._fulfill(promise._value());}else if((bitField&16777216)!==0){this._reject(promise._reason());}else{var reason=new CancellationError("late cancellation observer");promise._attachExtraTrace(reason);this._reject(reason);}};Promise.prototype._rejectCallback=function(reason,synchronous,ignoreNonErrorWarnings){var trace=util.ensureErrorObject(reason);var hasStack=trace===reason;if(!hasStack&&!ignoreNonErrorWarnings&&debug.warnings()){var message="a promise was rejected with a non-error: "+util.classString(reason);this._warn(message,true);}this._attachExtraTrace(trace,synchronous?hasStack:false);this._reject(reason);};Promise.prototype._resolveFromExecutor=function(executor){var promise=this;this._captureStackTrace();this._pushContext();var synchronous=true;var r=this._execute(executor,function(value){promise._resolveCallback(value);},function(reason){promise._rejectCallback(reason,synchronous);});synchronous=false;this._popContext();if(r!==undefined){promise._rejectCallback(r,true);}};Promise.prototype._settlePromiseFromHandler=function(handler,receiver,value,promise){var bitField=promise._bitField;if((bitField&65536)!==0)return;promise._pushContext();var x;if(receiver===APPLY){if(!value||typeof value.length!=="number"){x=errorObj;x.e=new TypeError("cannot .spread() a non-array: "+util.classString(value));}else{x=tryCatch(handler).apply(this._boundValue(),value);}}else{x=tryCatch(handler).call(receiver,value);}var promiseCreated=promise._popContext();bitField=promise._bitField;if((bitField&65536)!==0)return;if(x===NEXT_FILTER){promise._reject(value);}else if(x===errorObj){promise._rejectCallback(x.e,false);}else{debug.checkForgottenReturns(x,promiseCreated,"",promise,this);promise._resolveCallback(x);}};Promise.prototype._target=function(){var ret=this;while(ret._isFollowing()){ret=ret._followee();}return ret;};Promise.prototype._followee=function(){return this._rejectionHandler0;};Promise.prototype._setFollowee=function(promise){this._rejectionHandler0=promise;};Promise.prototype._settlePromise=function(promise,handler,receiver,value){var isPromise=promise instanceof Promise;var bitField=this._bitField;var asyncGuaranteed=(bitField&134217728)!==0;if((bitField&65536)!==0){if(isPromise)promise._invokeInternalOnCancel();if(receiver instanceof PassThroughHandlerContext&&receiver.isFinallyHandler()){receiver.cancelPromise=promise;if(tryCatch(handler).call(receiver,value)===errorObj){promise._reject(errorObj.e);}}else if(handler===reflectHandler){promise._fulfill(reflectHandler.call(receiver));}else if(receiver instanceof Proxyable){receiver._promiseCancelled(promise);}else if(isPromise||promise instanceof PromiseArray){promise._cancel();}else{receiver.cancel();}}else if(typeof handler==="function"){if(!isPromise){handler.call(receiver,value,promise);}else{if(asyncGuaranteed)promise._setAsyncGuaranteed();this._settlePromiseFromHandler(handler,receiver,value,promise);}}else if(receiver instanceof Proxyable){if(!receiver._isResolved()){if((bitField&33554432)!==0){receiver._promiseFulfilled(value,promise);}else{receiver._promiseRejected(value,promise);}}}else if(isPromise){if(asyncGuaranteed)promise._setAsyncGuaranteed();if((bitField&33554432)!==0){promise._fulfill(value);}else{promise._reject(value);}}};Promise.prototype._settlePromiseLateCancellationObserver=function(ctx){var handler=ctx.handler;var promise=ctx.promise;var receiver=ctx.receiver;var value=ctx.value;if(typeof handler==="function"){if(!(promise instanceof Promise)){handler.call(receiver,value,promise);}else{this._settlePromiseFromHandler(handler,receiver,value,promise);}}else if(promise instanceof Promise){promise._reject(value);}};Promise.prototype._settlePromiseCtx=function(ctx){this._settlePromise(ctx.promise,ctx.handler,ctx.receiver,ctx.value);};Promise.prototype._settlePromise0=function(handler,value,bitField){var promise=this._promise0;var receiver=this._receiverAt(0);this._promise0=undefined;this._receiver0=undefined;this._settlePromise(promise,handler,receiver,value);};Promise.prototype._clearCallbackDataAtIndex=function(index){var base=index*4-4;this[base+2]=this[base+3]=this[base+0]=this[base+1]=undefined;};Promise.prototype._fulfill=function(value){var bitField=this._bitField;if((bitField&117506048)>>>16)return;if(value===this){var err=makeSelfResolutionError();this._attachExtraTrace(err);return this._reject(err);}this._setFulfilled();this._rejectionHandler0=value;if((bitField&65535)>0){if((bitField&134217728)!==0){this._settlePromises();}else{async.settlePromises(this);}}};Promise.prototype._reject=function(reason){var bitField=this._bitField;if((bitField&117506048)>>>16)return;this._setRejected();this._fulfillmentHandler0=reason;if(this._isFinal()){return async.fatalError(reason,util.isNode);}if((bitField&65535)>0){async.settlePromises(this);}else{this._ensurePossibleRejectionHandled();}};Promise.prototype._fulfillPromises=function(len,value){for(var i=1;i<len;i++){var handler=this._fulfillmentHandlerAt(i);var promise=this._promiseAt(i);var receiver=this._receiverAt(i);this._clearCallbackDataAtIndex(i);this._settlePromise(promise,handler,receiver,value);}};Promise.prototype._rejectPromises=function(len,reason){for(var i=1;i<len;i++){var handler=this._rejectionHandlerAt(i);var promise=this._promiseAt(i);var receiver=this._receiverAt(i);this._clearCallbackDataAtIndex(i);this._settlePromise(promise,handler,receiver,reason);}};Promise.prototype._settlePromises=function(){var bitField=this._bitField;var len=bitField&65535;if(len>0){if((bitField&16842752)!==0){var reason=this._fulfillmentHandler0;this._settlePromise0(this._rejectionHandler0,reason,bitField);this._rejectPromises(len,reason);}else{var value=this._rejectionHandler0;this._settlePromise0(this._fulfillmentHandler0,value,bitField);this._fulfillPromises(len,value);}this._setLength(0);}this._clearCancellationData();};Promise.prototype._settledValue=function(){var bitField=this._bitField;if((bitField&33554432)!==0){return this._rejectionHandler0;}else if((bitField&16777216)!==0){return this._fulfillmentHandler0;}};function deferResolve(v){this.promise._resolveCallback(v);}function deferReject(v){this.promise._rejectCallback(v,false);}Promise.defer=Promise.pending=function(){debug.deprecated("Promise.defer","new Promise");var promise=new Promise(INTERNAL);return{promise:promise,resolve:deferResolve,reject:deferReject};};util.notEnumerableProp(Promise,"_makeSelfResolutionError",makeSelfResolutionError);_dereq_("./method")(Promise,INTERNAL,tryConvertToPromise,apiRejection,debug);_dereq_("./bind")(Promise,INTERNAL,tryConvertToPromise,debug);_dereq_("./cancel")(Promise,PromiseArray,apiRejection,debug);_dereq_("./direct_resolve")(Promise);_dereq_("./synchronous_inspection")(Promise);_dereq_("./join")(Promise,PromiseArray,tryConvertToPromise,INTERNAL,async,getDomain);Promise.Promise=Promise;Promise.version="3.4.6";_dereq_('./map.js')(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL,debug);_dereq_('./call_get.js')(Promise);_dereq_('./using.js')(Promise,apiRejection,tryConvertToPromise,createContext,INTERNAL,debug);_dereq_('./timers.js')(Promise,INTERNAL,debug);_dereq_('./generators.js')(Promise,apiRejection,INTERNAL,tryConvertToPromise,Proxyable,debug);_dereq_('./nodeify.js')(Promise);_dereq_('./promisify.js')(Promise,INTERNAL);_dereq_('./props.js')(Promise,PromiseArray,tryConvertToPromise,apiRejection);_dereq_('./race.js')(Promise,INTERNAL,tryConvertToPromise,apiRejection);_dereq_('./reduce.js')(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL,debug);_dereq_('./settle.js')(Promise,PromiseArray,debug);_dereq_('./some.js')(Promise,PromiseArray,apiRejection);_dereq_('./filter.js')(Promise,INTERNAL);_dereq_('./each.js')(Promise,INTERNAL);_dereq_('./any.js')(Promise);util.toFastProperties(Promise);util.toFastProperties(Promise.prototype);function fillTypes(value){var p=new Promise(INTERNAL);p._fulfillmentHandler0=value;p._rejectionHandler0=value;p._promise0=value;p._receiver0=value;}// Complete slack tracking, opt out of field-type tracking and           
	// stabilize map                                                         
	fillTypes({a:1});fillTypes({b:2});fillTypes({c:3});fillTypes(1);fillTypes(function(){});fillTypes(undefined);fillTypes(false);fillTypes(new Promise(INTERNAL));debug.setBounds(Async.firstLineError,util.lastLineError);return Promise;};},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL,tryConvertToPromise,apiRejection,Proxyable){var util=_dereq_("./util");var isArray=util.isArray;function toResolutionValue(val){switch(val){case-2:return[];case-3:return{};}}function PromiseArray(values){var promise=this._promise=new Promise(INTERNAL);if(values instanceof Promise){promise._propagateFrom(values,3);}promise._setOnCancel(this);this._values=values;this._length=0;this._totalResolved=0;this._init(undefined,-2);}util.inherits(PromiseArray,Proxyable);PromiseArray.prototype.length=function(){return this._length;};PromiseArray.prototype.promise=function(){return this._promise;};PromiseArray.prototype._init=function init(_,resolveValueIfEmpty){var values=tryConvertToPromise(this._values,this._promise);if(values instanceof Promise){values=values._target();var bitField=values._bitField;;this._values=values;if((bitField&50397184)===0){this._promise._setAsyncGuaranteed();return values._then(init,this._reject,undefined,this,resolveValueIfEmpty);}else if((bitField&33554432)!==0){values=values._value();}else if((bitField&16777216)!==0){return this._reject(values._reason());}else{return this._cancel();}}values=util.asArray(values);if(values===null){var err=apiRejection("expecting an array or an iterable object but got "+util.classString(values)).reason();this._promise._rejectCallback(err,false);return;}if(values.length===0){if(resolveValueIfEmpty===-5){this._resolveEmptyArray();}else{this._resolve(toResolutionValue(resolveValueIfEmpty));}return;}this._iterate(values);};PromiseArray.prototype._iterate=function(values){var len=this.getActualLength(values.length);this._length=len;this._values=this.shouldCopyValues()?new Array(len):this._values;var result=this._promise;var isResolved=false;var bitField=null;for(var i=0;i<len;++i){var maybePromise=tryConvertToPromise(values[i],result);if(maybePromise instanceof Promise){maybePromise=maybePromise._target();bitField=maybePromise._bitField;}else{bitField=null;}if(isResolved){if(bitField!==null){maybePromise.suppressUnhandledRejections();}}else if(bitField!==null){if((bitField&50397184)===0){maybePromise._proxy(this,i);this._values[i]=maybePromise;}else if((bitField&33554432)!==0){isResolved=this._promiseFulfilled(maybePromise._value(),i);}else if((bitField&16777216)!==0){isResolved=this._promiseRejected(maybePromise._reason(),i);}else{isResolved=this._promiseCancelled(i);}}else{isResolved=this._promiseFulfilled(maybePromise,i);}}if(!isResolved)result._setAsyncGuaranteed();};PromiseArray.prototype._isResolved=function(){return this._values===null;};PromiseArray.prototype._resolve=function(value){this._values=null;this._promise._fulfill(value);};PromiseArray.prototype._cancel=function(){if(this._isResolved()||!this._promise._isCancellable())return;this._values=null;this._promise._cancel();};PromiseArray.prototype._reject=function(reason){this._values=null;this._promise._rejectCallback(reason,false);};PromiseArray.prototype._promiseFulfilled=function(value,index){this._values[index]=value;var totalResolved=++this._totalResolved;if(totalResolved>=this._length){this._resolve(this._values);return true;}return false;};PromiseArray.prototype._promiseCancelled=function(){this._cancel();return true;};PromiseArray.prototype._promiseRejected=function(reason){this._totalResolved++;this._reject(reason);return true;};PromiseArray.prototype._resultCancelled=function(){if(this._isResolved())return;var values=this._values;this._cancel();if(values instanceof Promise){values.cancel();}else{for(var i=0;i<values.length;++i){if(values[i]instanceof Promise){values[i].cancel();}}}};PromiseArray.prototype.shouldCopyValues=function(){return true;};PromiseArray.prototype.getActualLength=function(len){return len;};return PromiseArray;};},{"./util":36}],24:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL){var THIS={};var util=_dereq_("./util");var nodebackForPromise=_dereq_("./nodeback");var withAppended=util.withAppended;var maybeWrapAsError=util.maybeWrapAsError;var canEvaluate=util.canEvaluate;var TypeError=_dereq_("./errors").TypeError;var defaultSuffix="Async";var defaultPromisified={__isPromisified__:true};var noCopyProps=["arity","length","name","arguments","caller","callee","prototype","__isPromisified__"];var noCopyPropsPattern=new RegExp("^(?:"+noCopyProps.join("|")+")$");var defaultFilter=function defaultFilter(name){return util.isIdentifier(name)&&name.charAt(0)!=="_"&&name!=="constructor";};function propsFilter(key){return!noCopyPropsPattern.test(key);}function isPromisified(fn){try{return fn.__isPromisified__===true;}catch(e){return false;}}function hasPromisified(obj,key,suffix){var val=util.getDataPropertyOrDefault(obj,key+suffix,defaultPromisified);return val?isPromisified(val):false;}function checkValid(ret,suffix,suffixRegexp){for(var i=0;i<ret.length;i+=2){var key=ret[i];if(suffixRegexp.test(key)){var keyWithoutAsyncSuffix=key.replace(suffixRegexp,"");for(var j=0;j<ret.length;j+=2){if(ret[j]===keyWithoutAsyncSuffix){throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s",suffix));}}}}}function promisifiableMethods(obj,suffix,suffixRegexp,filter){var keys=util.inheritedDataKeys(obj);var ret=[];for(var i=0;i<keys.length;++i){var key=keys[i];var value=obj[key];var passesDefaultFilter=filter===defaultFilter?true:defaultFilter(key,value,obj);if(typeof value==="function"&&!isPromisified(value)&&!hasPromisified(obj,key,suffix)&&filter(key,value,obj,passesDefaultFilter)){ret.push(key,value);}}checkValid(ret,suffix,suffixRegexp);return ret;}var escapeIdentRegex=function escapeIdentRegex(str){return str.replace(/([$])/,"\\$");};var makeNodePromisifiedEval;if(false){var switchCaseArgumentOrder=function switchCaseArgumentOrder(likelyArgumentCount){var ret=[likelyArgumentCount];var min=Math.max(0,likelyArgumentCount-1-3);for(var i=likelyArgumentCount-1;i>=min;--i){ret.push(i);}for(var i=likelyArgumentCount+1;i<=3;++i){ret.push(i);}return ret;};var argumentSequence=function argumentSequence(argumentCount){return util.filledRange(argumentCount,"_arg","");};var parameterDeclaration=function parameterDeclaration(parameterCount){return util.filledRange(Math.max(parameterCount,3),"_arg","");};var parameterCount=function parameterCount(fn){if(typeof fn.length==="number"){return Math.max(Math.min(fn.length,1023+1),0);}return 0;};makeNodePromisifiedEval=function makeNodePromisifiedEval(callback,receiver,originalName,fn,_,multiArgs){var newParameterCount=Math.max(0,parameterCount(fn)-1);var argumentOrder=switchCaseArgumentOrder(newParameterCount);var shouldProxyThis=typeof callback==="string"||receiver===THIS;function generateCallForArgumentCount(count){var args=argumentSequence(count).join(", ");var comma=count>0?", ":"";var ret;if(shouldProxyThis){ret="ret = callback.call(this, {{args}}, nodeback); break;\n";}else{ret=receiver===undefined?"ret = callback({{args}}, nodeback); break;\n":"ret = callback.call(receiver, {{args}}, nodeback); break;\n";}return ret.replace("{{args}}",args).replace(", ",comma);}function generateArgumentSwitchCase(){var ret="";for(var i=0;i<argumentOrder.length;++i){ret+="case "+argumentOrder[i]+":"+generateCallForArgumentCount(argumentOrder[i]);}ret+="                                                             \n\
	        default:                                                             \n\
	            var args = new Array(len + 1);                                   \n\
	            var i = 0;                                                       \n\
	            for (var i = 0; i < len; ++i) {                                  \n\
	               args[i] = arguments[i];                                       \n\
	            }                                                                \n\
	            args[i] = nodeback;                                              \n\
	            [CodeForCall]                                                    \n\
	            break;                                                           \n\
	        ".replace("[CodeForCall]",shouldProxyThis?"ret = callback.apply(this, args);\n":"ret = callback.apply(receiver, args);\n");return ret;}var getFunctionCode=typeof callback==="string"?"this != null ? this['"+callback+"'] : fn":"fn";var body="'use strict';                                                \n\
	        var ret = function (Parameters) {                                    \n\
	            'use strict';                                                    \n\
	            var len = arguments.length;                                      \n\
	            var promise = new Promise(INTERNAL);                             \n\
	            promise._captureStackTrace();                                    \n\
	            var nodeback = nodebackForPromise(promise, "+multiArgs+");   \n\
	            var ret;                                                         \n\
	            var callback = tryCatch([GetFunctionCode]);                      \n\
	            switch(len) {                                                    \n\
	                [CodeForSwitchCase]                                          \n\
	            }                                                                \n\
	            if (ret === errorObj) {                                          \n\
	                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
	            }                                                                \n\
	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
	            return promise;                                                  \n\
	        };                                                                   \n\
	        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
	        return ret;                                                          \n\
	    ".replace("[CodeForSwitchCase]",generateArgumentSwitchCase()).replace("[GetFunctionCode]",getFunctionCode);body=body.replace("Parameters",parameterDeclaration(newParameterCount));return new Function("Promise","fn","receiver","withAppended","maybeWrapAsError","nodebackForPromise","tryCatch","errorObj","notEnumerableProp","INTERNAL",body)(Promise,fn,receiver,withAppended,maybeWrapAsError,nodebackForPromise,util.tryCatch,util.errorObj,util.notEnumerableProp,INTERNAL);};}function makeNodePromisifiedClosure(callback,receiver,_,fn,__,multiArgs){var defaultThis=function(){return this;}();var method=callback;if(typeof method==="string"){callback=fn;}function promisified(){var _receiver=receiver;if(receiver===THIS)_receiver=this;var promise=new Promise(INTERNAL);promise._captureStackTrace();var cb=typeof method==="string"&&this!==defaultThis?this[method]:callback;var fn=nodebackForPromise(promise,multiArgs);try{cb.apply(_receiver,withAppended(arguments,fn));}catch(e){promise._rejectCallback(maybeWrapAsError(e),true,true);}if(!promise._isFateSealed())promise._setAsyncGuaranteed();return promise;}util.notEnumerableProp(promisified,"__isPromisified__",true);return promisified;}var makeNodePromisified=canEvaluate?makeNodePromisifiedEval:makeNodePromisifiedClosure;function promisifyAll(obj,suffix,filter,promisifier,multiArgs){var suffixRegexp=new RegExp(escapeIdentRegex(suffix)+"$");var methods=promisifiableMethods(obj,suffix,suffixRegexp,filter);for(var i=0,len=methods.length;i<len;i+=2){var key=methods[i];var fn=methods[i+1];var promisifiedKey=key+suffix;if(promisifier===makeNodePromisified){obj[promisifiedKey]=makeNodePromisified(key,THIS,key,fn,suffix,multiArgs);}else{var promisified=promisifier(fn,function(){return makeNodePromisified(key,THIS,key,fn,suffix,multiArgs);});util.notEnumerableProp(promisified,"__isPromisified__",true);obj[promisifiedKey]=promisified;}}util.toFastProperties(obj);return obj;}function promisify(callback,receiver,multiArgs){return makeNodePromisified(callback,receiver,undefined,callback,null,multiArgs);}Promise.promisify=function(fn,options){if(typeof fn!=="function"){throw new TypeError("expecting a function but got "+util.classString(fn));}if(isPromisified(fn)){return fn;}options=Object(options);var receiver=options.context===undefined?THIS:options.context;var multiArgs=!!options.multiArgs;var ret=promisify(fn,receiver,multiArgs);util.copyDescriptors(fn,ret,propsFilter);return ret;};Promise.promisifyAll=function(target,options){if(typeof target!=="function"&&(typeof target==="undefined"?"undefined":_typeof(target))!=="object"){throw new TypeError("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");}options=Object(options);var multiArgs=!!options.multiArgs;var suffix=options.suffix;if(typeof suffix!=="string")suffix=defaultSuffix;var filter=options.filter;if(typeof filter!=="function")filter=defaultFilter;var promisifier=options.promisifier;if(typeof promisifier!=="function")promisifier=makeNodePromisified;if(!util.isIdentifier(suffix)){throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");}var keys=util.inheritedDataKeys(target);for(var i=0;i<keys.length;++i){var value=target[keys[i]];if(keys[i]!=="constructor"&&util.isClass(value)){promisifyAll(value.prototype,suffix,filter,promisifier,multiArgs);promisifyAll(value,suffix,filter,promisifier,multiArgs);}}return promisifyAll(target,suffix,filter,promisifier,multiArgs);};};},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,tryConvertToPromise,apiRejection){var util=_dereq_("./util");var isObject=util.isObject;var es5=_dereq_("./es5");var Es6Map;if(typeof Map==="function")Es6Map=Map;var mapToEntries=function(){var index=0;var size=0;function extractEntry(value,key){this[index]=value;this[index+size]=key;index++;}return function mapToEntries(map){size=map.size;index=0;var ret=new Array(map.size*2);map.forEach(extractEntry,ret);return ret;};}();var entriesToMap=function entriesToMap(entries){var ret=new Es6Map();var length=entries.length/2|0;for(var i=0;i<length;++i){var key=entries[length+i];var value=entries[i];ret.set(key,value);}return ret;};function PropertiesPromiseArray(obj){var isMap=false;var entries;if(Es6Map!==undefined&&obj instanceof Es6Map){entries=mapToEntries(obj);isMap=true;}else{var keys=es5.keys(obj);var len=keys.length;entries=new Array(len*2);for(var i=0;i<len;++i){var key=keys[i];entries[i]=obj[key];entries[i+len]=key;}}this.constructor$(entries);this._isMap=isMap;this._init$(undefined,-3);}util.inherits(PropertiesPromiseArray,PromiseArray);PropertiesPromiseArray.prototype._init=function(){};PropertiesPromiseArray.prototype._promiseFulfilled=function(value,index){this._values[index]=value;var totalResolved=++this._totalResolved;if(totalResolved>=this._length){var val;if(this._isMap){val=entriesToMap(this._values);}else{val={};var keyOffset=this.length();for(var i=0,len=this.length();i<len;++i){val[this._values[i+keyOffset]]=this._values[i];}}this._resolve(val);return true;}return false;};PropertiesPromiseArray.prototype.shouldCopyValues=function(){return false;};PropertiesPromiseArray.prototype.getActualLength=function(len){return len>>1;};function props(promises){var ret;var castValue=tryConvertToPromise(promises);if(!isObject(castValue)){return apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");}else if(castValue instanceof Promise){ret=castValue._then(Promise.props,undefined,undefined,undefined,undefined);}else{ret=new PropertiesPromiseArray(castValue).promise();}if(castValue instanceof Promise){ret._propagateFrom(castValue,2);}return ret;}Promise.prototype.props=function(){return props(this);};Promise.props=function(promises){return props(promises);};};},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){"use strict";function arrayMove(src,srcIndex,dst,dstIndex,len){for(var j=0;j<len;++j){dst[j+dstIndex]=src[j+srcIndex];src[j+srcIndex]=void 0;}}function Queue(capacity){this._capacity=capacity;this._length=0;this._front=0;}Queue.prototype._willBeOverCapacity=function(size){return this._capacity<size;};Queue.prototype._pushOne=function(arg){var length=this.length();this._checkCapacity(length+1);var i=this._front+length&this._capacity-1;this[i]=arg;this._length=length+1;};Queue.prototype._unshiftOne=function(value){var capacity=this._capacity;this._checkCapacity(this.length()+1);var front=this._front;var i=(front-1&capacity-1^capacity)-capacity;this[i]=value;this._front=i;this._length=this.length()+1;};Queue.prototype.unshift=function(fn,receiver,arg){this._unshiftOne(arg);this._unshiftOne(receiver);this._unshiftOne(fn);};Queue.prototype.push=function(fn,receiver,arg){var length=this.length()+3;if(this._willBeOverCapacity(length)){this._pushOne(fn);this._pushOne(receiver);this._pushOne(arg);return;}var j=this._front+length-3;this._checkCapacity(length);var wrapMask=this._capacity-1;this[j+0&wrapMask]=fn;this[j+1&wrapMask]=receiver;this[j+2&wrapMask]=arg;this._length=length;};Queue.prototype.shift=function(){var front=this._front,ret=this[front];this[front]=undefined;this._front=front+1&this._capacity-1;this._length--;return ret;};Queue.prototype.length=function(){return this._length;};Queue.prototype._checkCapacity=function(size){if(this._capacity<size){this._resizeTo(this._capacity<<1);}};Queue.prototype._resizeTo=function(capacity){var oldCapacity=this._capacity;this._capacity=capacity;var front=this._front;var length=this._length;var moveItemsCount=front+length&oldCapacity-1;arrayMove(this,0,this,oldCapacity,moveItemsCount);};module.exports=Queue;},{}],27:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL,tryConvertToPromise,apiRejection){var util=_dereq_("./util");var raceLater=function raceLater(promise){return promise.then(function(array){return race(array,promise);});};function race(promises,parent){var maybePromise=tryConvertToPromise(promises);if(maybePromise instanceof Promise){return raceLater(maybePromise);}else{promises=util.asArray(promises);if(promises===null)return apiRejection("expecting an array or an iterable object but got "+util.classString(promises));}var ret=new Promise(INTERNAL);if(parent!==undefined){ret._propagateFrom(parent,3);}var fulfill=ret._fulfill;var reject=ret._reject;for(var i=0,len=promises.length;i<len;++i){var val=promises[i];if(val===undefined&&!(i in promises)){continue;}Promise.cast(val)._then(fulfill,reject,undefined,ret,null);}return ret;}Promise.race=function(promises){return race(promises,undefined);};Promise.prototype.race=function(){return race(this,undefined);};};},{"./util":36}],28:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL,debug){var getDomain=Promise._getDomain;var util=_dereq_("./util");var tryCatch=util.tryCatch;function ReductionPromiseArray(promises,fn,initialValue,_each){this.constructor$(promises);var domain=getDomain();this._fn=domain===null?fn:util.domainBind(domain,fn);if(initialValue!==undefined){initialValue=Promise.resolve(initialValue);initialValue._attachCancellationCallback(this);}this._initialValue=initialValue;this._currentCancellable=null;if(_each===INTERNAL){this._eachValues=Array(this._length);}else if(_each===0){this._eachValues=null;}else{this._eachValues=undefined;}this._promise._captureStackTrace();this._init$(undefined,-5);}util.inherits(ReductionPromiseArray,PromiseArray);ReductionPromiseArray.prototype._gotAccum=function(accum){if(this._eachValues!==undefined&&this._eachValues!==null&&accum!==INTERNAL){this._eachValues.push(accum);}};ReductionPromiseArray.prototype._eachComplete=function(value){if(this._eachValues!==null){this._eachValues.push(value);}return this._eachValues;};ReductionPromiseArray.prototype._init=function(){};ReductionPromiseArray.prototype._resolveEmptyArray=function(){this._resolve(this._eachValues!==undefined?this._eachValues:this._initialValue);};ReductionPromiseArray.prototype.shouldCopyValues=function(){return false;};ReductionPromiseArray.prototype._resolve=function(value){this._promise._resolveCallback(value);this._values=null;};ReductionPromiseArray.prototype._resultCancelled=function(sender){if(sender===this._initialValue)return this._cancel();if(this._isResolved())return;this._resultCancelled$();if(this._currentCancellable instanceof Promise){this._currentCancellable.cancel();}if(this._initialValue instanceof Promise){this._initialValue.cancel();}};ReductionPromiseArray.prototype._iterate=function(values){this._values=values;var value;var i;var length=values.length;if(this._initialValue!==undefined){value=this._initialValue;i=0;}else{value=Promise.resolve(values[0]);i=1;}this._currentCancellable=value;if(!value.isRejected()){for(;i<length;++i){var ctx={accum:null,value:values[i],index:i,length:length,array:this};value=value._then(gotAccum,undefined,undefined,ctx,undefined);}}if(this._eachValues!==undefined){value=value._then(this._eachComplete,undefined,undefined,this,undefined);}value._then(completed,completed,undefined,value,this);};Promise.prototype.reduce=function(fn,initialValue){return reduce(this,fn,initialValue,null);};Promise.reduce=function(promises,fn,initialValue,_each){return reduce(promises,fn,initialValue,_each);};function completed(valueOrReason,array){if(this.isFulfilled()){array._resolve(valueOrReason);}else{array._reject(valueOrReason);}}function reduce(promises,fn,initialValue,_each){if(typeof fn!=="function"){return apiRejection("expecting a function but got "+util.classString(fn));}var array=new ReductionPromiseArray(promises,fn,initialValue,_each);return array.promise();}function gotAccum(accum){this.accum=accum;this.array._gotAccum(accum);var value=tryConvertToPromise(this.value,this.array._promise);if(value instanceof Promise){this.array._currentCancellable=value;return value._then(gotValue,undefined,undefined,this,undefined);}else{return gotValue.call(this,value);}}function gotValue(value){var array=this.array;var promise=array._promise;var fn=tryCatch(array._fn);promise._pushContext();var ret;if(array._eachValues!==undefined){ret=fn.call(promise._boundValue(),value,this.index,this.length);}else{ret=fn.call(promise._boundValue(),this.accum,value,this.index,this.length);}if(ret instanceof Promise){array._currentCancellable=ret;}var promiseCreated=promise._popContext();debug.checkForgottenReturns(ret,promiseCreated,array._eachValues!==undefined?"Promise.each":"Promise.reduce",promise);return ret;}};},{"./util":36}],29:[function(_dereq_,module,exports){"use strict";var util=_dereq_("./util");var schedule;var noAsyncScheduler=function noAsyncScheduler(){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");};var NativePromise=util.getNativePromise();if(util.isNode&&typeof MutationObserver==="undefined"){var GlobalSetImmediate=global.setImmediate;var ProcessNextTick=process.nextTick;schedule=util.isRecentNode?function(fn){GlobalSetImmediate.call(global,fn);}:function(fn){ProcessNextTick.call(process,fn);};}else if(typeof NativePromise==="function"&&typeof NativePromise.resolve==="function"){var nativePromise=NativePromise.resolve();schedule=function schedule(fn){nativePromise.then(fn);};}else if(typeof MutationObserver!=="undefined"&&!(typeof window!=="undefined"&&window.navigator&&(window.navigator.standalone||window.cordova))){schedule=function(){var div=document.createElement("div");var opts={attributes:true};var toggleScheduled=false;var div2=document.createElement("div");var o2=new MutationObserver(function(){div.classList.toggle("foo");toggleScheduled=false;});o2.observe(div2,opts);var scheduleToggle=function scheduleToggle(){if(toggleScheduled)return;toggleScheduled=true;div2.classList.toggle("foo");};return function schedule(fn){var o=new MutationObserver(function(){o.disconnect();fn();});o.observe(div,opts);scheduleToggle();};}();}else if(typeof setImmediate!=="undefined"){schedule=function schedule(fn){setImmediate(fn);};}else if(typeof setTimeout!=="undefined"){schedule=function schedule(fn){setTimeout(fn,0);};}else{schedule=noAsyncScheduler;}module.exports=schedule;},{"./util":36}],30:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,debug){var PromiseInspection=Promise.PromiseInspection;var util=_dereq_("./util");function SettledPromiseArray(values){this.constructor$(values);}util.inherits(SettledPromiseArray,PromiseArray);SettledPromiseArray.prototype._promiseResolved=function(index,inspection){this._values[index]=inspection;var totalResolved=++this._totalResolved;if(totalResolved>=this._length){this._resolve(this._values);return true;}return false;};SettledPromiseArray.prototype._promiseFulfilled=function(value,index){var ret=new PromiseInspection();ret._bitField=33554432;ret._settledValueField=value;return this._promiseResolved(index,ret);};SettledPromiseArray.prototype._promiseRejected=function(reason,index){var ret=new PromiseInspection();ret._bitField=16777216;ret._settledValueField=reason;return this._promiseResolved(index,ret);};Promise.settle=function(promises){debug.deprecated(".settle()",".reflect()");return new SettledPromiseArray(promises).promise();};Promise.prototype.settle=function(){return Promise.settle(this);};};},{"./util":36}],31:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,apiRejection){var util=_dereq_("./util");var RangeError=_dereq_("./errors").RangeError;var AggregateError=_dereq_("./errors").AggregateError;var isArray=util.isArray;var CANCELLATION={};function SomePromiseArray(values){this.constructor$(values);this._howMany=0;this._unwrap=false;this._initialized=false;}util.inherits(SomePromiseArray,PromiseArray);SomePromiseArray.prototype._init=function(){if(!this._initialized){return;}if(this._howMany===0){this._resolve([]);return;}this._init$(undefined,-5);var isArrayResolved=isArray(this._values);if(!this._isResolved()&&isArrayResolved&&this._howMany>this._canPossiblyFulfill()){this._reject(this._getRangeError(this.length()));}};SomePromiseArray.prototype.init=function(){this._initialized=true;this._init();};SomePromiseArray.prototype.setUnwrap=function(){this._unwrap=true;};SomePromiseArray.prototype.howMany=function(){return this._howMany;};SomePromiseArray.prototype.setHowMany=function(count){this._howMany=count;};SomePromiseArray.prototype._promiseFulfilled=function(value){this._addFulfilled(value);if(this._fulfilled()===this.howMany()){this._values.length=this.howMany();if(this.howMany()===1&&this._unwrap){this._resolve(this._values[0]);}else{this._resolve(this._values);}return true;}return false;};SomePromiseArray.prototype._promiseRejected=function(reason){this._addRejected(reason);return this._checkOutcome();};SomePromiseArray.prototype._promiseCancelled=function(){if(this._values instanceof Promise||this._values==null){return this._cancel();}this._addRejected(CANCELLATION);return this._checkOutcome();};SomePromiseArray.prototype._checkOutcome=function(){if(this.howMany()>this._canPossiblyFulfill()){var e=new AggregateError();for(var i=this.length();i<this._values.length;++i){if(this._values[i]!==CANCELLATION){e.push(this._values[i]);}}if(e.length>0){this._reject(e);}else{this._cancel();}return true;}return false;};SomePromiseArray.prototype._fulfilled=function(){return this._totalResolved;};SomePromiseArray.prototype._rejected=function(){return this._values.length-this.length();};SomePromiseArray.prototype._addRejected=function(reason){this._values.push(reason);};SomePromiseArray.prototype._addFulfilled=function(value){this._values[this._totalResolved++]=value;};SomePromiseArray.prototype._canPossiblyFulfill=function(){return this.length()-this._rejected();};SomePromiseArray.prototype._getRangeError=function(count){var message="Input array must contain at least "+this._howMany+" items but contains only "+count+" items";return new RangeError(message);};SomePromiseArray.prototype._resolveEmptyArray=function(){this._reject(this._getRangeError(0));};function some(promises,howMany){if((howMany|0)!==howMany||howMany<0){return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");}var ret=new SomePromiseArray(promises);var promise=ret.promise();ret.setHowMany(howMany);ret.init();return promise;}Promise.some=function(promises,howMany){return some(promises,howMany);};Promise.prototype.some=function(howMany){return some(this,howMany);};Promise._SomePromiseArray=SomePromiseArray;};},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise){function PromiseInspection(promise){if(promise!==undefined){promise=promise._target();this._bitField=promise._bitField;this._settledValueField=promise._isFateSealed()?promise._settledValue():undefined;}else{this._bitField=0;this._settledValueField=undefined;}}PromiseInspection.prototype._settledValue=function(){return this._settledValueField;};var value=PromiseInspection.prototype.value=function(){if(!this.isFulfilled()){throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");}return this._settledValue();};var reason=PromiseInspection.prototype.error=PromiseInspection.prototype.reason=function(){if(!this.isRejected()){throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");}return this._settledValue();};var isFulfilled=PromiseInspection.prototype.isFulfilled=function(){return(this._bitField&33554432)!==0;};var isRejected=PromiseInspection.prototype.isRejected=function(){return(this._bitField&16777216)!==0;};var isPending=PromiseInspection.prototype.isPending=function(){return(this._bitField&50397184)===0;};var isResolved=PromiseInspection.prototype.isResolved=function(){return(this._bitField&50331648)!==0;};PromiseInspection.prototype.isCancelled=function(){return(this._bitField&8454144)!==0;};Promise.prototype.__isCancelled=function(){return(this._bitField&65536)===65536;};Promise.prototype._isCancelled=function(){return this._target().__isCancelled();};Promise.prototype.isCancelled=function(){return(this._target()._bitField&8454144)!==0;};Promise.prototype.isPending=function(){return isPending.call(this._target());};Promise.prototype.isRejected=function(){return isRejected.call(this._target());};Promise.prototype.isFulfilled=function(){return isFulfilled.call(this._target());};Promise.prototype.isResolved=function(){return isResolved.call(this._target());};Promise.prototype.value=function(){return value.call(this._target());};Promise.prototype.reason=function(){var target=this._target();target._unsetRejectionIsUnhandled();return reason.call(target);};Promise.prototype._value=function(){return this._settledValue();};Promise.prototype._reason=function(){this._unsetRejectionIsUnhandled();return this._settledValue();};Promise.PromiseInspection=PromiseInspection;};},{}],33:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL){var util=_dereq_("./util");var errorObj=util.errorObj;var isObject=util.isObject;function tryConvertToPromise(obj,context){if(isObject(obj)){if(obj instanceof Promise)return obj;var then=getThen(obj);if(then===errorObj){if(context)context._pushContext();var ret=Promise.reject(then.e);if(context)context._popContext();return ret;}else if(typeof then==="function"){if(isAnyBluebirdPromise(obj)){var ret=new Promise(INTERNAL);obj._then(ret._fulfill,ret._reject,undefined,ret,null);return ret;}return doThenable(obj,then,context);}}return obj;}function doGetThen(obj){return obj.then;}function getThen(obj){try{return doGetThen(obj);}catch(e){errorObj.e=e;return errorObj;}}var hasProp={}.hasOwnProperty;function isAnyBluebirdPromise(obj){try{return hasProp.call(obj,"_promise0");}catch(e){return false;}}function doThenable(x,then,context){var promise=new Promise(INTERNAL);var ret=promise;if(context)context._pushContext();promise._captureStackTrace();if(context)context._popContext();var synchronous=true;var result=util.tryCatch(then).call(x,resolve,reject);synchronous=false;if(promise&&result===errorObj){promise._rejectCallback(result.e,true,true);promise=null;}function resolve(value){if(!promise)return;promise._resolveCallback(value);promise=null;}function reject(reason){if(!promise)return;promise._rejectCallback(reason,synchronous,true);promise=null;}return ret;}return tryConvertToPromise;};},{"./util":36}],34:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL,debug){var util=_dereq_("./util");var TimeoutError=Promise.TimeoutError;function HandleWrapper(handle){this.handle=handle;}HandleWrapper.prototype._resultCancelled=function(){clearTimeout(this.handle);};var afterValue=function afterValue(value){return delay(+this).thenReturn(value);};var delay=Promise.delay=function(ms,value){var ret;var handle;if(value!==undefined){ret=Promise.resolve(value)._then(afterValue,null,null,ms,undefined);if(debug.cancellation()&&value instanceof Promise){ret._setOnCancel(value);}}else{ret=new Promise(INTERNAL);handle=setTimeout(function(){ret._fulfill();},+ms);if(debug.cancellation()){ret._setOnCancel(new HandleWrapper(handle));}ret._captureStackTrace();}ret._setAsyncGuaranteed();return ret;};Promise.prototype.delay=function(ms){return delay(ms,this);};var afterTimeout=function afterTimeout(promise,message,parent){var err;if(typeof message!=="string"){if(message instanceof Error){err=message;}else{err=new TimeoutError("operation timed out");}}else{err=new TimeoutError(message);}util.markAsOriginatingFromRejection(err);promise._attachExtraTrace(err);promise._reject(err);if(parent!=null){parent.cancel();}};function successClear(value){clearTimeout(this.handle);return value;}function failureClear(reason){clearTimeout(this.handle);throw reason;}Promise.prototype.timeout=function(ms,message){ms=+ms;var ret,parent;var handleWrapper=new HandleWrapper(setTimeout(function timeoutTimeout(){if(ret.isPending()){afterTimeout(ret,message,parent);}},ms));if(debug.cancellation()){parent=this.then();ret=parent._then(successClear,failureClear,undefined,handleWrapper,undefined);ret._setOnCancel(handleWrapper);}else{ret=this._then(successClear,failureClear,undefined,handleWrapper,undefined);}return ret;};};},{"./util":36}],35:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,apiRejection,tryConvertToPromise,createContext,INTERNAL,debug){var util=_dereq_("./util");var TypeError=_dereq_("./errors").TypeError;var inherits=_dereq_("./util").inherits;var errorObj=util.errorObj;var tryCatch=util.tryCatch;var NULL={};function thrower(e){setTimeout(function(){throw e;},0);}function castPreservingDisposable(thenable){var maybePromise=tryConvertToPromise(thenable);if(maybePromise!==thenable&&typeof thenable._isDisposable==="function"&&typeof thenable._getDisposer==="function"&&thenable._isDisposable()){maybePromise._setDisposable(thenable._getDisposer());}return maybePromise;}function dispose(resources,inspection){var i=0;var len=resources.length;var ret=new Promise(INTERNAL);function iterator(){if(i>=len)return ret._fulfill();var maybePromise=castPreservingDisposable(resources[i++]);if(maybePromise instanceof Promise&&maybePromise._isDisposable()){try{maybePromise=tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection),resources.promise);}catch(e){return thrower(e);}if(maybePromise instanceof Promise){return maybePromise._then(iterator,thrower,null,null,null);}}iterator();}iterator();return ret;}function Disposer(data,promise,context){this._data=data;this._promise=promise;this._context=context;}Disposer.prototype.data=function(){return this._data;};Disposer.prototype.promise=function(){return this._promise;};Disposer.prototype.resource=function(){if(this.promise().isFulfilled()){return this.promise().value();}return NULL;};Disposer.prototype.tryDispose=function(inspection){var resource=this.resource();var context=this._context;if(context!==undefined)context._pushContext();var ret=resource!==NULL?this.doDispose(resource,inspection):null;if(context!==undefined)context._popContext();this._promise._unsetDisposable();this._data=null;return ret;};Disposer.isDisposer=function(d){return d!=null&&typeof d.resource==="function"&&typeof d.tryDispose==="function";};function FunctionDisposer(fn,promise,context){this.constructor$(fn,promise,context);}inherits(FunctionDisposer,Disposer);FunctionDisposer.prototype.doDispose=function(resource,inspection){var fn=this.data();return fn.call(resource,resource,inspection);};function maybeUnwrapDisposer(value){if(Disposer.isDisposer(value)){this.resources[this.index]._setDisposable(value);return value.promise();}return value;}function ResourceList(length){this.length=length;this.promise=null;this[length-1]=null;}ResourceList.prototype._resultCancelled=function(){var len=this.length;for(var i=0;i<len;++i){var item=this[i];if(item instanceof Promise){item.cancel();}}};Promise.using=function(){var len=arguments.length;if(len<2)return apiRejection("you must pass at least 2 arguments to Promise.using");var fn=arguments[len-1];if(typeof fn!=="function"){return apiRejection("expecting a function but got "+util.classString(fn));}var input;var spreadArgs=true;if(len===2&&Array.isArray(arguments[0])){input=arguments[0];len=input.length;spreadArgs=false;}else{input=arguments;len--;}var resources=new ResourceList(len);for(var i=0;i<len;++i){var resource=input[i];if(Disposer.isDisposer(resource)){var disposer=resource;resource=resource.promise();resource._setDisposable(disposer);}else{var maybePromise=tryConvertToPromise(resource);if(maybePromise instanceof Promise){resource=maybePromise._then(maybeUnwrapDisposer,null,null,{resources:resources,index:i},undefined);}}resources[i]=resource;}var reflectedResources=new Array(resources.length);for(var i=0;i<reflectedResources.length;++i){reflectedResources[i]=Promise.resolve(resources[i]).reflect();}var resultPromise=Promise.all(reflectedResources).then(function(inspections){for(var i=0;i<inspections.length;++i){var inspection=inspections[i];if(inspection.isRejected()){errorObj.e=inspection.error();return errorObj;}else if(!inspection.isFulfilled()){resultPromise.cancel();return;}inspections[i]=inspection.value();}promise._pushContext();fn=tryCatch(fn);var ret=spreadArgs?fn.apply(undefined,inspections):fn(inspections);var promiseCreated=promise._popContext();debug.checkForgottenReturns(ret,promiseCreated,"Promise.using",promise);return ret;});var promise=resultPromise.lastly(function(){var inspection=new Promise.PromiseInspection(resultPromise);return dispose(resources,inspection);});resources.promise=promise;promise._setOnCancel(resources);return promise;};Promise.prototype._setDisposable=function(disposer){this._bitField=this._bitField|131072;this._disposer=disposer;};Promise.prototype._isDisposable=function(){return(this._bitField&131072)>0;};Promise.prototype._getDisposer=function(){return this._disposer;};Promise.prototype._unsetDisposable=function(){this._bitField=this._bitField&~131072;this._disposer=undefined;};Promise.prototype.disposer=function(fn){if(typeof fn==="function"){return new FunctionDisposer(fn,this,createContext());}throw new TypeError();};};},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){"use strict";var es5=_dereq_("./es5");var canEvaluate=typeof navigator=="undefined";var errorObj={e:{}};var tryCatchTarget;var globalObject=typeof self!=="undefined"?self:typeof window!=="undefined"?window:typeof global!=="undefined"?global:this!==undefined?this:null;function tryCatcher(){try{var target=tryCatchTarget;tryCatchTarget=null;return target.apply(this,arguments);}catch(e){errorObj.e=e;return errorObj;}}function tryCatch(fn){tryCatchTarget=fn;return tryCatcher;}var inherits=function inherits(Child,Parent){var hasProp={}.hasOwnProperty;function T(){this.constructor=Child;this.constructor$=Parent;for(var propertyName in Parent.prototype){if(hasProp.call(Parent.prototype,propertyName)&&propertyName.charAt(propertyName.length-1)!=="$"){this[propertyName+"$"]=Parent.prototype[propertyName];}}}T.prototype=Parent.prototype;Child.prototype=new T();return Child.prototype;};function isPrimitive(val){return val==null||val===true||val===false||typeof val==="string"||typeof val==="number";}function isObject(value){return typeof value==="function"||(typeof value==="undefined"?"undefined":_typeof(value))==="object"&&value!==null;}function maybeWrapAsError(maybeError){if(!isPrimitive(maybeError))return maybeError;return new Error(safeToString(maybeError));}function withAppended(target,appendee){var len=target.length;var ret=new Array(len+1);var i;for(i=0;i<len;++i){ret[i]=target[i];}ret[i]=appendee;return ret;}function getDataPropertyOrDefault(obj,key,defaultValue){if(es5.isES5){var desc=Object.getOwnPropertyDescriptor(obj,key);if(desc!=null){return desc.get==null&&desc.set==null?desc.value:defaultValue;}}else{return{}.hasOwnProperty.call(obj,key)?obj[key]:undefined;}}function notEnumerableProp(obj,name,value){if(isPrimitive(obj))return obj;var descriptor={value:value,configurable:true,enumerable:false,writable:true};es5.defineProperty(obj,name,descriptor);return obj;}function thrower(r){throw r;}var inheritedDataKeys=function(){var excludedPrototypes=[Array.prototype,Object.prototype,Function.prototype];var isExcludedProto=function isExcludedProto(val){for(var i=0;i<excludedPrototypes.length;++i){if(excludedPrototypes[i]===val){return true;}}return false;};if(es5.isES5){var getKeys=Object.getOwnPropertyNames;return function(obj){var ret=[];var visitedKeys=Object.create(null);while(obj!=null&&!isExcludedProto(obj)){var keys;try{keys=getKeys(obj);}catch(e){return ret;}for(var i=0;i<keys.length;++i){var key=keys[i];if(visitedKeys[key])continue;visitedKeys[key]=true;var desc=Object.getOwnPropertyDescriptor(obj,key);if(desc!=null&&desc.get==null&&desc.set==null){ret.push(key);}}obj=es5.getPrototypeOf(obj);}return ret;};}else{var hasProp={}.hasOwnProperty;return function(obj){if(isExcludedProto(obj))return[];var ret=[];/*jshint forin:false */enumeration:for(var key in obj){if(hasProp.call(obj,key)){ret.push(key);}else{for(var i=0;i<excludedPrototypes.length;++i){if(hasProp.call(excludedPrototypes[i],key)){continue enumeration;}}ret.push(key);}}return ret;};}}();var thisAssignmentPattern=/this\s*\.\s*\S+\s*=/;function isClass(fn){try{if(typeof fn==="function"){var keys=es5.names(fn.prototype);var hasMethods=es5.isES5&&keys.length>1;var hasMethodsOtherThanConstructor=keys.length>0&&!(keys.length===1&&keys[0]==="constructor");var hasThisAssignmentAndStaticMethods=thisAssignmentPattern.test(fn+"")&&es5.names(fn).length>0;if(hasMethods||hasMethodsOtherThanConstructor||hasThisAssignmentAndStaticMethods){return true;}}return false;}catch(e){return false;}}function toFastProperties(obj){/*jshint -W027,-W055,-W031*/function FakeConstructor(){}FakeConstructor.prototype=obj;var l=8;while(l--){new FakeConstructor();}return obj;eval(obj);}var rident=/^[a-z$_][a-z$_0-9]*$/i;function isIdentifier(str){return rident.test(str);}function filledRange(count,prefix,suffix){var ret=new Array(count);for(var i=0;i<count;++i){ret[i]=prefix+i+suffix;}return ret;}function safeToString(obj){try{return obj+"";}catch(e){return"[no string representation]";}}function isError(obj){return obj!==null&&(typeof obj==="undefined"?"undefined":_typeof(obj))==="object"&&typeof obj.message==="string"&&typeof obj.name==="string";}function markAsOriginatingFromRejection(e){try{notEnumerableProp(e,"isOperational",true);}catch(ignore){}}function originatesFromRejection(e){if(e==null)return false;return e instanceof Error["__BluebirdErrorTypes__"].OperationalError||e["isOperational"]===true;}function canAttachTrace(obj){return isError(obj)&&es5.propertyIsWritable(obj,"stack");}var ensureErrorObject=function(){if(!("stack"in new Error())){return function(value){if(canAttachTrace(value))return value;try{throw new Error(safeToString(value));}catch(err){return err;}};}else{return function(value){if(canAttachTrace(value))return value;return new Error(safeToString(value));};}}();function classString(obj){return{}.toString.call(obj);}function copyDescriptors(from,to,filter){var keys=es5.names(from);for(var i=0;i<keys.length;++i){var key=keys[i];if(filter(key)){try{es5.defineProperty(to,key,es5.getDescriptor(from,key));}catch(ignore){}}}}var asArray=function asArray(v){if(es5.isArray(v)){return v;}return null;};if(typeof Symbol!=="undefined"&&Symbol.iterator){var ArrayFrom=typeof Array.from==="function"?function(v){return Array.from(v);}:function(v){var ret=[];var it=v[Symbol.iterator]();var itResult;while(!(itResult=it.next()).done){ret.push(itResult.value);}return ret;};asArray=function asArray(v){if(es5.isArray(v)){return v;}else if(v!=null&&typeof v[Symbol.iterator]==="function"){return ArrayFrom(v);}return null;};}var isNode=typeof process!=="undefined"&&classString(process).toLowerCase()==="[object process]";function env(key,def){return isNode?process.env[key]:def;}function getNativePromise(){if(typeof Promise==="function"){try{var promise=new Promise(function(){});if({}.toString.call(promise)==="[object Promise]"){return Promise;}}catch(e){}}}function domainBind(self,cb){return self.bind(cb);}var ret={isClass:isClass,isIdentifier:isIdentifier,inheritedDataKeys:inheritedDataKeys,getDataPropertyOrDefault:getDataPropertyOrDefault,thrower:thrower,isArray:es5.isArray,asArray:asArray,notEnumerableProp:notEnumerableProp,isPrimitive:isPrimitive,isObject:isObject,isError:isError,canEvaluate:canEvaluate,errorObj:errorObj,tryCatch:tryCatch,inherits:inherits,withAppended:withAppended,maybeWrapAsError:maybeWrapAsError,toFastProperties:toFastProperties,filledRange:filledRange,toString:safeToString,canAttachTrace:canAttachTrace,ensureErrorObject:ensureErrorObject,originatesFromRejection:originatesFromRejection,markAsOriginatingFromRejection:markAsOriginatingFromRejection,classString:classString,copyDescriptors:copyDescriptors,hasDevTools:typeof chrome!=="undefined"&&chrome&&typeof chrome.loadTimes==="function",isNode:isNode,env:env,global:globalObject,getNativePromise:getNativePromise,domainBind:domainBind};ret.isRecentNode=ret.isNode&&function(){var version=process.versions.node.split(".").map(Number);return version[0]===0&&version[1]>10||version[0]>0;}();if(ret.isNode)ret.toFastProperties(process);try{throw new Error();}catch(e){ret.lastLineError=e;}module.exports=ret;},{"./es5":13}]},{},[4])(4);});;if(typeof window!=='undefined'&&window!==null){window.P=window.Promise;}else if(typeof self!=='undefined'&&self!==null){self.P=self.Promise;}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13), (function() { return this; }()), __webpack_require__(14).setImmediate))

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {"use strict";

	var nextTick = __webpack_require__(13).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function () {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function () {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout = exports.clearInterval = function (timeout) {
	  timeout.close();
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function () {};
	Timeout.prototype.close = function () {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function (item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function (item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function (item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout) item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14).setImmediate, __webpack_require__(14).clearImmediate))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */

	;(function () {

	  /**
	   * Block-Level Grammar
	   */

	  var block = {
	    newline: /^\n+/,
	    code: /^( {4}[^\n]+\n*)+/,
	    fences: noop,
	    hr: /^( *[-*_]){3,} *(?:\n+|$)/,
	    heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
	    nptable: noop,
	    lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
	    blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
	    list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
	    html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
	    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
	    table: noop,
	    paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
	    text: /^[^\n]+/
	  };

	  block.bullet = /(?:[*+-]|\d+\.)/;
	  block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
	  block.item = replace(block.item, 'gm')(/bull/g, block.bullet)();

	  block.list = replace(block.list)(/bull/g, block.bullet)('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')('def', '\\n+(?=' + block.def.source + ')')();

	  block.blockquote = replace(block.blockquote)('def', block.def)();

	  block._tag = '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code' + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo' + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

	  block.html = replace(block.html)('comment', /<!--[\s\S]*?-->/)('closed', /<(tag)[\s\S]+?<\/\1>/)('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, block._tag)();

	  block.paragraph = replace(block.paragraph)('hr', block.hr)('heading', block.heading)('lheading', block.lheading)('blockquote', block.blockquote)('tag', '<' + block._tag)('def', block.def)();

	  /**
	   * Normal Block Grammar
	   */

	  block.normal = merge({}, block);

	  /**
	   * GFM Block Grammar
	   */

	  block.gfm = merge({}, block.normal, {
	    fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
	    paragraph: /^/,
	    heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
	  });

	  block.gfm.paragraph = replace(block.paragraph)('(?!', '(?!' + block.gfm.fences.source.replace('\\1', '\\2') + '|' + block.list.source.replace('\\1', '\\3') + '|')();

	  /**
	   * GFM + Tables Block Grammar
	   */

	  block.tables = merge({}, block.gfm, {
	    nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
	    table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	  });

	  /**
	   * Block Lexer
	   */

	  function Lexer(options) {
	    this.tokens = [];
	    this.tokens.links = {};
	    this.options = options || marked.defaults;
	    this.rules = block.normal;

	    if (this.options.gfm) {
	      if (this.options.tables) {
	        this.rules = block.tables;
	      } else {
	        this.rules = block.gfm;
	      }
	    }
	  }

	  /**
	   * Expose Block Rules
	   */

	  Lexer.rules = block;

	  /**
	   * Static Lex Method
	   */

	  Lexer.lex = function (src, options) {
	    var lexer = new Lexer(options);
	    return lexer.lex(src);
	  };

	  /**
	   * Preprocessing
	   */

	  Lexer.prototype.lex = function (src) {
	    src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ').replace(/\u00a0/g, ' ').replace(/\u2424/g, '\n');

	    return this.token(src, true);
	  };

	  /**
	   * Lexing
	   */

	  Lexer.prototype.token = function (src, top, bq) {
	    var src = src.replace(/^ +$/gm, ''),
	        next,
	        loose,
	        cap,
	        bull,
	        b,
	        item,
	        space,
	        i,
	        l;

	    while (src) {
	      // newline
	      if (cap = this.rules.newline.exec(src)) {
	        src = src.substring(cap[0].length);
	        if (cap[0].length > 1) {
	          this.tokens.push({
	            type: 'space'
	          });
	        }
	      }

	      // code
	      if (cap = this.rules.code.exec(src)) {
	        src = src.substring(cap[0].length);
	        cap = cap[0].replace(/^ {4}/gm, '');
	        this.tokens.push({
	          type: 'code',
	          text: !this.options.pedantic ? cap.replace(/\n+$/, '') : cap
	        });
	        continue;
	      }

	      // fences (gfm)
	      if (cap = this.rules.fences.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'code',
	          lang: cap[2],
	          text: cap[3] || ''
	        });
	        continue;
	      }

	      // heading
	      if (cap = this.rules.heading.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'heading',
	          depth: cap[1].length,
	          text: cap[2]
	        });
	        continue;
	      }

	      // table no leading pipe (gfm)
	      if (top && (cap = this.rules.nptable.exec(src))) {
	        src = src.substring(cap[0].length);

	        item = {
	          type: 'table',
	          header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	          cells: cap[3].replace(/\n$/, '').split('\n')
	        };

	        for (i = 0; i < item.align.length; i++) {
	          if (/^ *-+: *$/.test(item.align[i])) {
	            item.align[i] = 'right';
	          } else if (/^ *:-+: *$/.test(item.align[i])) {
	            item.align[i] = 'center';
	          } else if (/^ *:-+ *$/.test(item.align[i])) {
	            item.align[i] = 'left';
	          } else {
	            item.align[i] = null;
	          }
	        }

	        for (i = 0; i < item.cells.length; i++) {
	          item.cells[i] = item.cells[i].split(/ *\| */);
	        }

	        this.tokens.push(item);

	        continue;
	      }

	      // lheading
	      if (cap = this.rules.lheading.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'heading',
	          depth: cap[2] === '=' ? 1 : 2,
	          text: cap[1]
	        });
	        continue;
	      }

	      // hr
	      if (cap = this.rules.hr.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'hr'
	        });
	        continue;
	      }

	      // blockquote
	      if (cap = this.rules.blockquote.exec(src)) {
	        src = src.substring(cap[0].length);

	        this.tokens.push({
	          type: 'blockquote_start'
	        });

	        cap = cap[0].replace(/^ *> ?/gm, '');

	        // Pass `top` to keep the current
	        // "toplevel" state. This is exactly
	        // how markdown.pl works.
	        this.token(cap, top, true);

	        this.tokens.push({
	          type: 'blockquote_end'
	        });

	        continue;
	      }

	      // list
	      if (cap = this.rules.list.exec(src)) {
	        src = src.substring(cap[0].length);
	        bull = cap[2];

	        this.tokens.push({
	          type: 'list_start',
	          ordered: bull.length > 1
	        });

	        // Get each top-level item.
	        cap = cap[0].match(this.rules.item);

	        next = false;
	        l = cap.length;
	        i = 0;

	        for (; i < l; i++) {
	          item = cap[i];

	          // Remove the list item's bullet
	          // so it is seen as the next token.
	          space = item.length;
	          item = item.replace(/^ *([*+-]|\d+\.) +/, '');

	          // Outdent whatever the
	          // list item contains. Hacky.
	          if (~item.indexOf('\n ')) {
	            space -= item.length;
	            item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
	          }

	          // Determine whether the next list item belongs here.
	          // Backpedal if it does not belong in this list.
	          if (this.options.smartLists && i !== l - 1) {
	            b = block.bullet.exec(cap[i + 1])[0];
	            if (bull !== b && !(bull.length > 1 && b.length > 1)) {
	              src = cap.slice(i + 1).join('\n') + src;
	              i = l - 1;
	            }
	          }

	          // Determine whether item is loose or not.
	          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
	          // for discount behavior.
	          loose = next || /\n\n(?!\s*$)/.test(item);
	          if (i !== l - 1) {
	            next = item.charAt(item.length - 1) === '\n';
	            if (!loose) loose = next;
	          }

	          this.tokens.push({
	            type: loose ? 'loose_item_start' : 'list_item_start'
	          });

	          // Recurse.
	          this.token(item, false, bq);

	          this.tokens.push({
	            type: 'list_item_end'
	          });
	        }

	        this.tokens.push({
	          type: 'list_end'
	        });

	        continue;
	      }

	      // html
	      if (cap = this.rules.html.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: this.options.sanitize ? 'paragraph' : 'html',
	          pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
	          text: cap[0]
	        });
	        continue;
	      }

	      // def
	      if (!bq && top && (cap = this.rules.def.exec(src))) {
	        src = src.substring(cap[0].length);
	        this.tokens.links[cap[1].toLowerCase()] = {
	          href: cap[2],
	          title: cap[3]
	        };
	        continue;
	      }

	      // table (gfm)
	      if (top && (cap = this.rules.table.exec(src))) {
	        src = src.substring(cap[0].length);

	        item = {
	          type: 'table',
	          header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	          cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
	        };

	        for (i = 0; i < item.align.length; i++) {
	          if (/^ *-+: *$/.test(item.align[i])) {
	            item.align[i] = 'right';
	          } else if (/^ *:-+: *$/.test(item.align[i])) {
	            item.align[i] = 'center';
	          } else if (/^ *:-+ *$/.test(item.align[i])) {
	            item.align[i] = 'left';
	          } else {
	            item.align[i] = null;
	          }
	        }

	        for (i = 0; i < item.cells.length; i++) {
	          item.cells[i] = item.cells[i].replace(/^ *\| *| *\| *$/g, '').split(/ *\| */);
	        }

	        this.tokens.push(item);

	        continue;
	      }

	      // top-level paragraph
	      if (top && (cap = this.rules.paragraph.exec(src))) {
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'paragraph',
	          text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
	        });
	        continue;
	      }

	      // text
	      if (cap = this.rules.text.exec(src)) {
	        // Top-level should never reach here.
	        src = src.substring(cap[0].length);
	        this.tokens.push({
	          type: 'text',
	          text: cap[0]
	        });
	        continue;
	      }

	      if (src) {
	        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
	      }
	    }

	    return this.tokens;
	  };

	  /**
	   * Inline-Level Grammar
	   */

	  var inline = {
	    escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
	    autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
	    url: noop,
	    tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
	    link: /^!?\[(inside)\]\(href\)/,
	    reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
	    nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
	    strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
	    em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
	    code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
	    br: /^ {2,}\n(?!\s*$)/,
	    del: noop,
	    text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	  };

	  inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
	  inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

	  inline.link = replace(inline.link)('inside', inline._inside)('href', inline._href)();

	  inline.reflink = replace(inline.reflink)('inside', inline._inside)();

	  /**
	   * Normal Inline Grammar
	   */

	  inline.normal = merge({}, inline);

	  /**
	   * Pedantic Inline Grammar
	   */

	  inline.pedantic = merge({}, inline.normal, {
	    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
	    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	  });

	  /**
	   * GFM Inline Grammar
	   */

	  inline.gfm = merge({}, inline.normal, {
	    escape: replace(inline.escape)('])', '~|])')(),
	    url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
	    del: /^~~(?=\S)([\s\S]*?\S)~~/,
	    text: replace(inline.text)(']|', '~]|')('|', '|https?://|')()
	  });

	  /**
	   * GFM + Line Breaks Inline Grammar
	   */

	  inline.breaks = merge({}, inline.gfm, {
	    br: replace(inline.br)('{2,}', '*')(),
	    text: replace(inline.gfm.text)('{2,}', '*')()
	  });

	  /**
	   * Inline Lexer & Compiler
	   */

	  function InlineLexer(links, options) {
	    this.options = options || marked.defaults;
	    this.links = links;
	    this.rules = inline.normal;
	    this.renderer = this.options.renderer || new Renderer();
	    this.renderer.options = this.options;

	    if (!this.links) {
	      throw new Error('Tokens array requires a `links` property.');
	    }

	    if (this.options.gfm) {
	      if (this.options.breaks) {
	        this.rules = inline.breaks;
	      } else {
	        this.rules = inline.gfm;
	      }
	    } else if (this.options.pedantic) {
	      this.rules = inline.pedantic;
	    }
	  }

	  /**
	   * Expose Inline Rules
	   */

	  InlineLexer.rules = inline;

	  /**
	   * Static Lexing/Compiling Method
	   */

	  InlineLexer.output = function (src, links, options) {
	    var inline = new InlineLexer(links, options);
	    return inline.output(src);
	  };

	  /**
	   * Lexing/Compiling
	   */

	  InlineLexer.prototype.output = function (src) {
	    var out = '',
	        link,
	        text,
	        href,
	        cap;

	    while (src) {
	      // escape
	      if (cap = this.rules.escape.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += cap[1];
	        continue;
	      }

	      // autolink
	      if (cap = this.rules.autolink.exec(src)) {
	        src = src.substring(cap[0].length);
	        if (cap[2] === '@') {
	          text = cap[1].charAt(6) === ':' ? this.mangle(cap[1].substring(7)) : this.mangle(cap[1]);
	          href = this.mangle('mailto:') + text;
	        } else {
	          text = escape(cap[1]);
	          href = text;
	        }
	        out += this.renderer.link(href, null, text);
	        continue;
	      }

	      // url (gfm)
	      if (!this.inLink && (cap = this.rules.url.exec(src))) {
	        src = src.substring(cap[0].length);
	        text = escape(cap[1]);
	        href = text;
	        out += this.renderer.link(href, null, text);
	        continue;
	      }

	      // tag
	      if (cap = this.rules.tag.exec(src)) {
	        if (!this.inLink && /^<a /i.test(cap[0])) {
	          this.inLink = true;
	        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
	          this.inLink = false;
	        }
	        src = src.substring(cap[0].length);
	        out += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
	        continue;
	      }

	      // link
	      if (cap = this.rules.link.exec(src)) {
	        src = src.substring(cap[0].length);
	        this.inLink = true;
	        out += this.outputLink(cap, {
	          href: cap[2],
	          title: cap[3]
	        });
	        this.inLink = false;
	        continue;
	      }

	      // reflink, nolink
	      if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
	        src = src.substring(cap[0].length);
	        link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
	        link = this.links[link.toLowerCase()];
	        if (!link || !link.href) {
	          out += cap[0].charAt(0);
	          src = cap[0].substring(1) + src;
	          continue;
	        }
	        this.inLink = true;
	        out += this.outputLink(cap, link);
	        this.inLink = false;
	        continue;
	      }

	      // strong
	      if (cap = this.rules.strong.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.strong(this.output(cap[2] || cap[1]));
	        continue;
	      }

	      // em
	      if (cap = this.rules.em.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.em(this.output(cap[2] || cap[1]));
	        continue;
	      }

	      // code
	      if (cap = this.rules.code.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.codespan(escape(cap[2], true));
	        continue;
	      }

	      // br
	      if (cap = this.rules.br.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.br();
	        continue;
	      }

	      // del (gfm)
	      if (cap = this.rules.del.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.del(this.output(cap[1]));
	        continue;
	      }

	      // text
	      if (cap = this.rules.text.exec(src)) {
	        src = src.substring(cap[0].length);
	        out += this.renderer.text(escape(this.smartypants(cap[0])));
	        continue;
	      }

	      if (src) {
	        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
	      }
	    }

	    return out;
	  };

	  /**
	   * Compile Link
	   */

	  InlineLexer.prototype.outputLink = function (cap, link) {
	    var href = escape(link.href),
	        title = link.title ? escape(link.title) : null;

	    return cap[0].charAt(0) !== '!' ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]));
	  };

	  /**
	   * Smartypants Transformations
	   */

	  InlineLexer.prototype.smartypants = function (text) {
	    if (!this.options.smartypants) return text;
	    return text
	    // em-dashes
	    .replace(/---/g, '\u2014')
	    // en-dashes
	    .replace(/--/g, '\u2013')
	    // opening singles
	    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
	    // closing singles & apostrophes
	    .replace(/'/g, '\u2019')
	    // opening doubles
	    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201C')
	    // closing doubles
	    .replace(/"/g, '\u201D')
	    // ellipses
	    .replace(/\.{3}/g, '\u2026');
	  };

	  /**
	   * Mangle Links
	   */

	  InlineLexer.prototype.mangle = function (text) {
	    if (!this.options.mangle) return text;
	    var out = '',
	        l = text.length,
	        i = 0,
	        ch;

	    for (; i < l; i++) {
	      ch = text.charCodeAt(i);
	      if (Math.random() > 0.5) {
	        ch = 'x' + ch.toString(16);
	      }
	      out += '&#' + ch + ';';
	    }

	    return out;
	  };

	  /**
	   * Renderer
	   */

	  function Renderer(options) {
	    this.options = options || {};
	  }

	  Renderer.prototype.code = function (code, lang, escaped) {
	    if (this.options.highlight) {
	      var out = this.options.highlight(code, lang);
	      if (out != null && out !== code) {
	        escaped = true;
	        code = out;
	      }
	    }

	    if (!lang) {
	      return '<pre><code>' + (escaped ? code : escape(code, true)) + '\n</code></pre>';
	    }

	    return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + '\n</code></pre>\n';
	  };

	  Renderer.prototype.blockquote = function (quote) {
	    return '<blockquote>\n' + quote + '</blockquote>\n';
	  };

	  Renderer.prototype.html = function (html) {
	    return html;
	  };

	  Renderer.prototype.heading = function (text, level, raw) {
	    return '<h' + level + ' id="' + this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-') + '">' + text + '</h' + level + '>\n';
	  };

	  Renderer.prototype.hr = function () {
	    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
	  };

	  Renderer.prototype.list = function (body, ordered) {
	    var type = ordered ? 'ol' : 'ul';
	    return '<' + type + '>\n' + body + '</' + type + '>\n';
	  };

	  Renderer.prototype.listitem = function (text) {
	    return '<li>' + text + '</li>\n';
	  };

	  Renderer.prototype.paragraph = function (text) {
	    return '<p>' + text + '</p>\n';
	  };

	  Renderer.prototype.table = function (header, body) {
	    return '<table>\n' + '<thead>\n' + header + '</thead>\n' + '<tbody>\n' + body + '</tbody>\n' + '</table>\n';
	  };

	  Renderer.prototype.tablerow = function (content) {
	    return '<tr>\n' + content + '</tr>\n';
	  };

	  Renderer.prototype.tablecell = function (content, flags) {
	    var type = flags.header ? 'th' : 'td';
	    var tag = flags.align ? '<' + type + ' style="text-align:' + flags.align + '">' : '<' + type + '>';
	    return tag + content + '</' + type + '>\n';
	  };

	  // span level renderer
	  Renderer.prototype.strong = function (text) {
	    return '<strong>' + text + '</strong>';
	  };

	  Renderer.prototype.em = function (text) {
	    return '<em>' + text + '</em>';
	  };

	  Renderer.prototype.codespan = function (text) {
	    return '<code>' + text + '</code>';
	  };

	  Renderer.prototype.br = function () {
	    return this.options.xhtml ? '<br/>' : '<br>';
	  };

	  Renderer.prototype.del = function (text) {
	    return '<del>' + text + '</del>';
	  };

	  Renderer.prototype.link = function (href, title, text) {
	    if (this.options.sanitize) {
	      try {
	        var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, '').toLowerCase();
	      } catch (e) {
	        return '';
	      }
	      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
	        return '';
	      }
	    }
	    var out = '<a href="' + href + '"';
	    if (title) {
	      out += ' title="' + title + '"';
	    }
	    out += '>' + text + '</a>';
	    return out;
	  };

	  Renderer.prototype.image = function (href, title, text) {
	    var out = '<img src="' + href + '" alt="' + text + '"';
	    if (title) {
	      out += ' title="' + title + '"';
	    }
	    out += this.options.xhtml ? '/>' : '>';
	    return out;
	  };

	  Renderer.prototype.text = function (text) {
	    return text;
	  };

	  /**
	   * Parsing & Compiling
	   */

	  function Parser(options) {
	    this.tokens = [];
	    this.token = null;
	    this.options = options || marked.defaults;
	    this.options.renderer = this.options.renderer || new Renderer();
	    this.renderer = this.options.renderer;
	    this.renderer.options = this.options;
	  }

	  /**
	   * Static Parse Method
	   */

	  Parser.parse = function (src, options, renderer) {
	    var parser = new Parser(options, renderer);
	    return parser.parse(src);
	  };

	  /**
	   * Parse Loop
	   */

	  Parser.prototype.parse = function (src) {
	    this.inline = new InlineLexer(src.links, this.options, this.renderer);
	    this.tokens = src.reverse();

	    var out = '';
	    while (this.next()) {
	      out += this.tok();
	    }

	    return out;
	  };

	  /**
	   * Next Token
	   */

	  Parser.prototype.next = function () {
	    return this.token = this.tokens.pop();
	  };

	  /**
	   * Preview Next Token
	   */

	  Parser.prototype.peek = function () {
	    return this.tokens[this.tokens.length - 1] || 0;
	  };

	  /**
	   * Parse Text Tokens
	   */

	  Parser.prototype.parseText = function () {
	    var body = this.token.text;

	    while (this.peek().type === 'text') {
	      body += '\n' + this.next().text;
	    }

	    return this.inline.output(body);
	  };

	  /**
	   * Parse Current Token
	   */

	  Parser.prototype.tok = function () {
	    switch (this.token.type) {
	      case 'space':
	        {
	          return '';
	        }
	      case 'hr':
	        {
	          return this.renderer.hr();
	        }
	      case 'heading':
	        {
	          return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
	        }
	      case 'code':
	        {
	          return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
	        }
	      case 'table':
	        {
	          var header = '',
	              body = '',
	              i,
	              row,
	              cell,
	              flags,
	              j;

	          // header
	          cell = '';
	          for (i = 0; i < this.token.header.length; i++) {
	            flags = { header: true, align: this.token.align[i] };
	            cell += this.renderer.tablecell(this.inline.output(this.token.header[i]), { header: true, align: this.token.align[i] });
	          }
	          header += this.renderer.tablerow(cell);

	          for (i = 0; i < this.token.cells.length; i++) {
	            row = this.token.cells[i];

	            cell = '';
	            for (j = 0; j < row.length; j++) {
	              cell += this.renderer.tablecell(this.inline.output(row[j]), { header: false, align: this.token.align[j] });
	            }

	            body += this.renderer.tablerow(cell);
	          }
	          return this.renderer.table(header, body);
	        }
	      case 'blockquote_start':
	        {
	          var body = '';

	          while (this.next().type !== 'blockquote_end') {
	            body += this.tok();
	          }

	          return this.renderer.blockquote(body);
	        }
	      case 'list_start':
	        {
	          var body = '',
	              ordered = this.token.ordered;

	          while (this.next().type !== 'list_end') {
	            body += this.tok();
	          }

	          return this.renderer.list(body, ordered);
	        }
	      case 'list_item_start':
	        {
	          var body = '';

	          while (this.next().type !== 'list_item_end') {
	            body += this.token.type === 'text' ? this.parseText() : this.tok();
	          }

	          return this.renderer.listitem(body);
	        }
	      case 'loose_item_start':
	        {
	          var body = '';

	          while (this.next().type !== 'list_item_end') {
	            body += this.tok();
	          }

	          return this.renderer.listitem(body);
	        }
	      case 'html':
	        {
	          var html = !this.token.pre && !this.options.pedantic ? this.inline.output(this.token.text) : this.token.text;
	          return this.renderer.html(html);
	        }
	      case 'paragraph':
	        {
	          return this.renderer.paragraph(this.inline.output(this.token.text));
	        }
	      case 'text':
	        {
	          return this.renderer.paragraph(this.parseText());
	        }
	    }
	  };

	  /**
	   * Helpers
	   */

	  function escape(html, encode) {
	    return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	  }

	  function unescape(html) {
	    // explicitly match decimal, hex, and named HTML entities 
	    return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function (_, n) {
	      n = n.toLowerCase();
	      if (n === 'colon') return ':';
	      if (n.charAt(0) === '#') {
	        return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
	      }
	      return '';
	    });
	  }

	  function replace(regex, opt) {
	    regex = regex.source;
	    opt = opt || '';
	    return function self(name, val) {
	      if (!name) return new RegExp(regex, opt);
	      val = val.source || val;
	      val = val.replace(/(^|[^\[])\^/g, '$1');
	      regex = regex.replace(name, val);
	      return self;
	    };
	  }

	  function noop() {}
	  noop.exec = noop;

	  function merge(obj) {
	    var i = 1,
	        target,
	        key;

	    for (; i < arguments.length; i++) {
	      target = arguments[i];
	      for (key in target) {
	        if (Object.prototype.hasOwnProperty.call(target, key)) {
	          obj[key] = target[key];
	        }
	      }
	    }

	    return obj;
	  }

	  /**
	   * Marked
	   */

	  function marked(src, opt, callback) {
	    if (callback || typeof opt === 'function') {
	      if (!callback) {
	        callback = opt;
	        opt = null;
	      }

	      opt = merge({}, marked.defaults, opt || {});

	      var highlight = opt.highlight,
	          tokens,
	          pending,
	          i = 0;

	      try {
	        tokens = Lexer.lex(src, opt);
	      } catch (e) {
	        return callback(e);
	      }

	      pending = tokens.length;

	      var done = function done(err) {
	        if (err) {
	          opt.highlight = highlight;
	          return callback(err);
	        }

	        var out;

	        try {
	          out = Parser.parse(tokens, opt);
	        } catch (e) {
	          err = e;
	        }

	        opt.highlight = highlight;

	        return err ? callback(err) : callback(null, out);
	      };

	      if (!highlight || highlight.length < 3) {
	        return done();
	      }

	      delete opt.highlight;

	      if (!pending) return done();

	      for (; i < tokens.length; i++) {
	        (function (token) {
	          if (token.type !== 'code') {
	            return --pending || done();
	          }
	          return highlight(token.text, token.lang, function (err, code) {
	            if (err) return done(err);
	            if (code == null || code === token.text) {
	              return --pending || done();
	            }
	            token.text = code;
	            token.escaped = true;
	            --pending || done();
	          });
	        })(tokens[i]);
	      }

	      return;
	    }
	    try {
	      if (opt) opt = merge({}, marked.defaults, opt);
	      return Parser.parse(Lexer.lex(src, opt), opt);
	    } catch (e) {
	      e.message += '\nPlease report this to https://github.com/chjj/marked.';
	      if ((opt || marked.defaults).silent) {
	        return '<p>An error occured:</p><pre>' + escape(e.message + '', true) + '</pre>';
	      }
	      throw e;
	    }
	  }

	  /**
	   * Options
	   */

	  marked.options = marked.setOptions = function (opt) {
	    merge(marked.defaults, opt);
	    return marked;
	  };

	  marked.defaults = {
	    gfm: true,
	    tables: true,
	    breaks: false,
	    pedantic: false,
	    sanitize: false,
	    sanitizer: null,
	    mangle: true,
	    smartLists: false,
	    silent: false,
	    highlight: null,
	    langPrefix: 'lang-',
	    smartypants: false,
	    headerPrefix: '',
	    renderer: new Renderer(),
	    xhtml: false
	  };

	  /**
	   * Expose
	   */

	  marked.Parser = Parser;
	  marked.parser = Parser.parse;

	  marked.Renderer = Renderer;

	  marked.Lexer = Lexer;
	  marked.lexer = Lexer.lex;

	  marked.InlineLexer = InlineLexer;
	  marked.inlineLexer = InlineLexer.output;

	  marked.parse = marked;

	  if (typeof module !== 'undefined' && ( false ? 'undefined' : _typeof(exports)) === 'object') {
	    module.exports = marked;
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return marked;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    this.marked = marked;
	  }
	}).call(function () {
	  return this || (typeof window !== 'undefined' ? window : global);
	}());
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	// Get source

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	window.getSource = function getSource() {
	    var source = localStorage.getItem('source');

	    if (!source && Router.query('source')) {
	        source = Router.query('source');
	    }

	    return source;
	};

	// Convert to HTML from markdown
	window.markdownToHtml = function (string) {
	    if (string) {
	        try {
	            var html = marked(string);

	            // Check boxes
	            html = html.replace(/\[ \]/g, '<input type="checkbox" disabled readonly>');
	            html = html.replace(/\[x\]/g, '<input type="checkbox" checked="checked" disabled readonly>');

	            // Collaborator reference
	            html = html.replace(/@[a-zA-Z0-9-_]+/g, function (string) {
	                var typedName = string.replace('@', '');

	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = (resources.collaborators || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var collaborator = _step.value;

	                        if (!collaborator) {
	                            continue;
	                        }

	                        if (typedName == collaborator.name) {
	                            return '<span class="collaborator-reference"><img src="' + collaborator.avatar + '" />' + (collaborator.displayName || collaborator.name) + '</span>';
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }

	                return string;
	            });

	            return html;
	        } catch (e) {
	            console.log(e);
	        }
	    }
	};

	// Collapse/expand an HTMLElement
	window.toggleExpand = function ($element) {
	    $element.removeAttr('style');

	    var wasExpanded = $element.hasClass('expanded');

	    $element.removeClass('expanded');
	    $element.addClass('collapsed');

	    var collapsedHeight = $element.outerHeight();

	    $element.removeClass('collapsed');
	    $element.addClass('expanded');

	    var expandedHeight = $element.outerHeight();

	    if (!wasExpanded) {
	        $element.css('height', collapsedHeight + 'px');

	        setTimeout(function () {
	            $element.css('height', expandedHeight + 'px');

	            setTimeout(function () {
	                $element.removeAttr('style');
	                $element.toggleClass('expanded', !wasExpanded);
	                $element.toggleClass('collapsed', wasExpanded);
	            }, 500);
	        }, 50);
	    } else {
	        $element.css('height', expandedHeight + 'px');

	        setTimeout(function () {
	            $element.css('height', collapsedHeight + 'px');

	            setTimeout(function () {
	                $element.removeAttr('style');
	                $element.toggleClass('expanded', !wasExpanded);
	                $element.toggleClass('collapsed', wasExpanded);
	            }, 500);
	        }, 50);
	    }
	};

	// Get cookie by name
	window.getCookie = function getCookie(name) {
	    var value = "; " + document.cookie;
	    var parts = value.split("; " + name + "=");

	    if (parts.length == 2) return parts.pop().split(";").shift();
	};

	// Set cookie by name
	window.setCookie = function setCookie(name, value) {
	    document.cookie = name + '=' + value;
	};

	// Get UNIX time
	Date.prototype.getUnixTime = function () {
	    return this.getTime() / 1000 | 0;
	};

	// Simple date string
	Date.prototype.getSimpleString = function () {
	    return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate();
	};

	// Floor date extension
	Date.prototype.floor = function () {
	    this.setHours(0, 0, 0, 0);

	    return this;
	};

	// Get ISO day
	Date.prototype.getISODay = function () {
	    var day = this.getDay() - 1;

	    if (day < 0) {
	        day = 6;
	    }

	    return day;
	};

	// Date week number extension
	Date.prototype.getWeek = function () {
	    var date = new Date(this.getTime());

	    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);

	    var week1 = new Date(date.getFullYear(), 0, 4);

	    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	};

	// Date day name extension
	Date.prototype.getDayName = function () {
	    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	    return weekday[this.getDay()];
	};

	// Date month name extension
	Date.prototype.getMonthName = function () {
	    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	    return month[this.getMonth()];
	};

	// Pretty name
	window.prettyName = function (name) {
	    var prettyName = name;

	    for (var i in prettyName) {
	        if (i == 0) {
	            prettyName = prettyName.substring(0, 1).toUpperCase() + prettyName.substring(1);
	        } else if (prettyName[i] == prettyName[i].toUpperCase()) {
	            prettyName = prettyName.substring(0, i) + ' ' + prettyName.substring(i);
	        }
	    }

	    return prettyName;
	};

	// Pretty date
	window.prettyDate = function (inputDate, separator) {
	    var date = inputDate;
	    var prettyDate = '';

	    if (!date) {
	        return prettyDate;
	    }

	    if (!isNaN(date)) {
	        date = new Date(parseInt(date));
	    } else if (typeof date === 'string') {
	        date = new Date(date);
	    }

	    if (date instanceof Date == false) {
	        debug.warning('Date is of incorrect object type (' + (typeof inputDate === 'undefined' ? 'undefined' : _typeof(inputDate)) + ')', this);

	        return prettyDate;
	    }

	    if (isNaN(date.getTime())) {
	        debug.warning('Date is invalid (' + inputDate + ')', this);

	        return prettyDate;
	    }

	    separator = separator || '.';

	    var monthString = date.getMonth() + 1;

	    if (monthString < 10) {
	        monthString = '0' + monthString;
	    }

	    var dayString = date.getDate();

	    if (dayString < 10) {
	        dayString = '0' + dayString;
	    }

	    prettyDate = date.getFullYear() + separator + monthString + separator + dayString;

	    return prettyDate;
	};

	// Spinner
	window.spinner = function (active) {
	    if (active) {
	        if ($('.spinner-backdrop .spinner-container .spinner-text').length > 0) {
	            $('.spinner-backdrop .spinner-container .spinner-text').html(typeof active === 'string' ? active : '');
	        } else {
	            $('.spinner-backdrop').remove();

	            $('body').append(_.div({ class: 'spinner-backdrop' }, _.div({ class: 'spinner-container' }, _.span({ class: 'spinner-icon fa fa-refresh' }), _.span({ class: 'spinner-text' }, typeof active === 'string' ? active : ''))));

	            $('.app-container').toggleClass('disabled', true);
	        }
	    } else {
	        $('.app-container').toggleClass('disabled', false);

	        $('.spinner-backdrop').remove();
	    }
	};

	// Scroll on page
	window.scroll = function (amount) {
	    var current = $(document).scrollTop();

	    $(document).scrollTop(current + amount);
	};

	// Sort array by date
	window.sortByDate = function (array, key) {
	    return array.concat().sort(function (a, b) {
	        a = new Date(a[key]);
	        b = new Date(b[key]);

	        if (a < b) {
	            return -1;
	        }

	        if (a > b) {
	            return 1;
	        }

	        return 0;
	    });
	};

	// Displays an error
	window.displayError = function (error) {
	    if (error instanceof Error == false) {
	        return;
	    }
	    if (error.name === 'error' && !error.message) {
	        return;
	    }

	    var alertString = error.name + '\n\n' + error.message;

	    if (error.stack) {
	        alertString += '\n\n' + error.stack;
	    }

	    alert(alertString);

	    console.log(error.stack);

	    spinner(false);
	};

	// Convert estimate string to float
	window.estimateToFloat = function estimateToFloat(estimate) {
	    if (estimate) {
	        var regex = /(\d+.\d+|\d+)(d|h|m)|(\d+.\d+|\d+)/;
	        var matches = regex.exec(estimate);

	        // Found estimate with suffix, multiply hours as needed
	        if (matches && matches.length > 2) {
	            var number = parseFloat(matches[1]);
	            var unit = matches[2];

	            switch (unit) {
	                case 'm':
	                    // Minutes
	                    number /= 60;
	                    break;

	                case 'd':
	                    // Days
	                    number *= 24;
	                    break;
	            }

	            return number;
	        }

	        // Found float
	        if (matches && matches.length > 1) {
	            return parseFloat(matches[1]);
	        }
	    }

	    // Invaild or no estimate
	    return 0;
	};

	// Show modal
	window.modal = function modal($content) {
	    $('.app-container').toggleClass('disabled', $content != false);

	    if ($content == false) {
	        $('.modal-backdrop').remove();
	        return;
	    }

	    var $backdrop = _.div({ class: 'modal-backdrop' }, _.div({ class: 'modal-content' }, $content)).click(function () {
	        modal(false);
	    });

	    $('body').append($backdrop);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	window.resources = {};

	var ResourceHelper = function () {
	    function ResourceHelper() {
	        _classCallCheck(this, ResourceHelper);
	    }

	    _createClass(ResourceHelper, null, [{
	        key: 'getCollaborator',
	        value: function getCollaborator(name) {
	            for (var i in resources.collaborators) {
	                var collaborator = resources.collaborators[i];

	                if (collaborator.name == name) {
	                    return i;
	                }
	            }
	        }
	    }, {
	        key: 'getIssuePriority',
	        value: function getIssuePriority(name) {
	            for (var i in resources.issuePriorities) {
	                var type = resources.issuePriorities[i];

	                if (type == name) {
	                    return i;
	                }
	            }
	        }
	    }, {
	        key: 'getIssueEstimate',
	        value: function getIssueEstimate(name) {
	            for (var i in resources.issueEstimates) {
	                var estimate = resources.issueEstimates[i];

	                if (estimate == name) {
	                    return i;
	                }
	            }
	        }
	    }, {
	        key: 'getIssueColumn',
	        value: function getIssueColumn(name) {
	            for (var i in resources.issueColumns) {
	                var type = resources.issueColumns[i];

	                if (type == name) {
	                    return i;
	                }
	            }

	            return 0;
	        }
	    }, {
	        key: 'getIssueAttachment',
	        value: function getIssueAttachment(name) {
	            for (var i in resources.issueAttachments) {
	                var type = resources.issueAttachments[i];

	                if (type == name) {
	                    return i;
	                }
	            }

	            return 0;
	        }
	    }, {
	        key: 'getIssueType',
	        value: function getIssueType(name) {
	            for (var i in resources.issueTypes) {
	                var type = resources.issueTypes[i];

	                if (type == name) {
	                    return i;
	                }
	            }
	        }
	    }, {
	        key: 'getVersion',
	        value: function getVersion(name) {
	            for (var i in resources.versions) {
	                var version = resources.versions[i];

	                if (version == name) {
	                    return i;
	                }
	            }
	        }
	    }, {
	        key: 'getMilestone',
	        value: function getMilestone(name) {
	            for (var i in resources.milestones) {
	                var milestone = resources.milestones[i];

	                if (milestone.title == name) {
	                    return i;
	                }
	            }
	        }
	    }, {
	        key: 'sortResource',
	        value: function sortResource(resource) {
	            switch (resource) {
	                case 'issueEstimates':
	                    resources.issueEstimates.sort(function (a, b) {
	                        a = estimateToFloat(a);
	                        b = estimateToFloat(b);

	                        if (a < b) {
	                            return -1;
	                        }

	                        if (a > b) {
	                            return 1;
	                        }

	                        return 0;
	                    });
	                    break;
	            }
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            resources = {};

	            ApiHelper.clear();
	        }
	    }, {
	        key: 'reloadResource',
	        value: function reloadResource(resource) {
	            resources[resource] = [];

	            return ApiHelper.getResource(resource);
	        }
	    }, {
	        key: 'updateResource',
	        value: function updateResource(resource, item, index, identifier) {
	            spinner('Updating ' + resource);

	            return ApiHelper.updateResource(resource, item, identifier).then(function () {
	                index = index || item.index;

	                resources[resource][index] = item;

	                spinner(false);

	                ResourceHelper.sortResource(resource);

	                return Promise.resolve();
	            });
	        }
	    }, {
	        key: 'removeResource',
	        value: function removeResource(resource, index) {
	            spinner('Updating ' + resource);

	            return ApiHelper.removeResource(resource, index).then(function () {
	                resources[resource].splice(index, 1);

	                spinner(false);

	                ResourceHelper.sortResource(resource);

	                return Promise.resolve();
	            });
	        }
	    }, {
	        key: 'addResource',
	        value: function addResource(resource, item) {
	            spinner('Updating ' + resource);

	            return ApiHelper.addResource(resource, item).then(function (newItem) {
	                item = newItem || item;

	                var index = resources[resource].length;

	                if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !item.index) {
	                    item.index = index;
	                }

	                resources[resource][index] = item;

	                spinner(false);

	                ResourceHelper.sortResource(resource);

	                return Promise.resolve(item);
	            });
	        }
	    }]);

	    return ResourceHelper;
	}();

	module.exports = ResourceHelper;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A manager for local storage settings
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SettingsHelper = function () {
	    function SettingsHelper() {
	        _classCallCheck(this, SettingsHelper);
	    }

	    _createClass(SettingsHelper, null, [{
	        key: 'set',

	        /**
	         * Set value
	         *
	         * @param {String} type
	         * @param {String} key
	         * @param {String} value
	         * @param {Boolean} stringify
	         */
	        value: function set(type, key, value, stringify) {
	            var prefix = 'settings';

	            // Exceptions for types not managed on a repository basis
	            if (type != 'repositories') {
	                prefix = localStorage.getItem('settings:repositories:current') + prefix + ':';
	            }

	            if (stringify) {
	                value = JSON.stringify(value);
	            }

	            localStorage.setItem(prefix + ':' + type + ':' + key, value);
	        }

	        /**
	         * Get value
	         *
	         * @param {String} type
	         * @param {String} key
	         * @param {String} defaultValue
	         * @param {Boolean} parse
	         *
	         * @returns {String} value
	         */

	    }, {
	        key: 'get',
	        value: function get(type, key, defaultValue, parse) {
	            var prefix = 'settings';

	            // Exceptions for types not managed on a repository basis
	            if (type != 'repositories') {
	                prefix = localStorage.getItem('settings:repositories:current') + prefix + ':';
	            }

	            var result = localStorage.getItem(prefix + ':' + type + ':' + key);

	            if (result === 'null' || result === null || result === undefined || result === 'undefined' || typeof result === 'undefined') {
	                SettingsHelper.set(type, key, defaultValue, parse);

	                result = defaultValue || false;
	            }

	            if (parse) {
	                try {
	                    result = JSON.parse(result);
	                } catch (e) {
	                    debug.log(e.message, this);
	                }
	            }

	            return result;
	        }
	    }]);

	    return SettingsHelper;
	}();

	module.exports = SettingsHelper;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	// The idle timeout is 10 minutes

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var IDLE_TIMEOUT = 600;

	var idleTimer = 0;

	/**
	 * A helper module for input events
	 *
	 * @class InputHelper
	 */

	var InputHelper = function () {
	    function InputHelper() {
	        _classCallCheck(this, InputHelper);
	    }

	    _createClass(InputHelper, null, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;

	            // Register keydown events
	            $(document).keydown(function (e) {
	                switch (e.which) {
	                    case 16:
	                        _this.isShiftDown = true;
	                        break;
	                }

	                InputHelper.poke();
	            });

	            // Register keyup events
	            $(document).keyup(function (e) {
	                switch (e.which) {
	                    case 16:
	                        _this.isShiftDown = false;
	                        break;

	                    case 27:
	                        IssueEditor.cancelMultiSelect();
	                        break;
	                }
	            });

	            // Register mousedown event
	            $(document).mousedown(function (e) {
	                var $target = $(e.target);

	                // Handle multi-select cancel event
	                if ($target.parents('.issue-editor').length < 1 && !$target.hasClass('issue-editor')) {
	                    IssueEditor.cancelMultiSelect();
	                }

	                // Reset the idle timer
	                InputHelper.poke();
	            });

	            // Register idle timer
	            setInterval(function () {
	                _this.incrementIdleTimer();
	            }, 1000);
	        }

	        /**
	         * Increments the idle timer
	         */

	    }, {
	        key: 'incrementIdleTimer',
	        value: function incrementIdleTimer() {
	            idleTimer++;

	            if (idleTimer >= IDLE_TIMEOUT) {
	                // Do something after idle timeout
	            }
	        }

	        /**
	         * Resets the idle timer
	         */

	    }, {
	        key: 'poke',
	        value: function poke() {
	            idleTimer = 0;
	        }

	        /**
	         * Gets the current idle timer
	         *
	         * @returns {Number} timer
	         */

	    }, {
	        key: 'getIdleTimer',
	        value: function getIdleTimer() {
	            return idleTimer;
	        }
	    }]);

	    return InputHelper;
	}();

	InputHelper.init();

	module.exports = InputHelper;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A tool for performing Issue related operations
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var IssueHelper = function () {
	    function IssueHelper() {
	        _classCallCheck(this, IssueHelper);
	    }

	    _createClass(IssueHelper, null, [{
	        key: 'search',

	        /**
	         * Find an issue by a query
	         *
	         * @param {String} query
	         * @param {Number} max
	         *
	         * @returns {Array(Issue)}
	         */
	        value: function search(query, max) {
	            var results = [];
	            var found = 0;

	            for (var i = 0; i < resources.issues.length; i++) {
	                var string = JSON.stringify(resources.issues[i]).toLowerCase();

	                if (string.search(query.toLowerCase()) > -1) {
	                    results[results.length] = resources.issues[i];
	                    found++;

	                    if (found >= max) {
	                        break;
	                    }
	                }
	            }

	            return results;
	        }
	    }]);

	    return IssueHelper;
	}();

	module.exports = IssueHelper;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var lastSenderName = '';

	var DebugHelper = function () {
	    function DebugHelper() {
	        _classCallCheck(this, DebugHelper);
	    }

	    _createClass(DebugHelper, null, [{
	        key: 'log',

	        /**
	         * Logs a message
	         *
	         * @param {String} message
	         * @param {Object} sender
	         * @param {Number} verbosity
	         */
	        value: function log(message, sender, verbosity) {
	            if (verbosity == 0) {
	                this.error('Verbosity cannot be set to 0', this);
	            } else if (!verbosity) {
	                verbosity = 1;
	            }

	            if (this.verbosity >= verbosity) {
	                console.log(this.parseSender(sender), this.getDateString(), message);
	            }
	        }

	        /**
	         * Gets the date string
	         *
	         * @returns {String} date
	         */

	    }, {
	        key: 'getDateString',
	        value: function getDateString() {
	            var date = new Date();

	            var output = '(' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ')';

	            return output;
	        }

	        /**
	         * Parse sender
	         *
	         * @param {Object} sender
	         *
	         * @returns {String} name
	         */

	    }, {
	        key: 'parseSender',
	        value: function parseSender(sender) {
	            var senderName = '';

	            if (sender) {
	                if (typeof sender === 'function') {
	                    senderName += sender.name;
	                } else if (sender.constructor) {
	                    senderName += sender.constructor.name;
	                } else {
	                    senderName += sender.toString();
	                }

	                senderName;
	            }

	            if (senderName == lastSenderName) {
	                senderName = '';
	            } else {
	                lastSenderName = senderName;
	                senderName = '\n' + senderName + '\n----------\n';
	            }

	            return senderName;
	        }

	        /**
	         * Throws an error
	         *
	         * @param {String} message
	         * @param {Object} sender
	         */

	    }, {
	        key: 'error',
	        value: function error(message, sender) {
	            throw new Error(this.parseSender(sender) + ' ' + this.getDateString() + ' ' + message);
	        }

	        /**
	         * Shows a warning
	         */

	    }, {
	        key: 'warning',
	        value: function warning(message, sender) {
	            console.log(this.parseSender(sender), this.getDateString(), message);
	            console.trace();
	        }
	    }]);

	    return DebugHelper;
	}();

	module.exports = DebugHelper;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GraphHelper = function () {
	  function GraphHelper() {
	    _classCallCheck(this, GraphHelper);
	  }

	  _createClass(GraphHelper, null, [{
	    key: 'drawLine',

	    /**
	     * Draws a line
	     *
	     * @param {Context} ctx
	     * @param {Number} fromX
	     * @param {Number} fromY
	     * @param {Number} toX
	     * @param {Number} toY
	     * @param {Number} lineWidth
	     * @param {String} strokeColor
	     */
	    value: function drawLine(ctx, fromX, fromY, toX, toY) {
	      var lineWidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2;
	      var strokeColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '#000000';

	      ctx.moveTo(fromX, fromY);
	      ctx.lineTo(toX, toY);
	      ctx.lineWidth = lineWidth;
	      ctx.strokeStyle = strokeColor;
	      ctx.stroke();
	    }

	    /**
	     * Draws a circle
	     *
	     * @param {Context} ctx
	     */

	  }, {
	    key: 'drawCircle',
	    value: function drawCircle(ctx, x, y) {
	      var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;
	      var fillColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#000000';

	      ctx.beginPath();
	      ctx.arc(x, y, radius, 0, 2 * Math.PI);
	      ctx.fillStyle = fillColor;
	      ctx.fill();
	    }

	    /**
	     * Draws a string
	     *
	     * @param {Context} ctx
	     */

	  }, {
	    key: 'drawText',
	    value: function drawText(ctx, x, y, string, size) {
	      ctx.font = size + 'px Arial';
	      ctx.fillText(string, x, y);
	    }
	  }]);

	  return GraphHelper;
	}();

	module.exports = GraphHelper;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ApiHelper = __webpack_require__(24);

	var labelCache = void 0;
	var deletedIssuesCache = [];

	var GitHubApi = function (_ApiHelper) {
	    _inherits(GitHubApi, _ApiHelper);

	    function GitHubApi() {
	        _classCallCheck(this, GitHubApi);

	        return _possibleConstructorReturn(this, (GitHubApi.__proto__ || Object.getPrototypeOf(GitHubApi)).apply(this, arguments));
	    }

	    _createClass(GitHubApi, [{
	        key: 'clear',

	        /**
	         * Clears all temporary data
	         */
	        value: function clear() {
	            labelCache = null;
	            deletedIssuesCache = [];
	        }

	        // ----------
	        // Generic API methods
	        // ----------
	        /**
	         * GET method
	         *
	         * @param {String} url
	         * @param {String} param
	         * @param {Boolean} recursePages
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'get',
	        value: function get(url, param, recursePages) {
	            var self = this;

	            return new Promise(function (resolve, reject) {
	                var issues = [];

	                function getPage(page) {
	                    $.ajax({
	                        url: 'https://api.github.com' + url + self.getApiTokenString(true) + 'per_page=100&page=' + page + (param ? '&' + param : ''),
	                        type: 'GET',
	                        cache: false,
	                        success: function success(result) {
	                            issues = issues.concat(result);

	                            if (recursePages && result.length > 0) {
	                                getPage(page + 1);
	                            } else {
	                                resolve(issues);
	                            }
	                        },
	                        error: function error(e) {
	                            reject(new Error(e.responseJSON.message));
	                        }
	                    });
	                }

	                getPage(1);
	            });
	        }

	        /**
	         * DELETE method
	         *
	         * @param {String} url
	         * @param {String} param
	         * @param {Object} data
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'delete',
	        value: function _delete(url, param, data) {
	            var _this2 = this;

	            if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
	                data = JSON.stringify(data);
	            }

	            return new Promise(function (resolve, reject) {
	                $.ajax({
	                    url: 'https://api.github.com' + url + _this2.getApiTokenString() + (param ? '&' + param : ''),
	                    type: 'DELETE',
	                    cache: false,
	                    data: data,
	                    success: function success(result) {
	                        resolve(result);
	                    },
	                    error: function error(e) {
	                        reject(new Error(e.responseJSON.message));
	                    }
	                });
	            });
	        }

	        /**
	         * PATCH method
	         *
	         * @param {String} url
	         * @param {Object} data
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'patch',
	        value: function patch(url, data) {
	            var _this3 = this;

	            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
	                data = JSON.stringify(data);
	            }

	            return new Promise(function (resolve, reject) {
	                $.ajax({
	                    url: 'https://api.github.com' + url + _this3.getApiTokenString(),
	                    type: 'PATCH',
	                    data: data,
	                    cache: false,
	                    success: function success(result) {
	                        resolve(result);
	                    },
	                    error: function error(e) {
	                        reject(new Error(e.responseJSON.message));
	                    }
	                });
	            });
	        }

	        /**
	         * POST method
	         *
	         * @param {String} url
	         * @param {Object} data
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'post',
	        value: function post(url, data) {
	            var _this4 = this;

	            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
	                data = JSON.stringify(data);
	            }

	            return new Promise(function (resolve, reject) {
	                $.ajax({
	                    url: 'https://api.github.com' + url + _this4.getApiTokenString(),
	                    type: 'POST',
	                    data: data,
	                    cache: false,
	                    success: function success(result) {
	                        resolve(result);
	                    },
	                    error: function error(e) {
	                        reject(new Error(e.responseJSON.message));
	                    }
	                });
	            });
	        }

	        /**
	         * PUT method
	         *
	         * @param {String} url
	         * @param {Object} data
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'put',
	        value: function put(url, data) {
	            var _this5 = this;

	            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
	                data = JSON.stringify(data);
	            }

	            return new Promise(function (resolve, reject) {
	                $.ajax({
	                    url: 'https://api.github.com' + url + _this5.getApiTokenString(),
	                    type: 'PUT',
	                    cache: false,
	                    data: data,
	                    success: function success(result) {
	                        resolve(result);
	                    },
	                    error: function error(e) {
	                        reject(new Error(e.responseJSON.message));
	                    }
	                });
	            });
	        }

	        // ----------
	        // Session methods
	        // ----------
	        /**
	         * Gets the API token string
	         *
	         * @param {Boolean} includeSuffix
	         *
	         * @returns {String} string
	         */

	    }, {
	        key: 'getApiTokenString',
	        value: function getApiTokenString(includeSuffix) {
	            var token = this.getApiToken();

	            if (!token) {
	                if (includeSuffix) {
	                    return '?';
	                }
	            } else {
	                if (includeSuffix) {
	                    token += '&';
	                }

	                return '?access_token=' + token;
	            }
	        }

	        /**
	         * Gets the currently logged in user object
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getUser',
	        value: function getUser() {
	            if (this.isSpectating()) {
	                return Promise.resolve({ name: '', avatar: '' });
	            }

	            return this.get('/user').then(function (gitHubUser) {
	                if (Array.isArray(gitHubUser)) {
	                    gitHubUser = gitHubUser[0];
	                }

	                var user = new User({
	                    id: gitHubUser.id,
	                    name: gitHubUser.login,
	                    avatar: gitHubUser.avatar_url
	                });

	                return Promise.resolve(user);
	            });
	        }

	        // ----------
	        // Resource getters
	        // ----------
	        /**
	         * Gets organisations
	         *
	         * @returns {Promise} Array of organisations
	         */

	    }, {
	        key: 'getOrganizations',
	        value: function getOrganizations() {
	            var _this6 = this;

	            return this.get('/user/orgs').then(function (orgs) {
	                _this6.processOrganizations(orgs);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets a list of deleted issues
	         *
	         * @returns {Array} List of deleted issues
	         */

	    }, {
	        key: 'getDeletedIssues',
	        value: function getDeletedIssues() {
	            return deletedIssuesCache;
	        }

	        /**
	         * Gets repositories
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getRepositories',
	        value: function getRepositories() {
	            var _this7 = this;

	            return this.get('/user/repos').then(function (repos) {
	                _this7.processRepositories(repos);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets collaborators
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getCollaborators',
	        value: function getCollaborators() {
	            var _this8 = this;

	            if (this.isSpectating()) {
	                return Promise.resolve([]);
	            }

	            return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/collaborators').then(function (collaborators) {
	                _this8.processCollaborators(collaborators);
	            });
	        }

	        /**
	         * Gets issues
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssues',
	        value: function getIssues() {
	            var _this9 = this;

	            return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues', 'state=all', true).then(function (issues) {
	                _this9.processIssues(issues);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Ensures mandatory labels
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'ensureMandatoryLabels',
	        value: function ensureMandatoryLabels() {
	            if (!labelCache) {
	                return Promise.reject(new Error('Label cache not initialised'));
	            } else {
	                // Check if "deleted" label exists
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = labelCache[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var label = _step.value;

	                        if (label.name == 'deleted') {
	                            return Promise.resolve();
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }

	                return this.addLabel('deleted', 'ff0000').then(function (newLabel) {
	                    labelCache.push(newLabel);

	                    return Promise.resolve();
	                });
	            }
	        }

	        /**
	         * Gets labels and caches them
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getLabels',
	        value: function getLabels() {
	            var _this10 = this;

	            if (!labelCache) {
	                return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels').then(function (labels) {
	                    labelCache = labels || [];

	                    return _this10.ensureMandatoryLabels();
	                }).then(function () {
	                    return Promise.resolve(labelCache);
	                });
	            } else {
	                return Promise.resolve(labelCache);
	            }
	        }

	        /**
	         * Gets issue types
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueTypes',
	        value: function getIssueTypes() {
	            var _this11 = this;

	            return this.getLabels().then(function (labels) {
	                _this11.processIssueTypes(labels);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets issue columns
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueColumns',
	        value: function getIssueColumns() {
	            var _this12 = this;

	            return this.getLabels().then(function (labels) {
	                _this12.processIssueColumns(labels);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets issue attachments
	         *
	         * @param {Issue} issue
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'getIssueAttachments',
	        value: function getIssueAttachments(issue) {
	            var apiUrl = '/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/contents/issueAttachments/' + issue.id;

	            return this.get(apiUrl, 'ref=samoosa-resources').then(function (response) {
	                if (!Array.isArray(response)) {
	                    return Promise.reject(new Error('Response of issue attachments was not an array'));
	                }

	                var attachments = [];

	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = response[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var obj = _step2.value;

	                        var attachment = new Attachment({
	                            name: obj.name,
	                            url: obj.download_url
	                        });

	                        attachment.sha = obj.sha;

	                        attachments[attachments.length] = attachment;
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                            _iterator2.return();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }

	                return Promise.resolve(attachments);
	            }).catch(function () {
	                return Promise.resolve([]);
	            });
	        }

	        /**
	         * Gets issue priorities
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssuePriorities',
	        value: function getIssuePriorities() {
	            var _this13 = this;

	            return this.getLabels().then(function (labels) {
	                _this13.processIssuePriorities(labels);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets issue estimates
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueEstimates',
	        value: function getIssueEstimates() {
	            var _this14 = this;

	            return this.getLabels().then(function (labels) {
	                _this14.processIssueEstimates(labels);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets versions
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getVersions',
	        value: function getVersions() {
	            var _this15 = this;

	            return this.getLabels().then(function (labels) {
	                _this15.processVersions(labels);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets milestones
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getMilestones',
	        value: function getMilestones() {
	            var _this16 = this;

	            return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/milestones').then(function (milestones) {
	                _this16.processMilestones(milestones);

	                return Promise.resolve();
	            });
	        }

	        // ----------
	        // Resource adders
	        // ----------
	        /**
	         * Adds a new issue
	         *
	         * @param {Object} issue
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssue',
	        value: function addIssue(issue) {
	            var deletedIssue = deletedIssuesCache.pop();

	            if (deletedIssue) {
	                issue.id = deletedIssue.id;

	                return this.updateIssue(issue).then(function () {
	                    return Promise.resolve(issue);
	                });
	            } else {
	                return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues', this.convertIssue(issue)).then(function (gitHubIssue) {
	                    issue.id = gitHubIssue.number;

	                    return Promise.resolve(issue);
	                });
	            }
	        }

	        /**
	         * Adds collaborator
	         *
	         * @param {String} collaborator
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addCollaborator',
	        value: function addCollaborator(collaborator) {
	            return this.put('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/collaborators/' + collaborator);
	        }

	        /**
	         * Adds label
	         *
	         * @param {String} name
	         * @param {String} color
	         *
	         * @returns {Promise} New label
	         */

	    }, {
	        key: 'addLabel',
	        value: function addLabel(name, color) {
	            return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
	                name: name,
	                color: color || 'ffffff'
	            });
	        }

	        /**
	         * Adds issue type
	         *
	         * @param {String} type
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssueType',
	        value: function addIssueType(type) {
	            return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
	                name: 'type:' + type,
	                color: 'ffffff'
	            }).then(function () {
	                return Promise.resolve(type);
	            });
	        }

	        /**
	         * Adds issue priority
	         *
	         * @param {String} priority
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssuePriority',
	        value: function addIssuePriority(priority) {
	            return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
	                name: 'priority:' + priority,
	                color: 'ffffff'
	            }).then(function () {
	                return Promise.resolve(priority);
	            });
	        }

	        /**
	         * Adds issue estimate
	         *
	         * @param {String} estimate
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssueEstimate',
	        value: function addIssueEstimate(estimate) {
	            return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
	                name: 'estimate:' + estimate,
	                color: 'ffffff'
	            }).then(function () {
	                return Promise.resolve(estimate);
	            });
	        }

	        /**
	         * Adds issue column
	         *
	         * @param {String} column
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssueColumn',
	        value: function addIssueColumn(column) {
	            return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
	                name: 'column:' + column,
	                color: 'ffffff'
	            }).then(function () {
	                return Promise.resolve(column);
	            });
	        }

	        /**
	         * Adds issue attachment
	         *
	         * @param {Issue} issue
	         * @param {Attachment} attachment
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'addIssueAttachment',
	        value: function addIssueAttachment(issue, attachment) {
	            var apiUrl = '/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/contents/issueAttachments/' + issue.id + '/' + attachment.getName();
	            var postData = {
	                message: 'Added attachment "' + attachment.name + '"',
	                content: attachment.base64,
	                branch: 'samoosa-resources'
	            };

	            return this.put(apiUrl, postData).then(function (response) {
	                if (response && response.content) {
	                    attachment.url = response.content.download_url;
	                }

	                return Promise.resolve(attachment);
	            });
	        }

	        /**
	         * Adds milestone 
	         *
	         * @param {Object} milestone
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addMilestone',
	        value: function addMilestone(milestone) {
	            if (typeof milestone == 'string') {
	                milestone = {
	                    title: milestone
	                };
	            }

	            if (milestone instanceof Milestone === false) {
	                milestone = new Milestone(milestone);
	            }

	            return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/milestones', this.convertMilestone(milestone)).then(function (gitHubMilestone) {
	                milestone.id = gitHubMilestone.number;

	                return Promise.resolve(milestone);
	            });
	        }

	        /**
	         * Adds version
	         *
	         * @param {String} version
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addVersion',
	        value: function addVersion(version) {
	            return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
	                name: 'version:' + version,
	                color: 'ffffff'
	            }).then(function () {
	                return Promise.resolve(version);
	            });
	        }

	        // ----------
	        // Resource removers
	        // ----------
	        /**
	         * Removes issue
	         *
	         * @param {Issue} issue
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'removeIssue',
	        value: function removeIssue(issue) {
	            var _this17 = this;

	            issue.deleted = true;
	            deletedIssuesCache.push(issue);

	            resources.issues.splice(issue.index, 1);

	            // Update the issue with the "deleted" label
	            return this.updateIssue(issue)

	            // Get all attachments
	            .then(function () {
	                return _this17.getIssueAttachments(issue);
	            })

	            // Delete attachments one by one
	            .then(function (attachments) {
	                var deleteNextAttachment = function deleteNextAttachment() {
	                    var attachment = attachments.pop();

	                    if (attachment) {
	                        return _this17.removeIssueAttachment(issue, attachment).then(function () {
	                            return deleteNextAttachment();
	                        });
	                    } else {
	                        return Promise.resolve();
	                    }
	                };

	                return deleteNextAttachment();
	            })

	            // Get all comments
	            .then(function () {
	                return _this17.getIssueComments(issue);
	            })

	            // Delete all comments one by one
	            .then(function (comments) {
	                var deleteNextComment = function deleteNextComment() {
	                    var comment = comments.pop();

	                    if (comment) {
	                        return _this17.removeIssueComment(issue, comment).then(function () {
	                            return deleteNextComment();
	                        });
	                    } else {
	                        return Promise.resolve();
	                    }
	                };

	                return deleteNextComment();
	            });
	        }

	        /**
	         * Removes collaborator
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeCollaborator',
	        value: function removeCollaborator(index) {
	            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/collaborators/' + window.resources.collaborators[index]);
	        }

	        /**
	         * Removes issue type
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeIssueType',
	        value: function removeIssueType(index) {
	            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/type:' + window.resources.issueTypes[index]);
	        }

	        /**
	         * Removes issue priority
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeIssuePriority',
	        value: function removeIssuePriority(index) {
	            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/priority:' + window.resources.issuePriorities[index]);
	        }

	        /**
	         * Removes issue estimate
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeIssueEstimate',
	        value: function removeIssueEstimate(index) {
	            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/estimate:' + window.resources.issueEstimates[index]);
	        }

	        /**
	         * Removes issue column
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeIssueColumn',
	        value: function removeIssueColumn(index) {
	            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/column:' + window.resources.issueColumns[index]);
	        }

	        /**
	         * Removes an issue attachment
	         *
	         * @param {Issue} issue
	         * @param {Attachment} attachment
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'removeIssueAttachment',
	        value: function removeIssueAttachment(issue, attachment) {
	            var apiUrl = '/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/contents/issueAttachments/' + issue.id + '/' + attachment.getName();
	            var deleteData = {
	                message: 'Removed attachment "' + attachment.getName() + '"',
	                sha: attachment.sha,
	                branch: 'samoosa-resources'
	            };

	            return this.delete(apiUrl, null, deleteData);
	        }

	        /**
	         * Removes milestone 
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeMilestone',
	        value: function removeMilestone(index) {
	            var milestone = resources.milestones[index];

	            if (!milestone) {
	                return Promise.reject(new Error('Milestone at index "' + index + '" not found'));
	            } else {
	                return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/milestones/' + milestone.id);
	            }
	        }

	        /**
	         * Removes version
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeVersion',
	        value: function removeVersion(index) {
	            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/version:' + window.resources.versions[index]);
	        }

	        // ----------
	        // Resource updaters
	        // ----------
	        /**
	         * Update repository
	         *
	         * @param {Repository} repository
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'updateRepository',
	        value: function updateRepository(repository, previousName) {
	            return this.patch('/repos/' + repository.owner + '/' + previousName, this.convertRepository(repository));
	        }

	        /**
	         * Update issue
	         *
	         * @param {Object} issue
	         */

	    }, {
	        key: 'updateIssue',
	        value: function updateIssue(issue) {
	            return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id, this.convertIssue(issue));
	        }

	        /**
	         * Updates milestone 
	         *
	         * @param {Milestone} milestone
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateMilestone',
	        value: function updateMilestone(milestone) {
	            return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/milestones/' + milestone.id, this.convertMilestone(milestone));
	        }

	        /**
	         * Updates issue type
	         *
	         * @param {String} type
	         * @param {String} previousName
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueType',
	        value: function updateIssueType(type, previousName) {
	            return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/type:' + previousName, {
	                name: 'type:' + type,
	                color: 'ffffff'
	            });
	        }

	        /**
	         * Updates issue priority
	         *
	         * @param {String} priority
	         * @param {String} previousName
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssuePriority',
	        value: function updateIssuePriority(priority, previousName) {
	            return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/priority:' + previousName, {
	                name: 'priority:' + priority,
	                color: 'ffffff'
	            });
	        }

	        /**
	         * Updates issue estimate
	         *
	         * @param {String} estimate
	         * @param {String} previousName
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueEstimate',
	        value: function updateIssueEstimate(estimate, previousName) {
	            return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/estimate:' + previousName, {
	                name: 'estimate:' + estimate,
	                color: 'ffffff'
	            });
	        }

	        /**
	         * Updates issue column
	         *
	         * @param {String} column
	         * @param {String} previousName
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueColumn',
	        value: function updateIssueColumn(column, previousName) {
	            return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/column:' + previousName, {
	                name: 'column:' + column,
	                color: 'ffffff'
	            });
	        }

	        /**
	         * Updates version
	         *
	         * @param {String} version
	         * @param {String} previousName
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateVersion',
	        value: function updateVersion(version, previousName) {
	            return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/version:' + previousName, {
	                name: 'version:' + version,
	                color: 'ffffff'
	            });
	        }

	        // ----------
	        // Resource processing methods
	        // ----------
	        /**
	         * Process repositories
	         *
	         * @param {Array} repositories
	         */

	    }, {
	        key: 'processRepositories',
	        value: function processRepositories(repositories) {
	            window.resources.repositories = [];

	            for (var i in repositories) {
	                var repository = {
	                    index: i,
	                    title: repositories[i].name,
	                    description: repositories[i].description,
	                    cloneUrl: repositories[i].clone_url,
	                    owner: repositories[i].owner.login
	                };

	                window.resources.repositories[i] = repository;
	            }
	        }

	        /**
	         * Process organisations
	         *
	         * @param {Array} orgs
	         */

	    }, {
	        key: 'processOrganizations',
	        value: function processOrganizations(orgs) {
	            resources.organizations = [];

	            for (var i in orgs) {
	                var index = resources.organizations.length;

	                var organization = new Organization({
	                    index: index,
	                    id: orgs[i].id,
	                    name: orgs[i].login,
	                    description: orgs[i].description
	                });

	                resources.organizations[index] = organization;
	            }
	        }

	        /**
	         * Process milestones
	         *
	         * @param {Array} milestones
	         */

	    }, {
	        key: 'processMilestones',
	        value: function processMilestones(milestones) {
	            resources.milestones = [];

	            for (var i in milestones) {
	                var index = resources.milestones.length;

	                var milestone = new Milestone({
	                    index: index,
	                    id: milestones[i].number,
	                    title: milestones[i].title,
	                    description: milestones[i].description,
	                    startDate: milestones[i].created_at,
	                    endDate: milestones[i].due_on
	                });

	                resources.milestones[index] = milestone;
	            }
	        }

	        /**
	         * Process versions
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processVersions',
	        value: function processVersions(labels) {
	            window.resources.versions = [];

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = labels[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var label = _step3.value;

	                    var versionIndex = label.name.indexOf('version:');

	                    if (versionIndex > -1) {
	                        var versionName = label.name.replace('version:', '');

	                        window.resources.versions.push(versionName);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        }

	        /**
	         * Process issue priotities
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processIssuePriorities',
	        value: function processIssuePriorities(labels) {
	            window.resources.issuePriorities = [];

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = labels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var label = _step4.value;

	                    var index = label.name.indexOf('priority:');

	                    if (index > -1) {
	                        var name = label.name.replace('priority:', '');

	                        window.resources.issuePriorities.push(name);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }

	        /**
	         * Process issue estimates
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processIssueEstimates',
	        value: function processIssueEstimates(labels) {
	            window.resources.issueEstimates = [];

	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = labels[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var label = _step5.value;

	                    var index = label.name.indexOf('estimate:');

	                    if (index > -1) {
	                        var name = label.name.replace('estimate:', '');

	                        window.resources.issueEstimates.push(name);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	        }

	        /**
	         * Process issue columns
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processIssueColumns',
	        value: function processIssueColumns(labels) {
	            window.resources.issueColumns = [];

	            window.resources.issueColumns.push('to do');

	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;

	            try {
	                for (var _iterator6 = labels[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var label = _step6.value;

	                    var index = label.name.indexOf('column:');

	                    if (index > -1) {
	                        var name = label.name.replace('column:', '');

	                        window.resources.issueColumns.push(name);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }

	            window.resources.issueColumns.push('done');
	        }

	        /**
	         * Process issue types
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processIssueTypes',
	        value: function processIssueTypes(labels) {
	            window.resources.issueTypes = [];

	            var _iteratorNormalCompletion7 = true;
	            var _didIteratorError7 = false;
	            var _iteratorError7 = undefined;

	            try {
	                for (var _iterator7 = labels[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                    var label = _step7.value;

	                    var index = label.name.indexOf('type:');

	                    if (index > -1) {
	                        var name = label.name.replace('type:', '');

	                        window.resources.issueTypes.push(name);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError7 = true;
	                _iteratorError7 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                        _iterator7.return();
	                    }
	                } finally {
	                    if (_didIteratorError7) {
	                        throw _iteratorError7;
	                    }
	                }
	            }
	        }

	        /**
	         * Process collaborators
	         *
	         * @param {Array} collaborators
	         */

	    }, {
	        key: 'processCollaborators',
	        value: function processCollaborators(collaborators) {
	            window.resources.collaborators = [];

	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;

	            try {
	                for (var _iterator8 = collaborators[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var collaborator = _step8.value;

	                    window.resources.collaborators.push({
	                        name: collaborator.login,
	                        avatar: collaborator.avatar_url
	                    });
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }
	        }

	        /**
	         * Process issues
	         *
	         * @param {Array} issues
	         */

	    }, {
	        key: 'processIssues',
	        value: function processIssues(issues) {
	            window.resources.issues = [];

	            var _iteratorNormalCompletion9 = true;
	            var _didIteratorError9 = false;
	            var _iteratorError9 = undefined;

	            try {
	                for (var _iterator9 = issues[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                    var gitHubIssue = _step9.value;

	                    var issue = new Issue();

	                    issue.title = gitHubIssue.title;
	                    issue.description = gitHubIssue.body;
	                    issue.id = gitHubIssue.number;
	                    issue.reporter = ResourceHelper.getCollaborator(gitHubIssue.user.login);
	                    issue.createdAt = gitHubIssue.created_at;
	                    issue.closedAt = gitHubIssue.closed_at;

	                    if (gitHubIssue.assignee) {
	                        issue.assignee = ResourceHelper.getCollaborator(gitHubIssue.assignee.login);
	                    }

	                    issue.labels = issue.labels || [];

	                    var _iteratorNormalCompletion10 = true;
	                    var _didIteratorError10 = false;
	                    var _iteratorError10 = undefined;

	                    try {
	                        for (var _iterator10 = gitHubIssue.labels[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                            var label = _step10.value;

	                            var typeIndex = label.name.indexOf('type:');
	                            var priorityIndex = label.name.indexOf('priority:');
	                            var estimateIndex = label.name.indexOf('estimate:');
	                            var versionIndex = label.name.indexOf('version:');
	                            var columnIndex = label.name.indexOf('column:');

	                            if (label.name == 'deleted') {
	                                issue.deleted = true;
	                            } else if (typeIndex > -1) {
	                                var name = label.name.replace('type:', '');

	                                issue.type = ResourceHelper.getIssueType(name);
	                            } else if (versionIndex > -1) {
	                                var _name = label.name.replace('version:', '');

	                                issue.version = ResourceHelper.getVersion(_name);
	                            } else if (estimateIndex > -1) {
	                                var _name2 = label.name.replace('estimate:', '');

	                                issue.estimate = ResourceHelper.getIssueEstimate(_name2);
	                            } else if (priorityIndex > -1) {
	                                var _name3 = label.name.replace('priority:', '');

	                                issue.priority = ResourceHelper.getIssuePriority(_name3);
	                            } else if (columnIndex > -1) {
	                                var _name4 = label.name.replace('column:', '');

	                                issue.column = ResourceHelper.getIssueColumn(_name4);
	                            } else {
	                                issue.labels.push(label);
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError10 = true;
	                        _iteratorError10 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                                _iterator10.return();
	                            }
	                        } finally {
	                            if (_didIteratorError10) {
	                                throw _iteratorError10;
	                            }
	                        }
	                    }

	                    if (gitHubIssue.state == 'closed') {
	                        issue.column = resources.issueColumns.length - 1;
	                    }

	                    if (gitHubIssue.milestone) {
	                        issue.milestone = ResourceHelper.getMilestone(gitHubIssue.milestone.title);
	                    }

	                    issue.index = parseInt(gitHubIssue.number) - 1;

	                    if (issue.deleted) {
	                        deletedIssuesCache.push(issue);
	                    } else {
	                        window.resources.issues[issue.index] = issue;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError9 = true;
	                _iteratorError9 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                        _iterator9.return();
	                    }
	                } finally {
	                    if (_didIteratorError9) {
	                        throw _iteratorError9;
	                    }
	                }
	            }
	        }

	        /**
	         * Convert repository model to GitHub schema
	         *
	         * @param {Repository} repository
	         */

	    }, {
	        key: 'convertRepository',
	        value: function convertRepository(repository) {
	            var gitHubRepository = {
	                name: repository.title,
	                description: repository.description,
	                has_issues: true
	            };

	            return gitHubRepository;
	        }

	        /**
	         * Convert milestone model to GitHub schema
	         *
	         * @param {Object} milestone
	         */

	    }, {
	        key: 'convertMilestone',
	        value: function convertMilestone(milestone) {
	            var gitHubMilestone = {
	                title: milestone.title,
	                description: milestone.description,
	                due_on: milestone.getEndDate() ? milestone.getEndDate().toISOString() : null,
	                state: milestone.closed ? 'closed' : 'open'
	            };

	            return gitHubMilestone;
	        }

	        /**
	         * Convert issue model to GitHub schema
	         *
	         * @param {Object} issue
	         */

	    }, {
	        key: 'convertIssue',
	        value: function convertIssue(issue) {
	            // Directly mappable properties
	            var gitHubIssue = {
	                title: issue.title,
	                body: issue.description,
	                number: issue.id,
	                labels: []
	            };

	            // Assignee
	            var assignee = resources.collaborators[issue.assignee];

	            if (assignee) {
	                gitHubIssue.assignee = assignee.name;
	            } else {
	                gitHubIssue.assignee = '';
	            }

	            // State
	            var issueColumn = resources.issueColumns[issue.column];

	            gitHubIssue.state = issueColumn == 'done' ? 'closed' : 'open';

	            // Milestone
	            if (issue.getMilestone()) {
	                gitHubIssue.milestone = issue.getMilestone().id;
	            } else {
	                gitHubIssue.milestone = null;
	            }

	            // Type
	            var issueType = resources.issueTypes[issue.type];

	            if (issueType) {
	                gitHubIssue.labels.push('type:' + issueType);
	            }

	            // Version
	            var version = resources.versions[issue.version];

	            if (version) {
	                gitHubIssue.labels.push('version:' + version);
	            }

	            // Estimate
	            var issueEstimate = resources.issueEstimates[issue.estimate];

	            if (issueEstimate) {
	                gitHubIssue.labels.push('estimate:' + issueEstimate);
	            }

	            // Priority
	            var issuePriority = resources.issuePriorities[issue.priority];

	            if (issuePriority) {
	                gitHubIssue.labels.push('priority:' + issuePriority);
	            }

	            // Column
	            if (issueColumn && issueColumn != 'to do' && issueColumn != 'done') {
	                gitHubIssue.labels.push('column:' + issueColumn);
	            }

	            // Deleted
	            if (issue.deleted) {
	                gitHubIssue.labels.push('deleted');
	            }

	            return gitHubIssue;
	        }

	        /**
	         * Add issue comment
	         *
	         * @param {Issue} issue
	         * @param {String} text
	         */

	    }, {
	        key: 'addIssueComment',
	        value: function addIssueComment(issue, text) {
	            var _this18 = this;

	            return new Promise(function (callback) {
	                _this18.post('/repos/' + _this18.getRepositoryOwner() + '/' + _this18.getRepositoryName() + '/issues/' + issue.id + '/comments', {
	                    body: text
	                }).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Update issue comment
	         *
	         * @param {Issue} issue
	         * @param {Object} comment
	         */

	    }, {
	        key: 'updateIssueComment',
	        value: function updateIssueComment(issue, comment) {
	            var _this19 = this;

	            return new Promise(function (callback) {
	                _this19.patch('/repos/' + _this19.getRepositoryOwner() + '/' + _this19.getRepositoryName() + '/issues/comments/' + comment.index, {
	                    body: comment.text
	                }).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Remove issue comment
	         *
	         * @param {Issue} issue
	         * @param {Object} comment
	         */

	    }, {
	        key: 'removeIssueComment',
	        value: function removeIssueComment(issue, comment) {
	            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/comments/' + comment.index);
	        }

	        /**
	         * Get issue comments
	         *
	         * @param {Object} issue
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueComments',
	        value: function getIssueComments(issue) {
	            var _this20 = this;

	            return new Promise(function (callback) {
	                _this20.get('/repos/' + _this20.getRepositoryOwner() + '/' + _this20.getRepositoryName() + '/issues/' + issue.id + '/comments').then(function (gitHubComments) {
	                    var comments = [];

	                    var _iteratorNormalCompletion11 = true;
	                    var _didIteratorError11 = false;
	                    var _iteratorError11 = undefined;

	                    try {
	                        for (var _iterator11 = gitHubComments[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	                            var gitHubComment = _step11.value;

	                            var comment = {
	                                collaborator: ResourceHelper.getCollaborator(gitHubComment.user.login),
	                                text: gitHubComment.body,
	                                index: gitHubComment.id
	                            };

	                            comments.push(comment);
	                        }
	                    } catch (err) {
	                        _didIteratorError11 = true;
	                        _iteratorError11 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                                _iterator11.return();
	                            }
	                        } finally {
	                            if (_didIteratorError11) {
	                                throw _iteratorError11;
	                            }
	                        }
	                    }

	                    callback(comments);
	                });
	            });
	        }
	    }]);

	    return GitHubApi;
	}(ApiHelper);

	module.exports = GitHubApi;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ApiHelper = function () {
	    function ApiHelper() {
	        _classCallCheck(this, ApiHelper);
	    }

	    _createClass(ApiHelper, [{
	        key: 'clear',

	        /**
	         * Clears all temporary data
	         */
	        value: function clear() {}

	        /**
	         * Get config
	         */

	    }, {
	        key: 'getConfig',
	        value: function getConfig() {
	            return {
	                readonlyResources: []
	            };
	        }

	        // ----------
	        // Checkers
	        // ----------
	        /**
	         * Gets whether we're in spectator mode
	         */

	    }, {
	        key: 'isSpectating',
	        value: function isSpectating() {
	            return Router.query('spectate') == 'true';
	        }

	        /**
	         * Check whether the connection to the source has been made
	         */

	    }, {
	        key: 'checkConnection',
	        value: function checkConnection() {
	            var _this = this;

	            spinner('Connecting to ' + localStorage.getItem('source'));

	            debug.log('Getting user...', this);

	            return this.getUser().then(function (user) {
	                if (!user) {
	                    return Promise.reject(new Error('User could not be retrieved'));
	                }

	                debug.log('Found user "' + user.name + '"', _this);

	                localStorage.setItem('user', user.name);

	                if (!resources.repositories || resources.repositories.length < 1) {
	                    return _this.getRepositories();
	                } else {
	                    return Promise.resolve();
	                }
	            });
	        }

	        // ----------
	        // Session methods
	        // ---------- 
	        /**
	         * Gets the API token and prompts for one if needed
	         * 
	         * @returns {String} token
	         */

	    }, {
	        key: 'getApiToken',
	        value: function getApiToken() {
	            var queryToken = Router.query('token');

	            if (queryToken) {
	                localStorage.setItem('token', queryToken);

	                return queryToken;
	            } else {
	                if (!localStorage.getItem('token')) {
	                    location = '/login';

	                    debug.error('No API token found', this);
	                }

	                return localStorage.getItem('token');
	            }
	        }

	        /**
	         * Get user name
	         */

	    }, {
	        key: 'getUserName',
	        value: function getUserName() {
	            var user = User.getCurrent();

	            if (!user) {
	                location = '/login';

	                debug.warning('No user found', this);

	                return '';
	            }

	            return user.name;
	        }

	        /**
	         * Gets repository owner
	         *
	         * @returns {String} Owner
	         */

	    }, {
	        key: 'getRepositoryOwner',
	        value: function getRepositoryOwner() {
	            var repository = Repository.getCurrent();

	            if (!repository) {
	                return '';
	            }

	            return repository.owner;
	        }

	        /**
	         * Gets repository name
	         *
	         * @returns {String} Repository name
	         */

	    }, {
	        key: 'getRepositoryName',
	        value: function getRepositoryName() {
	            var repository = Repository.getCurrent();

	            if (!repository) {
	                return '';
	            }

	            return repository.title;
	        }

	        /**
	         * Resets the API token and reloads
	         */

	    }, {
	        key: 'resetApiToken',
	        value: function resetApiToken() {
	            localStorage.setItem('token', '');

	            this.getApiToken();
	        }

	        /**
	         * Logs out the currently logged in user and reloads
	         */

	    }, {
	        key: 'logOut',
	        value: function logOut() {
	            localStorage.setItem('token', '');

	            location = '/login';
	        }

	        // ----------
	        // Resource getters
	        // ----------
	        /**
	         * Gets organisations
	         *
	         * @returns {Promise} Array of team names
	         */

	    }, {
	        key: 'getOrganizations',
	        value: function getOrganizations() {
	            window.resources.organization = [];

	            return Promise.resolve();
	        }

	        /**
	         * Gets issues
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssues',
	        value: function getIssues() {
	            window.resources.issues = [];

	            return Promise.resolve();
	        }

	        /**
	         * Gets collaborators
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getCollaborators',
	        value: function getCollaborators() {
	            window.resources.collaborators = [];

	            return Promise.resolve();
	        }

	        /**
	         * Gets issue types
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueTypes',
	        value: function getIssueTypes() {
	            window.resources.issueTypes = [];

	            return Promise.resolve();
	        }

	        /**
	         * Gets issue priorities
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssuePriorities',
	        value: function getIssuePriorities() {
	            window.resources.issuePriorities = [];

	            return Promise.resolve();
	        }

	        /**
	         * Gets issue estimates
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueEstimates',
	        value: function getIssueEstimates() {
	            window.resources.issueEstimates = [];

	            return Promise.resolve();
	        }

	        /**
	         * Gets issue columns
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueColumns',
	        value: function getIssueColumns() {
	            window.resources.issueColumns = [];

	            return Promise.resolve();
	        }

	        /**
	         * Gets milestones 
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getMilestones',
	        value: function getMilestones() {
	            window.resources.milestones = [];

	            return Promise.resolve();
	        }

	        /**
	         * Gets versions 
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getVersions',
	        value: function getVersions() {
	            window.resources.versions = [];

	            return Promise.resolve();
	        }

	        /**
	         * Gets repositories
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getRepositories',
	        value: function getRepositories() {
	            window.resources.repositories = [];

	            return Promise.resolve();
	        }

	        // ----------
	        // Resource adders
	        // ----------
	        /**
	         * Adds issue
	         *
	         * @param {Object} issue
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssue',
	        value: function addIssue(issue) {
	            return Promise.resolve();
	        }

	        /**
	         * Adds collaborator
	         *
	         * @param {String} collaborator
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addCollaborator',
	        value: function addCollaborator(collaborator) {
	            return Promise.resolve();
	        }

	        /**
	         * Adds issue type
	         *
	         * @param {String} type
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssueType',
	        value: function addIssueType(type) {
	            return Promise.resolve();
	        }

	        /**
	         * Adds issue priority
	         *
	         * @param {String} priority
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssuePriority',
	        value: function addIssuePriority(priority) {
	            return Promise.resolve();
	        }

	        /**
	         * Adds issue estimate
	         *
	         * @param {String} estimate
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssueEstimate',
	        value: function addIssueEstimate(estimate) {
	            return Promise.resolve();
	        }

	        /**
	         * Adds issue column
	         *
	         * @param {String} column
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssueColumn',
	        value: function addIssueColumn(column) {
	            return Promise.resolve();
	        }

	        /**
	         * Adds milestone 
	         *
	         * @param {String} milestone
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addMilestone',
	        value: function addMilestone(milestone) {
	            return Promise.resolve();
	        }

	        /**
	         * Adds version
	         *
	         * @param {String} version
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addVersion',
	        value: function addVersion(version) {
	            return Promise.resolve();
	        }

	        // ----------
	        // Resource removers
	        // ----------
	        /**
	         * Removes issue
	         *
	         * @param {Issue} issue
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'removeIssue',
	        value: function removeIssue(issue) {
	            return Promise.resolve();
	        }

	        /**
	         * Removes collaborator
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeCollaborator',
	        value: function removeCollaborator(index) {
	            return Promise.resolve();
	        }

	        /**
	         * Removes issue type
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeIssueType',
	        value: function removeIssueType(index) {
	            return Promise.resolve();
	        }

	        /**
	         * Removes issue priority
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeIssuePriority',
	        value: function removeIssuePriority(index) {
	            return Promise.resolve();
	        }

	        /**
	         * Removes issue estimate
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeIssueEstimate',
	        value: function removeIssueEstimate(index) {
	            return Promise.resolve();
	        }

	        /**
	         * Removes issue column
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeIssueColumn',
	        value: function removeIssueColumn(index) {
	            return Promise.resolve();
	        }

	        /**
	         * Updates issue attachment
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueAttachment',
	        value: function updateIssueAttachment(index) {
	            return Promise.resolve();
	        }

	        /**
	         * Removes milestone 
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeMilestone',
	        value: function removeMilestone(index) {
	            return Promise.resolve();
	        }

	        /**
	         * Removes version
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeVersion',
	        value: function removeVersion(index) {
	            return Promise.resolve();
	        }

	        // ----------
	        // Resource updaters
	        // ---------- 
	        /**
	         * Updates issue
	         *
	         * @param {Object} issue
	         *
	         * @param {Number} index
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssue',
	        value: function updateIssue(index, issue) {
	            return Promise.resolve();
	        }

	        /**
	         * Updates collaborator
	         *
	         * @param {Number} index
	         * @param {String} collaborator
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateCollaborator',
	        value: function updateCollaborator(index, collaborator) {
	            return Promise.resolve();
	        }

	        /**
	         * Updates issue type
	         *
	         * @param {Number} index
	         * @param {String} type
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueType',
	        value: function updateIssueType(index, type) {
	            return Promise.resolve();
	        }

	        /**
	         * Updates issue priority
	         *
	         * @param {Number} index
	         * @param {String} priority
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssuePriority',
	        value: function updateIssuePriority(index, priority) {
	            return Promise.resolve();
	        }

	        /**
	         * Updates issue estimate
	         *
	         * @param {Number} index
	         * @param {String} estimate
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueEstimate',
	        value: function updateIssueEstimate(index, estimate) {
	            return Promise.resolve();
	        }

	        /**
	         * Updates issue column
	         *
	         * @param {Number} index
	         * @param {String} column
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueColumn',
	        value: function updateIssueColumn(index, column) {
	            return Promise.resolve();
	        }

	        /**
	         * Updates milestone 
	         *
	         * @param {Number} index
	         * @param {Object} milestone
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateMilestone',
	        value: function updateMilestone(index, milestone) {
	            return Promise.resolve();
	        }

	        /**
	         * Updates version
	         *
	         * @param {Number} index
	         * @param {String} version
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateVersion',
	        value: function updateVersion(index, version) {
	            return Promise.resolve();
	        }

	        /**
	         * Updates repository
	         *
	         * @param {Number} index
	         * @param {Object} repository
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateRepository',
	        value: function updateRepository(index, repository) {
	            return Promise.resolve();
	        }

	        // ----------
	        // Session methods    
	        // ----------
	        /**
	         * Gets the current user object
	         *
	         * @returns {Promise}
	         */

	    }, {
	        key: 'getUser',
	        value: function getUser() {
	            return Promise.resolve();
	        }

	        // ----------
	        // Issue comment methods
	        // ---------- 
	        /** 
	         * Gets issue comments
	         *
	         * @param {Issue} issue
	         *
	         * @returns {Promise} Array of comments
	         */

	    }, {
	        key: 'getIssueComments',
	        value: function getIssueComments(issue) {
	            return Promise.resolve();
	        }

	        /** 
	         * Adds issue comment
	         *
	         * @param {Issue} issue
	         * @param {Object} comment
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssueComment',
	        value: function addIssueComment(issue, comment) {
	            return Promise.resolve();
	        }

	        /** 
	         * Updates issue comment
	         *
	         * @param {Issue} issue
	         * @param {Object} comment
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueComment',
	        value: function updateIssueComment(issue, comment) {
	            return Promise.resolve();
	        }

	        // ----------
	        // Issue attachment methods
	        // ----------
	        /**
	         * Gets issue attachments
	         *
	         * @param {Issue} issue
	         *
	         * @return {Promise} List of attachments
	         */

	    }, {
	        key: 'getIssueAttachments',
	        value: function getIssueAttachments() {
	            return Promise.resolve([]);
	        }

	        /**
	         * Adds issue attachment
	         *
	         * @param {Issue} issue
	         * @param {Attachment} attachment
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'addIssueAttachment',
	        value: function addIssueAttachment(issue, attachment) {
	            return Promise.resolve();
	        }

	        /**
	         * Removes issue attachment
	         *
	         * @param {Issue} issue
	         * @param {Attachment} attachment
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'removeIssueAttachment',
	        value: function removeIssueAttachment(issue, attachment) {
	            return Promise.resolve();
	        }

	        // ----------
	        // Generic methods
	        // ----------
	        /**
	         * Removes a resource
	         *
	         * @param {String} resource
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeResource',
	        value: function removeResource(resource, index) {
	            debug.log('Removing item from ' + resource + '...', this);

	            switch (resource) {
	                case 'collaborators':
	                    return this.removeCollaborator(index);

	                case 'issueTypes':
	                    return this.removeIssueType(index);

	                case 'issuePriorities':
	                    return this.removeIssuePriority(index);

	                case 'issueEstimates':
	                    return this.removeIssueEstimate(index);

	                case 'issueColumns':
	                    return this.removeIssueColumn(index);

	                case 'milestones':
	                    return this.removeMilestone(index);

	                case 'versions':
	                    return this.removeVersion(index);

	                case 'issues':
	                    return this.removeIssue(index);

	                case 'repositories':
	                    return this.removeRepository(index);

	                default:
	                    return Promise.reject(new Error('Resource "' + resource + '" is invalid for DELETE'));
	            }
	        }

	        /**
	         * Adds a resource
	         *
	         * @param {String} resource
	         * @param {Object} item
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addResource',
	        value: function addResource(resource, item) {
	            debug.log('Adding item to ' + resource + '...', this);

	            switch (resource) {
	                case 'collaborators':
	                    return this.addCollaborator(item);

	                case 'issueTypes':
	                    return this.addIssueType(item);

	                case 'issuePriorities':
	                    return this.addIssuePriority(item);

	                case 'issueEstimates':
	                    return this.addIssueEstimate(item);

	                case 'issueColumns':
	                    return this.addIssueColumn(item);

	                case 'milestones':
	                    return this.addMilestone(item);

	                case 'versions':
	                    return this.addVersion(item);

	                case 'issues':
	                    return this.addIssue(item);

	                case 'repositories':
	                    return this.addRepository(item);

	                default:
	                    return Promise.reject(new Error('Resource "' + resource + '" is invalid for PUT'));
	            }
	        }

	        /**
	         * Updates a resource
	         *
	         * @param {String} resource
	         * @param {Object} item
	         * @param {String} identifier
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateResource',
	        value: function updateResource(resource, item, identifier) {
	            debug.log('Updating item for ' + resource + '...', this);

	            switch (resource) {
	                case 'issueTypes':
	                    return this.updateIssueType(item, identifier);

	                case 'issuePriorities':
	                    return this.updateIssuePriority(item, identifier);

	                case 'issueEstimates':
	                    return this.updateIssueEstimate(item, identifier);

	                case 'issueColumns':
	                    return this.updateIssueColumn(item, identifier);

	                case 'versions':
	                    return this.updateVersion(item, identifier);

	                case 'milestones':
	                    return this.updateMilestone(item);

	                case 'issues':
	                    return this.updateIssue(item);

	                case 'repositories':
	                    return this.updateRepository(item);

	                default:
	                    return Promise.reject(new Error('Resource "' + resource + '" is invalid for POST'));
	            }
	        }

	        /**
	         * Gets a resource
	         *
	         * @param {String} resource
	         * @param {Boolean} dontOverwrite
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getResource',
	        value: function getResource(resource, dontOverwrite) {
	            if (dontOverwrite && resources[resource] && resources[resource].length > 0) {
	                return Promise.resolve();
	            }

	            spinner('Getting ' + resource);

	            switch (resource) {
	                case 'organizations':
	                    return this.getOrganizations();

	                case 'collaborators':
	                    return this.getCollaborators();

	                case 'issueTypes':
	                    return this.getIssueTypes();

	                case 'issuePriorities':
	                    return this.getIssuePriorities();

	                case 'issueEstimates':
	                    return this.getIssueEstimates().then(function () {
	                        ResourceHelper.sortResource('issueEstimates');

	                        return Promise.resolve();
	                    });

	                case 'issueColumns':
	                    return this.getIssueColumns();

	                case 'milestones':
	                    return this.getMilestones();

	                case 'versions':
	                    return this.getVersions();

	                case 'issues':
	                    return this.getIssues();

	                case 'repositories':
	                    return this.getRepositories();

	                default:
	                    return Promise.reject(new Error('Resource "' + resource + '" is invalid for GET'));
	            }
	        }

	        /**
	         * Gets all resources
	         *
	         * @param {Boolean} dontOverwrite
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getResources',
	        value: function getResources(dontOverwrite) {
	            var _this2 = this;

	            spinner('Getting resources');

	            var get = function get(resource) {
	                // If "don't overwrite" is in effect, check if resource is already loaded
	                if (dontOverwrite == true && resources[resource] && resources[resource].length > 0) {
	                    return Promise.resolve();
	                } else {
	                    resources[resource] = [];

	                    return _this2.getResource(resource);
	                }
	            };

	            return get('issueTypes').then(function () {
	                return get('issuePriorities');
	            }).then(function () {
	                return get('issueEstimates');
	            }).then(function () {
	                return get('issueColumns');
	            }).then(function () {
	                return get('collaborators');
	            }).then(function () {
	                return get('milestones');
	            }).then(function () {
	                return get('versions');
	            }).then(function () {
	                return get('organizations');
	            }).then(function () {
	                return get('issues');
	            });
	        }
	    }]);

	    return ApiHelper;
	}();

	module.exports = ApiHelper;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ApiHelper = __webpack_require__(24);

	var BitBucketApi = function (_ApiHelper) {
	    _inherits(BitBucketApi, _ApiHelper);

	    function BitBucketApi() {
	        _classCallCheck(this, BitBucketApi);

	        return _possibleConstructorReturn(this, (BitBucketApi.__proto__ || Object.getPrototypeOf(BitBucketApi)).apply(this, arguments));
	    }

	    _createClass(BitBucketApi, [{
	        key: 'getConfig',

	        /**
	         * Gets the configuration for this plugin
	         */
	        value: function getConfig() {
	            return {
	                readonlyResources: ['issueTypes', 'issueEstimates', 'issuePriorities', 'issueColumns']
	            };
	        }

	        // ----------
	        // Generic API methods
	        // ----------
	        /**
	         * Refresh API token
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            spinner('Refreshing token');

	            return new Promise(function (resolve, reject) {
	                var apiUrl = 'http://api.samoosa.rocks/oauth/bitbucket/?refresh=' + localStorage.getItem('refresh');

	                $.ajax({
	                    url: apiUrl,
	                    type: 'GET',
	                    success: function success(result) {
	                        if (result.token) {
	                            localStorage.setItem('token', result.token);

	                            resolve();
	                        } else {
	                            reject(new Error(result));
	                        }
	                    }
	                });
	            });
	        }

	        /**
	         * Check for refresh
	         *
	         * @param {Object} error
	         *
	         * @returns {Boolean} Whether or not we should refresh
	         */

	    }, {
	        key: 'shouldRefresh',
	        value: function shouldRefresh(error) {
	            if (error.responseJSON && error.responseJSON.error && error.responseJSON.error.message && error.responseJSON.error.message.indexOf('Access token expired') == 0) {
	                debug.log('API token needs a refresh', this);

	                return true;
	            }

	            return false;
	        }

	        /**
	         * GET method
	         *
	         * @param {String} url
	         * @param {String} key
	         * @param {Boolean} recursePages
	         * @param {String} param
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'get',
	        value: function get(url, key, recursePages, param) {
	            var self = this;

	            return new Promise(function (resolve, reject) {
	                var items = [];

	                function getPage(page) {
	                    var apiUrl = 'https://api.bitbucket.org/' + url;

	                    if (recursePages) {
	                        apiUrl += '?limit=50&start=' + page;

	                        if (param) {
	                            apiUrl += '&' + param;
	                        }
	                    } else if (param) {
	                        apiUrl += '?' + param;
	                    }

	                    $.ajax({
	                        url: apiUrl,
	                        type: 'GET',
	                        cache: false,
	                        success: function success(result) {
	                            if (result.error) {
	                                reject(new Error(result.error.message));
	                            } else {
	                                if (key) {
	                                    result = result[key];
	                                }

	                                items = items.concat(result);

	                                if (recursePages && result.length > 0) {
	                                    getPage(page + 1);
	                                } else {
	                                    resolve(items);
	                                }
	                            }
	                        },
	                        beforeSend: function beforeSend(xhr) {
	                            xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
	                        },
	                        error: function error(xhr) {
	                            if (self.shouldRefresh(xhr)) {
	                                self.refresh().then(function () {
	                                    getPage(page);
	                                });
	                            } else {
	                                reject(new Error(xhr.responseText));
	                            }
	                        }
	                    });
	                }

	                getPage(1);
	            });
	        }

	        /**
	         * DELETE method
	         *
	         * @param {String} url
	         * @param {String} param
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'delete',
	        value: function _delete(url, param) {
	            var _this2 = this;

	            var self = this;

	            return new Promise(function (resolve, reject) {
	                $.ajax({
	                    url: 'https://api.bitbucket.org/' + url + '?' + (param ? param + '&' : ''),
	                    type: 'DELETE',
	                    cache: false,
	                    success: function success(result) {
	                        resolve(result);
	                    },
	                    beforeSend: function beforeSend(xhr) {
	                        xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
	                    },
	                    error: function error(e) {
	                        if (_this2.shouldRefresh(e)) {
	                            _this2.refresh().then(function () {
	                                return _this2.delete(url, param);
	                            }).then(function (result) {
	                                resolve(result);
	                            });
	                        } else {
	                            reject(new Error(e.responseText));
	                        }
	                    }
	                });
	            });
	        }

	        /**
	         * PATCH method
	         *
	         * @param {String} url
	         * @param {Object} data
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'patch',
	        value: function patch(url, data) {
	            var _this3 = this;

	            var self = this;

	            return new Promise(function (resolve, reject) {
	                $.ajax({
	                    url: 'https://api.bitbucket.org/' + url,
	                    type: 'POST',
	                    data: data,
	                    cache: false,
	                    success: function success(result) {
	                        resolve(result);
	                    },
	                    beforeSend: function beforeSend(xhr) {
	                        xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
	                    },
	                    error: function error(e) {
	                        if (_this3.shouldRefresh(e)) {
	                            _this3.refresh().then(function () {
	                                return _this3.patch(url, data);
	                            }).then(function (result) {
	                                resolve(result);
	                            });
	                        } else {
	                            reject(new Error(e.responseText));
	                        }
	                    }
	                });
	            });
	        }

	        /**
	         * POST method
	         *
	         * @param {String} url
	         * @param {Object} data
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'post',
	        value: function post(url, data) {
	            var _this4 = this;

	            var self = this;

	            return new Promise(function (resolve, reject) {
	                $.ajax({
	                    url: 'https://api.bitbucket.org/' + url,
	                    type: 'POST',
	                    contentType: data instanceof FormData ? false : undefined,
	                    data: data,
	                    processData: data instanceof FormData == false,
	                    cache: false,
	                    success: function success(result) {
	                        resolve(result);
	                    },
	                    beforeSend: function beforeSend(xhr) {
	                        xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
	                    },
	                    error: function error(e) {
	                        if (_this4.shouldRefresh(e)) {
	                            _this4.refresh().then(function () {
	                                return _this4.post(url, data);
	                            }).then(function (result) {
	                                resolve(result);
	                            });
	                        } else {
	                            reject(new Error(e.responseText));
	                        }
	                    }
	                });
	            });
	        }

	        /**
	         * PUT method
	         *
	         * @param {String} url
	         * @param {Object} data
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'put',
	        value: function put(url, data) {
	            var _this5 = this;

	            var self = this;

	            return new Promise(function (resolve, reject) {
	                $.ajax({
	                    url: 'https://api.bitbucket.org/' + url,
	                    type: 'PUT',
	                    data: data,
	                    cache: false,
	                    success: function success(result) {
	                        resolve(result);
	                    },
	                    beforeSend: function beforeSend(xhr) {
	                        xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
	                    },
	                    error: function error(e) {
	                        if (_this5.shouldRefresh(e)) {
	                            _this5.refresh().then(function () {
	                                return _this5.put(url, data);
	                            }).then(function (result) {
	                                resolve(result);
	                            });
	                        } else {
	                            reject(new Error(e.responseText));
	                        }
	                    }
	                });
	            });
	        }

	        /**
	         * Error message
	         *
	         * @param {Object} error
	         */

	    }, {
	        key: 'error',
	        value: function error(_error) {
	            if (_error) {
	                console.log(JSON.stringify(_error));

	                if (_error.status == 0) {
	                    return;
	                }

	                if (_error.responseJSON && _error.responseJSON.error && _error.responseJSON.error.message) {
	                    displayError(new Error(_error.responseJSON.error.message));
	                } else {
	                    displayError(new Error(_error.responseText));
	                }
	            }
	        }

	        // ----------
	        // Session methods
	        // ----------
	        /**
	         * Gets the currently logged in user object
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getUser',
	        value: function getUser() {
	            if (this.isSpectating()) {
	                return Promise.resolve({ name: '', avatar: '' });
	            }

	            return this.get('1.0/user').then(function (response) {
	                if (response[0]) {
	                    response = response[0];
	                }

	                if (response.user) {
	                    response = response.user;
	                }

	                var bitBucketUser = response;

	                var user = new User({
	                    name: bitBucketUser.username,
	                    id: bitBucketUser.username,
	                    avatar: bitBucketUser.avatar
	                });

	                return Promise.resolve(user);
	            });
	        }

	        // ----------
	        // Resource getters
	        // ----------
	        /**
	         * Gets organisations
	         *
	         * @returns {Promise} Array of organisations
	         */

	    }, {
	        key: 'getOrganizations',
	        value: function getOrganizations() {
	            var _this6 = this;

	            return this.get('2.0/teams', 'values', false, 'role=member').then(function (teams) {
	                _this6.processOrganizations(teams);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets repos
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getRepositories',
	        value: function getRepositories() {
	            var _this7 = this;

	            return new Promise(function (resolve, reject) {
	                _this7.get('1.0/user/repositories').then(function (repositories) {
	                    _this7.processRepositories(repositories);

	                    resolve();
	                }).catch(reject);
	            });
	        }

	        /**
	         * Gets collaborators
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getCollaborators',
	        value: function getCollaborators() {
	            var _this8 = this;

	            if (this.isSpectating()) {
	                return Promise.resolve([]);
	            }

	            return this.get('2.0/teams/' + this.getRepositoryOwner() + '/members').then(function (res) {
	                if (Array.isArray(res)) {
	                    res = res[0];
	                }

	                _this8.processMembers(res.values);

	                return Promise.resolve();
	            }).catch(function (e) {
	                // TODO try something else to retrieve collaborators

	                displayError(e);
	            }).finally(function () {
	                if (resources.collaborators.length < 1) {
	                    resources.collaborators.push(User.getCurrent());
	                }

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets issues
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssues',
	        value: function getIssues() {
	            var _this9 = this;

	            return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues', 'issues', false).then(function (res) {
	                _this9.processIssues(res);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets issue types
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueTypes',
	        value: function getIssueTypes() {
	            resources.issueTypes = ['bug', 'enhancement', 'proposal', 'task'];

	            return Promise.resolve();
	        }

	        /**
	         * Gets issue columns
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueColumns',
	        value: function getIssueColumns() {
	            resources.issueColumns = ['new', 'open', 'resolved', 'closed'];

	            return Promise.resolve();
	        }

	        /**
	         * Gets issue attachments
	         *
	         * @param {Issue} issue
	         *
	         * @returns {Promise} Array of attachments
	         */

	    }, {
	        key: 'getIssueAttachments',
	        value: function getIssueAttachments(issue) {
	            var _this10 = this;

	            return this.get('2.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/attachments', 'values').then(function (response) {
	                if (!Array.isArray(response)) {
	                    return Promise.reject(new Error('Response of issue attachments was not an array'));
	                }

	                var attachments = [];

	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = response[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var obj = _step.value;

	                        if (!obj) {
	                            continue;
	                        }

	                        var apiUrl = 'https://api.bitbucket.org/2.0/repositories/' + _this10.getRepositoryOwner() + '/' + _this10.getRepositoryName() + '/issues/' + issue.id + '/attachments/' + obj.name;

	                        var attachment = new Attachment({
	                            name: obj.name,
	                            isRedirect: true,
	                            url: apiUrl + '?access_token=' + _this10.getApiToken()
	                        });

	                        attachments[attachments.length] = attachment;
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }

	                ;

	                return Promise.resolve(attachments);
	            }).catch(function () {
	                return Promise.resolve([]);
	            });
	        }

	        /**
	         * Gets issue priorities
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssuePriorities',
	        value: function getIssuePriorities() {
	            resources.issuePriorities = ['trivial', 'minor', 'major', 'critical', 'blocker'];

	            return Promise.resolve();
	        }

	        /**
	         * Gets issue estimates
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueEstimates',
	        value: function getIssueEstimates() {
	            resources.issueEstimates = ['15m', '30m', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h'];

	            return Promise.resolve();
	        }

	        /**
	         * Gets versions
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getVersions',
	        value: function getVersions() {
	            var _this11 = this;

	            return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/versions').then(function (versions) {
	                _this11.processVersions(versions);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets milestones
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getMilestones',
	        value: function getMilestones() {
	            var _this12 = this;

	            return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/milestones').then(function (milestones) {
	                _this12.processMilestones(milestones);

	                return Promise.resolve();
	            });
	        }

	        // ----------
	        // Resource adders
	        // ----------
	        /**
	         * Adds a new issue
	         *
	         * @param {Object} issue
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssue',
	        value: function addIssue(issue) {
	            return this.post('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues', this.convertIssue(issue)).then(function (bitBucketIssue) {
	                issue.id = bitBucketIssue.local_id;

	                return Promise.resolve(new Issue(issue));
	            });
	        }

	        /**
	         * Adds collaborator
	         *
	         * @param {String} collaborator
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addCollaborator',
	        value: function addCollaborator(collaborator) {
	            var _this13 = this;

	            return new Promise(function (callback) {
	                _this13.put('1.0/repositories/' + _this13.getRepositoryOwner() + '/' + _this13.getRepositoryName() + '/collaborators/' + collaborator).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Adds issue type
	         *
	         * @param {String} type
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssueType',
	        value: function addIssueType(type) {
	            var _this14 = this;

	            return new Promise(function (callback) {
	                _this14.post('1.0/repositories/' + _this14.getRepositoryOwner() + '/' + _this14.getRepositoryName() + '/labels', {
	                    name: 'type:' + type,
	                    color: 'ffffff'
	                }).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Adds issue priority
	         *
	         * @param {String} priority
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssuePriority',
	        value: function addIssuePriority(priority) {
	            var _this15 = this;

	            return new Promise(function (callback) {
	                _this15.post('1.0/repositories/' + _this15.getRepositoryOwner() + '/' + _this15.getRepositoryName() + '/labels', {
	                    name: 'priority:' + priority,
	                    color: 'ffffff'
	                }).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Adds issue estimate
	         *
	         * @param {String} estimate
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssueEstimate',
	        value: function addIssueEstimate(estimate) {
	            var _this16 = this;

	            return new Promise(function (callback) {
	                _this16.post('1.0/repositories/' + _this16.getRepositoryOwner() + '/' + _this16.getRepositoryName() + '/labels', {
	                    name: 'estimate:' + estimate,
	                    color: 'ffffff'
	                }).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Adds issue column
	         *
	         * @param {String} column
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addIssueColumn',
	        value: function addIssueColumn(column) {
	            var _this17 = this;

	            return new Promise(function (callback) {
	                _this17.post('1.0/repositories/' + _this17.getRepositoryOwner() + '/' + _this17.getRepositoryName() + '/labels', {
	                    name: 'column:' + column,
	                    color: 'ffffff'
	                }).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Adds issue attachment
	         *
	         * @param {Issue} issue
	         * @param {Attachment} attachment
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'addIssueAttachment',
	        value: function addIssueAttachment(issue, attachment) {
	            var apiUrl = '2.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/attachments';
	            var postData = new FormData();

	            postData.append('file', attachment.file);

	            return this.post(apiUrl, postData).then(function (response) {
	                return Promise.resolve(attachment);
	            });
	        }

	        /**
	         * Adds milestone 
	         *
	         * @param {Object} milestone
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addMilestone',
	        value: function addMilestone(milestone) {
	            if (typeof milestone == 'string') {
	                milestone = new Milestone({
	                    title: milestone
	                });
	            }

	            return this.post('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/milestones', this.convertMilestone(milestone)).then(function (bitBucketMilestone) {
	                milestone.id = bitBucketMilestone.id;

	                return Promise.resolve(milestone);
	            });
	        }

	        /**
	         * Adds version
	         *
	         * @param {String} version
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addVersion',
	        value: function addVersion(version) {
	            return this.post('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/versions', {
	                name: version
	            }).then(function (bitBucketVersion) {
	                return Promise.resolve({
	                    title: version,
	                    id: bitBucketVersion.id
	                });
	            });
	        }

	        // ----------
	        // Resource removers
	        // ----------
	        /**
	         * Removes issue
	         *
	         * @param {Issue} issue
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'removeIssue',
	        value: function removeIssue(issue) {
	            return this.delete('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id);
	        }

	        /**
	         * Removes collaborator
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeCollaborator',
	        value: function removeCollaborator(index) {
	            return this.delete('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/collaborators/' + window.resources.collaborators[index]);
	        }

	        /**
	         * Removes an issue attachment
	         *
	         * @param {Issue} issue
	         * @param {Attachment} attachment
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'removeIssueAttachment',
	        value: function removeIssueAttachment(issue, attachment) {
	            var apiUrl = '2.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/attachments/' + attachment.getName();

	            return this.delete(apiUrl);
	        }

	        /**
	         * Removes milestone 
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeMilestone',
	        value: function removeMilestone(index) {
	            var _this18 = this;

	            var milestone = resources.milestones[index];

	            return new Promise(function (callback) {
	                _this18.delete('1.0/repositories/' + _this18.getRepositoryOwner() + '/' + _this18.getRepositoryName() + '/issues/milestones/' + milestone.id).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Removes version
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeVersion',
	        value: function removeVersion(index) {
	            var version = resources.versions[index];

	            return this.delete('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/versions/' + version.id);
	        }

	        // ----------
	        // Resource updaters
	        // ----------
	        /**
	         * Update repo
	         *
	         * @param {Repository} repo
	         *
	         * @returns {Promise} Promise
	         */

	    }, {
	        key: 'updateRepository',
	        value: function updateRepository(repo, previousName) {
	            return this.put('1.0/repositories/' + repo.owner + '/' + (repo.id || previousName), this.convertRepository(repo)).then(function (bitBucketRepository) {
	                return Promise.resolve(repo);
	            });
	        }

	        /**
	         * Update issue
	         *
	         * @param {Object} issue
	         */

	    }, {
	        key: 'updateIssue',
	        value: function updateIssue(issue) {
	            return this.put('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id, this.convertIssue(issue));
	        }

	        /**
	         * Updates milestone 
	         *
	         * @param {Object} milestone
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateMilestone',
	        value: function updateMilestone(milestone) {
	            var _this19 = this;

	            return new Promise(function (callback) {
	                _this19.put('1.0/repositories/' + _this19.getRepositoryOwner() + '/' + _this19.getRepositoryName() + '/issues/milestones/' + milestone.id, _this19.convertMilestone(milestone)).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Updates issue type
	         *
	         * @param {String} type
	         * @param {String} previousName
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueType',
	        value: function updateIssueType(type, previousName) {
	            var _this20 = this;

	            return new Promise(function (callback) {
	                _this20.patch('1.0/repositories/' + _this20.getRepositoryOwner() + '/' + _this20.getRepositoryName() + '/labels/type:' + previousName, {
	                    name: 'type:' + type,
	                    color: 'ffffff'
	                }).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Updates issue priority
	         *
	         * @param {String} priority
	         * @param {String} previousName
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssuePriority',
	        value: function updateIssuePriority(priority, previousName) {
	            var _this21 = this;

	            return new Promise(function (callback) {
	                _this21.patch('1.0/repositories/' + _this21.getRepositoryOwner() + '/' + _this21.getRepositoryName() + '/labels/priority:' + previousName, {
	                    name: 'priority:' + priority,
	                    color: 'ffffff'
	                }).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Updates issue estimate
	         *
	         * @param {String} estimate
	         * @param {String} previousName
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueEstimate',
	        value: function updateIssueEstimate(estimate, previousName) {
	            var _this22 = this;

	            return new Promise(function (callback) {
	                _this22.patch('1.0/repositories/' + _this22.getRepositoryOwner() + '/' + _this22.getRepositoryName() + '/labels/estimate:' + previousName, {
	                    name: 'estimate:' + estimate,
	                    color: 'ffffff'
	                }).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Updates issue column
	         *
	         * @param {String} column
	         * @param {String} previousName
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateIssueColumn',
	        value: function updateIssueColumn(column, previousName) {
	            var _this23 = this;

	            return new Promise(function (callback) {
	                _this23.patch('1.0/repositories/' + _this23.getRepositoryOwner() + '/' + _this23.getRepositoryName() + '/labels/column:' + previousName, {
	                    name: 'column:' + column,
	                    color: 'ffffff'
	                }).then(function () {
	                    callback();
	                });
	            });
	        }

	        /**
	         * Updates version
	         *
	         * @param {String} version
	         * @param {String} previousName
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateVersion',
	        value: function updateVersion(newName, previousName) {
	            var version = resources.versions.filter(function (v) {
	                return v.title == previousName;
	            })[0];

	            return this.put('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/versions/' + version.id, {
	                name: newName
	            });
	        }

	        // ----------
	        // Resource processing methods
	        // ----------
	        /**
	         * Process repositories
	         *
	         * @param {Array} repositories
	         */

	    }, {
	        key: 'processRepositories',
	        value: function processRepositories(repositories) {
	            resources.repositories = [];

	            for (var i in repositories) {
	                var repository = new Repository({
	                    index: i,
	                    id: repositories[i].uuid,
	                    title: repositories[i].slug,
	                    description: repositories[i].description,
	                    owner: repositories[i].owner
	                });

	                resources.repositories[i] = repository;
	            }
	        }

	        /**
	         * Process organisations
	         *
	         * @param {Array} teams
	         */

	    }, {
	        key: 'processOrganizations',
	        value: function processOrganizations(teams) {
	            resources.organizations = [];

	            for (var i in teams) {
	                var index = resources.organizations.length;

	                var organization = new Organization({
	                    index: index,
	                    id: teams[i].uuid,
	                    name: teams[i].username,
	                    description: teams[i].display_name
	                });

	                resources.organizations[index] = organization;
	            }
	        }

	        /**
	         * Process milestones
	         *
	         * @param {Array} milestones
	         */

	    }, {
	        key: 'processMilestones',
	        value: function processMilestones(milestones) {
	            resources.milestones = [];

	            for (var i in milestones) {
	                var milestone = new Milestone({
	                    index: i,
	                    title: milestones[i].name,
	                    id: milestones[i].id
	                });

	                milestone.originalName = milestones[i].name;

	                // Parse end date
	                var endDateRegex = /{% endDate: (\d+) %}/g;
	                var endDateMatches = endDateRegex.exec(milestone.title || '');

	                if (endDateMatches && endDateMatches.length > 1) {
	                    milestone.endDate = endDateMatches[1];
	                }

	                milestone.title = milestone.title.replace(endDateRegex, '');

	                // Add to resources list
	                resources.milestones[i] = milestone;
	            }
	        }

	        /**
	         * Process versions
	         *
	         * @param {Array} versions
	         */

	    }, {
	        key: 'processVersions',
	        value: function processVersions(versions) {
	            window.resources.versions = [];

	            for (var i in versions) {
	                var version = {
	                    index: i,
	                    title: versions[i].name,
	                    id: versions[i].id
	                };

	                window.resources.versions[i] = version;
	            }
	        }

	        /**
	         * Process issue priotities
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processIssuePriorities',
	        value: function processIssuePriorities(labels) {
	            window.resources.issuePriorities = [];

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = labels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var label = _step2.value;

	                    var index = label.name.indexOf('priority:');

	                    if (index > -1) {
	                        var name = label.name.replace('priority:', '');

	                        window.resources.issuePriorities.push(name);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }

	        /**
	         * Process issue estimates
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processIssueEstimates',
	        value: function processIssueEstimates(labels) {
	            window.resources.issueEstimates = [];

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = labels[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var label = _step3.value;

	                    var index = label.name.indexOf('estimate:');

	                    if (index > -1) {
	                        var name = label.name.replace('estimate:', '');

	                        window.resources.issueEstimates.push(name);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            window.resources.issueEstimates.sort(function (a, b) {
	                a = parseFloat(a);
	                b = parseFloat(b);

	                if (a < b) {
	                    return -1;
	                }

	                if (a > b) {
	                    return 1;
	                }

	                return 0;
	            });
	        }

	        /**
	         * Process issue columns
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processIssueColumns',
	        value: function processIssueColumns(labels) {
	            window.resources.issueColumns = [];

	            window.resources.issueColumns.push('to do');

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = labels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var label = _step4.value;

	                    var index = label.name.indexOf('column:');

	                    if (index > -1) {
	                        var name = label.name.replace('column:', '');

	                        window.resources.issueColumns.push(name);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }

	            window.resources.issueColumns.push('done');
	        }

	        /**
	         * Process issue types
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processIssueTypes',
	        value: function processIssueTypes(labels) {
	            window.resources.issueTypes = [];

	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = labels[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var label = _step5.value;

	                    var index = label.name.indexOf('type:');

	                    if (index > -1) {
	                        var name = label.name.replace('type:', '');

	                        window.resources.issueTypes.push(name);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	        }

	        /**
	         * Process team members
	         *
	         * @param {Array} members
	         */

	    }, {
	        key: 'processMembers',
	        value: function processMembers(members) {
	            resources.collaborators = [];

	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;

	            try {
	                for (var _iterator6 = (members || [])[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var member = _step6.value;

	                    resources.collaborators.push({
	                        id: member.username,
	                        name: member.username,
	                        displayName: member.display_name,
	                        avatar: member.links.avatar.href
	                    });
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	        }

	        /**
	         * Process issues
	         *
	         * @param {Array} issues
	         */

	    }, {
	        key: 'processIssues',
	        value: function processIssues(issues) {
	            window.resources.issues = [];

	            var indexCounter = 0;

	            var _iteratorNormalCompletion7 = true;
	            var _didIteratorError7 = false;
	            var _iteratorError7 = undefined;

	            try {
	                for (var _iterator7 = issues[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                    var bitBucketIssue = _step7.value;

	                    var issue = new Issue();

	                    issue.title = bitBucketIssue.title;
	                    issue.setDescriptionWithMetaData(bitBucketIssue.content);
	                    issue.id = bitBucketIssue.local_id;
	                    issue.createdAt = bitBucketIssue.utc_created_on;

	                    if (bitBucketIssue.status == 'closed') {
	                        issue.closedAt = bitBucketIssue.utc_last_updated;
	                    }

	                    issue.reporter = ResourceHelper.getCollaborator(bitBucketIssue.reported_by.username);

	                    if (bitBucketIssue.responsible) {
	                        issue.assignee = ResourceHelper.getCollaborator(bitBucketIssue.responsible.username);
	                    }

	                    // Clean up milestone name
	                    var milestoneDateRegex = /{% (start|end)Date: (\d+) %}/g;

	                    bitBucketIssue.metadata.milestone = (bitBucketIssue.metadata.milestone || '').replace(milestoneDateRegex, '');

	                    issue.priority = ResourceHelper.getIssuePriority(bitBucketIssue.priority);
	                    issue.milestone = ResourceHelper.getMilestone(bitBucketIssue.metadata.milestone);
	                    issue.type = ResourceHelper.getIssueType(bitBucketIssue.metadata.kind);
	                    issue.version = ResourceHelper.getVersion(bitBucketIssue.metadata.version);
	                    issue.column = ResourceHelper.getIssueColumn(bitBucketIssue.status);

	                    issue.index = indexCounter;

	                    window.resources.issues[issue.index] = issue;

	                    indexCounter++;
	                }
	            } catch (err) {
	                _didIteratorError7 = true;
	                _iteratorError7 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                        _iterator7.return();
	                    }
	                } finally {
	                    if (_didIteratorError7) {
	                        throw _iteratorError7;
	                    }
	                }
	            }
	        }

	        /**
	         * Convert repository model to BitBucket schema
	         *
	         * @param {Repository} repository
	         */

	    }, {
	        key: 'convertRepository',
	        value: function convertRepository(repository) {
	            var bitBucketRepository = {
	                name: repository.title,
	                description: repository.description,
	                has_issues: true,
	                is_private: true,
	                project: repository.project
	            };

	            return bitBucketRepository;
	        }

	        /**
	         * Convert milestone model to BitBucket schema
	         *
	         * @param {Object} milestone
	         */

	    }, {
	        key: 'convertMilestone',
	        value: function convertMilestone(milestone) {
	            var bitBucketMilestone = {
	                name: milestone.title,
	                id: milestone.id
	            };

	            // End date
	            if (milestone.getEndDate()) {
	                var endDateString = '{% endDate: ' + milestone.getEndDate().getTime() + ' %}';

	                bitBucketMilestone.name += endDateString;
	            }

	            return bitBucketMilestone;
	        }

	        /**
	         * Convert issue model to BitBucket schema
	         *
	         * @param {Object} issue
	         */

	    }, {
	        key: 'convertIssue',
	        value: function convertIssue(issue) {
	            // Directly mappable properties
	            var bitBucketIssue = {
	                title: issue.title,
	                content: issue.description,
	                local_id: issue.id
	            };

	            // Assignee
	            var assignee = issue.getAssignee();

	            if (assignee) {
	                bitBucketIssue.responsible = assignee.name;
	            } else {
	                bitBucketIssue.responsible = '';
	            }

	            // State
	            var issueColumn = issue.getColumn();

	            bitBucketIssue.status = issueColumn;

	            // Milestone
	            var milestone = issue.getMilestone();

	            if (milestone) {
	                bitBucketIssue.milestone = milestone.originalName;
	            } else {
	                bitBucketIssue.milestone = '';
	            }

	            // Type
	            var issueType = issue.getType();

	            bitBucketIssue.kind = issueType;

	            // Version
	            var version = issue.getVersion();

	            bitBucketIssue.version = version;

	            // Estimate
	            var issueEstimate = resources.issueEstimates[issue.estimate];
	            var estimateString = '{% estimate:' + issueEstimate + ' %}';

	            bitBucketIssue.content += estimateString;

	            // Priority
	            var issuePriority = issue.getPriority();

	            bitBucketIssue.priority = issuePriority;

	            return bitBucketIssue;
	        }

	        /**
	         * Add issue comment
	         *
	         * @param {Issue} issue
	         * @param {String} text
	         */

	    }, {
	        key: 'addIssueComment',
	        value: function addIssueComment(issue, text) {
	            return this.post('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/comments', {
	                content: text
	            });
	        }

	        /**
	         * Update issue comment
	         *
	         * @param {Issue} issue
	         * @param {Object} comment
	         */

	    }, {
	        key: 'updateIssueComment',
	        value: function updateIssueComment(issue, comment) {
	            return this.put('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/comments/' + comment.index, {
	                content: comment.text
	            });
	        }

	        /**
	         * Get issue comments
	         *
	         * @param {Object} issue
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getIssueComments',
	        value: function getIssueComments(issue) {
	            return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/comments').then(function (bitBucketComments) {
	                var comments = [];

	                var _iteratorNormalCompletion8 = true;
	                var _didIteratorError8 = false;
	                var _iteratorError8 = undefined;

	                try {
	                    for (var _iterator8 = bitBucketComments[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                        var bitBucketComment = _step8.value;

	                        var comment = {
	                            collaborator: ResourceHelper.getCollaborator(bitBucketComment.author_info.username),
	                            text: bitBucketComment.content,
	                            index: bitBucketComment.comment_id
	                        };

	                        comments.push(comment);
	                    }
	                } catch (err) {
	                    _didIteratorError8 = true;
	                    _iteratorError8 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                            _iterator8.return();
	                        }
	                    } finally {
	                        if (_didIteratorError8) {
	                            throw _iteratorError8;
	                        }
	                    }
	                }

	                return Promise.resolve(comments);
	            });
	        }
	    }]);

	    return BitBucketApi;
	}(ApiHelper);

	module.exports = BitBucketApi;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * The data model for issues
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Issue = function () {
	    function Issue(properties) {
	        _classCallCheck(this, Issue);

	        properties = properties || {};

	        // Essential properties
	        this.title = properties.title || 'New issue';
	        this.description = properties.description || '';
	        this.id = properties.id;
	        this.reporter = properties.reporter;

	        // Optional properties
	        this.column = properties.column || 0;
	        this.type = properties.type || 0;
	        this.priority = properties.priority || 0;
	        this.estimate = properties.estimate || 0;
	        this.version = properties.version;
	        this.milestone = properties.milestone;
	        this.comments = properties.comments || [];
	        this.assignee = properties.assignee;
	        this.createdAt = properties.createdAt;
	        this.closedAt = properties.closedAt;
	        this.deleted = false;
	    }

	    /**
	     * Parses the description for meta data and assigns the cleaned up description
	     * Meta data is using the {% key:value %} notation
	     *
	     * @param {String} description
	     */


	    _createClass(Issue, [{
	        key: 'setDescriptionWithMetaData',
	        value: function setDescriptionWithMetaData(description) {
	            if (!description) {
	                return;
	            }

	            var tagRegex = /{% (\w+):(.+) %}/g;
	            var nextMatch = tagRegex.exec(description);

	            while (nextMatch != null) {
	                var key = nextMatch[1];
	                var value = nextMatch[2];

	                if (key && value) {
	                    switch (key) {
	                        case 'column':
	                            this.column = ResourceHelper.getIssueColumn(value);
	                            break;

	                        case 'type':
	                            this.type = ResourceHelper.getIssueType(value);
	                            break;

	                        case 'priority':
	                            this.priority = ResourceHelper.getIssuePriority(value);
	                            break;

	                        case 'estimate':
	                            this.estimate = ResourceHelper.getIssueEstimate(value);
	                            break;

	                        case 'version':
	                            this.version = ResourceHelper.getVersion(value);
	                            break;

	                        default:
	                            this[key] = value;
	                            break;
	                    }
	                }

	                nextMatch = tagRegex.exec(this.description);
	            }

	            this.description = description.replace(tagRegex, '');
	        }

	        /**
	         * Gets the attachments
	         *
	         * @returns {Promise} Array of attachments
	         */

	    }, {
	        key: 'getAttachments',
	        value: function getAttachments() {
	            return ApiHelper.getIssueAttachments(this);
	        }

	        /**
	         * Gets the title
	         *
	         * @returns {String} Title
	         */

	    }, {
	        key: 'getTitle',
	        value: function getTitle() {
	            return this.title;
	        }

	        /**
	         * Gets the description
	         *
	         * @returns {String} Description
	         */

	    }, {
	        key: 'getDescription',
	        value: function getDescription() {
	            return this.description;
	        }

	        /**
	         * Gets column
	         *
	         * @returns {String} Column name
	         */

	    }, {
	        key: 'getColumn',
	        value: function getColumn() {
	            return resources.issueColumns[this.column || 0];
	        }

	        /**
	         * Gets type
	         *
	         * @returns {String} Type name
	         */

	    }, {
	        key: 'getType',
	        value: function getType() {
	            return resources.issueTypes[this.type || 0];
	        }

	        /**
	         * Gets priority
	         *
	         * @returns {String} Priority name
	         */

	    }, {
	        key: 'getPriority',
	        value: function getPriority() {
	            return resources.issuePriorities[this.priority || 0];
	        }

	        /**
	         * Gets version
	         *
	         * @returns {String} Version name
	         */

	    }, {
	        key: 'getVersion',
	        value: function getVersion() {
	            return resources.versions[this.version];
	        }

	        /**
	         * Gets milestone
	         *
	         * @returns {Milestone} Milestone object
	         */

	    }, {
	        key: 'getMilestone',
	        value: function getMilestone() {
	            return resources.milestones[this.milestone];
	        }

	        /**
	         * Gets comments
	         *
	         * @returns {Array} Comments
	         */

	    }, {
	        key: 'getComments',
	        value: function getComments() {
	            return this.comments || [];
	        }

	        /**
	         * Gets assignee
	         *
	         * @returns {Collaborator} Collaborator object
	         */

	    }, {
	        key: 'getAssignee',
	        value: function getAssignee() {
	            return resources.collaborators[this.assignee];
	        }

	        /**
	         * Gets reporter
	         *
	         * @returns {Collaborator} Collaborator object
	         */

	    }, {
	        key: 'getReporter',
	        value: function getReporter() {
	            return resources.collaborators[this.reporter];
	        }

	        /**
	         * Gets created at date
	         *
	         * @returns {Date} Created at date
	         */

	    }, {
	        key: 'getCreatedDate',
	        value: function getCreatedDate() {
	            var date = new Date(this.createdAt);

	            if (!this.createdAt || !date || isNaN(date.getTime())) {
	                return null;
	            } else {
	                return date;
	            }
	        }

	        /**
	         * Gets closed at date
	         *
	         * @returns {Date} Closed at date
	         */

	    }, {
	        key: 'getClosedDate',
	        value: function getClosedDate() {
	            var date = new Date(this.closedAt);

	            if (!this.closedAt || !date || isNaN(date.getTime())) {
	                return null;
	            } else {
	                return date;
	            }
	        }

	        /**
	         * Gets estimate
	         *
	         * @returns {String} Estimate
	         */

	    }, {
	        key: 'getEstimate',
	        value: function getEstimate() {
	            return resources.issueEstimates[this.estimate || 0];
	        }

	        /**
	         * Gets estimated hours
	         *
	         * @returns {Number} Hours
	         */

	    }, {
	        key: 'getEstimatedHours',
	        value: function getEstimatedHours() {
	            return estimateToFloat(this.getEstimate());
	        }

	        /**
	         * Gets an object with all the baked values
	         *
	         * @returns {Object} Baked values
	         */

	    }, {
	        key: 'getBakedValues',
	        value: function getBakedValues() {
	            return {
	                column: this.getColumn(),
	                type: this.getType(),
	                priority: this.getPriority(),
	                version: this.getVersion(),
	                milestone: this.getMilestone() ? this.getMilestone().title : null,
	                assignee: this.getAssignee() ? this.getAssignee().name : null,
	                estimate: resources.issueEstimates[this.estimate || -1]
	            };
	        }

	        /**
	         * Check if issue is closed
	         *
	         * @returns {Boolean} closed
	         */

	    }, {
	        key: 'isClosed',
	        value: function isClosed() {
	            return this.column == window.resources.issueColumns.length - 1;
	        }
	    }]);

	    return Issue;
	}();

	module.exports = Issue;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * The data modle for milestones
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Milestone = function () {
	    function Milestone(properties) {
	        _classCallCheck(this, Milestone);

	        properties = properties || {};

	        // Essential properties
	        this.title = properties.title;
	        this.description = properties.description;
	        this.id = properties.id;
	        this.index = properties.index;

	        // Optional properties
	        this.startDate = properties.startDate;
	        this.endDate = properties.endDate;
	    }

	    /**
	     * Finds the start date based on the first created issue
	     */


	    _createClass(Milestone, [{
	        key: 'findStartDate',
	        value: function findStartDate() {
	            if (this.startDate) {
	                return new Date(this.startDate);
	            }

	            var earliest = void 0;

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.getIssues()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var issue = _step.value;

	                    if (issue.getCreatedDate()) {
	                        if (!earliest) {
	                            earliest = issue;
	                        } else if (issue.getCreatedDate() < earliest.getCreatedDate()) {
	                            earliest = issue;
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            if (earliest) {
	                this.startDate = earliest.createdAt;

	                return new Date(this.startDate);
	            } else {
	                debug.log('Could not find start date for milestone "' + this.title + '"', this);
	                return;
	            }
	        }

	        /**
	         * Gets the start date
	         *
	         * @returns {Date} Start date
	         */

	    }, {
	        key: 'getStartDate',
	        value: function getStartDate() {
	            var date = void 0;

	            if (!isNaN(this.startDate)) {
	                date = new Date(parseInt(this.startDate));
	            } else {
	                date = new Date(this.startDate);
	            }

	            if (!this.startDate || !date || isNaN(date.getTime())) {
	                return this.findStartDate();
	            } else {
	                return date;
	            }
	        }

	        /**
	         * Gets the end date
	         *
	         * @returns {Date} End date
	         */

	    }, {
	        key: 'getEndDate',
	        value: function getEndDate() {
	            var date = void 0;

	            if (!isNaN(this.endDate)) {
	                date = new Date(parseInt(this.endDate));
	            } else {
	                date = new Date(this.endDate);
	            }

	            if (!this.endDate || !date || isNaN(date.getTime())) {
	                return null;
	            } else {
	                return date;
	            }
	        }

	        /**
	         * Gets a list of all issues under this milestone
	         *
	         * @returns {Array} Issues
	         */

	    }, {
	        key: 'getIssues',
	        value: function getIssues() {
	            var issues = [];

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = (resources.issues || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var issue = _step2.value;

	                    if (!issue) {
	                        continue;
	                    }

	                    if (issue.getMilestone() == this || !this.index && !issue.milestone) {
	                        issues[issues.length] = issue;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            issues.sort(function (a, b) {
	                if (a.id < b.id) {
	                    return -1;
	                }

	                if (a.id > b.id) {
	                    return 1;
	                }

	                return 0;
	            });

	            return issues;
	        }

	        /**
	         * Gets the total amount of days
	         *
	         * @returns {Number} Days
	         */

	    }, {
	        key: 'getTotalDays',
	        value: function getTotalDays() {
	            var start = this.getStartDate();
	            var end = this.getEndDate();

	            if (!start || !end) {
	                return 0;
	            }

	            var timeDiff = Math.abs(start.getTime() - end.getTime());
	            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

	            return diffDays;
	        }

	        /**
	         * Gets the total of issue estimates in hours
	         *
	         * @returns {Number} Hours
	         */

	    }, {
	        key: 'getTotalEstimatedHours',
	        value: function getTotalEstimatedHours() {
	            var total = 0;

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = this.getIssues()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var issue = _step3.value;

	                    if (!issue) {
	                        continue;
	                    }

	                    total += issue.getEstimatedHours();
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            return total;
	        }

	        /**
	         * Gets remaining issues at day
	         *
	         * @param {Number} day
	         *
	         * @returns {Array} Issues
	         */

	    }, {
	        key: 'getRemainingIssuesAtDay',
	        value: function getRemainingIssuesAtDay(day) {
	            var issues = [];

	            var startDate = this.getStartDate();

	            if (!startDate) {
	                return issues;
	            }

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = this.getIssues()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var issue = _step4.value;

	                    var closedDate = issue.getClosedDate();

	                    if (!closedDate) {
	                        issues[issues.length] = issue;
	                    } else {
	                        var timeDiff = Math.abs(startDate.getTime() - closedDate.getTime());
	                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

	                        if (diffDays > day + 1) {
	                            issues[issues.length] = issue;
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }

	            return issues;
	        }

	        /**
	         * Gets hours left at day
	         *
	         * @param {Number} day
	         *
	         * @returns {Number} Estimated hours left
	         */

	    }, {
	        key: 'getRemainingEstimatedHoursAtDay',
	        value: function getRemainingEstimatedHoursAtDay(day) {
	            var hours = 0;

	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = this.getRemainingIssuesAtDay(day)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var issue = _step5.value;

	                    hours += issue.getEstimatedHours();
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }

	            return hours;
	        }
	    }]);

	    return Milestone;
	}();

	module.exports = Milestone;

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var current = void 0;

	/**
	 * The data model for the user
	 */

	var User = function () {
	    function User(properties) {
	        _classCallCheck(this, User);

	        properties = properties || {};

	        // Essential properties
	        this.name = properties.name;
	        this.id = properties.id;
	        this.avatar = properties.avatar;

	        current = this;
	    }

	    /**
	     * Gets the current user
	     *
	     * @return {User} Current user
	     */


	    _createClass(User, null, [{
	        key: 'getCurrent',
	        value: function getCurrent() {
	            return current;
	        }
	    }]);

	    return User;
	}();

	module.exports = User;

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Repository = function () {
	    function Repository(properties) {
	        _classCallCheck(this, Repository);

	        properties = properties || {};

	        // Essential properties
	        this.title = properties.title;
	        this.description = properties.description || '';
	        this.id = properties.id;
	        this.owner = properties.owner;
	    }

	    /**
	     * Finds a repository by title
	     *
	     * @param {String} title
	     *
	     * @returns {Repository} Repository found
	     */


	    _createClass(Repository, null, [{
	        key: 'find',
	        value: function find(title) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (resources.repositories || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var repository = _step.value;

	                    if (!repository) {
	                        continue;
	                    }

	                    if (repository.title == title) {
	                        return repository;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            debug.warning('Repository "' + title + '" not found', this);

	            return null;
	        }

	        /**
	         * Gets the current repository
	         *
	         * @returns {Repository} Current repository
	         */

	    }, {
	        key: 'getCurrent',
	        value: function getCurrent() {
	            if (!Router.params) {
	                return null;
	            }

	            return Repository.find(Router.params.repository);
	        }
	    }]);

	    return Repository;
	}();

	module.exports = Repository;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Attachment = function () {
	    function Attachment(properties) {
	        _classCallCheck(this, Attachment);

	        properties = properties || {};

	        this.timestamp = properties.timestamp || Date.now();
	        this.name = properties.name;
	        this.base64 = properties.base64;
	        this.url = properties.url;
	        this.headers = properties.headers;
	        this.file = properties.file;
	        this.isRedirect = properties.isRedirect || false;
	    }

	    /**
	     * Check is attachment is an image
	     *
	     * @returns {Boolean} Is image
	     */


	    _createClass(Attachment, [{
	        key: 'isImage',
	        value: function isImage() {
	            if (this.headers) {
	                return this.headers.indexOf('image/') > -1;
	            }

	            if (this.url) {
	                return this.url.match(/\.(png|jpg|bmp|gif)/) != null;
	            }

	            return false;
	        }

	        /**
	         * Gets the timestamp
	         *
	         * @returns {Date} Timestamp
	         */

	    }, {
	        key: 'getTimestamp',
	        value: function getTimestamp() {
	            if (!this.timestamp) {
	                return null;
	            }

	            var date = void 0;

	            if (!isNaN(this.timestamp)) {
	                date = new Date(parseInt(this.timestamp));
	            } else {
	                date = new Date(this.timestamp);
	            }

	            if (!date || isNaN(date.getTime())) {
	                return null;
	            }

	            return date;
	        }

	        /**
	         * Gets the name
	         *
	         * @returns {String} Name
	         */

	    }, {
	        key: 'getName',
	        value: function getName() {
	            return this.name;
	        }

	        /**
	         * Gets the URL
	         *
	         * @returns {String} URL
	         */

	    }, {
	        key: 'getURL',
	        value: function getURL() {
	            return this.url;
	        }

	        /**
	         * Gets the base64 string
	         *
	         * @returns {String} Base64
	         */

	    }, {
	        key: 'getBase64',
	        value: function getBase64() {
	            return this.base64;
	        }
	    }]);

	    return Attachment;
	}();

	module.exports = Attachment;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Organization = function Organization(properties) {
	    _classCallCheck(this, Organization);

	    properties = properties || {};

	    this.id = properties.id;
	    this.index = properties.index;
	    this.name = properties.name;
	    this.description = properties.description;
	};

	module.exports = Organization;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * The navbar view
	 *
	 * @class View Navbar
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Navbar = function (_View) {
	    _inherits(Navbar, _View);

	    function Navbar(params) {
	        _classCallCheck(this, Navbar);

	        var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, params));

	        _this.template = __webpack_require__(33);

	        _this.fetch();
	        return _this;
	    }

	    /**
	     * Gets a list of links
	     */


	    _createClass(Navbar, [{
	        key: 'getLinks',
	        value: function getLinks() {
	            var links = [];

	            links.push({
	                title: 'User',
	                url: '/source/',
	                handler: this.toggleSourcePanel,
	                icon: 'user'
	            });

	            links.push({
	                title: 'Repositories',
	                url: '/repositories/',
	                handler: this.toggleRepositoriesList,
	                icon: 'folder'
	            });

	            links.push({
	                separator: true
	            });

	            links.push({
	                title: 'Schedule',
	                url: '/plan/',
	                icon: 'calendar'
	            });

	            links.push({
	                title: 'Kanban',
	                url: '/board/kanban/',
	                icon: 'columns'
	            });

	            links.push({
	                title: 'List',
	                url: '/board/list/',
	                icon: 'list'
	            });

	            links.push({
	                title: 'Settings',
	                url: '/settings/',
	                icon: 'cog'
	            });

	            links.push({
	                title: 'Analytics',
	                url: '/analytics/',
	                icon: 'line-chart'
	            });

	            return links;
	        }

	        /**
	         * Cleans up extra added classes
	         */

	    }, {
	        key: 'cleanUpClasses',
	        value: function cleanUpClasses() {
	            this.$element.toggleClass('repository-list', false);
	            this.$element.toggleClass('source-panel', false);
	            this.$element.toggleClass('about-panel', false);
	        }

	        /**
	         * Hides the navbar
	         */

	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.cleanUpClasses();
	            this.$element.toggleClass('out', false);
	            this.$element.find('.obscure .content').empty();
	            this.$element.find('.buttons > button').toggleClass('active', false);
	        }

	        /**
	         * Toggles a panel
	         */

	    }, {
	        key: 'togglePanel',
	        value: function togglePanel(url, className, onActive, isActive) {
	            var $button = this.$element.find('.buttons button[data-url="' + url + '"]');
	            var $content = this.$element.find('.obscure .content');

	            if (isActive != true && isActive != false) {
	                isActive = !$button.hasClass('active');
	            }

	            $content.empty();

	            this.$element.find('.buttons button.handler').toggleClass('active', false);

	            $button.toggleClass('active', isActive);

	            this.$element.toggleClass('out', isActive);
	            this.$element.toggleClass(className, isActive);

	            if (isActive) {
	                onActive($content);
	            } else {
	                $content.empty();
	            }
	        }

	        /**
	         * Toggles the about panel
	         */

	    }, {
	        key: 'toggleAboutPanel',
	        value: function toggleAboutPanel(isActive) {
	            this.togglePanel('/', 'about-panel', function ($content) {
	                _.append($content, _.img({ class: 'about-logo', src: '/public/svg/logo-medium.svg' }), _.h1('Samoosa'));
	            }, isActive);
	        }

	        /**
	         * Toggles the source panel
	         */

	    }, {
	        key: 'toggleSourcePanel',
	        value: function toggleSourcePanel(isActive) {
	            var _this2 = this;

	            this.togglePanel('/source/', 'source-panel', function ($content) {
	                ApiHelper.getUser().then(function (user) {
	                    $content.append([_.div({ class: 'current-user' }, _.img({ src: user.avatar }), _.p(user.name), _.button({ class: 'btn' }, 'Log out').click(function (e) {
	                        e.preventDefault();

	                        ApiHelper.logOut();
	                    }))]);
	                }).catch(function (e) {
	                    debug.error(e, _this2);
	                });
	            }, isActive);
	        }

	        /**
	         * Toggles the repositories list
	         */

	    }, {
	        key: 'toggleRepositoriesList',
	        value: function toggleRepositoriesList(isActive, overrideUrl) {
	            this.togglePanel('/repositories/', 'repository-list', function ($content) {
	                var filterRepositories = function filterRepositories(query) {
	                    $content.find('.repository-editor').each(function (i, element) {
	                        var title = $(element).find('.header > h4').text() || '';
	                        var isMatch = title.toLowerCase().indexOf(query.toLowerCase()) > -1;

	                        $(element).toggle(!query || query.length < 2 || isMatch);
	                    });
	                };

	                _.append($content.empty(), _.div({ class: 'repository-list-actions' },
	                /*
	                _.button({class: 'btn btn-new repository-list-action'},
	                    'New repository',
	                    _.span({class: 'fa fa-plus'})
	                ).on('click', (e) => {
	                    let name = prompt('Please input the new repository name');
	                     if(!name) { return; }
	                     ResourceHelper.addResource('repositories', name)
	                    .then((repository) => {
	                        location = '/#/' + repository.owner + '/' + repository.title;
	                    });
	                }),
	                */
	                _.div({ class: 'repository-list-action search' }, _.input({ type: 'text', placeholder: 'Search in repositories...' }).on('change keyup paste', function (e) {
	                    var query = e.target.value;

	                    filterRepositories(query);
	                }), _.span({ class: 'fa fa-search' }))), _.div({ class: 'repository-list-items' }, _.each(window.resources.repositories, function (i, repository) {
	                    return new RepositoryEditor({
	                        model: repository,
	                        overrideUrl: overrideUrl
	                    }).$element;
	                })));
	            }, isActive);
	        }

	        /**
	         * Gets the full router URL
	         *
	         * @param {String} url
	         *
	         * @returns {String} url
	         */

	    }, {
	        key: 'getFullUrl',
	        value: function getFullUrl(url) {
	            // Prepend repository
	            url = '/' + ApiHelper.getRepositoryName() + url;

	            // Prepend user
	            url = '/' + ApiHelper.getRepositoryOwner() + url;

	            return url;
	        }

	        /**
	         * Event: Click on a link
	         *
	         * @param {String} url
	         */

	    }, {
	        key: 'onClickLink',
	        value: function onClickLink(url) {
	            this.cleanUpClasses();
	            this.$element.find('.obscure .content').empty();

	            if (!ApiHelper.getRepositoryName()) {
	                this.toggleRepositoriesList(true, url);
	            } else {
	                url = this.getFullUrl(url);

	                if (url != Router.url) {
	                    this.$element.toggleClass('out', true);

	                    setTimeout(function () {
	                        location.hash = url;
	                    }, 400);
	                }
	            }
	        }

	        /**
	         * Slide navbar in
	         */

	    }, {
	        key: 'slideIn',
	        value: function slideIn() {
	            if (Router.url) {
	                var url = Router.url.replace('/' + ApiHelper.getUserName(), '').replace('/' + ApiHelper.getRepositoryName(), '');

	                if (Router.params.resource) {
	                    url = url.replace(Router.params.resource, '');
	                }

	                this.$element.find('button.active').removeClass('active');
	                this.$element.find('button[data-url*="' + url + '"]').toggleClass('active', true);

	                this.$element.toggleClass('out', false);

	                $('.navbar .obscure .content').empty();
	            }
	        }
	    }]);

	    return Navbar;
	}(View);

	module.exports = Navbar;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function Navbar() {
	    var _this = this;

	    return _.div({ class: 'navbar' }, _.div({ class: 'backdrop' }).click(function () {
	        _this.hide();
	    }), _.div({ class: 'obscure' }, _.div({ class: 'content' })), _.div({ class: 'buttons' }, _.each(this.getLinks(), function (i, link) {
	        if (link.separator) {
	            return _.div({ class: 'separator' });
	        } else {
	            return _.button({
	                title: link.title,
	                'data-url': link.url,
	                class: (link.class || '') + (link.bottom ? ' bottom' : '') + (link.handler ? ' handler' : '')
	            }, _.if(link.icon, _.span({ class: 'fa fa-' + link.icon })), _.if(link.img, _.img({ src: link.img }))).click(function () {
	                _this.cleanUpClasses();

	                if (link.handler) {
	                    link.handler.call(_this);
	                } else if (link.url) {
	                    _this.onClickLink(link.url);
	                }
	            });
	        }
	    })));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * The repository bar view
	 *
	 * @class View Navbar
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RepositoryBar = function (_View) {
	    _inherits(RepositoryBar, _View);

	    function RepositoryBar(params) {
	        _classCallCheck(this, RepositoryBar);

	        var _this = _possibleConstructorReturn(this, (RepositoryBar.__proto__ || Object.getPrototypeOf(RepositoryBar)).call(this, params));

	        _this.template = __webpack_require__(35);

	        _this.model = Repository.getCurrent();

	        _this.fetch();
	        return _this;
	    }

	    /**
	     * Event: Click edit title
	     */


	    _createClass(RepositoryBar, [{
	        key: 'onClickEditTitle',
	        value: function onClickEditTitle() {
	            var $title = this.$element.find('.title');

	            $title.find('.edit').focus().toggleClass('hidden', false);
	            $title.find('.rendered').toggleClass('hidden', true);
	            $title.find('.btn-edit').toggleClass('hidden', true);
	        }

	        /**
	         * Event: Click edit description
	         */

	    }, {
	        key: 'onClickEditDescription',
	        value: function onClickEditDescription() {
	            var $description = this.$element.find('.description');

	            $description.find('.edit').focus().toggleClass('hidden', false);
	            $description.find('.rendered').toggleClass('hidden', true);
	            $description.find('.btn-edit').toggleClass('hidden', true);
	        }

	        /**
	         * Event: Change
	         */

	    }, {
	        key: 'onChange',
	        value: function onChange() {
	            var _this2 = this;

	            var prevTitle = this.model.title;
	            var prevDescription = this.model.description;

	            var newTitle = this.$element.find('.title .edit').val() || prevTitle;
	            var newDescription = this.$element.find('.description .edit').val() || prevDescription;

	            if (prevTitle == newTitle && prevDescription == newDescription) {
	                this.$element.find('.edit').toggleClass('hidden', true);
	                this.$element.find('.rendered, .btn-edit').toggleClass('hidden', false);

	                return;
	            }

	            spinner('Updating "' + this.model.title + '"');

	            ApiHelper.updateRepository(this.model, prevTitle).then(function () {
	                spinner(false);

	                _this2.model.title = newTitle;
	                _this2.model.description = newDescription;

	                _this2.render();

	                if (prevTitle != newTitle) {
	                    location.hash = location.hash.replace(prevTitle, newTitle).replace('#', '');

	                    $('head title').html(newTitle + ' - Samoosa');
	                }
	            }).catch(function (e) {
	                displayError(e);

	                _this2.render();
	            });
	        }
	    }]);

	    return RepositoryBar;
	}(View);

	module.exports = RepositoryBar;

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function RepositoryBar() {
	    return _.div({ class: 'repository-bar' }, _.h4({ class: 'title' }, this.model.title),
	    /*
	        _.span({class: 'rendered'}, this.model.title),
	        _.input({type: 'text', class: 'selectable edit hidden', value: this.model.title})
	            .on('change blur keyup', (e) => {
	                if(e.which && e.which != 13) { return; }
	                 this.onChange();
	            }),
	        _.button({class: 'btn-edit'},
	            _.span({class: 'fa fa-edit'})
	        ).click(() => { this.onClickEditTitle(); })
	    ),
	    */
	    _.p({ class: 'description' }, this.model.description)
	    /*
	        _.span({class: 'rendered'}, this.model.description),
	        _.input({type: 'text', class: 'selectable edit hidden', value: this.model.description})
	            .on('change blur keyup', (e) => {
	                if(e.which && e.which != 13) { return; }
	                 this.onChange();
	            }),
	        _.button({class: 'btn-edit'},
	            _.span({class: 'fa fa-edit'})
	        ).click(() => { this.onClickEditDescription(); })
	    )
	    */
	    );
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IssueEditor = function (_View) {
	    _inherits(IssueEditor, _View);

	    function IssueEditor(params) {
	        _classCallCheck(this, IssueEditor);

	        var _this = _possibleConstructorReturn(this, (IssueEditor.__proto__ || Object.getPrototypeOf(IssueEditor)).call(this, params));

	        _this.template = __webpack_require__(37);

	        _this.fetch();
	        return _this;
	    }

	    /**
	     * Cancels multi select
	     */


	    _createClass(IssueEditor, [{
	        key: 'onClickRemove',


	        /**
	         * Event: Click remove button
	         */
	        value: function onClickRemove() {
	            var _this2 = this;

	            if (confirm('Are you sure you want to delete "' + this.model.title + '"?')) {
	                spinner('Deleting issue');

	                ApiHelper.removeIssue(this.model).then(function () {
	                    _this2.$element.remove();
	                    spinner(false);
	                }).catch(function (e) {
	                    displayError(e);
	                    spinner(false);
	                });
	            }
	        }

	        /**
	         * Event: Click the toggle button
	         */

	    }, {
	        key: 'onClickToggle',
	        value: function onClickToggle(e) {
	            if (e) {
	                e.preventDefault();
	                e.stopPropagation();
	            }

	            if (!this.usingMultiEdit()) {
	                IssueEditor.cancelMultiSelect();
	            }

	            var wasExpanded = this.$element.hasClass('expanded');

	            toggleExpand(this.$element);

	            if (this.usingMultiEdit()) {
	                $('.issue-editor .multi-edit-toggle').each(function () {
	                    this.checked = false;
	                });

	                $('.board-container').toggleClass('multi-edit', !wasExpanded);
	            } else {
	                if (!wasExpanded) {
	                    this.getComments();
	                    this.getAttachments();
	                }
	            }
	        }

	        /**
	         * Gets an IMG tag with the avatar of the assigned collaborator
	         *
	         * @returns {Object} img
	         */

	    }, {
	        key: 'getAssigneeAvatar',
	        value: function getAssigneeAvatar() {
	            var assignee = window.resources.collaborators[this.model.assignee];

	            if (assignee) {
	                return _.img({ src: assignee.avatar });
	            } else {
	                return _.div({ class: 'unassigned' }, _.span({ class: 'fa fa-user' }));
	            }
	        }

	        /**
	         * Gets a property from the DOM of the editor
	         *
	         * @param {String} key
	         * @param {Boolean} useCheckboxes
	         *
	         * @returns {String} value
	         */

	    }, {
	        key: 'getProperty',
	        value: function getProperty(key, useCheckboxes) {
	            var $property = this.$element.find('*[data-property="' + key + '"]');
	            var value = $property.val();

	            if (useCheckboxes) {
	                var $checkbox = this.$element.find('*[data-property="' + key + '"]').siblings('.multi-edit-toggle');

	                if (!$checkbox[0].checked) {
	                    return null;
	                }
	            }

	            return value;
	        }

	        /**
	         * Sets a property to the DOM of the editor
	         *
	         * @param {String} key
	         * @param {String} value
	         */

	    }, {
	        key: 'setProperty',
	        value: function setProperty(key, value) {
	            var $property = this.$element.find('*[data-property="' + key + '"]');
	            $property.val(value);
	        }

	        /**
	         * Updates the model with properties from the DOM
	         */

	    }, {
	        key: 'updateModel',
	        value: function updateModel() {
	            this.model.title = this.getProperty('title');
	            this.model.type = this.getProperty('type');
	            this.model.priority = this.getProperty('priority');
	            this.model.assignee = this.getProperty('assignee');
	            this.model.reporter = this.getProperty('reporter');
	            this.model.version = this.getProperty('version');
	            this.model.description = this.getProperty('description');
	            this.model.estimate = this.getProperty('estimate');
	        }

	        /**
	         * Updates the DOM with properties from the model
	         */

	    }, {
	        key: 'updateDOM',
	        value: function updateDOM() {
	            // Update all fields
	            this.setProperty('title', this.model.title);
	            this.setProperty('type', this.model.type);
	            this.setProperty('priority', this.model.priority);
	            this.setProperty('assignee', this.model.assignee);
	            this.setProperty('version', this.model.version);
	            this.setProperty('description', this.model.description);
	            this.setProperty('estimate', this.model.estimate);

	            // Update data type attribute
	            this.$element.attr('data-type', resources.issueTypes[this.model.type]);

	            // Update avatar image
	            this.$element.find('.header .assignee-avatar').html(this.getAssigneeAvatar());

	            // Update type indicator
	            this.$element.find('.type-indicator').replaceWith(this.getTypeIndicator());

	            // Update priority indicator
	            this.$element.find('.priority-indicator').replaceWith(this.getPriorityIndicator());
	        }

	        /**
	         * Check whether or not we're using multi edit
	         *
	         * @returns {Boolean} active
	         */

	    }, {
	        key: 'usingMultiEdit',
	        value: function usingMultiEdit() {
	            return this.$element.hasClass('selected') && $('.issue-editor.selected').length > 1;
	        }

	        /**
	         * Synchronises the model data with the remote backend
	         */

	    }, {
	        key: 'sync',
	        value: function sync() {
	            var _this3 = this;

	            // Start loading
	            this.$element.toggleClass('loading', true);

	            // Update the issue though the API
	            ApiHelper.updateIssue(this.model).then(function () {
	                _this3.$element.toggleClass('loading', false);
	            });
	        }

	        /**
	         * Event: Click the dragging handle
	         */

	    }, {
	        key: 'onClickDragHandle',
	        value: function onClickDragHandle(e) {
	            var _this4 = this;

	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            if (!InputHelper.isShiftDown) {
	                (function () {
	                    // Set class on board container
	                    $('.board-container').toggleClass('dragging', true);

	                    // Set element
	                    var $element = _this4.$element;

	                    if (_this4.usingMultiEdit()) {
	                        $element = $('.issue-editor.selected');
	                    } else {}
	                    //IssueEditor.cancelMultiSelect();


	                    // Apply temporary CSS properties
	                    $element.each(function (i, element) {
	                        $(element).css({
	                            top: _this4.$element.offset().top,
	                            left: _this4.$element.offset().left,
	                            width: _this4.$element.outerWidth(),
	                            height: _this4.$element.outerHeight(),
	                            'pointer-events': 'none',
	                            'z-index': 999,
	                            'margin-top': i * 15 + 'px'
	                        });
	                    });

	                    // Buffer the offset between mouse cursor and element position
	                    var offset = {
	                        x: _this4.$element.offset().left - e.pageX,
	                        y: _this4.$element.offset().top - e.pageY
	                    };

	                    // Add absolute positioning afterwards to allow getting proper offset
	                    $element.css({
	                        position: 'absolute'
	                    });

	                    // Column mouse hover events
	                    $('.milestone-editor .columns .column').on('mouseenter', function () {
	                        $(this).toggleClass('hovering', true);
	                    }).on('mouseleave', function () {
	                        $(this).toggleClass('hovering', false);
	                    });

	                    // Document pointer movement logic
	                    $(document).off('mousemove').on('mousemove', function (e) {
	                        // Get current pointer location
	                        var current = {
	                            x: e.pageX,
	                            y: e.pageY
	                        };

	                        // Get current viewport
	                        var viewport = {
	                            x: 0,
	                            y: $(document).scrollTop(),
	                            w: $(window).width(),
	                            h: $(window).height()
	                        };

	                        // Apply new CSS positioning values
	                        $element.css({
	                            top: current.y + offset.y,
	                            left: current.x + offset.x
	                        });

	                        // Scroll page if dragging near the top or bottom
	                        var scrollSpeed = 5;

	                        if (current.y > viewport.y + viewport.h - 100) {
	                            scroll(1 * scrollSpeed);
	                        } else if (current.y < viewport.y + 100) {
	                            scroll(-1 * scrollSpeed);
	                        }
	                    });

	                    // Document pointer release mouse button logic
	                    $(document).off('mouseup').on('mouseup', function (e) {
	                        _this4.onReleaseDragHandle(e);
	                    });
	                })();
	            }
	        }

	        /**
	         * Event: Release the dragging handle
	         */

	    }, {
	        key: 'onReleaseDragHandle',
	        value: function onReleaseDragHandle(e) {
	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            // Unregister mouse events
	            $(document).off('mouseup').off('mousemove');

	            // Set element
	            var $element = this.$element;

	            if (this.usingMultiEdit()) {
	                $element = $('.issue-editor.selected');
	            }

	            // Unset temporary classes and styling
	            $('.board-container').toggleClass('dragging', false);
	            $element.removeAttr('style');

	            // Place this element into the hovered column
	            $('.milestone-editor .columns .column.hovering .body').first().prepend($element);

	            // Unregister column mouse events and unset hovering state
	            $('.milestone-editor .columns .column').off('mouseenter').off('mouseleave').toggleClass('hovering', false);

	            // Update model data with new information based on DOM location
	            $element.each(function (i) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = ViewHelper.getAll('IssueEditor')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var view = _step.value;

	                        if (this == view.$element[0]) {
	                            view.model.milestone = view.$element.parents('.milestone-editor').attr('data-index');
	                            view.model.column = view.$element.parents('.column').attr('data-index');

	                            // Trigger the sync event
	                            view.sync();
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            });

	            // Update filters
	            ViewHelper.get('FilterEditor').applyFilters();

	            // Cancel multiselect
	            IssueEditor.cancelMultiSelect();

	            // Update milestones progress
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = ViewHelper.getAll('MilestoneEditor')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var milestoneEditor = _step2.value;

	                    milestoneEditor.updateProgress();
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }

	        /**
	         * Event: Fires on every change to a property
	         */

	    }, {
	        key: 'onChange',
	        value: function onChange() {
	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            // Only update values if we're not using multi edit
	            if (!this.usingMultiEdit()) {
	                this.updateModel();
	                this.updateDOM();
	                this.sync();

	                // Update filters
	                ViewHelper.get('FilterEditor').applyFilters();

	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;

	                try {
	                    for (var _iterator3 = ViewHelper.getAll('MilestoneEditor')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                        var milestoneEditor = _step3.value;

	                        if (milestoneEditor.model == this.model.getMilestone()) {
	                            milestoneEditor.updateProgress();
	                            break;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError3 = true;
	                    _iteratorError3 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                            _iterator3.return();
	                        }
	                    } finally {
	                        if (_didIteratorError3) {
	                            throw _iteratorError3;
	                        }
	                    }
	                }
	            }
	        }

	        /**
	         * Event: Click multi edit apply button
	         */

	    }, {
	        key: 'onClickMultiEditApply',
	        value: function onClickMultiEditApply() {
	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            this.updateModel();
	            this.updateDOM();
	            this.sync();

	            // Look for other IssueEditor views and update them as needed
	            if (this.usingMultiEdit()) {
	                var _iteratorNormalCompletion4 = true;
	                var _didIteratorError4 = false;
	                var _iteratorError4 = undefined;

	                try {
	                    for (var _iterator4 = ViewHelper.getAll('IssueEditor')[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                        var view = _step4.value;

	                        if (view != this && view.$element.hasClass('selected')) {
	                            view.model.type = this.getProperty('type', true) || view.model.type;
	                            view.model.priority = this.getProperty('priority', true) || view.model.priority;
	                            view.model.assignee = this.getProperty('assignee', true) || view.model.assignee;
	                            view.model.version = this.getProperty('version', true) || view.model.version;
	                            view.model.estimate = this.getProperty('estimate', true) || view.model.estimate;

	                            view.updateDOM();
	                            view.sync();
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError4 = true;
	                    _iteratorError4 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                            _iterator4.return();
	                        }
	                    } finally {
	                        if (_didIteratorError4) {
	                            throw _iteratorError4;
	                        }
	                    }
	                }
	            }

	            // Update filters
	            ViewHelper.get('FilterEditor').applyFilters();
	        }

	        /**
	         * Event: Click multi edit cancel button
	         */

	    }, {
	        key: 'onClickMultiEditCancel',
	        value: function onClickMultiEditCancel() {
	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            IssueEditor.cancelMultiSelect();
	        }

	        /**
	         * Event: Fires on changing a checkbox
	         */

	    }, {
	        key: 'onChangeCheckbox',
	        value: function onChangeCheckbox(e) {
	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            e.preventDefault();
	            e.stopPropagation();

	            if (this.$element.hasClass('selected')) {
	                this.$element.find('.multi-edit-toggle').each(function (i) {
	                    var otherCheckbox = $('.issue-editor.selected .multi-edit-toggle')[i];

	                    otherCheckbox.checked = this.checked;
	                });
	            }
	        }

	        /**
	         * Event: Click the edit button of a field
	         */

	    }, {
	        key: 'onClickEdit',
	        value: function onClickEdit(e) {
	            e.preventDefault();
	            e.stopPropagation();

	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            if (!InputHelper.isShiftDown && !$(this).parents('.issue-editor').hasClass('selected')) {
	                $(this).toggleClass('hidden', true).siblings('.rendered').toggleClass('hidden', true).siblings('.edit').toggleClass('hidden', false).focus().select();
	            }
	        }

	        /**
	         * Event: Click the comment button
	         */

	    }, {
	        key: 'onClickComment',
	        value: function onClickComment() {
	            var _this5 = this;

	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            var text = this.$element.find('.add-comment textarea').val();

	            this.$element.toggleClass('loading', true);

	            this.$element.find('.add-comment textarea').val('');

	            ApiHelper.addIssueComment(this.model, text).then(function () {
	                _this5.getComments();
	            });
	        }

	        /**
	         * Event: Key up on input fields
	         *
	         * @param {Event} e
	         */

	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(e) {
	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            var foundAnyFuzzyMatches = false;

	            var replaced = $(this).val().replace(/@[a-zA-Z0-9-_]+ /g, function (string) {
	                var fuzzyMatch = void 0;
	                var typedName = string.replace('@', '').replace(' ', '').toLowerCase();

	                var _iteratorNormalCompletion5 = true;
	                var _didIteratorError5 = false;
	                var _iteratorError5 = undefined;

	                try {
	                    for (var _iterator5 = (resources.collaborators || [])[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                        var collaborator = _step5.value;

	                        if (!collaborator) {
	                            continue;
	                        }

	                        if (typedName == collaborator.name || typedName == collaborator.displayName) {
	                            return string;
	                        } else if (collaborator.name.toLowerCase().indexOf(typedName) == 0) {
	                            fuzzyMatch = collaborator.name;
	                        } else if (collaborator.displayName && collaborator.displayName.toLowerCase().indexOf(typedName) == 0) {
	                            fuzzyMatch = collaborator.displayName;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError5 = true;
	                    _iteratorError5 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                            _iterator5.return();
	                        }
	                    } finally {
	                        if (_didIteratorError5) {
	                            throw _iteratorError5;
	                        }
	                    }
	                }

	                if (fuzzyMatch) {
	                    foundAnyFuzzyMatches = true;

	                    return '@' + fuzzyMatch + ' ';
	                } else {
	                    return string;
	                }
	            });

	            if (foundAnyFuzzyMatches) {
	                $(this).val(replaced);

	                $(this).change();
	            }
	        }

	        /**
	         * Event: Remove focus from input fields
	         *
	         * @param {Event} e
	         */

	    }, {
	        key: 'onBlur',
	        value: function onBlur(e) {
	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            $(e.target).toggleClass('hidden', true).siblings('.rendered').toggleClass('hidden', false).siblings('.btn-edit').toggleClass('hidden', false);
	        }

	        /**
	         * Event: Click entire container element
	         *
	         * @param {Object} event
	         */

	    }, {
	        key: 'onClickElement',
	        value: function onClickElement(e) {
	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            // Check for shift key
	            if (InputHelper.isShiftDown) {
	                e.preventDefault();
	                e.stopPropagation();

	                this.$element.toggleClass('selected');

	                if (this.$element.hasClass('selected')) {
	                    this.$element.toggleClass('expanded', false);
	                }
	            }
	        }

	        /**
	         * Event: On click remove attachment
	         *
	         * @param {Attachment} attachment
	         */

	    }, {
	        key: 'onClickRemoveAttachment',
	        value: function onClickRemoveAttachment(attachment) {
	            var _this6 = this;

	            if (!confirm('Are you sure you want to remove the attachment "' + attachment.name + '"?')) {
	                return;
	            }

	            ApiHelper.removeIssueAttachment(this.model, attachment).then(function () {
	                modal(false);
	                _this6.getAttachments();
	            });
	        }

	        /**
	         * Event: On click attachment
	         *
	         * @param {Attachment} attachment
	         */

	    }, {
	        key: 'onClickAttachment',
	        value: function onClickAttachment(attachment) {
	            var _this7 = this;

	            modal(_.div({ class: 'modal-attachment' }, _.img({ src: attachment.getURL() }), _.div({ class: 'modal-attachment-toolbar' }, _.button({ class: 'btn-remove-attachment' }, _.span({ class: 'fa fa-trash' })).click(function () {
	                _this7.onClickRemoveAttachment(attachment);
	            }))));
	        }

	        /**
	         * Event: Paste
	         *
	         * @param {Event} e
	         */

	    }, {
	        key: 'onPaste',
	        value: function onPaste(e) {
	            e = e.originalEvent;

	            var items = e.clipboardData.items;
	            var IMAGE_MIME_REGEX = /^image\/(p?jpeg|gif|png)$/i;

	            // Look through all clipboard items
	            for (var i = 0; i < items.length; i++) {
	                // Check for image MIME type
	                if (IMAGE_MIME_REGEX.test(items[i].type)) {
	                    var blob = items[i].getAsFile();
	                    var file = null;

	                    this.attachFile(blob);
	                    return;
	                }
	            }
	        }

	        /**
	         * Event: Attachment file input
	         *
	         * @param {Event} e
	         */

	    }, {
	        key: 'onAttachmentFileInputChange',
	        value: function onAttachmentFileInputChange(e) {
	            if (e.target.files && e.target.files.length > 0) {
	                this.attachFile(e.target.files[0]);
	            }
	        }

	        /**
	         * Attaches an image from file
	         *
	         * @param {File} file
	         */

	    }, {
	        key: 'attachFile',
	        value: function attachFile(file) {
	            var _this8 = this;

	            var reader = new FileReader();

	            // Event: On file loaded
	            reader.onload = function (e) {
	                var base64 = e.target.result;

	                // Remove headers
	                var headersRegex = /data:(.+);base64,/;
	                var headersMatch = headersRegex.exec(base64);

	                base64 = base64.replace(headersRegex, '');

	                if (file instanceof File == false) {
	                    try {
	                        file = new File([file], 'pasted_' + new Date().getTime() + '.png');
	                    } catch (e) {}
	                }

	                spinner('Attaching "' + file.name + '"');

	                var attachment = new Attachment({
	                    name: file.name,
	                    file: file,
	                    base64: base64,
	                    headers: headersMatch ? headersMatch[0] : null
	                });

	                ApiHelper.addIssueAttachment(_this8.model, attachment).then(function (uploadedAttachment) {
	                    _this8.getAttachments();

	                    spinner(false);
	                }).catch(function (e) {
	                    displayError(e);

	                    spinner(false);
	                });
	            };

	            // Read the file
	            reader.readAsDataURL(file);
	        }

	        /**
	         * Gets priority icon
	         *
	         * @returns {String} icon
	         */

	    }, {
	        key: 'getPriorityIndicator',
	        value: function getPriorityIndicator() {
	            var priority = this.model.getPriority();
	            var icon = '';

	            switch (priority) {
	                case 'low':case 'trivial':
	                    icon = 'arrow-down';
	                    break;

	                case 'medium':case 'minor':
	                    icon = 'arrow-up';
	                    break;

	                case 'high':case 'major':
	                    icon = 'arrow-up';
	                    break;

	                case 'blocker':case 'critical':
	                    icon = 'arrow-up';
	                    break;
	            }

	            return _.span({ class: 'priority-indicator fa fa-' + icon + ' ' + priority });
	        }

	        /**
	         * Gets type icon
	         *
	         * @returns {String} icon
	         */

	    }, {
	        key: 'getTypeIndicator',
	        value: function getTypeIndicator() {
	            var type = this.model.getType();
	            var icon = '';

	            switch (type) {
	                case 'proposal':
	                    icon = 'lightbulb-o';
	                    break;

	                case 'bug':
	                    icon = 'bug';
	                    break;

	                case 'improvement':case 'enhancement':
	                    icon = 'arrow-circle-o-up';
	                    break;

	                case 'feature':case 'new feature':
	                    icon = 'plus';
	                    break;

	                case 'task':
	                    icon = 'check';
	                    break;

	                case 'question':
	                    icon = 'question';
	                    break;
	            }

	            return _.span({ class: 'type-indicator fa fa-' + icon + ' ' + type });
	        }

	        /**
	         * Lazy load the attachments
	         */

	    }, {
	        key: 'getAttachments',
	        value: function getAttachments() {
	            var _this9 = this;

	            this.$element.toggleClass('loading', true);

	            var $attachments = this.$element.find('.attachments');

	            ApiHelper.getIssueAttachments(this.model).then(function (attachments) {
	                _this9.$element.toggleClass('loading', false);

	                $attachments.children('.attachment').remove();

	                _.append($attachments, _.each(attachments, function (i, attachment) {
	                    return _.div({ class: 'attachment' }, _.label({}, _.if(!attachment.isRedirect && attachment.isImage(), _.img({ src: attachment.getURL() })), attachment.name), _.a({ class: 'btn-download-attachment fa fa-download', href: attachment.getURL(), target: '_blank' }), _.button({ class: 'btn-remove-attachment' }, _.span({ class: 'fa fa-trash' })).click(function () {
	                        _this9.onClickRemoveAttachment(attachment);
	                    }));
	                }));
	            });
	        }

	        /**
	         * Lazy load the comments
	         */

	    }, {
	        key: 'getComments',
	        value: function getComments() {
	            var _this10 = this;

	            this.$element.toggleClass('loading', true);

	            var $comments = this.$element.find('.comments');
	            var user = User.getCurrent();

	            ApiHelper.getIssueComments(this.model).then(function (comments) {
	                _this10.$element.toggleClass('loading', false);

	                $comments.children('.comment').remove();

	                _.append($comments, _.each(comments, function (i, comment) {
	                    var collaborator = resources.collaborators[comment.collaborator];
	                    var text = markdownToHtml(comment.text);
	                    var isUser = collaborator.name == user.name;

	                    return _.div({ class: 'comment', 'data-index': comment.index }, _.div({ class: 'collaborator' }, _.img({ src: collaborator.avatar }), _.p(collaborator.displayName || collaborator.name)), _.if(isUser, _.button({ class: 'btn-edit' }, _.span({ class: 'fa fa-edit' })).click(_this10.onClickEdit), _.div({ class: 'rendered' }, text), _.textarea({ class: 'edit selectable hidden text btn-transparent' }, comment.text).change(function () {
	                        _this10.$element.toggleClass('loading', true);

	                        comment.text = _this10.$element.find('.comments .comment[data-index="' + comment.index + '"] textarea').val();

	                        _this10.$element.find('.comments .comment[data-index="' + comment.index + '"] .rendered').html(markdownToHtml(comment.text) || '');

	                        ApiHelper.updateIssueComment(_this10.model, comment).then(function () {
	                            _this10.$element.toggleClass('loading', false);
	                        });
	                    }).blur(_this10.onBlur)), _.if(!isUser, _.div({ class: 'text' }, text)));
	                }));
	            });
	        }
	    }], [{
	        key: 'cancelMultiSelect',
	        value: function cancelMultiSelect() {
	            $('.issue-editor').toggleClass('selected', false);
	            $('.issue-editor .multi-edit-toggle').each(function () {
	                this.checked = false;
	            });
	            $('.board-container').toggleClass('multi-edit', false);
	        }
	    }]);

	    return IssueEditor;
	}(View);

	module.exports = IssueEditor;

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Issue editor template
	 */
	module.exports = function render() {
	    var _this = this;

	    return _.div({ class: 'issue-editor', 'data-index': this.model.index, 'data-type': resources.issueTypes[this.model.type] },

	    // Header
	    _.div({ class: 'header' },
	    // Drag handle
	    _.div({ class: 'drag-handle' }, _.span({ class: 'fa fa-bars' })).on('mousedown', function (e) {
	        _this.onClickDragHandle(e);
	    }),

	    // Header content
	    _.div({ class: 'header-content' },
	    // Icons                
	    _.div({ class: 'header-icons' },
	    // Type indicator
	    this.getTypeIndicator(),

	    // Priority indicator
	    this.getPriorityIndicator(),

	    // Issue id
	    _.span({ class: 'issue-id' }, this.model.id)),

	    // Assignee avatar
	    _.if(!ApiHelper.isSpectating(), _.div({ class: 'assignee-avatar' }, this.getAssigneeAvatar())),

	    // Center section
	    _.div({ class: 'header-center' },
	    // Title
	    _.h4({ class: 'issue-title' }, _.span({ class: 'rendered' }, this.model.title), _.input({ type: 'text', class: 'selectable edit hidden btn-transparent', 'data-property': 'title', value: this.model.title }).change(function () {
	        _this.onChange();

	        _this.$element.find('.header .rendered').html(_this.model.title);
	    }).blur(this.onBlur).keyup(function (e) {
	        if (e.which == 13) {
	            _this.onBlur(e);
	        }
	    }), _.button({ class: 'btn-edit' }).click(this.onClickEdit)))),

	    // Expand/collapse button
	    _.button({ class: 'btn-toggle btn-transparent' }, _.span({ class: 'fa icon-close fa-chevron-up' }), _.span({ class: 'fa icon-open fa-chevron-down' })).click(function (e) {
	        _this.onClickToggle(e);
	    })).click(function (e) {
	        _this.onClickElement(e);
	    }),

	    // Meta information
	    _.div({ class: 'meta' },

	    // Multi edit notification
	    _.div({ class: 'multi-edit-notification' }, 'Now editing multiple issues'),

	    // Reporter
	    _.if(resources.collaborators.length > 0, _.div({ class: 'meta-field reporter readonly' }, _.label('Reporter'), _.p(this.model.getReporter() ? this.model.getReporter().displayName || this.model.getReporter().name : '(unknown)'))),

	    // Assignee
	    _.if(resources.collaborators.length > 0, _.div({ class: 'meta-field assignee' }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Assignee'), _.select({ 'data-property': 'assignee', disabled: ApiHelper.isSpectating() }, _.option({ value: null }, '(unassigned)'), _.each(resources.collaborators, function (i, collaborator) {
	        return _.option({ value: i }, collaborator.displayName || collaborator.name);
	    })).change(function () {
	        _this.onChange();
	    }).val(this.model.assignee))),

	    // Type
	    _.div({ class: 'meta-field type' + (window.resources.issueTypes.length < 1 ? ' hidden' : '') }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Type'), _.select({ 'data-property': 'type', disabled: ApiHelper.isSpectating() }, _.each(window.resources.issueTypes, function (i, type) {
	        return _.option({ value: i }, type);
	    })).change(function () {
	        _this.onChange();
	    }).val(this.model.type)),

	    // Priority
	    _.div({ class: 'meta-field priority' + (window.resources.issuePriorities.length < 1 ? ' hidden' : '') }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Priority'), _.select({ 'data-property': 'priority', disabled: ApiHelper.isSpectating() }, _.each(window.resources.issuePriorities, function (i, priority) {
	        return _.option({ value: i }, priority);
	    })).change(function () {
	        _this.onChange();
	    }).val(this.model.priority)),

	    // Version
	    _.div({ class: 'meta-field version' + (window.resources.versions.length < 1 ? ' hidden' : '') }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Version'), _.select({ 'data-property': 'version', disabled: ApiHelper.isSpectating() }, _.each(window.resources.versions, function (i, version) {
	        return _.option({ value: i }, version);
	    })).change(function () {
	        _this.onChange();
	    }).val(this.model.version)),

	    // Estimate
	    _.div({ class: 'meta-field estimate' + (window.resources.issueEstimates.length < 1 ? ' hidden' : '') }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Estimate'), _.select({ 'data-property': 'estimate', disabled: ApiHelper.isSpectating() }, _.each(window.resources.issueEstimates, function (i, estimate) {
	        return _.option({ value: i }, estimate);
	    })).change(function () {
	        _this.onChange();
	    }).val(this.model.estimate)),

	    // Multi edit actions
	    _.div({ class: 'multi-edit-actions' }, _.button({ class: 'btn' }, 'Cancel').click(function () {
	        _this.onClickMultiEditCancel();
	    }), _.button({ class: 'btn' }, 'Apply').click(function () {
	        _this.onClickMultiEditApply();
	    }))),

	    // Body
	    _.div({ class: 'body' },

	    // Description
	    _.button({ class: 'btn-edit' }, _.span({ class: 'fa fa-edit' })).click(this.onClickEdit), _.label('Description'), _.div({ class: 'rendered' }, markdownToHtml(this.model.description)), _.textarea({ class: 'selectable edit hidden btn-transparent', 'data-property': 'description' }, this.model.description).change(function () {
	        _this.onChange();

	        _this.$element.find('.body .rendered').html(markdownToHtml(_this.model.description) || '');
	    }).blur(this.onBlur).keyup(this.onKeyUp).on('paste', function (e) {
	        _this.onPaste(e);
	    })),

	    // Attachments
	    _.div({ class: 'attachments' }, _.label('Attachments'), _.input({ name: 'file', id: 'input-upload-attachment-' + this.model.id, type: 'file' }).change(function (e) {
	        _this.onAttachmentFileInputChange(e);
	    }), _.label({ for: 'input-upload-attachment-' + this.model.id, class: 'btn-upload-attachment' }, _.span({ class: 'fa fa-upload' }))),

	    // Comments
	    _.div({ class: 'comments' }, _.label('Comments')),

	    // Add comment
	    _.if(!ApiHelper.isSpectating(), _.div({ class: 'add-comment' },
	    // Add comment input
	    _.textarea({ class: 'btn-transparent', placeholder: 'Add comment here...' }).keyup(this.onKeyUp).on('paste', function (e) {
	        _this.onPaste(e);
	    }),

	    // Remove button
	    _.if(!ApiHelper.isSpectating(), _.button({ class: 'btn btn-remove' }, _.span({ class: 'fa fa-trash' })).click(function () {
	        _this.onClickRemove();
	    })),

	    // Add comment button
	    _.button({ class: 'btn' }, 'Comment').click(function () {
	        _this.onClickComment();
	    }))));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * An editor for milestones, displaying issues in columns or rows
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MilestoneEditor = function (_View) {
	    _inherits(MilestoneEditor, _View);

	    function MilestoneEditor(params) {
	        _classCallCheck(this, MilestoneEditor);

	        var _this = _possibleConstructorReturn(this, (MilestoneEditor.__proto__ || Object.getPrototypeOf(MilestoneEditor)).call(this, params));

	        _this.template = __webpack_require__(39);

	        _this.fetch();

	        _this.updateProgress();
	        return _this;
	    }

	    /**
	     * Event: Click print button
	     */


	    _createClass(MilestoneEditor, [{
	        key: 'onClickPrint',
	        value: function onClickPrint() {
	            var html = '';
	            var repository = Repository.getCurrent();

	            html += '<!DOCTYPE html>';
	            html += '<html>';

	            // Header
	            html += '<head>';
	            html += '<meta charset="utf-8"/>';
	            html += '<meta http-equiv="X-UA-Compatible" content="IE=edge"/>';
	            html += '<meta name="viewport" content="width=device-width initial-scale=1"/>';
	            html += '<meta name="robots" content"noindex, nofollow"/>';
	            html += '<title>' + repository.title + ': ' + this.model.title + '</title>';
	            html += '<style>body { font-family: sans-serif; }</style>';
	            html += '</head>';

	            // Body
	            html += '<body>';

	            // Repository title and description
	            html += '<h1>' + repository.title + '</h1>';

	            if (repository.description) {
	                html += '<p>' + repository.description + '</p>';
	            }

	            // Milestone title and description
	            html += '<h2>' + this.model.title;

	            if (this.model.getTotalEstimatedHours() > 0) {
	                html += ' (' + this.model.getTotalEstimatedHours() + ' hours)';
	            }

	            html + '</h2>';

	            if (this.model.description) {
	                html += '<p>' + this.model.description + '</p>';
	            }

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.model.getIssues()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var issue = _step.value;

	                    // Issue title
	                    html += '<h3>' + issue.title;

	                    if (issue.getEstimatedHours() > 0) {
	                        html += ' (' + issue.getEstimatedHours() + ' hour' + (issue.getEstimatedHours() != 1 ? 's' : '') + ')';
	                    }

	                    html += '</h3>';

	                    // Issue body
	                    html += markdownToHtml(issue.description);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            html += '</body>';
	            html += '</html>';

	            // Instantiate window
	            var printWindow = window.open('', 'PRINT', 'width=780');

	            printWindow.document.write(html);
	        }

	        /**
	         * Event: Click new issue button
	         */

	    }, {
	        key: 'onClickNewIssue',
	        value: function onClickNewIssue() {
	            var _this2 = this;

	            spinner('Creating issue');

	            var issue = new Issue({
	                milestone: this.model.index,
	                reporter: ResourceHelper.getCollaborator(User.getCurrent().name)
	            });

	            ResourceHelper.addResource('issues', issue).then(function (newIssue) {
	                var editor = new IssueEditor({
	                    model: newIssue
	                });

	                var $issue = editor.$element;

	                _this2.$element.find('.column[data-index="' + newIssue.column + '"] .btn-new-issue').before($issue);

	                editor.onClickToggle();

	                _this2.updateProgress();

	                spinner(false);
	            });

	            if (this.$element.hasClass('collapsed')) {
	                this.onClickToggle();
	            }
	        }

	        /**
	         * Event: Click toggle button
	         */

	    }, {
	        key: 'onClickToggle',
	        value: function onClickToggle() {
	            var wasCollapsed = this.$element.hasClass('collapsed');
	            var newKey = wasCollapsed ? 'expanded' : 'collapsed';

	            toggleExpand(this.$element);

	            SettingsHelper.set('milestone', this.model.index, newKey);
	        }

	        /**
	         * Gets remaining days
	         *
	         * @returns {Number} days
	         */

	    }, {
	        key: 'getRemainingDays',
	        value: function getRemainingDays() {
	            var endDate = this.model.endDate;
	            var nowDate = new Date();

	            if (!endDate) {
	                return 0;
	            }

	            if (endDate.constructor === String) {
	                endDate = new Date(endDate);
	            }

	            return Math.round((endDate - nowDate) / (1000 * 60 * 60 * 24)) + 1;
	        }

	        /**
	         * Get percent complete
	         *
	         * @returns {Number} percent
	         */

	    }, {
	        key: 'getPercentComplete',
	        value: function getPercentComplete() {
	            var total = this.getIssues();
	            var completed = this.getCompletedIssues();
	            var percentage = 0;

	            var totalHours = 0;
	            var completedHours = 0;

	            for (var i in total) {
	                totalHours += total[i].getEstimatedHours();
	            }

	            for (var _i in completed) {
	                completedHours += completed[_i].getEstimatedHours();
	            }

	            if (total.length > 0 && completed.length > 0) {
	                percentage = completed.length / total.length * 100;
	            }

	            return percentage;
	        }

	        /**
	         * Update progress indicators
	         */

	    }, {
	        key: 'updateProgress',
	        value: function updateProgress() {
	            var total = this.getIssues();
	            var completed = this.getCompletedIssues();
	            var percentage = 0;

	            var totalHours = 0;
	            var completedHours = 0;

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = total[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var issue = _step2.value;

	                    totalHours += issue.getEstimatedHours();
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = completed[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var _issue = _step3.value;

	                    completedHours += _issue.getEstimatedHours();
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            if (total.length > 0 && completed.length > 0) {
	                percentage = completed.length / total.length * 100;
	            }

	            this.$element.find('.header .progress-bar').css({
	                width: percentage + '%'
	            });

	            this.$element.find('.header .progress-amounts .total').html(total.length);
	            this.$element.find('.header .progress-hours .total').html(totalHours + 'h');

	            this.$element.find('.header .progress-amounts .remaining').html(total.length - completed.length);
	            this.$element.find('.header .progress-hours .remaining').html(totalHours - completedHours + 'h');

	            // Due date
	            if (this.model.endDate) {
	                var $dueDate = this.$element.find('.header .due-date');

	                if ($dueDate.length < 1) {
	                    $dueDate = _.span({ class: 'due-date' }).prependTo(this.$element.find('.header .stats'));
	                }

	                _.append($dueDate.empty(), _.span({ class: 'fa fa-calendar' }), _.span({ class: 'date' }, prettyDate(this.model.endDate)),
	                // No time left
	                _.if(this.getRemainingDays() < 1 && this.getPercentComplete() < 100, _.span({ class: 'remaining warn-red' }, this.getRemainingDays() + 'd')),
	                // Little time left
	                _.if(this.getRemainingDays() >= 1 && this.getRemainingDays() < 3 && this.getPercentComplete() < 100, _.span({ class: 'remaining warn-yellow' }, this.getRemainingDays() + 'd')),
	                // More time left
	                _.if(this.getRemainingDays() >= 3 && this.getPercentComplete() < 100, _.span({ class: 'remaining' }, this.getRemainingDays() + 'd')),
	                // Complete
	                _.if(this.getPercentComplete() == 100, _.span({ class: 'remaining ok fa fa-check' })));
	            }
	        }

	        /**
	         * Gets a list of completed
	         */

	    }, {
	        key: 'getCompletedIssues',
	        value: function getCompletedIssues() {
	            var issues = [];

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = window.resources.issues[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var issue = _step4.value;

	                    if (!issue) {
	                        continue;
	                    }

	                    if (issue.milestone == this.model.index && issue.isClosed()) {
	                        issues.push(issue);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }

	            return issues;
	        }

	        /**
	         * Gets a list of all issues
	         */

	    }, {
	        key: 'getIssues',
	        value: function getIssues() {
	            var issues = [];

	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = window.resources.issues[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var issue = _step5.value;

	                    if (!issue) {
	                        continue;
	                    }

	                    if (issue.milestone == this.model.index) {
	                        issues.push(issue);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }

	            return issues;
	        }
	    }]);

	    return MilestoneEditor;
	}(View);

	module.exports = MilestoneEditor;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    var state = SettingsHelper.get('milestone', this.model.index) || '';

	    if (!state && this.getPercentComplete() >= 100) {
	        state = 'collapsed';
	    }

	    return _.div({ class: 'milestone-editor ' + state, 'data-index': this.model.index, 'data-end-date': this.model.endDate }, _.div({ class: 'header' }, _.div({ class: 'progress-bar', style: 'width: ' + this.getPercentComplete() + '%' }), _.div({ class: 'title' }, _.button({ class: 'btn-toggle btn-transparent' }, _.span({ class: 'fa fa-chevron-right' }), _.h4(this.model.title), _.p(this.model.description)).click(function () {
	        _this.onClickToggle();
	    })), _.div({ class: 'stats' }, _.span({ class: 'progress-amounts' }, _.span({ class: 'fa fa-exclamation-circle' }), _.span({ class: 'total' }), _.span({ class: 'remaining' })), _.span({ class: 'progress-hours' }, _.span({ class: 'fa fa-clock-o' }), _.span({ class: 'total' }), _.span({ class: 'remaining' })), _.div({ class: 'actions' }, _.button({ class: 'btn-print' }, _.span({ class: 'fa fa-print' })).click(function () {
	        _this.onClickPrint();
	    })))), _.div({ class: 'columns' }, _.each(window.resources.issueColumns, function (columnIndex, column) {
	        return _.div({ class: 'column', 'data-index': columnIndex }, _.div({ class: 'header' }, _.h4(column)), _.div({ class: 'body' }, _.each(_this.model.getIssues(), function (issueIndex, issue) {
	            if (issue.column == columnIndex && issue.milestone == _this.model.index) {
	                return new IssueEditor({
	                    model: issue
	                }).$element;
	            }
	        }), _.if(columnIndex == 0 && !ApiHelper.isSpectating(), _.button({ class: 'btn btn-new-issue' }, 'New issue ', _.span({ class: 'fa fa-plus' })).click(function () {
	            _this.onClickNewIssue();
	        }))));
	    })));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ResourceEditor = function (_View) {
	    _inherits(ResourceEditor, _View);

	    function ResourceEditor(params) {
	        _classCallCheck(this, ResourceEditor);

	        var _this = _possibleConstructorReturn(this, (ResourceEditor.__proto__ || Object.getPrototypeOf(ResourceEditor)).call(this, params));

	        _this.template = __webpack_require__(41);

	        _this.fetch();
	        return _this;
	    }

	    _createClass(ResourceEditor, [{
	        key: 'onClickRemove',
	        value: function onClickRemove(index) {
	            var _this2 = this;

	            ResourceHelper.removeResource(this.name, index).then(function () {
	                _this2.render();
	            });
	        }
	    }, {
	        key: 'onClickAdd',
	        value: function onClickAdd(name, regex) {
	            var _this3 = this;

	            if (!this.checkValue(name, regex)) {
	                return;
	            }

	            ResourceHelper.addResource(this.name, name).then(function () {
	                _this3.render();
	            });
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(index, identifier) {
	            var _this4 = this;

	            var $input = this.$element.find('.item').eq(index).find('input');
	            var regex = $input.attr('pattern');
	            var value = $input.val() || '';

	            if (!this.checkValue(value, regex)) {
	                return;
	            }

	            ResourceHelper.updateResource(this.name, value, index, identifier).then(function () {
	                _this4.render();
	            });
	        }
	    }, {
	        key: 'checkValue',
	        value: function checkValue(value, regex) {
	            if (regex) {
	                regex = new RegExp('^' + regex + '$');
	            }

	            if (!value || regex && !value.match(regex)) {
	                var message = 'The value "' + value + '" is invalid.';

	                if (regex) {
	                    message += '\n\nRegex: ' + regex;
	                }

	                alert(message);

	                return false;
	            }

	            return true;
	        }
	    }]);

	    return ResourceEditor;
	}(View);

	module.exports = ResourceEditor;

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    // Set regex for individual cases
	    var regex = void 0;

	    switch (this.name) {
	        case 'issueEstimates':
	            regex = '(\\d+.\\d+|\\d+)(d|h|m)';
	            break;
	    }

	    return _.div({ class: 'resource-editor' }, _.div({ class: 'body' }, _.each(this.model, function (i, item) {
	        // Do not handle issue columns "to do" and "done"
	        if (_this.name == 'issueColumns' && (item == 'to do' || item == 'done')) {
	            return;
	        }

	        return _.div({ class: 'item' }, _.if(typeof item === 'string', _.input({ pattern: regex, class: 'selectable', value: item, placeholder: 'Input name', type: 'text' }).change(function () {
	            _this.onChange(i, item);
	        })), _.if(typeof item !== 'string', _.label(item.title || item.name)), _.button({ class: 'btn-remove' }, _.span({ class: 'fa fa-remove' })).click(function () {
	            _this.onClickRemove(i);
	        }));
	    })), _.div({ class: 'footer' }, _.input({ type: 'text', pattern: regex }), _.button({ class: 'btn btn-add' }, 'Add', _.span({ class: 'fa fa-plus' })).click(function () {
	        var $input = _this.$element.find('.footer input');

	        _this.onClickAdd($input.val(), regex);
	    })));
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PlanItemEditor = function (_View) {
	    _inherits(PlanItemEditor, _View);

	    function PlanItemEditor(params) {
	        _classCallCheck(this, PlanItemEditor);

	        var _this = _possibleConstructorReturn(this, (PlanItemEditor.__proto__ || Object.getPrototypeOf(PlanItemEditor)).call(this, params));

	        _this.template = __webpack_require__(43);

	        _this.fetch();
	        return _this;
	    }

	    /**
	     * Opens this milestone as a dialog
	     */


	    _createClass(PlanItemEditor, [{
	        key: 'openDialog',
	        value: function openDialog() {
	            var _this2 = this;

	            $('.app-container').addClass('disabled');

	            var prev = {
	                x: this.$element.offset().left,
	                y: this.$element.offset().top,
	                w: this.$element.width(),
	                h: this.$element.height(),
	                $parent: this.$element.parent()
	            };

	            this.positionBuffer = prev;

	            $('body').append(this.$element);

	            this.$element.css({
	                position: 'absolute',
	                left: prev.x,
	                top: prev.y,
	                width: prev.w,
	                height: prev.h,
	                transition: 'all 0.5s ease',
	                overflow: 'hidden'
	            });

	            this.$element.toggleClass('opening', true);

	            setTimeout(function () {
	                _this2.$element.removeAttr('style');
	                _this2.$element.css({
	                    position: 'absolute',
	                    left: '50%',
	                    top: '100px',
	                    transform: 'translateX(-50%)',
	                    transition: 'all 0.5s ease'
	                });
	            }, 1);

	            setTimeout(function () {
	                _this2.$element.toggleClass('opening', false);
	            }, 550);
	        }

	        /**
	         * Event: Change
	         */

	    }, {
	        key: 'onChange',
	        value: function onChange() {
	            var _this3 = this;

	            var dateString = this.$element.parents('.date').attr('data-date');
	            var unixDate = parseInt(dateString);

	            // Update model data with new information based on DOM location
	            this.model.title = this.$element.find('.header input').val();
	            this.model.description = this.$element.find('.body input').val();

	            if (dateString) {
	                var date = new Date(unixDate);

	                this.model.endDate = date.toISOString();
	            }

	            // Update DOM elements to match model
	            this.$element.find('.drag-handle').text(this.model.title);

	            // Start loading
	            this.$element.toggleClass('loading', true);

	            ResourceHelper.updateResource('milestones', this.model).then(function () {
	                _this3.$element.toggleClass('loading', false);
	            });
	        }

	        /**
	         * Event: Click delete button
	         */

	    }, {
	        key: 'onClickDelete',
	        value: function onClickDelete() {
	            if (!confirm('Are you sure you want to delete the milestone "' + this.model.title + '"?')) {
	                return;
	            }

	            spinner('Deleting milestone');

	            ResourceHelper.removeResource('milestones', this.model.index).then(function () {
	                ViewHelper.removeAll('PlanItemEditor');
	                ViewHelper.get('PlanEditor').render();

	                $('.app-container').removeClass('disabled');

	                spinner(false);
	            });
	        }

	        /**
	         * Event: Click close button
	         */

	    }, {
	        key: 'onClickClose',
	        value: function onClickClose() {
	            var _this4 = this;

	            var prev = this.positionBuffer;

	            this.$element.removeAttr('style');
	            this.$element.toggleClass('closing', true);
	            this.$element.css({
	                position: 'absolute',
	                left: prev.x,
	                top: prev.y,
	                width: prev.w,
	                height: prev.h,
	                transition: 'all 0.5s ease',
	                overflow: 'hidden'
	            });

	            setTimeout(function () {
	                prev.$parent.prepend(_this4.$element);
	                _this4.$element.removeAttr('style');
	                _this4.$element.toggleClass('closing', false);
	            }, 550);

	            $('.app-container').removeClass('disabled');
	        }

	        /**
	         * Event: Click OK button
	         */

	    }, {
	        key: 'onClickOK',
	        value: function onClickOK() {
	            this.onChange();

	            this.onClickClose();
	        }

	        /**
	         * Event: Release the dragging handle
	         */

	    }, {
	        key: 'onReleaseDragHandle',
	        value: function onReleaseDragHandle(e) {
	            // Unregister mouse events
	            $(document).off('mouseup').off('mousemove');

	            // Unset temporary classes and styling
	            $('.plan-container').toggleClass('dragging', false);
	            this.$element.removeAttr('style');
	            this.$element.find('button, input').removeAttr('style');

	            this.beingDragged = false;

	            // Find new target element
	            var $target = $('.hovering').first();

	            // Unregister hover mouse events and unset hovering state
	            this.unsetHoverEvents();

	            // If the dragging event lasted less than 100 ms, open dialog
	            if (Date.now() - this.prevClick < 100) {
	                this.openDialog();
	            } else if ($target.length > 0) {
	                // If the element was dropped onto a date
	                if ($target.hasClass('date')) {
	                    // Place this element into the hovered date container
	                    var $oldParent = this.$element.parent();
	                    var $newParent = $target.find('.body');

	                    if ($newParent[0] != $oldParent[0]) {
	                        $newParent.prepend(this.$element);

	                        // Trigger the change event
	                        this.onChange();
	                    }

	                    // Special logic for tabs
	                } else {
	                    var endDate = this.model.endDate;

	                    // Init a date from the current tabs if no date is present
	                    if (!endDate) {
	                        endDate = new Date('1 ' + $('.tab.month.active').text() + ' ' + $('.tab.year.active').text());

	                        // Make sure the date is not a string 
	                    } else if (endDate.constructor === String) {
	                        endDate = new Date(this.model.endDate);
	                    }

	                    // If the element was dropped onto a month tab
	                    if ($target.hasClass('month')) {
	                        endDate = new Date('1 ' + $target.text() + ' ' + endDate.getFullYear());

	                        // If the element was dropped onto a year tab
	                    } else if ($target.hasClass('year')) {
	                        endDate = new Date('1 ' + $('.tab.month.active').text() + ' ' + $target.text());
	                    }

	                    // Convert date to ISO string
	                    this.model.endDate = endDate.toISOString();

	                    // Hide element
	                    this.$element.hide();

	                    ResourceHelper.updateResource('milestones', this.model).then(function () {
	                        // Follow the tab destination
	                        $target.click();
	                    });
	                }

	                // Update the undated box
	                ViewHelper.get('PlanEditor').updateUndatedBox();
	            }
	        }

	        /**
	         * Event: Click the dragging handle
	         */

	    }, {
	        key: 'onClickDragHandle',
	        value: function onClickDragHandle(e) {
	            var _this5 = this;

	            // Cache the previous click
	            this.prevClick = Date.now();

	            // Set class on board container
	            $('.plan-container').toggleClass('dragging', true);

	            // Find the offset parent
	            var $offsetParent = this.$element.offsetParent();
	            var offsetDOM = $offsetParent.offset();

	            if ($offsetParent.length < 1) {
	                $offsetParent = this.$element.parents('.undated');
	                offsetDOM = $offsetParent.offset();

	                offsetDOM.top += this.$element.height();
	            }

	            // Apply temporary CSS properties
	            var bounds = this.$element[0].getBoundingClientRect();

	            this.$element.css({
	                top: bounds.top - offsetDOM.top,
	                left: bounds.left - offsetDOM.left,
	                width: bounds.width,
	                height: bounds.height,
	                'pointer-events': 'none',
	                'z-index': 999
	            });

	            this.$element.find('button, input').css({
	                'pointer-events': 'none'
	            });

	            this.beingDragged = true;

	            // Buffer the offset between mouse cursor and element position
	            var offset = {
	                x: bounds.left - e.pageX - offsetDOM.left,
	                y: bounds.top - e.pageY - offsetDOM.top
	            };

	            // Add absolute positioning afterwards to allow getting proper offset
	            this.$element.css({
	                position: 'absolute'
	            });

	            // Buffer previous pointer location
	            var prev = {
	                x: e.pageX,
	                y: e.pageY
	            };

	            // Document pointer movement logic
	            $(document).off('mousemove').on('mousemove', function (e) {
	                // Get current pointer location
	                var current = {
	                    x: e.pageX,
	                    y: e.pageY
	                };

	                // Apply new CSS positioning values
	                _this5.$element.css({
	                    top: current.y + offset.y,
	                    left: current.x + offset.x
	                });

	                // Replace previous position buffer data
	                prev = current;
	            });

	            // Document pointer release mouse button logic
	            $(document).off('mouseup').on('mouseup', function (e) {
	                _this5.onReleaseDragHandle(e);
	            });

	            // Date mouse hover events
	            this.setHoverEvents();
	        }

	        /**
	         * Sets all hover events
	         */

	    }, {
	        key: 'setHoverEvents',
	        value: function setHoverEvents() {
	            $('.plan-editor .dates .date, .tab.year, .tab.month').on('mouseenter', function () {
	                $(this).toggleClass('hovering', true);

	                if ($(this).hasClass('tab') && ($(this).hasClass('month') || $(this).hasClass('year'))) {
	                    $(this).click();
	                }
	            }).on('mouseleave', function () {
	                $(this).toggleClass('hovering', false);
	            });
	        }

	        /**
	         * Unsets all hover events
	         */

	    }, {
	        key: 'unsetHoverEvents',
	        value: function unsetHoverEvents() {
	            $('.plan-editor .dates .date, .tab.year, .tab.month').off('mouseenter').off('mouseleave').toggleClass('hovering', false);
	        }
	    }]);

	    return PlanItemEditor;
	}(View);

	module.exports = PlanItemEditor;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    return _.div({ class: 'plan-item-editor', 'data-date': this.model.endDate }, _.div({ class: 'drag-handle' }, this.model.title).on('mousedown', function (e) {
	        _this.onClickDragHandle(e);
	    }), _.button({ class: 'btn-close btn-transparent' }, _.span({ class: 'fa fa-remove' })).click(function () {
	        _this.onClickClose();
	    }), _.div({ class: 'header' }, _.h4('Title'), _.input({ class: 'selectable edit', placeholder: 'Type milestone title here', type: 'text', value: this.model.title })), _.div({ class: 'body' }, _.h4('Description'), _.input({ class: 'selectable', placeholder: 'Type milestone description here', type: 'text', value: this.model.description })), _.div({ class: 'footer' }, _.button({ class: 'btn btn-remove' }, _.span({ class: 'fa fa-trash' })).click(function () {
	        _this.onClickDelete();
	    }), _.button({ class: 'btn' }, 'OK').click(function () {
	        _this.onClickOK();
	    })));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PlanEditor = function (_View) {
	    _inherits(PlanEditor, _View);

	    function PlanEditor(params) {
	        _classCallCheck(this, PlanEditor);

	        var _this = _possibleConstructorReturn(this, (PlanEditor.__proto__ || Object.getPrototypeOf(PlanEditor)).call(this, params));

	        _this.currentYear = new Date().getFullYear();
	        _this.currentMonth = new Date().getMonth() + 1;

	        if (_this.currentMonth.length == 1) {
	            _this.currentMonth = '0' + _this.currentMonth;
	        }

	        _this.template = __webpack_require__(45);

	        _this.init();
	        return _this;
	    }

	    /**
	     * Finds the PlanItemEditor instance being dragged
	     *
	     * @return {PlanItemEditor} Dragged item
	     */


	    _createClass(PlanEditor, [{
	        key: 'findDraggedItem',
	        value: function findDraggedItem() {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = ViewHelper.getAll('PlanItemEditor')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var item = _step.value;

	                    if (item.beingDragged) {
	                        return item;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return null;
	        }

	        /**
	         * Event: Click year tab
	         *
	         * @param {String} year
	         */

	    }, {
	        key: 'onClickYear',
	        value: function onClickYear(year) {
	            this.currentYear = parseInt(year);

	            var draggedItem = this.findDraggedItem();

	            if (draggedItem) {
	                $('body').append(draggedItem.$element);
	            }

	            this.render();

	            if (draggedItem) {
	                this.$element.find('.dates').append(draggedItem.$element);

	                draggedItem.unsetHoverEvents();
	                draggedItem.setHoverEvents();
	            }
	        }

	        /**
	         * Event: Click month tab
	         *
	         * @param {String} month
	         */

	    }, {
	        key: 'onClickMonth',
	        value: function onClickMonth(month) {
	            this.currentMonth = parseInt(month);

	            var draggedItem = this.findDraggedItem();

	            if (draggedItem) {
	                $('body').append(draggedItem.$element);
	            }

	            this.render();

	            if (draggedItem) {
	                this.$element.find('.dates').append(draggedItem.$element);

	                draggedItem.unsetHoverEvents();
	                draggedItem.setHoverEvents();
	            }
	        }
	    }, {
	        key: 'updateUndatedBox',
	        value: function updateUndatedBox() {
	            if (this.getUndatedMilestones().length < 1) {
	                $('.plan-editor .undated').remove();
	            }
	        }
	    }, {
	        key: 'getUndatedMilestones',
	        value: function getUndatedMilestones() {
	            var milestones = [];

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = resources.milestones[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var milestone = _step2.value;

	                    if (!milestone) {
	                        continue;
	                    }

	                    if (!milestone.getEndDate()) {
	                        milestones.push(milestone);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            return milestones;
	        }
	    }, {
	        key: 'getYears',
	        value: function getYears() {
	            var years = [];

	            for (var i = new Date().getFullYear() - 2; i < new Date().getFullYear() + 4; i++) {
	                years.push({
	                    number: i
	                });
	            }

	            return years;
	        }
	    }, {
	        key: 'getMonths',
	        value: function getMonths() {
	            var months = [];

	            for (var i = 1; i <= 12; i++) {
	                var num = i.toString();

	                if (num.length == 1) {
	                    num = '0' + num;
	                }

	                months.push({
	                    name: new Date('2016-' + num + '-01').getMonthName(),
	                    number: i
	                });
	            }

	            return months;
	        }
	    }, {
	        key: 'getWeekDays',
	        value: function getWeekDays() {
	            var weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

	            return weekdays;
	        }
	    }, {
	        key: 'onClickAddMilestone',
	        value: function onClickAddMilestone(date) {
	            var _this2 = this;

	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            spinner('Creating milestone');

	            ResourceHelper.addResource('milestones', new Milestone({
	                title: 'New milestone',
	                endDate: date.toISOString()
	            })).then(function () {
	                _this2.render();

	                spinner(false);
	            });
	        }
	    }, {
	        key: 'getWeeks',
	        value: function getWeeks() {
	            var weeks = [];
	            var firstDay = new Date(this.currentYear, this.currentMonth, 1);
	            var firstWeek = firstDay.getWeek();

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = this.getDates()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var date = _step3.value;

	                    if (weeks.indexOf(date.getWeek()) < 0) {
	                        weeks.push(date.getWeek());
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            return weeks;
	        }
	    }, {
	        key: 'getDates',
	        value: function getDates() {
	            var year = this.currentYear;
	            var month = this.currentMonth;
	            var dates = [];

	            for (var i = 1; i <= new Date(year, month, 0).getDate(); i++) {
	                var day = i;
	                var date = new Date();

	                date.setYear(year);
	                date.setMonth(month - 1);
	                date.setDate(day);

	                dates.push(date);
	            }

	            return dates;
	        }
	    }, {
	        key: 'getDate',
	        value: function getDate(week, weekday) {
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = this.getDates()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var date = _step4.value;

	                    if (date.getWeek() == week && date.getISODay() == weekday) {
	                        return date;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'iterateDates',
	        value: function iterateDates(renderFunction) {
	            var weekdays = this.getWeekDays();
	            var weeks = this.getWeeks();

	            var renders = [];

	            for (var y = 0; y < 6; y++) {
	                for (var x = 0; x < 7; x++) {
	                    var weekday = weekdays[x];
	                    var week = weeks[y];

	                    if (week && weekday) {
	                        var date = this.getDate(week, x);

	                        renders.push(renderFunction(date));
	                    } else {
	                        renders.push(renderFunction());
	                    }
	                }
	            }

	            return renders;
	        }
	    }]);

	    return PlanEditor;
	}(View);

	module.exports = PlanEditor;

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    var draggedItem = this.findDraggedItem();

	    return _.div({ class: 'plan-editor' }, _.div({ class: 'tabbed-container' }, _.div({ class: 'tabs years' }, _.each(this.getYears(), function (i, year) {
	        return _.button({ class: 'tab year' + (_this.currentYear == year.number ? ' active' : '') }, year.number).click(function () {
	            _this.onClickYear(year.number);
	        });
	    })), _.div({ class: 'tabs months' }, _.each(this.getMonths(), function (i, month) {
	        return _.button({ class: 'tab month' + (_this.currentMonth == month.number ? ' active' : '') }, month.name).click(function () {
	            _this.onClickMonth(month.number);
	        });
	    }))), _.div({ class: 'weekdays' }, _.each(this.getWeekDays(), function (i, weekday) {
	        return _.div({ class: 'weekday' }, weekday);
	    })), _.div({ class: 'dates' }, this.iterateDates(function (date) {
	        if (!date) {
	            return _.div({ class: 'date-placeholder' });
	        } else {
	            return _.div({ class: 'date', 'data-date': date.getTime() }, _.div({ class: 'header' }, _.span({ class: 'datenumber' }, date.getDate()), _.span({ class: 'weeknumber' }, 'w ' + date.getWeek())), _.div({ class: 'body' }, _.each(resources.milestones, function (i, milestone) {
	                if (draggedItem && draggedItem.model == milestone) {
	                    return;
	                }

	                if (milestone.getEndDate()) {
	                    var dueDate = milestone.getEndDate();

	                    dueDate.setHours(0);
	                    dueDate.setMinutes(0);
	                    dueDate.setSeconds(0);

	                    if (dueDate.getFullYear() == date.getFullYear() && dueDate.getMonth() == date.getMonth() && dueDate.getDate() == date.getDate()) {
	                        return new PlanItemEditor({
	                            model: milestone
	                        }).$element;
	                    }
	                }
	            }), _.button({ class: 'btn-transparent' }, _.span({ class: 'fa fa-plus' })).click(function () {
	                _this.onClickAddMilestone(date);
	            })));
	        }
	    })), _.if(this.getUndatedMilestones().length > 0, _.div({ class: 'undated' }, _.h4('Undated'), _.each(this.getUndatedMilestones(), function (i, milestone) {
	        return new PlanItemEditor({
	            model: milestone
	        }).$element;
	    }))));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RepositoryEditor = function (_View) {
	    _inherits(RepositoryEditor, _View);

	    function RepositoryEditor(params) {
	        _classCallCheck(this, RepositoryEditor);

	        var _this = _possibleConstructorReturn(this, (RepositoryEditor.__proto__ || Object.getPrototypeOf(RepositoryEditor)).call(this, params));

	        _this.template = __webpack_require__(47);

	        _this.fetch();
	        return _this;
	    }

	    _createClass(RepositoryEditor, [{
	        key: 'onClick',
	        value: function onClick() {
	            ResourceHelper.clear();

	            if (this.overrideUrl) {
	                location = '/#/' + this.model.owner + '/' + this.model.title + this.overrideUrl;
	            } else if (Router.params.repository) {
	                location = '/#' + location.hash.replace('#', '').replace(Router.params.repository, this.model.title).replace(Router.params.user, this.model.owner);
	            } else {
	                location = '/#/' + this.model.owner + '/' + this.model.title + '/board/kanban/';
	            }
	        }
	    }]);

	    return RepositoryEditor;
	}(View);

	module.exports = RepositoryEditor;

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    return _.div({ class: 'repository-editor' }, _.div({ class: 'content' }, _.div({ class: 'owner' }, this.model.owner), _.div({ class: 'header' }, _.h4(this.model.title)), _.div({ class: 'body' }, this.model.description))).click(function () {
	        _this.onClick();
	    });
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FilterEditor = function (_View) {
	    _inherits(FilterEditor, _View);

	    function FilterEditor(params) {
	        _classCallCheck(this, FilterEditor);

	        var _this = _possibleConstructorReturn(this, (FilterEditor.__proto__ || Object.getPrototypeOf(FilterEditor)).call(this, params));

	        _this.MAX_FILTERS = 5;

	        _this.template = __webpack_require__(49);

	        var defaultColumn = '';

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = resources.issueColumns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var column = _step.value;

	                if (column == 'done') {
	                    defaultColumn = 'done';
	                    break;
	                }

	                if (column == 'closed') {
	                    defaultColumn = 'closed';
	                    break;
	                }
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }

	        _this.defaultFilter = {
	            key: 'column',
	            operator: '!=',
	            value: defaultColumn
	        };

	        _this.model = SettingsHelper.get('filters', 'custom', [], true);

	        _this.fetch();

	        setTimeout(function () {
	            _this.applyFilters();
	        }, 2);
	        return _this;
	    }

	    /**
	     * Event: Click toggle
	     */


	    _createClass(FilterEditor, [{
	        key: 'onClickToggle',
	        value: function onClickToggle() {
	            this.$element.toggleClass('active');
	        }

	        /**
	         * Event: Change
	         *
	         * @param {Number} index
	         */

	    }, {
	        key: 'onChange',
	        value: function onChange(index) {
	            this.render();

	            // Update value, just in case key was changed
	            this.model[index].value = this.$element.find('.filter').eq(index).find('.select-container.value select').val();

	            // Update settings
	            SettingsHelper.set('filters', 'custom', this.model, true);

	            this.applyFilters();
	        }

	        /**
	         * Event: Click remove button
	         *
	         * @param {Number} index
	         */

	    }, {
	        key: 'onClickRemove',
	        value: function onClickRemove(index) {
	            this.model.splice(index, 1);

	            // Update settings
	            SettingsHelper.set('filters', 'custom', this.model, true);

	            this.render();

	            this.applyFilters();
	        }

	        /**
	         * Event: Click add button
	         */

	    }, {
	        key: 'onClickAdd',
	        value: function onClickAdd() {
	            if (this.model.length < this.MAX_FILTERS) {
	                this.model.push({
	                    key: this.defaultFilter.key,
	                    operator: this.defaultFilter.operator,
	                    value: this.defaultFilter.value
	                });

	                // Update settings
	                SettingsHelper.set('filters', 'custom', this.model, true);

	                this.applyFilters();

	                this.render();
	            }
	        }

	        /**
	         * Gets all filtering operators
	         *
	         * @param {Array} operators
	         */

	    }, {
	        key: 'getOperators',
	        value: function getOperators() {
	            return {
	                '==': 'is',
	                '!=': 'is not'
	            };
	        }

	        /**
	         * Applies selected filters
	         */

	    }, {
	        key: 'applyFilters',
	        value: function applyFilters() {
	            var issueViews = ViewHelper.getAll('IssueEditor');

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = issueViews[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var issueView = _step2.value;

	                    issueView.$element.toggle(true);

	                    var issue = issueView.model.getBakedValues();

	                    var _iteratorNormalCompletion3 = true;
	                    var _didIteratorError3 = false;
	                    var _iteratorError3 = undefined;

	                    try {
	                        for (var _iterator3 = this.model[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                            var filter = _step3.value;

	                            try {
	                                var value = filter.value;

	                                if (value && value.constructor === String) {
	                                    value = '\'' + value + '\'';
	                                }

	                                var evalString = 'issue.' + filter.key + ' ' + filter.operator + ' ' + value;
	                                var isValid = eval(evalString);

	                                if (!isValid) {
	                                    issueView.$element.toggle(false);
	                                    break;
	                                }
	                            } catch (e) {
	                                displayError(e);
	                                return;
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError3 = true;
	                        _iteratorError3 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                                _iterator3.return();
	                            }
	                        } finally {
	                            if (_didIteratorError3) {
	                                throw _iteratorError3;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }]);

	    return FilterEditor;
	}(View);

	module.exports = FilterEditor;

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    var issueKeys = Object.keys(new Issue().getBakedValues());

	    return _.div({ class: 'filter-editor' }, _.button({ class: 'btn-toggle', 'data-filter-amount': this.model.length.toString() }, 'Filters', _.span({ class: 'filter-indicator' }, this.model.length.toString())).click(function () {
	        _this.onClickToggle();
	    }), _.div({ class: 'filters' }, _.each(this.model, function (i, filter) {
	        var resourceKey = filter.key;

	        // Change assignee to collaborator
	        if (resourceKey == 'assignee') {
	            resourceKey = 'collaborator';
	        }

	        // Append 's' for plural
	        resourceKey += 's';

	        // Correct grammar
	        resourceKey = resourceKey.replace('ys', 'ies');

	        var resource = resources[resourceKey];

	        // If we didn't find the resource, it's likely that we just need to capitalise it and prepend 'issue'
	        // For example: 'type' should be 'issueType' when referring to the resource
	        if (!resource) {
	            resourceKey = 'issue' + resourceKey.substring(0, 1).toUpperCase() + resourceKey.substring(1);

	            resource = resources[resourceKey];
	        }

	        var $valueSelect = void 0;
	        var $filter = _.div({ class: 'filter' }, _.div({ class: 'select-container key' }, _.select({}, _.each(issueKeys, function (i, key) {
	            return _.option({
	                value: key,
	                selected: key == filter.key
	            }, key);
	        })).change(function (e) {
	            filter.key = $filter.find('.key select').val();
	            filter.value = null;

	            _this.onChange(i);
	        })), _.div({ class: 'select-container operator' }, _.select({}, _.each(_this.getOperators(), function (operator, label) {
	            return _.option({ value: operator }, label);
	        })).val(filter.operator || '!=').change(function (e) {
	            filter.operator = $filter.find('.operator select').val();

	            _this.onChange(i);
	        })), _.div({ class: 'select-container value', style: 'min-width: ' + ((filter.value || '').length * 10 + 20) + 'px' }, _.select({}, _.each(resource, function (i, value) {
	            var valueName = value;

	            if (value.title) {
	                valueName = value.title;
	            }

	            if (value.name) {
	                valueName = value.name;
	            }

	            var isSelected = valueName == filter.value;

	            if (!filter.value && i == 0) {
	                isSelected = true;
	            }

	            return _.option({
	                value: valueName,
	                selected: isSelected
	            }, valueName);
	        })).change(function (e) {
	            filter.value = $filter.find('.value select').val();

	            _this.onChange(i);
	        })), _.button({ class: 'btn-remove' }, _.span({ class: 'fa fa-remove' })).click(function () {
	            _this.onClickRemove(i);
	        }));

	        return $filter;
	    })), _.div({ class: 'button-container' }, _.if(this.model.length < this.MAX_FILTERS, _.button({ class: 'btn btn-add-filter' }, 'Add filter', _.span({ class: 'fa fa-plus' })).click(function () {
	        _this.onClickAdd();
	    }))));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Private

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var currentMilestoneIndex = 0;

	var BurnDownChart = function (_View) {
	    _inherits(BurnDownChart, _View);

	    function BurnDownChart(params) {
	        _classCallCheck(this, BurnDownChart);

	        var _this = _possibleConstructorReturn(this, (BurnDownChart.__proto__ || Object.getPrototypeOf(BurnDownChart)).call(this, params));

	        _this.template = __webpack_require__(51);

	        // Find most relevant milestone
	        var nearest = void 0;
	        var now = new Date();

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = resources.milestones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var milestone = _step.value;

	                if (!nearest || !nearest.getStartDate()) {
	                    nearest = milestone;
	                } else {
	                    var thisStartDate = milestone.getStartDate();
	                    var thisEndDate = milestone.getEndDate();

	                    var nearestStartDate = nearest.getStartDate();
	                    var nearestEndDate = nearest.getEndDate();

	                    if (!thisStartDate || !thisEndDate) {
	                        continue;
	                    }

	                    // Found perfect scenario
	                    if (thisStartDate < now && thisEndDate > now) {
	                        nearest = milestone;
	                        break;
	                    }

	                    // Found nearest start date
	                    if (Math.abs(thisStartDate.getTime() - now.getTime()) < Math.abs(nearestStartDate.getTime() - now.getTime())) {
	                        nearest = milestone;
	                    }
	                }
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }

	        if (nearest) {
	            currentMilestoneIndex = nearest.index;
	        }

	        _this.fetch();
	        return _this;
	    }

	    /**
	     * Event: Change milestone picker
	     *
	     * @param {Number} newIndex
	     */


	    _createClass(BurnDownChart, [{
	        key: 'onChangeMilestonePicker',
	        value: function onChangeMilestonePicker(newIndex) {
	            currentMilestoneIndex = newIndex;

	            this.render();
	        }

	        /**
	         * Sorts milestones by end date
	         *
	         * @param {Milestone} a
	         * @param {Milestone} b
	         */

	    }, {
	        key: 'sortMilestones',
	        value: function sortMilestones(a, b) {
	            if (a.getEndDate() > b.getEndDate()) {
	                return 1;
	            }

	            if (a.getEndDate() < b.getEndDate()) {
	                return -1;
	            }

	            return 0;
	        }

	        /**
	         * Gets the currently selected milestone
	         *
	         * @returns {Milestone} Current milestone 
	         */

	    }, {
	        key: 'getCurrentMilestone',
	        value: function getCurrentMilestone() {
	            return resources.milestones[currentMilestoneIndex];
	        }

	        /**
	         * Gets the actual hours remaining
	         *
	         * @returns {Array} Actual hours by day
	         */

	    }, {
	        key: 'getActualHours',
	        value: function getActualHours() {
	            var milestone = this.getCurrentMilestone();
	            var actualHours = [];

	            if (!milestone) {
	                return actualHours;
	            }

	            var totalDays = milestone.getTotalDays();

	            for (var day = 0; day <= totalDays; day++) {
	                actualHours[actualHours.length] = milestone.getRemainingEstimatedHoursAtDay(day);
	            }

	            return actualHours;
	        }

	        /**
	         * Gets the optimal hours remaining
	         *
	         * @returns {Array} Optimal hours by day
	         */

	    }, {
	        key: 'getOptimalHours',
	        value: function getOptimalHours() {
	            var milestone = this.getCurrentMilestone();
	            var optimalHours = [];

	            if (!milestone) {
	                return optimalHours;
	            }

	            var totalDays = milestone.getTotalDays();
	            var totalHours = milestone.getTotalEstimatedHours();
	            var divider = totalDays;
	            if (divider < 1) {
	                divider = 1;
	            }
	            var optimalDecline = totalHours / divider;

	            var currentHours = totalHours;

	            for (var day = 0; day <= totalDays; day++) {
	                optimalHours[optimalHours.length] = currentHours;

	                currentHours -= optimalDecline;
	            }

	            return optimalHours;
	        }
	    }]);

	    return BurnDownChart;
	}(View);

	module.exports = BurnDownChart;

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    var milestone = this.getCurrentMilestone();

	    if (!milestone) {
	        return _.div({ class: 'burndown-chart analytics-body' }, _.h4('There are no milestones defined in this repository'));
	    }

	    var totalDays = milestone.getTotalDays();
	    var totalHours = milestone.getTotalEstimatedHours();
	    var milestoneStart = milestone.getStartDate();
	    var milestoneEnd = milestone.getEndDate();

	    var CANVAS_HEIGHT_UNIT = 400 / Math.ceil(totalHours);

	    var CANVAS_WIDTH_UNIT = 40;

	    if (CANVAS_WIDTH_UNIT * totalDays < 860) {
	        CANVAS_WIDTH_UNIT = 860 / totalDays;
	    }

	    var optimalHours = this.getOptimalHours();
	    var actualHours = this.getActualHours();

	    var $canvas = _.canvas({ width: CANVAS_WIDTH_UNIT * totalDays, height: CANVAS_HEIGHT_UNIT * totalHours });
	    var ctx = $canvas[0].getContext('2d');

	    /**
	     * Draws the grid
	     */
	    var drawGrid = function drawGrid() {
	        var drawNext = function drawNext(x) {
	            var xPos = x * CANVAS_WIDTH_UNIT;

	            GraphHelper.drawLine(ctx, xPos, 0, xPos, CANVAS_HEIGHT_UNIT * totalHours, 1, '#999999');

	            if (x < totalDays) {
	                setTimeout(function () {
	                    drawNext(x + 1);
	                }, 1);
	            }
	        };

	        drawNext(0);
	    };

	    /**
	     * Draws the optimal hours
	     *
	     * @param {Array} hours
	     * @param {String} color
	     */
	    var drawHours = function drawHours(hours, color) {
	        var drawNext = function drawNext(i) {
	            var startHours = hours[i - 1];

	            var startX = (i - 1) * CANVAS_WIDTH_UNIT;
	            var startY = (totalHours - startHours) * CANVAS_HEIGHT_UNIT;

	            var endHours = hours[i];

	            var endX = i * CANVAS_WIDTH_UNIT;
	            var endY = (totalHours - endHours) * CANVAS_HEIGHT_UNIT;

	            GraphHelper.drawCircle(ctx, startX, startY, 4, color);

	            if (i >= hours.length - 1) {
	                GraphHelper.drawCircle(ctx, endX, endY, 4, color);
	            }

	            GraphHelper.drawLine(ctx, startX, startY, endX, endY, 2, color);

	            if (i < hours.length - 1) {
	                setTimeout(function () {
	                    drawNext(i + 1);
	                }, 1);
	            }
	        };

	        drawNext(1);
	    };

	    return _.div({ class: 'burndown-chart analytics-body' }, _.div({ class: 'toolbar' }, _.h4({}, 'Milestone', _.select({ class: 'btn milestone-picker' }, _.each(resources.milestones.concat().sort(this.sortMilestones), function (i, milestone) {
	        return _.option({ value: milestone.index }, milestone.title);
	    })).val(milestone ? milestone.index : 0).change(function (e) {
	        _this.onChangeMilestonePicker($(e.target).val());
	    }))), _.div({ class: 'meta' }, _.h4('Total days'), _.p((totalDays + 1).toString()), _.h4('Total hours'), _.p(totalHours.toString()), _.h4('Milestone start'), _.p(milestoneStart ? milestoneStart.toString() : '(invalid)'), _.h4('Milestone end'), _.p(milestoneEnd ? milestoneEnd.toString() : '(invalid)')), _.h4('Chart'), _.div({ class: 'graph-container' }, _.div({ class: 'graph-y-axis-labels' }, _.label({ style: 'top: 0px' }, Math.round(totalHours) + ' h'), _.label({ style: 'top: 380px' }, '0 h')), _.div({ class: 'graph-canvas' }, $canvas, drawGrid(), drawHours(optimalHours, 'blue'), drawHours(actualHours, 'red'), _.div({ class: 'graph-x-axis-labels' }, _.loop(totalDays, function (i) {
	        i++;

	        if (i % 5 !== 0 && i != 1 && i != totalDays + 1) {
	            return;
	        }

	        return _.label({ style: 'left: ' + CANVAS_WIDTH_UNIT * (i - 1) + 'px' }, i.toString() + ' d');
	    })))));
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	// Root

	Router.route('/', function () {
	    ApiHelper.checkConnection().then(function () {
	        navbar.toggleRepositoriesList(true);

	        $('.workspace').remove();

	        $('.app-container').append(_.div({ class: 'workspace logo' }, _.img({ src: '/public/svg/logo-medium.svg' })));

	        spinner(false);
	    }).catch(displayError);
	});

	// Repository
	Router.route('/:user/:repository', function () {
	    location.hash = '/' + Router.params.user + '/' + Router.params.repository + '/board/kanban';
	});

	// Plan
	Router.route('/:user/:repository/plan/', function () {
	    ApiHelper.checkConnection().then(function () {
	        return ApiHelper.getResources(true);
	    }).then(function () {
	        $('.workspace').remove();

	        $('.app-container').append(_.div({ class: 'workspace plan-container' }, _.div({ class: 'workspace-fixed' }, new RepositoryBar().$element), new PlanEditor().$element));

	        navbar.slideIn();
	        spinner(false);
	    }).catch(displayError);
	});

	// Board
	Router.route('/:user/:repository/board/:mode', function () {
	    ApiHelper.checkConnection().then(function () {
	        return ApiHelper.getResources(true);
	    }).then(function () {
	        $('.workspace').remove();

	        // Append all milestones
	        $('.app-container').append(_.div({ class: 'workspace board-container ' + Router.params.mode }, _.div({ class: 'workspace-fixed' }, new RepositoryBar().$element, new FilterEditor().$element), _.each(window.resources.milestones, function (i, milestone) {
	            return new MilestoneEditor({
	                model: milestone
	            }).$element;
	        })));

	        // Sort milestones by end date
	        $('.app-container .board-container .milestone-editor').sort(function (a, b) {
	            var aDate = new Date(a.getAttribute('data-end-date'));
	            var bDate = new Date(b.getAttribute('data-end-date'));

	            if (aDate < bDate) {
	                return -1;
	            }

	            if (aDate > bDate) {
	                return 1;
	            }

	            return 0;
	        }).detach().appendTo('.app-container .board-container');

	        // Append the unassigned items
	        $('.app-container .board-container').append(new MilestoneEditor({
	            model: new Milestone({
	                title: 'Unassigned',
	                description: 'These issues have yet to be assigned to a milestone'
	            })
	        }).$element);

	        navbar.slideIn();
	        spinner(false);
	    }).catch(displayError);
	});

	// Analytics
	Router.route('/:user/:repository/analytics/', function () {
	    ApiHelper.checkConnection().then(function () {
	        return ApiHelper.getResources(true);
	    }).then(function () {
	        $('.workspace').remove();

	        $('.app-container').append(_.div({ class: 'workspace analytics' }, _.div({ class: 'workspace-fixed' }, new RepositoryBar().$element), _.div({ class: 'tabbed-container vertical' }, _.div({ class: 'tabs' }, _.button({ class: 'tab active' }, 'BURN DOWN CHART').click(function () {
	            var index = $(this).index();

	            $(this).parent().children().each(function (i) {
	                $(this).toggleClass('active', i == index);
	            });

	            $(this).parents('.tabbed-container').find('.panes .pane').each(function (i) {
	                $(this).toggleClass('active', i == index);
	            });
	        })), _.div({ class: 'panes' }, _.div({ class: 'pane active' }, new BurnDownChart().$element)))));

	        navbar.slideIn();
	        spinner(false);
	    }).catch(displayError);
	});

	// Settings
	Router.route('/:user/:repository/settings/', function () {
	    location = '/#/' + Router.params.user + '/' + Router.params.repository + '/settings/versions';
	});

	Router.route('/:user/:repository/settings/:resource', function () {
	    ApiHelper.checkConnection().then(function () {
	        return ApiHelper.getResources(true);
	    }).then(function () {
	        $('.workspace').remove();

	        $('.app-container').append(_.div({ class: 'workspace settings-container' }, _.div({ class: 'workspace-fixed' }, new RepositoryBar().$element), _.div({ class: 'tabbed-container vertical' }, _.div({ class: 'tabs' }, _.each(window.resources, function (name, resource) {
	            // Read only
	            if (ApiHelper.getConfig().readonlyResources.indexOf(name) > -1) {
	                return;
	            }

	            // Not editable in resource editor
	            if (name == 'organizations' || name == 'collaborators' || name == 'issues' || name == 'repositories') {
	                return;
	            }

	            return _.button({ class: 'tab' + (Router.params.resource == name ? ' active' : '') }, prettyName(name)).click(function () {
	                location = '/#/' + Router.params.user + '/' + Router.params.repository + '/settings/' + name;
	            });
	        })), _.div({ class: 'panes' }, _.each(window.resources, function (name, resource) {
	            // Read only
	            if (ApiHelper.getConfig().readonlyResources.indexOf(name) > -1) {
	                return;
	            }

	            // Not editable in resource editor
	            if (name == 'issues' || name == 'repositories' || name == 'collaborators') {
	                return;
	            }

	            return _.div({ class: 'pane' + (Router.params.resource == name ? ' active' : '') }, new ResourceEditor({
	                name: name,
	                model: resource
	            }).$element);
	        })))));

	        navbar.slideIn();
	        spinner(false);
	    }).catch(displayError);
	});

	// Init router
	Router.init();

	// Navbar
	var navbar = new Navbar();
	$('.app-container').html(navbar.$element);

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	__webpack_require__(54);

	__webpack_require__(345);

	__webpack_require__(347);

	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;

	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}

	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);

	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(55);
	__webpack_require__(104);
	__webpack_require__(105);
	__webpack_require__(106);
	__webpack_require__(107);
	__webpack_require__(109);
	__webpack_require__(112);
	__webpack_require__(113);
	__webpack_require__(114);
	__webpack_require__(115);
	__webpack_require__(116);
	__webpack_require__(117);
	__webpack_require__(118);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(122);
	__webpack_require__(124);
	__webpack_require__(126);
	__webpack_require__(128);
	__webpack_require__(131);
	__webpack_require__(132);
	__webpack_require__(133);
	__webpack_require__(137);
	__webpack_require__(139);
	__webpack_require__(141);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(161);
	__webpack_require__(162);
	__webpack_require__(163);
	__webpack_require__(165);
	__webpack_require__(166);
	__webpack_require__(167);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(188);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(193);
	__webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(198);
	__webpack_require__(199);
	__webpack_require__(200);
	__webpack_require__(201);
	__webpack_require__(202);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(205);
	__webpack_require__(206);
	__webpack_require__(207);
	__webpack_require__(208);
	__webpack_require__(209);
	__webpack_require__(211);
	__webpack_require__(212);
	__webpack_require__(218);
	__webpack_require__(219);
	__webpack_require__(221);
	__webpack_require__(222);
	__webpack_require__(223);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(231);
	__webpack_require__(233);
	__webpack_require__(234);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(239);
	__webpack_require__(241);
	__webpack_require__(242);
	__webpack_require__(243);
	__webpack_require__(245);
	__webpack_require__(247);
	__webpack_require__(249);
	__webpack_require__(250);
	__webpack_require__(251);
	__webpack_require__(253);
	__webpack_require__(254);
	__webpack_require__(255);
	__webpack_require__(256);
	__webpack_require__(263);
	__webpack_require__(266);
	__webpack_require__(267);
	__webpack_require__(269);
	__webpack_require__(270);
	__webpack_require__(273);
	__webpack_require__(274);
	__webpack_require__(276);
	__webpack_require__(277);
	__webpack_require__(278);
	__webpack_require__(279);
	__webpack_require__(280);
	__webpack_require__(281);
	__webpack_require__(282);
	__webpack_require__(283);
	__webpack_require__(284);
	__webpack_require__(285);
	__webpack_require__(286);
	__webpack_require__(287);
	__webpack_require__(288);
	__webpack_require__(289);
	__webpack_require__(290);
	__webpack_require__(291);
	__webpack_require__(292);
	__webpack_require__(293);
	__webpack_require__(294);
	__webpack_require__(296);
	__webpack_require__(297);
	__webpack_require__(298);
	__webpack_require__(299);
	__webpack_require__(300);
	__webpack_require__(301);
	__webpack_require__(303);
	__webpack_require__(304);
	__webpack_require__(305);
	__webpack_require__(306);
	__webpack_require__(307);
	__webpack_require__(308);
	__webpack_require__(309);
	__webpack_require__(310);
	__webpack_require__(312);
	__webpack_require__(313);
	__webpack_require__(315);
	__webpack_require__(316);
	__webpack_require__(317);
	__webpack_require__(318);
	__webpack_require__(321);
	__webpack_require__(322);
	__webpack_require__(323);
	__webpack_require__(324);
	__webpack_require__(325);
	__webpack_require__(326);
	__webpack_require__(327);
	__webpack_require__(328);
	__webpack_require__(330);
	__webpack_require__(331);
	__webpack_require__(332);
	__webpack_require__(333);
	__webpack_require__(334);
	__webpack_require__(335);
	__webpack_require__(336);
	__webpack_require__(337);
	__webpack_require__(338);
	__webpack_require__(339);
	__webpack_require__(340);
	__webpack_require__(343);
	__webpack_require__(344);
	module.exports = __webpack_require__(61);

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var global = __webpack_require__(56),
	    has = __webpack_require__(57),
	    DESCRIPTORS = __webpack_require__(58),
	    $export = __webpack_require__(60),
	    redefine = __webpack_require__(70),
	    META = __webpack_require__(74).KEY,
	    $fails = __webpack_require__(59),
	    shared = __webpack_require__(75),
	    setToStringTag = __webpack_require__(76),
	    uid = __webpack_require__(71),
	    wks = __webpack_require__(77),
	    wksExt = __webpack_require__(78),
	    wksDefine = __webpack_require__(79),
	    keyOf = __webpack_require__(81),
	    enumKeys = __webpack_require__(94),
	    isArray = __webpack_require__(97),
	    anObject = __webpack_require__(64),
	    toIObject = __webpack_require__(84),
	    toPrimitive = __webpack_require__(68),
	    createDesc = __webpack_require__(69),
	    _create = __webpack_require__(98),
	    gOPNExt = __webpack_require__(101),
	    $GOPD = __webpack_require__(103),
	    $DP = __webpack_require__(63),
	    $keys = __webpack_require__(82),
	    gOPD = $GOPD.f,
	    dP = $DP.f,
	    gOPN = gOPNExt.f,
	    $Symbol = global.Symbol,
	    $JSON = global.JSON,
	    _stringify = $JSON && $JSON.stringify,
	    PROTOTYPE = 'prototype',
	    HIDDEN = wks('_hidden'),
	    TO_PRIMITIVE = wks('toPrimitive'),
	    isEnum = {}.propertyIsEnumerable,
	    SymbolRegistry = shared('symbol-registry'),
	    AllSymbols = shared('symbols'),
	    OPSymbols = shared('op-symbols'),
	    ObjectProto = Object[PROTOTYPE],
	    USE_NATIVE = typeof $Symbol == 'function',
	    QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function get() {
	      return dP(this, 'a', { value: 7 }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P)),
	      i = 0,
	      l = keys.length,
	      key;
	  while (l > i) {
	    $defineProperty(it, key = keys[i++], P[key]);
	  }return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  }return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto,
	      names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  }return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function _Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function $set(value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(102).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(96).f = $propertyIsEnumerable;
	  __webpack_require__(95).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(80)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var symbols =
	// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
	  wks(symbols[i++]);
	}for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
	  wksDefine(symbols[i++]);
	}$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key) {
	    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it],
	        i = 1,
	        replacer,
	        $replacer;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(62)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(59)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    core = __webpack_require__(61),
	    hide = __webpack_require__(62),
	    redefine = __webpack_require__(70),
	    ctx = __webpack_require__(72),
	    PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
	      key,
	      own,
	      out,
	      exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if (target) redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '2.4.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(63),
	    createDesc = __webpack_require__(69);
	module.exports = __webpack_require__(58) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var anObject = __webpack_require__(64),
	    IE8_DOM_DEFINE = __webpack_require__(66),
	    toPrimitive = __webpack_require__(68),
	    dP = Object.defineProperty;

	exports.f = __webpack_require__(58) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(65);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = !__webpack_require__(58) && !__webpack_require__(59)(function () {
	  return Object.defineProperty(__webpack_require__(67)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(65),
	    document = __webpack_require__(56).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(65);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    hide = __webpack_require__(62),
	    has = __webpack_require__(57),
	    SRC = __webpack_require__(71)('src'),
	    TO_STRING = 'toString',
	    $toString = Function[TO_STRING],
	    TPL = ('' + $toString).split(TO_STRING);

	__webpack_require__(61).inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global) {
	    O[key] = val;
	  } else {
	    if (!safe) {
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if (O[key]) O[key] = val;else hide(O, key, val);
	    }
	  }
	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';

	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// optional / simple context binding
	var aFunction = __webpack_require__(73);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var META = __webpack_require__(71)('meta'),
	    isObject = __webpack_require__(65),
	    has = __webpack_require__(57),
	    setDesc = __webpack_require__(63).f,
	    id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(59)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function setMeta(it) {
	  setDesc(it, META, { value: {
	      i: 'O' + ++id, // object ID
	      w: {} // weak collections IDs
	    } });
	};
	var fastKey = function fastKey(it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	    // return object ID
	  }return it[META].i;
	};
	var getWeak = function getWeak(it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	    // return hash weak collections IDs
	  }return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function onFreeze(it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var def = __webpack_require__(63).f,
	    has = __webpack_require__(57),
	    TAG = __webpack_require__(77)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(75)('wks'),
	    uid = __webpack_require__(71),
	    _Symbol = __webpack_require__(56).Symbol,
	    USE_SYMBOL = typeof _Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.f = __webpack_require__(77);

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    core = __webpack_require__(61),
	    LIBRARY = __webpack_require__(80),
	    wksExt = __webpack_require__(78),
	    defineProperty = __webpack_require__(63).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	"use strict";

	module.exports = false;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getKeys = __webpack_require__(82),
	    toIObject = __webpack_require__(84);
	module.exports = function (object, el) {
	  var O = toIObject(object),
	      keys = getKeys(O),
	      length = keys.length,
	      index = 0,
	      key;
	  while (length > index) {
	    if (O[key = keys[index++]] === el) return key;
	  }
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(83),
	    enumBugKeys = __webpack_require__(93);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = __webpack_require__(57),
	    toIObject = __webpack_require__(84),
	    arrayIndexOf = __webpack_require__(88)(false),
	    IE_PROTO = __webpack_require__(92)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(85),
	    defined = __webpack_require__(87);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(86);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(84),
	    toLength = __webpack_require__(89),
	    toIndex = __webpack_require__(91);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if (IS_INCLUDES || index in O) {
	        if (O[index] === el) return IS_INCLUDES || index || 0;
	      }
	    }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(90),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";

	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(90),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var shared = __webpack_require__(75)('keys'),
	    uid = __webpack_require__(71);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';

	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(82),
	    gOPS = __webpack_require__(95),
	    pIE = __webpack_require__(96);
	module.exports = function (it) {
	  var result = getKeys(it),
	      getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it),
	        isEnum = pIE.f,
	        i = 0,
	        key;
	    while (symbols.length > i) {
	      if (isEnum.call(it, key = symbols[i++])) result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 95 */
/***/ function(module, exports) {

	"use strict";

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 96 */
/***/ function(module, exports) {

	"use strict";

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(86);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(64),
	    dPs = __webpack_require__(99),
	    enumBugKeys = __webpack_require__(93),
	    IE_PROTO = __webpack_require__(92)('IE_PROTO'),
	    Empty = function Empty() {/* empty */},
	    PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var _createDict = function createDict() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(67)('iframe'),
	      i = enumBugKeys.length,
	      lt = '<',
	      gt = '>',
	      iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(100).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  _createDict = iframeDocument.F;
	  while (i--) {
	    delete _createDict[PROTOTYPE][enumBugKeys[i]];
	  }return _createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = _createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(63),
	    anObject = __webpack_require__(64),
	    getKeys = __webpack_require__(82);

	module.exports = __webpack_require__(58) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties),
	      length = keys.length,
	      i = 0,
	      P;
	  while (length > i) {
	    dP.f(O, P = keys[i++], Properties[P]);
	  }return O;
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(56).document && document.documentElement;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(84),
	    gOPN = __webpack_require__(102).f,
	    toString = {}.toString;

	var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function getWindowNames(it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(83),
	    hiddenKeys = __webpack_require__(93).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pIE = __webpack_require__(96),
	    createDesc = __webpack_require__(69),
	    toIObject = __webpack_require__(84),
	    toPrimitive = __webpack_require__(68),
	    has = __webpack_require__(57),
	    IE8_DOM_DEFINE = __webpack_require__(66),
	    gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(58) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) {/* empty */}
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(98) });

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(58), 'Object', { defineProperty: __webpack_require__(63).f });

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(58), 'Object', { defineProperties: __webpack_require__(99) });

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(84),
	    $getOwnPropertyDescriptor = __webpack_require__(103).f;

	__webpack_require__(108)('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(60),
	    core = __webpack_require__(61),
	    fails = __webpack_require__(59);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(110),
	    $getPrototypeOf = __webpack_require__(111);

	__webpack_require__(108)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(87);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(57),
	    toObject = __webpack_require__(110),
	    IE_PROTO = __webpack_require__(92)('IE_PROTO'),
	    ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(110),
	    $keys = __webpack_require__(82);

	__webpack_require__(108)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(108)('getOwnPropertyNames', function () {
	  return __webpack_require__(101).f;
	});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(65),
	    meta = __webpack_require__(74).onFreeze;

	__webpack_require__(108)('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(65),
	    meta = __webpack_require__(74).onFreeze;

	__webpack_require__(108)('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(65),
	    meta = __webpack_require__(74).onFreeze;

	__webpack_require__(108)('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(65);

	__webpack_require__(108)('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(65);

	__webpack_require__(108)('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(65);

	__webpack_require__(108)('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(60);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(121) });

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)

	var getKeys = __webpack_require__(82),
	    gOPS = __webpack_require__(95),
	    pIE = __webpack_require__(96),
	    toObject = __webpack_require__(110),
	    IObject = __webpack_require__(85),
	    $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(59)(function () {
	  var A = {},
	      B = {},
	      S = Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      aLen = arguments.length,
	      index = 1,
	      getSymbols = gOPS.f,
	      isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) {
	      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	    }
	  }return T;
	} : $assign;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(60);
	$export($export.S, 'Object', { is: __webpack_require__(123) });

/***/ },
/* 123 */
/***/ function(module, exports) {

	"use strict";

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y) {
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(60);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(125).set });

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(65),
	    anObject = __webpack_require__(64);
	var check = function check(O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	  function (test, buggy, set) {
	    try {
	      set = __webpack_require__(72)(Function.call, __webpack_require__(103).f(Object.prototype, '__proto__').set, 2);
	      set(test, []);
	      buggy = !(test instanceof Array);
	    } catch (e) {
	      buggy = true;
	    }
	    return function setPrototypeOf(O, proto) {
	      check(O, proto);
	      if (buggy) O.__proto__ = proto;else set(O, proto);
	      return O;
	    };
	  }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()

	var classof = __webpack_require__(127),
	    test = {};
	test[__webpack_require__(77)('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  __webpack_require__(70)(Object.prototype, 'toString', function toString() {
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(86),
	    TAG = __webpack_require__(77)('toStringTag')
	// ES3 wrong here
	,
	    ARG = cof(function () {
	  return arguments;
	}()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (e) {/* empty */}
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof(O)
	  // ES3 arguments fallback
	  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(60);

	$export($export.P, 'Function', { bind: __webpack_require__(129) });

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aFunction = __webpack_require__(73),
	    isObject = __webpack_require__(65),
	    invoke = __webpack_require__(130),
	    arraySlice = [].slice,
	    factories = {};

	var construct = function construct(F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) {
	      n[i] = 'a[' + i + ']';
	    }factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }return factories[len](F, args);
	};

	module.exports = Function.bind || function bind(that /*, args... */) {
	  var fn = aFunction(this),
	      partArgs = arraySlice.call(arguments, 1);
	  var bound = function bound() /* args... */{
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 130 */
/***/ function(module, exports) {

	"use strict";

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	                  var un = that === undefined;
	                  switch (args.length) {
	                                    case 0:
	                                                      return un ? fn() : fn.call(that);
	                                    case 1:
	                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
	                                    case 2:
	                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
	                                    case 3:
	                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
	                                    case 4:
	                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	                  }return fn.apply(that, args);
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(63).f,
	    createDesc = __webpack_require__(69),
	    has = __webpack_require__(57),
	    FProto = Function.prototype,
	    nameRE = /^\s*function ([^ (]*)/,
	    NAME = 'name';

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(58) && dP(FProto, NAME, {
	  configurable: true,
	  get: function get() {
	    try {
	      var that = this,
	          name = ('' + that).match(nameRE)[1];
	      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	      return name;
	    } catch (e) {
	      return '';
	    }
	  }
	});

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(65),
	    getPrototypeOf = __webpack_require__(111),
	    HAS_INSTANCE = __webpack_require__(77)('hasInstance'),
	    FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(63).f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
	    if (typeof this != 'function' || !isObject(O)) return false;
	    if (!isObject(this.prototype)) return O instanceof this;
	    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	    while (O = getPrototypeOf(O)) {
	      if (this.prototype === O) return true;
	    }return false;
	  } });

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $parseInt = __webpack_require__(134);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $parseInt = __webpack_require__(56).parseInt,
	    $trim = __webpack_require__(135).trim,
	    ws = __webpack_require__(136),
	    hex = /^[\-+]?0[xX]/;

	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    defined = __webpack_require__(87),
	    fails = __webpack_require__(59),
	    spaces = __webpack_require__(136),
	    space = '[' + spaces + ']',
	    non = '\u200B\x85',
	    ltrim = RegExp('^' + space + space + '*'),
	    rtrim = RegExp(space + space + '*$');

	var exporter = function exporter(KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = fails(function () {
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	module.exports = exporter;

/***/ },
/* 136 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $parseFloat = __webpack_require__(138);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $parseFloat = __webpack_require__(56).parseFloat,
	    $trim = __webpack_require__(135).trim;

	module.exports = 1 / $parseFloat(__webpack_require__(136) + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim(String(str), 3),
	      result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    has = __webpack_require__(57),
	    cof = __webpack_require__(86),
	    inheritIfRequired = __webpack_require__(140),
	    toPrimitive = __webpack_require__(68),
	    fails = __webpack_require__(59),
	    gOPN = __webpack_require__(102).f,
	    gOPD = __webpack_require__(103).f,
	    dP = __webpack_require__(63).f,
	    $trim = __webpack_require__(135).trim,
	    NUMBER = 'Number',
	    $Number = global[NUMBER],
	    Base = $Number,
	    proto = $Number.prototype
	// Opera ~12 has broken Object#toString
	,
	    BROKEN_COF = cof(__webpack_require__(98)(proto)) == NUMBER,
	    TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function toNumber(argument) {
	  var it = toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0),
	        third,
	        radix,
	        maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66:case 98:
	          radix = 2;maxCode = 49;break; // fast equal /^0b[01]+$/i
	        case 79:case 111:
	          radix = 8;maxCode = 55;break; // fast equal /^0o[0-7]+$/i
	        default:
	          return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      }return parseInt(digits, radix);
	    }
	  }return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value,
	        that = this;
	    return that instanceof $Number
	    // check on 1..constructor(foo) case
	    && (BROKEN_COF ? fails(function () {
	      proto.valueOf.call(that);
	    }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = __webpack_require__(58) ? gOPN(Base) : (
	  // ES3:
	  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	  // ES6 (in case, if modules with ES6 Number statics required before):
	  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
	    if (has(Base, key = keys[j]) && !has($Number, key)) {
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(70)(global, NUMBER, $Number);
	}

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(65),
	    setPrototypeOf = __webpack_require__(125).set;
	module.exports = function (that, target, C) {
	  var P,
	      S = target.constructor;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  }return that;
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    toInteger = __webpack_require__(90),
	    aNumberValue = __webpack_require__(142),
	    repeat = __webpack_require__(143),
	    $toFixed = 1..toFixed,
	    floor = Math.floor,
	    data = [0, 0, 0, 0, 0, 0],
	    ERROR = 'Number.toFixed: incorrect invocation!',
	    ZERO = '0';

	var multiply = function multiply(n, c) {
	  var i = -1,
	      c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function divide(n) {
	  var i = 6,
	      c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor(c / n);
	    c = c % n * 1e7;
	  }
	};
	var numToString = function numToString() {
	  var i = 6,
	      s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  }return s;
	};
	var pow = function pow(x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function log(x) {
	  var n = 0,
	      x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  }return n;
	};

	$export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128..toFixed(0) !== '1000000000000000128') || !__webpack_require__(59)(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = aNumberValue(this, ERROR),
	        f = toInteger(fractionDigits),
	        s = '',
	        m = ZERO,
	        e,
	        z,
	        j,
	        k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    }return m;
	  }
	});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cof = __webpack_require__(86);
	module.exports = function (it, msg) {
	  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(90),
	    defined = __webpack_require__(87);

	module.exports = function repeat(count) {
	  var str = String(defined(this)),
	      res = '',
	      n = toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (; n > 0; (n >>>= 1) && (str += str)) {
	    if (n & 1) res += str;
	  }return res;
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $fails = __webpack_require__(59),
	    aNumberValue = __webpack_require__(142),
	    $toPrecision = 1..toPrecision;

	$export($export.P + $export.F * ($fails(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(60);

	$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.2 Number.isFinite(number)
	var $export = __webpack_require__(60),
	    _isFinite = __webpack_require__(56).isFinite;

	$export($export.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(60);

	$export($export.S, 'Number', { isInteger: __webpack_require__(148) });

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(65),
	    floor = Math.floor;
	module.exports = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(60);

	$export($export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    return number != number;
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export = __webpack_require__(60),
	    isInteger = __webpack_require__(148),
	    abs = Math.abs;

	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(60);

	$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(60);

	$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $parseFloat = __webpack_require__(138);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $parseInt = __webpack_require__(134);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(60),
	    log1p = __webpack_require__(156),
	    sqrt = Math.sqrt,
	    $acosh = Math.acosh;

	$export($export.S + $export.F * !($acosh
	// V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	&& Math.floor($acosh(Number.MAX_VALUE)) == 710
	// Tor Browser bug: Math.acosh(Infinity) -> NaN 
	&& $acosh(Infinity) == Infinity), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 156 */
/***/ function(module, exports) {

	"use strict";

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(60),
	    $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0 
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(60),
	    $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0 
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(60),
	    sign = __webpack_require__(160);

	$export($export.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 160 */
/***/ function(module, exports) {

	"use strict";

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x) {
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(60);

	$export($export.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(60),
	    exp = Math.exp;

	$export($export.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(60),
	    $expm1 = __webpack_require__(164);

	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

/***/ },
/* 164 */
/***/ function(module, exports) {

	"use strict";

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = !$expm1
	// Old FF bug
	|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	// Tor Browser bug
	|| $expm1(-2e-17) != -2e-17 ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.16 Math.fround(x)
	var $export = __webpack_require__(60),
	    sign = __webpack_require__(160),
	    pow = Math.pow,
	    EPSILON = pow(2, -52),
	    EPSILON32 = pow(2, -23),
	    MAX32 = pow(2, 127) * (2 - EPSILON32),
	    MIN32 = pow(2, -126);

	var roundTiesToEven = function roundTiesToEven(n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	};

	$export($export.S, 'Math', {
	  fround: function fround(x) {
	    var $abs = Math.abs(x),
	        $sign = sign(x),
	        a,
	        result;
	    if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if (result > MAX32 || result != result) return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(60),
	    abs = Math.abs;

	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2) {
	    // eslint-disable-line no-unused-vars
	    var sum = 0,
	        i = 0,
	        aLen = arguments.length,
	        larg = 0,
	        arg,
	        div;
	    while (i < aLen) {
	      arg = abs(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(60),
	    $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(59)(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff,
	        xn = +x,
	        yn = +y,
	        xl = UINT16 & xn,
	        yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(60);

	$export($export.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(60);

	$export($export.S, 'Math', { log1p: __webpack_require__(156) });

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(60);

	$export($export.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(60);

	$export($export.S, 'Math', { sign: __webpack_require__(160) });

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(60),
	    expm1 = __webpack_require__(164),
	    exp = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(59)(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(60),
	    expm1 = __webpack_require__(164),
	    exp = Math.exp;

	$export($export.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = expm1(x = +x),
	        b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(60);

	$export($export.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    toIndex = __webpack_require__(91),
	    fromCharCode = String.fromCharCode,
	    $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) {
	    // eslint-disable-line no-unused-vars
	    var res = [],
	        aLen = arguments.length,
	        i = 0,
	        code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (toIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
	    }return res.join('');
	  }
	});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    toIObject = __webpack_require__(84),
	    toLength = __webpack_require__(89);

	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = toIObject(callSite.raw),
	        len = toLength(tpl.length),
	        aLen = arguments.length,
	        res = [],
	        i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    }return res.join('');
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()

	__webpack_require__(135)('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $at = __webpack_require__(179)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(180)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(90),
	    defined = __webpack_require__(87);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that)),
	        i = toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LIBRARY = __webpack_require__(80),
	    $export = __webpack_require__(60),
	    redefine = __webpack_require__(70),
	    hide = __webpack_require__(62),
	    has = __webpack_require__(57),
	    Iterators = __webpack_require__(181),
	    $iterCreate = __webpack_require__(182),
	    setToStringTag = __webpack_require__(76),
	    getPrototypeOf = __webpack_require__(111),
	    ITERATOR = __webpack_require__(77)('iterator'),
	    BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	,
	    FF_ITERATOR = '@@iterator',
	    KEYS = 'keys',
	    VALUES = 'values';

	var returnThis = function returnThis() {
	  return this;
	};

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator',
	      DEF_VALUES = DEFAULT == VALUES,
	      VALUES_BUG = false,
	      proto = Base.prototype,
	      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      $default = $native || getMethod(DEFAULT),
	      $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
	      $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
	      methods,
	      key,
	      IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() {
	      return $native.call(this);
	    };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 181 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {};

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var create = __webpack_require__(98),
	    descriptor = __webpack_require__(69),
	    setToStringTag = __webpack_require__(76),
	    IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(62)(IteratorPrototype, __webpack_require__(77)('iterator'), function () {
	  return this;
	});

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $at = __webpack_require__(179)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at(this, pos);
	  }
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';

	var $export = __webpack_require__(60),
	    toLength = __webpack_require__(89),
	    context = __webpack_require__(185),
	    ENDS_WITH = 'endsWith',
	    $endsWith = ''[ENDS_WITH];

	$export($export.P + $export.F * __webpack_require__(187)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */) {
	    var that = context(this, searchString, ENDS_WITH),
	        endPosition = arguments.length > 1 ? arguments[1] : undefined,
	        len = toLength(that.length),
	        end = endPosition === undefined ? len : Math.min(toLength(endPosition), len),
	        search = String(searchString);
	    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(186),
	    defined = __webpack_require__(87);

	module.exports = function (that, searchString, NAME) {
	  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(65),
	    cof = __webpack_require__(86),
	    MATCH = __webpack_require__(77)('match');
	module.exports = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MATCH = __webpack_require__(77)('match');
	module.exports = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch (f) {/* empty */}
	  }return true;
	};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';

	var $export = __webpack_require__(60),
	    context = __webpack_require__(185),
	    INCLUDES = 'includes';

	$export($export.P + $export.F * __webpack_require__(187)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */) {
	    return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60);

	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(143)
	});

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';

	var $export = __webpack_require__(60),
	    toLength = __webpack_require__(89),
	    context = __webpack_require__(185),
	    STARTS_WITH = 'startsWith',
	    $startsWith = ''[STARTS_WITH];

	$export($export.P + $export.F * __webpack_require__(187)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */) {
	    var that = context(this, searchString, STARTS_WITH),
	        index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length)),
	        search = String(searchString);
	    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.2 String.prototype.anchor(name)

	__webpack_require__(192)('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    fails = __webpack_require__(59),
	    defined = __webpack_require__(87),
	    quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function createHTML(string, tag, attribute, value) {
	  var S = String(defined(string)),
	      p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.3 String.prototype.big()

	__webpack_require__(192)('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.4 String.prototype.blink()

	__webpack_require__(192)('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.5 String.prototype.bold()

	__webpack_require__(192)('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.6 String.prototype.fixed()

	__webpack_require__(192)('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)

	__webpack_require__(192)('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)

	__webpack_require__(192)('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.9 String.prototype.italics()

	__webpack_require__(192)('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.10 String.prototype.link(url)

	__webpack_require__(192)('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.11 String.prototype.small()

	__webpack_require__(192)('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.12 String.prototype.strike()

	__webpack_require__(192)('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.13 String.prototype.sub()

	__webpack_require__(192)('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.14 String.prototype.sup()

	__webpack_require__(192)('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(60);

	$export($export.S, 'Date', { now: function now() {
	    return new Date().getTime();
	  } });

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    toObject = __webpack_require__(110),
	    toPrimitive = __webpack_require__(68);

	$export($export.P + $export.F * __webpack_require__(59)(function () {
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
	      return 1;
	    } }) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key) {
	    var O = toObject(this),
	        pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

	var $export = __webpack_require__(60),
	    fails = __webpack_require__(59),
	    getTime = Date.prototype.getTime;

	var lz = function lz(num) {
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function () {
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function () {
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString() {
	    if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	    var d = this,
	        y = d.getUTCFullYear(),
	        m = d.getUTCMilliseconds(),
	        s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DateProto = Date.prototype,
	    INVALID_DATE = 'Invalid Date',
	    TO_STRING = 'toString',
	    $toString = DateProto[TO_STRING],
	    getTime = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  __webpack_require__(70)(DateProto, TO_STRING, function toString() {
	    var value = getTime.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TO_PRIMITIVE = __webpack_require__(77)('toPrimitive'),
	    proto = Date.prototype;

	if (!(TO_PRIMITIVE in proto)) __webpack_require__(62)(proto, TO_PRIMITIVE, __webpack_require__(210));

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var anObject = __webpack_require__(64),
	    toPrimitive = __webpack_require__(68),
	    NUMBER = 'number';

	module.exports = function (hint) {
	  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(60);

	$export($export.S, 'Array', { isArray: __webpack_require__(97) });

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(72),
	    $export = __webpack_require__(60),
	    toObject = __webpack_require__(110),
	    call = __webpack_require__(213),
	    isArrayIter = __webpack_require__(214),
	    toLength = __webpack_require__(89),
	    createProperty = __webpack_require__(215),
	    getIterFn = __webpack_require__(216);

	$export($export.S + $export.F * !__webpack_require__(217)(function (iter) {
	  Array.from(iter);
	}), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
	    var O = toObject(arrayLike),
	        C = typeof this == 'function' ? this : Array,
	        aLen = arguments.length,
	        mapfn = aLen > 1 ? arguments[1] : undefined,
	        mapping = mapfn !== undefined,
	        index = 0,
	        iterFn = getIterFn(O),
	        length,
	        result,
	        step,
	        iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(64);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	    // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// check on default Array iterator
	var Iterators = __webpack_require__(181),
	    ITERATOR = __webpack_require__(77)('iterator'),
	    ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $defineProperty = __webpack_require__(63),
	    createDesc = __webpack_require__(69);

	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
	};

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classof = __webpack_require__(127),
	    ITERATOR = __webpack_require__(77)('iterator'),
	    Iterators = __webpack_require__(181);
	module.exports = __webpack_require__(61).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ITERATOR = __webpack_require__(77)('iterator'),
	    SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  };
	  Array.from(riter, function () {
	    throw 2;
	  });
	} catch (e) {/* empty */}

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7],
	        iter = arr[ITERATOR]();
	    iter.next = function () {
	      return { done: safe = true };
	    };
	    arr[ITERATOR] = function () {
	      return iter;
	    };
	    exec(arr);
	  } catch (e) {/* empty */}
	  return safe;
	};

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    createProperty = __webpack_require__(215);

	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(59)(function () {
	  function F() {}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of() /* ...args */{
	    var index = 0,
	        aLen = arguments.length,
	        result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) {
	      createProperty(result, index, arguments[index++]);
	    }result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)

	var $export = __webpack_require__(60),
	    toIObject = __webpack_require__(84),
	    arrayJoin = [].join;

	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(85) != Object || !__webpack_require__(220)(arrayJoin)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fails = __webpack_require__(59);

	module.exports = function (method, arg) {
	  return !!method && fails(function () {
	    arg ? method.call(null, function () {}, 1) : method.call(null);
	  });
	};

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    html = __webpack_require__(100),
	    cof = __webpack_require__(86),
	    toIndex = __webpack_require__(91),
	    toLength = __webpack_require__(89),
	    arraySlice = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(59)(function () {
	  if (html) arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = toLength(this.length),
	        klass = cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice.call(this, begin, end);
	    var start = toIndex(begin, len),
	        upTo = toIndex(end, len),
	        size = toLength(upTo - start),
	        cloned = Array(size),
	        i = 0;
	    for (; i < size; i++) {
	      cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
	    }return cloned;
	  }
	});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    aFunction = __webpack_require__(73),
	    toObject = __webpack_require__(110),
	    fails = __webpack_require__(59),
	    $sort = [].sort,
	    test = [1, 2, 3];

	$export($export.P + $export.F * (fails(function () {
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function () {
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(220)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $forEach = __webpack_require__(224)(0),
	    STRICT = __webpack_require__(220)([].forEach, true);

	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx = __webpack_require__(72),
	    IObject = __webpack_require__(85),
	    toObject = __webpack_require__(110),
	    toLength = __webpack_require__(89),
	    asc = __webpack_require__(225);
	module.exports = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1,
	      IS_FILTER = TYPE == 2,
	      IS_SOME = TYPE == 3,
	      IS_EVERY = TYPE == 4,
	      IS_FIND_INDEX = TYPE == 6,
	      NO_HOLES = TYPE == 5 || IS_FIND_INDEX,
	      create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this),
	        self = IObject(O),
	        f = ctx(callbackfn, that, 3),
	        length = toLength(self.length),
	        index = 0,
	        result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined,
	        val,
	        res;
	    for (; length > index; index++) {
	      if (NO_HOLES || index in self) {
	        val = self[index];
	        res = f(val, index, O);
	        if (TYPE) {
	          if (IS_MAP) result[index] = res; // map
	          else if (res) switch (TYPE) {
	              case 3:
	                return true; // some
	              case 5:
	                return val; // find
	              case 6:
	                return index; // findIndex
	              case 2:
	                result.push(val); // filter
	            } else if (IS_EVERY) return false; // every
	        }
	      }
	    }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(226);

	module.exports = function (original, length) {
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(65),
	    isArray = __webpack_require__(97),
	    SPECIES = __webpack_require__(77)('species');

	module.exports = function (original) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }return C === undefined ? Array : C;
	};

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $map = __webpack_require__(224)(1);

	$export($export.P + $export.F * !__webpack_require__(220)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $filter = __webpack_require__(224)(2);

	$export($export.P + $export.F * !__webpack_require__(220)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $some = __webpack_require__(224)(3);

	$export($export.P + $export.F * !__webpack_require__(220)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $every = __webpack_require__(224)(4);

	$export($export.P + $export.F * !__webpack_require__(220)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $reduce = __webpack_require__(232);

	$export($export.P + $export.F * !__webpack_require__(220)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aFunction = __webpack_require__(73),
	    toObject = __webpack_require__(110),
	    IObject = __webpack_require__(85),
	    toLength = __webpack_require__(89);

	module.exports = function (that, callbackfn, aLen, memo, isRight) {
	  aFunction(callbackfn);
	  var O = toObject(that),
	      self = IObject(O),
	      length = toLength(O.length),
	      index = isRight ? length - 1 : 0,
	      i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (; isRight ? index >= 0 : length > index; index += i) {
	    if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	  }return memo;
	};

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $reduce = __webpack_require__(232);

	$export($export.P + $export.F * !__webpack_require__(220)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $indexOf = __webpack_require__(88)(false),
	    $native = [].indexOf,
	    NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(220)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	    // convert -0 to +0
	    ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    toIObject = __webpack_require__(84),
	    toInteger = __webpack_require__(90),
	    toLength = __webpack_require__(89),
	    $native = [].lastIndexOf,
	    NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(220)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
	    var O = toIObject(this),
	        length = toLength(O.length),
	        index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
	    if (index < 0) index = length + index;
	    for (; index >= 0; index--) {
	      if (index in O) if (O[index] === searchElement) return index || 0;
	    }return -1;
	  }
	});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(60);

	$export($export.P, 'Array', { copyWithin: __webpack_require__(237) });

	__webpack_require__(238)('copyWithin');

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';

	var toObject = __webpack_require__(110),
	    toIndex = __webpack_require__(91),
	    toLength = __webpack_require__(89);

	module.exports = [].copyWithin || function copyWithin(target /*= 0*/, start /*= 0, end = @length*/) {
	  var O = toObject(this),
	      len = toLength(O.length),
	      to = toIndex(target, len),
	      from = toIndex(start, len),
	      end = arguments.length > 2 ? arguments[2] : undefined,
	      count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to),
	      inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];else delete O[to];
	    to += inc;
	    from += inc;
	  }return O;
	};

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(77)('unscopables'),
	    ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(62)(ArrayProto, UNSCOPABLES, {});
	module.exports = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(60);

	$export($export.P, 'Array', { fill: __webpack_require__(240) });

	__webpack_require__(238)('fill');

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';

	var toObject = __webpack_require__(110),
	    toIndex = __webpack_require__(91),
	    toLength = __webpack_require__(89);
	module.exports = function fill(value /*, start = 0, end = @length */) {
	  var O = toObject(this),
	      length = toLength(O.length),
	      aLen = arguments.length,
	      index = toIndex(aLen > 1 ? arguments[1] : undefined, length),
	      end = aLen > 2 ? arguments[2] : undefined,
	      endPos = end === undefined ? length : toIndex(end, length);
	  while (endPos > index) {
	    O[index++] = value;
	  }return O;
	};

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $export = __webpack_require__(60),
	    $find = __webpack_require__(224)(5),
	    KEY = 'find',
	    forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () {
	  forced = false;
	});
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn /*, that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(238)(KEY);

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $export = __webpack_require__(60),
	    $find = __webpack_require__(224)(6),
	    KEY = 'findIndex',
	    forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () {
	  forced = false;
	});
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn /*, that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(238)(KEY);

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(244)('Array');

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    dP = __webpack_require__(63),
	    DESCRIPTORS = __webpack_require__(58),
	    SPECIES = __webpack_require__(77)('species');

	module.exports = function (KEY) {
	  var C = global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function get() {
	      return this;
	    }
	  });
	};

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addToUnscopables = __webpack_require__(238),
	    step = __webpack_require__(246),
	    Iterators = __webpack_require__(181),
	    toIObject = __webpack_require__(84);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(180)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      kind = this._k,
	      index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 246 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    inheritIfRequired = __webpack_require__(140),
	    dP = __webpack_require__(63).f,
	    gOPN = __webpack_require__(102).f,
	    isRegExp = __webpack_require__(186),
	    $flags = __webpack_require__(248),
	    $RegExp = global.RegExp,
	    Base = $RegExp,
	    proto = $RegExp.prototype,
	    re1 = /a/g,
	    re2 = /a/g
	// "new" creates a new object, old webkit buggy here
	,
	    CORRECT_NEW = new $RegExp(re1) !== re1;

	if (__webpack_require__(58) && (!CORRECT_NEW || __webpack_require__(59)(function () {
	  re2[__webpack_require__(77)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp,
	        piRE = isRegExp(p),
	        fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function proxy(key) {
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function get() {
	        return Base[key];
	      },
	      set: function set(it) {
	        Base[key] = it;
	      }
	    });
	  };
	  for (var keys = gOPN(Base), i = 0; keys.length > i;) {
	    proxy(keys[i++]);
	  }proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(70)(global, 'RegExp', $RegExp);
	}

	__webpack_require__(244)('RegExp');

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags

	var anObject = __webpack_require__(64);
	module.exports = function () {
	  var that = anObject(this),
	      result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(250);
	var anObject = __webpack_require__(64),
	    $flags = __webpack_require__(248),
	    DESCRIPTORS = __webpack_require__(58),
	    TO_STRING = 'toString',
	    $toString = /./[TO_STRING];

	var define = function define(fn) {
	  __webpack_require__(70)(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (__webpack_require__(59)(function () {
	  return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
	})) {
	  define(function toString() {
	    var R = anObject(this);
	    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	  // FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 21.2.5.3 get RegExp.prototype.flags()
	if (__webpack_require__(58) && /./g.flags != 'g') __webpack_require__(63).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(248)
	});

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// @@match logic
	__webpack_require__(252)('match', 1, function (defined, MATCH, $match) {
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp) {
	    'use strict';

	    var O = defined(this),
	        fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hide = __webpack_require__(62),
	    redefine = __webpack_require__(70),
	    fails = __webpack_require__(59),
	    defined = __webpack_require__(87),
	    wks = __webpack_require__(77);

	module.exports = function (KEY, length, exec) {
	  var SYMBOL = wks(KEY),
	      fns = exec(defined, SYMBOL, ''[KEY]),
	      strfn = fns[0],
	      rxfn = fns[1];
	  if (fails(function () {
	    var O = {};
	    O[SYMBOL] = function () {
	      return 7;
	    };
	    return ''[KEY](O) != 7;
	  })) {
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	    // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return rxfn.call(string, this, arg);
	    }
	    // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return rxfn.call(string, this);
	    });
	  }
	};

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// @@replace logic
	__webpack_require__(252)('replace', 2, function (defined, REPLACE, $replace) {
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue) {
	    'use strict';

	    var O = defined(this),
	        fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// @@search logic
	__webpack_require__(252)('search', 1, function (defined, SEARCH, $search) {
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp) {
	    'use strict';

	    var O = defined(this),
	        fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// @@split logic
	__webpack_require__(252)('split', 2, function (defined, SPLIT, $split) {
	  'use strict';

	  var isRegExp = __webpack_require__(186),
	      _split = $split,
	      $push = [].push,
	      $SPLIT = 'split',
	      LENGTH = 'length',
	      LAST_INDEX = 'lastIndex';
	  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function $split(separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp(separator)) return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while (match = separatorCopy.exec(string)) {
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
	            for (i = 1; i < arguments[LENGTH] - 2; i++) {
	              if (arguments[i] === undefined) match[i] = undefined;
	            }
	          });
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	    // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    $split = function $split(separator, limit) {
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit) {
	    var O = defined(this),
	        fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LIBRARY = __webpack_require__(80),
	    global = __webpack_require__(56),
	    ctx = __webpack_require__(72),
	    classof = __webpack_require__(127),
	    $export = __webpack_require__(60),
	    isObject = __webpack_require__(65),
	    aFunction = __webpack_require__(73),
	    anInstance = __webpack_require__(257),
	    forOf = __webpack_require__(258),
	    speciesConstructor = __webpack_require__(259),
	    task = __webpack_require__(260).set,
	    microtask = __webpack_require__(261)(),
	    PROMISE = 'Promise',
	    TypeError = global.TypeError,
	    process = global.process,
	    $Promise = global[PROMISE],
	    process = global.process,
	    isNode = classof(process) == 'process',
	    empty = function empty() {/* empty */},
	    Internal,
	    GenericPromiseCapability,
	    Wrapper;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1),
	        FakePromise = (promise.constructor = {})[__webpack_require__(77)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) {/* empty */}
	}();

	// helpers
	var sameConstructor = function sameConstructor(a, b) {
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function isThenable(it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function newPromiseCapability(C) {
	  return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	};
	var perform = function perform(exec) {
	  try {
	    exec();
	  } catch (e) {
	    return { error: e };
	  }
	};
	var notify = function notify(promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v,
	        ok = promise._s == 1,
	        i = 0;
	    var run = function run(reaction) {
	      var handler = ok ? reaction.ok : reaction.fail,
	          resolve = reaction.resolve,
	          reject = reaction.reject,
	          domain = reaction.domain,
	          result,
	          then;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) domain.exit();
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) {
	      run(chain[i++]);
	    } // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function onUnhandled(promise) {
	  task.call(global, function () {
	    var value = promise._v,
	        abrupt,
	        handler,
	        console;
	    if (isUnhandled(promise)) {
	      abrupt = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    }promise._a = undefined;
	    if (abrupt) throw abrupt.error;
	  });
	};
	var isUnhandled = function isUnhandled(promise) {
	  if (promise._h == 1) return false;
	  var chain = promise._a || promise._c,
	      i = 0,
	      reaction;
	  while (chain.length > i) {
	    reaction = chain[i++];
	    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	  }return true;
	};
	var onHandleUnhandled = function onHandleUnhandled(promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function $reject(value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function $resolve(value) {
	  var promise = this,
	      then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor) {
	    this._c = []; // <- awaiting reactions
	    this._a = undefined; // <- checked in isUnhandled reactions
	    this._s = 0; // <- state
	    this._d = false; // <- done
	    this._v = undefined; // <- value
	    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false; // <- notify
	  };
	  Internal.prototype = __webpack_require__(262)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function _catch(onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function PromiseCapability() {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(76)($Promise, PROMISE);
	__webpack_require__(244)(PROMISE);
	Wrapper = __webpack_require__(61)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this),
	        $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
	    var capability = newPromiseCapability(this),
	        $$resolve = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(217)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        resolve = capability.resolve,
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      var values = [],
	          index = 0,
	          remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++,
	            alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 257 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	    throw TypeError(name + ': incorrect invocation!');
	  }return it;
	};

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(72),
	    call = __webpack_require__(213),
	    isArrayIter = __webpack_require__(214),
	    anObject = __webpack_require__(64),
	    toLength = __webpack_require__(89),
	    getIterFn = __webpack_require__(216),
	    BREAK = {},
	    RETURN = {};
	var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () {
	    return iterable;
	  } : getIterFn(iterable),
	      f = ctx(fn, that, entries ? 2 : 1),
	      index = 0,
	      length,
	      step,
	      iterator,
	      result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	_exports.BREAK = BREAK;
	_exports.RETURN = RETURN;

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(64),
	    aFunction = __webpack_require__(73),
	    SPECIES = __webpack_require__(77)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor,
	      S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(72),
	    invoke = __webpack_require__(130),
	    html = __webpack_require__(100),
	    cel = __webpack_require__(67),
	    global = __webpack_require__(56),
	    process = global.process,
	    setTask = global.setImmediate,
	    clearTask = global.clearImmediate,
	    MessageChannel = global.MessageChannel,
	    counter = 0,
	    queue = {},
	    ONREADYSTATECHANGE = 'onreadystatechange',
	    defer,
	    channel,
	    port;
	var run = function run() {
	  var id = +this;
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function listener(event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [],
	        i = 1;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }queue[++counter] = function () {
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(86)(process) == 'process') {
	    defer = function defer(id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	    // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	    // Browsers with postMessage, skip WebWorkers
	    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function defer(id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	    // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function defer(id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	    // Rest old browsers
	  } else {
	    defer = function defer(id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    macrotask = __webpack_require__(260).set,
	    Observer = global.MutationObserver || global.WebKitMutationObserver,
	    process = global.process,
	    Promise = global.Promise,
	    isNode = __webpack_require__(86)(process) == 'process';

	module.exports = function () {
	  var head, last, notify;

	  var flush = function flush() {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();else last = undefined;
	        throw e;
	      }
	    }last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function notify() {
	      process.nextTick(flush);
	    };
	    // browsers with MutationObserver
	  } else if (Observer) {
	    var toggle = true,
	        node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function notify() {
	      node.data = toggle = !toggle;
	    };
	    // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    var promise = Promise.resolve();
	    notify = function notify() {
	      promise.then(flush);
	    };
	    // for other environments - macrotask based on:
	    // - setImmediate
	    // - MessageChannel
	    // - window.postMessag
	    // - onreadystatechange
	    // - setTimeout
	  } else {
	    notify = function notify() {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    }last = task;
	  };
	};

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redefine = __webpack_require__(70);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    redefine(target, key, src[key], safe);
	  }return target;
	};

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var strong = __webpack_require__(264);

	// 23.1 Map Objects
	module.exports = __webpack_require__(265)('Map', function (get) {
	  return function Map() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(63).f,
	    create = __webpack_require__(98),
	    redefineAll = __webpack_require__(262),
	    ctx = __webpack_require__(72),
	    anInstance = __webpack_require__(257),
	    defined = __webpack_require__(87),
	    forOf = __webpack_require__(258),
	    $iterDefine = __webpack_require__(180),
	    step = __webpack_require__(246),
	    setSpecies = __webpack_require__(244),
	    DESCRIPTORS = __webpack_require__(58),
	    fastKey = __webpack_require__(74).fastKey,
	    SIZE = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function getEntry(that, key) {
	  // fast case
	  var index = fastKey(key),
	      entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined; // first entry
	      that._l = undefined; // last entry
	      that[SIZE] = 0; // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function _delete(key) {
	        var that = this,
	            entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n,
	              prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        }return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */) {
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3),
	            entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) {
	            entry = entry.p;
	          }
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });
	    if (DESCRIPTORS) dP(C.prototype, 'size', {
	      get: function get() {
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var entry = getEntry(that, key),
	        prev,
	        index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	      // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key, // <- key
	        v: value, // <- value
	        p: prev = that._l, // <- previous entry
	        n: undefined, // <- next entry
	        r: false // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    }return that;
	  },
	  getEntry: getEntry,
	  setStrong: function setStrong(C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = iterated; // target
	      this._k = kind; // kind
	      this._l = undefined; // previous
	    }, function () {
	      var that = this,
	          kind = that._k,
	          entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) {
	        entry = entry.p;
	      } // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    $export = __webpack_require__(60),
	    redefine = __webpack_require__(70),
	    redefineAll = __webpack_require__(262),
	    meta = __webpack_require__(74),
	    forOf = __webpack_require__(258),
	    anInstance = __webpack_require__(257),
	    isObject = __webpack_require__(65),
	    fails = __webpack_require__(59),
	    $iterDetect = __webpack_require__(217),
	    setToStringTag = __webpack_require__(76),
	    inheritIfRequired = __webpack_require__(140);

	module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global[NAME],
	      C = Base,
	      ADDER = IS_MAP ? 'set' : 'add',
	      proto = C && C.prototype,
	      O = {};
	  var fixMethod = function fixMethod(KEY) {
	    var fn = proto[KEY];
	    redefine(proto, KEY, KEY == 'delete' ? function (a) {
	      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'has' ? function has(a) {
	      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'get' ? function get(a) {
	      return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'add' ? function add(a) {
	      fn.call(this, a === 0 ? 0 : a);return this;
	    } : function set(a, b) {
	      fn.call(this, a === 0 ? 0 : a, b);return this;
	    });
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance = new C()
	    // early implementations not supports chaining
	    ,
	        HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    ,
	        THROWS_ON_PRIMITIVES = fails(function () {
	      instance.has(1);
	    })
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    ,
	        ACCEPT_ITERABLES = $iterDetect(function (iter) {
	      new C(iter);
	    }) // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    ,
	        BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C(),
	          index = 5;
	      while (index--) {
	        $instance[ADDER](index, index);
	      }return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var strong = __webpack_require__(264);

	// 23.2 Set Objects
	module.exports = __webpack_require__(265)('Set', function (get) {
	  return function Set() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var each = __webpack_require__(224)(0),
	    redefine = __webpack_require__(70),
	    meta = __webpack_require__(74),
	    assign = __webpack_require__(121),
	    weak = __webpack_require__(268),
	    isObject = __webpack_require__(65),
	    getWeak = meta.getWeak,
	    isExtensible = Object.isExtensible,
	    uncaughtFrozenStore = weak.ufstore,
	    tmp = {},
	    InternalMap;

	var wrapper = function wrapper(get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak.def(this, key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(265)('WeakMap', wrapper, methods, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype,
	        method = proto[key];
	    redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	      }return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redefineAll = __webpack_require__(262),
	    getWeak = __webpack_require__(74).getWeak,
	    anObject = __webpack_require__(64),
	    isObject = __webpack_require__(65),
	    anInstance = __webpack_require__(257),
	    forOf = __webpack_require__(258),
	    createArrayMethod = __webpack_require__(224),
	    $has = __webpack_require__(57),
	    arrayFind = createArrayMethod(5),
	    arrayFindIndex = createArrayMethod(6),
	    id = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function UncaughtFrozenStore() {
	  this.a = [];
	};
	var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function get(key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function has(key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function set(key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;else this.a.push([key, value]);
	  },
	  'delete': function _delete(key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._i = id++; // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function _delete(key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var data = getWeak(anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var weak = __webpack_require__(268);

	// 23.4 WeakSet Objects
	__webpack_require__(265)('WeakSet', function (get) {
	  return function WeakSet() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $typed = __webpack_require__(271),
	    buffer = __webpack_require__(272),
	    anObject = __webpack_require__(64),
	    toIndex = __webpack_require__(91),
	    toLength = __webpack_require__(89),
	    isObject = __webpack_require__(65),
	    ArrayBuffer = __webpack_require__(56).ArrayBuffer,
	    speciesConstructor = __webpack_require__(259),
	    $ArrayBuffer = buffer.ArrayBuffer,
	    $DataView = buffer.DataView,
	    $isView = $typed.ABV && ArrayBuffer.isView,
	    $slice = $ArrayBuffer.prototype.slice,
	    VIEW = $typed.VIEW,
	    ARRAY_BUFFER = 'ArrayBuffer';

	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});

	$export($export.P + $export.U + $export.F * __webpack_require__(59)(function () {
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
	    var len = anObject(this).byteLength,
	        first = toIndex(start, len),
	        final = toIndex(end === undefined ? len : end, len),
	        result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first)),
	        viewS = new $DataView(this),
	        viewT = new $DataView(result),
	        index = 0;
	    while (first < final) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    }return result;
	  }
	});

	__webpack_require__(244)(ARRAY_BUFFER);

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    hide = __webpack_require__(62),
	    uid = __webpack_require__(71),
	    TYPED = uid('typed_array'),
	    VIEW = uid('view'),
	    ABV = !!(global.ArrayBuffer && global.DataView),
	    CONSTR = ABV,
	    i = 0,
	    l = 9,
	    Typed;

	var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

	while (i < l) {
	  if (Typed = global[TypedArrayConstructors[i++]]) {
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	module.exports = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	};

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(56),
	    DESCRIPTORS = __webpack_require__(58),
	    LIBRARY = __webpack_require__(80),
	    $typed = __webpack_require__(271),
	    hide = __webpack_require__(62),
	    redefineAll = __webpack_require__(262),
	    fails = __webpack_require__(59),
	    anInstance = __webpack_require__(257),
	    toInteger = __webpack_require__(90),
	    toLength = __webpack_require__(89),
	    gOPN = __webpack_require__(102).f,
	    dP = __webpack_require__(63).f,
	    arrayFill = __webpack_require__(240),
	    setToStringTag = __webpack_require__(76),
	    ARRAY_BUFFER = 'ArrayBuffer',
	    DATA_VIEW = 'DataView',
	    PROTOTYPE = 'prototype',
	    WRONG_LENGTH = 'Wrong length!',
	    WRONG_INDEX = 'Wrong index!',
	    $ArrayBuffer = global[ARRAY_BUFFER],
	    $DataView = global[DATA_VIEW],
	    Math = global.Math,
	    RangeError = global.RangeError,
	    Infinity = global.Infinity,
	    BaseBuffer = $ArrayBuffer,
	    abs = Math.abs,
	    pow = Math.pow,
	    floor = Math.floor,
	    log = Math.log,
	    LN2 = Math.LN2,
	    BUFFER = 'buffer',
	    BYTE_LENGTH = 'byteLength',
	    BYTE_OFFSET = 'byteOffset',
	    $BUFFER = DESCRIPTORS ? '_b' : BUFFER,
	    $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH,
	    $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function packIEEE754(value, mLen, nBytes) {
	  var buffer = Array(nBytes),
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0,
	      i = 0,
	      s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0,
	      e,
	      m,
	      c;
	  value = abs(value);
	  if (value != value || value === Infinity) {
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if (value * (c = pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function unpackIEEE754(buffer, mLen, nBytes) {
	  var eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = eLen - 7,
	      i = nBytes - 1,
	      s = buffer[i--],
	      e = s & 127,
	      m;
	  s >>= 7;
	  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  }return (s ? -1 : 1) * m * pow(2, e - mLen);
	};

	var unpackI32 = function unpackI32(bytes) {
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function packI8(it) {
	  return [it & 0xff];
	};
	var packI16 = function packI16(it) {
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function packI32(it) {
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function packF64(it) {
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function packF32(it) {
	  return packIEEE754(it, 23, 4);
	};

	var addGetter = function addGetter(C, key, internal) {
	  dP(C[PROTOTYPE], key, { get: function get() {
	      return this[internal];
	    } });
	};

	var get = function get(view, bytes, index, isLittleEndian) {
	  var numIndex = +index,
	      intIndex = toInteger(numIndex);
	  if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b,
	      start = intIndex + view[$OFFSET],
	      pack = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function set(view, bytes, index, conversion, value, isLittleEndian) {
	  var numIndex = +index,
	      intIndex = toInteger(numIndex);
	  if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b,
	      start = intIndex + view[$OFFSET],
	      pack = conversion(+value);
	  for (var i = 0; i < bytes; i++) {
	    store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	  }
	};

	var validateArrayBufferArguments = function validateArrayBufferArguments(that, length) {
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length,
	      byteLength = toLength(numberLength);
	  if (numberLength != byteLength) throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};

	if (!$typed.ABV) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH],
	        offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if (DESCRIPTORS) {
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */) {
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */) {
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if (!fails(function () {
	    new $ArrayBuffer(); // eslint-disable-line no-new
	  }) || !fails(function () {
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2)),
	      $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60);
	$export($export.G + $export.W + $export.F * !__webpack_require__(271).ABV, {
	  DataView: __webpack_require__(272).DataView
	});

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(275)('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	if (__webpack_require__(58)) {
	  var LIBRARY = __webpack_require__(80),
	      global = __webpack_require__(56),
	      fails = __webpack_require__(59),
	      $export = __webpack_require__(60),
	      $typed = __webpack_require__(271),
	      $buffer = __webpack_require__(272),
	      ctx = __webpack_require__(72),
	      anInstance = __webpack_require__(257),
	      propertyDesc = __webpack_require__(69),
	      hide = __webpack_require__(62),
	      redefineAll = __webpack_require__(262),
	      toInteger = __webpack_require__(90),
	      toLength = __webpack_require__(89),
	      toIndex = __webpack_require__(91),
	      toPrimitive = __webpack_require__(68),
	      has = __webpack_require__(57),
	      same = __webpack_require__(123),
	      classof = __webpack_require__(127),
	      isObject = __webpack_require__(65),
	      toObject = __webpack_require__(110),
	      isArrayIter = __webpack_require__(214),
	      create = __webpack_require__(98),
	      getPrototypeOf = __webpack_require__(111),
	      gOPN = __webpack_require__(102).f,
	      getIterFn = __webpack_require__(216),
	      uid = __webpack_require__(71),
	      wks = __webpack_require__(77),
	      createArrayMethod = __webpack_require__(224),
	      createArrayIncludes = __webpack_require__(88),
	      speciesConstructor = __webpack_require__(259),
	      ArrayIterators = __webpack_require__(245),
	      Iterators = __webpack_require__(181),
	      $iterDetect = __webpack_require__(217),
	      setSpecies = __webpack_require__(244),
	      arrayFill = __webpack_require__(240),
	      arrayCopyWithin = __webpack_require__(237),
	      $DP = __webpack_require__(63),
	      $GOPD = __webpack_require__(103),
	      dP = $DP.f,
	      gOPD = $GOPD.f,
	      RangeError = global.RangeError,
	      TypeError = global.TypeError,
	      Uint8Array = global.Uint8Array,
	      ARRAY_BUFFER = 'ArrayBuffer',
	      SHARED_BUFFER = 'Shared' + ARRAY_BUFFER,
	      BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT',
	      PROTOTYPE = 'prototype',
	      ArrayProto = Array[PROTOTYPE],
	      $ArrayBuffer = $buffer.ArrayBuffer,
	      $DataView = $buffer.DataView,
	      arrayForEach = createArrayMethod(0),
	      arrayFilter = createArrayMethod(2),
	      arraySome = createArrayMethod(3),
	      arrayEvery = createArrayMethod(4),
	      arrayFind = createArrayMethod(5),
	      arrayFindIndex = createArrayMethod(6),
	      arrayIncludes = createArrayIncludes(true),
	      arrayIndexOf = createArrayIncludes(false),
	      arrayValues = ArrayIterators.values,
	      arrayKeys = ArrayIterators.keys,
	      arrayEntries = ArrayIterators.entries,
	      arrayLastIndexOf = ArrayProto.lastIndexOf,
	      arrayReduce = ArrayProto.reduce,
	      arrayReduceRight = ArrayProto.reduceRight,
	      arrayJoin = ArrayProto.join,
	      arraySort = ArrayProto.sort,
	      arraySlice = ArrayProto.slice,
	      arrayToString = ArrayProto.toString,
	      arrayToLocaleString = ArrayProto.toLocaleString,
	      ITERATOR = wks('iterator'),
	      TAG = wks('toStringTag'),
	      TYPED_CONSTRUCTOR = uid('typed_constructor'),
	      DEF_CONSTRUCTOR = uid('def_constructor'),
	      ALL_CONSTRUCTORS = $typed.CONSTR,
	      TYPED_ARRAY = $typed.TYPED,
	      VIEW = $typed.VIEW,
	      WRONG_LENGTH = 'Wrong length!';

	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails(function () {
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	    new Uint8Array(1).set({});
	  });

	  var strictToLength = function strictToLength(it, SAME) {
	    if (it === undefined) throw TypeError(WRONG_LENGTH);
	    var number = +it,
	        length = toLength(it);
	    if (SAME && !same(number, length)) throw RangeError(WRONG_LENGTH);
	    return length;
	  };

	  var toOffset = function toOffset(it, BYTES) {
	    var offset = toInteger(it);
	    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function validate(it) {
	    if (isObject(it) && TYPED_ARRAY in it) return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function allocate(C, length) {
	    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError('It is not a typed array constructor!');
	    }return new C(length);
	  };

	  var speciesFromList = function speciesFromList(O, list) {
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function fromList(C, list) {
	    var index = 0,
	        length = list.length,
	        result = allocate(C, length);
	    while (length > index) {
	      result[index] = list[index++];
	    }return result;
	  };

	  var addGetter = function addGetter(it, key, internal) {
	    dP(it, key, { get: function get() {
	        return this._d[internal];
	      } });
	  };

	  var $from = function from(source /*, mapfn, thisArg */) {
	    var O = toObject(source),
	        aLen = arguments.length,
	        mapfn = aLen > 1 ? arguments[1] : undefined,
	        mapping = mapfn !== undefined,
	        iterFn = getIterFn(O),
	        i,
	        length,
	        values,
	        result,
	        step,
	        iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      }O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of() /*...items*/{
	    var index = 0,
	        length = arguments.length,
	        result = allocate(this, length);
	    while (length > index) {
	      result[index] = arguments[index++];
	    }return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
	    arrayToLocaleString.call(new Uint8Array(1));
	  });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */) {
	      // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) {
	      // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */) {
	      // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */) {
	      // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */) {
	      // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this,
	          length = validate(that).length,
	          middle = Math.floor(length / 2),
	          index = 0,
	          value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      }return that;
	    },
	    some: function some(callbackfn /*, thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this),
	          length = O.length,
	          $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toIndex(end, length)) - $begin));
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /*, offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1),
	        length = this.length,
	        src = toObject(arrayLike),
	        len = toLength(src.length),
	        index = 0;
	    if (len + offset > length) throw RangeError(WRONG_LENGTH);
	    while (index < len) {
	      this[offset + index] = src[index++];
	    }
	  };

	  var $iterators = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function isTAIndex(target, key) {
	    return isObject(target) && target[TYPED_ARRAY] && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) != 'symbol' && key in target && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails(function () {
	    arrayToString.call({});
	  })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function constructor() {/* noop */},
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function get() {
	      return this[TYPED_ARRAY];
	    }
	  });

	  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array',
	        ISNT_UINT8 = NAME != 'Uint8Array',
	        GETTER = 'get' + KEY,
	        SETTER = 'set' + KEY,
	        TypedArray = global[NAME],
	        Base = TypedArray || {},
	        TAC = TypedArray && getPrototypeOf(TypedArray),
	        FORCED = !TypedArray || !$typed.ABV,
	        O = {},
	        TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function getter(that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function setter(that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function addElement(that, index) {
	      dP(that, index, {
	        get: function get() {
	          return getter(this, index);
	        },
	        set: function set(value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME, '_d');
	        var index = 0,
	            offset = 0,
	            buffer,
	            byteLength,
	            length,
	            klass;
	        if (!isObject(data)) {
	          length = strictToLength(data, true);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) {
	          addElement(that, index++);
	        }
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!$iterDetect(function (iter) {
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject(data)) return new Base(strictToLength(data, ISNT_UINT8));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR],
	        CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined),
	        $iterator = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP(TypedArrayPrototype, TAG, {
	        get: function get() {
	          return NAME;
	        }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });

	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export($export.P, NAME, proto);

	    setSpecies(NAME);

	    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, { toString: arrayToString });

	    $export($export.P + $export.F * fails(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });

	    $export($export.P + $export.F * (fails(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });

	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function () {/* empty */};

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(275)('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(275)('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(275)('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(275)('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(275)('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(275)('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(275)('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(275)('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(60),
	    aFunction = __webpack_require__(73),
	    anObject = __webpack_require__(64),
	    rApply = (__webpack_require__(56).Reflect || {}).apply,
	    fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(59)(function () {
	  rApply(function () {});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = aFunction(target),
	        L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export = __webpack_require__(60),
	    create = __webpack_require__(98),
	    aFunction = __webpack_require__(73),
	    anObject = __webpack_require__(64),
	    isObject = __webpack_require__(65),
	    fails = __webpack_require__(59),
	    bind = __webpack_require__(129),
	    rConstruct = (__webpack_require__(56).Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function () {
	  function F() {}
	  return !(rConstruct(function () {}, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
	  rConstruct(function () {});
	});

	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/) {
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0:
	          return new Target();
	        case 1:
	          return new Target(args[0]);
	        case 2:
	          return new Target(args[0], args[1]);
	        case 3:
	          return new Target(args[0], args[1], args[2]);
	        case 4:
	          return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype,
	        instance = create(isObject(proto) ? proto : Object.prototype),
	        result = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP = __webpack_require__(63),
	    $export = __webpack_require__(60),
	    anObject = __webpack_require__(64),
	    toPrimitive = __webpack_require__(68);

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(59)(function () {
	  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export = __webpack_require__(60),
	    gOPD = __webpack_require__(103).f,
	    anObject = __webpack_require__(64);

	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)

	var $export = __webpack_require__(60),
	    anObject = __webpack_require__(64);
	var Enumerate = function Enumerate(iterated) {
	  this._t = anObject(iterated); // target
	  this._i = 0; // next index
	  var keys = this._k = [] // keys
	  ,
	      key;
	  for (key in iterated) {
	    keys.push(key);
	  }
	};
	__webpack_require__(182)(Enumerate, 'Object', function () {
	  var that = this,
	      keys = that._k,
	      key;
	  do {
	    if (that._i >= keys.length) return { value: undefined, done: true };
	  } while (!((key = keys[that._i++]) in that._t));
	  return { value: key, done: false };
	});

	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD = __webpack_require__(103),
	    getPrototypeOf = __webpack_require__(111),
	    has = __webpack_require__(57),
	    $export = __webpack_require__(60),
	    isObject = __webpack_require__(65),
	    anObject = __webpack_require__(64);

	function get(target, propertyKey /*, receiver*/) {
	  var receiver = arguments.length < 3 ? target : arguments[2],
	      desc,
	      proto;
	  if (anObject(target) === receiver) return target[propertyKey];
	  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
	  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
	}

	$export($export.S, 'Reflect', { get: get });

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD = __webpack_require__(103),
	    $export = __webpack_require__(60),
	    anObject = __webpack_require__(64);

	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export = __webpack_require__(60),
	    getProto = __webpack_require__(111),
	    anObject = __webpack_require__(64);

	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(60);

	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.10 Reflect.isExtensible(target)
	var $export = __webpack_require__(60),
	    anObject = __webpack_require__(64),
	    $isExtensible = Object.isExtensible;

	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(60);

	$export($export.S, 'Reflect', { ownKeys: __webpack_require__(295) });

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// all object keys, includes non-enumerable and symbols
	var gOPN = __webpack_require__(102),
	    gOPS = __webpack_require__(95),
	    anObject = __webpack_require__(64),
	    Reflect = __webpack_require__(56).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
	  var keys = gOPN.f(anObject(it)),
	      getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.12 Reflect.preventExtensions(target)
	var $export = __webpack_require__(60),
	    anObject = __webpack_require__(64),
	    $preventExtensions = Object.preventExtensions;

	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    anObject(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP = __webpack_require__(63),
	    gOPD = __webpack_require__(103),
	    getPrototypeOf = __webpack_require__(111),
	    has = __webpack_require__(57),
	    $export = __webpack_require__(60),
	    createDesc = __webpack_require__(69),
	    anObject = __webpack_require__(64),
	    isObject = __webpack_require__(65);

	function set(target, propertyKey, V /*, receiver*/) {
	  var receiver = arguments.length < 4 ? target : arguments[3],
	      ownDesc = gOPD.f(anObject(target), propertyKey),
	      existingDescriptor,
	      proto;
	  if (!ownDesc) {
	    if (isObject(proto = getPrototypeOf(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if (has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !isObject(receiver)) return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$export($export.S, 'Reflect', { set: set });

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export = __webpack_require__(60),
	    setProto = __webpack_require__(125);

	if (setProto) $export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes

	var $export = __webpack_require__(60),
	    $includes = __webpack_require__(88)(true);

	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	__webpack_require__(238)('includes');

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at

	var $export = __webpack_require__(60),
	    $at = __webpack_require__(179)(true);

	$export($export.P, 'String', {
	  at: function at(pos) {
	    return $at(this, pos);
	  }
	});

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end

	var $export = __webpack_require__(60),
	    $pad = __webpack_require__(302);

	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(89),
	    repeat = __webpack_require__(143),
	    defined = __webpack_require__(87);

	module.exports = function (that, maxLength, fillString, left) {
	  var S = String(defined(that)),
	      stringLength = S.length,
	      fillStr = fillString === undefined ? ' ' : String(fillString),
	      intMaxLength = toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength,
	      stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end

	var $export = __webpack_require__(60),
	    $pad = __webpack_require__(302);

	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim

	__webpack_require__(135)('trimLeft', function ($trim) {
	  return function trimLeft() {
	    return $trim(this, 1);
	  };
	}, 'trimStart');

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim

	__webpack_require__(135)('trimRight', function ($trim) {
	  return function trimRight() {
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://tc39.github.io/String.prototype.matchAll/

	var $export = __webpack_require__(60),
	    defined = __webpack_require__(87),
	    toLength = __webpack_require__(89),
	    isRegExp = __webpack_require__(186),
	    getFlags = __webpack_require__(248),
	    RegExpProto = RegExp.prototype;

	var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
	  this._r = regexp;
	  this._s = string;
	};

	__webpack_require__(182)($RegExpStringIterator, 'RegExp String', function next() {
	  var match = this._r.exec(this._s);
	  return { value: match, done: match === null };
	});

	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp) {
	    defined(this);
	    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
	    var S = String(this),
	        flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp),
	        rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(79)('asyncIterator');

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(79)('observable');

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export = __webpack_require__(60),
	    ownKeys = __webpack_require__(295),
	    toIObject = __webpack_require__(84),
	    gOPD = __webpack_require__(103),
	    createProperty = __webpack_require__(215);

	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIObject(object),
	        getDesc = gOPD.f,
	        keys = ownKeys(O),
	        result = {},
	        i = 0,
	        key;
	    while (keys.length > i) {
	      createProperty(result, key = keys[i++], getDesc(O, key));
	    }return result;
	  }
	});

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(60),
	    $values = __webpack_require__(311)(false);

	$export($export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getKeys = __webpack_require__(82),
	    toIObject = __webpack_require__(84),
	    isEnum = __webpack_require__(96).f;
	module.exports = function (isEntries) {
	  return function (it) {
	    var O = toIObject(it),
	        keys = getKeys(O),
	        length = keys.length,
	        i = 0,
	        result = [],
	        key;
	    while (length > i) {
	      if (isEnum.call(O, key = keys[i++])) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      }
	    }return result;
	  };
	};

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(60),
	    $entries = __webpack_require__(311)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    toObject = __webpack_require__(110),
	    aFunction = __webpack_require__(73),
	    $defineProperty = __webpack_require__(63);

	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(58) && $export($export.P + __webpack_require__(314), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter) {
	    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
	  }
	});

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(80) || !__webpack_require__(59)(function () {
	  var K = Math.random();
	  // In FF throws only define methods
	  __defineSetter__.call(null, K, function () {/* empty */});
	  delete __webpack_require__(56)[K];
	});

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    toObject = __webpack_require__(110),
	    aFunction = __webpack_require__(73),
	    $defineProperty = __webpack_require__(63);

	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(58) && $export($export.P + __webpack_require__(314), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter) {
	    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
	  }
	});

/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    toObject = __webpack_require__(110),
	    toPrimitive = __webpack_require__(68),
	    getPrototypeOf = __webpack_require__(111),
	    getOwnPropertyDescriptor = __webpack_require__(103).f;

	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(58) && $export($export.P + __webpack_require__(314), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P) {
	    var O = toObject(this),
	        K = toPrimitive(P, true),
	        D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
	    } while (O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    toObject = __webpack_require__(110),
	    toPrimitive = __webpack_require__(68),
	    getPrototypeOf = __webpack_require__(111),
	    getOwnPropertyDescriptor = __webpack_require__(103).f;

	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(58) && $export($export.P + __webpack_require__(314), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P) {
	    var O = toObject(this),
	        K = toPrimitive(P, true),
	        D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
	    } while (O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(60);

	$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(319)('Map') });

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(127),
	    from = __webpack_require__(320);
	module.exports = function (NAME) {
	  return function toJSON() {
	    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var forOf = __webpack_require__(258);

	module.exports = function (iter, ITERATOR) {
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(60);

	$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(319)('Set') });

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/ljharb/proposal-global
	var $export = __webpack_require__(60);

	$export($export.S, 'System', { global: __webpack_require__(56) });

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(60),
	    cof = __webpack_require__(86);

	$export($export.S, 'Error', {
	  isError: function isError(it) {
	    return cof(it) === 'Error';
	  }
	});

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(60);

	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0,
	        $x1 = x1 >>> 0,
	        $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(60);

	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0,
	        $x1 = x1 >>> 0,
	        $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(60);

	$export($export.S, 'Math', {
	  imulh: function imulh(u, v) {
	    var UINT16 = 0xffff,
	        $u = +u,
	        $v = +v,
	        u0 = $u & UINT16,
	        v0 = $v & UINT16,
	        u1 = $u >> 16,
	        v1 = $v >> 16,
	        t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(60);

	$export($export.S, 'Math', {
	  umulh: function umulh(u, v) {
	    var UINT16 = 0xffff,
	        $u = +u,
	        $v = +v,
	        u0 = $u & UINT16,
	        v0 = $v & UINT16,
	        u1 = $u >>> 16,
	        v1 = $v >>> 16,
	        t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(329),
	    anObject = __webpack_require__(64),
	    toMetaKey = metadata.key,
	    ordinaryDefineOwnMetadata = metadata.set;

	metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	  } });

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var Map = __webpack_require__(263),
	    $export = __webpack_require__(60),
	    shared = __webpack_require__(75)('metadata'),
	    store = shared.store || (shared.store = new (__webpack_require__(267))());

	var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
	  var targetMetadata = store.get(target);
	  if (!targetMetadata) {
	    if (!create) return undefined;
	    store.set(target, targetMetadata = new Map());
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if (!keyMetadata) {
	    if (!create) return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map());
	  }return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false),
	      keys = [];
	  if (metadataMap) metadataMap.forEach(function (_, key) {
	    keys.push(key);
	  });
	  return keys;
	};
	var toMetaKey = function toMetaKey(it) {
	  return it === undefined || (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : String(it);
	};
	var exp = function exp(O) {
	  $export($export.S, 'Reflect', O);
	};

	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(329),
	    anObject = __webpack_require__(64),
	    toMetaKey = metadata.key,
	    getOrCreateMetadataMap = metadata.map,
	    store = metadata.store;

	metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */) {
	    var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]),
	        metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
	    if (metadataMap.size) return true;
	    var targetMetadata = store.get(target);
	    targetMetadata['delete'](targetKey);
	    return !!targetMetadata.size || store['delete'](target);
	  } });

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(329),
	    anObject = __webpack_require__(64),
	    getPrototypeOf = __webpack_require__(111),
	    ordinaryHasOwnMetadata = metadata.has,
	    ordinaryGetOwnMetadata = metadata.get,
	    toMetaKey = metadata.key;

	var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};

	metadata.exp({ getMetadata: function getMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Set = __webpack_require__(266),
	    from = __webpack_require__(320),
	    metadata = __webpack_require__(329),
	    anObject = __webpack_require__(64),
	    getPrototypeOf = __webpack_require__(111),
	    ordinaryOwnMetadataKeys = metadata.keys,
	    toMetaKey = metadata.key;

	var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
	  var oKeys = ordinaryOwnMetadataKeys(O, P),
	      parent = getPrototypeOf(O);
	  if (parent === null) return oKeys;
	  var pKeys = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};

	metadata.exp({ getMetadataKeys: function getMetadataKeys(target /*, targetKey */) {
	    return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	  } });

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(329),
	    anObject = __webpack_require__(64),
	    ordinaryGetOwnMetadata = metadata.get,
	    toMetaKey = metadata.key;

	metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(329),
	    anObject = __webpack_require__(64),
	    ordinaryOwnMetadataKeys = metadata.keys,
	    toMetaKey = metadata.key;

	metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */) {
	    return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	  } });

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(329),
	    anObject = __webpack_require__(64),
	    getPrototypeOf = __webpack_require__(111),
	    ordinaryHasOwnMetadata = metadata.has,
	    toMetaKey = metadata.key;

	var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if (hasOwn) return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};

	metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(329),
	    anObject = __webpack_require__(64),
	    ordinaryHasOwnMetadata = metadata.has,
	    toMetaKey = metadata.key;

	metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(329),
	    anObject = __webpack_require__(64),
	    aFunction = __webpack_require__(73),
	    toMetaKey = metadata.key,
	    ordinaryDefineOwnMetadata = metadata.set;

	metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
	    return function decorator(target, targetKey) {
	      ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
	    };
	  } });

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export = __webpack_require__(60),
	    microtask = __webpack_require__(261)(),
	    process = __webpack_require__(56).process,
	    isNode = __webpack_require__(86)(process) == 'process';

	$export($export.G, {
	  asap: function asap(fn) {
	    var domain = isNode && process.domain;
	    microtask(domain ? domain.bind(fn) : fn);
	  }
	});

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/zenparsing/es-observable

	var $export = __webpack_require__(60),
	    global = __webpack_require__(56),
	    core = __webpack_require__(61),
	    microtask = __webpack_require__(261)(),
	    OBSERVABLE = __webpack_require__(77)('observable'),
	    aFunction = __webpack_require__(73),
	    anObject = __webpack_require__(64),
	    anInstance = __webpack_require__(257),
	    redefineAll = __webpack_require__(262),
	    hide = __webpack_require__(62),
	    forOf = __webpack_require__(258),
	    RETURN = forOf.RETURN;

	var getMethod = function getMethod(fn) {
	  return fn == null ? undefined : aFunction(fn);
	};

	var cleanupSubscription = function cleanupSubscription(subscription) {
	  var cleanup = subscription._c;
	  if (cleanup) {
	    subscription._c = undefined;
	    cleanup();
	  }
	};

	var subscriptionClosed = function subscriptionClosed(subscription) {
	  return subscription._o === undefined;
	};

	var closeSubscription = function closeSubscription(subscription) {
	  if (!subscriptionClosed(subscription)) {
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};

	var Subscription = function Subscription(observer, subscriber) {
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup = subscriber(observer),
	        subscription = cleanup;
	    if (cleanup != null) {
	      if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
	        subscription.unsubscribe();
	      };else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch (e) {
	    observer.error(e);
	    return;
	  }if (subscriptionClosed(this)) cleanupSubscription(this);
	};

	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe() {
	    closeSubscription(this);
	  }
	});

	var SubscriptionObserver = function SubscriptionObserver(subscription) {
	  this._s = subscription;
	};

	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if (m) return m.call(observer, value);
	      } catch (e) {
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value) {
	    var subscription = this._s;
	    if (subscriptionClosed(subscription)) throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if (!m) throw value;
	      value = m.call(observer, value);
	    } catch (e) {
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    }cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch (e) {
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});

	var $Observable = function Observable(subscriber) {
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};

	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer) {
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn) {
	    var that = this;
	    return new (core.Promise || global.Promise)(function (resolve, reject) {
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next: function next(value) {
	          try {
	            return fn(value);
	          } catch (e) {
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});

	redefineAll($Observable, {
	  from: function from(x) {
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if (method) {
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function (observer) {
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          try {
	            if (forOf(x, false, function (it) {
	              observer.next(it);
	              if (done) return RETURN;
	            }) === RETURN) return;
	          } catch (e) {
	            if (done) throw e;
	            observer.error(e);
	            return;
	          }observer.complete();
	        }
	      });
	      return function () {
	        done = true;
	      };
	    });
	  },
	  of: function of() {
	    for (var i = 0, l = arguments.length, items = Array(l); i < l;) {
	      items[i] = arguments[i++];
	    }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          for (var i = 0; i < items.length; ++i) {
	            observer.next(items[i]);
	            if (done) return;
	          }observer.complete();
	        }
	      });
	      return function () {
	        done = true;
	      };
	    });
	  }
	});

	hide($Observable.prototype, OBSERVABLE, function () {
	  return this;
	});

	$export($export.G, { Observable: $Observable });

	__webpack_require__(244)('Observable');

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// ie9- setTimeout & setInterval additional parameters fix
	var global = __webpack_require__(56),
	    $export = __webpack_require__(60),
	    invoke = __webpack_require__(130),
	    partial = __webpack_require__(341),
	    navigator = global.navigator,
	    MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function wrap(set) {
	  return MSIE ? function (fn, time /*, ...args */) {
	    return set(invoke(partial, [].slice.call(arguments, 2), typeof fn == 'function' ? fn : Function(fn)), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout: wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var path = __webpack_require__(342),
	    invoke = __webpack_require__(130),
	    aFunction = __webpack_require__(73);
	module.exports = function () /* ...pargs */{
	  var fn = aFunction(this),
	      length = arguments.length,
	      pargs = Array(length),
	      i = 0,
	      _ = path._,
	      holder = false;
	  while (length > i) {
	    if ((pargs[i] = arguments[i++]) === _) holder = true;
	  }return function () /* ...args */{
	    var that = this,
	        aLen = arguments.length,
	        j = 0,
	        k = 0,
	        args;
	    if (!holder && !aLen) return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if (holder) for (; length > j; j++) {
	      if (args[j] === _) args[j] = arguments[k++];
	    }while (aLen > k) {
	      args.push(arguments[k++]);
	    }return invoke(fn, args, that);
	  };
	};

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(56);

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(60),
	    $task = __webpack_require__(260);
	$export($export.G + $export.B, {
	  setImmediate: $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $iterators = __webpack_require__(245),
	    redefine = __webpack_require__(70),
	    global = __webpack_require__(56),
	    hide = __webpack_require__(62),
	    Iterators = __webpack_require__(181),
	    wks = __webpack_require__(77),
	    ITERATOR = wks('iterator'),
	    TO_STRING_TAG = wks('toStringTag'),
	    ArrayValues = Iterators.Array;

	for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
	  var NAME = collections[i],
	      Collection = global[NAME],
	      proto = Collection && Collection.prototype,
	      key;
	  if (proto) {
	    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
	    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for (key in $iterators) {
	      if (!proto[key]) redefine(proto, key, $iterators[key], true);
	    }
	  }
	}

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module, process) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!function (global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = ( false ? "undefined" : _typeof(module)) === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      prototype[method] = function (arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction ||
	    // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };

	  runtime.mark = function (genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function (arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function (value) {
	            invoke("next", value, resolve, reject);
	          }, function (err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function (unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function (resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	      // If enqueue has been called before, then we want to wait until
	      // all previous Promises have been resolved before calling invoke,
	      // so that results are always delivered in the correct order. If
	      // enqueue has not been called before, then it is important to
	      // call invoke immediately, without waiting on a callback to fire,
	      // so that the async generator function has the opportunity to do
	      // any necessary setup in a predictable way. This predictability
	      // is why the Promise constructor synchronously invokes its
	      // executor callback, and why async functions synchronously
	      // execute code before the first await. Since we implement simple
	      // async functions in terms of async generators, it is especially
	      // important to get this right, even though it requires care.
	      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
	      // Avoid propagating failures to Promises returned by later
	      // invocations of the iterator.
	      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

	    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	    : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function () {
	    return this;
	  };

	  Gp[toStringTagSymbol] = "Generator";

	  Gp.toString = function () {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function (object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function reset(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function stop() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	}(
	// Among the various tricks for obtaining a reference to the global
	// object, this seems to be the most reliable technique that does not
	// use indirect eval (which violates Content Security Policy).
	(typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(346)(module), __webpack_require__(13)))

/***/ },
/* 346 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(348);
	module.exports = __webpack_require__(61).RegExp.escape;

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(60),
	    $re = __webpack_require__(349)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	$export($export.S, 'RegExp', { escape: function escape(it) {
	    return $re(it);
	  } });

/***/ },
/* 349 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (regExp, replace) {
	  var replacer = replace === Object(replace) ? function (part) {
	    return replace[part];
	  } : replace;
	  return function (it) {
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ }
/******/ ]);