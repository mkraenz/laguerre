class Vertex {

    private name: string; // name of corresponding point in ggb
    private xCoord: number;
    private yCoord: number;
    private zCoord: number;

    constructor(private id: number, private index: number[], toStr: TypeString) {
        this.name = toStr.planeIntersectionPoint(index);
    }
        
    /** vertex communicates with its corresponding point in ggb and sets datafields */
    public update() {
        this.xCoord = ggbApplet.getXcoord(this.name);
        this.yCoord = ggbApplet.getYcoord(this.name);
        this.zCoord = ggbApplet.getZcoord(this.name);
    }
    
    /** Extracts coordinates of given point to a string of the form "x y z". */
    private toLineOfCoords(pointName: string): string {
        var xCoord = ggbApplet.getXcoord(pointName);
        var yCoord = ggbApplet.getYcoord(pointName);
        var zCoord = ggbApplet.getZcoord(pointName);
        return xCoord + ' ' + yCoord + ' ' + zCoord;
    }
    
    /** for export to wavefront OBJ format */
    public toVertexLineInOBJ(pointName: string): string {
        return 'v ' + this.toLineOfCoords(pointName) + '\n';
    }

    public getId(): number {
        return this.id;
    }

    /** compares the index of this vertex with the given one and returns true if they are equal */
    public isIndexEqual(compareIndex: number[]): boolean {
        if (compareIndex.length != 3) {
            throw new Error('Assertion failed: given index does not have correct length');
        }
        if (this.index[0] == compareIndex[0] && this.index[1] == compareIndex[1] && this.index[2] == compareIndex[2]) {
            return true;
        }
        else {
            return false;
        }
    }
}