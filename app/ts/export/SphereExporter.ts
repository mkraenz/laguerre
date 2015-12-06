class SphereExporter {

    constructor(private toStr: TypeString) {
    }
    
    /** Extracts coords of Sphere midpoint and radius in the form "x y z \n r" */
    private toLinesXYZRadius(sphereIndex: number[]): string {
        var midpoint: string = this.toStr.midpoint(sphereIndex);
        var radiusName: string = this.toStr.radius(sphereIndex);
        return this.toLineOfCoords(midpoint) + '\n' + ggbApplet.getValue(radiusName) + '\n';
    }
    
    /** Extracts coordinates of given point to a string of the form "x y z". */
    private toLineOfCoords(pointName: string): string {
        var xCoord = ggbApplet.getXcoord(pointName);
        var yCoord = ggbApplet.getYcoord(pointName);
        var zCoord = ggbApplet.getZcoord(pointName);
        return xCoord + ' ' + yCoord + ' ' + zCoord;
    }
    
    /**
    * extracts all spheres in form "x y z r" (one line per sphere),
    * where all means all existing spheres specified via Settings MAX_REGION_etc
    */
    public extractAllSpheres(): string {
        var outputStr: string = '';
        for (var x = -Settings.MAX_REGION_IN_NEG_X_DIR; x <= Settings.MAX_REGION_IN_POS_X_DIR; x++) {
            for (var y = -Settings.MAX_REGION_IN_NEG_Y_DIR; y <= Settings.MAX_REGION_IN_POS_Y_DIR; y++) {
                for (var z = -Settings.MAX_REGION_IN_NEG_Z_DIR; z <= Settings.MAX_REGION_IN_POS_Z_DIR; z++) {
                    if (ggbApplet.exists(this.toStr.sphere([x, y, z]))) {
                        outputStr += this.toLinesXYZRadius([x, y, z]);
                    }
                }
            }
        }
        return outputStr;
    }
}