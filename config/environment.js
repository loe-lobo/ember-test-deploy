'use strict';
const _ = require('lodash');

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


  //THIS IS NOT WORKING (I THINK)
  var envPromise = new Promise(function(resolve, reject){
    if(process.env.DEPLOY_TARGET){
      console.log('resolving :' + process.env.DEPLOY_TARGET);
      try{
        const targetENVs = require('./environment-' + process.env.DEPLOY_TARGET + '-config.js');
        ENV = _.merge(
                ENV,
                targetENVs || {});
        resolve(ENV);
      }catch(err) {
        console.log(err);
        console.log('No environment config file found for target ' + process.env.DEPLOY_TARGET + ', running with default options');
        resolve(ENV);
      }
    }
    reject();
  });

  return envPromise;
  //return ENV;
};
