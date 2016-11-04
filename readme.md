---
---

<div class="document-header">

<img class="logo" src="https://rawgit.com/Putaitu/samoosa/gh-pages/public/svg/logo-medium.svg" width="128" />

<h1>Samoosa</h1>
<p>A free and open-source issue tracker frontend</p>
<p><a href="https://github.com/Putaitu/samoosa">Gitub repo</a></p>

</div>

## Introduction
Samoosa can be set up to work with GitHub, Bitbucket, your own custom backend, you name it. The support is added through plugins that reshape the content of their API sources into the Samoosa format. In the case of the GitHub plugin, labels are being used to track version numbers, estimates, issue types and columns.

### Entirely client-side
No server software, such as Node.js or PHP, is needed to run Samoosa. It's built entirely in client-side JavaScript.

### Current features
- Milestone planning
- Kanban board with customisable columns
- Project picker
- Customisable issue types, priorities, versions and estimates
- Printed pages for formal purposes such as scope-of-work documents
- Issue burndown chart

### Features to come
- BitBucket integration
- More analytics charts

## Screenshots
![Project list](/public/img/screenshots/project-list.jpg)
![Kanban board](/public/img/screenshots/kanban-board.jpg)
![Kanban board with open issue](/public/img/screenshots/kanban-board-issue-open.jpg)
![Burn down chart](/public/img/screenshots/burn-down-chart.jpg)
![Schedule](/public/img/screenshots/schedule.jpg)
![Settings](/public/img/screenshots/settings.jpg)

## Quick start
1. Make sure you have a [GitHub](https://github.com) account and at least one repository.
2. Go to the [Samoosa login page]({{ site.url }}/login).
3. Click "Create new token". You might be prompted to log in.
4. Name your token something like "samoosa-token".
5. Tick the "repo" scope.
6. Click "Generate token"
7. Copy the newly created token and paste it into the "API token" field of the [Samoosa login page]({{ site.url }}/login)
8. Once logged in, click a repo in the navigation menu.

## Creating an issue
1. Click the "Kanban" or the "List" button on the navbar
2. Expand a section by clicking the title. A new project will just have one called "Unassigned".
3. Click the "New issue" button in the "To do"-column
4. Click the title or description to edit it
5. Drag and drop it between the relevant columns

## Scheduling milestones
1. Click the "Schedule" button in the navbar
2. Create new milestones by clicking the "+" icon on individual dates in the calendar view
3. Click an existing milestone to edit its title and description
4. Milestones can be dragged and dropped onto the month and year tabs to move them across calendar months

## Managing issue types, priorities, estimates, columns, milestones and versions
1. Click the "Settings" button on the navbar
2. Click any of the resources on the left-hand side
3. Type in a name for a new column and click "add"
4. The new field you created should appear in the issues on the kanban/list boards
  - In the case of columns, they will appear between the default "to do" and "done" columns
  - Milestones will appear as new sections
  - All other resources will appear as fields in the individual issues
