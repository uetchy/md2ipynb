const mocha = require('mocha')
const assert = require('power-assert')

const md2ipynb = require('../lib')
const { input, output } = require('./fixture')

describe('index()', function() {
  beforeEach(function() {
    this.markdown = input
    this.ipynbArray = output
  })

  it('demo', function() {
    assert.equal(
      md2ipynb(this.markdown),
      JSON.stringify(this.ipynbArray, false, 2)
    )
  })
})
