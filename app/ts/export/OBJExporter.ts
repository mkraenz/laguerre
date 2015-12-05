class OBJExporter {

    constructor(private toStr: TypeString = new TypeString()) { }

    public extractData(): string {
        // TODO: implement 
        return 'TODO implement me';
    }

    private createVertexList(): VertexList {
        var vertexList = new VertexList();
        for (var x = -Settings.MAX_REGION_IN_NEG_X_DIR; x <= Settings.MAX_REGION_IN_POS_X_DIR; x++) {
            for (var y = -Settings.MAX_REGION_IN_NEG_Y_DIR; y <= Settings.MAX_REGION_IN_POS_Y_DIR; y++) {
                for (var z = -Settings.MAX_REGION_IN_NEG_Z_DIR; z <= Settings.MAX_REGION_IN_POS_Z_DIR; z++) {
                    var index: number[] = [x, y, z];
                    if (ggbApplet.exists(this.toStr.planeIntersectionPoint(index))) {
                        vertexList.push(new Vertex(vertexList.length, index, this.toStr));
                    }
                }
            }
        }
        if (Settings.debug > 0) {
            console.log('createVertexList() finished. ' + vertexList.length + ' many vertices where added');
        }
        return vertexList;
    }

    private createFaceList(vertexList: VertexList): FaceList {
        var faceList: FaceList = new FaceList(this.toStr);
        for (var x = -Settings.MAX_REGION_IN_NEG_X_DIR; x <= Settings.MAX_REGION_IN_POS_X_DIR; x++) {
            for (var y = -Settings.MAX_REGION_IN_NEG_Y_DIR; y <= Settings.MAX_REGION_IN_POS_Y_DIR; y++) {
                for (var z = -Settings.MAX_REGION_IN_NEG_Z_DIR; z <= Settings.MAX_REGION_IN_POS_Z_DIR; z++) {
                    faceList.addUpTo3Faces(x, y, z, vertexList);
                }
            }
        }
        if (Settings.debug > 0) {
            console.log('createFaceList() finished. ' + faceList.length + ' many faces where added');
        }
        return null;
    }
}
