import { expect } from 'chai';
import { Graph } from './models';
import { createFromFile } from './models.utils';
import * as path from 'path';

describe('graph', function () {

  let graph: Graph;

  it('can be created', function () {
    graph = new Graph(3);
    expect(graph.V).to.equal(3);
  });

  it('can add edges', function () {
    graph = new Graph(4);
    graph.addEdge(1, 2);
    graph.addEdge(2, 3);
    graph.addEdge(3, 1);

    expect(graph.E).to.equal(3);
  });

  it('adds edges bi-directional', function () {
    graph = new Graph(2);
    graph.addEdge(0, 1);

    expect(graph.adj(0)).to.contain(1);
    expect(graph.adj(1)).to.contain(0);
  });

  it('builds graph from file info', async function () {
    const filePath = path.resolve(__dirname, 'tinyG.txt');
    const graph = await createFromFile(filePath);

    expect(graph.V).to.be.greaterThan(0);
    expect(graph.E).to.be.greaterThan(0);
  });

});
