class FaceList extends Array<Face> {

    constructor(private toStr: TypeString = new TypeString()) {
        super();
    }

    /** returns a string in .OBJ format containing all vertices inside this list. */
    public toOBJString(): string {
        var outputStr = '';
        for (var i = 0; i < this.length; i++) {
            outputStr += this[i].toFaceLineInOBJ();
        }
        return outputStr;
    }

    public addUpTo3Faces(x: number, y: number, z: number, vertexList: VertexList): void {
    }
}