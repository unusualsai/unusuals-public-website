const {
	getStoryBookConfig
} = require('./utils');
const path = require('path');
const { baseComponents } = require('../webpack.config');

module.exports = getStoryBookConfig(
	path.resolve(__dirname, '../src/scss/_bootstrap-variables.scss'),
	Object.keys(baseComponents)
);