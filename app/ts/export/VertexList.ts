class VertexList extends Array<Vertex> {

    /** returns a string in .OBJ format containing all vertices inside this list. */
    public toOBJString(): string {
        var outputStr = '';
        for (var i = 0; i < this.length; i++) {
            outputStr += this[i].toVertexLineInOBJ();
        }
        return outputStr;
    }

    /** returns Vertex with given index, or null if there is no such Vertex. */
    public getVertexByIndex(index: number[]): Vertex {
        for (var i = 0; i < this.length; i++) {
            if (this[i].isIndexEqual(index)) {
                return this[i];
            }
        }
        return null;
    }
}