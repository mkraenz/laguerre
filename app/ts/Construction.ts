class Construction {

    private REGIONS_IN_POSITIVE_X_DIRECTION: number = 5;

    private PROJECTION_POINT_X: string = 'ProjX';
    private PROJECTION_POINT_Y: string = 'ProjY';
    private PROJECTION_POINT_Z: string = 'ProjZ';
    private ORIGIN_REGION: number[] = [0, 0, 0];
    private ORIGIN: string = TypeString.midpoint(this.ORIGIN_REGION);
    private ORIGIN_SPHERE: string = TypeString.sphere(this.ORIGIN_REGION);

    private listOfInvisibleObjects = new Array<string>();
    private listOfInvisibleLabels = new Array<string>();
    
    // for the parametrizable spheres' slider
    private PARAMETER_SPHERE_MIDPOINT_MIN = 0.01;
    private PARAMETER_SPHERE_MIDPOINT_MAX = 0.99;
    private PARAMETER_SPHERE_MIDPOINT_INCREMENT_STEP = 0.01;

    private ggb: GGBTools = new GGBTools();
    private t: Tools = new Tools(this.ggb, this.ORIGIN);

    createInitialSphere() {
        var region: number[] = [0, 0, 0];
        this.t.sphereMidpointFree(region, 0, 0, 0);

        var radiusSliderStr: string = TypeString.radius(region);
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
        this.listOfInvisibleObjects.push(segmentProjX, segmentProjY, segmentProjZ);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_X, segmentProjX);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_Y, segmentProjY);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_Z, segmentProjZ);
        var midpointProjX: string = this.ggb.midpoint(segmentProjX, 'MidOfSegOtoProjX');
        var midpointProjY: string = this.ggb.midpoint(segmentProjY, 'MidOfSegOtoProjY');;
        var midpointProjZ: string = this.ggb.midpoint(segmentProjZ, 'MidOfSegOtoProjZ');
        this.listOfInvisibleObjects.push(midpointProjX, midpointProjY, midpointProjZ);

        var radiusProjX: string = this.ggb.distance(midpointProjX, this.ORIGIN, 'r_{' + this.PROJECTION_POINT_X + '}');
        var radiusProjY: string = this.ggb.distance(midpointProjY, this.ORIGIN, 'r_{' + this.PROJECTION_POINT_Y + '}');
        var radiusProjZ: string = this.ggb.distance(midpointProjZ, this.ORIGIN, 'r_{' + this.PROJECTION_POINT_Z + '}');
        var projectionSphereX: string = this.ggb.sphere(midpointProjX, radiusProjX, 's_{' + this.PROJECTION_POINT_X + '}');
        var projectionSphereY: string = this.ggb.sphere(midpointProjY, radiusProjY, 's_{' + this.PROJECTION_POINT_Y + '}');
        var projectionSphereZ: string = this.ggb.sphere(midpointProjZ, radiusProjZ, 's_{' + this.PROJECTION_POINT_Z + '}');
        this.listOfInvisibleObjects.push(projectionSphereX, projectionSphereY, projectionSphereZ);
        
        // there seems to be some bug with naming of conics defined by
        // intersect. thus we have to use c,d,e
        var coneX: string = this.ggb.intersect(projectionSphereX, this.ORIGIN_SPHERE, 'c');
        var coneY: string = this.ggb.intersect(projectionSphereY, this.ORIGIN_SPHERE, 'd');
        var coneZ: string = this.ggb.intersect(projectionSphereZ, this.ORIGIN_SPHERE, 'e');
        var coneProjX: string = this.t.renameObject(coneX, 'coneProjX');
        var coneProjY: string = this.t.renameObject(coneY, 'coneProjY');
        var coneProjZ: string = this.t.renameObject(coneZ, 'coneProjZ');
        this.listOfInvisibleObjects.push(coneProjX, coneProjY, coneProjZ);

        this.ggb.intersect(coneProjY, coneProjZ, 'TPointX');
        var tPointPosX: string = this.t.renameObject('TPointX_1', TypeString.tPoint([1, 0, 0]));
        var tPointNegX: string = this.t.renameObject('TPointX_2', TypeString.tPoint([-1, 0, 0]));
        this.ggb.intersect(coneProjX, coneProjZ, 'TPointY');
        var tPointNegY: string = this.t.renameObject('TPointY_1', TypeString.tPoint([0, -1, 0]));
        var tPointPosY: string = this.t.renameObject('TPointY_2', TypeString.tPoint([0, 1, 0]));
        this.ggb.intersect(coneProjX, coneProjY, 'TPointZ');
        var tPointPosZ: string = this.t.renameObject('TPointZ_1', TypeString.tPoint([0, 0, 1]));
        var tPointNegZ: string = this.t.renameObject('TPointZ_2', TypeString.tPoint([0, 0, -1]));
        this.listOfInvisibleObjects.push(tPointPosX, tPointNegX, tPointNegY, tPointPosY, tPointPosZ, tPointNegZ);

        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointPosX, TypeString.tPlane([1, 0, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointNegX, TypeString.tPlane([-1, 0, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointPosY, TypeString.tPlane([0, 1, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointNegY, TypeString.tPlane([0, -1, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointPosZ, TypeString.tPlane([0, 0, 1]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointNegZ, TypeString.tPlane([0, 0, -1]));

        this.listOfInvisibleLabels.push(TypeString.tPlane([1, 0, 0]), TypeString.tPlane([-1, 0, 0]),
            TypeString.tPlane([0, 1, 0]), TypeString.tPlane([0, -1, 0]), TypeString.tPlane([0, 0, 1]),
            TypeString.tPlane([0, 0, -1]));
    }

    private setHelperObjectsInvisible() {
        for (var i: number = 0; i < this.listOfInvisibleObjects.length; i++) {
            ggbApplet.setVisible(this.listOfInvisibleObjects[i], false);
        }
    }

    /**
     * @return name of the created object inside GeoGebra
     */
    private parameterMidpoints(plane1: number[], plane2: number[], plane3: number[]): string {
        var region: number[] = this.t.regionIndex(plane1, plane2, plane3);
        var regionIndex: string = region.toString();

        var sliderName = TypeString.parameter(region);
        this.ggb.slider(this.PARAMETER_SPHERE_MIDPOINT_MIN, this.PARAMETER_SPHERE_MIDPOINT_MAX, sliderName,
            this.PARAMETER_SPHERE_MIDPOINT_INCREMENT_STEP);
        ggbApplet.setValue(sliderName, 0.5);
        var midpointRayName = this.t.rayOfSphereMidpoints([0, 0, 0], plane1, plane2, plane3);
        var pointName = this.ggb.point(midpointRayName, TypeString.midpoint(region),
            TypeString.parameter(region));
        return pointName;
    }

    private createParameterMidpoints() {
        var planeArray = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0],
            [0, 0, 1], [0, 0, -1]];
        this.parameterMidpoints(planeArray[0], planeArray[2], planeArray[4]);
        this.parameterMidpoints(planeArray[1], planeArray[2], planeArray[4]);
        this.parameterMidpoints(planeArray[0], planeArray[3], planeArray[4]);
        this.parameterMidpoints(planeArray[0], planeArray[2], planeArray[5]);
    }

    private createParameterSpheresAndTangentplanes() {
        var spheres = [[1, 1, 1], [-1, 1, 1], [1, -1, 1], [1, 1, -1]];
        for (var i = 0; i < spheres.length; i++) {
            this.t.radius(spheres[i]);
            this.t.sphere(spheres[i]);
        }
        this.t.tangentPlaneToThreeSpheres(spheres[0], spheres[1], spheres[2]);
        this.t.tangentPlaneToThreeSpheres(spheres[0], spheres[1], spheres[3]);
        this.t.tangentPlaneToThreeSpheres(spheres[0], spheres[2], spheres[3]);
    }

    private setLabelsInvisible(): void {
        for (var i: number = 0; i < this.listOfInvisibleLabels.length; i++) {
            ggbApplet.setLabelVisible(this.listOfInvisibleLabels[i], false);
        }
    }

    private sphereMidpointFromTwoRays(targetRegion: number[], startRegion1: number[],
        startRegion2: number[]): string {
        var ray1: string = this.t.rayOfSphereMidpointsFromRegion(targetRegion, startRegion1);
        var ray2: string = this.t.rayOfSphereMidpointsFromRegion(targetRegion, startRegion2);
        return this.ggb.intersect(ray1, ray2, TypeString.midpoint(targetRegion));
    }

    private constuctInXDirection(): void {
        for (var x = 1; x < this.REGIONS_IN_POSITIVE_X_DIRECTION; x++) {
            var midpoints: string[] = [];
            var targetRegions: Array<number[]>;
            var startRegions1: Array<number[]>;
            var startRegions2: Array<number[]>;

            if (x % 2 == 1) {
                targetRegions = [[x+1, 0, 0], [x+1, 2, 0], [x+1, 0, 2]];
                startRegions1 = [[x, 1, 1], [x, 1, 1], [x, 1, 1]];
                startRegions2 = [[x, -1, 1], [x, 1, -1], [x, -1, 1]];
            }
            else {
                targetRegions = [[x+1, 1, 1], [x+1, -1, 1], [x+1, 1, -1]];
                startRegions1 = [[x, 0, 0], [x, 0, 0], [x, 0, 0]];
                startRegions2 = [[x, 0, 2], [x, 0, 2], [x, 2, 0]];
            }
            for (var i = 0; i < targetRegions.length; i++) {
                midpoints[i] = this.sphereMidpointFromTwoRays(targetRegions[i], startRegions1[i], startRegions2[i]);
                this.t.sphere(targetRegions[i]);
            }
            this.t.tangentPlaneToThreeSpheres(targetRegions[0], targetRegions[1], targetRegions[2]);                      
        }
    }




    run() {
//        console.log('Construction.run() started.'); // TODO: remove debug
        this.createInitialSphere();
        this.createProjectionPoints();
        this.createInitialTangentplanes();
        this.createParameterMidpoints();
        this.createParameterSpheresAndTangentplanes();
        this.constuctInXDirection();

        this.setHelperObjectsInvisible();
        this.setLabelsInvisible();
//        console.log('Construction.run() completed.'); //TODO: remove debug
    }
}
