module.exports = {
    build: {
        environment : 'production'
    },
    'github-deployment-status': {
        environment: 'development',
        targetUrl: function(context) {
            let key = context.revisionData.git.sha;
            return 'https://bartosztest.kayakodev.net/agent?version=' + key;
        }
    },
    metricsAdapters:[{ config : { key : 'jSiherbyTwW3twI4Yqv0vzhhK2LdWoQU'}}]
}