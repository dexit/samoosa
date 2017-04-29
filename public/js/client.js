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

	// Constants

	window.ISSUE_ESTIMATES = {
	    '15m': 0,
	    '30m': 1,
	    '1h': 2,
	    '2h': 3,
	    '3h': 4,
	    '4h': 5,
	    '5h': 6,
	    '6h': 7,
	    '7h': 8,
	    '8h': 9
	};

	window.ISSUE_TYPES = {
	    'task': 0,
	    'improvement': 1,
	    'new feature': 2,
	    'bug': 3
	};

	window.ISSUE_PRIORITIES = {
	    'low': 0,
	    'medium': 1,
	    'high': 2,
	    'blocker': 3
	};

	// Style
	__webpack_require__(1);

	// Package
	window.app = __webpack_require__(2);

	// Libs
	__webpack_require__(3);
	window.Promise = __webpack_require__(12);
	window.marked = __webpack_require__(51);

	Promise.onPossiblyUnhandledRejection(function (error, promise) {
	    throw error;
	});

	// Globals
	__webpack_require__(52);

	// Helpers
	window.ResourceHelper = __webpack_require__(53);
	window.SettingsHelper = __webpack_require__(54);
	window.InputHelper = __webpack_require__(55);
	window.IssueHelper = __webpack_require__(56);
	window.DebugHelper = __webpack_require__(57);
	window.GraphHelper = __webpack_require__(58);
	window.debug = window.DebugHelper;
	window.debug.verbosity = 1;

	var GitHubApi = __webpack_require__(59);
	var BitBucketApi = __webpack_require__(61);

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
	window.Issue = __webpack_require__(62);
	window.Milestone = __webpack_require__(63);
	window.User = __webpack_require__(64);
	window.Repository = __webpack_require__(65);
	window.Attachment = __webpack_require__(66);

	// Views
	window.Navbar = __webpack_require__(67);
	window.RepositoryBar = __webpack_require__(69);
	window.TagBar = __webpack_require__(71);
	window.IssueEditor = __webpack_require__(73);
	window.MilestoneEditor = __webpack_require__(75);
	window.MilestoneViewer = __webpack_require__(77);
	window.ResourceEditor = __webpack_require__(79);
	window.MilestonesEditor = __webpack_require__(81);
	window.RepositoryEditor = __webpack_require__(83);
	window.FilterEditor = __webpack_require__(85);
	window.BurnDownChart = __webpack_require__(87);

	// Routes
	__webpack_require__(89);

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
		"version": "0.5.0",
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
		"dependencies": {}
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

	        /**
	         * Creates a new route
	         *
	         * @param {String} path
	         * @param {Function} controller
	         */
	        value: function route(path, controller) {
	            routes[path] = {
	                controller: controller
	            };
	        }

	        /**
	         * Goes to the route
	         *
	         * @param {String} url
	         * @param {Boolean} quiet
	         */

	    }, {
	        key: 'go',
	        value: function go(url, quiet) {
	            if (quiet) {
	                window.history.pushState(url, url, '#' + url);
	                this.directToRoute(url, true);
	            } else {
	                location.hash = url;
	            }
	        }

	        /**
	         * Goes to the base directory
	         */

	    }, {
	        key: 'goToBaseDir',
	        value: function goToBaseDir() {
	            var url = this.url || '/';
	            var base = new String(url).substring(0, url.lastIndexOf('/'));

	            this.go(base);
	        }

	        /**
	         * Gets a query string parameter
	         *
	         * @param {String} name
	         *
	         * @returns {String} Value
	         */

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

	        /**
	         * Directs to the route
	         *
	         * @param {String} url
	         * @param {Boolean} quiet
	         */

	    }, {
	        key: 'directToRoute',
	        value: function directToRoute(url, quiet) {
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

	            Router.url = url;

	            if (route && !quiet) {
	                route.controller();
	            }
	        }

	        /**
	         * Initialise
	         */

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

	            // If a check is implemented, execute it
	            if (typeof Router.check === 'function') {
	                Router.check(
	                // Pass the proposed route
	                url,

	                // Cancel method
	                function () {
	                    location.hash = Router.url;
	                },

	                // Proceed method
	                function () {
	                    Router.directToRoute(url);
	                });

	                // If not, proceed as normal
	            } else {
	                Router.directToRoute(url);
	            }
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

	  var delimiter = escapeString(options.delimiter || '/');
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
	  }

	  if (end) {
	    route += '$';
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
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
	        if (typeof jQuery !== 'undefined') {
	            if (element instanceof jQuery == false) {
	                element = $(element);
	            }

	            element.append(content);

	            // Native JavaScript logic
	        } else {
	            if (typeof content === 'number' || typeof content === 'string') {
	                element.innerHTML += content.toString();
	            } else {
	                element.appendChild(content);
	            }
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

	            element[shorthand] = function (callback) {
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

	    var isContents = function isContents(obj) {
	        if (!obj) {
	            return false;
	        }

	        return obj instanceof Array || obj instanceof HTMLElement || typeof jQuery !== 'undefined' && obj instanceof jQuery || typeof obj === 'string' || typeof obj === 'number';
	    };

	    // The attribute parameter is the content
	    if (isContents(attr)) {
	        contents = [attr, contents];

	        // The attribute parameter was defined as an object
	    } else if (typeof attr !== 'undefined' && attr instanceof Object && attr instanceof Array == false) {
	        try {
	            for (var k in attr) {
	                // Null, undefined or false values should not be included
	                if (!attr[k] && attr[k] !== 0) {
	                    continue;
	                }

	                element.setAttribute(k, attr[k]);
	            }
	        } catch (e) {
	            console.log(e);

	            console.log(attr, isContents(attr));
	        }
	    }

	    append(element, contents);

	    // jQuery logic
	    if (typeof jQuery !== 'undefined') {
	        return $(element);

	        // Native JavaScript logic
	    } else {
	        // Assign custom event functions to element instead of extending the prototype
	        assignEvents(element);

	        return element;
	    }
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

	    if (!element) {
	        return null;
	    }

	    if (typeof jQuery !== 'undefined') {
	        return $(element);
	    } else {
	        assignEvents(element);

	        return element;
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

	    if (!elements) {
	        return [];
	    }

	    if (typeof jQuery !== 'undefined') {
	        return $(elements);
	    } else {
	        var array = [];

	        for (var _i2 = 0; _i2 < elements.length; _i2++) {
	            array[_i2] = elements[_i2];
	            assignEvents(array[_i2]);
	        }

	        return array;
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

	            var element = this.element;

	            if (!element && this.$element && this.$element.length > 0) {
	                element = this.$element[0];
	            }

	            if (!element) {
	                return;
	            }

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
	                    } else if (_this2.element && _this2.element.parentElement) {
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
	            this.$element.html(_.each(this.model, function (label, func) {
	                if (func == '---') {
	                    return _.li({ class: 'dropdown-header' }, label);
	                } else {
	                    return _.li({ class: typeof func === 'function' ? '' : 'disabled' }, _.a({ tabindex: '-1', href: '#' }, label).click(function (e) {
	                        e.preventDefault();
	                        e.stopPropagation();

	                        if (func) {
	                            func(e);

	                            this.remove();
	                        }
	                    }));
	                }
	            }));

	            $('body').append(this.$element);

	            var rect = this.$element[0].getBoundingClientRect();

	            if (rect.left + rect.width > window.innerWidth) {
	                this.$element.css('left', rect.left - rect.width + 'px');
	            } else if (rect.bottom > window.innerHeight) {
	                this.$element.css('top', rect.top - rect.height + 'px');
	            }
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
	         * Gets the hovered drop container
	         *
	         * @param {Number} x
	         * @paraa {Number} y
	         *
	         * @return {HTMLElement} Hovered drop container
	         */

	    }, {
	        key: 'getHoveredDropContainer',
	        value: function getHoveredDropContainer(x, y) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (DragDrop.currentDropContainers || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var container = _step.value;

	                    var rect = container.getBoundingClientRect();

	                    if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
	                        return container;
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
	            scrollContainer: document.body,
	            dragThreshold: 2,
	            dragScrollSpeed: 2,
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

	                // Detect initial move
	                var _moveHandler = function _moveHandler(mousemoveEvent) {
	                    dragFrames++;

	                    if (dragFrames >= instance.config.dragThreshold) {
	                        instance.onMoveDragHandle(mousemoveEvent);

	                        instance.off(instance.element, 'mousemove', _moveHandler);
	                        instance.off(document, 'mouseup', _upHandler);
	                    }
	                };

	                // Detect immediate pointer release


	                var _upHandler = function _upHandler(upEvent) {
	                    instance.off(instance.element, 'mousemove', _moveHandler);
	                    instance.off(document, 'mouseup', _upHandler);
	                };

	                mousedownEvent.preventDefault();

	                var dragFrames = 0;

	                instance.on(instance.element, 'mousemove', _moveHandler);
	                instance.on(document, 'mouseup', _upHandler);
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

	            // Cache scroll container position for later restoration
	            var lastScrollPos = {
	                top: this.config.scrollContainer.scrollTop,
	                left: this.config.scrollContainer.scrollLeft
	            };

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

	            // Restore last scroll container scroll position
	            this.config.scrollContainer.scrollTop = lastScrollPos.top;
	            this.config.scrollContainer.scrollLeft = lastScrollPos.left;
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
	                this.element.style.top = e.pageY + this.config.scrollContainer.scrollTop + this.pointerOffset.top;
	            }

	            if (!this.config.lockX) {
	                this.element.style.left = e.pageX + this.config.scrollContainer.scrollLeft + this.pointerOffset.left;
	            }

	            // Scroll page if dragging near the top or bottom
	            var bounds = this.config.scrollContainer.getBoundingClientRect();

	            // TODO: Figure out why this keeps resetting to 0 every frame
	            if (e.pageY > bounds.bottom - 50) {
	                this.config.scrollContainer.scrollTop += this.config.dragScrollSpeed;
	            } else if (e.pageY < bounds.top + 50) {
	                this.config.scrollContainer.scrollTop -= this.config.dragScrollSpeed;
	            } else if (e.pageX > bounds.right - 50) {
	                this.config.scrollContainer.scrollLeft += this.config.dragScrollSpeed;
	            } else if (e.pageX < bounds.left + 50) {
	                this.config.scrollContainer.scrollLeft -= this.config.dragScrollSpeed;
	            }

	            // Fire drag event
	            if (typeof this.config.onDrag === 'function') {
	                this.config.onDrag(this);
	            }

	            // Scan for drop containers
	            var elementRect = this.element.getBoundingClientRect();

	            elementRect.center = elementRect.left + elementRect.width / 2;
	            elementRect.middle = elementRect.top + elementRect.height / 2;

	            // Use array of drop containers sorted by their "proximity" to the pointer on the Z axis
	            var hoveredDropContainer = DragDrop.getHoveredDropContainer(e.pageX, e.pageY);

	            // We only need the first index, as that is the closest to the cursor
	            if (hoveredDropContainer) {
	                this.onHoverDropContainer(hoveredDropContainer);
	            }

	            // Make sure to trigger the leave event on any other drop containers, if they were previously hovered
	            for (var i = 0; i < DragDrop.currentDropContainers.length; i++) {
	                var dropContainer = DragDrop.currentDropContainers[i];

	                if (dropContainer != hoveredDropContainer && dropContainer.dataset.dragdropHovering) {
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

	"use strict";

	var old;
	if (typeof Promise !== "undefined") old = Promise;
	function noConflict() {
	    try {
	        if (Promise === bluebird) Promise = old;
	    } catch (e) {}
	    return bluebird;
	}
	var bluebird = __webpack_require__(13)();
	bluebird.noConflict = noConflict;
	module.exports = bluebird;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	module.exports = function () {
	    var makeSelfResolutionError = function makeSelfResolutionError() {
	        return new TypeError("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
	    };
	    var reflectHandler = function reflectHandler() {
	        return new Promise.PromiseInspection(this._target());
	    };
	    var apiRejection = function apiRejection(msg) {
	        return Promise.reject(new TypeError(msg));
	    };
	    function Proxyable() {}
	    var UNDEFINED_BINDING = {};
	    var util = __webpack_require__(15);

	    var getDomain;
	    if (util.isNode) {
	        getDomain = function getDomain() {
	            var ret = process.domain;
	            if (ret === undefined) ret = null;
	            return ret;
	        };
	    } else {
	        getDomain = function getDomain() {
	            return null;
	        };
	    }
	    util.notEnumerableProp(Promise, "_getDomain", getDomain);

	    var es5 = __webpack_require__(16);
	    var Async = __webpack_require__(17);
	    var async = new Async();
	    es5.defineProperty(Promise, "_async", { value: async });
	    var errors = __webpack_require__(22);
	    var TypeError = Promise.TypeError = errors.TypeError;
	    Promise.RangeError = errors.RangeError;
	    var CancellationError = Promise.CancellationError = errors.CancellationError;
	    Promise.TimeoutError = errors.TimeoutError;
	    Promise.OperationalError = errors.OperationalError;
	    Promise.RejectionError = errors.OperationalError;
	    Promise.AggregateError = errors.AggregateError;
	    var INTERNAL = function INTERNAL() {};
	    var APPLY = {};
	    var NEXT_FILTER = {};
	    var tryConvertToPromise = __webpack_require__(23)(Promise, INTERNAL);
	    var PromiseArray = __webpack_require__(24)(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable);
	    var Context = __webpack_require__(25)(Promise);
	    /*jshint unused:false*/
	    var createContext = Context.create;
	    var debug = __webpack_require__(26)(Promise, Context);
	    var CapturedTrace = debug.CapturedTrace;
	    var PassThroughHandlerContext = __webpack_require__(27)(Promise, tryConvertToPromise, NEXT_FILTER);
	    var catchFilter = __webpack_require__(28)(NEXT_FILTER);
	    var nodebackForPromise = __webpack_require__(29);
	    var errorObj = util.errorObj;
	    var tryCatch = util.tryCatch;
	    function check(self, executor) {
	        if (self == null || self.constructor !== Promise) {
	            throw new TypeError("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
	        }
	        if (typeof executor !== "function") {
	            throw new TypeError("expecting a function but got " + util.classString(executor));
	        }
	    }

	    function Promise(executor) {
	        if (executor !== INTERNAL) {
	            check(this, executor);
	        }
	        this._bitField = 0;
	        this._fulfillmentHandler0 = undefined;
	        this._rejectionHandler0 = undefined;
	        this._promise0 = undefined;
	        this._receiver0 = undefined;
	        this._resolveFromExecutor(executor);
	        this._promiseCreated();
	        this._fireEvent("promiseCreated", this);
	    }

	    Promise.prototype.toString = function () {
	        return "[object Promise]";
	    };

	    Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
	        var len = arguments.length;
	        if (len > 1) {
	            var catchInstances = new Array(len - 1),
	                j = 0,
	                i;
	            for (i = 0; i < len - 1; ++i) {
	                var item = arguments[i];
	                if (util.isObject(item)) {
	                    catchInstances[j++] = item;
	                } else {
	                    return apiRejection("Catch statement predicate: " + "expecting an object but got " + util.classString(item));
	                }
	            }
	            catchInstances.length = j;
	            fn = arguments[i];
	            return this.then(undefined, catchFilter(catchInstances, fn, this));
	        }
	        return this.then(undefined, fn);
	    };

	    Promise.prototype.reflect = function () {
	        return this._then(reflectHandler, reflectHandler, undefined, this, undefined);
	    };

	    Promise.prototype.then = function (didFulfill, didReject) {
	        if (debug.warnings() && arguments.length > 0 && typeof didFulfill !== "function" && typeof didReject !== "function") {
	            var msg = ".then() only accepts functions but was passed: " + util.classString(didFulfill);
	            if (arguments.length > 1) {
	                msg += ", " + util.classString(didReject);
	            }
	            this._warn(msg);
	        }
	        return this._then(didFulfill, didReject, undefined, undefined, undefined);
	    };

	    Promise.prototype.done = function (didFulfill, didReject) {
	        var promise = this._then(didFulfill, didReject, undefined, undefined, undefined);
	        promise._setIsFinal();
	    };

	    Promise.prototype.spread = function (fn) {
	        if (typeof fn !== "function") {
	            return apiRejection("expecting a function but got " + util.classString(fn));
	        }
	        return this.all()._then(fn, undefined, undefined, APPLY, undefined);
	    };

	    Promise.prototype.toJSON = function () {
	        var ret = {
	            isFulfilled: false,
	            isRejected: false,
	            fulfillmentValue: undefined,
	            rejectionReason: undefined
	        };
	        if (this.isFulfilled()) {
	            ret.fulfillmentValue = this.value();
	            ret.isFulfilled = true;
	        } else if (this.isRejected()) {
	            ret.rejectionReason = this.reason();
	            ret.isRejected = true;
	        }
	        return ret;
	    };

	    Promise.prototype.all = function () {
	        if (arguments.length > 0) {
	            this._warn(".all() was passed arguments but it does not take any");
	        }
	        return new PromiseArray(this).promise();
	    };

	    Promise.prototype.error = function (fn) {
	        return this.caught(util.originatesFromRejection, fn);
	    };

	    Promise.getNewLibraryCopy = module.exports;

	    Promise.is = function (val) {
	        return val instanceof Promise;
	    };

	    Promise.fromNode = Promise.fromCallback = function (fn) {
	        var ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false;
	        var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
	        if (result === errorObj) {
	            ret._rejectCallback(result.e, true);
	        }
	        if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
	        return ret;
	    };

	    Promise.all = function (promises) {
	        return new PromiseArray(promises).promise();
	    };

	    Promise.cast = function (obj) {
	        var ret = tryConvertToPromise(obj);
	        if (!(ret instanceof Promise)) {
	            ret = new Promise(INTERNAL);
	            ret._captureStackTrace();
	            ret._setFulfilled();
	            ret._rejectionHandler0 = obj;
	        }
	        return ret;
	    };

	    Promise.resolve = Promise.fulfilled = Promise.cast;

	    Promise.reject = Promise.rejected = function (reason) {
	        var ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._rejectCallback(reason, true);
	        return ret;
	    };

	    Promise.setScheduler = function (fn) {
	        if (typeof fn !== "function") {
	            throw new TypeError("expecting a function but got " + util.classString(fn));
	        }
	        return async.setScheduler(fn);
	    };

	    Promise.prototype._then = function (didFulfill, didReject, _, receiver, internalData) {
	        var haveInternalData = internalData !== undefined;
	        var promise = haveInternalData ? internalData : new Promise(INTERNAL);
	        var target = this._target();
	        var bitField = target._bitField;

	        if (!haveInternalData) {
	            promise._propagateFrom(this, 3);
	            promise._captureStackTrace();
	            if (receiver === undefined && (this._bitField & 2097152) !== 0) {
	                if (!((bitField & 50397184) === 0)) {
	                    receiver = this._boundValue();
	                } else {
	                    receiver = target === this ? undefined : this._boundTo;
	                }
	            }
	            this._fireEvent("promiseChained", this, promise);
	        }

	        var domain = getDomain();
	        if (!((bitField & 50397184) === 0)) {
	            var handler,
	                value,
	                settler = target._settlePromiseCtx;
	            if ((bitField & 33554432) !== 0) {
	                value = target._rejectionHandler0;
	                handler = didFulfill;
	            } else if ((bitField & 16777216) !== 0) {
	                value = target._fulfillmentHandler0;
	                handler = didReject;
	                target._unsetRejectionIsUnhandled();
	            } else {
	                settler = target._settlePromiseLateCancellationObserver;
	                value = new CancellationError("late cancellation observer");
	                target._attachExtraTrace(value);
	                handler = didReject;
	            }

	            async.invoke(settler, target, {
	                handler: domain === null ? handler : typeof handler === "function" && util.domainBind(domain, handler),
	                promise: promise,
	                receiver: receiver,
	                value: value
	            });
	        } else {
	            target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
	        }

	        return promise;
	    };

	    Promise.prototype._length = function () {
	        return this._bitField & 65535;
	    };

	    Promise.prototype._isFateSealed = function () {
	        return (this._bitField & 117506048) !== 0;
	    };

	    Promise.prototype._isFollowing = function () {
	        return (this._bitField & 67108864) === 67108864;
	    };

	    Promise.prototype._setLength = function (len) {
	        this._bitField = this._bitField & -65536 | len & 65535;
	    };

	    Promise.prototype._setFulfilled = function () {
	        this._bitField = this._bitField | 33554432;
	        this._fireEvent("promiseFulfilled", this);
	    };

	    Promise.prototype._setRejected = function () {
	        this._bitField = this._bitField | 16777216;
	        this._fireEvent("promiseRejected", this);
	    };

	    Promise.prototype._setFollowing = function () {
	        this._bitField = this._bitField | 67108864;
	        this._fireEvent("promiseResolved", this);
	    };

	    Promise.prototype._setIsFinal = function () {
	        this._bitField = this._bitField | 4194304;
	    };

	    Promise.prototype._isFinal = function () {
	        return (this._bitField & 4194304) > 0;
	    };

	    Promise.prototype._unsetCancelled = function () {
	        this._bitField = this._bitField & ~65536;
	    };

	    Promise.prototype._setCancelled = function () {
	        this._bitField = this._bitField | 65536;
	        this._fireEvent("promiseCancelled", this);
	    };

	    Promise.prototype._setWillBeCancelled = function () {
	        this._bitField = this._bitField | 8388608;
	    };

	    Promise.prototype._setAsyncGuaranteed = function () {
	        if (async.hasCustomScheduler()) return;
	        this._bitField = this._bitField | 134217728;
	    };

	    Promise.prototype._receiverAt = function (index) {
	        var ret = index === 0 ? this._receiver0 : this[index * 4 - 4 + 3];
	        if (ret === UNDEFINED_BINDING) {
	            return undefined;
	        } else if (ret === undefined && this._isBound()) {
	            return this._boundValue();
	        }
	        return ret;
	    };

	    Promise.prototype._promiseAt = function (index) {
	        return this[index * 4 - 4 + 2];
	    };

	    Promise.prototype._fulfillmentHandlerAt = function (index) {
	        return this[index * 4 - 4 + 0];
	    };

	    Promise.prototype._rejectionHandlerAt = function (index) {
	        return this[index * 4 - 4 + 1];
	    };

	    Promise.prototype._boundValue = function () {};

	    Promise.prototype._migrateCallback0 = function (follower) {
	        var bitField = follower._bitField;
	        var fulfill = follower._fulfillmentHandler0;
	        var reject = follower._rejectionHandler0;
	        var promise = follower._promise0;
	        var receiver = follower._receiverAt(0);
	        if (receiver === undefined) receiver = UNDEFINED_BINDING;
	        this._addCallbacks(fulfill, reject, promise, receiver, null);
	    };

	    Promise.prototype._migrateCallbackAt = function (follower, index) {
	        var fulfill = follower._fulfillmentHandlerAt(index);
	        var reject = follower._rejectionHandlerAt(index);
	        var promise = follower._promiseAt(index);
	        var receiver = follower._receiverAt(index);
	        if (receiver === undefined) receiver = UNDEFINED_BINDING;
	        this._addCallbacks(fulfill, reject, promise, receiver, null);
	    };

	    Promise.prototype._addCallbacks = function (fulfill, reject, promise, receiver, domain) {
	        var index = this._length();

	        if (index >= 65535 - 4) {
	            index = 0;
	            this._setLength(0);
	        }

	        if (index === 0) {
	            this._promise0 = promise;
	            this._receiver0 = receiver;
	            if (typeof fulfill === "function") {
	                this._fulfillmentHandler0 = domain === null ? fulfill : util.domainBind(domain, fulfill);
	            }
	            if (typeof reject === "function") {
	                this._rejectionHandler0 = domain === null ? reject : util.domainBind(domain, reject);
	            }
	        } else {
	            var base = index * 4 - 4;
	            this[base + 2] = promise;
	            this[base + 3] = receiver;
	            if (typeof fulfill === "function") {
	                this[base + 0] = domain === null ? fulfill : util.domainBind(domain, fulfill);
	            }
	            if (typeof reject === "function") {
	                this[base + 1] = domain === null ? reject : util.domainBind(domain, reject);
	            }
	        }
	        this._setLength(index + 1);
	        return index;
	    };

	    Promise.prototype._proxy = function (proxyable, arg) {
	        this._addCallbacks(undefined, undefined, arg, proxyable, null);
	    };

	    Promise.prototype._resolveCallback = function (value, shouldBind) {
	        if ((this._bitField & 117506048) !== 0) return;
	        if (value === this) return this._rejectCallback(makeSelfResolutionError(), false);
	        var maybePromise = tryConvertToPromise(value, this);
	        if (!(maybePromise instanceof Promise)) return this._fulfill(value);

	        if (shouldBind) this._propagateFrom(maybePromise, 2);

	        var promise = maybePromise._target();

	        if (promise === this) {
	            this._reject(makeSelfResolutionError());
	            return;
	        }

	        var bitField = promise._bitField;
	        if ((bitField & 50397184) === 0) {
	            var len = this._length();
	            if (len > 0) promise._migrateCallback0(this);
	            for (var i = 1; i < len; ++i) {
	                promise._migrateCallbackAt(this, i);
	            }
	            this._setFollowing();
	            this._setLength(0);
	            this._setFollowee(promise);
	        } else if ((bitField & 33554432) !== 0) {
	            this._fulfill(promise._value());
	        } else if ((bitField & 16777216) !== 0) {
	            this._reject(promise._reason());
	        } else {
	            var reason = new CancellationError("late cancellation observer");
	            promise._attachExtraTrace(reason);
	            this._reject(reason);
	        }
	    };

	    Promise.prototype._rejectCallback = function (reason, synchronous, ignoreNonErrorWarnings) {
	        var trace = util.ensureErrorObject(reason);
	        var hasStack = trace === reason;
	        if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
	            var message = "a promise was rejected with a non-error: " + util.classString(reason);
	            this._warn(message, true);
	        }
	        this._attachExtraTrace(trace, synchronous ? hasStack : false);
	        this._reject(reason);
	    };

	    Promise.prototype._resolveFromExecutor = function (executor) {
	        if (executor === INTERNAL) return;
	        var promise = this;
	        this._captureStackTrace();
	        this._pushContext();
	        var synchronous = true;
	        var r = this._execute(executor, function (value) {
	            promise._resolveCallback(value);
	        }, function (reason) {
	            promise._rejectCallback(reason, synchronous);
	        });
	        synchronous = false;
	        this._popContext();

	        if (r !== undefined) {
	            promise._rejectCallback(r, true);
	        }
	    };

	    Promise.prototype._settlePromiseFromHandler = function (handler, receiver, value, promise) {
	        var bitField = promise._bitField;
	        if ((bitField & 65536) !== 0) return;
	        promise._pushContext();
	        var x;
	        if (receiver === APPLY) {
	            if (!value || typeof value.length !== "number") {
	                x = errorObj;
	                x.e = new TypeError("cannot .spread() a non-array: " + util.classString(value));
	            } else {
	                x = tryCatch(handler).apply(this._boundValue(), value);
	            }
	        } else {
	            x = tryCatch(handler).call(receiver, value);
	        }
	        var promiseCreated = promise._popContext();
	        bitField = promise._bitField;
	        if ((bitField & 65536) !== 0) return;

	        if (x === NEXT_FILTER) {
	            promise._reject(value);
	        } else if (x === errorObj) {
	            promise._rejectCallback(x.e, false);
	        } else {
	            debug.checkForgottenReturns(x, promiseCreated, "", promise, this);
	            promise._resolveCallback(x);
	        }
	    };

	    Promise.prototype._target = function () {
	        var ret = this;
	        while (ret._isFollowing()) {
	            ret = ret._followee();
	        }return ret;
	    };

	    Promise.prototype._followee = function () {
	        return this._rejectionHandler0;
	    };

	    Promise.prototype._setFollowee = function (promise) {
	        this._rejectionHandler0 = promise;
	    };

	    Promise.prototype._settlePromise = function (promise, handler, receiver, value) {
	        var isPromise = promise instanceof Promise;
	        var bitField = this._bitField;
	        var asyncGuaranteed = (bitField & 134217728) !== 0;
	        if ((bitField & 65536) !== 0) {
	            if (isPromise) promise._invokeInternalOnCancel();

	            if (receiver instanceof PassThroughHandlerContext && receiver.isFinallyHandler()) {
	                receiver.cancelPromise = promise;
	                if (tryCatch(handler).call(receiver, value) === errorObj) {
	                    promise._reject(errorObj.e);
	                }
	            } else if (handler === reflectHandler) {
	                promise._fulfill(reflectHandler.call(receiver));
	            } else if (receiver instanceof Proxyable) {
	                receiver._promiseCancelled(promise);
	            } else if (isPromise || promise instanceof PromiseArray) {
	                promise._cancel();
	            } else {
	                receiver.cancel();
	            }
	        } else if (typeof handler === "function") {
	            if (!isPromise) {
	                handler.call(receiver, value, promise);
	            } else {
	                if (asyncGuaranteed) promise._setAsyncGuaranteed();
	                this._settlePromiseFromHandler(handler, receiver, value, promise);
	            }
	        } else if (receiver instanceof Proxyable) {
	            if (!receiver._isResolved()) {
	                if ((bitField & 33554432) !== 0) {
	                    receiver._promiseFulfilled(value, promise);
	                } else {
	                    receiver._promiseRejected(value, promise);
	                }
	            }
	        } else if (isPromise) {
	            if (asyncGuaranteed) promise._setAsyncGuaranteed();
	            if ((bitField & 33554432) !== 0) {
	                promise._fulfill(value);
	            } else {
	                promise._reject(value);
	            }
	        }
	    };

	    Promise.prototype._settlePromiseLateCancellationObserver = function (ctx) {
	        var handler = ctx.handler;
	        var promise = ctx.promise;
	        var receiver = ctx.receiver;
	        var value = ctx.value;
	        if (typeof handler === "function") {
	            if (!(promise instanceof Promise)) {
	                handler.call(receiver, value, promise);
	            } else {
	                this._settlePromiseFromHandler(handler, receiver, value, promise);
	            }
	        } else if (promise instanceof Promise) {
	            promise._reject(value);
	        }
	    };

	    Promise.prototype._settlePromiseCtx = function (ctx) {
	        this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
	    };

	    Promise.prototype._settlePromise0 = function (handler, value, bitField) {
	        var promise = this._promise0;
	        var receiver = this._receiverAt(0);
	        this._promise0 = undefined;
	        this._receiver0 = undefined;
	        this._settlePromise(promise, handler, receiver, value);
	    };

	    Promise.prototype._clearCallbackDataAtIndex = function (index) {
	        var base = index * 4 - 4;
	        this[base + 2] = this[base + 3] = this[base + 0] = this[base + 1] = undefined;
	    };

	    Promise.prototype._fulfill = function (value) {
	        var bitField = this._bitField;
	        if ((bitField & 117506048) >>> 16) return;
	        if (value === this) {
	            var err = makeSelfResolutionError();
	            this._attachExtraTrace(err);
	            return this._reject(err);
	        }
	        this._setFulfilled();
	        this._rejectionHandler0 = value;

	        if ((bitField & 65535) > 0) {
	            if ((bitField & 134217728) !== 0) {
	                this._settlePromises();
	            } else {
	                async.settlePromises(this);
	            }
	        }
	    };

	    Promise.prototype._reject = function (reason) {
	        var bitField = this._bitField;
	        if ((bitField & 117506048) >>> 16) return;
	        this._setRejected();
	        this._fulfillmentHandler0 = reason;

	        if (this._isFinal()) {
	            return async.fatalError(reason, util.isNode);
	        }

	        if ((bitField & 65535) > 0) {
	            async.settlePromises(this);
	        } else {
	            this._ensurePossibleRejectionHandled();
	        }
	    };

	    Promise.prototype._fulfillPromises = function (len, value) {
	        for (var i = 1; i < len; i++) {
	            var handler = this._fulfillmentHandlerAt(i);
	            var promise = this._promiseAt(i);
	            var receiver = this._receiverAt(i);
	            this._clearCallbackDataAtIndex(i);
	            this._settlePromise(promise, handler, receiver, value);
	        }
	    };

	    Promise.prototype._rejectPromises = function (len, reason) {
	        for (var i = 1; i < len; i++) {
	            var handler = this._rejectionHandlerAt(i);
	            var promise = this._promiseAt(i);
	            var receiver = this._receiverAt(i);
	            this._clearCallbackDataAtIndex(i);
	            this._settlePromise(promise, handler, receiver, reason);
	        }
	    };

	    Promise.prototype._settlePromises = function () {
	        var bitField = this._bitField;
	        var len = bitField & 65535;

	        if (len > 0) {
	            if ((bitField & 16842752) !== 0) {
	                var reason = this._fulfillmentHandler0;
	                this._settlePromise0(this._rejectionHandler0, reason, bitField);
	                this._rejectPromises(len, reason);
	            } else {
	                var value = this._rejectionHandler0;
	                this._settlePromise0(this._fulfillmentHandler0, value, bitField);
	                this._fulfillPromises(len, value);
	            }
	            this._setLength(0);
	        }
	        this._clearCancellationData();
	    };

	    Promise.prototype._settledValue = function () {
	        var bitField = this._bitField;
	        if ((bitField & 33554432) !== 0) {
	            return this._rejectionHandler0;
	        } else if ((bitField & 16777216) !== 0) {
	            return this._fulfillmentHandler0;
	        }
	    };

	    function deferResolve(v) {
	        this.promise._resolveCallback(v);
	    }
	    function deferReject(v) {
	        this.promise._rejectCallback(v, false);
	    }

	    Promise.defer = Promise.pending = function () {
	        debug.deprecated("Promise.defer", "new Promise");
	        var promise = new Promise(INTERNAL);
	        return {
	            promise: promise,
	            resolve: deferResolve,
	            reject: deferReject
	        };
	    };

	    util.notEnumerableProp(Promise, "_makeSelfResolutionError", makeSelfResolutionError);

	    __webpack_require__(30)(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug);
	    __webpack_require__(31)(Promise, INTERNAL, tryConvertToPromise, debug);
	    __webpack_require__(32)(Promise, PromiseArray, apiRejection, debug);
	    __webpack_require__(33)(Promise);
	    __webpack_require__(34)(Promise);
	    __webpack_require__(35)(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
	    Promise.Promise = Promise;
	    Promise.version = "3.5.0";
	    __webpack_require__(36)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	    __webpack_require__(37)(Promise);
	    __webpack_require__(38)(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
	    __webpack_require__(39)(Promise, INTERNAL, debug);
	    __webpack_require__(40)(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
	    __webpack_require__(41)(Promise);
	    __webpack_require__(42)(Promise, INTERNAL);
	    __webpack_require__(43)(Promise, PromiseArray, tryConvertToPromise, apiRejection);
	    __webpack_require__(44)(Promise, INTERNAL, tryConvertToPromise, apiRejection);
	    __webpack_require__(45)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	    __webpack_require__(46)(Promise, PromiseArray, debug);
	    __webpack_require__(47)(Promise, PromiseArray, apiRejection);
	    __webpack_require__(48)(Promise, INTERNAL);
	    __webpack_require__(49)(Promise, INTERNAL);
	    __webpack_require__(50)(Promise);

	    util.toFastProperties(Promise);
	    util.toFastProperties(Promise.prototype);
	    function fillTypes(value) {
	        var p = new Promise(INTERNAL);
	        p._fulfillmentHandler0 = value;
	        p._rejectionHandler0 = value;
	        p._promise0 = value;
	        p._receiver0 = value;
	    }
	    // Complete slack tracking, opt out of field-type tracking and           
	    // stabilize map                                                         
	    fillTypes({ a: 1 });
	    fillTypes({ b: 2 });
	    fillTypes({ c: 3 });
	    fillTypes(1);
	    fillTypes(function () {});
	    fillTypes(undefined);
	    fillTypes(false);
	    fillTypes(new Promise(INTERNAL));
	    debug.setBounds(Async.firstLineError, util.lastLineError);
	    return Promise;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var es5 = __webpack_require__(16);
	var canEvaluate = typeof navigator == "undefined";

	var errorObj = { e: {} };
	var tryCatchTarget;
	var globalObject = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : undefined !== undefined ? undefined : null;

	function tryCatcher() {
	    try {
	        var target = tryCatchTarget;
	        tryCatchTarget = null;
	        return target.apply(this, arguments);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}

	var inherits = function inherits(Child, Parent) {
	    var hasProp = {}.hasOwnProperty;

	    function T() {
	        this.constructor = Child;
	        this.constructor$ = Parent;
	        for (var propertyName in Parent.prototype) {
	            if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
	                this[propertyName + "$"] = Parent.prototype[propertyName];
	            }
	        }
	    }
	    T.prototype = Parent.prototype;
	    Child.prototype = new T();
	    return Child.prototype;
	};

	function isPrimitive(val) {
	    return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
	}

	function isObject(value) {
	    return typeof value === "function" || (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value !== null;
	}

	function maybeWrapAsError(maybeError) {
	    if (!isPrimitive(maybeError)) return maybeError;

	    return new Error(safeToString(maybeError));
	}

	function withAppended(target, appendee) {
	    var len = target.length;
	    var ret = new Array(len + 1);
	    var i;
	    for (i = 0; i < len; ++i) {
	        ret[i] = target[i];
	    }
	    ret[i] = appendee;
	    return ret;
	}

	function getDataPropertyOrDefault(obj, key, defaultValue) {
	    if (es5.isES5) {
	        var desc = Object.getOwnPropertyDescriptor(obj, key);

	        if (desc != null) {
	            return desc.get == null && desc.set == null ? desc.value : defaultValue;
	        }
	    } else {
	        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
	    }
	}

	function notEnumerableProp(obj, name, value) {
	    if (isPrimitive(obj)) return obj;
	    var descriptor = {
	        value: value,
	        configurable: true,
	        enumerable: false,
	        writable: true
	    };
	    es5.defineProperty(obj, name, descriptor);
	    return obj;
	}

	function thrower(r) {
	    throw r;
	}

	var inheritedDataKeys = function () {
	    var excludedPrototypes = [Array.prototype, Object.prototype, Function.prototype];

	    var isExcludedProto = function isExcludedProto(val) {
	        for (var i = 0; i < excludedPrototypes.length; ++i) {
	            if (excludedPrototypes[i] === val) {
	                return true;
	            }
	        }
	        return false;
	    };

	    if (es5.isES5) {
	        var getKeys = Object.getOwnPropertyNames;
	        return function (obj) {
	            var ret = [];
	            var visitedKeys = Object.create(null);
	            while (obj != null && !isExcludedProto(obj)) {
	                var keys;
	                try {
	                    keys = getKeys(obj);
	                } catch (e) {
	                    return ret;
	                }
	                for (var i = 0; i < keys.length; ++i) {
	                    var key = keys[i];
	                    if (visitedKeys[key]) continue;
	                    visitedKeys[key] = true;
	                    var desc = Object.getOwnPropertyDescriptor(obj, key);
	                    if (desc != null && desc.get == null && desc.set == null) {
	                        ret.push(key);
	                    }
	                }
	                obj = es5.getPrototypeOf(obj);
	            }
	            return ret;
	        };
	    } else {
	        var hasProp = {}.hasOwnProperty;
	        return function (obj) {
	            if (isExcludedProto(obj)) return [];
	            var ret = [];

	            /*jshint forin:false */
	            enumeration: for (var key in obj) {
	                if (hasProp.call(obj, key)) {
	                    ret.push(key);
	                } else {
	                    for (var i = 0; i < excludedPrototypes.length; ++i) {
	                        if (hasProp.call(excludedPrototypes[i], key)) {
	                            continue enumeration;
	                        }
	                    }
	                    ret.push(key);
	                }
	            }
	            return ret;
	        };
	    }
	}();

	var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
	function isClass(fn) {
	    try {
	        if (typeof fn === "function") {
	            var keys = es5.names(fn.prototype);

	            var hasMethods = es5.isES5 && keys.length > 1;
	            var hasMethodsOtherThanConstructor = keys.length > 0 && !(keys.length === 1 && keys[0] === "constructor");
	            var hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

	            if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) {
	                return true;
	            }
	        }
	        return false;
	    } catch (e) {
	        return false;
	    }
	}

	function toFastProperties(obj) {
	    /*jshint -W027,-W055,-W031*/
	    function FakeConstructor() {}
	    FakeConstructor.prototype = obj;
	    var l = 8;
	    while (l--) {
	        new FakeConstructor();
	    }return obj;
	    eval(obj);
	}

	var rident = /^[a-z$_][a-z$_0-9]*$/i;
	function isIdentifier(str) {
	    return rident.test(str);
	}

	function filledRange(count, prefix, suffix) {
	    var ret = new Array(count);
	    for (var i = 0; i < count; ++i) {
	        ret[i] = prefix + i + suffix;
	    }
	    return ret;
	}

	function safeToString(obj) {
	    try {
	        return obj + "";
	    } catch (e) {
	        return "[no string representation]";
	    }
	}

	function isError(obj) {
	    return obj !== null && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && typeof obj.message === "string" && typeof obj.name === "string";
	}

	function markAsOriginatingFromRejection(e) {
	    try {
	        notEnumerableProp(e, "isOperational", true);
	    } catch (ignore) {}
	}

	function originatesFromRejection(e) {
	    if (e == null) return false;
	    return e instanceof Error["__BluebirdErrorTypes__"].OperationalError || e["isOperational"] === true;
	}

	function canAttachTrace(obj) {
	    return isError(obj) && es5.propertyIsWritable(obj, "stack");
	}

	var ensureErrorObject = function () {
	    if (!("stack" in new Error())) {
	        return function (value) {
	            if (canAttachTrace(value)) return value;
	            try {
	                throw new Error(safeToString(value));
	            } catch (err) {
	                return err;
	            }
	        };
	    } else {
	        return function (value) {
	            if (canAttachTrace(value)) return value;
	            return new Error(safeToString(value));
	        };
	    }
	}();

	function classString(obj) {
	    return {}.toString.call(obj);
	}

	function copyDescriptors(from, to, filter) {
	    var keys = es5.names(from);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        if (filter(key)) {
	            try {
	                es5.defineProperty(to, key, es5.getDescriptor(from, key));
	            } catch (ignore) {}
	        }
	    }
	}

	var asArray = function asArray(v) {
	    if (es5.isArray(v)) {
	        return v;
	    }
	    return null;
	};

	if (typeof Symbol !== "undefined" && Symbol.iterator) {
	    var ArrayFrom = typeof Array.from === "function" ? function (v) {
	        return Array.from(v);
	    } : function (v) {
	        var ret = [];
	        var it = v[Symbol.iterator]();
	        var itResult;
	        while (!(itResult = it.next()).done) {
	            ret.push(itResult.value);
	        }
	        return ret;
	    };

	    asArray = function asArray(v) {
	        if (es5.isArray(v)) {
	            return v;
	        } else if (v != null && typeof v[Symbol.iterator] === "function") {
	            return ArrayFrom(v);
	        }
	        return null;
	    };
	}

	var isNode = typeof process !== "undefined" && classString(process).toLowerCase() === "[object process]";

	var hasEnvVariables = typeof process !== "undefined" && typeof process.env !== "undefined";

	function env(key) {
	    return hasEnvVariables ? process.env[key] : undefined;
	}

	function getNativePromise() {
	    if (typeof Promise === "function") {
	        try {
	            var promise = new Promise(function () {});
	            if ({}.toString.call(promise) === "[object Promise]") {
	                return Promise;
	            }
	        } catch (e) {}
	    }
	}

	function domainBind(self, cb) {
	    return self.bind(cb);
	}

	var ret = {
	    isClass: isClass,
	    isIdentifier: isIdentifier,
	    inheritedDataKeys: inheritedDataKeys,
	    getDataPropertyOrDefault: getDataPropertyOrDefault,
	    thrower: thrower,
	    isArray: es5.isArray,
	    asArray: asArray,
	    notEnumerableProp: notEnumerableProp,
	    isPrimitive: isPrimitive,
	    isObject: isObject,
	    isError: isError,
	    canEvaluate: canEvaluate,
	    errorObj: errorObj,
	    tryCatch: tryCatch,
	    inherits: inherits,
	    withAppended: withAppended,
	    maybeWrapAsError: maybeWrapAsError,
	    toFastProperties: toFastProperties,
	    filledRange: filledRange,
	    toString: safeToString,
	    canAttachTrace: canAttachTrace,
	    ensureErrorObject: ensureErrorObject,
	    originatesFromRejection: originatesFromRejection,
	    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
	    classString: classString,
	    copyDescriptors: copyDescriptors,
	    hasDevTools: typeof chrome !== "undefined" && chrome && typeof chrome.loadTimes === "function",
	    isNode: isNode,
	    hasEnvVariables: hasEnvVariables,
	    env: env,
	    global: globalObject,
	    getNativePromise: getNativePromise,
	    domainBind: domainBind
	};
	ret.isRecentNode = ret.isNode && function () {
	    var version = process.versions.node.split(".").map(Number);
	    return version[0] === 0 && version[1] > 10 || version[0] > 0;
	}();

	if (ret.isNode) ret.toFastProperties(process);

	try {
	    throw new Error();
	} catch (e) {
	    ret.lastLineError = e;
	}
	module.exports = ret;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(14)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	var isES5 = function () {
	    "use strict";

	    return this === undefined;
	}();

	if (isES5) {
	    module.exports = {
	        freeze: Object.freeze,
	        defineProperty: Object.defineProperty,
	        getDescriptor: Object.getOwnPropertyDescriptor,
	        keys: Object.keys,
	        names: Object.getOwnPropertyNames,
	        getPrototypeOf: Object.getPrototypeOf,
	        isArray: Array.isArray,
	        isES5: isES5,
	        propertyIsWritable: function propertyIsWritable(obj, prop) {
	            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
	            return !!(!descriptor || descriptor.writable || descriptor.set);
	        }
	    };
	} else {
	    var has = {}.hasOwnProperty;
	    var str = {}.toString;
	    var proto = {}.constructor.prototype;

	    var ObjectKeys = function ObjectKeys(o) {
	        var ret = [];
	        for (var key in o) {
	            if (has.call(o, key)) {
	                ret.push(key);
	            }
	        }
	        return ret;
	    };

	    var ObjectGetDescriptor = function ObjectGetDescriptor(o, key) {
	        return { value: o[key] };
	    };

	    var ObjectDefineProperty = function ObjectDefineProperty(o, key, desc) {
	        o[key] = desc.value;
	        return o;
	    };

	    var ObjectFreeze = function ObjectFreeze(obj) {
	        return obj;
	    };

	    var ObjectGetPrototypeOf = function ObjectGetPrototypeOf(obj) {
	        try {
	            return Object(obj).constructor.prototype;
	        } catch (e) {
	            return proto;
	        }
	    };

	    var ArrayIsArray = function ArrayIsArray(obj) {
	        try {
	            return str.call(obj) === "[object Array]";
	        } catch (e) {
	            return false;
	        }
	    };

	    module.exports = {
	        isArray: ArrayIsArray,
	        keys: ObjectKeys,
	        names: ObjectKeys,
	        defineProperty: ObjectDefineProperty,
	        getDescriptor: ObjectGetDescriptor,
	        freeze: ObjectFreeze,
	        getPrototypeOf: ObjectGetPrototypeOf,
	        isES5: isES5,
	        propertyIsWritable: function propertyIsWritable() {
	            return true;
	        }
	    };
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	var firstLineError;
	try {
	    throw new Error();
	} catch (e) {
	    firstLineError = e;
	}
	var schedule = __webpack_require__(18);
	var Queue = __webpack_require__(21);
	var util = __webpack_require__(15);

	function Async() {
	    this._customScheduler = false;
	    this._isTickUsed = false;
	    this._lateQueue = new Queue(16);
	    this._normalQueue = new Queue(16);
	    this._haveDrainedQueues = false;
	    this._trampolineEnabled = true;
	    var self = this;
	    this.drainQueues = function () {
	        self._drainQueues();
	    };
	    this._schedule = schedule;
	}

	Async.prototype.setScheduler = function (fn) {
	    var prev = this._schedule;
	    this._schedule = fn;
	    this._customScheduler = true;
	    return prev;
	};

	Async.prototype.hasCustomScheduler = function () {
	    return this._customScheduler;
	};

	Async.prototype.enableTrampoline = function () {
	    this._trampolineEnabled = true;
	};

	Async.prototype.disableTrampolineIfNecessary = function () {
	    if (util.hasDevTools) {
	        this._trampolineEnabled = false;
	    }
	};

	Async.prototype.haveItemsQueued = function () {
	    return this._isTickUsed || this._haveDrainedQueues;
	};

	Async.prototype.fatalError = function (e, isNode) {
	    if (isNode) {
	        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n");
	        process.exit(2);
	    } else {
	        this.throwLater(e);
	    }
	};

	Async.prototype.throwLater = function (fn, arg) {
	    if (arguments.length === 1) {
	        arg = fn;
	        fn = function fn() {
	            throw arg;
	        };
	    }
	    if (typeof setTimeout !== "undefined") {
	        setTimeout(function () {
	            fn(arg);
	        }, 0);
	    } else try {
	        this._schedule(function () {
	            fn(arg);
	        });
	    } catch (e) {
	        throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
	    }
	};

	function AsyncInvokeLater(fn, receiver, arg) {
	    this._lateQueue.push(fn, receiver, arg);
	    this._queueTick();
	}

	function AsyncInvoke(fn, receiver, arg) {
	    this._normalQueue.push(fn, receiver, arg);
	    this._queueTick();
	}

	function AsyncSettlePromises(promise) {
	    this._normalQueue._pushOne(promise);
	    this._queueTick();
	}

	if (!util.hasDevTools) {
	    Async.prototype.invokeLater = AsyncInvokeLater;
	    Async.prototype.invoke = AsyncInvoke;
	    Async.prototype.settlePromises = AsyncSettlePromises;
	} else {
	    Async.prototype.invokeLater = function (fn, receiver, arg) {
	        if (this._trampolineEnabled) {
	            AsyncInvokeLater.call(this, fn, receiver, arg);
	        } else {
	            this._schedule(function () {
	                setTimeout(function () {
	                    fn.call(receiver, arg);
	                }, 100);
	            });
	        }
	    };

	    Async.prototype.invoke = function (fn, receiver, arg) {
	        if (this._trampolineEnabled) {
	            AsyncInvoke.call(this, fn, receiver, arg);
	        } else {
	            this._schedule(function () {
	                fn.call(receiver, arg);
	            });
	        }
	    };

	    Async.prototype.settlePromises = function (promise) {
	        if (this._trampolineEnabled) {
	            AsyncSettlePromises.call(this, promise);
	        } else {
	            this._schedule(function () {
	                promise._settlePromises();
	            });
	        }
	    };
	}

	Async.prototype._drainQueue = function (queue) {
	    while (queue.length() > 0) {
	        var fn = queue.shift();
	        if (typeof fn !== "function") {
	            fn._settlePromises();
	            continue;
	        }
	        var receiver = queue.shift();
	        var arg = queue.shift();
	        fn.call(receiver, arg);
	    }
	};

	Async.prototype._drainQueues = function () {
	    this._drainQueue(this._normalQueue);
	    this._reset();
	    this._haveDrainedQueues = true;
	    this._drainQueue(this._lateQueue);
	};

	Async.prototype._queueTick = function () {
	    if (!this._isTickUsed) {
	        this._isTickUsed = true;
	        this._schedule(this.drainQueues);
	    }
	};

	Async.prototype._reset = function () {
	    this._isTickUsed = false;
	};

	module.exports = Async;
	module.exports.firstLineError = firstLineError;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, setImmediate) {"use strict";

	var util = __webpack_require__(15);
	var schedule;
	var noAsyncScheduler = function noAsyncScheduler() {
	    throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
	};
	var NativePromise = util.getNativePromise();
	if (util.isNode && typeof MutationObserver === "undefined") {
	    var GlobalSetImmediate = global.setImmediate;
	    var ProcessNextTick = process.nextTick;
	    schedule = util.isRecentNode ? function (fn) {
	        GlobalSetImmediate.call(global, fn);
	    } : function (fn) {
	        ProcessNextTick.call(process, fn);
	    };
	} else if (typeof NativePromise === "function" && typeof NativePromise.resolve === "function") {
	    var nativePromise = NativePromise.resolve();
	    schedule = function schedule(fn) {
	        nativePromise.then(fn);
	    };
	} else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && (window.navigator.standalone || window.cordova))) {
	    schedule = function () {
	        var div = document.createElement("div");
	        var opts = { attributes: true };
	        var toggleScheduled = false;
	        var div2 = document.createElement("div");
	        var o2 = new MutationObserver(function () {
	            div.classList.toggle("foo");
	            toggleScheduled = false;
	        });
	        o2.observe(div2, opts);

	        var scheduleToggle = function scheduleToggle() {
	            if (toggleScheduled) return;
	            toggleScheduled = true;
	            div2.classList.toggle("foo");
	        };

	        return function schedule(fn) {
	            var o = new MutationObserver(function () {
	                o.disconnect();
	                fn();
	            });
	            o.observe(div, opts);
	            scheduleToggle();
	        };
	    }();
	} else if (typeof setImmediate !== "undefined") {
	    schedule = function schedule(fn) {
	        setImmediate(fn);
	    };
	} else if (typeof setTimeout !== "undefined") {
	    schedule = function schedule(fn) {
	        setTimeout(fn, 0);
	    };
	} else {
	    schedule = noAsyncScheduler;
	}
	module.exports = schedule;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(14), __webpack_require__(19).setImmediate))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function () {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function () {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout = exports.clearInterval = function (timeout) {
	  if (timeout) {
	    timeout.close();
	  }
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

	// setimmediate attaches itself to the global object
	__webpack_require__(20);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {"use strict";

	(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	        // Callback can either be a function or a string
	        if (typeof callback !== "function") {
	            callback = new Function("" + callback);
	        }
	        // Copy function arguments
	        var args = new Array(arguments.length - 1);
	        for (var i = 0; i < args.length; i++) {
	            args[i] = arguments[i + 1];
	        }
	        // Store and register the task
	        var task = { callback: callback, args: args };
	        tasksByHandle[nextHandle] = task;
	        registerImmediate(nextHandle);
	        return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	            case 0:
	                callback();
	                break;
	            case 1:
	                callback(args[0]);
	                break;
	            case 2:
	                callback(args[0], args[1]);
	                break;
	            case 3:
	                callback(args[0], args[1], args[2]);
	                break;
	            default:
	                callback.apply(undefined, args);
	                break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function registerImmediate(handle) {
	            process.nextTick(function () {
	                runIfPresent(handle);
	            });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function () {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function onGlobalMessage(event) {
	            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function registerImmediate(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function (event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function registerImmediate(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function registerImmediate(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function registerImmediate(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(14)))

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	function arrayMove(src, srcIndex, dst, dstIndex, len) {
	    for (var j = 0; j < len; ++j) {
	        dst[j + dstIndex] = src[j + srcIndex];
	        src[j + srcIndex] = void 0;
	    }
	}

	function Queue(capacity) {
	    this._capacity = capacity;
	    this._length = 0;
	    this._front = 0;
	}

	Queue.prototype._willBeOverCapacity = function (size) {
	    return this._capacity < size;
	};

	Queue.prototype._pushOne = function (arg) {
	    var length = this.length();
	    this._checkCapacity(length + 1);
	    var i = this._front + length & this._capacity - 1;
	    this[i] = arg;
	    this._length = length + 1;
	};

	Queue.prototype.push = function (fn, receiver, arg) {
	    var length = this.length() + 3;
	    if (this._willBeOverCapacity(length)) {
	        this._pushOne(fn);
	        this._pushOne(receiver);
	        this._pushOne(arg);
	        return;
	    }
	    var j = this._front + length - 3;
	    this._checkCapacity(length);
	    var wrapMask = this._capacity - 1;
	    this[j + 0 & wrapMask] = fn;
	    this[j + 1 & wrapMask] = receiver;
	    this[j + 2 & wrapMask] = arg;
	    this._length = length;
	};

	Queue.prototype.shift = function () {
	    var front = this._front,
	        ret = this[front];

	    this[front] = undefined;
	    this._front = front + 1 & this._capacity - 1;
	    this._length--;
	    return ret;
	};

	Queue.prototype.length = function () {
	    return this._length;
	};

	Queue.prototype._checkCapacity = function (size) {
	    if (this._capacity < size) {
	        this._resizeTo(this._capacity << 1);
	    }
	};

	Queue.prototype._resizeTo = function (capacity) {
	    var oldCapacity = this._capacity;
	    this._capacity = capacity;
	    var front = this._front;
	    var length = this._length;
	    var moveItemsCount = front + length & oldCapacity - 1;
	    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
	};

	module.exports = Queue;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var es5 = __webpack_require__(16);
	var Objectfreeze = es5.freeze;
	var util = __webpack_require__(15);
	var inherits = util.inherits;
	var notEnumerableProp = util.notEnumerableProp;

	function subError(nameProperty, defaultMessage) {
	    function SubError(message) {
	        if (!(this instanceof SubError)) return new SubError(message);
	        notEnumerableProp(this, "message", typeof message === "string" ? message : defaultMessage);
	        notEnumerableProp(this, "name", nameProperty);
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, this.constructor);
	        } else {
	            Error.call(this);
	        }
	    }
	    inherits(SubError, Error);
	    return SubError;
	}

	var _TypeError, _RangeError;
	var Warning = subError("Warning", "warning");
	var CancellationError = subError("CancellationError", "cancellation error");
	var TimeoutError = subError("TimeoutError", "timeout error");
	var AggregateError = subError("AggregateError", "aggregate error");
	try {
	    _TypeError = TypeError;
	    _RangeError = RangeError;
	} catch (e) {
	    _TypeError = subError("TypeError", "type error");
	    _RangeError = subError("RangeError", "range error");
	}

	var methods = ("join pop push shift unshift slice filter forEach some " + "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

	for (var i = 0; i < methods.length; ++i) {
	    if (typeof Array.prototype[methods[i]] === "function") {
	        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
	    }
	}

	es5.defineProperty(AggregateError.prototype, "length", {
	    value: 0,
	    configurable: false,
	    writable: true,
	    enumerable: true
	});
	AggregateError.prototype["isOperational"] = true;
	var level = 0;
	AggregateError.prototype.toString = function () {
	    var indent = Array(level * 4 + 1).join(" ");
	    var ret = "\n" + indent + "AggregateError of:" + "\n";
	    level++;
	    indent = Array(level * 4 + 1).join(" ");
	    for (var i = 0; i < this.length; ++i) {
	        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
	        var lines = str.split("\n");
	        for (var j = 0; j < lines.length; ++j) {
	            lines[j] = indent + lines[j];
	        }
	        str = lines.join("\n");
	        ret += str + "\n";
	    }
	    level--;
	    return ret;
	};

	function OperationalError(message) {
	    if (!(this instanceof OperationalError)) return new OperationalError(message);
	    notEnumerableProp(this, "name", "OperationalError");
	    notEnumerableProp(this, "message", message);
	    this.cause = message;
	    this["isOperational"] = true;

	    if (message instanceof Error) {
	        notEnumerableProp(this, "message", message.message);
	        notEnumerableProp(this, "stack", message.stack);
	    } else if (Error.captureStackTrace) {
	        Error.captureStackTrace(this, this.constructor);
	    }
	}
	inherits(OperationalError, Error);

	var errorTypes = Error["__BluebirdErrorTypes__"];
	if (!errorTypes) {
	    errorTypes = Objectfreeze({
	        CancellationError: CancellationError,
	        TimeoutError: TimeoutError,
	        OperationalError: OperationalError,
	        RejectionError: OperationalError,
	        AggregateError: AggregateError
	    });
	    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
	        value: errorTypes,
	        writable: false,
	        enumerable: false,
	        configurable: false
	    });
	}

	module.exports = {
	    Error: Error,
	    TypeError: _TypeError,
	    RangeError: _RangeError,
	    CancellationError: errorTypes.CancellationError,
	    OperationalError: errorTypes.OperationalError,
	    TimeoutError: errorTypes.TimeoutError,
	    AggregateError: errorTypes.AggregateError,
	    Warning: Warning
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, INTERNAL) {
	    var util = __webpack_require__(15);
	    var errorObj = util.errorObj;
	    var isObject = util.isObject;

	    function tryConvertToPromise(obj, context) {
	        if (isObject(obj)) {
	            if (obj instanceof Promise) return obj;
	            var then = getThen(obj);
	            if (then === errorObj) {
	                if (context) context._pushContext();
	                var ret = Promise.reject(then.e);
	                if (context) context._popContext();
	                return ret;
	            } else if (typeof then === "function") {
	                if (isAnyBluebirdPromise(obj)) {
	                    var ret = new Promise(INTERNAL);
	                    obj._then(ret._fulfill, ret._reject, undefined, ret, null);
	                    return ret;
	                }
	                return doThenable(obj, then, context);
	            }
	        }
	        return obj;
	    }

	    function doGetThen(obj) {
	        return obj.then;
	    }

	    function getThen(obj) {
	        try {
	            return doGetThen(obj);
	        } catch (e) {
	            errorObj.e = e;
	            return errorObj;
	        }
	    }

	    var hasProp = {}.hasOwnProperty;
	    function isAnyBluebirdPromise(obj) {
	        try {
	            return hasProp.call(obj, "_promise0");
	        } catch (e) {
	            return false;
	        }
	    }

	    function doThenable(x, then, context) {
	        var promise = new Promise(INTERNAL);
	        var ret = promise;
	        if (context) context._pushContext();
	        promise._captureStackTrace();
	        if (context) context._popContext();
	        var synchronous = true;
	        var result = util.tryCatch(then).call(x, resolve, reject);
	        synchronous = false;

	        if (promise && result === errorObj) {
	            promise._rejectCallback(result.e, true, true);
	            promise = null;
	        }

	        function resolve(value) {
	            if (!promise) return;
	            promise._resolveCallback(value);
	            promise = null;
	        }

	        function reject(reason) {
	            if (!promise) return;
	            promise._rejectCallback(reason, synchronous, true);
	            promise = null;
	        }
	        return ret;
	    }

	    return tryConvertToPromise;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
	    var util = __webpack_require__(15);
	    var isArray = util.isArray;

	    function toResolutionValue(val) {
	        switch (val) {
	            case -2:
	                return [];
	            case -3:
	                return {};
	            case -6:
	                return new Map();
	        }
	    }

	    function PromiseArray(values) {
	        var promise = this._promise = new Promise(INTERNAL);
	        if (values instanceof Promise) {
	            promise._propagateFrom(values, 3);
	        }
	        promise._setOnCancel(this);
	        this._values = values;
	        this._length = 0;
	        this._totalResolved = 0;
	        this._init(undefined, -2);
	    }
	    util.inherits(PromiseArray, Proxyable);

	    PromiseArray.prototype.length = function () {
	        return this._length;
	    };

	    PromiseArray.prototype.promise = function () {
	        return this._promise;
	    };

	    PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
	        var values = tryConvertToPromise(this._values, this._promise);
	        if (values instanceof Promise) {
	            values = values._target();
	            var bitField = values._bitField;
	            ;
	            this._values = values;

	            if ((bitField & 50397184) === 0) {
	                this._promise._setAsyncGuaranteed();
	                return values._then(init, this._reject, undefined, this, resolveValueIfEmpty);
	            } else if ((bitField & 33554432) !== 0) {
	                values = values._value();
	            } else if ((bitField & 16777216) !== 0) {
	                return this._reject(values._reason());
	            } else {
	                return this._cancel();
	            }
	        }
	        values = util.asArray(values);
	        if (values === null) {
	            var err = apiRejection("expecting an array or an iterable object but got " + util.classString(values)).reason();
	            this._promise._rejectCallback(err, false);
	            return;
	        }

	        if (values.length === 0) {
	            if (resolveValueIfEmpty === -5) {
	                this._resolveEmptyArray();
	            } else {
	                this._resolve(toResolutionValue(resolveValueIfEmpty));
	            }
	            return;
	        }
	        this._iterate(values);
	    };

	    PromiseArray.prototype._iterate = function (values) {
	        var len = this.getActualLength(values.length);
	        this._length = len;
	        this._values = this.shouldCopyValues() ? new Array(len) : this._values;
	        var result = this._promise;
	        var isResolved = false;
	        var bitField = null;
	        for (var i = 0; i < len; ++i) {
	            var maybePromise = tryConvertToPromise(values[i], result);

	            if (maybePromise instanceof Promise) {
	                maybePromise = maybePromise._target();
	                bitField = maybePromise._bitField;
	            } else {
	                bitField = null;
	            }

	            if (isResolved) {
	                if (bitField !== null) {
	                    maybePromise.suppressUnhandledRejections();
	                }
	            } else if (bitField !== null) {
	                if ((bitField & 50397184) === 0) {
	                    maybePromise._proxy(this, i);
	                    this._values[i] = maybePromise;
	                } else if ((bitField & 33554432) !== 0) {
	                    isResolved = this._promiseFulfilled(maybePromise._value(), i);
	                } else if ((bitField & 16777216) !== 0) {
	                    isResolved = this._promiseRejected(maybePromise._reason(), i);
	                } else {
	                    isResolved = this._promiseCancelled(i);
	                }
	            } else {
	                isResolved = this._promiseFulfilled(maybePromise, i);
	            }
	        }
	        if (!isResolved) result._setAsyncGuaranteed();
	    };

	    PromiseArray.prototype._isResolved = function () {
	        return this._values === null;
	    };

	    PromiseArray.prototype._resolve = function (value) {
	        this._values = null;
	        this._promise._fulfill(value);
	    };

	    PromiseArray.prototype._cancel = function () {
	        if (this._isResolved() || !this._promise._isCancellable()) return;
	        this._values = null;
	        this._promise._cancel();
	    };

	    PromiseArray.prototype._reject = function (reason) {
	        this._values = null;
	        this._promise._rejectCallback(reason, false);
	    };

	    PromiseArray.prototype._promiseFulfilled = function (value, index) {
	        this._values[index] = value;
	        var totalResolved = ++this._totalResolved;
	        if (totalResolved >= this._length) {
	            this._resolve(this._values);
	            return true;
	        }
	        return false;
	    };

	    PromiseArray.prototype._promiseCancelled = function () {
	        this._cancel();
	        return true;
	    };

	    PromiseArray.prototype._promiseRejected = function (reason) {
	        this._totalResolved++;
	        this._reject(reason);
	        return true;
	    };

	    PromiseArray.prototype._resultCancelled = function () {
	        if (this._isResolved()) return;
	        var values = this._values;
	        this._cancel();
	        if (values instanceof Promise) {
	            values.cancel();
	        } else {
	            for (var i = 0; i < values.length; ++i) {
	                if (values[i] instanceof Promise) {
	                    values[i].cancel();
	                }
	            }
	        }
	    };

	    PromiseArray.prototype.shouldCopyValues = function () {
	        return true;
	    };

	    PromiseArray.prototype.getActualLength = function (len) {
	        return len;
	    };

	    return PromiseArray;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (Promise) {
	    var longStackTraces = false;
	    var contextStack = [];

	    Promise.prototype._promiseCreated = function () {};
	    Promise.prototype._pushContext = function () {};
	    Promise.prototype._popContext = function () {
	        return null;
	    };
	    Promise._peekContext = Promise.prototype._peekContext = function () {};

	    function Context() {
	        this._trace = new Context.CapturedTrace(peekContext());
	    }
	    Context.prototype._pushContext = function () {
	        if (this._trace !== undefined) {
	            this._trace._promiseCreated = null;
	            contextStack.push(this._trace);
	        }
	    };

	    Context.prototype._popContext = function () {
	        if (this._trace !== undefined) {
	            var trace = contextStack.pop();
	            var ret = trace._promiseCreated;
	            trace._promiseCreated = null;
	            return ret;
	        }
	        return null;
	    };

	    function createContext() {
	        if (longStackTraces) return new Context();
	    }

	    function peekContext() {
	        var lastIndex = contextStack.length - 1;
	        if (lastIndex >= 0) {
	            return contextStack[lastIndex];
	        }
	        return undefined;
	    }
	    Context.CapturedTrace = null;
	    Context.create = createContext;
	    Context.deactivateLongStackTraces = function () {};
	    Context.activateLongStackTraces = function () {
	        var Promise_pushContext = Promise.prototype._pushContext;
	        var Promise_popContext = Promise.prototype._popContext;
	        var Promise_PeekContext = Promise._peekContext;
	        var Promise_peekContext = Promise.prototype._peekContext;
	        var Promise_promiseCreated = Promise.prototype._promiseCreated;
	        Context.deactivateLongStackTraces = function () {
	            Promise.prototype._pushContext = Promise_pushContext;
	            Promise.prototype._popContext = Promise_popContext;
	            Promise._peekContext = Promise_PeekContext;
	            Promise.prototype._peekContext = Promise_peekContext;
	            Promise.prototype._promiseCreated = Promise_promiseCreated;
	            longStackTraces = false;
	        };
	        longStackTraces = true;
	        Promise.prototype._pushContext = Context.prototype._pushContext;
	        Promise.prototype._popContext = Context.prototype._popContext;
	        Promise._peekContext = Promise.prototype._peekContext = peekContext;
	        Promise.prototype._promiseCreated = function () {
	            var ctx = this._peekContext();
	            if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
	        };
	    };
	    return Context;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (Promise, Context) {
	    var getDomain = Promise._getDomain;
	    var async = Promise._async;
	    var Warning = __webpack_require__(22).Warning;
	    var util = __webpack_require__(15);
	    var canAttachTrace = util.canAttachTrace;
	    var unhandledRejectionHandled;
	    var possiblyUnhandledRejection;
	    var bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
	    var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
	    var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
	    var stackFramePattern = null;
	    var formatStack = null;
	    var indentStackFrames = false;
	    var printWarning;
	    var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 && (false || util.env("BLUEBIRD_DEBUG") || util.env("NODE_ENV") === "development"));

	    var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 && (debugging || util.env("BLUEBIRD_WARNINGS")));

	    var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

	    var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

	    Promise.prototype.suppressUnhandledRejections = function () {
	        var target = this._target();
	        target._bitField = target._bitField & ~1048576 | 524288;
	    };

	    Promise.prototype._ensurePossibleRejectionHandled = function () {
	        if ((this._bitField & 524288) !== 0) return;
	        this._setRejectionIsUnhandled();
	        async.invokeLater(this._notifyUnhandledRejection, this, undefined);
	    };

	    Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
	        fireRejectionEvent("rejectionHandled", unhandledRejectionHandled, undefined, this);
	    };

	    Promise.prototype._setReturnedNonUndefined = function () {
	        this._bitField = this._bitField | 268435456;
	    };

	    Promise.prototype._returnedNonUndefined = function () {
	        return (this._bitField & 268435456) !== 0;
	    };

	    Promise.prototype._notifyUnhandledRejection = function () {
	        if (this._isRejectionUnhandled()) {
	            var reason = this._settledValue();
	            this._setUnhandledRejectionIsNotified();
	            fireRejectionEvent("unhandledRejection", possiblyUnhandledRejection, reason, this);
	        }
	    };

	    Promise.prototype._setUnhandledRejectionIsNotified = function () {
	        this._bitField = this._bitField | 262144;
	    };

	    Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
	        this._bitField = this._bitField & ~262144;
	    };

	    Promise.prototype._isUnhandledRejectionNotified = function () {
	        return (this._bitField & 262144) > 0;
	    };

	    Promise.prototype._setRejectionIsUnhandled = function () {
	        this._bitField = this._bitField | 1048576;
	    };

	    Promise.prototype._unsetRejectionIsUnhandled = function () {
	        this._bitField = this._bitField & ~1048576;
	        if (this._isUnhandledRejectionNotified()) {
	            this._unsetUnhandledRejectionIsNotified();
	            this._notifyUnhandledRejectionIsHandled();
	        }
	    };

	    Promise.prototype._isRejectionUnhandled = function () {
	        return (this._bitField & 1048576) > 0;
	    };

	    Promise.prototype._warn = function (message, shouldUseOwnTrace, promise) {
	        return warn(message, shouldUseOwnTrace, promise || this);
	    };

	    Promise.onPossiblyUnhandledRejection = function (fn) {
	        var domain = getDomain();
	        possiblyUnhandledRejection = typeof fn === "function" ? domain === null ? fn : util.domainBind(domain, fn) : undefined;
	    };

	    Promise.onUnhandledRejectionHandled = function (fn) {
	        var domain = getDomain();
	        unhandledRejectionHandled = typeof fn === "function" ? domain === null ? fn : util.domainBind(domain, fn) : undefined;
	    };

	    var disableLongStackTraces = function disableLongStackTraces() {};
	    Promise.longStackTraces = function () {
	        if (async.haveItemsQueued() && !config.longStackTraces) {
	            throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
	        }
	        if (!config.longStackTraces && longStackTracesIsSupported()) {
	            var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
	            var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
	            config.longStackTraces = true;
	            disableLongStackTraces = function disableLongStackTraces() {
	                if (async.haveItemsQueued() && !config.longStackTraces) {
	                    throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
	                }
	                Promise.prototype._captureStackTrace = Promise_captureStackTrace;
	                Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
	                Context.deactivateLongStackTraces();
	                async.enableTrampoline();
	                config.longStackTraces = false;
	            };
	            Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
	            Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
	            Context.activateLongStackTraces();
	            async.disableTrampolineIfNecessary();
	        }
	    };

	    Promise.hasLongStackTraces = function () {
	        return config.longStackTraces && longStackTracesIsSupported();
	    };

	    var fireDomEvent = function () {
	        try {
	            if (typeof CustomEvent === "function") {
	                var event = new CustomEvent("CustomEvent");
	                util.global.dispatchEvent(event);
	                return function (name, event) {
	                    var domEvent = new CustomEvent(name.toLowerCase(), {
	                        detail: event,
	                        cancelable: true
	                    });
	                    return !util.global.dispatchEvent(domEvent);
	                };
	            } else if (typeof Event === "function") {
	                var event = new Event("CustomEvent");
	                util.global.dispatchEvent(event);
	                return function (name, event) {
	                    var domEvent = new Event(name.toLowerCase(), {
	                        cancelable: true
	                    });
	                    domEvent.detail = event;
	                    return !util.global.dispatchEvent(domEvent);
	                };
	            } else {
	                var event = document.createEvent("CustomEvent");
	                event.initCustomEvent("testingtheevent", false, true, {});
	                util.global.dispatchEvent(event);
	                return function (name, event) {
	                    var domEvent = document.createEvent("CustomEvent");
	                    domEvent.initCustomEvent(name.toLowerCase(), false, true, event);
	                    return !util.global.dispatchEvent(domEvent);
	                };
	            }
	        } catch (e) {}
	        return function () {
	            return false;
	        };
	    }();

	    var fireGlobalEvent = function () {
	        if (util.isNode) {
	            return function () {
	                return process.emit.apply(process, arguments);
	            };
	        } else {
	            if (!util.global) {
	                return function () {
	                    return false;
	                };
	            }
	            return function (name) {
	                var methodName = "on" + name.toLowerCase();
	                var method = util.global[methodName];
	                if (!method) return false;
	                method.apply(util.global, [].slice.call(arguments, 1));
	                return true;
	            };
	        }
	    }();

	    function generatePromiseLifecycleEventObject(name, promise) {
	        return { promise: promise };
	    }

	    var eventToObjectGenerator = {
	        promiseCreated: generatePromiseLifecycleEventObject,
	        promiseFulfilled: generatePromiseLifecycleEventObject,
	        promiseRejected: generatePromiseLifecycleEventObject,
	        promiseResolved: generatePromiseLifecycleEventObject,
	        promiseCancelled: generatePromiseLifecycleEventObject,
	        promiseChained: function promiseChained(name, promise, child) {
	            return { promise: promise, child: child };
	        },
	        warning: function warning(name, _warning) {
	            return { warning: _warning };
	        },
	        unhandledRejection: function unhandledRejection(name, reason, promise) {
	            return { reason: reason, promise: promise };
	        },
	        rejectionHandled: generatePromiseLifecycleEventObject
	    };

	    var activeFireEvent = function activeFireEvent(name) {
	        var globalEventFired = false;
	        try {
	            globalEventFired = fireGlobalEvent.apply(null, arguments);
	        } catch (e) {
	            async.throwLater(e);
	            globalEventFired = true;
	        }

	        var domEventFired = false;
	        try {
	            domEventFired = fireDomEvent(name, eventToObjectGenerator[name].apply(null, arguments));
	        } catch (e) {
	            async.throwLater(e);
	            domEventFired = true;
	        }

	        return domEventFired || globalEventFired;
	    };

	    Promise.config = function (opts) {
	        opts = Object(opts);
	        if ("longStackTraces" in opts) {
	            if (opts.longStackTraces) {
	                Promise.longStackTraces();
	            } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
	                disableLongStackTraces();
	            }
	        }
	        if ("warnings" in opts) {
	            var warningsOption = opts.warnings;
	            config.warnings = !!warningsOption;
	            wForgottenReturn = config.warnings;

	            if (util.isObject(warningsOption)) {
	                if ("wForgottenReturn" in warningsOption) {
	                    wForgottenReturn = !!warningsOption.wForgottenReturn;
	                }
	            }
	        }
	        if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
	            if (async.haveItemsQueued()) {
	                throw new Error("cannot enable cancellation after promises are in use");
	            }
	            Promise.prototype._clearCancellationData = cancellationClearCancellationData;
	            Promise.prototype._propagateFrom = cancellationPropagateFrom;
	            Promise.prototype._onCancel = cancellationOnCancel;
	            Promise.prototype._setOnCancel = cancellationSetOnCancel;
	            Promise.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
	            Promise.prototype._execute = cancellationExecute;
	            _propagateFromFunction = cancellationPropagateFrom;
	            config.cancellation = true;
	        }
	        if ("monitoring" in opts) {
	            if (opts.monitoring && !config.monitoring) {
	                config.monitoring = true;
	                Promise.prototype._fireEvent = activeFireEvent;
	            } else if (!opts.monitoring && config.monitoring) {
	                config.monitoring = false;
	                Promise.prototype._fireEvent = defaultFireEvent;
	            }
	        }
	        return Promise;
	    };

	    function defaultFireEvent() {
	        return false;
	    }

	    Promise.prototype._fireEvent = defaultFireEvent;
	    Promise.prototype._execute = function (executor, resolve, reject) {
	        try {
	            executor(resolve, reject);
	        } catch (e) {
	            return e;
	        }
	    };
	    Promise.prototype._onCancel = function () {};
	    Promise.prototype._setOnCancel = function (handler) {
	        ;
	    };
	    Promise.prototype._attachCancellationCallback = function (onCancel) {
	        ;
	    };
	    Promise.prototype._captureStackTrace = function () {};
	    Promise.prototype._attachExtraTrace = function () {};
	    Promise.prototype._clearCancellationData = function () {};
	    Promise.prototype._propagateFrom = function (parent, flags) {
	        ;
	        ;
	    };

	    function cancellationExecute(executor, resolve, reject) {
	        var promise = this;
	        try {
	            executor(resolve, reject, function (onCancel) {
	                if (typeof onCancel !== "function") {
	                    throw new TypeError("onCancel must be a function, got: " + util.toString(onCancel));
	                }
	                promise._attachCancellationCallback(onCancel);
	            });
	        } catch (e) {
	            return e;
	        }
	    }

	    function cancellationAttachCancellationCallback(onCancel) {
	        if (!this._isCancellable()) return this;

	        var previousOnCancel = this._onCancel();
	        if (previousOnCancel !== undefined) {
	            if (util.isArray(previousOnCancel)) {
	                previousOnCancel.push(onCancel);
	            } else {
	                this._setOnCancel([previousOnCancel, onCancel]);
	            }
	        } else {
	            this._setOnCancel(onCancel);
	        }
	    }

	    function cancellationOnCancel() {
	        return this._onCancelField;
	    }

	    function cancellationSetOnCancel(onCancel) {
	        this._onCancelField = onCancel;
	    }

	    function cancellationClearCancellationData() {
	        this._cancellationParent = undefined;
	        this._onCancelField = undefined;
	    }

	    function cancellationPropagateFrom(parent, flags) {
	        if ((flags & 1) !== 0) {
	            this._cancellationParent = parent;
	            var branchesRemainingToCancel = parent._branchesRemainingToCancel;
	            if (branchesRemainingToCancel === undefined) {
	                branchesRemainingToCancel = 0;
	            }
	            parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
	        }
	        if ((flags & 2) !== 0 && parent._isBound()) {
	            this._setBoundTo(parent._boundTo);
	        }
	    }

	    function bindingPropagateFrom(parent, flags) {
	        if ((flags & 2) !== 0 && parent._isBound()) {
	            this._setBoundTo(parent._boundTo);
	        }
	    }
	    var _propagateFromFunction = bindingPropagateFrom;

	    function _boundValueFunction() {
	        var ret = this._boundTo;
	        if (ret !== undefined) {
	            if (ret instanceof Promise) {
	                if (ret.isFulfilled()) {
	                    return ret.value();
	                } else {
	                    return undefined;
	                }
	            }
	        }
	        return ret;
	    }

	    function longStackTracesCaptureStackTrace() {
	        this._trace = new CapturedTrace(this._peekContext());
	    }

	    function longStackTracesAttachExtraTrace(error, ignoreSelf) {
	        if (canAttachTrace(error)) {
	            var trace = this._trace;
	            if (trace !== undefined) {
	                if (ignoreSelf) trace = trace._parent;
	            }
	            if (trace !== undefined) {
	                trace.attachExtraTrace(error);
	            } else if (!error.__stackCleaned__) {
	                var parsed = parseStackAndMessage(error);
	                util.notEnumerableProp(error, "stack", parsed.message + "\n" + parsed.stack.join("\n"));
	                util.notEnumerableProp(error, "__stackCleaned__", true);
	            }
	        }
	    }

	    function checkForgottenReturns(returnValue, promiseCreated, name, promise, parent) {
	        if (returnValue === undefined && promiseCreated !== null && wForgottenReturn) {
	            if (parent !== undefined && parent._returnedNonUndefined()) return;
	            if ((promise._bitField & 65535) === 0) return;

	            if (name) name = name + " ";
	            var handlerLine = "";
	            var creatorLine = "";
	            if (promiseCreated._trace) {
	                var traceLines = promiseCreated._trace.stack.split("\n");
	                var stack = cleanStack(traceLines);
	                for (var i = stack.length - 1; i >= 0; --i) {
	                    var line = stack[i];
	                    if (!nodeFramePattern.test(line)) {
	                        var lineMatches = line.match(parseLinePattern);
	                        if (lineMatches) {
	                            handlerLine = "at " + lineMatches[1] + ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
	                        }
	                        break;
	                    }
	                }

	                if (stack.length > 0) {
	                    var firstUserLine = stack[0];
	                    for (var i = 0; i < traceLines.length; ++i) {

	                        if (traceLines[i] === firstUserLine) {
	                            if (i > 0) {
	                                creatorLine = "\n" + traceLines[i - 1];
	                            }
	                            break;
	                        }
	                    }
	                }
	            }
	            var msg = "a promise was created in a " + name + "handler " + handlerLine + "but was not returned from it, " + "see http://goo.gl/rRqMUw" + creatorLine;
	            promise._warn(msg, true, promiseCreated);
	        }
	    }

	    function deprecated(name, replacement) {
	        var message = name + " is deprecated and will be removed in a future version.";
	        if (replacement) message += " Use " + replacement + " instead.";
	        return warn(message);
	    }

	    function warn(message, shouldUseOwnTrace, promise) {
	        if (!config.warnings) return;
	        var warning = new Warning(message);
	        var ctx;
	        if (shouldUseOwnTrace) {
	            promise._attachExtraTrace(warning);
	        } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
	            ctx.attachExtraTrace(warning);
	        } else {
	            var parsed = parseStackAndMessage(warning);
	            warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
	        }

	        if (!activeFireEvent("warning", warning)) {
	            formatAndLogError(warning, "", true);
	        }
	    }

	    function reconstructStack(message, stacks) {
	        for (var i = 0; i < stacks.length - 1; ++i) {
	            stacks[i].push("From previous event:");
	            stacks[i] = stacks[i].join("\n");
	        }
	        if (i < stacks.length) {
	            stacks[i] = stacks[i].join("\n");
	        }
	        return message + "\n" + stacks.join("\n");
	    }

	    function removeDuplicateOrEmptyJumps(stacks) {
	        for (var i = 0; i < stacks.length; ++i) {
	            if (stacks[i].length === 0 || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) {
	                stacks.splice(i, 1);
	                i--;
	            }
	        }
	    }

	    function removeCommonRoots(stacks) {
	        var current = stacks[0];
	        for (var i = 1; i < stacks.length; ++i) {
	            var prev = stacks[i];
	            var currentLastIndex = current.length - 1;
	            var currentLastLine = current[currentLastIndex];
	            var commonRootMeetPoint = -1;

	            for (var j = prev.length - 1; j >= 0; --j) {
	                if (prev[j] === currentLastLine) {
	                    commonRootMeetPoint = j;
	                    break;
	                }
	            }

	            for (var j = commonRootMeetPoint; j >= 0; --j) {
	                var line = prev[j];
	                if (current[currentLastIndex] === line) {
	                    current.pop();
	                    currentLastIndex--;
	                } else {
	                    break;
	                }
	            }
	            current = prev;
	        }
	    }

	    function cleanStack(stack) {
	        var ret = [];
	        for (var i = 0; i < stack.length; ++i) {
	            var line = stack[i];
	            var isTraceLine = "    (No stack trace)" === line || stackFramePattern.test(line);
	            var isInternalFrame = isTraceLine && shouldIgnore(line);
	            if (isTraceLine && !isInternalFrame) {
	                if (indentStackFrames && line.charAt(0) !== " ") {
	                    line = "    " + line;
	                }
	                ret.push(line);
	            }
	        }
	        return ret;
	    }

	    function stackFramesAsArray(error) {
	        var stack = error.stack.replace(/\s+$/g, "").split("\n");
	        for (var i = 0; i < stack.length; ++i) {
	            var line = stack[i];
	            if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
	                break;
	            }
	        }
	        if (i > 0 && error.name != "SyntaxError") {
	            stack = stack.slice(i);
	        }
	        return stack;
	    }

	    function parseStackAndMessage(error) {
	        var stack = error.stack;
	        var message = error.toString();
	        stack = typeof stack === "string" && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"];
	        return {
	            message: message,
	            stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
	        };
	    }

	    function formatAndLogError(error, title, isSoft) {
	        if (typeof console !== "undefined") {
	            var message;
	            if (util.isObject(error)) {
	                var stack = error.stack;
	                message = title + formatStack(stack, error);
	            } else {
	                message = title + String(error);
	            }
	            if (typeof printWarning === "function") {
	                printWarning(message, isSoft);
	            } else if (typeof console.log === "function" || _typeof(console.log) === "object") {
	                console.log(message);
	            }
	        }
	    }

	    function fireRejectionEvent(name, localHandler, reason, promise) {
	        var localEventFired = false;
	        try {
	            if (typeof localHandler === "function") {
	                localEventFired = true;
	                if (name === "rejectionHandled") {
	                    localHandler(promise);
	                } else {
	                    localHandler(reason, promise);
	                }
	            }
	        } catch (e) {
	            async.throwLater(e);
	        }

	        if (name === "unhandledRejection") {
	            if (!activeFireEvent(name, reason, promise) && !localEventFired) {
	                formatAndLogError(reason, "Unhandled rejection ");
	            }
	        } else {
	            activeFireEvent(name, promise);
	        }
	    }

	    function formatNonError(obj) {
	        var str;
	        if (typeof obj === "function") {
	            str = "[function " + (obj.name || "anonymous") + "]";
	        } else {
	            str = obj && typeof obj.toString === "function" ? obj.toString() : util.toString(obj);
	            var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
	            if (ruselessToString.test(str)) {
	                try {
	                    var newStr = JSON.stringify(obj);
	                    str = newStr;
	                } catch (e) {}
	            }
	            if (str.length === 0) {
	                str = "(empty array)";
	            }
	        }
	        return "(<" + snip(str) + ">, no stack trace)";
	    }

	    function snip(str) {
	        var maxChars = 41;
	        if (str.length < maxChars) {
	            return str;
	        }
	        return str.substr(0, maxChars - 3) + "...";
	    }

	    function longStackTracesIsSupported() {
	        return typeof captureStackTrace === "function";
	    }

	    var shouldIgnore = function shouldIgnore() {
	        return false;
	    };
	    var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
	    function parseLineInfo(line) {
	        var matches = line.match(parseLineInfoRegex);
	        if (matches) {
	            return {
	                fileName: matches[1],
	                line: parseInt(matches[2], 10)
	            };
	        }
	    }

	    function setBounds(firstLineError, lastLineError) {
	        if (!longStackTracesIsSupported()) return;
	        var firstStackLines = firstLineError.stack.split("\n");
	        var lastStackLines = lastLineError.stack.split("\n");
	        var firstIndex = -1;
	        var lastIndex = -1;
	        var firstFileName;
	        var lastFileName;
	        for (var i = 0; i < firstStackLines.length; ++i) {
	            var result = parseLineInfo(firstStackLines[i]);
	            if (result) {
	                firstFileName = result.fileName;
	                firstIndex = result.line;
	                break;
	            }
	        }
	        for (var i = 0; i < lastStackLines.length; ++i) {
	            var result = parseLineInfo(lastStackLines[i]);
	            if (result) {
	                lastFileName = result.fileName;
	                lastIndex = result.line;
	                break;
	            }
	        }
	        if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex) {
	            return;
	        }

	        shouldIgnore = function shouldIgnore(line) {
	            if (bluebirdFramePattern.test(line)) return true;
	            var info = parseLineInfo(line);
	            if (info) {
	                if (info.fileName === firstFileName && firstIndex <= info.line && info.line <= lastIndex) {
	                    return true;
	                }
	            }
	            return false;
	        };
	    }

	    function CapturedTrace(parent) {
	        this._parent = parent;
	        this._promisesCreated = 0;
	        var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
	        captureStackTrace(this, CapturedTrace);
	        if (length > 32) this.uncycle();
	    }
	    util.inherits(CapturedTrace, Error);
	    Context.CapturedTrace = CapturedTrace;

	    CapturedTrace.prototype.uncycle = function () {
	        var length = this._length;
	        if (length < 2) return;
	        var nodes = [];
	        var stackToIndex = {};

	        for (var i = 0, node = this; node !== undefined; ++i) {
	            nodes.push(node);
	            node = node._parent;
	        }
	        length = this._length = i;
	        for (var i = length - 1; i >= 0; --i) {
	            var stack = nodes[i].stack;
	            if (stackToIndex[stack] === undefined) {
	                stackToIndex[stack] = i;
	            }
	        }
	        for (var i = 0; i < length; ++i) {
	            var currentStack = nodes[i].stack;
	            var index = stackToIndex[currentStack];
	            if (index !== undefined && index !== i) {
	                if (index > 0) {
	                    nodes[index - 1]._parent = undefined;
	                    nodes[index - 1]._length = 1;
	                }
	                nodes[i]._parent = undefined;
	                nodes[i]._length = 1;
	                var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

	                if (index < length - 1) {
	                    cycleEdgeNode._parent = nodes[index + 1];
	                    cycleEdgeNode._parent.uncycle();
	                    cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
	                } else {
	                    cycleEdgeNode._parent = undefined;
	                    cycleEdgeNode._length = 1;
	                }
	                var currentChildLength = cycleEdgeNode._length + 1;
	                for (var j = i - 2; j >= 0; --j) {
	                    nodes[j]._length = currentChildLength;
	                    currentChildLength++;
	                }
	                return;
	            }
	        }
	    };

	    CapturedTrace.prototype.attachExtraTrace = function (error) {
	        if (error.__stackCleaned__) return;
	        this.uncycle();
	        var parsed = parseStackAndMessage(error);
	        var message = parsed.message;
	        var stacks = [parsed.stack];

	        var trace = this;
	        while (trace !== undefined) {
	            stacks.push(cleanStack(trace.stack.split("\n")));
	            trace = trace._parent;
	        }
	        removeCommonRoots(stacks);
	        removeDuplicateOrEmptyJumps(stacks);
	        util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
	        util.notEnumerableProp(error, "__stackCleaned__", true);
	    };

	    var captureStackTrace = function stackDetection() {
	        var v8stackFramePattern = /^\s*at\s*/;
	        var v8stackFormatter = function v8stackFormatter(stack, error) {
	            if (typeof stack === "string") return stack;

	            if (error.name !== undefined && error.message !== undefined) {
	                return error.toString();
	            }
	            return formatNonError(error);
	        };

	        if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
	            Error.stackTraceLimit += 6;
	            stackFramePattern = v8stackFramePattern;
	            formatStack = v8stackFormatter;
	            var captureStackTrace = Error.captureStackTrace;

	            shouldIgnore = function shouldIgnore(line) {
	                return bluebirdFramePattern.test(line);
	            };
	            return function (receiver, ignoreUntil) {
	                Error.stackTraceLimit += 6;
	                captureStackTrace(receiver, ignoreUntil);
	                Error.stackTraceLimit -= 6;
	            };
	        }
	        var err = new Error();

	        if (typeof err.stack === "string" && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
	            stackFramePattern = /@/;
	            formatStack = v8stackFormatter;
	            indentStackFrames = true;
	            return function captureStackTrace(o) {
	                o.stack = new Error().stack;
	            };
	        }

	        var hasStackAfterThrow;
	        try {
	            throw new Error();
	        } catch (e) {
	            hasStackAfterThrow = "stack" in e;
	        }
	        if (!("stack" in err) && hasStackAfterThrow && typeof Error.stackTraceLimit === "number") {
	            stackFramePattern = v8stackFramePattern;
	            formatStack = v8stackFormatter;
	            return function captureStackTrace(o) {
	                Error.stackTraceLimit += 6;
	                try {
	                    throw new Error();
	                } catch (e) {
	                    o.stack = e.stack;
	                }
	                Error.stackTraceLimit -= 6;
	            };
	        }

	        formatStack = function formatStack(stack, error) {
	            if (typeof stack === "string") return stack;

	            if (((typeof error === "undefined" ? "undefined" : _typeof(error)) === "object" || typeof error === "function") && error.name !== undefined && error.message !== undefined) {
	                return error.toString();
	            }
	            return formatNonError(error);
	        };

	        return null;
	    }([]);

	    if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
	        printWarning = function printWarning(message) {
	            console.warn(message);
	        };
	        if (util.isNode && process.stderr.isTTY) {
	            printWarning = function printWarning(message, isSoft) {
	                var color = isSoft ? "\x1B[33m" : "\x1B[31m";
	                console.warn(color + message + "\x1B[0m\n");
	            };
	        } else if (!util.isNode && typeof new Error().stack === "string") {
	            printWarning = function printWarning(message, isSoft) {
	                console.warn("%c" + message, isSoft ? "color: darkorange" : "color: red");
	            };
	        }
	    }

	    var config = {
	        warnings: warnings,
	        longStackTraces: false,
	        cancellation: false,
	        monitoring: false
	    };

	    if (longStackTraces) Promise.longStackTraces();

	    return {
	        longStackTraces: function longStackTraces() {
	            return config.longStackTraces;
	        },
	        warnings: function warnings() {
	            return config.warnings;
	        },
	        cancellation: function cancellation() {
	            return config.cancellation;
	        },
	        monitoring: function monitoring() {
	            return config.monitoring;
	        },
	        propagateFromFunction: function propagateFromFunction() {
	            return _propagateFromFunction;
	        },
	        boundValueFunction: function boundValueFunction() {
	            return _boundValueFunction;
	        },
	        checkForgottenReturns: checkForgottenReturns,
	        setBounds: setBounds,
	        warn: warn,
	        deprecated: deprecated,
	        CapturedTrace: CapturedTrace,
	        fireDomEvent: fireDomEvent,
	        fireGlobalEvent: fireGlobalEvent
	    };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, tryConvertToPromise, NEXT_FILTER) {
	    var util = __webpack_require__(15);
	    var CancellationError = Promise.CancellationError;
	    var errorObj = util.errorObj;
	    var catchFilter = __webpack_require__(28)(NEXT_FILTER);

	    function PassThroughHandlerContext(promise, type, handler) {
	        this.promise = promise;
	        this.type = type;
	        this.handler = handler;
	        this.called = false;
	        this.cancelPromise = null;
	    }

	    PassThroughHandlerContext.prototype.isFinallyHandler = function () {
	        return this.type === 0;
	    };

	    function FinallyHandlerCancelReaction(finallyHandler) {
	        this.finallyHandler = finallyHandler;
	    }

	    FinallyHandlerCancelReaction.prototype._resultCancelled = function () {
	        checkCancel(this.finallyHandler);
	    };

	    function checkCancel(ctx, reason) {
	        if (ctx.cancelPromise != null) {
	            if (arguments.length > 1) {
	                ctx.cancelPromise._reject(reason);
	            } else {
	                ctx.cancelPromise._cancel();
	            }
	            ctx.cancelPromise = null;
	            return true;
	        }
	        return false;
	    }

	    function succeed() {
	        return finallyHandler.call(this, this.promise._target()._settledValue());
	    }
	    function fail(reason) {
	        if (checkCancel(this, reason)) return;
	        errorObj.e = reason;
	        return errorObj;
	    }
	    function finallyHandler(reasonOrValue) {
	        var promise = this.promise;
	        var handler = this.handler;

	        if (!this.called) {
	            this.called = true;
	            var ret = this.isFinallyHandler() ? handler.call(promise._boundValue()) : handler.call(promise._boundValue(), reasonOrValue);
	            if (ret === NEXT_FILTER) {
	                return ret;
	            } else if (ret !== undefined) {
	                promise._setReturnedNonUndefined();
	                var maybePromise = tryConvertToPromise(ret, promise);
	                if (maybePromise instanceof Promise) {
	                    if (this.cancelPromise != null) {
	                        if (maybePromise._isCancelled()) {
	                            var reason = new CancellationError("late cancellation observer");
	                            promise._attachExtraTrace(reason);
	                            errorObj.e = reason;
	                            return errorObj;
	                        } else if (maybePromise.isPending()) {
	                            maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));
	                        }
	                    }
	                    return maybePromise._then(succeed, fail, undefined, this, undefined);
	                }
	            }
	        }

	        if (promise.isRejected()) {
	            checkCancel(this);
	            errorObj.e = reasonOrValue;
	            return errorObj;
	        } else {
	            checkCancel(this);
	            return reasonOrValue;
	        }
	    }

	    Promise.prototype._passThrough = function (handler, type, success, fail) {
	        if (typeof handler !== "function") return this.then();
	        return this._then(success, fail, undefined, new PassThroughHandlerContext(this, type, handler), undefined);
	    };

	    Promise.prototype.lastly = Promise.prototype["finally"] = function (handler) {
	        return this._passThrough(handler, 0, finallyHandler, finallyHandler);
	    };

	    Promise.prototype.tap = function (handler) {
	        return this._passThrough(handler, 1, finallyHandler);
	    };

	    Promise.prototype.tapCatch = function (handlerOrPredicate) {
	        var len = arguments.length;
	        if (len === 1) {
	            return this._passThrough(handlerOrPredicate, 1, undefined, finallyHandler);
	        } else {
	            var catchInstances = new Array(len - 1),
	                j = 0,
	                i;
	            for (i = 0; i < len - 1; ++i) {
	                var item = arguments[i];
	                if (util.isObject(item)) {
	                    catchInstances[j++] = item;
	                } else {
	                    return Promise.reject(new TypeError("tapCatch statement predicate: " + "expecting an object but got " + util.classString(item)));
	                }
	            }
	            catchInstances.length = j;
	            var handler = arguments[i];
	            return this._passThrough(catchFilter(catchInstances, handler, this), 1, undefined, finallyHandler);
	        }
	    };

	    return PassThroughHandlerContext;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (NEXT_FILTER) {
	    var util = __webpack_require__(15);
	    var getKeys = __webpack_require__(16).keys;
	    var tryCatch = util.tryCatch;
	    var errorObj = util.errorObj;

	    function catchFilter(instances, cb, promise) {
	        return function (e) {
	            var boundTo = promise._boundValue();
	            predicateLoop: for (var i = 0; i < instances.length; ++i) {
	                var item = instances[i];

	                if (item === Error || item != null && item.prototype instanceof Error) {
	                    if (e instanceof item) {
	                        return tryCatch(cb).call(boundTo, e);
	                    }
	                } else if (typeof item === "function") {
	                    var matchesPredicate = tryCatch(item).call(boundTo, e);
	                    if (matchesPredicate === errorObj) {
	                        return matchesPredicate;
	                    } else if (matchesPredicate) {
	                        return tryCatch(cb).call(boundTo, e);
	                    }
	                } else if (util.isObject(e)) {
	                    var keys = getKeys(item);
	                    for (var j = 0; j < keys.length; ++j) {
	                        var key = keys[j];
	                        if (item[key] != e[key]) {
	                            continue predicateLoop;
	                        }
	                    }
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            }
	            return NEXT_FILTER;
	        };
	    }

	    return catchFilter;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var util = __webpack_require__(15);
	var maybeWrapAsError = util.maybeWrapAsError;
	var errors = __webpack_require__(22);
	var OperationalError = errors.OperationalError;
	var es5 = __webpack_require__(16);

	function isUntypedError(obj) {
	    return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype;
	}

	var rErrorKey = /^(?:name|message|stack|cause)$/;
	function wrapAsOperationalError(obj) {
	    var ret;
	    if (isUntypedError(obj)) {
	        ret = new OperationalError(obj);
	        ret.name = obj.name;
	        ret.message = obj.message;
	        ret.stack = obj.stack;
	        var keys = es5.keys(obj);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (!rErrorKey.test(key)) {
	                ret[key] = obj[key];
	            }
	        }
	        return ret;
	    }
	    util.markAsOriginatingFromRejection(obj);
	    return obj;
	}

	function nodebackForPromise(promise, multiArgs) {
	    return function (err, value) {
	        if (promise === null) return;
	        if (err) {
	            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        } else if (!multiArgs) {
	            promise._fulfill(value);
	        } else {
	            var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0));for (var $_i = 1; $_i < $_len; ++$_i) {
	                args[$_i - 1] = arguments[$_i];
	            };
	            promise._fulfill(args);
	        }
	        promise = null;
	    };
	}

	module.exports = nodebackForPromise;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
	    var util = __webpack_require__(15);
	    var tryCatch = util.tryCatch;

	    Promise.method = function (fn) {
	        if (typeof fn !== "function") {
	            throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
	        }
	        return function () {
	            var ret = new Promise(INTERNAL);
	            ret._captureStackTrace();
	            ret._pushContext();
	            var value = tryCatch(fn).apply(this, arguments);
	            var promiseCreated = ret._popContext();
	            debug.checkForgottenReturns(value, promiseCreated, "Promise.method", ret);
	            ret._resolveFromSyncValue(value);
	            return ret;
	        };
	    };

	    Promise.attempt = Promise["try"] = function (fn) {
	        if (typeof fn !== "function") {
	            return apiRejection("expecting a function but got " + util.classString(fn));
	        }
	        var ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._pushContext();
	        var value;
	        if (arguments.length > 1) {
	            debug.deprecated("calling Promise.try with more than 1 argument");
	            var arg = arguments[1];
	            var ctx = arguments[2];
	            value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg) : tryCatch(fn).call(ctx, arg);
	        } else {
	            value = tryCatch(fn)();
	        }
	        var promiseCreated = ret._popContext();
	        debug.checkForgottenReturns(value, promiseCreated, "Promise.try", ret);
	        ret._resolveFromSyncValue(value);
	        return ret;
	    };

	    Promise.prototype._resolveFromSyncValue = function (value) {
	        if (value === util.errorObj) {
	            this._rejectCallback(value.e, false);
	        } else {
	            this._resolveCallback(value, true);
	        }
	    };
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (Promise, INTERNAL, tryConvertToPromise, debug) {
	    var calledBind = false;
	    var rejectThis = function rejectThis(_, e) {
	        this._reject(e);
	    };

	    var targetRejected = function targetRejected(e, context) {
	        context.promiseRejectionQueued = true;
	        context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
	    };

	    var bindingResolved = function bindingResolved(thisArg, context) {
	        if ((this._bitField & 50397184) === 0) {
	            this._resolveCallback(context.target);
	        }
	    };

	    var bindingRejected = function bindingRejected(e, context) {
	        if (!context.promiseRejectionQueued) this._reject(e);
	    };

	    Promise.prototype.bind = function (thisArg) {
	        if (!calledBind) {
	            calledBind = true;
	            Promise.prototype._propagateFrom = debug.propagateFromFunction();
	            Promise.prototype._boundValue = debug.boundValueFunction();
	        }
	        var maybePromise = tryConvertToPromise(thisArg);
	        var ret = new Promise(INTERNAL);
	        ret._propagateFrom(this, 1);
	        var target = this._target();
	        ret._setBoundTo(maybePromise);
	        if (maybePromise instanceof Promise) {
	            var context = {
	                promiseRejectionQueued: false,
	                promise: ret,
	                target: target,
	                bindingPromise: maybePromise
	            };
	            target._then(INTERNAL, targetRejected, undefined, ret, context);
	            maybePromise._then(bindingResolved, bindingRejected, undefined, ret, context);
	            ret._setOnCancel(maybePromise);
	        } else {
	            ret._resolveCallback(target);
	        }
	        return ret;
	    };

	    Promise.prototype._setBoundTo = function (obj) {
	        if (obj !== undefined) {
	            this._bitField = this._bitField | 2097152;
	            this._boundTo = obj;
	        } else {
	            this._bitField = this._bitField & ~2097152;
	        }
	    };

	    Promise.prototype._isBound = function () {
	        return (this._bitField & 2097152) === 2097152;
	    };

	    Promise.bind = function (thisArg, value) {
	        return Promise.resolve(value).bind(thisArg);
	    };
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, PromiseArray, apiRejection, debug) {
	    var util = __webpack_require__(15);
	    var tryCatch = util.tryCatch;
	    var errorObj = util.errorObj;
	    var async = Promise._async;

	    Promise.prototype["break"] = Promise.prototype.cancel = function () {
	        if (!debug.cancellation()) return this._warn("cancellation is disabled");

	        var promise = this;
	        var child = promise;
	        while (promise._isCancellable()) {
	            if (!promise._cancelBy(child)) {
	                if (child._isFollowing()) {
	                    child._followee().cancel();
	                } else {
	                    child._cancelBranched();
	                }
	                break;
	            }

	            var parent = promise._cancellationParent;
	            if (parent == null || !parent._isCancellable()) {
	                if (promise._isFollowing()) {
	                    promise._followee().cancel();
	                } else {
	                    promise._cancelBranched();
	                }
	                break;
	            } else {
	                if (promise._isFollowing()) promise._followee().cancel();
	                promise._setWillBeCancelled();
	                child = promise;
	                promise = parent;
	            }
	        }
	    };

	    Promise.prototype._branchHasCancelled = function () {
	        this._branchesRemainingToCancel--;
	    };

	    Promise.prototype._enoughBranchesHaveCancelled = function () {
	        return this._branchesRemainingToCancel === undefined || this._branchesRemainingToCancel <= 0;
	    };

	    Promise.prototype._cancelBy = function (canceller) {
	        if (canceller === this) {
	            this._branchesRemainingToCancel = 0;
	            this._invokeOnCancel();
	            return true;
	        } else {
	            this._branchHasCancelled();
	            if (this._enoughBranchesHaveCancelled()) {
	                this._invokeOnCancel();
	                return true;
	            }
	        }
	        return false;
	    };

	    Promise.prototype._cancelBranched = function () {
	        if (this._enoughBranchesHaveCancelled()) {
	            this._cancel();
	        }
	    };

	    Promise.prototype._cancel = function () {
	        if (!this._isCancellable()) return;
	        this._setCancelled();
	        async.invoke(this._cancelPromises, this, undefined);
	    };

	    Promise.prototype._cancelPromises = function () {
	        if (this._length() > 0) this._settlePromises();
	    };

	    Promise.prototype._unsetOnCancel = function () {
	        this._onCancelField = undefined;
	    };

	    Promise.prototype._isCancellable = function () {
	        return this.isPending() && !this._isCancelled();
	    };

	    Promise.prototype.isCancellable = function () {
	        return this.isPending() && !this.isCancelled();
	    };

	    Promise.prototype._doInvokeOnCancel = function (onCancelCallback, internalOnly) {
	        if (util.isArray(onCancelCallback)) {
	            for (var i = 0; i < onCancelCallback.length; ++i) {
	                this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
	            }
	        } else if (onCancelCallback !== undefined) {
	            if (typeof onCancelCallback === "function") {
	                if (!internalOnly) {
	                    var e = tryCatch(onCancelCallback).call(this._boundValue());
	                    if (e === errorObj) {
	                        this._attachExtraTrace(e.e);
	                        async.throwLater(e.e);
	                    }
	                }
	            } else {
	                onCancelCallback._resultCancelled(this);
	            }
	        }
	    };

	    Promise.prototype._invokeOnCancel = function () {
	        var onCancelCallback = this._onCancel();
	        this._unsetOnCancel();
	        async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
	    };

	    Promise.prototype._invokeInternalOnCancel = function () {
	        if (this._isCancellable()) {
	            this._doInvokeOnCancel(this._onCancel(), true);
	            this._unsetOnCancel();
	        }
	    };

	    Promise.prototype._resultCancelled = function () {
	        this.cancel();
	    };
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (Promise) {
	    function returner() {
	        return this.value;
	    }
	    function thrower() {
	        throw this.reason;
	    }

	    Promise.prototype["return"] = Promise.prototype.thenReturn = function (value) {
	        if (value instanceof Promise) value.suppressUnhandledRejections();
	        return this._then(returner, undefined, undefined, { value: value }, undefined);
	    };

	    Promise.prototype["throw"] = Promise.prototype.thenThrow = function (reason) {
	        return this._then(thrower, undefined, undefined, { reason: reason }, undefined);
	    };

	    Promise.prototype.catchThrow = function (reason) {
	        if (arguments.length <= 1) {
	            return this._then(undefined, thrower, undefined, { reason: reason }, undefined);
	        } else {
	            var _reason = arguments[1];
	            var handler = function handler() {
	                throw _reason;
	            };
	            return this.caught(reason, handler);
	        }
	    };

	    Promise.prototype.catchReturn = function (value) {
	        if (arguments.length <= 1) {
	            if (value instanceof Promise) value.suppressUnhandledRejections();
	            return this._then(undefined, returner, undefined, { value: value }, undefined);
	        } else {
	            var _value = arguments[1];
	            if (_value instanceof Promise) _value.suppressUnhandledRejections();
	            var handler = function handler() {
	                return _value;
	            };
	            return this.caught(value, handler);
	        }
	    };
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (Promise) {
	    function PromiseInspection(promise) {
	        if (promise !== undefined) {
	            promise = promise._target();
	            this._bitField = promise._bitField;
	            this._settledValueField = promise._isFateSealed() ? promise._settledValue() : undefined;
	        } else {
	            this._bitField = 0;
	            this._settledValueField = undefined;
	        }
	    }

	    PromiseInspection.prototype._settledValue = function () {
	        return this._settledValueField;
	    };

	    var value = PromiseInspection.prototype.value = function () {
	        if (!this.isFulfilled()) {
	            throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
	        }
	        return this._settledValue();
	    };

	    var reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function () {
	        if (!this.isRejected()) {
	            throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
	        }
	        return this._settledValue();
	    };

	    var isFulfilled = PromiseInspection.prototype.isFulfilled = function () {
	        return (this._bitField & 33554432) !== 0;
	    };

	    var isRejected = PromiseInspection.prototype.isRejected = function () {
	        return (this._bitField & 16777216) !== 0;
	    };

	    var isPending = PromiseInspection.prototype.isPending = function () {
	        return (this._bitField & 50397184) === 0;
	    };

	    var isResolved = PromiseInspection.prototype.isResolved = function () {
	        return (this._bitField & 50331648) !== 0;
	    };

	    PromiseInspection.prototype.isCancelled = function () {
	        return (this._bitField & 8454144) !== 0;
	    };

	    Promise.prototype.__isCancelled = function () {
	        return (this._bitField & 65536) === 65536;
	    };

	    Promise.prototype._isCancelled = function () {
	        return this._target().__isCancelled();
	    };

	    Promise.prototype.isCancelled = function () {
	        return (this._target()._bitField & 8454144) !== 0;
	    };

	    Promise.prototype.isPending = function () {
	        return isPending.call(this._target());
	    };

	    Promise.prototype.isRejected = function () {
	        return isRejected.call(this._target());
	    };

	    Promise.prototype.isFulfilled = function () {
	        return isFulfilled.call(this._target());
	    };

	    Promise.prototype.isResolved = function () {
	        return isResolved.call(this._target());
	    };

	    Promise.prototype.value = function () {
	        return value.call(this._target());
	    };

	    Promise.prototype.reason = function () {
	        var target = this._target();
	        target._unsetRejectionIsUnhandled();
	        return reason.call(target);
	    };

	    Promise.prototype._value = function () {
	        return this._settledValue();
	    };

	    Promise.prototype._reason = function () {
	        this._unsetRejectionIsUnhandled();
	        return this._settledValue();
	    };

	    Promise.PromiseInspection = PromiseInspection;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain) {
	    var util = __webpack_require__(15);
	    var canEvaluate = util.canEvaluate;
	    var tryCatch = util.tryCatch;
	    var errorObj = util.errorObj;
	    var reject;

	    if (true) {
	        if (canEvaluate) {
	            var thenCallback = function thenCallback(i) {
	                return new Function("value", "holder", "                             \n\
	            'use strict';                                                    \n\
	            holder.pIndex = value;                                           \n\
	            holder.checkFulfillment(this);                                   \n\
	            ".replace(/Index/g, i));
	            };

	            var promiseSetter = function promiseSetter(i) {
	                return new Function("promise", "holder", "                           \n\
	            'use strict';                                                    \n\
	            holder.pIndex = promise;                                         \n\
	            ".replace(/Index/g, i));
	            };

	            var generateHolderClass = function generateHolderClass(total) {
	                var props = new Array(total);
	                for (var i = 0; i < props.length; ++i) {
	                    props[i] = "this.p" + (i + 1);
	                }
	                var assignment = props.join(" = ") + " = null;";
	                var cancellationCode = "var promise;\n" + props.map(function (prop) {
	                    return "                                                         \n\
	                promise = " + prop + ";                                      \n\
	                if (promise instanceof Promise) {                            \n\
	                    promise.cancel();                                        \n\
	                }                                                            \n\
	            ";
	                }).join("\n");
	                var passedArguments = props.join(", ");
	                var name = "Holder$" + total;

	                var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
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
	        ";

	                code = code.replace(/\[TheName\]/g, name).replace(/\[TheTotal\]/g, total).replace(/\[ThePassedArguments\]/g, passedArguments).replace(/\[TheProperties\]/g, assignment).replace(/\[CancellationCode\]/g, cancellationCode);

	                return new Function("tryCatch", "errorObj", "Promise", "async", code)(tryCatch, errorObj, Promise, async);
	            };

	            var holderClasses = [];
	            var thenCallbacks = [];
	            var promiseSetters = [];

	            for (var i = 0; i < 8; ++i) {
	                holderClasses.push(generateHolderClass(i + 1));
	                thenCallbacks.push(thenCallback(i + 1));
	                promiseSetters.push(promiseSetter(i + 1));
	            }

	            reject = function reject(reason) {
	                this._reject(reason);
	            };
	        }
	    }

	    Promise.join = function () {
	        var last = arguments.length - 1;
	        var fn;
	        if (last > 0 && typeof arguments[last] === "function") {
	            fn = arguments[last];
	            if (true) {
	                if (last <= 8 && canEvaluate) {
	                    var ret = new Promise(INTERNAL);
	                    ret._captureStackTrace();
	                    var HolderClass = holderClasses[last - 1];
	                    var holder = new HolderClass(fn);
	                    var callbacks = thenCallbacks;

	                    for (var i = 0; i < last; ++i) {
	                        var maybePromise = tryConvertToPromise(arguments[i], ret);
	                        if (maybePromise instanceof Promise) {
	                            maybePromise = maybePromise._target();
	                            var bitField = maybePromise._bitField;
	                            ;
	                            if ((bitField & 50397184) === 0) {
	                                maybePromise._then(callbacks[i], reject, undefined, ret, holder);
	                                promiseSetters[i](maybePromise, holder);
	                                holder.asyncNeeded = false;
	                            } else if ((bitField & 33554432) !== 0) {
	                                callbacks[i].call(ret, maybePromise._value(), holder);
	                            } else if ((bitField & 16777216) !== 0) {
	                                ret._reject(maybePromise._reason());
	                            } else {
	                                ret._cancel();
	                            }
	                        } else {
	                            callbacks[i].call(ret, maybePromise, holder);
	                        }
	                    }

	                    if (!ret._isFateSealed()) {
	                        if (holder.asyncNeeded) {
	                            var domain = getDomain();
	                            if (domain !== null) {
	                                holder.fn = util.domainBind(domain, holder.fn);
	                            }
	                        }
	                        ret._setAsyncGuaranteed();
	                        ret._setOnCancel(holder);
	                    }
	                    return ret;
	                }
	            }
	        }
	        var $_len = arguments.length;var args = new Array($_len);for (var $_i = 0; $_i < $_len; ++$_i) {
	            args[$_i] = arguments[$_i];
	        };
	        if (fn) args.pop();
	        var ret = new PromiseArray(args).promise();
	        return fn !== undefined ? ret.spread(fn) : ret;
	    };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
	    var getDomain = Promise._getDomain;
	    var util = __webpack_require__(15);
	    var tryCatch = util.tryCatch;
	    var errorObj = util.errorObj;
	    var async = Promise._async;

	    function MappingPromiseArray(promises, fn, limit, _filter) {
	        this.constructor$(promises);
	        this._promise._captureStackTrace();
	        var domain = getDomain();
	        this._callback = domain === null ? fn : util.domainBind(domain, fn);
	        this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
	        this._limit = limit;
	        this._inFlight = 0;
	        this._queue = [];
	        async.invoke(this._asyncInit, this, undefined);
	    }
	    util.inherits(MappingPromiseArray, PromiseArray);

	    MappingPromiseArray.prototype._asyncInit = function () {
	        this._init$(undefined, -2);
	    };

	    MappingPromiseArray.prototype._init = function () {};

	    MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
	        var values = this._values;
	        var length = this.length();
	        var preservedValues = this._preservedValues;
	        var limit = this._limit;

	        if (index < 0) {
	            index = index * -1 - 1;
	            values[index] = value;
	            if (limit >= 1) {
	                this._inFlight--;
	                this._drainQueue();
	                if (this._isResolved()) return true;
	            }
	        } else {
	            if (limit >= 1 && this._inFlight >= limit) {
	                values[index] = value;
	                this._queue.push(index);
	                return false;
	            }
	            if (preservedValues !== null) preservedValues[index] = value;

	            var promise = this._promise;
	            var callback = this._callback;
	            var receiver = promise._boundValue();
	            promise._pushContext();
	            var ret = tryCatch(callback).call(receiver, value, index, length);
	            var promiseCreated = promise._popContext();
	            debug.checkForgottenReturns(ret, promiseCreated, preservedValues !== null ? "Promise.filter" : "Promise.map", promise);
	            if (ret === errorObj) {
	                this._reject(ret.e);
	                return true;
	            }

	            var maybePromise = tryConvertToPromise(ret, this._promise);
	            if (maybePromise instanceof Promise) {
	                maybePromise = maybePromise._target();
	                var bitField = maybePromise._bitField;
	                ;
	                if ((bitField & 50397184) === 0) {
	                    if (limit >= 1) this._inFlight++;
	                    values[index] = maybePromise;
	                    maybePromise._proxy(this, (index + 1) * -1);
	                    return false;
	                } else if ((bitField & 33554432) !== 0) {
	                    ret = maybePromise._value();
	                } else if ((bitField & 16777216) !== 0) {
	                    this._reject(maybePromise._reason());
	                    return true;
	                } else {
	                    this._cancel();
	                    return true;
	                }
	            }
	            values[index] = ret;
	        }
	        var totalResolved = ++this._totalResolved;
	        if (totalResolved >= length) {
	            if (preservedValues !== null) {
	                this._filter(values, preservedValues);
	            } else {
	                this._resolve(values);
	            }
	            return true;
	        }
	        return false;
	    };

	    MappingPromiseArray.prototype._drainQueue = function () {
	        var queue = this._queue;
	        var limit = this._limit;
	        var values = this._values;
	        while (queue.length > 0 && this._inFlight < limit) {
	            if (this._isResolved()) return;
	            var index = queue.pop();
	            this._promiseFulfilled(values[index], index);
	        }
	    };

	    MappingPromiseArray.prototype._filter = function (booleans, values) {
	        var len = values.length;
	        var ret = new Array(len);
	        var j = 0;
	        for (var i = 0; i < len; ++i) {
	            if (booleans[i]) ret[j++] = values[i];
	        }
	        ret.length = j;
	        this._resolve(ret);
	    };

	    MappingPromiseArray.prototype.preservedValues = function () {
	        return this._preservedValues;
	    };

	    function map(promises, fn, options, _filter) {
	        if (typeof fn !== "function") {
	            return apiRejection("expecting a function but got " + util.classString(fn));
	        }

	        var limit = 0;
	        if (options !== undefined) {
	            if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object" && options !== null) {
	                if (typeof options.concurrency !== "number") {
	                    return Promise.reject(new TypeError("'concurrency' must be a number but it is " + util.classString(options.concurrency)));
	                }
	                limit = options.concurrency;
	            } else {
	                return Promise.reject(new TypeError("options argument must be an object but it is " + util.classString(options)));
	            }
	        }
	        limit = typeof limit === "number" && isFinite(limit) && limit >= 1 ? limit : 0;
	        return new MappingPromiseArray(promises, fn, limit, _filter).promise();
	    }

	    Promise.prototype.map = function (fn, options) {
	        return map(this, fn, options, null);
	    };

	    Promise.map = function (promises, fn, options, _filter) {
	        return map(promises, fn, options, _filter);
	    };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var cr = Object.create;
	if (cr) {
	    var callerCache = cr(null);
	    var getterCache = cr(null);
	    callerCache[" size"] = getterCache[" size"] = 0;
	}

	module.exports = function (Promise) {
	    var util = __webpack_require__(15);
	    var canEvaluate = util.canEvaluate;
	    var isIdentifier = util.isIdentifier;

	    var getMethodCaller;
	    var getGetter;
	    if (true) {
	        var makeMethodCaller = function makeMethodCaller(methodName) {
	            return new Function("ensureMethod", "                                    \n\
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
	        ".replace(/methodName/g, methodName))(ensureMethod);
	        };

	        var makeGetter = function makeGetter(propertyName) {
	            return new Function("obj", "                                             \n\
	        'use strict';                                                        \n\
	        return obj.propertyName;                                             \n\
	        ".replace("propertyName", propertyName));
	        };

	        var getCompiled = function getCompiled(name, compiler, cache) {
	            var ret = cache[name];
	            if (typeof ret !== "function") {
	                if (!isIdentifier(name)) {
	                    return null;
	                }
	                ret = compiler(name);
	                cache[name] = ret;
	                cache[" size"]++;
	                if (cache[" size"] > 512) {
	                    var keys = Object.keys(cache);
	                    for (var i = 0; i < 256; ++i) {
	                        delete cache[keys[i]];
	                    }cache[" size"] = keys.length - 256;
	                }
	            }
	            return ret;
	        };

	        getMethodCaller = function getMethodCaller(name) {
	            return getCompiled(name, makeMethodCaller, callerCache);
	        };

	        getGetter = function getGetter(name) {
	            return getCompiled(name, makeGetter, getterCache);
	        };
	    }

	    function ensureMethod(obj, methodName) {
	        var fn;
	        if (obj != null) fn = obj[methodName];
	        if (typeof fn !== "function") {
	            var message = "Object " + util.classString(obj) + " has no method '" + util.toString(methodName) + "'";
	            throw new Promise.TypeError(message);
	        }
	        return fn;
	    }

	    function caller(obj) {
	        var methodName = this.pop();
	        var fn = ensureMethod(obj, methodName);
	        return fn.apply(obj, this);
	    }
	    Promise.prototype.call = function (methodName) {
	        var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0));for (var $_i = 1; $_i < $_len; ++$_i) {
	            args[$_i - 1] = arguments[$_i];
	        };
	        if (true) {
	            if (canEvaluate) {
	                var maybeCaller = getMethodCaller(methodName);
	                if (maybeCaller !== null) {
	                    return this._then(maybeCaller, undefined, undefined, args, undefined);
	                }
	            }
	        }
	        args.push(methodName);
	        return this._then(caller, undefined, undefined, args, undefined);
	    };

	    function namedGetter(obj) {
	        return obj[this];
	    }
	    function indexedGetter(obj) {
	        var index = +this;
	        if (index < 0) index = Math.max(0, index + obj.length);
	        return obj[index];
	    }
	    Promise.prototype.get = function (propertyName) {
	        var isIndex = typeof propertyName === "number";
	        var getter;
	        if (!isIndex) {
	            if (canEvaluate) {
	                var maybeGetter = getGetter(propertyName);
	                getter = maybeGetter !== null ? maybeGetter : namedGetter;
	            } else {
	                getter = namedGetter;
	            }
	        } else {
	            getter = indexedGetter;
	        }
	        return this._then(getter, undefined, undefined, propertyName, undefined);
	    };
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
	    var util = __webpack_require__(15);
	    var TypeError = __webpack_require__(22).TypeError;
	    var inherits = __webpack_require__(15).inherits;
	    var errorObj = util.errorObj;
	    var tryCatch = util.tryCatch;
	    var NULL = {};

	    function thrower(e) {
	        setTimeout(function () {
	            throw e;
	        }, 0);
	    }

	    function castPreservingDisposable(thenable) {
	        var maybePromise = tryConvertToPromise(thenable);
	        if (maybePromise !== thenable && typeof thenable._isDisposable === "function" && typeof thenable._getDisposer === "function" && thenable._isDisposable()) {
	            maybePromise._setDisposable(thenable._getDisposer());
	        }
	        return maybePromise;
	    }
	    function dispose(resources, inspection) {
	        var i = 0;
	        var len = resources.length;
	        var ret = new Promise(INTERNAL);
	        function iterator() {
	            if (i >= len) return ret._fulfill();
	            var maybePromise = castPreservingDisposable(resources[i++]);
	            if (maybePromise instanceof Promise && maybePromise._isDisposable()) {
	                try {
	                    maybePromise = tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection), resources.promise);
	                } catch (e) {
	                    return thrower(e);
	                }
	                if (maybePromise instanceof Promise) {
	                    return maybePromise._then(iterator, thrower, null, null, null);
	                }
	            }
	            iterator();
	        }
	        iterator();
	        return ret;
	    }

	    function Disposer(data, promise, context) {
	        this._data = data;
	        this._promise = promise;
	        this._context = context;
	    }

	    Disposer.prototype.data = function () {
	        return this._data;
	    };

	    Disposer.prototype.promise = function () {
	        return this._promise;
	    };

	    Disposer.prototype.resource = function () {
	        if (this.promise().isFulfilled()) {
	            return this.promise().value();
	        }
	        return NULL;
	    };

	    Disposer.prototype.tryDispose = function (inspection) {
	        var resource = this.resource();
	        var context = this._context;
	        if (context !== undefined) context._pushContext();
	        var ret = resource !== NULL ? this.doDispose(resource, inspection) : null;
	        if (context !== undefined) context._popContext();
	        this._promise._unsetDisposable();
	        this._data = null;
	        return ret;
	    };

	    Disposer.isDisposer = function (d) {
	        return d != null && typeof d.resource === "function" && typeof d.tryDispose === "function";
	    };

	    function FunctionDisposer(fn, promise, context) {
	        this.constructor$(fn, promise, context);
	    }
	    inherits(FunctionDisposer, Disposer);

	    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
	        var fn = this.data();
	        return fn.call(resource, resource, inspection);
	    };

	    function maybeUnwrapDisposer(value) {
	        if (Disposer.isDisposer(value)) {
	            this.resources[this.index]._setDisposable(value);
	            return value.promise();
	        }
	        return value;
	    }

	    function ResourceList(length) {
	        this.length = length;
	        this.promise = null;
	        this[length - 1] = null;
	    }

	    ResourceList.prototype._resultCancelled = function () {
	        var len = this.length;
	        for (var i = 0; i < len; ++i) {
	            var item = this[i];
	            if (item instanceof Promise) {
	                item.cancel();
	            }
	        }
	    };

	    Promise.using = function () {
	        var len = arguments.length;
	        if (len < 2) return apiRejection("you must pass at least 2 arguments to Promise.using");
	        var fn = arguments[len - 1];
	        if (typeof fn !== "function") {
	            return apiRejection("expecting a function but got " + util.classString(fn));
	        }
	        var input;
	        var spreadArgs = true;
	        if (len === 2 && Array.isArray(arguments[0])) {
	            input = arguments[0];
	            len = input.length;
	            spreadArgs = false;
	        } else {
	            input = arguments;
	            len--;
	        }
	        var resources = new ResourceList(len);
	        for (var i = 0; i < len; ++i) {
	            var resource = input[i];
	            if (Disposer.isDisposer(resource)) {
	                var disposer = resource;
	                resource = resource.promise();
	                resource._setDisposable(disposer);
	            } else {
	                var maybePromise = tryConvertToPromise(resource);
	                if (maybePromise instanceof Promise) {
	                    resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
	                        resources: resources,
	                        index: i
	                    }, undefined);
	                }
	            }
	            resources[i] = resource;
	        }

	        var reflectedResources = new Array(resources.length);
	        for (var i = 0; i < reflectedResources.length; ++i) {
	            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
	        }

	        var resultPromise = Promise.all(reflectedResources).then(function (inspections) {
	            for (var i = 0; i < inspections.length; ++i) {
	                var inspection = inspections[i];
	                if (inspection.isRejected()) {
	                    errorObj.e = inspection.error();
	                    return errorObj;
	                } else if (!inspection.isFulfilled()) {
	                    resultPromise.cancel();
	                    return;
	                }
	                inspections[i] = inspection.value();
	            }
	            promise._pushContext();

	            fn = tryCatch(fn);
	            var ret = spreadArgs ? fn.apply(undefined, inspections) : fn(inspections);
	            var promiseCreated = promise._popContext();
	            debug.checkForgottenReturns(ret, promiseCreated, "Promise.using", promise);
	            return ret;
	        });

	        var promise = resultPromise.lastly(function () {
	            var inspection = new Promise.PromiseInspection(resultPromise);
	            return dispose(resources, inspection);
	        });
	        resources.promise = promise;
	        promise._setOnCancel(resources);
	        return promise;
	    };

	    Promise.prototype._setDisposable = function (disposer) {
	        this._bitField = this._bitField | 131072;
	        this._disposer = disposer;
	    };

	    Promise.prototype._isDisposable = function () {
	        return (this._bitField & 131072) > 0;
	    };

	    Promise.prototype._getDisposer = function () {
	        return this._disposer;
	    };

	    Promise.prototype._unsetDisposable = function () {
	        this._bitField = this._bitField & ~131072;
	        this._disposer = undefined;
	    };

	    Promise.prototype.disposer = function (fn) {
	        if (typeof fn === "function") {
	            return new FunctionDisposer(fn, this, createContext());
	        }
	        throw new TypeError();
	    };
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, INTERNAL, debug) {
	    var util = __webpack_require__(15);
	    var TimeoutError = Promise.TimeoutError;

	    function HandleWrapper(handle) {
	        this.handle = handle;
	    }

	    HandleWrapper.prototype._resultCancelled = function () {
	        clearTimeout(this.handle);
	    };

	    var afterValue = function afterValue(value) {
	        return delay(+this).thenReturn(value);
	    };
	    var delay = Promise.delay = function (ms, value) {
	        var ret;
	        var handle;
	        if (value !== undefined) {
	            ret = Promise.resolve(value)._then(afterValue, null, null, ms, undefined);
	            if (debug.cancellation() && value instanceof Promise) {
	                ret._setOnCancel(value);
	            }
	        } else {
	            ret = new Promise(INTERNAL);
	            handle = setTimeout(function () {
	                ret._fulfill();
	            }, +ms);
	            if (debug.cancellation()) {
	                ret._setOnCancel(new HandleWrapper(handle));
	            }
	            ret._captureStackTrace();
	        }
	        ret._setAsyncGuaranteed();
	        return ret;
	    };

	    Promise.prototype.delay = function (ms) {
	        return delay(ms, this);
	    };

	    var afterTimeout = function afterTimeout(promise, message, parent) {
	        var err;
	        if (typeof message !== "string") {
	            if (message instanceof Error) {
	                err = message;
	            } else {
	                err = new TimeoutError("operation timed out");
	            }
	        } else {
	            err = new TimeoutError(message);
	        }
	        util.markAsOriginatingFromRejection(err);
	        promise._attachExtraTrace(err);
	        promise._reject(err);

	        if (parent != null) {
	            parent.cancel();
	        }
	    };

	    function successClear(value) {
	        clearTimeout(this.handle);
	        return value;
	    }

	    function failureClear(reason) {
	        clearTimeout(this.handle);
	        throw reason;
	    }

	    Promise.prototype.timeout = function (ms, message) {
	        ms = +ms;
	        var ret, parent;

	        var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
	            if (ret.isPending()) {
	                afterTimeout(ret, message, parent);
	            }
	        }, ms));

	        if (debug.cancellation()) {
	            parent = this.then();
	            ret = parent._then(successClear, failureClear, undefined, handleWrapper, undefined);
	            ret._setOnCancel(handleWrapper);
	        } else {
	            ret = this._then(successClear, failureClear, undefined, handleWrapper, undefined);
	        }

	        return ret;
	    };
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug) {
	    var errors = __webpack_require__(22);
	    var TypeError = errors.TypeError;
	    var util = __webpack_require__(15);
	    var errorObj = util.errorObj;
	    var tryCatch = util.tryCatch;
	    var yieldHandlers = [];

	    function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
	        for (var i = 0; i < yieldHandlers.length; ++i) {
	            traceParent._pushContext();
	            var result = tryCatch(yieldHandlers[i])(value);
	            traceParent._popContext();
	            if (result === errorObj) {
	                traceParent._pushContext();
	                var ret = Promise.reject(errorObj.e);
	                traceParent._popContext();
	                return ret;
	            }
	            var maybePromise = tryConvertToPromise(result, traceParent);
	            if (maybePromise instanceof Promise) return maybePromise;
	        }
	        return null;
	    }

	    function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
	        if (debug.cancellation()) {
	            var internal = new Promise(INTERNAL);
	            var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
	            this._promise = internal.lastly(function () {
	                return _finallyPromise;
	            });
	            internal._captureStackTrace();
	            internal._setOnCancel(this);
	        } else {
	            var promise = this._promise = new Promise(INTERNAL);
	            promise._captureStackTrace();
	        }
	        this._stack = stack;
	        this._generatorFunction = generatorFunction;
	        this._receiver = receiver;
	        this._generator = undefined;
	        this._yieldHandlers = typeof yieldHandler === "function" ? [yieldHandler].concat(yieldHandlers) : yieldHandlers;
	        this._yieldedPromise = null;
	        this._cancellationPhase = false;
	    }
	    util.inherits(PromiseSpawn, Proxyable);

	    PromiseSpawn.prototype._isResolved = function () {
	        return this._promise === null;
	    };

	    PromiseSpawn.prototype._cleanup = function () {
	        this._promise = this._generator = null;
	        if (debug.cancellation() && this._finallyPromise !== null) {
	            this._finallyPromise._fulfill();
	            this._finallyPromise = null;
	        }
	    };

	    PromiseSpawn.prototype._promiseCancelled = function () {
	        if (this._isResolved()) return;
	        var implementsReturn = typeof this._generator["return"] !== "undefined";

	        var result;
	        if (!implementsReturn) {
	            var reason = new Promise.CancellationError("generator .return() sentinel");
	            Promise.coroutine.returnSentinel = reason;
	            this._promise._attachExtraTrace(reason);
	            this._promise._pushContext();
	            result = tryCatch(this._generator["throw"]).call(this._generator, reason);
	            this._promise._popContext();
	        } else {
	            this._promise._pushContext();
	            result = tryCatch(this._generator["return"]).call(this._generator, undefined);
	            this._promise._popContext();
	        }
	        this._cancellationPhase = true;
	        this._yieldedPromise = null;
	        this._continue(result);
	    };

	    PromiseSpawn.prototype._promiseFulfilled = function (value) {
	        this._yieldedPromise = null;
	        this._promise._pushContext();
	        var result = tryCatch(this._generator.next).call(this._generator, value);
	        this._promise._popContext();
	        this._continue(result);
	    };

	    PromiseSpawn.prototype._promiseRejected = function (reason) {
	        this._yieldedPromise = null;
	        this._promise._attachExtraTrace(reason);
	        this._promise._pushContext();
	        var result = tryCatch(this._generator["throw"]).call(this._generator, reason);
	        this._promise._popContext();
	        this._continue(result);
	    };

	    PromiseSpawn.prototype._resultCancelled = function () {
	        if (this._yieldedPromise instanceof Promise) {
	            var promise = this._yieldedPromise;
	            this._yieldedPromise = null;
	            promise.cancel();
	        }
	    };

	    PromiseSpawn.prototype.promise = function () {
	        return this._promise;
	    };

	    PromiseSpawn.prototype._run = function () {
	        this._generator = this._generatorFunction.call(this._receiver);
	        this._receiver = this._generatorFunction = undefined;
	        this._promiseFulfilled(undefined);
	    };

	    PromiseSpawn.prototype._continue = function (result) {
	        var promise = this._promise;
	        if (result === errorObj) {
	            this._cleanup();
	            if (this._cancellationPhase) {
	                return promise.cancel();
	            } else {
	                return promise._rejectCallback(result.e, false);
	            }
	        }

	        var value = result.value;
	        if (result.done === true) {
	            this._cleanup();
	            if (this._cancellationPhase) {
	                return promise.cancel();
	            } else {
	                return promise._resolveCallback(value);
	            }
	        } else {
	            var maybePromise = tryConvertToPromise(value, this._promise);
	            if (!(maybePromise instanceof Promise)) {
	                maybePromise = promiseFromYieldHandler(maybePromise, this._yieldHandlers, this._promise);
	                if (maybePromise === null) {
	                    this._promiseRejected(new TypeError("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(value)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
	                    return;
	                }
	            }
	            maybePromise = maybePromise._target();
	            var bitField = maybePromise._bitField;
	            ;
	            if ((bitField & 50397184) === 0) {
	                this._yieldedPromise = maybePromise;
	                maybePromise._proxy(this, null);
	            } else if ((bitField & 33554432) !== 0) {
	                Promise._async.invoke(this._promiseFulfilled, this, maybePromise._value());
	            } else if ((bitField & 16777216) !== 0) {
	                Promise._async.invoke(this._promiseRejected, this, maybePromise._reason());
	            } else {
	                this._promiseCancelled();
	            }
	        }
	    };

	    Promise.coroutine = function (generatorFunction, options) {
	        if (typeof generatorFunction !== "function") {
	            throw new TypeError("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
	        }
	        var yieldHandler = Object(options).yieldHandler;
	        var PromiseSpawn$ = PromiseSpawn;
	        var stack = new Error().stack;
	        return function () {
	            var generator = generatorFunction.apply(this, arguments);
	            var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler, stack);
	            var ret = spawn.promise();
	            spawn._generator = generator;
	            spawn._promiseFulfilled(undefined);
	            return ret;
	        };
	    };

	    Promise.coroutine.addYieldHandler = function (fn) {
	        if (typeof fn !== "function") {
	            throw new TypeError("expecting a function but got " + util.classString(fn));
	        }
	        yieldHandlers.push(fn);
	    };

	    Promise.spawn = function (generatorFunction) {
	        debug.deprecated("Promise.spawn()", "Promise.coroutine()");
	        if (typeof generatorFunction !== "function") {
	            return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
	        }
	        var spawn = new PromiseSpawn(generatorFunction, this);
	        var ret = spawn.promise();
	        spawn._run(Promise.spawn);
	        return ret;
	    };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise) {
	    var util = __webpack_require__(15);
	    var async = Promise._async;
	    var tryCatch = util.tryCatch;
	    var errorObj = util.errorObj;

	    function spreadAdapter(val, nodeback) {
	        var promise = this;
	        if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
	        var ret = tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
	        if (ret === errorObj) {
	            async.throwLater(ret.e);
	        }
	    }

	    function successAdapter(val, nodeback) {
	        var promise = this;
	        var receiver = promise._boundValue();
	        var ret = val === undefined ? tryCatch(nodeback).call(receiver, null) : tryCatch(nodeback).call(receiver, null, val);
	        if (ret === errorObj) {
	            async.throwLater(ret.e);
	        }
	    }
	    function errorAdapter(reason, nodeback) {
	        var promise = this;
	        if (!reason) {
	            var newReason = new Error(reason + "");
	            newReason.cause = reason;
	            reason = newReason;
	        }
	        var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
	        if (ret === errorObj) {
	            async.throwLater(ret.e);
	        }
	    }

	    Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback, options) {
	        if (typeof nodeback == "function") {
	            var adapter = successAdapter;
	            if (options !== undefined && Object(options).spread) {
	                adapter = spreadAdapter;
	            }
	            this._then(adapter, errorAdapter, undefined, this, nodeback);
	        }
	        return this;
	    };
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (Promise, INTERNAL) {
	    var THIS = {};
	    var util = __webpack_require__(15);
	    var nodebackForPromise = __webpack_require__(29);
	    var withAppended = util.withAppended;
	    var maybeWrapAsError = util.maybeWrapAsError;
	    var canEvaluate = util.canEvaluate;
	    var TypeError = __webpack_require__(22).TypeError;
	    var defaultSuffix = "Async";
	    var defaultPromisified = { __isPromisified__: true };
	    var noCopyProps = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"];
	    var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

	    var defaultFilter = function defaultFilter(name) {
	        return util.isIdentifier(name) && name.charAt(0) !== "_" && name !== "constructor";
	    };

	    function propsFilter(key) {
	        return !noCopyPropsPattern.test(key);
	    }

	    function isPromisified(fn) {
	        try {
	            return fn.__isPromisified__ === true;
	        } catch (e) {
	            return false;
	        }
	    }

	    function hasPromisified(obj, key, suffix) {
	        var val = util.getDataPropertyOrDefault(obj, key + suffix, defaultPromisified);
	        return val ? isPromisified(val) : false;
	    }
	    function checkValid(ret, suffix, suffixRegexp) {
	        for (var i = 0; i < ret.length; i += 2) {
	            var key = ret[i];
	            if (suffixRegexp.test(key)) {
	                var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
	                for (var j = 0; j < ret.length; j += 2) {
	                    if (ret[j] === keyWithoutAsyncSuffix) {
	                        throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", suffix));
	                    }
	                }
	            }
	        }
	    }

	    function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
	        var keys = util.inheritedDataKeys(obj);
	        var ret = [];
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            var value = obj[key];
	            var passesDefaultFilter = filter === defaultFilter ? true : defaultFilter(key, value, obj);
	            if (typeof value === "function" && !isPromisified(value) && !hasPromisified(obj, key, suffix) && filter(key, value, obj, passesDefaultFilter)) {
	                ret.push(key, value);
	            }
	        }
	        checkValid(ret, suffix, suffixRegexp);
	        return ret;
	    }

	    var escapeIdentRegex = function escapeIdentRegex(str) {
	        return str.replace(/([$])/, "\\$");
	    };

	    var makeNodePromisifiedEval;
	    if (true) {
	        var switchCaseArgumentOrder = function switchCaseArgumentOrder(likelyArgumentCount) {
	            var ret = [likelyArgumentCount];
	            var min = Math.max(0, likelyArgumentCount - 1 - 3);
	            for (var i = likelyArgumentCount - 1; i >= min; --i) {
	                ret.push(i);
	            }
	            for (var i = likelyArgumentCount + 1; i <= 3; ++i) {
	                ret.push(i);
	            }
	            return ret;
	        };

	        var argumentSequence = function argumentSequence(argumentCount) {
	            return util.filledRange(argumentCount, "_arg", "");
	        };

	        var parameterDeclaration = function parameterDeclaration(parameterCount) {
	            return util.filledRange(Math.max(parameterCount, 3), "_arg", "");
	        };

	        var parameterCount = function parameterCount(fn) {
	            if (typeof fn.length === "number") {
	                return Math.max(Math.min(fn.length, 1023 + 1), 0);
	            }
	            return 0;
	        };

	        makeNodePromisifiedEval = function makeNodePromisifiedEval(callback, receiver, originalName, fn, _, multiArgs) {
	            var newParameterCount = Math.max(0, parameterCount(fn) - 1);
	            var argumentOrder = switchCaseArgumentOrder(newParameterCount);
	            var shouldProxyThis = typeof callback === "string" || receiver === THIS;

	            function generateCallForArgumentCount(count) {
	                var args = argumentSequence(count).join(", ");
	                var comma = count > 0 ? ", " : "";
	                var ret;
	                if (shouldProxyThis) {
	                    ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
	                } else {
	                    ret = receiver === undefined ? "ret = callback({{args}}, nodeback); break;\n" : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
	                }
	                return ret.replace("{{args}}", args).replace(", ", comma);
	            }

	            function generateArgumentSwitchCase() {
	                var ret = "";
	                for (var i = 0; i < argumentOrder.length; ++i) {
	                    ret += "case " + argumentOrder[i] + ":" + generateCallForArgumentCount(argumentOrder[i]);
	                }

	                ret += "                                                             \n\
	        default:                                                             \n\
	            var args = new Array(len + 1);                                   \n\
	            var i = 0;                                                       \n\
	            for (var i = 0; i < len; ++i) {                                  \n\
	               args[i] = arguments[i];                                       \n\
	            }                                                                \n\
	            args[i] = nodeback;                                              \n\
	            [CodeForCall]                                                    \n\
	            break;                                                           \n\
	        ".replace("[CodeForCall]", shouldProxyThis ? "ret = callback.apply(this, args);\n" : "ret = callback.apply(receiver, args);\n");
	                return ret;
	            }

	            var getFunctionCode = typeof callback === "string" ? "this != null ? this['" + callback + "'] : fn" : "fn";
	            var body = "'use strict';                                                \n\
	        var ret = function (Parameters) {                                    \n\
	            'use strict';                                                    \n\
	            var len = arguments.length;                                      \n\
	            var promise = new Promise(INTERNAL);                             \n\
	            promise._captureStackTrace();                                    \n\
	            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
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
	    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase()).replace("[GetFunctionCode]", getFunctionCode);
	            body = body.replace("Parameters", parameterDeclaration(newParameterCount));
	            return new Function("Promise", "fn", "receiver", "withAppended", "maybeWrapAsError", "nodebackForPromise", "tryCatch", "errorObj", "notEnumerableProp", "INTERNAL", body)(Promise, fn, receiver, withAppended, maybeWrapAsError, nodebackForPromise, util.tryCatch, util.errorObj, util.notEnumerableProp, INTERNAL);
	        };
	    }

	    function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
	        var defaultThis = function () {
	            return this;
	        }();
	        var method = callback;
	        if (typeof method === "string") {
	            callback = fn;
	        }
	        function promisified() {
	            var _receiver = receiver;
	            if (receiver === THIS) _receiver = this;
	            var promise = new Promise(INTERNAL);
	            promise._captureStackTrace();
	            var cb = typeof method === "string" && this !== defaultThis ? this[method] : callback;
	            var fn = nodebackForPromise(promise, multiArgs);
	            try {
	                cb.apply(_receiver, withAppended(arguments, fn));
	            } catch (e) {
	                promise._rejectCallback(maybeWrapAsError(e), true, true);
	            }
	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
	            return promise;
	        }
	        util.notEnumerableProp(promisified, "__isPromisified__", true);
	        return promisified;
	    }

	    var makeNodePromisified = canEvaluate ? makeNodePromisifiedEval : makeNodePromisifiedClosure;

	    function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
	        var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
	        var methods = promisifiableMethods(obj, suffix, suffixRegexp, filter);

	        for (var i = 0, len = methods.length; i < len; i += 2) {
	            var key = methods[i];
	            var fn = methods[i + 1];
	            var promisifiedKey = key + suffix;
	            if (promisifier === makeNodePromisified) {
	                obj[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
	            } else {
	                var promisified = promisifier(fn, function () {
	                    return makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
	                });
	                util.notEnumerableProp(promisified, "__isPromisified__", true);
	                obj[promisifiedKey] = promisified;
	            }
	        }
	        util.toFastProperties(obj);
	        return obj;
	    }

	    function promisify(callback, receiver, multiArgs) {
	        return makeNodePromisified(callback, receiver, undefined, callback, null, multiArgs);
	    }

	    Promise.promisify = function (fn, options) {
	        if (typeof fn !== "function") {
	            throw new TypeError("expecting a function but got " + util.classString(fn));
	        }
	        if (isPromisified(fn)) {
	            return fn;
	        }
	        options = Object(options);
	        var receiver = options.context === undefined ? THIS : options.context;
	        var multiArgs = !!options.multiArgs;
	        var ret = promisify(fn, receiver, multiArgs);
	        util.copyDescriptors(fn, ret, propsFilter);
	        return ret;
	    };

	    Promise.promisifyAll = function (target, options) {
	        if (typeof target !== "function" && (typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object") {
	            throw new TypeError("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
	        }
	        options = Object(options);
	        var multiArgs = !!options.multiArgs;
	        var suffix = options.suffix;
	        if (typeof suffix !== "string") suffix = defaultSuffix;
	        var filter = options.filter;
	        if (typeof filter !== "function") filter = defaultFilter;
	        var promisifier = options.promisifier;
	        if (typeof promisifier !== "function") promisifier = makeNodePromisified;

	        if (!util.isIdentifier(suffix)) {
	            throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
	        }

	        var keys = util.inheritedDataKeys(target);
	        for (var i = 0; i < keys.length; ++i) {
	            var value = target[keys[i]];
	            if (keys[i] !== "constructor" && util.isClass(value)) {
	                promisifyAll(value.prototype, suffix, filter, promisifier, multiArgs);
	                promisifyAll(value, suffix, filter, promisifier, multiArgs);
	            }
	        }

	        return promisifyAll(target, suffix, filter, promisifier, multiArgs);
	    };
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, PromiseArray, tryConvertToPromise, apiRejection) {
	    var util = __webpack_require__(15);
	    var isObject = util.isObject;
	    var es5 = __webpack_require__(16);
	    var Es6Map;
	    if (typeof Map === "function") Es6Map = Map;

	    var mapToEntries = function () {
	        var index = 0;
	        var size = 0;

	        function extractEntry(value, key) {
	            this[index] = value;
	            this[index + size] = key;
	            index++;
	        }

	        return function mapToEntries(map) {
	            size = map.size;
	            index = 0;
	            var ret = new Array(map.size * 2);
	            map.forEach(extractEntry, ret);
	            return ret;
	        };
	    }();

	    var entriesToMap = function entriesToMap(entries) {
	        var ret = new Es6Map();
	        var length = entries.length / 2 | 0;
	        for (var i = 0; i < length; ++i) {
	            var key = entries[length + i];
	            var value = entries[i];
	            ret.set(key, value);
	        }
	        return ret;
	    };

	    function PropertiesPromiseArray(obj) {
	        var isMap = false;
	        var entries;
	        if (Es6Map !== undefined && obj instanceof Es6Map) {
	            entries = mapToEntries(obj);
	            isMap = true;
	        } else {
	            var keys = es5.keys(obj);
	            var len = keys.length;
	            entries = new Array(len * 2);
	            for (var i = 0; i < len; ++i) {
	                var key = keys[i];
	                entries[i] = obj[key];
	                entries[i + len] = key;
	            }
	        }
	        this.constructor$(entries);
	        this._isMap = isMap;
	        this._init$(undefined, isMap ? -6 : -3);
	    }
	    util.inherits(PropertiesPromiseArray, PromiseArray);

	    PropertiesPromiseArray.prototype._init = function () {};

	    PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
	        this._values[index] = value;
	        var totalResolved = ++this._totalResolved;
	        if (totalResolved >= this._length) {
	            var val;
	            if (this._isMap) {
	                val = entriesToMap(this._values);
	            } else {
	                val = {};
	                var keyOffset = this.length();
	                for (var i = 0, len = this.length(); i < len; ++i) {
	                    val[this._values[i + keyOffset]] = this._values[i];
	                }
	            }
	            this._resolve(val);
	            return true;
	        }
	        return false;
	    };

	    PropertiesPromiseArray.prototype.shouldCopyValues = function () {
	        return false;
	    };

	    PropertiesPromiseArray.prototype.getActualLength = function (len) {
	        return len >> 1;
	    };

	    function props(promises) {
	        var ret;
	        var castValue = tryConvertToPromise(promises);

	        if (!isObject(castValue)) {
	            return apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
	        } else if (castValue instanceof Promise) {
	            ret = castValue._then(Promise.props, undefined, undefined, undefined, undefined);
	        } else {
	            ret = new PropertiesPromiseArray(castValue).promise();
	        }

	        if (castValue instanceof Promise) {
	            ret._propagateFrom(castValue, 2);
	        }
	        return ret;
	    }

	    Promise.prototype.props = function () {
	        return props(this);
	    };

	    Promise.props = function (promises) {
	        return props(promises);
	    };
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection) {
	    var util = __webpack_require__(15);

	    var raceLater = function raceLater(promise) {
	        return promise.then(function (array) {
	            return race(array, promise);
	        });
	    };

	    function race(promises, parent) {
	        var maybePromise = tryConvertToPromise(promises);

	        if (maybePromise instanceof Promise) {
	            return raceLater(maybePromise);
	        } else {
	            promises = util.asArray(promises);
	            if (promises === null) return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
	        }

	        var ret = new Promise(INTERNAL);
	        if (parent !== undefined) {
	            ret._propagateFrom(parent, 3);
	        }
	        var fulfill = ret._fulfill;
	        var reject = ret._reject;
	        for (var i = 0, len = promises.length; i < len; ++i) {
	            var val = promises[i];

	            if (val === undefined && !(i in promises)) {
	                continue;
	            }

	            Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
	        }
	        return ret;
	    }

	    Promise.race = function (promises) {
	        return race(promises, undefined);
	    };

	    Promise.prototype.race = function () {
	        return race(this, undefined);
	    };
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
	    var getDomain = Promise._getDomain;
	    var util = __webpack_require__(15);
	    var tryCatch = util.tryCatch;

	    function ReductionPromiseArray(promises, fn, initialValue, _each) {
	        this.constructor$(promises);
	        var domain = getDomain();
	        this._fn = domain === null ? fn : util.domainBind(domain, fn);
	        if (initialValue !== undefined) {
	            initialValue = Promise.resolve(initialValue);
	            initialValue._attachCancellationCallback(this);
	        }
	        this._initialValue = initialValue;
	        this._currentCancellable = null;
	        if (_each === INTERNAL) {
	            this._eachValues = Array(this._length);
	        } else if (_each === 0) {
	            this._eachValues = null;
	        } else {
	            this._eachValues = undefined;
	        }
	        this._promise._captureStackTrace();
	        this._init$(undefined, -5);
	    }
	    util.inherits(ReductionPromiseArray, PromiseArray);

	    ReductionPromiseArray.prototype._gotAccum = function (accum) {
	        if (this._eachValues !== undefined && this._eachValues !== null && accum !== INTERNAL) {
	            this._eachValues.push(accum);
	        }
	    };

	    ReductionPromiseArray.prototype._eachComplete = function (value) {
	        if (this._eachValues !== null) {
	            this._eachValues.push(value);
	        }
	        return this._eachValues;
	    };

	    ReductionPromiseArray.prototype._init = function () {};

	    ReductionPromiseArray.prototype._resolveEmptyArray = function () {
	        this._resolve(this._eachValues !== undefined ? this._eachValues : this._initialValue);
	    };

	    ReductionPromiseArray.prototype.shouldCopyValues = function () {
	        return false;
	    };

	    ReductionPromiseArray.prototype._resolve = function (value) {
	        this._promise._resolveCallback(value);
	        this._values = null;
	    };

	    ReductionPromiseArray.prototype._resultCancelled = function (sender) {
	        if (sender === this._initialValue) return this._cancel();
	        if (this._isResolved()) return;
	        this._resultCancelled$();
	        if (this._currentCancellable instanceof Promise) {
	            this._currentCancellable.cancel();
	        }
	        if (this._initialValue instanceof Promise) {
	            this._initialValue.cancel();
	        }
	    };

	    ReductionPromiseArray.prototype._iterate = function (values) {
	        this._values = values;
	        var value;
	        var i;
	        var length = values.length;
	        if (this._initialValue !== undefined) {
	            value = this._initialValue;
	            i = 0;
	        } else {
	            value = Promise.resolve(values[0]);
	            i = 1;
	        }

	        this._currentCancellable = value;

	        if (!value.isRejected()) {
	            for (; i < length; ++i) {
	                var ctx = {
	                    accum: null,
	                    value: values[i],
	                    index: i,
	                    length: length,
	                    array: this
	                };
	                value = value._then(gotAccum, undefined, undefined, ctx, undefined);
	            }
	        }

	        if (this._eachValues !== undefined) {
	            value = value._then(this._eachComplete, undefined, undefined, this, undefined);
	        }
	        value._then(completed, completed, undefined, value, this);
	    };

	    Promise.prototype.reduce = function (fn, initialValue) {
	        return reduce(this, fn, initialValue, null);
	    };

	    Promise.reduce = function (promises, fn, initialValue, _each) {
	        return reduce(promises, fn, initialValue, _each);
	    };

	    function completed(valueOrReason, array) {
	        if (this.isFulfilled()) {
	            array._resolve(valueOrReason);
	        } else {
	            array._reject(valueOrReason);
	        }
	    }

	    function reduce(promises, fn, initialValue, _each) {
	        if (typeof fn !== "function") {
	            return apiRejection("expecting a function but got " + util.classString(fn));
	        }
	        var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
	        return array.promise();
	    }

	    function gotAccum(accum) {
	        this.accum = accum;
	        this.array._gotAccum(accum);
	        var value = tryConvertToPromise(this.value, this.array._promise);
	        if (value instanceof Promise) {
	            this.array._currentCancellable = value;
	            return value._then(gotValue, undefined, undefined, this, undefined);
	        } else {
	            return gotValue.call(this, value);
	        }
	    }

	    function gotValue(value) {
	        var array = this.array;
	        var promise = array._promise;
	        var fn = tryCatch(array._fn);
	        promise._pushContext();
	        var ret;
	        if (array._eachValues !== undefined) {
	            ret = fn.call(promise._boundValue(), value, this.index, this.length);
	        } else {
	            ret = fn.call(promise._boundValue(), this.accum, value, this.index, this.length);
	        }
	        if (ret instanceof Promise) {
	            array._currentCancellable = ret;
	        }
	        var promiseCreated = promise._popContext();
	        debug.checkForgottenReturns(ret, promiseCreated, array._eachValues !== undefined ? "Promise.each" : "Promise.reduce", promise);
	        return ret;
	    }
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, PromiseArray, debug) {
	    var PromiseInspection = Promise.PromiseInspection;
	    var util = __webpack_require__(15);

	    function SettledPromiseArray(values) {
	        this.constructor$(values);
	    }
	    util.inherits(SettledPromiseArray, PromiseArray);

	    SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
	        this._values[index] = inspection;
	        var totalResolved = ++this._totalResolved;
	        if (totalResolved >= this._length) {
	            this._resolve(this._values);
	            return true;
	        }
	        return false;
	    };

	    SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
	        var ret = new PromiseInspection();
	        ret._bitField = 33554432;
	        ret._settledValueField = value;
	        return this._promiseResolved(index, ret);
	    };
	    SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
	        var ret = new PromiseInspection();
	        ret._bitField = 16777216;
	        ret._settledValueField = reason;
	        return this._promiseResolved(index, ret);
	    };

	    Promise.settle = function (promises) {
	        debug.deprecated(".settle()", ".reflect()");
	        return new SettledPromiseArray(promises).promise();
	    };

	    Promise.prototype.settle = function () {
	        return Promise.settle(this);
	    };
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (Promise, PromiseArray, apiRejection) {
	    var util = __webpack_require__(15);
	    var RangeError = __webpack_require__(22).RangeError;
	    var AggregateError = __webpack_require__(22).AggregateError;
	    var isArray = util.isArray;
	    var CANCELLATION = {};

	    function SomePromiseArray(values) {
	        this.constructor$(values);
	        this._howMany = 0;
	        this._unwrap = false;
	        this._initialized = false;
	    }
	    util.inherits(SomePromiseArray, PromiseArray);

	    SomePromiseArray.prototype._init = function () {
	        if (!this._initialized) {
	            return;
	        }
	        if (this._howMany === 0) {
	            this._resolve([]);
	            return;
	        }
	        this._init$(undefined, -5);
	        var isArrayResolved = isArray(this._values);
	        if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
	            this._reject(this._getRangeError(this.length()));
	        }
	    };

	    SomePromiseArray.prototype.init = function () {
	        this._initialized = true;
	        this._init();
	    };

	    SomePromiseArray.prototype.setUnwrap = function () {
	        this._unwrap = true;
	    };

	    SomePromiseArray.prototype.howMany = function () {
	        return this._howMany;
	    };

	    SomePromiseArray.prototype.setHowMany = function (count) {
	        this._howMany = count;
	    };

	    SomePromiseArray.prototype._promiseFulfilled = function (value) {
	        this._addFulfilled(value);
	        if (this._fulfilled() === this.howMany()) {
	            this._values.length = this.howMany();
	            if (this.howMany() === 1 && this._unwrap) {
	                this._resolve(this._values[0]);
	            } else {
	                this._resolve(this._values);
	            }
	            return true;
	        }
	        return false;
	    };
	    SomePromiseArray.prototype._promiseRejected = function (reason) {
	        this._addRejected(reason);
	        return this._checkOutcome();
	    };

	    SomePromiseArray.prototype._promiseCancelled = function () {
	        if (this._values instanceof Promise || this._values == null) {
	            return this._cancel();
	        }
	        this._addRejected(CANCELLATION);
	        return this._checkOutcome();
	    };

	    SomePromiseArray.prototype._checkOutcome = function () {
	        if (this.howMany() > this._canPossiblyFulfill()) {
	            var e = new AggregateError();
	            for (var i = this.length(); i < this._values.length; ++i) {
	                if (this._values[i] !== CANCELLATION) {
	                    e.push(this._values[i]);
	                }
	            }
	            if (e.length > 0) {
	                this._reject(e);
	            } else {
	                this._cancel();
	            }
	            return true;
	        }
	        return false;
	    };

	    SomePromiseArray.prototype._fulfilled = function () {
	        return this._totalResolved;
	    };

	    SomePromiseArray.prototype._rejected = function () {
	        return this._values.length - this.length();
	    };

	    SomePromiseArray.prototype._addRejected = function (reason) {
	        this._values.push(reason);
	    };

	    SomePromiseArray.prototype._addFulfilled = function (value) {
	        this._values[this._totalResolved++] = value;
	    };

	    SomePromiseArray.prototype._canPossiblyFulfill = function () {
	        return this.length() - this._rejected();
	    };

	    SomePromiseArray.prototype._getRangeError = function (count) {
	        var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
	        return new RangeError(message);
	    };

	    SomePromiseArray.prototype._resolveEmptyArray = function () {
	        this._reject(this._getRangeError(0));
	    };

	    function some(promises, howMany) {
	        if ((howMany | 0) !== howMany || howMany < 0) {
	            return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
	        }
	        var ret = new SomePromiseArray(promises);
	        var promise = ret.promise();
	        ret.setHowMany(howMany);
	        ret.init();
	        return promise;
	    }

	    Promise.some = function (promises, howMany) {
	        return some(promises, howMany);
	    };

	    Promise.prototype.some = function (howMany) {
	        return some(this, howMany);
	    };

	    Promise._SomePromiseArray = SomePromiseArray;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (Promise, INTERNAL) {
	    var PromiseMap = Promise.map;

	    Promise.prototype.filter = function (fn, options) {
	        return PromiseMap(this, fn, options, INTERNAL);
	    };

	    Promise.filter = function (promises, fn, options) {
	        return PromiseMap(promises, fn, options, INTERNAL);
	    };
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (Promise, INTERNAL) {
	    var PromiseReduce = Promise.reduce;
	    var PromiseAll = Promise.all;

	    function promiseAllThis() {
	        return PromiseAll(this);
	    }

	    function PromiseMapSeries(promises, fn) {
	        return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
	    }

	    Promise.prototype.each = function (fn) {
	        return PromiseReduce(this, fn, INTERNAL, 0)._then(promiseAllThis, undefined, undefined, this, undefined);
	    };

	    Promise.prototype.mapSeries = function (fn) {
	        return PromiseReduce(this, fn, INTERNAL, INTERNAL);
	    };

	    Promise.each = function (promises, fn) {
	        return PromiseReduce(promises, fn, INTERNAL, 0)._then(promiseAllThis, undefined, undefined, promises, undefined);
	    };

	    Promise.mapSeries = PromiseMapSeries;
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (Promise) {
	    var SomePromiseArray = Promise._SomePromiseArray;
	    function any(promises) {
	        var ret = new SomePromiseArray(promises);
	        var promise = ret.promise();
	        ret.setHowMany(1);
	        ret.setUnwrap();
	        ret.init();
	        return promise;
	    }

	    Promise.any = function (promises) {
	        return any(promises);
	    };

	    Promise.prototype.any = function () {
	        return any(this);
	    };
	};

/***/ },
/* 51 */
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
/* 52 */
/***/ function(module, exports) {

	'use strict';

	// Get repository by path

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	window.getRepoByPath = function getRepoByPath(path) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = resources.repositories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var repo = _step.value;

	            if (repo.owner + '/' + repo.title === path) {
	                return repo;
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
	};

	// Get key by value
	window.getKey = function getKey(obj, value) {
	    for (var prop in obj) {
	        if (obj.hasOwnProperty(prop)) {
	            if (obj[prop] === value) {
	                return prop;
	            }
	        }
	    }
	};

	// Display error message
	window.displayError = function displayError(e) {
	    alert(e.mesage);

	    throw e;
	};

	// Get source
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

	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = (resources.collaborators || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var collaborator = _step2.value;

	                        if (!collaborator) {
	                            continue;
	                        }

	                        if (typedName == collaborator.name) {
	                            return '<span class="collaborator-reference"><img src="' + collaborator.avatar + '" />' + (collaborator.displayName || collaborator.name) + '</span>';
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
	        $element.toggleClass('collapsing', true);

	        setTimeout(function () {
	            $element.css('height', expandedHeight + 'px');

	            setTimeout(function () {
	                $element.removeAttr('style');
	                $element.toggleClass('expanded', true);
	                $element.toggleClass('collapsed', false);
	                $element.toggleClass('collapsing', false);
	            }, 500);
	        }, 50);
	    } else {
	        $element.css('height', expandedHeight + 'px');
	        $element.toggleClass('expanding', true);

	        setTimeout(function () {
	            $element.css('height', collapsedHeight + 'px');

	            setTimeout(function () {
	                $element.removeAttr('style');
	                $element.toggleClass('expanded', false);
	                $element.toggleClass('collapsed', true);
	                $element.toggleClass('expanding', false);
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
/* 53 */
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
	        key: 'get',
	        value: function get(name, resource, key) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = resources[resource][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _resource = _step.value;

	                    if (key && _resource[key] === name || !key && _resource === name) {
	                        return _resource;
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
	        }
	    }, {
	        key: 'getConstant',
	        value: function getConstant(name, constant) {
	            if (!constant[name]) {
	                return;
	            }

	            return name;
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

	        /**
	         * Updates the indices of every resource item
	         *
	         * @param {String} resource
	         */

	    }, {
	        key: 'updateResourceIndices',
	        value: function updateResourceIndices(resource) {
	            for (var i in resources[resource]) {
	                var r = resources[resource][i];

	                if ((typeof r === 'undefined' ? 'undefined' : _typeof(r)) === 'object') {
	                    r.index = i;
	                }
	            }
	        }
	    }, {
	        key: 'sortResource',
	        value: function sortResource(resource) {
	            switch (resource) {
	                case 'milestones':
	                    resources.milestones.sort(function (a, b) {
	                        a = a.getEndDate() || 0;
	                        b = b.getEndDate() || 0;

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

	            this.updateResourceIndices(resource);
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
/* 54 */
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

	        /**
	         * Adds a repository to the "latest" setting
	         *
	         * @param {String} user
	         * @param {String} repo
	         */

	    }, {
	        key: 'addToLatestRepositories',
	        value: function addToLatestRepositories(user, repo) {
	            var latest = SettingsHelper.getLatestRepositories();

	            // The repo was already in the "latest" list
	            if (latest.indexOf(user + '/' + repo) > -1) {
	                return;
	            }

	            latest.unshift(user + '/' + repo);

	            // If there is more than 3 repos in the list, remove the last one
	            if (latest.length > 3) {
	                latest.splice(-1, 1);
	            }

	            SettingsHelper.set('repositories', 'latest', latest.join(':'));
	        }

	        /**
	         * Clears the latest repositories
	         */

	    }, {
	        key: 'clearLatestRepositories',
	        value: function clearLatestRepositories() {
	            return SettingsHelper.set('repositories', 'latest', '');
	        }

	        /**
	         * Gets an array of the latest repositories
	         *
	         * @returns {Array} Latest repositories
	         */

	    }, {
	        key: 'getLatestRepositories',
	        value: function getLatestRepositories() {
	            var latest = SettingsHelper.get('repositories', 'latest') || '';

	            if (!latest) {
	                return [];
	            }

	            return latest.split(':');
	        }
	    }]);

	    return SettingsHelper;
	}();

	module.exports = SettingsHelper;

/***/ },
/* 55 */
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
	                InputHelper.poke();
	            });

	            // Register keyup events
	            $(document).keyup(function (e) {
	                switch (e.which) {
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
	                idleTimer = 0;

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
/* 56 */
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
/* 57 */
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
/* 58 */
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
	      ctx.strokeStyle = null;
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
	      ctx.fillStyle = null;
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ApiHelper = __webpack_require__(60);

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
	                            reject(new Error(e.responseJSON ? e.responseJSON.message : e.statusText));
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
	            var _this6 = this;

	            return this.get('/user/repos').then(function (repos) {
	                _this6.processRepositories(repos);

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
	            var _this7 = this;

	            if (this.isSpectating()) {
	                return Promise.resolve([]);
	            }

	            return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/collaborators').then(function (collaborators) {
	                _this7.processCollaborators(collaborators);
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
	            var _this8 = this;

	            return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues', 'state=all', true).then(function (issues) {
	                _this8.processIssues(issues);

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
	            var _this9 = this;

	            if (!labelCache) {
	                return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels').then(function (labels) {
	                    labelCache = labels || [];

	                    return _this9.ensureMandatoryLabels();
	                }).then(function () {
	                    return Promise.resolve(labelCache);
	                });
	            } else {
	                return Promise.resolve(labelCache);
	            }
	        }

	        /**
	         * Gets issue columns
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getColumns',
	        value: function getColumns() {
	            var _this10 = this;

	            return this.getLabels().then(function (labels) {
	                _this10.processColumns(labels);

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
	         * Gets versions
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getVersions',
	        value: function getVersions() {
	            var _this11 = this;

	            return this.getLabels().then(function (labels) {
	                _this11.processVersions(labels);

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

	            return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/milestones').then(function (milestones) {
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
	        key: 'addColumn',
	        value: function addColumn(column) {
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
	            var _this13 = this;

	            issue.deleted = true;
	            deletedIssuesCache.push(issue);

	            resources.issues.splice(issue.index, 1);

	            // Update the issue with the "deleted" label
	            return this.updateIssue(issue)

	            // Get all attachments
	            .then(function () {
	                return _this13.getIssueAttachments(issue);
	            })

	            // Delete attachments one by one
	            .then(function (attachments) {
	                var deleteNextAttachment = function deleteNextAttachment() {
	                    var attachment = attachments.pop();

	                    if (attachment) {
	                        return _this13.removeIssueAttachment(issue, attachment).then(function () {
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
	                return _this13.getIssueComments(issue);
	            })

	            // Delete all comments one by one
	            .then(function (comments) {
	                var deleteNextComment = function deleteNextComment() {
	                    var comment = comments.pop();

	                    if (comment) {
	                        return _this13.removeIssueComment(issue, comment).then(function () {
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
	            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/type:' + ISSUE_TYPES[index]);
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
	            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/estimate:' + ISSUE_ESTIMATES[index]);
	        }

	        /**
	         * Removes issue column
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeColumn',
	        value: function removeColumn(index) {
	            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/column:' + window.resources.columns[index]);
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
	        key: 'updateColumn',
	        value: function updateColumn(column, previousName) {
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
	         * Process issue columns
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processColumns',
	        value: function processColumns(labels) {
	            window.resources.columns = [];

	            window.resources.columns.push('to do');

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = labels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var label = _step4.value;

	                    var index = label.name.indexOf('column:');

	                    if (index > -1) {
	                        var name = label.name.replace('column:', '');

	                        window.resources.columns.push(name);
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

	            window.resources.columns.push('done');
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

	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = collaborators[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var collaborator = _step5.value;

	                    window.resources.collaborators.push({
	                        name: collaborator.login,
	                        avatar: collaborator.avatar_url
	                    });
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
	         * Process issues
	         *
	         * @param {Array} issues
	         */

	    }, {
	        key: 'processIssues',
	        value: function processIssues(issues) {
	            window.resources.issues = [];

	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;

	            try {
	                for (var _iterator6 = issues[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var gitHubIssue = _step6.value;

	                    var issue = new Issue();

	                    issue.title = gitHubIssue.title;
	                    issue.description = gitHubIssue.body;
	                    issue.id = gitHubIssue.number;
	                    issue.reporter = gitHubIssue.user.login;
	                    issue.createdAt = gitHubIssue.created_at;
	                    issue.closedAt = gitHubIssue.closed_at;

	                    if (gitHubIssue.assignee) {
	                        issue.assignee = gitHubIssue.assignee.login;
	                    }

	                    issue.labels = issue.labels || [];

	                    var _iteratorNormalCompletion7 = true;
	                    var _didIteratorError7 = false;
	                    var _iteratorError7 = undefined;

	                    try {
	                        for (var _iterator7 = gitHubIssue.labels[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                            var label = _step7.value;

	                            var typeIndex = label.name.indexOf('type:');
	                            var tagIndex = label.name.indexOf('tag:');
	                            var priorityIndex = label.name.indexOf('priority:');
	                            var estimateIndex = label.name.indexOf('estimate:');
	                            var versionIndex = label.name.indexOf('version:');
	                            var columnIndex = label.name.indexOf('column:');

	                            if (label.name == 'deleted') {
	                                issue.deleted = true;
	                            } else if (typeIndex > -1) {
	                                var name = label.name.replace('type:', '');

	                                issue.type = name;
	                            } else if (tagIndex > -1) {
	                                var _name = label.name.replace('tag:', '');

	                                if (_name) {
	                                    issue.tags.push(_name);
	                                }
	                            } else if (versionIndex > -1) {
	                                var _name2 = label.name.replace('version:', '');

	                                issue.version = _name2;
	                            } else if (estimateIndex > -1) {
	                                var _name3 = label.name.replace('estimate:', '');

	                                issue.estimate = _name3;
	                            } else if (priorityIndex > -1) {
	                                var _name4 = label.name.replace('priority:', '');

	                                issue.priority = _name4;
	                            } else if (columnIndex > -1) {
	                                var _name5 = label.name.replace('column:', '');

	                                issue.column = _name5;
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

	                    if (gitHubIssue.state == 'closed') {
	                        issue.column = 'done';
	                    }

	                    if (gitHubIssue.milestone) {
	                        issue.milestone = gitHubIssue.milestone.title;
	                    }

	                    issue.index = parseInt(gitHubIssue.number) - 1;

	                    if (issue.deleted) {
	                        deletedIssuesCache.push(issue);
	                    } else {
	                        window.resources.issues[issue.index] = issue;
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
	            var assignee = issue.getAssignee();

	            if (assignee) {
	                gitHubIssue.assignee = assignee.name;
	            } else {
	                gitHubIssue.assignee = '';
	            }

	            // State
	            gitHubIssue.state = issue.column == 'done' ? 'closed' : 'open';

	            // Milestone
	            if (issue.getMilestone()) {
	                gitHubIssue.milestone = issue.getMilestone().id;
	            } else {
	                gitHubIssue.milestone = null;
	            }

	            // Tags
	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;

	            try {
	                for (var _iterator8 = issue.tags[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var tag = _step8.value;

	                    gitHubIssue.labels.push('tag:' + tag);
	                }

	                // Type
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

	            if (issue.getType()) {
	                gitHubIssue.labels.push('type:' + issue.getType());
	            }

	            // Version
	            var version = resources.versions[issue.version];

	            if (version) {
	                gitHubIssue.labels.push('version:' + version);
	            }

	            // Estimate
	            if (issue.getEstimate()) {
	                gitHubIssue.labels.push('estimate:' + issue.getEstimate());
	            }

	            // Priority
	            if (issue.getPriority()) {
	                gitHubIssue.labels.push('priority:' + issue.getPriority());
	            }

	            // Column
	            if (issue.column && issue.column != 'to do' && issue.column != 'done') {
	                gitHubIssue.labels.push('column:' + issue.column);
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
	         *
	         * @return {Promise} Promise
	         */

	    }, {
	        key: 'addIssueComment',
	        value: function addIssueComment(issue, text) {
	            return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/comments', {
	                body: text
	            });
	        }

	        /**
	         * Update issue comment
	         *
	         * @param {Issue} issue
	         * @param {Object} comment
	         *
	         * @return {Promise} Promise
	         */

	    }, {
	        key: 'updateIssueComment',
	        value: function updateIssueComment(issue, comment) {
	            if (!comment || !comment.text) {
	                return this.removeIssueComment(issue, comment);
	            }

	            return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/comments/' + comment.index, {
	                body: comment.text
	            });
	        }

	        /**
	         * Remove issue comment
	         *
	         * @param {Issue} issue
	         * @param {Object} comment
	         *
	         * @return {Promise} Promise
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
	            return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/comments').then(function (gitHubComments) {
	                var comments = [];

	                var _iteratorNormalCompletion9 = true;
	                var _didIteratorError9 = false;
	                var _iteratorError9 = undefined;

	                try {
	                    for (var _iterator9 = gitHubComments[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                        var gitHubComment = _step9.value;

	                        var comment = {
	                            collaborator: gitHubComment.user.login,
	                            text: gitHubComment.body,
	                            index: gitHubComment.id
	                        };

	                        comments.push(comment);
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

	                return Promise.resolve(comments);
	            });
	        }
	    }]);

	    return GitHubApi;
	}(ApiHelper);

	module.exports = GitHubApi;

/***/ },
/* 60 */
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
	            return Router.query('token') !== null;
	        }

	        /**
	         * Check whether the connection to the source has been made
	         */

	    }, {
	        key: 'checkConnection',
	        value: function checkConnection() {
	            var _this = this;

	            var userPromise = void 0;

	            // Make sure user is logged in
	            if (!User.getCurrent()) {
	                spinner('Connecting to ' + localStorage.getItem('source'));

	                debug.log('Getting user...', this);

	                userPromise = this.getUser().then(function (user) {
	                    if (!user) {
	                        return Promise.reject(new Error('User could not be retrieved'));
	                    }

	                    debug.log('Found user "' + user.name + '"', _this);

	                    localStorage.setItem('user', user.name);

	                    return Promise.resolve();
	                });
	            } else {
	                userPromise = Promise.resolve();
	            }

	            // Make sure repositories are loaded
	            return userPromise.then(function () {
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
	         * Gets tags
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getTags',
	        value: function getTags() {
	            window.resources.tags = [];

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = resources.issues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var issue = _step.value;
	                    var _iteratorNormalCompletion2 = true;
	                    var _didIteratorError2 = false;
	                    var _iteratorError2 = undefined;

	                    try {
	                        for (var _iterator2 = issue.tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                            var tag = _step2.value;

	                            if (resources.tags.indexOf(tag) > -1 || !tag) {
	                                continue;
	                            }

	                            resources.tags.push(tag);
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

	            return Promise.resolve();
	        }

	        /**
	         * Gets issue columns
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getColumns',
	        value: function getColumns() {
	            window.resources.columns = [];

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
	         * Adds issue column
	         *
	         * @param {String} column
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'addColumn',
	        value: function addColumn(column) {
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
	         * Removes issue column
	         *
	         * @param {Number} index
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'removeColumn',
	        value: function removeColumn(index) {
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
	         * Updates issue column
	         *
	         * @param {Number} index
	         * @param {String} column
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'updateColumn',
	        value: function updateColumn(index, column) {
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

	                case 'columns':
	                    return this.removeColumn(index);

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

	                case 'columns':
	                    return this.addColumn(item);

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
	                case 'columns':
	                    return this.updateColumn(item, identifier);

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
	                case 'collaborators':
	                    return this.getCollaborators();

	                case 'tags':
	                    return this.getTags();

	                case 'columns':
	                    return this.getColumns();

	                case 'milestones':
	                    return this.getMilestones().then(function () {
	                        ResourceHelper.sortResource('milestones');

	                        return Promise.resolve();
	                    });

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

	            return get('columns').then(function () {
	                return get('collaborators');
	            }).then(function () {
	                return get('milestones');
	            }).then(function () {
	                return get('versions');
	            }).then(function () {
	                return get('issues');
	            }).then(function () {
	                return get('tags');
	            });
	        }
	    }]);

	    return ApiHelper;
	}();

	module.exports = ApiHelper;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ApiHelper = __webpack_require__(60);

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
	                readonlyResources: ['columns']
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

	                            spinner(false);
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
	                                }).catch(function (e) {
	                                    reject(e);
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
	         * Gets repos
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getRepositories',
	        value: function getRepositories() {
	            var _this6 = this;

	            return new Promise(function (resolve, reject) {
	                _this6.get('1.0/user/repositories').then(function (repositories) {
	                    _this6.processRepositories(repositories);

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
	            var _this7 = this;

	            return this.get('2.0/teams/' + this.getRepositoryOwner() + '/members').then(function (res) {
	                if (Array.isArray(res)) {
	                    res = res[0];
	                }

	                _this7.processMembers(res.values);

	                return Promise.resolve();
	            }).catch(function (e) {
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
	            var _this8 = this;

	            return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues', 'issues', false).then(function (res) {
	                _this8.processIssues(res);

	                return Promise.resolve();
	            });
	        }

	        /**
	         * Gets issue columns
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getColumns',
	        value: function getColumns() {
	            resources.columns = ['to do', 'in progress', 'done'];

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
	            var _this9 = this;

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

	                        var apiUrl = 'https://api.bitbucket.org/2.0/repositories/' + _this9.getRepositoryOwner() + '/' + _this9.getRepositoryName() + '/issues/' + issue.id + '/attachments/' + obj.name;

	                        var attachment = new Attachment({
	                            name: obj.name,
	                            isRedirect: true,
	                            url: apiUrl + '?access_token=' + _this9.getApiToken()
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
	         * Gets versions
	         *
	         * @returns {Promise} promise
	         */

	    }, {
	        key: 'getVersions',
	        value: function getVersions() {
	            var _this10 = this;

	            return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/versions').then(function (versions) {
	                _this10.processVersions(versions);

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
	            var _this11 = this;

	            return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/milestones').then(function (milestones) {
	                _this11.processMilestones(milestones);

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
	            var _this12 = this;

	            return new Promise(function (callback) {
	                _this12.put('1.0/repositories/' + _this12.getRepositoryOwner() + '/' + _this12.getRepositoryName() + '/collaborators/' + collaborator).then(function () {
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
	        key: 'addColumn',
	        value: function addColumn(column) {
	            var _this13 = this;

	            return new Promise(function (callback) {
	                _this13.post('1.0/repositories/' + _this13.getRepositoryOwner() + '/' + _this13.getRepositoryName() + '/labels', {
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
	            var _this14 = this;

	            var milestone = resources.milestones[index];

	            return new Promise(function (callback) {
	                _this14.delete('1.0/repositories/' + _this14.getRepositoryOwner() + '/' + _this14.getRepositoryName() + '/issues/milestones/' + milestone.id).then(function () {
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
	            var _this15 = this;

	            return new Promise(function (callback) {
	                _this15.put('1.0/repositories/' + _this15.getRepositoryOwner() + '/' + _this15.getRepositoryName() + '/issues/milestones/' + milestone.id, _this15.convertMilestone(milestone)).then(function () {
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
	        key: 'updateColumn',
	        value: function updateColumn(column, previousName) {
	            var _this16 = this;

	            return new Promise(function (callback) {
	                _this16.patch('1.0/repositories/' + _this16.getRepositoryOwner() + '/' + _this16.getRepositoryName() + '/labels/column:' + previousName, {
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
	         * Process issue columns
	         *
	         * @param {Array} labels
	         */

	    }, {
	        key: 'processColumns',
	        value: function processColumns(labels) {
	            window.resources.columns = [];

	            window.resources.columns.push('to do');

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = labels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var label = _step2.value;

	                    var index = label.name.indexOf('column:');

	                    if (index > -1) {
	                        var name = label.name.replace('column:', '');

	                        window.resources.columns.push(name);
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

	            window.resources.columns.push('done');
	        }

	        /**
	         * Process collaborators
	         *
	         * @param {Array} collaborators
	         */

	    }, {
	        key: 'processMembers',
	        value: function processMembers(collaborators) {
	            resources.collaborators = [];

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = (collaborators || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var collaborator = _step3.value;

	                    resources.collaborators.push({
	                        id: collaborator.username,
	                        name: collaborator.username,
	                        displayName: collaborator.display_name,
	                        avatar: collaborator.links.avatar.href
	                    });
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
	         * Process issues
	         *
	         * @param {Array} issues
	         */

	    }, {
	        key: 'processIssues',
	        value: function processIssues(issues) {
	            window.resources.issues = [];

	            var indexCounter = 0;

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = issues[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var bitBucketIssue = _step4.value;

	                    var issue = new Issue();

	                    issue.title = bitBucketIssue.title;
	                    issue.setDescriptionWithMetaData(bitBucketIssue.content);
	                    issue.id = bitBucketIssue.local_id;
	                    issue.createdAt = bitBucketIssue.utc_created_on;

	                    if (bitBucketIssue.status == 'closed') {
	                        issue.closedAt = bitBucketIssue.utc_last_updated;
	                    }

	                    issue.reporter = bitBucketIssue.reported_by.username;

	                    if (bitBucketIssue.responsible) {
	                        issue.assignee = bitBucketIssue.responsible.username;
	                    }

	                    // Remap issue type names
	                    switch (bitBucketIssue.metadata.kind) {
	                        case 'enhancement':
	                            bitBucketIssue.metadata.kind = 'improvement';
	                            break;

	                        case 'proposal':
	                            bitBucketIssue.metadata.kind = 'new feature';
	                            break;
	                    }

	                    // Remep issue status names
	                    switch (bitBucketIssue.status) {
	                        case 'new':
	                            bitBucketIssue.status = 'to do';
	                            break;

	                        case 'open':
	                            bitBucketIssue.status = 'in progress';
	                            break;

	                        case 'closed':
	                            bitBucketIssue.status = 'done';
	                            break;
	                    }

	                    // Remap issue priority names
	                    switch (bitBucketIssue.priority) {
	                        case 'trivial':
	                            bitBucketIssue.priority = 'low';
	                            break;

	                        case 'minor':
	                            bitBucketIssue.priority = 'medium';
	                            break;

	                        case 'major':
	                            bitBucketIssue.priority = 'high';
	                            break;

	                        case 'critical':
	                            bitBucketIssue.priority = 'blocker';
	                            break;
	                    }

	                    // Clean up milestone name
	                    var milestoneDateRegex = /{% (start|end)Date: (\d+) %}/g;

	                    bitBucketIssue.metadata.milestone = (bitBucketIssue.metadata.milestone || '').replace(milestoneDateRegex, '');

	                    issue.priority = bitBucketIssue.priority;
	                    issue.milestone = bitBucketIssue.metadata.milestone;
	                    issue.type = bitBucketIssue.metadata.kind;
	                    issue.version = bitBucketIssue.metadata.version;
	                    issue.column = bitBucketIssue.status;

	                    issue.index = indexCounter;

	                    window.resources.issues[issue.index] = issue;

	                    indexCounter++;
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

	            // Column
	            var column = issue.column;

	            switch (column) {
	                case 'to do':
	                    column = 'new';
	                    break;

	                case 'in progress':
	                    column = 'open';
	                    break;

	                case 'done':
	                    column = 'closed';
	                    break;
	            }

	            bitBucketIssue.status = column;

	            // Milestone
	            var milestone = issue.getMilestone();

	            if (milestone) {
	                bitBucketIssue.milestone = milestone.originalName;
	            } else {
	                bitBucketIssue.milestone = '';
	            }

	            // Type
	            var issueType = issue.getType();

	            switch (issueType) {
	                case 'improvement':
	                    issueType = 'enhancement';
	                    break;

	                case 'new feature':
	                    issueType = 'proposal';
	                    break;
	            }

	            bitBucketIssue.kind = issueType;

	            // Version
	            var version = issue.getVersion();

	            bitBucketIssue.version = version;

	            // Tags
	            if (issue.tags.length > 0) {
	                bitBucketIssue.content += '{% tags:' + issue.tags.join(',') + ' %}';
	            }

	            // Estimate
	            var issueEstimate = issue.getEstimate();
	            var estimateString = '{% estimate:' + issueEstimate + ' %}';

	            bitBucketIssue.content += estimateString;

	            // Priority
	            var issuePriority = issue.getPriority();

	            switch (issuePriority) {
	                case 'low':
	                    issuePriority = 'trivial';
	                    break;

	                case 'medium':
	                    issuePriority = 'minor';
	                    break;

	                case 'high':
	                    issuePriority = 'major';
	                    break;
	            }

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

	                var _iteratorNormalCompletion5 = true;
	                var _didIteratorError5 = false;
	                var _iteratorError5 = undefined;

	                try {
	                    for (var _iterator5 = bitBucketComments[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                        var bitBucketComment = _step5.value;

	                        var comment = {
	                            collaborator: bitBucketComment.author_info.username,
	                            text: bitBucketComment.content,
	                            index: bitBucketComment.comment_id
	                        };

	                        comments.push(comment);
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

	                return Promise.resolve(comments);
	            });
	        }
	    }]);

	    return BitBucketApi;
	}(ApiHelper);

	module.exports = BitBucketApi;

/***/ },
/* 62 */
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

	        // Sanity check (no properties should be a number)
	        for (var key in properties) {
	            if (!isNaN(properties[key])) {
	                properties[key] = null;
	            }

	            if (typeof properties[key] === 'undefined') {
	                properties[key] = null;
	            }
	        }

	        // Essential properties
	        this.title = properties.title || 'New issue';
	        this.description = properties.description || '';
	        this.id = properties.id;
	        this.reporter = properties.reporter;

	        // Optional properties
	        this.column = properties.column || 'to do';
	        this.type = properties.type || 'task';
	        this.tags = properties.tags || [];
	        this.priority = properties.priority || 'low';
	        this.estimate = properties.estimate || '15m';
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

	            var tagRegex = /{% (\w+):([^%]+) %}/g;
	            var nextMatch = tagRegex.exec(description);

	            while (nextMatch != null) {
	                var key = nextMatch[1];
	                var value = nextMatch[2];

	                if (key && value) {
	                    switch (key) {
	                        case 'column':
	                            this.column = value;
	                            break;

	                        case 'type':
	                            this.type = value;
	                            break;

	                        case 'tags':
	                            this.tags = value.split(',');
	                            break;

	                        case 'priority':
	                            this.priority = value;
	                            break;

	                        case 'estimate':
	                            this.estimate = value;
	                            break;

	                        case 'version':
	                            this.version = value;
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
	            return ResourceHelper.get(this.column, 'columns');
	        }

	        /**
	         * Gets type
	         *
	         * @returns {String} Type name
	         */

	    }, {
	        key: 'getType',
	        value: function getType() {
	            return ResourceHelper.getConstant(this.type, ISSUE_TYPES);
	        }

	        /**
	         * Gets priority
	         *
	         * @returns {String} Priority name
	         */

	    }, {
	        key: 'getPriority',
	        value: function getPriority() {
	            return ResourceHelper.getConstant(this.priority, ISSUE_PRIORITIES);
	        }

	        /**
	         * Gets version
	         *
	         * @returns {String} Version name
	         */

	    }, {
	        key: 'getVersion',
	        value: function getVersion() {
	            return ResourceHelper.get(this.version, 'versions');
	        }

	        /**
	         * Gets milestone
	         *
	         * @returns {Milestone} Milestone object
	         */

	    }, {
	        key: 'getMilestone',
	        value: function getMilestone() {
	            return ResourceHelper.get(this.milestone, 'milestones', 'title');
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
	            return ResourceHelper.get(this.assignee, 'collaborators', 'name');
	        }

	        /**
	         * Gets reporter
	         *
	         * @returns {Collaborator} Collaborator object
	         */

	    }, {
	        key: 'getReporter',
	        value: function getReporter() {
	            return ResourceHelper.get(this.reporter, 'collaborators', 'name');
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
	            return ResourceHelper.getConstant(this.estimate, ISSUE_ESTIMATES);
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
	         * Check if issue is closed
	         *
	         * @returns {Boolean} closed
	         */

	    }, {
	        key: 'isClosed',
	        value: function isClosed() {
	            return this.column == 'done';
	        }
	    }]);

	    return Issue;
	}();

	module.exports = Issue;

/***/ },
/* 63 */
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
	         * Gets a changelog printout
	         *
	         * @returns {String} Changelog
	         */

	    }, {
	        key: 'getChangeLog',
	        value: function getChangeLog() {
	            var log = '';

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.getIssues()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var issue = _step2.value;

	                    log += '- [' + issue.type + '] ' + issue.title + '  \n';
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

	            return log;
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

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = (resources.issues || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var issue = _step3.value;

	                    if (!issue) {
	                        continue;
	                    }

	                    if (issue.milestone === this.title || this.title === 'Unassigned' && !issue.milestone) {
	                        issues[issues.length] = issue;
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

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = this.getIssues()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var issue = _step4.value;

	                    if (!issue) {
	                        continue;
	                    }

	                    total += issue.getEstimatedHours();
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

	            return total;
	        }

	        /**
	         * Gets remaining hours
	         *
	         * @returns {Number} Hours
	         */

	    }, {
	        key: 'getIncompletedHours',
	        value: function getIncompletedHours() {
	            var hours = 0;

	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = this.getIssues()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var issue = _step5.value;

	                    if (!issue.isClosed()) {
	                        hours += issue.getEstimatedHours();
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

	            return hours;
	        }

	        /**
	         * Returns whether this milestone is overdue
	         *
	         * @returns {Boolean} Overdue
	         */

	    }, {
	        key: 'isOverdue',
	        value: function isOverdue() {
	            if (!this.getEndDate() || this.isClosed()) {
	                return false;
	            }

	            return this.getEndDate() < new Date();
	        }

	        /**
	         * Returns whether this milestone is closed
	         *
	         * @returns {Boolean} Is closed
	         */

	    }, {
	        key: 'isClosed',
	        value: function isClosed() {
	            var issues = this.getIssues();

	            if (issues.length < 1) {
	                return false;
	            }

	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;

	            try {
	                for (var _iterator6 = issues[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var issue = _step6.value;

	                    if (!issue.isClosed()) {
	                        return false;
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

	            return true;
	        }

	        /**
	         * Gets a list of incomplete high priority issues
	         *
	         * @returns {Array} Issues
	         */

	    }, {
	        key: 'getIncompletedIssues',
	        value: function getIncompletedIssues() {
	            var issues = [];

	            var _iteratorNormalCompletion7 = true;
	            var _didIteratorError7 = false;
	            var _iteratorError7 = undefined;

	            try {
	                for (var _iterator7 = this.getIssues()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                    var issue = _step7.value;

	                    if (!issue.isClosed()) {
	                        issues.push(issue);
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

	            return issues;
	        }

	        /**
	         * Gets a list of completed issues
	         *
	         * @returns {Array} Issues
	         */

	    }, {
	        key: 'getCompletedIssues',
	        value: function getCompletedIssues() {
	            var issues = [];

	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;

	            try {
	                for (var _iterator8 = this.getIssues()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var issue = _step8.value;

	                    if (issue.isClosed()) {
	                        issues.push(issue);
	                    }
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

	            return issues;
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

	            var _iteratorNormalCompletion9 = true;
	            var _didIteratorError9 = false;
	            var _iteratorError9 = undefined;

	            try {
	                for (var _iterator9 = this.getIssues()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                    var issue = _step9.value;

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

	            var _iteratorNormalCompletion10 = true;
	            var _didIteratorError10 = false;
	            var _iteratorError10 = undefined;

	            try {
	                for (var _iterator10 = this.getRemainingIssuesAtDay(day)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                    var issue = _step10.value;

	                    hours += issue.getEstimatedHours();
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

	            return hours;
	        }
	    }]);

	    return Milestone;
	}();

	module.exports = Milestone;

/***/ },
/* 64 */
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
/* 65 */
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
/* 66 */
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
/* 67 */
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

	        _this.template = __webpack_require__(68);

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
	                title: 'Milestones',
	                url: '/milestones/',
	                icon: 'map-signs'
	            });

	            links.push({
	                title: 'Kanban',
	                url: '/board/kanban/all',
	                icon: 'columns'
	            });

	            links.push({
	                title: 'List',
	                url: '/board/list/all',
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
	            var latest = SettingsHelper.getLatestRepositories();

	            this.togglePanel('/repositories/', 'repository-list', function ($content) {
	                var filterRepositories = function filterRepositories(query) {
	                    $content.find('.repository-editor').each(function (i, element) {
	                        var title = $(element).find('.header > h4').text() || '';
	                        var isMatch = title.toLowerCase().indexOf(query.toLowerCase()) > -1;

	                        $(element).toggle(!query || query.length < 2 || isMatch);
	                    });
	                };

	                _.append($content.empty(), _.div({ class: 'repository-list-actions' }, _.div({ class: 'repository-list-action search' }, _.input({ class: 'selectable', type: 'text', placeholder: 'Search in repositories...' }).on('change keyup paste', function (e) {
	                    var query = e.target.value;

	                    filterRepositories(query);
	                }), _.span({ class: 'fa fa-search' }))), _.div({ class: 'repository-list-items' }, _.if(latest.length > 0, _.h4('Latest'), _.each(latest, function (i, repositoryPath) {
	                    return new RepositoryEditor({
	                        model: getRepoByPath(repositoryPath),
	                        overrideUrl: overrideUrl
	                    }).$element;
	                }), _.h4('All')), _.each(window.resources.repositories, function (i, repository) {
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
	         * @param {String} title
	         */

	    }, {
	        key: 'onClickLink',
	        value: function onClickLink(url, title) {
	            this.cleanUpClasses();
	            this.$element.find('.obscure .content').empty();

	            if (!ApiHelper.getRepositoryName()) {
	                this.toggleRepositoriesList(true, url);
	            } else {
	                var fullUrl = this.getFullUrl(url);

	                if (fullUrl != Router.url) {
	                    spinner(title);

	                    location.hash = fullUrl;
	                }

	                this.slideIn();
	            }
	        }

	        /**
	         * Slide navbar in
	         */

	    }, {
	        key: 'slideIn',
	        value: function slideIn() {
	            if (Router.url) {
	                var url = Router.url.replace('/' + ApiHelper.getRepositoryOwner(), '').replace('/' + ApiHelper.getRepositoryName(), '');

	                if (Router.params.resource) {
	                    url = url.replace(Router.params.resource, '');
	                }

	                this.$element.find('button.active').removeClass('active');
	                this.$element.find('button[data-url*="' + url + '"]').toggleClass('active', true);

	                this.$element.toggleClass('out', false);

	                $('.navbar .obscure .content').empty();
	            }
	        }

	        /**
	         * Event: Click about button
	         */

	    }, {
	        key: 'onClickAbout',
	        value: function onClickAbout() {
	            alert('Samoosa v' + app.version);
	        }
	    }]);

	    return Navbar;
	}(View);

	module.exports = Navbar;

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function Navbar() {
	    var _this = this;

	    return _.div({ class: 'navbar' }, _.div({ class: 'backdrop' }).click(function () {
	        _this.hide();
	    }), _.div({ class: 'obscure' }, _.div({ class: 'content' })), _.div({ class: 'buttons' }, _.button({ class: 'btn-logo', title: 'About Samoosa' }).click(function () {
	        _this.onClickAbout();
	    }), _.each(this.getLinks(), function (i, link) {
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
	                    _this.onClickLink(link.url, link.title);
	                }
	            });
	        }
	    })));
	};

/***/ },
/* 69 */
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

	        _this.template = __webpack_require__(70);

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
/* 70 */
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TagBar = function (_View) {
	    _inherits(TagBar, _View);

	    function TagBar(params) {
	        _classCallCheck(this, TagBar);

	        var _this = _possibleConstructorReturn(this, (TagBar.__proto__ || Object.getPrototypeOf(TagBar)).call(this, params));

	        _this.template = __webpack_require__(72);

	        _this.fetch();
	        return _this;
	    }

	    /**
	     * Event: Click tag
	     *
	     * @param {String} name
	     */


	    _createClass(TagBar, [{
	        key: 'onClickTag',
	        value: function onClickTag(name) {
	            var basePath = '/' + Router.params.user + '/' + Router.params.repository + '/board/' + Router.params.mode + '/';

	            Router.go(basePath + name, true);

	            this.applyTag();

	            this.render();
	        }

	        /**
	         * Applies selected filters
	         */

	    }, {
	        key: 'applyTag',
	        value: function applyTag() {
	            var issueViews = ViewHelper.getAll('IssueEditor');
	            var tag = Router.params.tag;

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = issueViews[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var issueView = _step.value;

	                    var isValid = tag == 'all' || issueView.model.tags.indexOf(tag) > -1;

	                    issueView.$element.toggle(isValid);
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
	         * Reload
	         */

	    }], [{
	        key: 'reload',
	        value: function reload() {
	            return ApiHelper.getTags().then(function () {
	                var view = ViewHelper.get('TagBar');

	                if (view) {
	                    view.render();
	                } else {
	                    view = new TagBar();
	                }

	                if (!view.$element.parent().hasClass('workspace-panel')) {
	                    _.find('.workspace-panel').append(view.$element);
	                }
	            });
	        }
	    }]);

	    return TagBar;
	}(View);

	module.exports = TagBar;

/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    var activeTab = Router.params.tag || 'all';
	    var basePath = '/' + Router.params.user + '/' + Router.params.repository + '/board/' + Router.params.mode + '/';

	    return _.div({ class: 'tag-bar tabbed-container vertical' }, _.if(resources.tags.length > 0, _.div({ class: 'tabs' }, _.a({ href: '#' + basePath + 'all', class: 'tab' + (activeTab == 'all' ? ' active' : '') }, 'all tags').click(function (e) {
	        e.preventDefault();
	        _this.onClickTag('all');
	    }), _.each(resources.tags || [], function (i, tag) {
	        return _.a({ href: '#' + basePath + tag, class: 'tab' + (activeTab == tag ? ' active' : '') }, tag).click(function (e) {
	            e.preventDefault();
	            _this.onClickTag(tag);
	        });
	    }))));
	};

/***/ },
/* 73 */
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

	        _this.template = __webpack_require__(74);

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
	            var assignee = this.model.getAssignee();

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
	            var value = $property.val() || $property.data('value');

	            if (useCheckboxes) {
	                var $checkbox = this.$element.find('*[data-property="' + key + '"]').siblings('.multi-edit-toggle');

	                if (!$checkbox[0].checked) {
	                    return null;
	                }
	            }

	            if (!isNaN(value) || value == null || typeof value === 'undefined') {
	                value = '';
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
	            this.model.tags = this.getProperty('tags').split(',');
	            this.model.priority = this.getProperty('priority');
	            this.model.assignee = this.getProperty('assignee');
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
	            this.render();

	            /*
	            // Update all fields
	            this.setProperty('title', this.model.title);
	            this.setProperty('type', this.model.type);
	            this.setProperty('tags', this.model.tags.join(','));
	            this.setProperty('priority', this.model.priority);
	            this.setProperty('assignee', this.model.assignee);
	            this.setProperty('version', this.model.version);
	            this.setProperty('description', this.model.description);
	            this.setProperty('estimate', this.model.estimate);
	             // Update data type attribute
	            this.$element.attr('data-type', ISSUE_TYPES[this.model.type]);
	             // Update avatar image
	            this.$element.find('.header .assignee-avatar').html(
	                this.getAssigneeAvatar()
	            );
	            
	            // Update type indicator
	            this.$element.find('.type-indicator').replaceWith(this.getTypeIndicator());
	             // Update priority indicator
	            this.$element.find('.priority-indicator').replaceWith(this.getPriorityIndicator());
	            */
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
	                TagBar.reload();

	                _this3.$element.toggleClass('loading', false);
	            });
	        }

	        /**
	         * Event: Click add tag
	         */

	    }, {
	        key: 'onClickAddTag',
	        value: function onClickAddTag(e) {
	            var _this4 = this;

	            var $btn = $(e.currentTarget);

	            $('.add-tag-dialog').each(function (i, element) {
	                var $dialog = $(element);

	                $dialog.siblings('.btn-add-tag').show();
	                $dialog.remove();
	            });

	            // Add tag dialog
	            var $dialog = _.div({ class: 'add-tag-dialog' }, _.input({ type: 'text', class: 'add-tag-name' }), _.button({ class: 'btn-add-tag-confirm' }, _.span({ class: 'fa fa-check' })).click(function (e) {
	                var val = $(e.currentTarget).siblings('.add-tag-name').val();
	                var $input = $(e.currentTarget).parents('.input');

	                $input.data('value', _this4.model.tags.concat([val]).join(','));

	                _this4.onChange();
	            }), _.button({ class: 'btn-add-tag-cancel' }, _.span({ class: 'fa fa-remove' })).click(function (e) {
	                $dialog.remove();
	                $btn.show();
	            }), _.div({ class: 'add-tag-suggestions' }, _.each(resources.tags, function (i, tag) {
	                if (_this4.model.tags.indexOf(tag) > -1) {
	                    return;
	                }

	                return _.button({ class: 'btn-add-tag-suggestion' }, tag).click(function () {
	                    var $input = $(e.currentTarget).parents('.input');

	                    $input.data('value', _this4.model.tags.concat([tag]).join(','));

	                    _this4.onChange();
	                });
	            })));

	            $btn.hide();

	            $btn.after($dialog);
	        }

	        /**
	         * Event: Click the dragging handle
	         */

	    }, {
	        key: 'onClickDragHandle',
	        value: function onClickDragHandle(e) {
	            var _this5 = this;

	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            if (!e.shiftKey) {
	                // Set class on board container
	                $('.board-container').toggleClass('dragging', true);

	                // Set element
	                var $element = this.$element;

	                if (this.usingMultiEdit()) {
	                    $element = $('.issue-editor.selected');
	                } else {}
	                //IssueEditor.cancelMultiSelect();


	                // Apply temporary CSS properties
	                $element.each(function (i, element) {
	                    $(element).css({
	                        top: _this5.$element.offset().top,
	                        left: _this5.$element.offset().left,
	                        width: _this5.$element.outerWidth(),
	                        height: _this5.$element.outerHeight(),
	                        'pointer-events': 'none',
	                        'z-index': 999,
	                        'margin-top': i * 15 + 'px'
	                    });
	                });

	                // Buffer the offset between mouse cursor and element position
	                var offset = {
	                    x: this.$element.offset().left - e.pageX,
	                    y: this.$element.offset().top - e.pageY
	                };

	                // Add absolute positioning afterwards to allow getting proper offset
	                $element.css({
	                    position: 'absolute'
	                });

	                // Column mouse hover events
	                $('.milestone-viewer .columns .column').on('mouseenter', function () {
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
	                    _this5.onReleaseDragHandle(e);
	                });
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
	            $('.milestone-viewer .columns .column.hovering .body').first().prepend($element);

	            // Unregister column mouse events and unset hovering state
	            $('.milestone-viewer .columns .column').off('mouseenter').off('mouseleave').toggleClass('hovering', false);

	            // Update model data with new information based on DOM location
	            $element.each(function (i) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = ViewHelper.getAll('IssueEditor')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var view = _step.value;

	                        if (this == view.$element[0]) {
	                            view.model.milestone = view.$element.parents('.milestone-viewer').attr('data-title');
	                            view.model.column = view.$element.parents('.column').attr('data-name');

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
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = ViewHelper.getAll('IssueEditor')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var view = _step2.value;

	                        if (view != this && view.$element.hasClass('selected')) {
	                            view.model.type = this.getProperty('type', true) || view.model.type;
	                            view.model.priority = this.getProperty('priority', true) || view.model.priority;
	                            view.model.assignee = this.getProperty('assignee', true) || view.model.assignee;
	                            view.model.version = this.getProperty('version', true) || view.model.version;
	                            view.model.estimate = this.getProperty('estimate', true) || view.model.estimate;
	                            view.model.tags = this.getProperty('tags', true).split(',');

	                            view.updateDOM();
	                            view.sync();
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

	            if (!e.shiftKey && !$(this).parents('.issue-editor').hasClass('selected')) {
	                $(this).toggleClass('hidden', true).siblings('.rendered').toggleClass('hidden', true).siblings('.edit').toggleClass('hidden', false).focus().select();
	            }
	        }

	        /**
	         * Event: Click the comment button
	         */

	    }, {
	        key: 'onSubmitComment',
	        value: function onSubmitComment() {
	            var _this6 = this;

	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            var text = this.$element.find('.add-comment textarea').val();

	            if (!text) {
	                return;
	            }

	            this.$element.toggleClass('loading', true);

	            this.$element.find('.add-comment textarea').val('');

	            ApiHelper.addIssueComment(this.model, text).then(function () {
	                _this6.getComments();
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

	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;

	                try {
	                    for (var _iterator3 = (resources.collaborators || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                        var collaborator = _step3.value;

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
	            if (e.shiftKey) {
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
	            var _this7 = this;

	            if (!confirm('Are you sure you want to remove the attachment "' + attachment.name + '"?')) {
	                return;
	            }

	            ApiHelper.removeIssueAttachment(this.model, attachment).then(function () {
	                modal(false);
	                _this7.getAttachments();
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
	            var _this8 = this;

	            modal(_.div({ class: 'modal-attachment' }, _.img({ src: attachment.getURL() }), _.div({ class: 'modal-attachment-toolbar' }, _.button({ class: 'btn-remove-attachment' }, _.span({ class: 'fa fa-trash' })).click(function () {
	                _this8.onClickRemoveAttachment(attachment);
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

	                    this.attachFiles(blob);
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
	            var files = e.target.files;

	            if (files && files.length > 0) {
	                this.attachFiles(files);
	            }
	        }

	        /**
	         * Attaches a file
	         *
	         * @param {Array} files
	         */

	    }, {
	        key: 'attachFiles',
	        value: function attachFiles(files) {
	            var _this9 = this;

	            if (files instanceof FileList) {
	                var fileList = files;

	                files = [];

	                for (var i = 0; i < fileList.length; i++) {
	                    files[i] = fileList[i];
	                }
	            }

	            if (!Array.isArray(files)) {
	                files = [files];
	            }

	            var uploadFile = function uploadFile(file) {
	                return new Promise(function (resolve, reject) {
	                    var reader = new FileReader();

	                    // Event: On file loaded
	                    reader.onload = function (e) {
	                        // Get base64
	                        var base64 = e.target.result;
	                        var headersRegex = /data:(.+);base64,/;
	                        var headersMatch = headersRegex.exec(base64);
	                        base64 = base64.replace(headersRegex, '');

	                        // Create file name if needed
	                        if (file instanceof File == false) {
	                            try {
	                                file = new File([file], 'pasted_' + new Date().getTime() + '.png');
	                            } catch (e) {}
	                        }

	                        spinner('Attaching "' + file.name + '"');

	                        // Create attachment object
	                        var attachment = new Attachment({
	                            name: file.name,
	                            file: file,
	                            base64: base64,
	                            headers: headersMatch ? headersMatch[0] : null
	                        });

	                        resolve(attachment);
	                    };

	                    // Read the file
	                    reader.readAsDataURL(file);
	                });
	            };

	            // Handles the next file in the files array 
	            var uploadNextFile = function uploadNextFile() {
	                var nextFile = files.pop();

	                if (!nextFile) {
	                    _this9.getAttachments();

	                    spinner(false);
	                    return Promise.resolve();
	                }

	                return uploadFile(nextFile).then(function (attachment) {
	                    return ApiHelper.addIssueAttachment(_this9.model, attachment);
	                }).then(function () {
	                    return uploadNextFile();
	                }).catch(function (e) {
	                    displayError(e);

	                    spinner(false);
	                });
	            };

	            uploadNextFile();
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
	            var _this10 = this;

	            this.$element.toggleClass('loading', true);

	            var $attachments = this.$element.find('.attachments');

	            ApiHelper.getIssueAttachments(this.model).then(function (attachments) {
	                _this10.$element.toggleClass('loading', false);

	                $attachments.children('.attachment').remove();

	                _.append($attachments, _.each(attachments, function (i, attachment) {
	                    return _.div({ class: 'attachment' }, _.label({}, _.if(!attachment.isRedirect && attachment.isImage(), _.img({ src: attachment.getURL() })), attachment.name), _.a({ class: 'btn-download-attachment fa fa-download', href: attachment.getURL(), target: '_blank' }), _.button({ class: 'btn-remove-attachment' }, _.span({ class: 'fa fa-trash' })).click(function () {
	                        _this10.onClickRemoveAttachment(attachment);
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
	            var _this11 = this;

	            this.$element.toggleClass('loading', true);

	            var $comments = this.$element.find('.comments');
	            var user = User.getCurrent();

	            ApiHelper.getIssueComments(this.model).then(function (comments) {
	                _this11.$element.toggleClass('loading', false);

	                $comments.children('.comment').remove();

	                _.append($comments, _.each(comments, function (i, comment) {
	                    var collaborator = ResourceHelper.get(comment.collaborator, 'collaborators', 'name');
	                    var text = markdownToHtml(comment.text);
	                    var isUser = collaborator.name == user.name;

	                    var $comment = _.div({ class: 'comment', 'data-index': comment.index }, _.div({ class: 'collaborator' }, _.img({ title: collaborator.displayName || collaborator.name, src: collaborator.avatar })), _.if(isUser, _.button({ class: 'btn-edit' }, _.span({ class: 'fa fa-edit' })).click(_this11.onClickEdit), _.div({ class: 'rendered selectable' }, text), _.textarea({ class: 'edit hidden text btn-transparent' }, comment.text).change(function () {
	                        _this11.$element.toggleClass('loading', true);

	                        comment.text = $comment.find('textarea').val();

	                        $comment.find('.rendered').html(markdownToHtml(comment.text) || '');

	                        ApiHelper.updateIssueComment(_this11.model, comment).then(function () {
	                            _this11.$element.toggleClass('loading', false);

	                            if (!comment.text) {
	                                $comment.remove();
	                            }
	                        }).catch(function (e) {
	                            _this11.$element.toggleClass('loading', false);
	                            displayError(e);
	                        });
	                    }).blur(_this11.onBlur)), _.if(!isUser, _.div({ class: 'text selectable' }, text)));

	                    return $comment;
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
/* 74 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Issue editor template
	 */
	module.exports = function render() {
	    var _this = this;

	    return _.div({ class: 'issue-editor', 'data-index': this.model.index, 'data-type': ISSUE_TYPES[this.model.type] },

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
	    _.h4({ class: 'issue-title' }, _.span({ class: 'rendered' }, this.model.title), _.input({ type: 'text', class: 'selectable edit hidden', 'data-property': 'title', value: this.model.title }).change(function () {
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
	    _.if(this.model.getReporter(), _.div({ class: 'meta-field reporter readonly' }, _.label('Reporter'), _.p(this.model.getReporter().displayName || this.model.getReporter().name))),

	    // Assignee
	    _.if(resources.collaborators.length > 0, _.div({ class: 'meta-field assignee' }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Assignee'), _.select({ 'data-property': 'assignee', disabled: ApiHelper.isSpectating() }, _.option({ value: null, selected: !this.model.assignee }, '(unassigned)'), _.each(resources.collaborators, function (i, collaborator) {
	        return _.option({ value: collaborator.name, selected: collaborator.name == _this.model.assignee }, collaborator.displayName || collaborator.name);
	    })).change(function () {
	        _this.onChange();
	    }))),

	    // Type
	    _.div({ class: 'meta-field type' }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Type'), _.select({ 'data-property': 'type', disabled: ApiHelper.isSpectating() }, _.each(ISSUE_TYPES, function (type, i) {
	        return _.option({ value: type }, type);
	    })).change(function () {
	        _this.onChange();
	    }).val(this.model.type)),

	    // Priority
	    _.div({ class: 'meta-field priority' }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Priority'), _.select({ 'data-property': 'priority', disabled: ApiHelper.isSpectating() }, _.each(ISSUE_PRIORITIES, function (priority, i) {
	        return _.option({ value: priority }, priority);
	    })).change(function () {
	        _this.onChange();
	    }).val(this.model.priority)),

	    // Version
	    _.div({ class: 'meta-field version' + (window.resources.versions.length < 1 ? ' hidden' : '') }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Version'), _.select({ 'data-property': 'version', disabled: ApiHelper.isSpectating() }, _.each(window.resources.versions, function (i, version) {
	        return _.option({ value: version }, version);
	    })).change(function () {
	        _this.onChange();
	    }).val(this.model.version)),

	    // Estimate
	    _.div({ class: 'meta-field estimate' }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Estimate'), _.select({ 'data-property': 'estimate', disabled: ApiHelper.isSpectating() }, _.each(ISSUE_ESTIMATES, function (estimate, i) {
	        return _.option({ value: estimate }, estimate);
	    })).change(function () {
	        _this.onChange();
	    }).val(this.model.estimate)),

	    // Tags
	    _.div({ class: 'meta-field tags' }, _.input({ class: 'multi-edit-toggle', type: 'checkbox' }).change(function (e) {
	        _this.onChangeCheckbox(e);
	    }), _.label('Tags'), _.div({ class: 'input', 'data-property': 'tags', 'data-value': this.model.tags.join(',') },
	    // All tags
	    _.each(this.model.tags, function (i, tag) {
	        if (!tag) {
	            return;
	        }

	        return _.span({ class: 'tag' }, tag, _.button({ class: 'btn-remove-tag' }, _.span({ class: 'fa fa-remove' })).click(function (e) {
	            var $input = $(e.currentTarget).parents('.input');
	            var val = $input.data('value').split(',');
	            val.splice(val.indexOf(tag), 1);
	            val = val.join(',');

	            $input.data('value', val);

	            _this.onChange();
	        }));
	    }),

	    // Add tag
	    _.span({ class: 'add-tag' }, _.button({ class: 'btn-add-tag' }, _.span({ class: 'fa fa-plus' })).click(function (e) {
	        _this.onClickAddTag(e);
	    })))),

	    // Multi edit actions
	    _.div({ class: 'multi-edit-actions' }, _.button({ class: 'btn' }, 'Cancel').click(function () {
	        _this.onClickMultiEditCancel();
	    }), _.button({ class: 'btn' }, 'Apply').click(function () {
	        _this.onClickMultiEditApply();
	    }))),

	    // Body
	    _.div({ class: 'body' },

	    // Description
	    _.button({ class: 'btn-edit' }, _.span({ class: 'fa fa-edit' })).click(this.onClickEdit), _.label('Description'), _.div({ class: 'rendered selectable' }, markdownToHtml(this.model.description)), _.textarea({ class: 'selectable edit hidden btn-transparent', 'data-property': 'description' }, this.model.description).change(function () {
	        _this.onChange();

	        _this.$element.find('.body .rendered').html(markdownToHtml(_this.model.description) || '');
	    }).blur(this.onBlur).keyup(this.onKeyUp).on('paste', function (e) {
	        _this.onPaste(e);
	    })),

	    // Attachments
	    _.div({ class: 'attachments' }, _.label('Attachments'), _.input({ name: 'file', id: 'input-upload-attachment-' + this.model.id, type: 'file', multiple: true }).change(function (e) {
	        _this.onAttachmentFileInputChange(e);
	    }), _.label({ for: 'input-upload-attachment-' + this.model.id, class: 'btn-upload-attachment' }, _.span({ class: 'fa fa-upload' }))),

	    // Comments
	    _.div({ class: 'comments' }, _.label('Comments')),

	    // Add comment
	    _.if(!ApiHelper.isSpectating(), _.div({ class: 'add-comment' },
	    // Add comment input
	    _.div({ class: 'comment' }, _.div({ class: 'collaborator' }, _.img({ title: User.getCurrent().displayName || User.getCurrent().name, src: User.getCurrent().avatar })), _.textarea({ class: 'edit selectable btn-transparent', placeholder: 'Add comment here...' }).keyup(this.onKeyUp).blur(function () {
	        _this.onSubmitComment();
	    }).on('paste', function (e) {
	        _this.onPaste(e);
	    })))), _.if(!ApiHelper.isSpectating(), _.div({ class: 'actions' },
	    // Remove button
	    _.if(!ApiHelper.isSpectating(), _.button({ class: 'btn' }, 'Remove issue', _.span({ class: 'fa fa-trash' })).click(function () {
	        _this.onClickRemove();
	    })))));
	};

/***/ },
/* 75 */
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

	        _this.template = __webpack_require__(76);

	        _this.fetch();
	        return _this;
	    }

	    /**
	     * Event: Click print button
	     */


	    _createClass(PlanItemEditor, [{
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
	            html += '<style>';
	            html += 'body { font-family: sans-serif; max-width: 900px; margin: 0px auto; }';
	            html += 'h1, h2, h3, h4, h5, h6 { margin-top: 1em; margin-bottom: 0px; }';
	            html += 'h1, h3, h5 { margin-top: 0px; }';
	            html += 'section { margin-top: 1rem; border: 1px solid #000; padding: 1rem; }';
	            html += '</style>';
	            html += '</head>';

	            // Body
	            html += '<body>';

	            // Repository title and description
	            html += '<h1>' + repository.title + '</h1>';

	            if (repository.description) {
	                html += '<h5>' + repository.description + '</h5>';
	            }

	            // Milestone title and description
	            html += '<h2>' + this.model.title;

	            if (this.model.getTotalEstimatedHours() > 0) {
	                html += ' (' + this.model.getTotalEstimatedHours() + ' hours)';
	            }

	            html += '</h2>';

	            if (this.model.description) {
	                html += '<h5>' + this.model.description + '</h5>';
	            }

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.model.getIssues()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var issue = _step.value;

	                    html += '<section>';

	                    // Issue title
	                    html += '<h3>' + issue.id + ': ' + issue.title + '</h3>';

	                    html += '<h5>';

	                    // Issue assignee
	                    if (issue.getAssignee()) {
	                        html += issue.getAssignee().displayName || issue.getAssignee().name;
	                    }

	                    // Issue estimate
	                    if (issue.getEstimatedHours() > 0) {
	                        html += ' (' + issue.getEstimatedHours() + ' hour' + (issue.getEstimatedHours() != 1 ? 's' : '') + ')';
	                    }

	                    html += '</h5>';

	                    // Issue body
	                    html += marked(issue.description) || '';

	                    html += '</section>';
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

	            // TODO: Find a more elegant solution to this
	            // Write change log to console
	            console.log(this.model.getChangeLog());
	        }

	        /**
	         * Event: Click save
	         */

	    }, {
	        key: 'onClickSave',
	        value: function onClickSave() {
	            var _this2 = this;

	            var year = this.$element.find('input[name="year"]').val();
	            var month = this.$element.find('input[name="month"]').val();
	            var day = this.$element.find('input[name="day"]').val();
	            var dateString = year + '-' + month + '-' + day;

	            // Update model data with new information based on DOM location
	            this.model.title = this.$element.find('input[name="title"]').val();
	            this.model.description = this.$element.find('input[name="description"]').val();

	            if (dateString) {
	                try {
	                    var date = new Date(dateString);

	                    this.model.endDate = date.toISOString();
	                } catch (e) {
	                    displayError(new Error(dateString + ' is an invalid date'));
	                    return;
	                }
	            } else {
	                this.model.endDate = null;
	            }

	            // Update DOM elements to match model
	            this.$element.find('.drag-handle').text(this.model.title);

	            // Start loading
	            this.$element.toggleClass('loading', true);

	            ResourceHelper.updateResource('milestones', this.model).then(function () {
	                _this2.$element.toggleClass('loading', false);

	                ViewHelper.get('MilestonesEditor').render();
	                ViewHelper.get('MilestonesEditor').focus(_this2.model);
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
	                ViewHelper.get('MilestonesEditor').render();

	                $('.app-container').removeClass('disabled');

	                spinner(false);
	            });
	        }
	    }]);

	    return PlanItemEditor;
	}(View);

	module.exports = PlanItemEditor;

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    var date = this.model.getEndDate();
	    var year = date ? date.getFullYear() : new Date().getFullYear();
	    var month = date ? date.getMonth() + 1 : new Date().getMonth() + 1;
	    var day = date ? date.getDate() : new Date().getDate();

	    var remainingIssues = this.model.getIncompletedIssues();
	    var remainingHours = this.model.getIncompletedHours();

	    return _.div({ class: 'milestone-editor' + (this.model.isOverdue() ? ' overdue' : '') + (this.model.isClosed() ? ' closed' : ''), 'data-id': this.model.id }, _.button({ class: 'btn btn-print' }, _.span({ class: 'fa fa-print' })).on('click', function () {
	        _this.onClickPrint();
	    }), _.div({ class: 'input-group' }, _.label('Title'), _.input({ name: 'title', class: 'selectable edit', placeholder: 'Type milestone title here', type: 'text', value: this.model.title })), _.div({ class: 'input-group' }, _.label('Description'), _.input({ name: 'description', class: 'selectable', placeholder: 'Type milestone description here', type: 'text', value: this.model.description })), _.div({ class: 'date-input input-group' }, _.label('End date'), _.input({ placeholder: 'YYYY', name: 'year', type: 'number', value: year }), _.span({ class: 'separator' }, '/'), _.input({ placeholder: 'MM', name: 'month', min: 1, max: 12, type: 'number', value: month }), _.span({ class: 'separator' }, '/'), _.input({ placeholder: 'DD', name: 'day', min: 1, max: 31, type: 'number', value: day })), _.if(remainingIssues.length > 0, _.div({ class: 'issues' }, _.h6({ class: 'remaining' }, remainingIssues.length + ' issue' + (remainingIssues.length > 1 ? 's' : '') + ' left (' + remainingHours + ' hours)'), _.ul({ class: 'important' }, _.each(remainingIssues, function (i, issue) {
	        return _.li(issue.title);
	    })))), _.div({ class: 'buttons' }, _.button({ class: 'btn btn-primary' }, 'Remove').click(function () {
	        _this.onClickDelete();
	    }), _.button({ class: 'btn btn-primary' }, 'Save').click(function () {
	        _this.onClickSave();
	    })));
	};

/***/ },
/* 77 */
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

	        _this.template = __webpack_require__(78);

	        _this.fetch();
	        return _this;
	    }

	    /**
	     * Event: Click new issue button
	     */


	    _createClass(MilestoneEditor, [{
	        key: 'onClickNewIssue',
	        value: function onClickNewIssue() {
	            var _this2 = this;

	            spinner('Creating issue');

	            var issue = new Issue({
	                milestone: this.model.index,
	                tags: Router.params.tag == 'all' ? [] : [Router.params.tag],
	                reporter: User.getCurrent().name
	            });

	            ResourceHelper.addResource('issues', issue).then(function (newIssue) {
	                var editor = new IssueEditor({
	                    model: newIssue
	                });

	                var $issue = editor.$element;

	                _this2.$element.find('.column[data-index="' + newIssue.column + '"] .btn-new-issue').before($issue);

	                editor.onClickToggle();

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
	         * Gets a list of all issues
	         */

	    }, {
	        key: 'getIssues',
	        value: function getIssues() {
	            var issues = [];

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = window.resources.issues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var issue = _step.value;

	                    if (!issue) {
	                        continue;
	                    }

	                    if (issue.milestone == this.model.index) {
	                        issues.push(issue);
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

	            return issues;
	        }
	    }]);

	    return MilestoneEditor;
	}(View);

	module.exports = MilestoneEditor;

/***/ },
/* 78 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    var state = SettingsHelper.get('milestone', this.model.index) || 'collapsed';

	    return _.div({ class: 'milestone-viewer ' + state, 'data-title': this.model.title, 'data-index': this.model.index, 'data-end-date': this.model.endDate }, _.div({ class: 'header' }, _.div({ class: 'title' }, _.button({ class: 'btn-toggle btn-transparent' }, _.span({ class: 'fa fa-chevron-right' }), _.h4(this.model.title), _.p(this.model.description)).click(function () {
	        _this.onClickToggle();
	    }))), _.div({ class: 'columns' }, _.each(window.resources.columns, function (columnIndex, column) {
	        return _.div({ class: 'column', 'data-name': column, 'data-index': columnIndex }, _.div({ class: 'header' }, _.h4(column)), _.div({ class: 'body' }, _.each(_this.model.getIssues(), function (issueIndex, issue) {
	            if (issue.column === column) {
	                var $issueEditor = new IssueEditor({
	                    model: issue
	                }).$element;

	                return $issueEditor;
	            }
	        }), _.if(columnIndex == 0 && !ApiHelper.isSpectating(), _.button({ class: 'btn btn-new-issue' }, 'New issue ', _.span({ class: 'fa fa-plus' })).click(function () {
	            _this.onClickNewIssue();
	        }))));
	    })));
	};

/***/ },
/* 79 */
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

	        _this.template = __webpack_require__(80);

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
/* 80 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    // Set regex for individual cases
	    var regex = void 0;

	    return _.div({ class: 'resource-editor' }, _.div({ class: 'body' }, _.each(this.model, function (i, item) {
	        // Do not handle issue columns "to do" and "done"
	        if (_this.name == 'columns' && (item == 'to do' || item == 'done')) {
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MilestonesEditor = function (_View) {
	    _inherits(MilestonesEditor, _View);

	    function MilestonesEditor(params) {
	        _classCallCheck(this, MilestonesEditor);

	        var _this = _possibleConstructorReturn(this, (MilestonesEditor.__proto__ || Object.getPrototypeOf(MilestonesEditor)).call(this, params));

	        _this.template = __webpack_require__(82);

	        _this.init();

	        // Set click event
	        _this.$element.on('click', function (e) {
	            $('.milestone-editor').removeClass('editing');

	            var $milestone = $(e.target);

	            if (!$milestone.hasClass('milestone-editor')) {
	                $milestone = $milestone.parents('.milestone-editor');
	            }

	            if ($milestone.length > 0) {
	                $milestone.addClass('editing');
	            }
	        });
	        return _this;
	    }

	    /**
	     * Focuses a milestone
	     *
	     * @param {Object} milestone
	     */


	    _createClass(MilestonesEditor, [{
	        key: 'focus',
	        value: function focus(milestone) {
	            $('.milestone-editor').each(function (i, element) {
	                var isFocus = element.dataset.id == milestone.id;

	                element.classList.toggle('editing', isFocus);

	                if (isFocus) {
	                    element.scrollIntoView();
	                }
	            });
	        }

	        /**
	         * Event: Click add milestone
	         */

	    }, {
	        key: 'onClickAddMilestone',
	        value: function onClickAddMilestone() {
	            var _this2 = this;

	            if (ApiHelper.isSpectating()) {
	                return;
	            }

	            spinner('Creating milestone');

	            ResourceHelper.addResource('milestones', new Milestone({
	                title: 'New milestone',
	                description: '',
	                endDate: new Date().toISOString()
	            })).then(function (newMilestone) {
	                _this2.render();

	                _this2.focus(newMilestone);

	                spinner(false);
	            });
	        }
	    }]);

	    return MilestonesEditor;
	}(View);

	module.exports = MilestonesEditor;

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';

	var MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

	module.exports = function render() {
	    var _this = this;

	    var lastYear = void 0;
	    var lastMonth = void 0;

	    return _.div({ class: 'milestones-editor' }, _.div({ class: 'milestones' }, _.each(resources.milestones, function (i, milestone) {
	        if (milestone.getEndDate()) {
	            var dueDate = milestone.getEndDate();

	            var $milestone = new MilestoneEditor({
	                model: milestone
	            }).$element;

	            var elements = [$milestone];

	            if (dueDate.getMonth() != lastMonth) {
	                lastMonth = dueDate.getMonth();

	                elements.unshift(_.h4({ class: 'month' }, MONTHS[lastMonth]));
	            }

	            if (dueDate.getFullYear() != lastYear) {
	                lastYear = dueDate.getFullYear();

	                elements.unshift(_.h2({ class: 'year' }, lastYear));
	            }

	            return elements;
	        }
	    })), _.div({ class: 'btn-new-fixer' }, _.div({ class: 'btn-new-container' }, _.button({ class: 'btn btn-new' }, 'New milestone', _.span({ class: 'fa fa-plus' })).click(function () {
	        _this.onClickAddMilestone();
	    }))));
	};

/***/ },
/* 83 */
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

	        _this.template = __webpack_require__(84);

	        _this.fetch();
	        return _this;
	    }

	    _createClass(RepositoryEditor, [{
	        key: 'onClick',
	        value: function onClick() {
	            ResourceHelper.clear();

	            ViewHelper.get('Navbar').slideIn();
	            spinner(this.model.title);

	            if (this.overrideUrl) {
	                location = '/#/' + this.model.owner + '/' + this.model.title + this.overrideUrl;
	            } else if (Router.params.repository) {
	                location = '/#' + location.hash.replace('#', '').replace(Router.params.repository, this.model.title).replace(Router.params.user, this.model.owner);
	            } else {
	                location = '/#/' + this.model.owner + '/' + this.model.title + '/milestones/';
	            }
	        }
	    }]);

	    return RepositoryEditor;
	}(View);

	module.exports = RepositoryEditor;

/***/ },
/* 84 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    if (!this.model) {
	        return '';
	    }

	    return _.div({ class: 'repository-editor' }, _.div({ class: 'content' }, _.div({ class: 'owner' }, this.model.owner), _.div({ class: 'header' }, _.h4(this.model.title)), _.div({ class: 'body' }, this.model.description))).click(function () {
	        _this.onClick();
	    });
	};

/***/ },
/* 85 */
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

	        _this.template = __webpack_require__(86);

	        var defaultColumn = '';

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = resources.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

	        _this.model = SettingsHelper.get('filters', 'custom', [], true) || [];

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

	                    var issue = issueView.model;
	                    var isTagMatch = Router.params.tag == 'all' || issue.tags.indexOf(Router.params.tag) > -1;

	                    issueView.$element.toggle(isTagMatch);

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
/* 86 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function render() {
	    var _this = this;

	    var resourceDictionary = {
	        assignee: resources.collaborators,
	        column: resources.columns,
	        milestone: resources.milestones,
	        priority: ISSUE_PRIORITIES,
	        type: ISSUE_TYPES,
	        version: resources.versions
	    };

	    return _.div({ class: 'filter-editor' }, _.button({ class: 'btn-toggle', 'data-filter-amount': this.model.length.toString() }, 'Filters', _.span({ class: 'filter-indicator' }, this.model.length.toString())).click(function () {
	        _this.onClickToggle();
	    }), _.div({ class: 'filters-container' }, _.div({ class: 'filters' }, _.each(this.model, function (i, filter) {
	        var resourceKey = filter.key;
	        var resource = resourceDictionary[resourceKey];

	        var $valueSelect = void 0;
	        var $filter = _.div({ class: 'filter' }, _.div({ class: 'select-container key' }, _.select({}, _.each(resourceDictionary, function (key) {
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
	            // We are looping an enum, swap the index and value
	            if (isNaN(i)) {
	                var idx = value;

	                value = i;
	                i = idx;
	            }

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
	    })))));
	};

/***/ },
/* 87 */
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

	        _this.template = __webpack_require__(88);

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
/* 88 */
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

	    var optimalHours = this.getOptimalHours();
	    var actualHours = this.getActualHours();

	    var $canvas = _.canvas({ width: CANVAS_WIDTH_UNIT * totalDays, height: CANVAS_HEIGHT_UNIT * totalHours });
	    var ctx = $canvas[0].getContext('2d');

	    var gridDrawTimer = void 0;
	    var hoursDrawTimer = void 0;

	    /**
	     * Draws the grid
	     */
	    var drawGrid = function drawGrid() {
	        var drawNext = function drawNext(x) {
	            var xPos = x * CANVAS_WIDTH_UNIT;

	            GraphHelper.drawLine(ctx, xPos, 0, xPos, CANVAS_HEIGHT_UNIT * totalHours, 1, '#999999');

	            if (x < totalDays) {
	                gridDrawTimer = setTimeout(function () {
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
	                hoursDrawTimer = setTimeout(function () {
	                    drawNext(i + 1);
	                }, 1);
	            }
	        };

	        drawNext(1);
	    };

	    /**
	     * Redraws this graph
	     *
	     * @param {Boolean} fit
	     */
	    var redraw = function redraw(fit) {
	        if (gridDrawTimer) {
	            clearTimeout(gridDrawTimer);
	        }
	        if (hoursDrawTimer) {
	            clearTimeout(hoursDrawTimer);
	        }

	        ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height);

	        if (fit) {
	            var targetWidth = _this.$element.find('.graph-container').outerWidth() - 40;

	            CANVAS_WIDTH_UNIT = targetWidth / totalDays;

	            $canvas[0].width = targetWidth;

	            /*this.$element.find('.graph-x-axis-labels').empty().append(
	                _.loop(totalDays, (i) => {
	                    i++;
	                     if(i % 5 !== 0 && i != 1 && i != totalDays + 1) { return; }
	                     return _.label({style: 'left: ' + (CANVAS_WIDTH_UNIT * (i - 1)) + 'px'},i.toString() + ' d');
	                })
	            );*/
	        }

	        drawGrid();
	        drawHours(optimalHours, '#21303b');
	        drawHours(actualHours, '#e70d3b');
	    };

	    setTimeout(function () {
	        redraw(true);
	    }, 50);

	    return _.div({ class: 'burndown-chart analytics-body' }, _.div({ class: 'toolbar' }, _.h4({}, 'Milestone', _.select({ class: 'btn milestone-picker' }, _.each(resources.milestones.concat().sort(this.sortMilestones), function (i, milestone) {
	        return _.option({ value: milestone.index }, milestone.title);
	    })).val(milestone ? milestone.index : 0).change(function (e) {
	        _this.onChangeMilestonePicker($(e.target).val());
	    }))), _.div({ class: 'meta' }, _.h4('Total days'), _.p((totalDays + 1).toString()), _.h4('Total hours'), _.p(totalHours.toString()), _.h4('Milestone start'), _.p(milestoneStart ? milestoneStart.toString() : '(invalid)'), _.h4('Milestone end'), _.p(milestoneEnd ? milestoneEnd.toString() : '(invalid)')), _.h4('Chart'), _.div({ class: 'graph-container' }, _.div({ class: 'graph-y-axis-labels' }, _.label({ style: 'top: 0px' }, Math.round(totalHours) + ' h'), _.label({ style: 'top: 380px' }, '0 h')), _.div({ class: 'graph-canvas' }, $canvas, _.div({ class: 'graph-x-axis-labels' })).on('mousewheel', function () {
	        redraw(true);
	    })));
	};

/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';

	// Root

	Router.route('/', function () {
	    ApiHelper.checkConnection().then(function () {
	        navbar.toggleRepositoriesList(true);

	        $('.workspace').remove();

	        $('.app-container').append(_.div({ class: 'workspace' }, _.div({ class: 'workspace-content logo' }, _.img({ src: '/public/svg/logo-medium.svg' }))));

	        spinner(false);
	    }).catch(displayError);
	});

	// Repository
	Router.route('/:user/:repository', function () {
	    location.hash = '/' + Router.params.user + '/' + Router.params.repository + '/milestones';
	});

	// Milestones
	Router.route('/:user/:repository/milestones/', function () {
	    ApiHelper.checkConnection().then(function () {
	        return ApiHelper.getResources(true);
	    }).then(function () {
	        SettingsHelper.addToLatestRepositories(Router.params.user, Router.params.repository);

	        $('.workspace').remove();

	        $('.app-container').append(_.div({ class: 'workspace' }, _.div({ class: 'workspace-content milestones-container' }, new MilestonesEditor().$element)));

	        navbar.slideIn();
	        spinner(false);
	    }).catch(displayError);
	});

	// Board
	Router.route('/:user/:repository/board/:mode/', function () {
	    location.hash = '/' + Router.params.user + '/' + Router.params.repository + '/board/' + Router.params.mode + '/all';
	});

	Router.route('/:user/:repository/board/:mode/:tag', function () {
	    ApiHelper.checkConnection().then(function () {
	        return ApiHelper.getResources(true);
	    }).then(function () {
	        SettingsHelper.addToLatestRepositories(Router.params.user, Router.params.repository);

	        $('.workspace').remove();

	        // Append all milestones
	        $('.app-container').append(_.div({ class: 'workspace' }, _.div({ class: 'workspace-panel' }, new FilterEditor().$element, new TagBar().$element), _.div({ class: 'workspace-content board-container ' + Router.params.mode }, _.each(window.resources.milestones, function (i, milestone) {
	            if (Router.params.mode === 'kanban' && milestone.isClosed()) {
	                return;
	            }

	            return new MilestoneViewer({
	                model: milestone
	            }).$element;
	        }))));

	        // Append the unassigned items
	        $('.app-container .board-container').append(new MilestoneViewer({
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
	        SettingsHelper.addToLatestRepositories(Router.params.user, Router.params.repository);

	        $('.workspace').remove();

	        $('.app-container').append(_.div({ class: 'workspace' }, _.div({ class: 'workspace-content analytics' }, _.div({ class: 'tabbed-container vertical' }, _.div({ class: 'tabs' }, _.button({ class: 'tab active' }, 'BURN DOWN CHART').click(function () {
	            var index = $(this).index();

	            $(this).parent().children().each(function (i) {
	                $(this).toggleClass('active', i == index);
	            });

	            $(this).parents('.tabbed-container').find('.panes .pane').each(function (i) {
	                $(this).toggleClass('active', i == index);
	            });
	        })), _.div({ class: 'panes' }, _.div({ class: 'pane active' }, new BurnDownChart().$element))))));

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
	        SettingsHelper.addToLatestRepositories(Router.params.user, Router.params.repository);

	        $('.workspace').remove();

	        var canEdit = function canEdit(name) {
	            return name !== 'organizations' && name !== 'tags' && name !== 'milestones' && name !== 'issues' && name !== 'repositories' && name !== 'collaborators';
	        };

	        $('.app-container').append(_.div({ class: 'workspace' }, _.div({ class: 'workspace-content settings-container' }, _.div({ class: 'tabbed-container vertical' }, _.div({ class: 'tabs' }, _.each(window.resources, function (name, resource) {
	            // Read only
	            if (ApiHelper.getConfig().readonlyResources.indexOf(name) > -1) {
	                return;
	            }

	            // Not editable in resource editor
	            if (!canEdit(name)) {
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
	            if (!canEdit(name)) {
	                return;
	            }

	            return _.div({ class: 'pane' + (Router.params.resource == name ? ' active' : '') }, new ResourceEditor({
	                name: name,
	                model: resource
	            }).$element);
	        }))))));

	        navbar.slideIn();
	        spinner(false);
	    }).catch(displayError);
	});

	// Init router
	Router.init();

	// Navbar
	var navbar = new Navbar();
	$('.app-container').html(navbar.$element);

/***/ }
/******/ ]);