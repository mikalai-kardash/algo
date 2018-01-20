type Edges = number[];

export class Graph {
  private adjacent: Edges[];
  private edges: number;

  constructor(private v: number) {
    this.adjacent = [];
    this.edges = 0;

    for (let i = 0; i < v; i++) {
      this.adjacent[i] = [];
    }
  }

  public addEdge(v: number, w: number): void {
    this.adjacent[v].push(w);
    this.adjacent[w].push(v);
    this.edges++;
  }

  public get V(): number {
    return this.v;
  }

  public get E(): number {
    return this.edges;
  }

  public adj(v: number): number[] {
    return this.adjacent[v];
  }
}
