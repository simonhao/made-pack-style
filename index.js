/**
 * Made-Pack-Style
 * @author: SimonHao
 * @date:   2015-11-12 10:31:48
 */

'use strict';

var mstyle = require('made-style');
var path   = require('path');

function build_import_ast(id){
  return {
    type: 'import',
    once: true,
    id: id
  };
}

function build_pack_ast(module_list){
  var ast = {
    type: 'stylesheet',
    rule:[]
  };

  var module_list = module_list || [];

  module_list.forEach(function(module_id){
    ast.rule.push(build_import_ast(module_id));
  });

  return ast;
}

module.exports = function(options, done){
  var module_list = options.require || [];
  var func_list = options.transform || {};

  var result = mstyle.compile_ast(build_pack_ast(module_list), {
    basedir: options.basedir,
    filename: options.filename || '',
    external: options.external || []
  }, func_list);

  done(result);
};