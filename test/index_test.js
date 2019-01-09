const mocha = require('mocha')
const assert = require('power-assert')

const md2ipynb = require('..')
const { input, output } = require('./fixture')

describe('index()', () => {
  beforeEach(() => {
    this.markdown = input
    this.ipynbArray = output
  })

  it('demo', () => {
    assert.equal(
      md2ipynb(this.markdown),
      JSON.stringify(this.ipynbArray, false, 2)
    )
  })
})
