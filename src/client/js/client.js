'use strict';

// Style
require('../sass/client');

// Package
window.app = require('../../../package.json');

// Libs
require('exomon');
window.Promise = require('bluebird');
window.marked = require('marked');
require('babel-polyfill');

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
window.GraphHelper = require('./helpers/GraphHelper');
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
window.Milestone = require('./models/Milestone');
window.User = require('./models/User');
window.Repository = require('./models/Repository');
window.Attachment = require('./models/Attachment');
window.Organization = require('./models/Organization');

// Views
window.Navbar = require('./views/Navbar');
window.RepositoryBar = require('./views/RepositoryBar');
window.IssueEditor = require('./views/IssueEditor');
window.MilestoneEditor = require('./views/MilestoneEditor');
window.ResourceEditor = require('./views/ResourceEditor');
window.PlanItemEditor = require('./views/PlanItemEditor');
window.PlanEditor = require('./views/PlanEditor');
window.RepositoryEditor = require('./views/RepositoryEditor');
window.FilterEditor = require('./views/FilterEditor');
window.BurnDownChart = require('./views/BurnDownChart');

// Routes
require('./routes');

// Title
$('head title').html((Router.params.repository ? Router.params.repository +  ' - ' : '') + 'Samoosa');
