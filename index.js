/**
 * Made-Pack-Style
 * @author: SimonHao
 * @date:   2015-11-12 10:31:48
 */

'use strict';

var compile = require('made-style');
var mid     = require('made-id');
var path    = require('path');

module.exports = function(config, func){
  var options = {
    basedir: config.basedir || process.cwd(),
    entry: config.entry || 'style.css',
    ext: config.ext || '.css',
    filename: process.cwd()
  };

  var _require = config.require || [],
      _external = config.external || [];

  var require  = [],
      external = [],
      result   = [];

  _external.forEach(function(module_id){
    var module_path;

    if(path.isAbsolute(module_id)){
      module_path = module_id;
    }else{
      module_path = mid.path(module_id, options);
    }

    if(module_path){
      external.push(module_path);
    }else{
      console.error('Cont find external module "', module_id, '"');
    }
  });

  _require.forEach(function(module_id){
    var module_path;

    if(path.isAbsolute(module_id)){
      module_path = module_id;
    }else{
      module_path = mid.path(module_id, options);
    }

    if(module_path){
      require.push(module_path);
    }else{
      console.error('Cont find require module "', module_id, '"');
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