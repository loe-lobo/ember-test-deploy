'use strict';
const _ = require('lodash');

function mergeCspData(envValue, targetValue, key){
  //little hack to handle the CSP policies
  if(typeof envValue === 'string' && key.endsWith('-src') && Array.isArray(targetValue)){
    return envValue + ' ' + targetValue.join(' '); 
  }
}

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'test-deploy',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    contentSecurityPolicy : 
    {
      'default-src': ['lalalal bbbb'].join(' '),
      'worker-src': ['lalalal bbbb'].join(' '),
      'img-src': ['lalalal bbbb'].join(' '),
      'style-src': ['lalalal bbbb'].join(' '),
      'font-src': ['lalalal bbbb'].join(' '),
      'connect-src': ['lalalal bbbb'].join(' '),
      'script-src': ['lalalal bbbb'].join(' '),
      'frame-src': ['lalalal bbbb'].join(' '),
      'media-src': ['lalalal bbbb'].join(' ')
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }


  if(process.env.DEPLOY_TARGET){
    console.log('resolving :' + process.env.DEPLOY_TARGET);
    try{
      const targetENV = require('./environment-' + process.env.DEPLOY_TARGET + '-config.js');
      ENV = _.mergeWith(
        ENV,
        targetENV || {},
        mergeCspData
     );
    }catch(err) {
      console.log(err);
      console.log('No environment config file found for target ' + process.env.DEPLOY_TARGET + ', running with default options');
    }
  }

  return ENV;
};
