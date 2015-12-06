class Face {
    private vertexList: VertexList = new VertexList();

    public toFaceLineInOBJ(): string {
        return 'f ' + this.getVerticesIndexString() + '\n';
    }

    /** add Vertex to the vertexList, and assert that at most 4 vertices are in the vertexList */
    public addVertex(vertex: Vertex): void {
        if (this.vertexList.length >= 4) {
            throw new Error('AssertionError: Tried to addVertex() to a Face that already has 4 or more vertices ');
        }
        this.vertexList.push(vertex);
    }

    public getVerticesIndexString(): string {
        if (this.vertexList.length != 4) {
            throw new Error('AssertionError: Tried to getVertexIndexString() of Face without exactly 4 vertices.');
        }
        var outputStr: string = '';
        for (var i = 0; i < this.vertexList.length; i++) {
            outputStr += this.vertexList[i].getId() + ' ';
        }
        outputStr.trim(); // remove whitespace
        return outputStr;
    }

    public add4Vertices(v1: Vertex, v2: Vertex, v3: Vertex, v4: Vertex) {
        // TODO refactor using ...args: Vertex[] as parameter
        this.addVertex(v1);
        this.addVertex(v2);
        this.addVertex(v3);
        this.addVertex(v4);
    }
}