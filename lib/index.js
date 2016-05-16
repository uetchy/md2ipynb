var remark = require('remark');
var yamlConfig = require('remark-yaml-config');
var processor = remark().use(yamlConfig);

var PYTHON_LANG_SET = [
  "python",
  "py",
  "python2",
  "py2",
  "python3",
  "py3",
  "numpy",
  "numpyw",
  "numsc"
];

function md2ipynb(doc) {
  var ast = processor.parse(doc);
  var children = ast.children;

  var ipynb = {
    "cells": [],
    "metadata": {
      "kernelspec": {
        "display_name": "Python 3",
        "language": "python",
        "name": "python3"
      },
      "language_info": {
        "codemirror_mode": {
          "name": "ipython",
          "version": 3
        },
        "file_extension": ".py",
        "mimetype": "text/x-python",
        "name": "python",
        "nbconvert_exporter": "python",
        "pygments_lexer": "ipython3",
        "version": "3.4.3"
      }
    },
    "nbformat": 4,
    "nbformat_minor": 0
  };

  executionCount = 1
  for (var i of children) {
    switch(i.type) {
      case "code":
        var lang = i.lang && i.lang.split(':')[0];
        if (PYTHON_LANG_SET.indexOf(lang) > -1) {
          // Python
          codeArray = i.value.split("\n").map(function(v, i, arr){
            return v+"\n";
          });

          if (executionCount == 1) {
            plt_inline_load = "%matplotlib inline\n";
            if (codeArray.indexOf(plt_inline_load) == -1){
              codeArray.unshift("%matplotlib inline\n");
            }
          }

          ipynbCell = {
            "cell_type": "code",
            "execution_count": executionCount,
            "metadata": {
             "collapsed": false
            },
            "outputs": [],
            "source": codeArray
          }
          ipynb["cells"].push(ipynbCell);
          executionCount += 1;
        } else if (lang === "math") {
          // Math
          mathArray = i.value.split("\n").map(function(v, i, arr){
            return v+"\n";
          });
          mathArray.unshift("$\n");
          mathArray.push("$");
          ipynbCell = {
            "cell_type": "markdown",
            "metadata": {},
            "source": mathArray
          };
          ipynb["cells"].push(ipynbCell);
        } else {
          // Plain code blocks
          codeArray = i.value.split("\n").map(function(v, i, arr){
            return v+"\n";
          });
          codeArray.unshift("```\n");
          codeArray.push("```");
          ipynbCell = {
            "cell_type": "markdown",
            "metadata": {},
            "source": codeArray
          };
          ipynb["cells"].push(ipynbCell);
        }
        break;
      default:
        // Markdown text
        mdArray = processor.stringify(i).split("\n").map(function(v, i, arr){
          return v+"\n";
        });
        ipynbCell = {
          "cell_type": "markdown",
          "metadata": {},
          "source": mdArray
        };
        ipynb["cells"].push(ipynbCell);
    }
  }

  return JSON.stringify(ipynb, null, 2);
}

module.exports = md2ipynb;
