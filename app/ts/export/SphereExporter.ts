class SphereExporter {

    constructor(private toStr: TypeString) { }
    
    /** Extracts coords of Sphere midpoint and radius in the form "x y z \n r" */
    private toLinesXYZRadius(sphereIndex: number[]): string {
        var midpoint: string = this.toStr.midpoint(sphereIndex);
        var radiusName: string = this.toStr.radius(sphereIndex);
        return this.toLineOfCoords(midpoint) + '\n' + ggbApplet.getValue(radiusName).toFixed(Settings.PRECISION) + '\n';
    }
    
    /** Extracts coordinates of given point to a string of the form "x y z". */
    private toLineOfCoords(pointName: string): string {
        var xCoord = ggbApplet.getXcoord(pointName).toFixed(Settings.PRECISION);
        var yCoord = ggbApplet.getYcoord(pointName).toFixed(Settings.PRECISION);
        var zCoord = ggbApplet.getZcoord(pointName).toFixed(Settings.PRECISION);
        return xCoord + ' ' + yCoord + ' ' + zCoord;
    }
    
    /**
    * extracts all spheres in form "x y z r" (one line per sphere),
    * where all means all existing spheres specified via Settings MAX_REGION_etc
    * example: settings.MAX_REG = 2 for all will export the spheres of 3x3x3 cube
    * // TODO: issue #72 so I do not need the +-1 and can export for any number in Settings
    */
    public extractAllSpheres(): string {
        var outputStr: string = '';
        for (var x = -Settings.MAX_REGION_IN_NEG_X_DIR + 1; x <= Settings.MAX_REGION_IN_POS_X_DIR - 1; x++) {
            for (var y = -Settings.MAX_REGION_IN_NEG_Y_DIR + 1; y <= Settings.MAX_REGION_IN_POS_Y_DIR - 1; y++) {
                for (var z = -Settings.MAX_REGION_IN_NEG_Z_DIR + 1; z <= Settings.MAX_REGION_IN_POS_Z_DIR - 1; z++) {
                    var sphereName = this.toStr.sphere([x, y, z]);
                    if (ggbApplet.isDefined(sphereName) && ggbApplet.getVisible(sphereName)) {
                        outputStr += this.toLinesXYZRadius([x, y, z]);
                    }
                }
            }
        }
        return outputStr.trim();
    }
}
