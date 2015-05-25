class Construction {
    // singleton
    private t: Tools = new Tools();
    private PROJECTION_POINT_X: string = 'ProjX';
    private PROJECTION_POINT_Y: string = 'ProjY';
    private PROJECTION_POINT_Z: string = 'ProjZ';

    createInitialSphere() {
        var region: number[] = [0, 0, 0];
        this.t.midpoint(region, 0, 0, 0);

        var radiusSliderStr: string = 'r_{' + region.toString() + '}';
        this.t.slider(0.1, 10, radiusSliderStr);
        ggbApplet.setValue(radiusSliderStr, 1);
        var sphereName: string = this.t.sphere(region);
        this.t.setColor(sphereName, "Gold");
    }
    
    createProjectionPoints() {
        this.t.generalPoint(10,0,0, this.PROJECTION_POINT_X);
        this.t.generalPoint(0,10,0, this.PROJECTION_POINT_Y);
        this.t.generalPoint(0,0,10, this.PROJECTION_POINT_Z);
    }
    
     createInitialTangentplanes() {
    ggbApplet.evalCommand('MidOfSegOtoProjX = Midpoint[Segment[O, ProjX]]');
    ggbApplet.evalCommand('MidOfSegOtoProjY = Midpoint[Segment[O, ProjY]]');
    ggbApplet.evalCommand('MidOfSegOtoProjZ = Midpoint[Segment[O, ProjZ]]');
    ggbApplet.setVisible('MidOfSegOtoProjX', false);
    ggbApplet.setVisible('MidOfSegOtoProjY', false);
    ggbApplet.setVisible('MidOfSegOtoProjZ', false);
    ggbApplet
            .evalCommand('sProjX = Sphere[MidOfSegOtoProjX, Distance[MidOfSegOtoProjX, O]]');
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
}


    run() {
        this.createInitialSphere();
        this.createProjectionPoints();
    }
}
