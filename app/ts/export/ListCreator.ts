class ListCreator {

    private vertexList: VertexList;
    private faceList: FaceList;

    constructor(private toStr: TypeString, private view: View) {
        var intersector = new TPlaneIntersectionPointConstruction(toStr, new GGBTools());
        intersector.createTPlaneIntersectionPoints();
        this.vertexList = this.createVertexList();
        this.faceList = this.createFaceList(this.vertexList);
    }

    public getVertexList(): VertexList {
        return this.vertexList;
    }

    public getFaceList(): FaceList {
        return this.faceList;
    }

    private createVertexList(): VertexList {
        var vertexList = new VertexList();
        // MAX_REGION +-1 since we need the outer tplanes
        for (var x = -Settings.MAX_REGION_IN_NEG_X_DIR - 1; x <= Settings.MAX_REGION_IN_POS_X_DIR + 1; x++) {
            for (var y = -Settings.MAX_REGION_IN_NEG_Y_DIR - 1; y <= Settings.MAX_REGION_IN_POS_Y_DIR + 1; y++) {
                for (var z = -Settings.MAX_REGION_IN_NEG_Z_DIR - 1; z <= Settings.MAX_REGION_IN_POS_Z_DIR + 1; z++) {
                    var index: number[] = [x, y, z];
                    var pointName: string = this.toStr.planeIntersectionPoint(index);
                    if (ggbApplet.isDefined(pointName)) {
                        // vertexList.length +1 since OBJ definition is 1-based not 0-based
                        vertexList.push(new Vertex(vertexList.length + 1, index, this.toStr));
                    }
                }
            }
        }
        if (Settings.debug > 0) {
            console.log('createVertexList() finished. ' + vertexList.length + ' vertices where added');
        }
        return vertexList;
    }

    private createFaceList(vertexList: VertexList): FaceList {
        var faceList: FaceList = new FaceList(this.toStr, vertexList);
        for (var x = -Settings.MAX_REGION_IN_NEG_X_DIR - 1; x <= Settings.MAX_REGION_IN_POS_X_DIR + 1; x++) {
            for (var y = -Settings.MAX_REGION_IN_NEG_Y_DIR - 1; y <= Settings.MAX_REGION_IN_POS_Y_DIR + 1; y++) {
                for (var z = -Settings.MAX_REGION_IN_NEG_Z_DIR - 1; z <= Settings.MAX_REGION_IN_POS_Z_DIR + 1; z++) {
                    faceList.addUpTo3Faces(x, y, z);
                }
            }
        }
        if (Settings.debug > 0) {
            console.log('createFaceList() finished. ' + faceList.length + ' faces where added');
        }
        return faceList;
    }
}
