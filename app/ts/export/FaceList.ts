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
        if (this.vertexList.isVertexExistent(x, y, z)) {
            this.addFaceInXYPlane(x, y, z);
            this.addFaceInXZPlane(x, y, z);
            this.addFaceInYZPlane(x, y, z);
        }
    }
    
    /** adds face [x,y,z], [x+1,y,z], [x+1,y+1,z]. [x,y+1,z] to the list if the face exists, i.e. all
    *   corresponding vertices exist. */
    private addFaceInXYPlane(x: number, y: number, z: number): void {
        
    }
}