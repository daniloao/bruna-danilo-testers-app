'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    API_URL_ADDRESS: '"http://localhost:26116/api/"',
    DEFAULT_PAGE_SIZE: 15
})