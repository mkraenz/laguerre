class Construction {
    private t: Tools = new Tools();
    private ggb: GGBTools = new GGBTools;

    private PROJECTION_POINT_X: string = 'ProjX';
    private PROJECTION_POINT_Y: string = 'ProjY';
    private PROJECTION_POINT_Z: string = 'ProjZ';
    private ORIGIN: string = 'M_{0,0,0}';
    private ORIGIN_SPHERE: string = 's_{0,0,0}';
    private ORIGIN_REGION: number[] = [0, 0, 0];

    public static listOfInvisibleObjects = new Array<string>();
    
    // for the parametrizable spheres' slider
    private PARAMETER_SPHERE_MIDPOINT_MIN = 0.01;
    private PARAMETER_SPHERE_MIDPOINT_MAX = 0.99;
    private PARAMETER_SPHERE_MIDPOINT_INCREMENT_STEP = 0.01;
    private PARAMETER_SLIDER_NAME = 'parameter';

    createInitialSphere() {
        var region: number[] = [0, 0, 0];
        this.t.sphereMidpointFree(region, 0, 0, 0);

        var radiusSliderStr: string = 'r_{' + region.toString() + '}';
        this.ggb.slider(0.1, 10, radiusSliderStr);
        ggbApplet.setValue(radiusSliderStr, 1);
        var sphereName: string = this.t.sphere(region);
        this.ggb.setColor(sphereName, "Gold");
    }

    createProjectionPoints() {
        this.t.pointFree(10, 0, 0, this.PROJECTION_POINT_X);
        this.t.pointFree(0, 10, 0, this.PROJECTION_POINT_Y);
        this.t.pointFree(0, 0, 10, this.PROJECTION_POINT_Z);
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

        var radiusProjX: string = this.ggb.distance(midpointProjX, this.ORIGIN, 'r_{' + this.PROJECTION_POINT_X + '}');
        var radiusProjY: string = this.ggb.distance(midpointProjY, this.ORIGIN, 'r_{' + this.PROJECTION_POINT_Y + '}');
        var radiusProjZ: string = this.ggb.distance(midpointProjZ, this.ORIGIN, 'r_{' + this.PROJECTION_POINT_Z + '}');
        var projectionSphereX: string = this.ggb.sphere(midpointProjX, radiusProjX, 's_{' + this.PROJECTION_POINT_X + '}');
        var projectionSphereY: string = this.ggb.sphere(midpointProjY, radiusProjY, 's_{' + this.PROJECTION_POINT_Y + '}');
        var projectionSphereZ: string = this.ggb.sphere(midpointProjZ, radiusProjZ, 's_{' + this.PROJECTION_POINT_Z + '}');
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

    /**
     * @return name of the created object inside GeoGebra
     */
    private parameterMidpoints(plane1: number[], plane2: number[], plane3: number[]): string {
        
        var region: number[] = this.t.regionIndex(plane1, plane2, plane3);
        var regionIndex: string = region.toString();

        var sliderName = TypeString.typeString(this.PARAMETER_SLIDER_NAME, region);
        this.ggb.slider(this.PARAMETER_SPHERE_MIDPOINT_MIN, this.PARAMETER_SPHERE_MIDPOINT_MAX, sliderName,
            this.PARAMETER_SPHERE_MIDPOINT_INCREMENT_STEP);
        ggbApplet.setValue(sliderName, 0.5);
        var direction = this.t.initialMidpointRayEmitterDirection(region);
        var midpointRayIndex = region.concat(direction);
        var midpointRayName = this.t.midpointRayToString(midpointRayIndex);
        this.t.rayOfSphereMidpoints([0, 0, 0], plane1, plane2, plane3);

        return this.ggb.point(midpointRayName, TypeString.midpointString(region), TypeString.parameterString(region));
    }

    private createParameterMidpoints() {

        var planeArray = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0],
            [0, 0, 1], [0, 0, -1]];
        this.t.rayOfSphereMidpoints([0, 0, 0], planeArray[0], planeArray[2], planeArray[4]);
        this.t.rayOfSphereMidpoints([0, 0, 0], planeArray[1], planeArray[2], planeArray[4]);
        this.t.rayOfSphereMidpoints([0, 0, 0], planeArray[0], planeArray[3], planeArray[4]);
        this.t.rayOfSphereMidpoints([0, 0, 0], planeArray[0], planeArray[2], planeArray[5]);
        createParameterMidpointsSubroutine(planeArray[0], planeArray[2],
            planeArray[4]);
        createParameterMidpointsSubroutine(planeArray[1], planeArray[2],
            planeArray[4]);
        createParameterMidpointsSubroutine(planeArray[0], planeArray[3],
            planeArray[4]);
        createParameterMidpointsSubroutine(planeArray[0], planeArray[2],
            planeArray[5]);
    }


    run() {
        this.createInitialSphere();
        this.createProjectionPoints();
        this.createInitialTangentplanes();
        this.createParameterMidpoints();

        this.setHelperObjectsInvisible();
    }
}
