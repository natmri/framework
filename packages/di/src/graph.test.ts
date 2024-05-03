import { assert, beforeEach, it, suite } from 'vitest'
import { Graph } from './graph'

suite('Graph', () => {
  let graph: Graph<string>

  beforeEach(() => {
    graph = new Graph<string>(s => s)
  })

  it('is possible to lookup nodes that don\'t exist', () => {
    assert.strictEqual(graph.lookup('ddd'), undefined)
  })

  it('inserts nodes when not there yet', () => {
    assert.strictEqual(graph.lookup('ddd'), undefined)
    assert.strictEqual(graph.lookupOrInsertNode('ddd').data, 'ddd')
    assert.strictEqual(graph.lookup('ddd')!.data, 'ddd')
  })

  it('can remove nodes and get length', () => {
    assert.ok(graph.isEmpty())
    assert.strictEqual(graph.lookup('ddd'), undefined)
    assert.strictEqual(graph.lookupOrInsertNode('ddd').data, 'ddd')
    assert.ok(!graph.isEmpty())
    graph.removeNode('ddd')
    assert.strictEqual(graph.lookup('ddd'), undefined)
    assert.ok(graph.isEmpty())
  })

  it('root', () => {
    graph.insertEdge('1', '2')
    let roots = graph.roots()
    assert.strictEqual(roots.length, 1)
    assert.strictEqual(roots[0].data, '2')

    graph.insertEdge('2', '1')
    roots = graph.roots()
    assert.strictEqual(roots.length, 0)
  })

  it('root complex', () => {
    graph.insertEdge('1', '2')
    graph.insertEdge('1', '3')
    graph.insertEdge('3', '4')

    const roots = graph.roots()
    assert.strictEqual(roots.length, 2)
    assert(['2', '4'].every(n => roots.some(node => node.data === n)))
  })
})
