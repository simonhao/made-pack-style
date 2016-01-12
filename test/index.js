/**
 * test
 * @author: SimonHao
 * @date:   2016-01-12 10:29:26
 */

'use strict';

var pack = require('../index.js');

console.log(pack({
  basedir: __dirname,
  require: ['base', 'qq']
}));