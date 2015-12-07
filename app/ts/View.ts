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

    private showLineGrid(): void {
        for (var i: number = 0; i < this.listOfInvisiblePlanes.length; i++) {
            for (var j: number = 0; j < this.listOfInvisiblePlanes.length; j++) {
                if (i != j) {
                    this.ggb.intersect(this.listOfInvisiblePlanes[i], this.listOfInvisiblePlanes[j]);
                }
            }
        }
    }

    public constumizeViewProperties(): void {
        this.setHelperObjectsInvisible();
        this.setLabelsInvisible();
        this.setColorOfSphere([0, 0, 0], this.ORIGIN_SPHERE_COLOR);
        //this.showLineGrid();
    }

    public setLabelsInvisible(): void {
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
