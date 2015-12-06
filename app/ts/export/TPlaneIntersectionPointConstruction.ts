/**
 * Handles construction of the vertices for extraction. Extra class since the vertices are not neccessarily a part
 * of the IS-net and take extra time to compute dynamically for ggb.
 */
class TPlaneIntersectionPointConstruction {

    constructor(private toStr: TypeString = new TypeString(), private ggb: GGBTools = new GGBTools()) { }

    /** intersects the planes tp_{x,0,0}, {0,y,0}, {0,0,z} if they are all well-defined */
    private intersect3Planes(x: number, y: number, z: number): string {
        var planeNameX: string = this.toStr.tPlane([x, 0, 0]);
        var planeNameY: string = this.toStr.tPlane([0, y, 0]);
        var planeNameZ: string = this.toStr.tPlane([0, 0, z]);
        return this.ggb.intersect3Planes(planeNameX, planeNameY, planeNameZ);
    }

    public createTPlaneIntersectionPoints() {
        for (var x = -Settings.MAX_REGION_IN_NEG_X_DIR; x <= Settings.MAX_REGION_IN_POS_X_DIR; x++) {
            for (var y = -Settings.MAX_REGION_IN_NEG_Y_DIR; y <= Settings.MAX_REGION_IN_POS_Y_DIR; y++) {
                for (var z = -Settings.MAX_REGION_IN_NEG_Z_DIR; z <= Settings.MAX_REGION_IN_POS_Z_DIR; z++) {
                    this.intersect3Planes(x, y, z);
                }
            }
        }
    }

}