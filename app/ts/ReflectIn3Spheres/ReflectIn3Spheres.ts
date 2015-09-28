function runReflectIn3Spheres() {
    var reflectConstruction = new ReflectIn3Spheres();
    reflectConstruction.run();
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

    public run() {
        var POINT_1 =  'X';
        var POINT_2 =  'Y';
        var POINT_3 =  'Z';
        var planeName = 'reflectionPlane'
        
        var util = new Utils(this.ggb, this.t);
        util.createAbstractedSphereWithSlider(1, 1, 1, 0.25, 0.01, 0.5, 0.01, POINT_1)
        util.createAbstractedSphereWithSlider(-1, -1, -1, 0.25, 0.01, 0.5, 0.01, POINT_2)
        util.createAbstractedSphereWithSlider(0, 0, 2, 0.25, 0.01, 0.5, 0.01, POINT_3)
        
        this.ggb.plane(POINT_1, POINT_2, POINT_3, planeName);
    }
}