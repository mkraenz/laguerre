function runCotangentialConic() {
    var cotangentialConic = new CotangentialConic();
    cotangentialConic.run();
}


class CotangentialConic {

    private ORIGIN: string = 'Origin';

    private O_MIDPOINT_VARIABLE: string = 'O_{variable}';
    private M_MIDPOINT_VARIABLE: string = 'M_{variable}';
    private O_MIDPOINT_DERIVED: string = 'O';
    private M_MIDPOINT_DERIVED: string = 'M';
    private O_SLIDER: string = 'r_{o slider}';
    private M_SLIDER: string = 'r_{m slider}';
    private O_SPHERE: string = 'so';
    private M_SPHERE: string = 'sm';

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
        this.t.pointFree(0, 0, 0, this.ORIGIN);
        this.createMidpoints();
        this.createSliders();
        this.createSpheresMidpointsAndRadii();
        ggbApplet.evalCommand("sbig = If[ro >= rm, so, sm]");
        ggbApplet.evalCommand("rd = abs(rm - ro)");
        ggbApplet.evalCommand("seg = Segment[M, O]");
        ggbApplet.evalCommand("SegMid = Midpoint[seg]");
        ggbApplet.evalCommand("sd = Sphere[Midpoint[sbig], rd]");
        ggbApplet.evalCommand("sSegMid = Sphere[SegMid, Distance[SegMid, M]]");
        ggbApplet.evalCommand("coned = If[ro != rm, Intersect[sSegMid, sd], "
            + "Intersect[OrthogonalPlane[O, Vector[M, O]], so]]");

        this.createThreePointsOnCone("coned");
        this.projectOntoBigSphere();
        /*
         * Here is possibly a bug source. GeoGebra tries to find 2 intersection points
         * of a ray with sbig. Hopefully, always the second index _2 will always be the
         * one which is defined, while the other is undefined. This might turn out to be
         * a false hope...
         */
        ggbApplet.evalCommand("c = Circle[PointOnSbig1_2, PointOnSbig2_2,"
            + " PointOnSbig3_2]");
    }
    /**
     * function definitions
     */
    private createMidpoints() {
        this.t.pointFree(2, 0, 0, this.M_MIDPOINT_VARIABLE);
        this.t.pointFree(1, 1, 1, this.O_MIDPOINT_VARIABLE);
    }

    private createSliders() {
        this.ggb.slider(CotangentialConicSettings.SLIDER_MIN_VALUE,
            CotangentialConicSettings.SLIDER_MAX_VALUE, this.O_SLIDER);
        this.ggb.slider(CotangentialConicSettings.SLIDER_MIN_VALUE,
             CotangentialConicSettings.SLIDER_MAX_VALUE, this.M_SLIDER);

        ggbApplet.setValue(this.O_SLIDER,1);
        ggbApplet.setValue(this.M_SLIDER, CotangentialConicSettings.SLIDER_INIT_VALUE);
    }

    private createSpheresMidpointsAndRadii() {
        this.ggb.sphere(this.O_MIDPOINT_VARIABLE, this.O_SLIDER, this.O_SPHERE)
        this.ggb.sphere(this.M_MIDPOINT_VARIABLE, this.M_SLIDER, this.M_SPHERE)

        this.ggb.midpoint(this.O_SPHERE, this.O_MIDPOINT_DERIVED);
        this.ggb.midpoint(this.M_SPHERE, this.M_MIDPOINT_DERIVED);
        
        this.ggb.radius(this.O_SPHERE, 'ro');
        this.ggb.radius(this.M_SPHERE, 'rm');
    }

    private createThreePointsOnCone(coneName: string) {
        ggbApplet.evalCommand("P_1 = Point[" + coneName + ", 1]");
        ggbApplet.evalCommand("P_2 = Point[" + coneName + ", 1/2]");
        ggbApplet.evalCommand("P_3 = Point[" + coneName + ", 1/4]");
    }

    private projectOntoBigSphere() {
        ggbApplet.evalCommand("ray1 = Ray[Midpoint[sbig],P_1]");
        ggbApplet.evalCommand("ray2 = Ray[Midpoint[sbig],P_2]");
        ggbApplet.evalCommand("ray3 = Ray[Midpoint[sbig],P_3]");
        ggbApplet.evalCommand("PointOnSbig1 = Intersect[ray1, sbig] ");
        ggbApplet.evalCommand("PointOnSbig2 = Intersect[ray2, sbig]");
        ggbApplet.evalCommand("PointOnSbig3 = Intersect[ray3, sbig]");
    }
}
