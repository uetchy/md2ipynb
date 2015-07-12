var mdast = require('mdast');
var processor = mdast();

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

  executionCount = 0
  for (var i of children) {
    switch(i.type) {
      case "code":
        if (i.lang === "py") {
          // Python
          codeArray = i.value.split("\n").map(function(v, i, arr){
            return v+"\n";
          });

          if (executionCount == 0) {
            codeArray.unshift("%matplotlib inline\n");
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
        } else if (i.lang === "math") {
          // Math
          mathArray = i.value.split("\n").map(function(v, i, arr){
            return v+"\n";
          });
          codeArray.unshift("$\n");
          codeArray.push("$");
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
