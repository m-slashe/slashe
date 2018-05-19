const superagent = require('superagent');
const config = require('../config.json');

let apiPaths = {
    'issue': 'rest/api/2/issue/',
    'session': 'rest/auth/1/session'
};

class Jira {

    login(username, password) {
        return new Promise(resolve => {
            let {url} = config['jira'];
            try {
                superagent.post(url + apiPaths['session'])
                    .send({username, password})
                    .set('Content-Type', 'application/json')
                    .then(res => {
                        const {name, value} = res.body.session;
                        this.session = {name: 'cookie', value: `${name}=${value}`};
                        resolve();
                    })
            } catch (err) {
                resolve();
                console.error(err);
            }
        })
    }

    getIssue(issue) {
        return new Promise(async (resolve, reject) => {
            let {username, password, url} = config['jira'];
            await this.login(username, password);
            superagent.get(url + apiPaths['issue'] + issue)
                .set('Content-Type', 'application/json')
                .set(this.session.name, this.session.value)
                .end((err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res.body);
                });
        })
    }

}

module.exports = Jira;