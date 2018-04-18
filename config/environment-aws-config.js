module.exports = {
    appsApiUrl : 'https://apps.kayakodev.net',
    kreSocket : 'wss://kre.kayakodev.net/socket',
    metricsAdapters:[{ config : { key : 'jSiherbyTwW3twI4Yqv0vzhhK2LdWoQU'}}],
    bugsnag : { apiKey : 'dee7cbbc59697623dc4372a809972e6c' },
    messengerAssetsUrl : 'https://assets.kayakodev.net/messenger/pattern-',
    'ember-cli-mirage' : {
      excludeFilesFromBuild: true
    },
    contentSecurityPolicy : 
      {
        'default-src': [],
        'worker-src': [],
        'img-src': [],
        'style-src': ['https://assets.kayakodev.net/'],
        'font-src': ['https://assets.kayakodev.net/'],
        'connect-src': ['https://assets.kayakodev.net/'],
        'script-src': ['https://assets.kayakodev.net/'],
        'frame-src': [],
        'media-src': []
      }
}