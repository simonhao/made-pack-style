/**
 * Made-Pack-Style
 * @author: SimonHao
 * @date:   2015-11-12 10:31:48
 */

'use strict';

var compile = require('made-style');
var mid     = require('made-id');
var path    = require('path');

module.exports = function(options, func){
  var require  = options.require || [];
  var external = options.external || [];
  var result   = [];

  external = external.map(function(module_id){
    if(path.isAbsolute(module_id)){
      return module_id;
    }else{
      return mid.path(module_id, options);
    }
  });

  require = require.map(function(module_id){
    if(path.isAbsolute(module_id)){
      return module_id;
    }else{
      return mid.path(module_id, options);
    }
  });

  require = require.filter(function(module_path){
    return external.indexOf(module_path) < 0;
  });

  external = external.concat(require);

  result = require.map(function(module_path){
    return compile.compile_file(module_path, {
      basedir: options.basedir,
      entry: options.entry,
      ext: options.ext,
      external: external
    }, func);
  });

  return result.join('\n');
};