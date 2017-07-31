class View {

    private ORIGIN_SPHERE_COLOR: string = "Gold";

    public listOfInvisibleObjects: Array<string>;
    public listOfInvisiblePlanes: Array<string>;
    public listOfInvisibleLabels: Array<string>;

    private ggb: GGBTools;
    private toStr: TypeString;

    constructor(ggbTools: GGBTools, typeString: TypeString) {
        this.listOfInvisibleObjects = new Array<string>();
        this.listOfInvisiblePlanes = new Array<string>();
        this.listOfInvisibleLabels = new Array<string>();
        this.ggb = ggbTools;
        this.toStr = typeString;
    }

    private setHelperObjectsInvisible(): void {
        for (var i: number = 0; i < this.listOfInvisibleObjects.length; i++) {
            ggbApplet.setVisible(this.listOfInvisibleObjects[i], false);
        }
        for (var i: number = 0; i < this.listOfInvisiblePlanes.length; i++) {
            ggbApplet.setVisible(this.listOfInvisiblePlanes[i], false);
        }
    }

    public customizeViewProperties(): void {
        this.setHelperObjectsInvisible();
        this.setLabelsInvisible();
        this.setColorOfSphere([0, 0, 0], this.ORIGIN_SPHERE_COLOR);
    }

    public setLabelsInvisible(): void {
        var allGGBObjectNames: string[] = ggbApplet.getAllObjectNames();
        for (var i = 0; i < allGGBObjectNames.length; i++) {
            ggbApplet.setLabelVisible(allGGBObjectNames[i], false);
        }
    }

    private setColorOfnthOrderSphere(order: number, color: string): void {
        // Starting at order 0. 0 colors the origin sphere, then proceed outwards by steps of 1
        if (order < 0) {
            throw new Error('Illegal Argument: Order must be greater or equal to zero. Given parameter: order = '
                + order);
        }
        for (var i: number = -order; i <= order; i++) {
            for (var j: number = -order; j <= order; j++) {
                var targetRegions: Array<number[]> = [[-order, i, j], [order, i, j], [i, -order, j], [i, order, j],
                    [i, j, -order], [i, j, order]];
                for (var k: number = 0; k < targetRegions.length; k++) {
                    if (ggbApplet.exists(this.toStr.sphere(targetRegions[k]))) {
                        this.setColorOfSphere(targetRegions[k], color);
                    }
                }
            }
        }
    }

    private setColorOfSphere(targetRegion: number[], color: string): void {
        this.ggb.setColor(this.toStr.sphere(targetRegion), color);
    }

    public hideSphere(regionIndex: number[]): void {
        if (ggbApplet.exists(this.toStr.sphere(regionIndex))) {
            ggbApplet.setVisible(this.toStr.sphere(regionIndex), false);
        }
    }

    public hideallNonInspheres(): void {

        for (var y: number = -Settings.MAX_REGION_IN_NEG_Y_DIR; y <= Settings.MAX_REGION_IN_POS_Y_DIR; y++) {
            for (var z: number = -Settings.MAX_REGION_IN_NEG_Z_DIR; z <= Settings.MAX_REGION_IN_POS_Z_DIR; z++) {

                this.hideSphere([-Settings.MAX_REGION_IN_NEG_X_DIR - 1, y, z])
                this.hideSphere([Settings.MAX_REGION_IN_POS_X_DIR + 1, y, z])
            }
            for (var x: number = -Settings.MAX_REGION_IN_NEG_X_DIR; x <= Settings.MAX_REGION_IN_POS_X_DIR; x++) {
                this.hideSphere([x, y, -Settings.MAX_REGION_IN_NEG_Z_DIR - 1])
                this.hideSphere([x, y, Settings.MAX_REGION_IN_POS_Z_DIR + 1])
            }
        }

        for (var x: number = -Settings.MAX_REGION_IN_NEG_X_DIR; x <= Settings.MAX_REGION_IN_POS_X_DIR; x++) {
            for (var z: number = -Settings.MAX_REGION_IN_NEG_Z_DIR; z <= Settings.MAX_REGION_IN_POS_Z_DIR; z++) {
                this.hideSphere([x, -Settings.MAX_REGION_IN_NEG_Y_DIR - 1, z])
                this.hideSphere([x, Settings.MAX_REGION_IN_POS_Y_DIR + 1, z])

            }
        }
    }
}
