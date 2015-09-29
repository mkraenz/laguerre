function runReflectIn3Spheres() {
    var reflectConstruction = new ReflectIn3Spheres();
    reflectConstruction.setUpConstruction();
}

class ReflectIn3Spheres {
    private ORIGIN: string = 'Origin';

    private ggb: GGBTools;
    private t: Tools;
    private view: View;
    private toStr: TypeString;

    constructor() {
        this.toStr = new TypeString();
        this.ggb = new GGBTools();
        this.t = new Tools(this.toStr, this.ggb, this.ORIGIN);
        this.view = new View(this.ggb, this.toStr);
    }

    public setUpConstruction() {

        var POINT_1: string = 'P_1';
        var POINT_2: string = 'P_2';
        var POINT_3: string = 'P_3';
        var GENERIC_PLANE: string = 'tp';

        var MIDPOINT_1: string = 'X';
        var MIDPOINT_2: string = 'Y';
        var MIDPOINT_3: string = 'Z';
        var REFLECTION_PLANE: string = 'mirror';

        var util = new Utils(this.ggb, this.t);

        util.createAbstractedSphereWithSlider(1, 1, 1, 0.25, 0.01, 0.5, 0.01, MIDPOINT_1);
        util.createAbstractedSphereWithSlider(-1, -1, -1, 0.25, 0.01, 0.5, 0.01, MIDPOINT_2);
        util.createAbstractedSphereWithSlider(0, 0, 2, 0.25, 0.01, 0.5, 0.01, MIDPOINT_3);

        this.ggb.plane(MIDPOINT_1, MIDPOINT_2, MIDPOINT_3, REFLECTION_PLANE);

        this.t.pointFree(10, 10, 10, POINT_1);
        this.t.pointFree(1, 0, 0, POINT_2);
        this.t.pointFree(2, 2, 2, POINT_3);
        this.ggb.plane(POINT_1, POINT_2, POINT_3, GENERIC_PLANE);
        this.ggb.mirror(GENERIC_PLANE, REFLECTION_PLANE, 'mirrorImage');
    }
}