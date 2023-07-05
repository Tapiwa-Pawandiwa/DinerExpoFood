const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

config.resolver.blacklistRE = exclusionList([/amplify\/#current-cloud-backend\/.*/]);

module.exports = config;
