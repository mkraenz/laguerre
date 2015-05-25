class Construction {
    private t: Tools = new Tools();
    private ggb: GGBTools = new GGBTools;
    private PROJECTION_POINT_X: string = 'ProjX';
    private PROJECTION_POINT_Y: string = 'ProjY';
    private PROJECTION_POINT_Z: string = 'ProjZ';
    private ORIGIN: string = 'M_{0,0,0}';
    private listOfInvisibleObjects = new Array<string>();

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
        this.listOfInvisibleObjects.push(segmentProjX, segmentProjY, segmentProjZ);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_X, segmentProjX);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_Y, segmentProjY);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_Z, segmentProjZ);
        var midpointProjX: string = "MidOfSegOtoProjX";
        var midpointProjY: string = "MidOfSegOtoProjY";
        var midpointProjZ: string = "MidOfSegOtoProjZ";
        this.listOfInvisibleObjects.push(midpointProjX, midpointProjY, midpointProjZ);
        this.ggb.midpoint(segmentProjX, midpointProjX);
        this.ggb.midpoint(segmentProjY, midpointProjY);
        this.ggb.midpoint(segmentProjZ, midpointProjZ);
        var projectionSphereX: string = 'sProjX';
        var projectionSphereY: string = 'sProjY';
        var projectionSphereZ: string = 'sProjZ';
        this.listOfInvisibleObjects.push(projectionSphereX, projectionSphereY, projectionSphereZ);
        this.ggb.sphere(midpointProjX, 'Distance[' + midpointProjX + ', ' + this.ORIGIN +']', projectionSphereX);
        this.ggb.sphere(midpointProjY, 'Distance[' + midpointProjY + ', ' + this.ORIGIN +']', projectionSphereY);
        this.ggb.sphere(midpointProjZ, 'Distance[' + midpointProjZ + ', ' + this.ORIGIN +']', projectionSphereZ);
        /*
        ggbApplet
            .evalCommand('sProjY = Sphere[MidOfSegOtoProjY, Distance[MidOfSegOtoProjY, O]]');
        ggbApplet
            .evalCommand('sProjZ = Sphere[MidOfSegOtoProjZ, Distance[MidOfSegOtoProjZ, O]]');
        ggbApplet.setVisible('sProjX', false);
        ggbApplet.setVisible('sProjY', false);
        ggbApplet.setVisible('sProjZ', false);
        // there seems to be some bug with naming of conics defined by
        // intersect. thus we have to use c,d,e
        ggbApplet.evalCommand('c = Intersect[sProjX, s_0]');
        ggbApplet.evalCommand('d = Intersect[sProjY, s_0]');
        ggbApplet.evalCommand('e = Intersect[sProjZ, s_0]');
        ggbApplet.renameObject('c', 'coneProjX');
        ggbApplet.renameObject('d', 'coneProjY');
        ggbApplet.renameObject('e', 'coneProjZ');
        ggbApplet.evalCommand('TPoint = Intersect[coneProjY, coneProjZ]');
        ggbApplet.renameObject('TPoint_1', 'TPoint_{1,0,0}');
        ggbApplet.renameObject('TPoint_2', 'TPoint_{-1,0,0}');
        ggbApplet.setVisible('TPoint_{1,0,0}', false);
        ggbApplet.setVisible('TPoint_{-1,0,0}', false);
        ggbApplet.evalCommand('TPoint = Intersect[coneProjX, coneProjZ]');
        ggbApplet.renameObject('TPoint_1', 'TPoint_{0,-1,0}');
        ggbApplet.renameObject('TPoint_2', 'TPoint_{0,1,0}');
        ggbApplet.setVisible('TPoint_{0,1,0}', false);
        ggbApplet.setVisible('TPoint_{0,-1,0}', false);
        ggbApplet.evalCommand('TPoint = Intersect[coneProjX, coneProjY]');
        ggbApplet.renameObject('TPoint_1', 'TPoint_{0,0,1}');
        ggbApplet.renameObject('TPoint_2', 'TPoint_{0,0,-1}');
        ggbApplet.setVisible('TPoint_{0,0,1}', false);
        ggbApplet.setVisible('TPoint_{0,0,-1}', false);
        ggbApplet
            .evalCommand('tp_{1,0,0} = TangentialPlaneToSphere[s_0, TPoint_{1,0,0}]');
        ggbApplet
            .evalCommand('tp_{-1,0,0} = TangentialPlaneToSphere[s_0, TPoint_{-1,0,0}]');
        ggbApplet
            .evalCommand('tp_{0,1,0} = TangentialPlaneToSphere[s_0, TPoint_{0,1,0}]');
        ggbApplet
            .evalCommand('tp_{0,-1,0} = TangentialPlaneToSphere[s_0, TPoint_{0,-1,0}]');
        ggbApplet
            .evalCommand('tp_{0,0,1} = TangentialPlaneToSphere[s_0, TPoint_{0,0,1}]');
        ggbApplet
            .evalCommand('tp_{0,0,-1} = TangentialPlaneToSphere[s_0, TPoint_{0,0,-1}]');
        */
    }

    private setHelperObjectsInvisible() {
        for (var i: number = 0; i < this.listOfInvisibleObjects.length; i++) {
            ggbApplet.setVisible(this.listOfInvisibleObjects[i], false);
        }
    }


    run() {
        this.createInitialSphere();
        this.createProjectionPoints();
        this.createInitialTangentplanes();

        this.setHelperObjectsInvisible();
    }
}
