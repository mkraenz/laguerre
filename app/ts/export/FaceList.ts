class FaceList extends Array<Face> {

    constructor(private toStr: TypeString = new TypeString(), private vertexList: VertexList) {
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

    /** adds UP TO 3 faces to this list, a face is added if it is a proper quadrilateral */
    public addUpTo3Faces(x: number, y: number, z: number): void {
        // NOTE: here and in called methods can be optimized a lot. We run through the whole vertexList way to often.
        if (this.vertexList.isVertexExistent(x, y, z)) {
            this.addFaceInXYPlane(x, y, z);
            this.addFaceInXZPlane(x, y, z);
            this.addFaceInYZPlane(x, y, z);
        }
    }
    
    /** adds face [x,y,z], [x+1,y,z], [x+1,y+1,z]. [x,y+1,z] to the list if the face exists, i.e. all
    *   corresponding vertices exist. */
    private addFaceInXYPlane(x: number, y: number, z: number): void {
        var v1: Vertex = this.vertexList.getByIndex(x, y, z);
        var v2: Vertex = this.vertexList.getByIndex(x + 1, y, z);
        var v3: Vertex = this.vertexList.getByIndex(x + 1, y + 1, z);
        var v4: Vertex = this.vertexList.getByIndex(x, y + 1, z);
        if (v1 && v2 && v3 && v4) {
            this.addFace(v1, v2, v3, v4);
        }
    }
    
    /** adds face [x,y,z], [x+1,y,z], [x+1,y+1,z]. [x,y+1,z] to the list if the face exists, i.e. all
    *   corresponding vertices exist. */
    private addFaceInXZPlane(x: number, y: number, z: number): void {
        var v1: Vertex = this.vertexList.getByIndex(x, y, z);
        var v2: Vertex = this.vertexList.getByIndex(x + 1, y, z);
        var v3: Vertex = this.vertexList.getByIndex(x + 1, y, z + 1);
        var v4: Vertex = this.vertexList.getByIndex(x, y, z + 1);
        if (v1 && v2 && v3 && v4) {
            this.addFace(v1, v2, v3, v4);
        }
    }    
    
    /** adds face [x,y,z], [x+1,y,z], [x+1,y+1,z]. [x,y+1,z] to the list if the face exists, i.e. all
    *   corresponding vertices exist. */
    private addFaceInYZPlane(x: number, y: number, z: number): void {
        var v1: Vertex = this.vertexList.getByIndex(x, y, z);
        var v2: Vertex = this.vertexList.getByIndex(x, y + 1, z);
        var v3: Vertex = this.vertexList.getByIndex(x, y + 1, z + 1);
        var v4: Vertex = this.vertexList.getByIndex(x, y, z + 1);
        if (v1 && v2 && v3 && v4) {
            this.addFace(v1, v2, v3, v4);
        }
    }
    
    private addFace(v1: Vertex, v2: Vertex, v3: Vertex, v4: Vertex): void{
            var face = new Face();
            face.add4Vertices(v1, v2, v3, v4);
            this.push(face);
        }
}