/* eslint-env node */
'use strict';
const _ = require('lodash');

const GITHUB_DEPLOYMENT_STATUS_DEFAULTS = {
  org: 'trilogy-group',
  repo: 'kayako-', // testing change
  deploymentId: process.env.GITHUB_DEPLOYMENT_ID,
  ref: function(context) {
    return context.revisionData.git.sha;
  },
  token: function() {
    return process.env.GITHUB_TOKEN;
  }
};

module.exports = function(deployTarget) {
  let ENV = {
    build: {
      test: 'a'
    },
    'github-deployment-status': GITHUB_DEPLOYMENT_STATUS_DEFAULTS,
    metricsAdapters: [
      {
        name: 'Segment',
        environments: ['production'],
        config: {
          key: '-------'
        }
      }
    ]
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  var envPromise = new Promise(function(resolve, reject){
    try{
      const targetENVs = require('./deploy-' + deployTarget + '-config.js');
      ENV = _.merge(
               ENV,
               targetENVs || {});
      resolve(ENV);
    }catch(err) {
      console.log(err);
      console.log('No deploy config file found for ' + deployTarget + ' target running with default options');
      resolve(ENV);
    }
  });

  return envPromise;
};
