'use strict';

// Style
require('../sass/client');

// Package
window.app = require('../../../package.json');

// Libs
require('exomon');
window.Promise = require('bluebird');
window.marked = require('marked');

Promise.onPossiblyUnhandledRejection((error, promise) => {
    throw error;
});

// Globals
require('./globals');

// Helpers
window.ResourceHelper = require('./helpers/ResourceHelper');
window.SettingsHelper = require('./helpers/SettingsHelper');
window.InputHelper = require('./helpers/InputHelper');
window.IssueHelper = require('./helpers/IssueHelper');
window.DebugHelper = require('./helpers/DebugHelper');
window.debug = window.DebugHelper;
window.debug.verbosity = 1;

let GitHubApi = require('../../../plugins/github/js/GitHubApi');
let BitBucketApi = require('../../../plugins/bitbucket/js/BitBucketApi');

switch(getSource()) {
    case 'bitbucket':
        window.ApiHelper = new BitBucketApi();
        break;

    case 'github':
        window.ApiHelper = new GitHubApi();
        break;

    default:
        location = '/login';

        debug.error('No source provided', this);
        break;
}

// Models
window.Issue = require('./models/Issue');

// Views
window.Navbar = require('./views/Navbar');
window.IssueEditor = require('./views/IssueEditor');
window.MilestoneEditor = require('./views/MilestoneEditor');
window.ResourceEditor = require('./views/ResourceEditor');
window.PlanItemEditor = require('./views/PlanItemEditor');
window.PlanEditor = require('./views/PlanEditor');
window.ProjectEditor = require('./views/ProjectEditor');
window.FilterEditor = require('./views/FilterEditor');

// Routes
require('./routes');

// Title
$('head title').html((Router.params.project ? Router.params.project +  ' - ' : '') + 'Samoosa');
