'use strict';

class ResourceHelper {
    static getCollaborator(name) {
        for(let i in window.settings.collaborators) {
            let collaborator = window.settings.collaborators[i];
            
            if(collaborator.name == name) {
                return i;
            }
        }
    }
    
    static getIssueType(name) {
        for(let i in window.settings.types) {
            let type = window.settings.types[i];
            
            if(type == name) {
                return i;
            }
        }
    }
    
    static getVersion(name) {
        for(let i in window.settings.versions) {
            let version = window.settings.versions[i];
            
            if(version == name) {
                return i;
            }
        }
    }
    
    static getMilestone(name) {
        for(let i in window.settings.milestones) {
            let milestone = window.settings.milestones[i];
            
            if(milestone.title == name) {
                return i;
            }
        }
    }
}

module.exports = ResourceHelper;
