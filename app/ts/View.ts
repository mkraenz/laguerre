class View {

    private ORIGIN_SPHERE_COLOR: string = "Gold";

    public listOfInvisibleObjects: Array<string>;
    public listOfInvisiblePlanes: Array<string>;
    public listOfInvisibleLabels: Array<string>;

    private ggb: GGBTools;
    private toStr: TypeString;

    constructor(ggbTools: GGBTools, typeString: TypeString) {
        this.ggb = ggbTools;
        this.toStr = typeString;

        this.listOfInvisibleObjects = new Array<string>();
        this.listOfInvisiblePlanes = new Array<string>();
        this.listOfInvisibleLabels = new Array<string>();
    }

    private setHelperObjectsInvisible(): void {
        for (var i: number = 0; i < this.listOfInvisibleObjects.length; i++) {
            ggbApplet.setVisible(this.listOfInvisibleObjects[i], false);
        }
        for (var i: number = 0; i < this.listOfInvisiblePlanes.length; i++) {
            ggbApplet.setVisible(this.listOfInvisiblePlanes[i], false);
        }
    }

    private showLinesInZDirection(): void {
        for (var y: number = 1; y <= Settings.MAX_REGION_IN_POSITIVE_Y_DIRECTION; y++) {
            for (var x: number = 1; x <= Settings.MAX_REGION_IN_POSITIVE_X_DIRECTION; x++) {
                this.intersectXandYTPlanes(x,y);
                this.intersectXandYTPlanes(-x,y);
                this.intersectXandYTPlanes(x,-y);
                this.intersectXandYTPlanes(-x,-y);
            }
        }
    }

    private intersectXandYTPlanes(x: number, y: number): string {
        var name: string = this.toStr.line([x,y,0]);
        var xTPlane: string = this.toStr.tPlane([x, 0, 0]);
        var yTPlane: string = this.toStr.tPlane([0, y, 0]);
        this.listOfInvisibleLabels.push(name);
        return this.ggb.intersect(xTPlane, yTPlane, name);
    }
    public constumizeViewProperties(): void {
        this.setColorOfSphere([0, 0, 0], this.ORIGIN_SPHERE_COLOR);
        //this.showLinesInZDirection();
        this.setHelperObjectsInvisible();
        this.setLabelsInvisible();
    }

    private setLabelsInvisible(): void {
        for (var i: number = 0; i < this.listOfInvisibleLabels.length; i++) {
            ggbApplet.setLabelVisible(this.listOfInvisibleLabels[i], false);
        }
    }

    private setColorOfnthOrderSphere(order: number, color: string): void {
        if (order < 0) {
            throw new Error('Illegal Argument: Order must be greater or equal to zero. Given parameter: order = ' + order);
        }
        var toStr: TypeString = new TypeString();
        for (var i: number = -order; i <= order; i++) {
            for (var j: number = -order; j <= order; j++) {
                var targetRegions: Array<number[]> = [[-order, i, j], [order, i, j], [i, -order, j], [i, order, j],
                    [i, j, -order], [i, j, order]];
                for (var k: number = 0; k < targetRegions.length; k++) {
                    var sphereName: string = toStr.sphere(targetRegions[k]);
                    var isSphereExistent: boolean = ggbApplet.exists(sphereName);
                    if (isSphereExistent) {
                        this.setColorOfSphere(targetRegions[k], color);
                    }
                }
            }
        }
    }

    private setColorOfSphere(targetRegion: number[], color: string): void {
        this.ggb.setColor(this.toStr.sphere(targetRegion), color);
    }
}
