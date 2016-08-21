'use strict';

// Package
window.app = require('../../../package.json');

// Libs
require('exomon');
window.Promise = require('bluebird');
window.marked = require('marked');

Promise.onPossiblyUnhandledRejection((error, promise) => {
    debug.warning(error, Promise);
});

// Helpers
window.ResourceHelper = require('./helpers/ResourceHelper');
window.SettingsHelper = require('./helpers/SettingsHelper');
window.InputHelper = require('./helpers/InputHelper');
window.IssueHelper = require('./helpers/IssueHelper');
window.DebugHelper = require('./helpers/DebugHelper');
window.debug = window.DebugHelper;
window.debug.verbosity = 1;

let GitHubApi = require('../../../plugins/github/js/GitHubApi');
window.ApiHelper = new GitHubApi();

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

// Globals
require('./globals');

// Routes
require('./routes');

// Title
$('head title').html((Router.params.project ? Router.params.project +  ' - ' : '') + 'Samoosa');
