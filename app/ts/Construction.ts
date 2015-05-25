class Construction {
    private t: Tools = new Tools();
    private ggb: GGBTools = new GGBTools;
    private PROJECTION_POINT_X: string = 'ProjX';
    private PROJECTION_POINT_Y: string = 'ProjY';
    private PROJECTION_POINT_Z: string = 'ProjZ';
    private ORIGIN: string = 'M_{0,0,0}';
    private ORIGIN_SPHERE: string = 's_{0,0,0}';
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
        var midpointProjX: string = this.ggb.midpoint(segmentProjX, 'MidOfSegOtoProjX');
        var midpointProjY: string = this.ggb.midpoint(segmentProjY, 'MidOfSegOtoProjY');;
        var midpointProjZ: string = this.ggb.midpoint(segmentProjZ, 'MidOfSegOtoProjZ');
        this.listOfInvisibleObjects.push(midpointProjX, midpointProjY, midpointProjZ);
        
        var radiusProjX: string = this.ggb.distance(midpointProjX, this.ORIGIN, 'r_{projX}');
        var radiusProjY: string = this.ggb.distance(midpointProjY, this.ORIGIN, 'r_{projY}');
        var radiusProjZ: string = this.ggb.distance(midpointProjZ, this.ORIGIN, 'r_{projZ}');
        var projectionSphereX: string = this.ggb.sphere(midpointProjX, radiusProjX, 'sProjX');
        var projectionSphereY: string = this.ggb.sphere(midpointProjY, radiusProjY, 'sProjY');
        var projectionSphereZ: string = this.ggb.sphere(midpointProjZ, radiusProjZ, 'sProjZ');
        this.listOfInvisibleObjects.push(projectionSphereX, projectionSphereY, projectionSphereZ);
        
        // there seems to be some bug with naming of conics defined by
        // intersect. thus we have to use c,d,e
        var coneX: string = this.ggb.intersect(projectionSphereX, this.ORIGIN_SPHERE, 'c');
        var coneY: string = this.ggb.intersect(projectionSphereY, this.ORIGIN_SPHERE, 'd');
        var coneZ: string = this.ggb.intersect(projectionSphereZ, this.ORIGIN_SPHERE, 'e');
        var coneProjX: string = this.t.renameObject(coneX, 'coneProjX');
        var coneProjY: string = this.t.renameObject(coneX, 'coneProjY');
        var coneProjZ: string = this.t.renameObject(coneZ, 'coneProjZ');
        
        this.ggb.intersect(coneProjY, coneProjZ, 'TPoint');
        ggbApplet.renameObject('TPoint_1', 'TPoint_{1,0,0}');
        ggbApplet.renameObject('TPoint_2', 'TPoint_{-1,0,0}');
        
        
        
        /*
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
