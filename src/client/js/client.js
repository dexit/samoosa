'use strict';

// Libs
require('exomon');
window.Promise = require('bluebird');
window.marked = require('marked');

// Helpers
window.ResourceHelper = require('./helpers/ResourceHelper');
window.SettingsHelper = require('./helpers/SettingsHelper');
window.InputHelper = require('./helpers/InputHelper');

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

// Globals
require('./globals');

// Routes
require('./routes');

// Title
let currentProject = SettingsHelper.get('projects', 'current');

$('head title').html((currentProject ? currentProject +  ' - ' : '') + 'Mondai');
