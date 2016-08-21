'use strict';

// Libs
require('exomon');
window.Promise = require('bluebird');
window.marked = require('marked');

Promise.onPossiblyUnhandledRejection((error, promise) => {
    debug.warning(error, Promise);
});

// Helpers
window.ResourceHelper = require('../helpers/ResourceHelper');
window.SettingsHelper = require('../helpers/SettingsHelper');
window.DebugHelper = require('../helpers/DebugHelper');
window.debug = window.DebugHelper;
window.debug.verbosity = 1;

let GitHubApi = require('../../../../plugins/github/js/GitHubApi');
window.ApiHelper = new GitHubApi();

// Models
window.Issue = require('../models/Issue');

// Views

// Globals
require('../globals');

// Routes
require('./routes');

// Title
$('head title').html('Samoosa');
