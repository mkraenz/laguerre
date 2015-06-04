class Construction {

    private MAX_REGION_IN_POSITIVE_X_DIRECTION: number = 5;
    private MAX_REGION_IN_POSITIVE_Y_DIRECTION: number = 6;
    private MAX_REGION_IN_POSITIVE_Z_DIRECTION: number = 6;

    private PROJECTION_POINT_X: string = 'ProjX';
    private PROJECTION_POINT_Y: string = 'ProjY';
    private PROJECTION_POINT_Z: string = 'ProjZ';
    private PROJECTION_POINT_X_VALUE: number = 10;
    private PROJECTION_POINT_Y_VALUE: number = 100;
    private PROJECTION_POINT_Z_VALUE: number = 100;
    private ORIGIN_REGION: number[] = [0, 0, 0];
    private ORIGIN: string;
    private ORIGIN_SPHERE: string;

    private listOfInvisibleObjects = new Array<string>();
    private listOfInvisiblePlanes = new Array<string>();
    private listOfInvisibleLabels = new Array<string>();
    
    // for the parametrizable spheres' slider
    private PARAMETER_SPHERE_MIDPOINT_MIN = 0.01;
    private PARAMETER_SPHERE_MIDPOINT_MAX = 0.99;
    private PARAMETER_SPHERE_MIDPOINT_INCREMENT_STEP = 0.01;

    private ORIGIN_SPHERE_SCALING = 0.3;

    private ggb: GGBTools;
    private t: Tools;

    constructor() {
        var toStr: TypeString = new TypeString();
        this.ORIGIN = toStr.midpoint(this.ORIGIN_REGION);
        this.ORIGIN_SPHERE = toStr.sphere(this.ORIGIN_REGION);
        this.ggb = new GGBTools();
        this.t = new Tools(toStr, this.ggb, this.ORIGIN);
    }

    createInitialSphere() {
        var toStr: TypeString = new TypeString();
        var region: number[] = [0, 0, 0];
        this.t.sphereMidpointFree(region, 0, 0, 0);

        var radiusSliderStr: string = toStr.radius(region);
        this.ggb.slider(0.1, 1, radiusSliderStr);
        ggbApplet.setValue(radiusSliderStr, this.ORIGIN_SPHERE_SCALING);
        var sphereName: string = this.t.sphere(region);
        this.ggb.setColor(sphereName, "Gold");
    }

    createProjectionPoints() {
        this.t.pointFree(this.PROJECTION_POINT_X_VALUE, 0, 0, this.PROJECTION_POINT_X);
        this.t.pointFree(0, this.PROJECTION_POINT_Y_VALUE, 0, this.PROJECTION_POINT_Y);
        this.t.pointFree(0, 0, this.PROJECTION_POINT_Z_VALUE, this.PROJECTION_POINT_Z);
    }

    createInitialTangentplanes() {
        var toStr: TypeString = new TypeString();

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
        var tPointPosX: string = this.t.renameObject('TPointX_1', toStr.tPoint([1, 0, 0]));
        var tPointNegX: string = this.t.renameObject('TPointX_2', toStr.tPoint([-1, 0, 0]));
        this.ggb.intersect(coneProjX, coneProjZ, 'TPointY');
        var tPointNegY: string = this.t.renameObject('TPointY_1', toStr.tPoint([0, -1, 0]));
        var tPointPosY: string = this.t.renameObject('TPointY_2', toStr.tPoint([0, 1, 0]));
        this.ggb.intersect(coneProjX, coneProjY, 'TPointZ');
        var tPointPosZ: string = this.t.renameObject('TPointZ_1', toStr.tPoint([0, 0, 1]));
        var tPointNegZ: string = this.t.renameObject('TPointZ_2', toStr.tPoint([0, 0, -1]));
        this.listOfInvisibleObjects.push(tPointPosX, tPointNegX, tPointNegY, tPointPosY, tPointPosZ, tPointNegZ);

        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointPosX, toStr.tPlane([1, 0, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointNegX, toStr.tPlane([-1, 0, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointPosY, toStr.tPlane([0, 1, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointNegY, toStr.tPlane([0, -1, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointPosZ, toStr.tPlane([0, 0, 1]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointNegZ, toStr.tPlane([0, 0, -1]));

        this.listOfInvisiblePlanes.push(toStr.tPlane([1, 0, 0]), toStr.tPlane([-1, 0, 0]), toStr.tPlane([0, 1, 0]),
            toStr.tPlane([0, -1, 0]), toStr.tPlane([0, 0, 1]), toStr.tPlane([0, 0, -1]));
    }

    private setHelperObjectsInvisible() {
        for (var i: number = 0; i < this.listOfInvisibleObjects.length; i++) {
            ggbApplet.setVisible(this.listOfInvisibleObjects[i], false);
        }
        for (var i: number = 0; i < this.listOfInvisiblePlanes.length; i++) {
            ggbApplet.setVisible(this.listOfInvisiblePlanes[i], false);
        }
    }

    /**
     * @return name of the created object inside GeoGebra
     */
    private parameterMidpoint(planeIndices: number[]): string {
        var toStr: TypeString = new TypeString();

        var regionIndex: string = planeIndices.toString();

        var sliderName = toStr.parameter(planeIndices);
        this.ggb.slider(this.PARAMETER_SPHERE_MIDPOINT_MIN, this.PARAMETER_SPHERE_MIDPOINT_MAX, sliderName,
            this.PARAMETER_SPHERE_MIDPOINT_INCREMENT_STEP);
        ggbApplet.setValue(sliderName, 0.5);
        var planeIndicesNegate: number[] = [];
        for (var i: number = 0; i < planeIndices.length; i++) {
            planeIndicesNegate[i] = -planeIndices[i];
        }
        var rayIndices: number[] = planeIndices.concat(planeIndicesNegate);
        var pointName = this.ggb.point(toStr.midpointRay(rayIndices), toStr.midpoint(planeIndices),
            toStr.parameter(planeIndices));
        return pointName;
    }

    private createParameterMidpoints() {
        var planeArray = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0],
            [0, 0, 1], [0, 0, -1]];
        this.parameterMidpoint([1, 1, 1]);
        this.parameterMidpoint([-1, 1, 1]);
        this.parameterMidpoint([1, -1, 1]);
        this.parameterMidpoint([1, 1, -1]);
    }

    private createParameterSpheresAndTangentplanes() {
        var spheres = [[1, 1, 1], [-1, 1, 1], [1, -1, 1], [1, 1, -1]];
        for (var i = 0; i < spheres.length; i++) {
            this.t.radius(spheres[i]);
            this.t.sphere(spheres[i]);
        }
        var plane1Name: string = this.t.tangentPlaneToThreeSpheres(spheres[0], spheres[1], spheres[2]);
        var plane2Name: string = this.t.tangentPlaneToThreeSpheres(spheres[0], spheres[1], spheres[3]);
        var plane3Name: string = this.t.tangentPlaneToThreeSpheres(spheres[0], spheres[2], spheres[3]);
        this.listOfInvisiblePlanes.push(plane1Name, plane2Name, plane3Name);
    }

    private setLabelsInvisible(): void {
        for (var i: number = 0; i < this.listOfInvisibleLabels.length; i++) {
            ggbApplet.setLabelVisible(this.listOfInvisibleLabels[i], false);
        }
    }

    private sphereMidpointFromTwoRays(targetRegion: number[], startRegion1: number[],
        startRegion2: number[]): string {
        var toStr: TypeString = new TypeString();
        var ray1: string = this.t.rayOfSphereMidpointsFromRegion(startRegion1, targetRegion);
        var ray2: string = this.t.rayOfSphereMidpointsFromRegion(startRegion2, targetRegion);
        var midpoint: string = this.ggb.intersect(ray1, ray2, toStr.midpoint(targetRegion));
        return midpoint;
    }

    private constructInXDirection(y: number, z: number): void {
        var toStr: TypeString = new TypeString();
        for (var x = 1; x < this.MAX_REGION_IN_POSITIVE_X_DIRECTION; x++) {
            var midpoints: string[] = [];
            var targetRegions: Array<number[]>;
            var startRegions1: Array<number[]>;
            var startRegions2: Array<number[]>;

            if (x % 2 == 1) {
                targetRegions = [[x + 1, y, z], [x + 1, y + 2, z], [x + 1, y, z + 2]];
                startRegions1 = [[x, y + 1, z + 1], [x, y + 1, z + 1], [x, y + 1, z + 1]];
                startRegions2 = [[x, y - 1, z + 1], [x, y + 1, z - 1], [x, y - 1, z + 1]];
            }
            else {
                targetRegions = [[x + 1, y + 1, z + 1], [x + 1, y - 1, z + 1], [x + 1, y + 1, z - 1]];
                startRegions1 = [[x, y, z], [x, y, z], [x, y, z]];
                startRegions2 = [[x, y, z + 2], [x, y, z + 2], [x, y + 2, z]];
            }
            for (var i = 0; i < targetRegions.length; i++) {
                if (!ggbApplet.exists(toStr.midpoint(targetRegions[i]))) {
                    midpoints[i] = this.sphereMidpointFromTwoRays(targetRegions[i], startRegions1[i], startRegions2[i]);
                    this.t.sphere(targetRegions[i]);
                }
            }
            if (z == 0 && y == 0) {
                var tPlaneName: string = this.t.tangentPlaneToThreeSpheres(targetRegions[0], targetRegions[1], targetRegions[2]);
                this.listOfInvisiblePlanes.push(tPlaneName);
            }
        }
    }

    private constructInYDirection(z: number): void {
        // special case for y = 1
        var targetRegion1: number[] = [2, 2, z];
        var midpoint1: string = this.sphereMidpointFromTwoRays(targetRegion1, [1, 1, z + 1], [1, 1, z - 1]);
        var sphere1Name: string = this.t.sphere(targetRegion1);
        this.listOfInvisibleObjects.push(midpoint1);
        this.listOfInvisibleLabels.push(sphere1Name);

        var targetRegion2: number[] = [0, 2, z + 2];
        var midpoint2: string = this.sphereMidpointFromTwoRays(targetRegion2, [1, 1, z + 1], [-1, 1, z + 1]);
        var sphere2Name: string = this.t.sphere(targetRegion2);
        this.listOfInvisibleObjects.push(midpoint2);
        this.listOfInvisibleLabels.push(sphere2Name);

        var tPlane1Name: string = this.t.tangentPlaneToThreeSpheres([0, 2, z], targetRegion1, targetRegion2);
        this.listOfInvisiblePlanes.push(tPlane1Name);


        var x: number = 0;
        for (var y = 2; y <= this.MAX_REGION_IN_POSITIVE_Y_DIRECTION; y++) {
            var targetRegions: Array<number[]>;
            var startRegion1: number[];
            var startRegions2: Array<number[]>;

            if (y % 2 == 1) {
                targetRegions = [[x + 2, y + 1, z], [x, y + 1, z], [x, y + 1, z + 2]];
                startRegion1 = [x + 1, y, z + 1];
                startRegions2 = [[x + 1, y, z - 1], [x + 1, y, z - 1], [x - 1, y, z + 1]];
            }
            else {
                targetRegions = [[x + 1, y + 1, z + 1], [x + 1, y + 1, z - 1], [x - 1, y + 1, z + 1]];
                startRegion1 = [x, y, z];
                startRegions2 = [[x + 2, y, z], [x + 2, y, z], [x, y, z + 2]];
            }
            for (var i = 0; i < targetRegions.length; i++) {
                var midpointName: string = this.sphereMidpointFromTwoRays(targetRegions[i], startRegion1, startRegions2[i]);
                var sphereName: string = this.t.sphere(targetRegions[i]);
                this.listOfInvisibleObjects.push(midpointName);
                this.listOfInvisibleLabels.push(sphereName);
            }
            if (z == 0) {
                var tPlaneName: string = this.t.tangentPlaneToThreeSpheres(targetRegions[0], targetRegions[1], targetRegions[2]);
                this.listOfInvisiblePlanes.push(tPlaneName);
            }

        }
    }

    private constructInZDirection(): void {
        var x: number = 0;
        var y: number = 0;
        for (var z = 1; z < this.MAX_REGION_IN_POSITIVE_Z_DIRECTION; z++) {
            var targetRegions: Array<number[]>;
            var startRegion1: number[];
            var startRegions2: Array<number[]>;

            if (z % 2 == 1) {
                targetRegions = [[x, y, z + 1], [x + 2, y, z + 1], [x, y + 2, z + 1]];
                startRegion1 = [x + 1, y + 1, z];
                startRegions2 = [[x + 1, y - 1, z], [x + 1, y - 1, z], [x - 1, y + 1, z]];
            }
            else {
                targetRegions = [[x + 1, y + 1, z + 1], [x + 1, y - 1, z + 1], [x - 1, y + 1, z + 1]];
                startRegion1 = [x, y, z];
                startRegions2 = [[x + 2, y, z], [x + 2, y, z], [x, y + 2, z]];
            }
            for (var i = 0; i < targetRegions.length; i++) {
                var midpointName: string = this.sphereMidpointFromTwoRays(targetRegions[i], startRegion1, startRegions2[i]);
                var sphereName: string = this.t.sphere(targetRegions[i]);
                this.listOfInvisibleObjects.push(midpointName);
                this.listOfInvisibleLabels.push(sphereName);
            }
            var tPlaneName: string = this.t.tangentPlaneToThreeSpheres(targetRegions[0], targetRegions[1], targetRegions[2]);
            this.listOfInvisiblePlanes.push(tPlaneName);
        }
    }

    createInitialMidpointRays() {
        for (var x: number = -1; x < 2; x = x + 2) {
            for (var y: number = -1; y < 2; y = y + 2) {
                for (var z: number = -1; z < 2; z = z + 2) {
                    this.t.rayOfSphereMidpointsFromRegion([0, 0, 0], [x, y, z]);
                }
            }
        }
    }

    private createMissingFourthInitialSphere(targetRegion: number[], startRegion2: number[]) {
        var helpRegion: number[] = []; // either [2,0,0], [0,2,0] or [0,0,2]
        for (var i: number = 0; i < targetRegion.length; i++) {
            if (targetRegion[i] == 1) {
                helpRegion[i] = 2;
                helpRegion[(i + 1) % targetRegion.length] = 0;
                helpRegion[(i + 2) % targetRegion.length] = 0;
                break;
            }
        }
        var startRegion1: number[] = [1, 1, 1];
        this.initialMissingSpheresSubroutine(targetRegion, helpRegion, startRegion1, startRegion2);
    }

    private createMissingInitialSpheres() {
        this.createMissingFourthInitialSphere([-1, 1, -1], [-1, 1, 1]);
        this.createMissingFourthInitialSphere([1, -1, -1], [1, -1, 1]);
        this.createMissingFourthInitialSphere([-1, -1, 1], [-1, 1, 1]);
    }

    private createEighthSphere() {
        var tpName: string = this.t.tangentPlaneToThreeSpheres([-1, 1, 1], [-1, -1, 1], [-1, 1, -1]);
        var targetRegion: number[] = [-1, -1, -1];
        var helpRegion: number[] = [-2, 0, 0];
        var startRegion1: number[] = [-1, -1, 1];
        var startRegion2: number[] = [-1, 1, 1];
        this.initialMissingSpheresSubroutine(targetRegion, helpRegion, startRegion1, startRegion2);
    }

    private initialMissingSpheresSubroutine(targetRegion: number[], helpRegion: number[], startRegion1: number[], startRegion2: number[]) {
        var toStr: TypeString = new TypeString();

        this.sphereMidpointFromTwoRays(helpRegion, startRegion1, startRegion2);
        this.t.radius(helpRegion);
        this.t.sphere(helpRegion);

        var rayName: string = this.t.rayOfSphereMidpointsFromRegion(helpRegion, targetRegion);
        var rayFromOrigin: string = toStr.midpointRayFromOrigin(targetRegion);
        var midpointStr: string = toStr.midpoint(targetRegion);
        var midpoint: string = this.ggb.intersect(rayName, rayFromOrigin, midpointStr);
        this.t.radius(targetRegion);
        this.t.sphere(targetRegion);
    }
    private constructInPositiveDirection() {
        this.constructInZDirection();
        for (var z: number = 0; z < this.MAX_REGION_IN_POSITIVE_Z_DIRECTION; z += 2) {
            this.constructInYDirection(z);
            for (var y: number = 0; y < this.MAX_REGION_IN_POSITIVE_Y_DIRECTION; y += 2) {
                this.constructInXDirection(y, z);
            }
        }
    }

    private setColorOfnthOrderSphere(order: number, color: string) {
        //TODO: currently not working for e.g. order = 5
        if (order < 0) {
            throw new Error('Illegal Argument: Order must be greater zero. Given parameter: order = ' + order);
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
                        this.t.setColorOfSphere(targetRegions[k], color);
                    }
                }
            }
        }
    }

    run() {
        this.createInitialSphere();
        this.createProjectionPoints();
        this.createInitialTangentplanes();
        this.createInitialMidpointRays();
        this.createParameterMidpoints();
        this.createParameterSpheresAndTangentplanes();
        this.createMissingInitialSpheres();
        this.createEighthSphere();
        this.setHelperObjectsInvisible();
        this.setColorOfnthOrderSphere(5, 'Green');
        /*for(var k:number = 1; k< this.MAX_REGION_IN_POSITIVE_Z_DIRECTION /2; k++) {
           this.setColorOfnthOrderSphere(2*k, 'Navy'); 
        }*/
        this.constructInPositiveDirection();

        this.setHelperObjectsInvisible();
        this.setLabelsInvisible();
    }
}
