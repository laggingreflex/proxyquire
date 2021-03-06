/* jshint asi:true */
'use strict'

var assert = require('assert')
var proxyquire = require('..')

describe('Multiple requires of same module don\'t affect each other', function () {
  describe('Given I require foo stubbed with bar1 as foo1 and foo stubbed with bar2 as foo2', function () {
    var foo1
    var foo2
    var bar1 = { bar: function () { return 'bar1' } }
    var bar2 = { bar: function () { return 'bar2' } }

    before(function () {
      foo1 = proxyquire('./samples/foo', { './bar': bar1 })
      foo2 = proxyquire('./samples/foo', { './bar': bar2 })
    })

    it('foo1.bigBar() == "BAR1"', function () {
      assert.strictEqual(foo1.bigBar(), 'BAR1')
    })

    it('foo2.bigBar() == "BAR2"', function () {
      assert.strictEqual(foo2.bigBar(), 'BAR2')
    })

    describe('and I change bar1.bar() to return barone', function () {
      before(function () {
        bar1.bar = function () { return 'barone' }
      })

      it('foo1.bigBar() == "BARONE"', function () {
        assert.strictEqual(foo1.bigBar(), 'BARONE')
      })

      it('foo2.bigBar() == "BAR2"', function () {
        assert.strictEqual(foo2.bigBar(), 'BAR2')
      })
    })
  })
})
