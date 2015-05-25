class Construction {
    private t: Tools = new Tools();
    private ggb: GGBTools = new GGBTools;
    private PROJECTION_POINT_X: string = 'ProjX';
    private PROJECTION_POINT_Y: string = 'ProjY';
    private PROJECTION_POINT_Z: string = 'ProjZ';
    private ORIGIN: string = 'M_{0,0,0}';
    private ORIGIN_SPHERE: string = 's_{0,0,0}';
    public static listOfInvisibleObjects = new Array<string>();

    createInitialSphere() {
        var region: number[] = [0, 0, 0];
        this.t.sphereMidpoint(region, 0, 0, 0);

        var radiusSliderStr: string = 'r_{' + region.toString() + '}';
        this.ggb.slider(0.1, 10, radiusSliderStr);
        ggbApplet.setValue(radiusSliderStr, 1);
        var sphereName: string = this.t.sphere(region);
        this.ggb.setColor(sphereName, "Gold");
    }

    createProjectionPoints() {
        this.t.point(10, 0, 0, this.PROJECTION_POINT_X);
        this.t.point(0, 10, 0, this.PROJECTION_POINT_Y);
        this.t.point(0, 0, 10, this.PROJECTION_POINT_Z);
    }

    createInitialTangentplanes() {
        var segmentProjX: string = "segmentProjXToOrigin";
        var segmentProjY: string = "segmentProjYToOrigin";
        var segmentProjZ: string = "segmentProjZToOrigin";
        Construction.listOfInvisibleObjects.push(segmentProjX, segmentProjY, segmentProjZ);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_X, segmentProjX);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_Y, segmentProjY);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_Z, segmentProjZ);
        var midpointProjX: string = this.ggb.midpoint(segmentProjX, 'MidOfSegOtoProjX');
        var midpointProjY: string = this.ggb.midpoint(segmentProjY, 'MidOfSegOtoProjY');;
        var midpointProjZ: string = this.ggb.midpoint(segmentProjZ, 'MidOfSegOtoProjZ');
        Construction.listOfInvisibleObjects.push(midpointProjX, midpointProjY, midpointProjZ);

        var radiusProjX: string = this.ggb.distance(midpointProjX, this.ORIGIN, 'r_{projX}');
        var radiusProjY: string = this.ggb.distance(midpointProjY, this.ORIGIN, 'r_{projY}');
        var radiusProjZ: string = this.ggb.distance(midpointProjZ, this.ORIGIN, 'r_{projZ}');
        var projectionSphereX: string = this.ggb.sphere(midpointProjX, radiusProjX, 'sProjX');
        var projectionSphereY: string = this.ggb.sphere(midpointProjY, radiusProjY, 'sProjY');
        var projectionSphereZ: string = this.ggb.sphere(midpointProjZ, radiusProjZ, 'sProjZ');
        Construction.listOfInvisibleObjects.push(projectionSphereX, projectionSphereY, projectionSphereZ);
        
        // there seems to be some bug with naming of conics defined by
        // intersect. thus we have to use c,d,e
        var coneX: string = this.ggb.intersect(projectionSphereX, this.ORIGIN_SPHERE, 'c');
        var coneY: string = this.ggb.intersect(projectionSphereY, this.ORIGIN_SPHERE, 'd');
        var coneZ: string = this.ggb.intersect(projectionSphereZ, this.ORIGIN_SPHERE, 'e');
        var coneProjX: string = this.t.renameObject(coneX, 'coneProjX');
        var coneProjY: string = this.t.renameObject(coneY, 'coneProjY');
        var coneProjZ: string = this.t.renameObject(coneZ, 'coneProjZ');

        this.ggb.intersect(coneProjY, coneProjZ, 'TPointX');
        var tPointPosX: string = this.t.renameObject('TPointX_1', 'TPoint_{1,0,0}');
        var tPointNegX: string = this.t.renameObject('TPointX_2', 'TPoint_{-1,0,0}');
        this.ggb.intersect(coneProjX, coneProjZ, 'TPointY');
        var tPointNegY: string = this.t.renameObject('TPointY_1', 'TPoint_{0,-1,0}');
        var tPointPosY: string = this.t.renameObject('TPointY_2', 'TPoint_{0,1,0}');
        this.ggb.intersect(coneProjX, coneProjY, 'TPointZ');
        var tPointPosZ: string = this.t.renameObject('TPointZ_1', 'TPoint_{0,0,1}');
        var tPointNegZ: string = this.t.renameObject('TPointZ_2', 'TPoint_{0,0,-1}');
        Construction.listOfInvisibleObjects.push(tPointPosX, tPointNegX, tPointNegY, tPointPosY, tPointPosZ, tPointNegZ);
        this.ggb.tangentialPlaneToSphere(this.ORIGIN_SPHERE, tPointPosX, 'tp_{1,0,0}');
        this.ggb.tangentialPlaneToSphere(this.ORIGIN_SPHERE, tPointNegX, 'tp_{-1,0,0}');
        this.ggb.tangentialPlaneToSphere(this.ORIGIN_SPHERE, tPointPosY, 'tp_{0,1,0}');
        this.ggb.tangentialPlaneToSphere(this.ORIGIN_SPHERE, tPointNegY, 'tp_{0,-1,0}');
        this.ggb.tangentialPlaneToSphere(this.ORIGIN_SPHERE, tPointPosZ, 'tp_{0,0,1}');
        this.ggb.tangentialPlaneToSphere(this.ORIGIN_SPHERE, tPointNegZ, 'tp_{0,0,-1}');
    }

    private setHelperObjectsInvisible() {
        for (var i: number = 0; i < Construction.listOfInvisibleObjects.length; i++) {
            ggbApplet.setVisible(Construction.listOfInvisibleObjects[i], false);
        }
    }


    run() {
        this.createInitialSphere();
        this.createProjectionPoints();
        this.createInitialTangentplanes();

        this.setHelperObjectsInvisible();
    }
}
