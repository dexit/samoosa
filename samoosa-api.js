'use strict';

let config = require('./config.json');

let express = require('express');
let restler = require('restler');

let app = express();

// --------------------
// Add headers
// --------------------
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.allowedOrigin);

    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// --------------------
// oAuth2 flow
// --------------------
app.get('/oauth/:source', (req, res) => {
     switch(req.params.source) {
        case 'bitbucket':
            handleBitBucket(req, res);
            break;

        case 'github':
            handleGitHub(req, res);
            break;

        default:
            res.sendStatus(404);
            break;
     }
});

// --------------------
// Start server
// --------------------
let server = app.listen(process.env.PORT || 8080);

/**
 * Handles the GitHub flow
 */
function handleGitHub(req, res) {
    // Got code
    if(req.query.code) {
        restler.post('https://github.com/login/oauth/access_token', {
            headers: {
                Accept: 'application/json'
            },
            data: {
                client_id: config.github.id,
                client_secret: config.github.secret,
                code: req.query.code
            }
        })
        .on('complete', (data) => {
            if(data.access_token) {
                res.redirect('http://samoosa.rocks/login?source=github&token=' + data.access_token);
            } else {
                res.send(JSON.stringify(data));
            }
        });


    // The start of the oAuth flow
    } else {
        res.redirect('https://github.com/login/oauth/authorize?client_id=' + config.github.id + '&scope=repo');
    }
}

/**
 * Handles the BitBucket flow
 */
function handleBitBucket(req, res) {
    // Refresh
    if(req.query.refresh) {
        restler.post('https://bitbucket.org/site/oauth2/access_token', {
            username: config.bitbucket.key,
            password: config.bitbucket.secret,
            data: {
                grant_type: 'refresh_token',
                refresh_token: req.query.refresh
            }
        })
        .on('complete', (data) => {
            if(data.access_token) {
                res.send({token: data.access_token});
            } else {
                res.send(JSON.stringify(data));
            }
        });
    
    // Got code
    } else if(req.query.code) {
        restler.post('https://bitbucket.org/site/oauth2/access_token', {
            username: config.bitbucket.key,
            password: config.bitbucket.secret,
            data: {
                grant_type: 'authorization_code',
                code: req.query.code
            }
        })
        .on('complete', (data) => {
            if(data.access_token && data.refresh_token) {
                res.redirect('http://samoosa.rocks/login?source=bitbucket&token=' + data.access_token + '&refresh=' + data.refresh_token);
            } else {
                res.send(JSON.stringify(data));
            }
        });


    // The start of the oAuth flow
    } else {
        res.redirect('https://bitbucket.org/site/oauth2/authorize?client_id=' + config.bitbucket.key + '&response_type=code');
    }
}
