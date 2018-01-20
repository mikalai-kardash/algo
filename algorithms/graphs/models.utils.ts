import { Graph } from './models';
import * as fs from 'fs';

export async function createFromFile(filePath: string): Promise<Graph> {
  return new Promise<Graph>((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      try {
        const content = data.split('\n');
        const vertices = +content[0].trim();
        const edges = +content[1].trim();

        const graph = new Graph(vertices);

        for (let i = 2; i < edges + 2 && i < content.length; i++) {
          const [v, w] = content[i].split(' ');
          graph.addEdge(+v, +w);
        }

        resolve(graph);
      }
      catch (error) {
        reject(`Failed to parse '${filePath}'. ${error || 'Oops..'}.`);
      }
    });

  });
}
