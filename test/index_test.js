var mocha = require('mocha');
var assert = require('power-assert');

var md2ipynb = require('../lib');

describe('index()', function(){
  beforeEach(function(){
    this.markdown = "# Heading\n## Heading 2\n### Heading 3\nThis is paragraph.\n[Link](http://example.com) and **Emphasis**.\n\n```\nPlain code block\n```\n - List item\n - Matplotlib\n\n```py\n%matplotlib inline\nimport numpy as np\nimport matplotlib.pyplot as plt\n```\n![sample.png](http://example.com/sample.png)\n\n```math\ndistance = \alpha * speed + \beta\n```\nInline math formula $\alpha$ here."
    this.ipynbArray = {
      "cells": [
        {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "# Heading\n"
          ]
        },
        {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "## Heading 2\n"
          ]
        },
        {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "### Heading 3\n"
          ]
        },
        {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "This is paragraph.\n",
            "[Link](http://example.com) and **Emphasis**.\n"
          ]
        },
        {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "```\n",
            "Plain code block\n",
            "```"
          ]
        },
        {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "-   List item\n",
            "-   Matplotlib\n"
          ]
        },
        {
          "cell_type": "code",
          "execution_count": 0,
          "metadata": {
            "collapsed": false
          },
          "outputs": [],
          "source": [
            "$\n",
            "%matplotlib inline\n",
            "%matplotlib inline\n",
            "import numpy as np\n",
            "import matplotlib.pyplot as plt\n",
            "$"
          ]
        },
        {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "![sample.png](http://example.com/sample.png)\n"
          ]
        },
        {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "distance = alpha * speed + \beta\n"
          ]
        },
        {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "Inline math formula $alpha$ here.\n"
          ]
        }
      ],
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
  });

  it('demo', function(){
    assert( md2ipynb(this.markdown) == JSON.stringify(this.ipynbArray, false, 2) );
  });
});
