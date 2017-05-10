class Construction {


    private PROJECTION_POINT_X: string = 'ProjX';
    private PROJECTION_POINT_Y: string = 'ProjY';
    private PROJECTION_POINT_Z: string = 'ProjZ';
    private ORIGIN_REGION: number[] = [0, 0, 0];
    private ORIGIN: string;
    private ORIGIN_SPHERE: string;

    private ggb: GGBTools;
    private t: Tools;
    private view: View;
    private toStr: TypeString;

    constructor() {
        this.toStr = new TypeString();
        this.ORIGIN = this.toStr.midpoint(this.ORIGIN_REGION);
        this.ORIGIN_SPHERE = this.toStr.sphere(this.ORIGIN_REGION);
        this.ggb = new GGBTools();
        this.view = new View(this.ggb, this.toStr);
        this.t = new Tools(this.toStr, this.ggb, this.ORIGIN, this.view);
    }

    private createInitialSphere(): void {
        var region: number[] = [0, 0, 0];
        this.t.sphereMidpointFree(region, 0, 0, 0);

        var radiusSliderStr: string = this.toStr.radius(region);
        this.ggb.slider(0.1, 1, radiusSliderStr);
        ggbApplet.setValue(radiusSliderStr, Settings.ORIGIN_SPHERE_SCALING);
        var sphereName: string = this.t.sphere(region);
    }

    private createProjectionPoints(): void {
        this.t.pointFree(Settings.PROJECTION_POINT_X_VALUE, 0, 0, this.PROJECTION_POINT_X);
        this.t.pointFree(0, Settings.PROJECTION_POINT_Y_VALUE, 0, this.PROJECTION_POINT_Y);
        this.t.pointFree(0, 0, Settings.PROJECTION_POINT_Z_VALUE, this.PROJECTION_POINT_Z);
    }

    private createInitialTangentplanes(): void {
        var segmentProjX: string = "segmentProjXToOrigin";
        var segmentProjY: string = "segmentProjYToOrigin";
        var segmentProjZ: string = "segmentProjZToOrigin";
        this.view.listOfInvisibleObjects.push(segmentProjX, segmentProjY, segmentProjZ);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_X, segmentProjX);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_Y, segmentProjY);
        this.ggb.segment(this.ORIGIN, this.PROJECTION_POINT_Z, segmentProjZ);
        var midpointProjX: string = this.ggb.midpoint(segmentProjX, 'MidOfSegOtoProjX');
        var midpointProjY: string = this.ggb.midpoint(segmentProjY, 'MidOfSegOtoProjY');;
        var midpointProjZ: string = this.ggb.midpoint(segmentProjZ, 'MidOfSegOtoProjZ');

        var radiusProjX: string = this.ggb.distance(midpointProjX, this.ORIGIN, 'r_{' + this.PROJECTION_POINT_X + '}');
        var radiusProjY: string = this.ggb.distance(midpointProjY, this.ORIGIN, 'r_{' + this.PROJECTION_POINT_Y + '}');
        var radiusProjZ: string = this.ggb.distance(midpointProjZ, this.ORIGIN, 'r_{' + this.PROJECTION_POINT_Z + '}');
        var projectionSphereX: string = this.ggb.sphere(midpointProjX, radiusProjX, 's_{' + this.PROJECTION_POINT_X + '}');
        var projectionSphereY: string = this.ggb.sphere(midpointProjY, radiusProjY, 's_{' + this.PROJECTION_POINT_Y + '}');
        var projectionSphereZ: string = this.ggb.sphere(midpointProjZ, radiusProjZ, 's_{' + this.PROJECTION_POINT_Z + '}');
        
        // there seems to be some bug with naming of conics defined by Geogebra's
        // Intersect. Thus we use c,d,e
        var coneX: string = this.ggb.intersect(projectionSphereX, this.ORIGIN_SPHERE, 'c');
        var coneY: string = this.ggb.intersect(projectionSphereY, this.ORIGIN_SPHERE, 'd');
        var coneZ: string = this.ggb.intersect(projectionSphereZ, this.ORIGIN_SPHERE, 'e');
        var coneProjX: string = this.t.renameObject(coneX, 'coneProjX');
        var coneProjY: string = this.t.renameObject(coneY, 'coneProjY');
        var coneProjZ: string = this.t.renameObject(coneZ, 'coneProjZ');

        this.ggb.intersect(coneProjY, coneProjZ, 'TPointX');
        var tPointPosX: string = this.t.renameObject('TPointX_1', this.toStr.tPoint([1, 0, 0]));
        var tPointNegX: string = this.t.renameObject('TPointX_2', this.toStr.tPoint([-1, 0, 0]));
        this.ggb.intersect(coneProjX, coneProjZ, 'TPointY');
        var tPointNegY: string = this.t.renameObject('TPointY_1', this.toStr.tPoint([0, -1, 0]));
        var tPointPosY: string = this.t.renameObject('TPointY_2', this.toStr.tPoint([0, 1, 0]));
        this.ggb.intersect(coneProjX, coneProjY, 'TPointZ');
        var tPointPosZ: string = this.t.renameObject('TPointZ_1', this.toStr.tPoint([0, 0, 1]));
        var tPointNegZ: string = this.t.renameObject('TPointZ_2', this.toStr.tPoint([0, 0, -1]));

        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointPosX, this.toStr.tPlane([1, 0, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointNegX, this.toStr.tPlane([-1, 0, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointPosY, this.toStr.tPlane([0, 1, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointNegY, this.toStr.tPlane([0, -1, 0]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointPosZ, this.toStr.tPlane([0, 0, 1]));
        this.ggb.tangentPlaneToSphere(this.ORIGIN_SPHERE, tPointNegZ, this.toStr.tPlane([0, 0, -1]));

        this.view.listOfInvisibleObjects.push(midpointProjX, midpointProjY, midpointProjZ);
        this.view.listOfInvisibleObjects.push(projectionSphereX, projectionSphereY, projectionSphereZ);
        this.view.listOfInvisibleObjects.push(coneProjX, coneProjY, coneProjZ);
        this.view.listOfInvisibleObjects.push(tPointPosX, tPointNegX, tPointNegY, tPointPosY, tPointPosZ, tPointNegZ);

        this.view.listOfInvisiblePlanes.push(this.toStr.tPlane([1, 0, 0]), this.toStr.tPlane([-1, 0, 0]),
            this.toStr.tPlane([0, 1, 0]), this.toStr.tPlane([0, -1, 0]), this.toStr.tPlane([0, 0, 1]),
            this.toStr.tPlane([0, 0, -1]));
    }

    /**
     * @return name of the created object inside GeoGebra
     */
    private parameterMidpoint(planeIndices: number[]): string {
        var regionIndex: string = planeIndices.toString();

        var sliderName = this.toStr.parameter(planeIndices);
        this.ggb.slider(Settings.PARAMETER_SPHERE_MIDPOINT_MIN, Settings.PARAMETER_SPHERE_MIDPOINT_MAX, sliderName,
            Settings.PARAMETER_SPHERE_MIDPOINT_INCREMENT_STEP);
        ggbApplet.setValue(sliderName, 0.5);
        var planeIndicesNegate: number[] = [];
        for (var i: number = 0; i < planeIndices.length; i++) {
            planeIndicesNegate[i] = -planeIndices[i];
        }
        var rayIndices: number[] = planeIndices.concat(planeIndicesNegate);
        var pointName = this.ggb.point(this.toStr.midpointRay(rayIndices), this.toStr.midpoint(planeIndices),
            this.toStr.parameter(planeIndices));
        return pointName;
    }

    private createParameterMidpoints(): void {
        var planeArray = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0],
            [0, 0, 1], [0, 0, -1]];
        this.parameterMidpoint([1, 1, 1]);
        this.parameterMidpoint([-1, 1, 1]);
        this.parameterMidpoint([1, -1, 1]);
        this.parameterMidpoint([1, 1, -1]);
    }

    private createParameterSpheresAndTangentplanes(): void {
        var spheres = [[1, 1, 1], [-1, 1, 1], [1, -1, 1], [1, 1, -1]];
        for (var i = 0; i < spheres.length; i++) {
            this.t.radius(spheres[i]);
            this.t.sphere(spheres[i]);
        }
        var plane1Name: string = this.t.reflectTangentPlane(spheres[0], spheres[1], spheres[2]);
        var plane2Name: string = this.t.reflectTangentPlane(spheres[0], spheres[1], spheres[3]);
        var plane3Name: string = this.t.reflectTangentPlane(spheres[0], spheres[2], spheres[3]);
        this.view.listOfInvisiblePlanes.push(plane1Name, plane2Name, plane3Name);
    }

    private sphereMidpointFromTwoLines(targetRegion: number[], startRegion1: number[],
        startRegion2: number[]): string {
        var ray1: string = this.t.lineOfSphereMidpointsFromRegion(startRegion1, targetRegion);
        var ray2: string = this.t.lineOfSphereMidpointsFromRegion(startRegion2, targetRegion);
        var midpoint: string = this.ggb.intersect(ray1, ray2, this.toStr.midpoint(targetRegion));
        this.view.listOfInvisibleObjects.push(ray1, ray2);
        return midpoint;
    }

    private createSpheresInTargetRegions(targetRegions: Array<number[]>, startRegion1: number[],
        startRegions2: Array<number[]>): void {
        for (var i = 0; i < targetRegions.length; i++) {
            if (!ggbApplet.exists(this.toStr.midpoint(targetRegions[i]))) {
                var midpointName: string = this.sphereMidpointFromTwoLines(targetRegions[i], startRegion1, startRegions2[i]);
                var sphereName: string = this.t.sphere(targetRegions[i]);
                this.view.listOfInvisibleObjects.push(midpointName);
                this.view.listOfInvisibleLabels.push(sphereName);
            }
        }
    }

    private constructInBothXDirection(y: number, z: number): void {
        this.constructInPositiveXDirection(y, z);
        this.constructInNegativeXDirection(y, z);
    }

    private constructInPositiveXDirection(y: number, z: number): void {
        for (var x = 1; x < Settings.MAX_REGION_IN_POS_X_DIR; x++) {
            var targetRegions: Array<number[]>;
            var startRegion1: number[];
            var startRegions2: Array<number[]>;

            if (x % 2 == 1) {
                targetRegions = [[x + 1, y, z], [x + 1, y + 2, z], [x + 1, y, z + 2]];
                startRegion1 = [x, y + 1, z + 1];
                startRegions2 = [[x, y - 1, z + 1], [x, y + 1, z - 1], [x, y - 1, z + 1]];
            }
            else {
                targetRegions = [[x + 1, y + 1, z + 1], [x + 1, y - 1, z + 1], [x + 1, y + 1, z - 1]];
                startRegion1 = [x, y, z];
                startRegions2 = [[x, y, z + 2], [x, y, z + 2], [x, y + 2, z]];
            }

            this.createSpheresInTargetRegions(targetRegions, startRegion1, startRegions2);
            if (z == 0 && y == 0) {
                this.createTangentplaneAndHide(targetRegions);
            }
        }
    }

    private constructInNegativeXDirection(y: number, z: number): void {
        for (var x = 1; x < Settings.MAX_REGION_IN_NEG_X_DIR; x++) {
            var targetRegions: Array<number[]>;
            var startRegion1: number[];
            var startRegions2: Array<number[]>;

            if (x % 2 == 1) {
                targetRegions = [[-(x + 1), y, z], [-(x + 1), y + 2, z], [-(x + 1), y, z + 2]];
                startRegion1 = [-x, y + 1, z + 1];
                startRegions2 = [[-x, y - 1, z + 1], [-x, y + 1, z - 1], [-x, y - 1, z + 1]];
            }
            else {
                targetRegions = [[-(x + 1), y + 1, z + 1], [-(x + 1), y - 1, z + 1], [-(x + 1), y + 1, z - 1]];
                startRegion1 = [-x, y, z];
                startRegions2 = [[-x, y, z + 2], [-x, y, z + 2], [-x, y + 2, z]];
            }

            this.createSpheresInTargetRegions(targetRegions, startRegion1, startRegions2);
            if (z == 0 && y == 0) {
                this.createTangentplaneAndHide(targetRegions);
            }
        }
    }

    private constructInPositiveYDirection(z: number): void {
        var x: number = 0;
        for (var y = 1; y < Settings.MAX_REGION_IN_POS_Y_DIR; y++) {
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

            this.createSpheresInTargetRegions(targetRegions, startRegion1, startRegions2);
            if (z == 0) {
                this.createTangentplaneAndHide(targetRegions);
            }
        }
    }
    private constructInNegativeYDirection(z: number): void {
        var x: number = 0;
        var targetRegions: Array<number[]>;
        var startRegion1: number[];
        var startRegions2: Array<number[]>;
        for (var y = 1; y < Settings.MAX_REGION_IN_NEG_Y_DIR; y++) {
            if (y % 2 == 1) {
                targetRegions = [[x + 2, -(y + 1), z], [x, -(y + 1), z], [x, -(y + 1), z + 2]];
                startRegion1 = [x + 1, -y, z + 1];
                startRegions2 = [[x + 1, -y, z - 1], [x + 1, -y, z - 1], [x - 1, -y, z + 1]];
            }
            else {
                targetRegions = [[x + 1, -(y + 1), z + 1], [x + 1, -(y + 1), z - 1], [x - 1, -(y + 1), z + 1]];
                startRegion1 = [x, -y, z];
                startRegions2 = [[x + 2, -y, z], [x + 2, -y, z], [x, -y, z + 2]];
            }

            this.createSpheresInTargetRegions(targetRegions, startRegion1, startRegions2);
            if (z == 0) {
                this.createTangentplaneAndHide(targetRegions);
            }
        }
    }

    private constructInZDirection(): void {
        this.constructInPositiveZDirection();
        this.constructInNegativeZDirection();
        this.constructFourthSpheresInBothZDirections();
    }

    private constructInPositiveZDirection(): void {
        var x: number = 0;
        var y: number = 0;
        for (var z = 1; z < Settings.MAX_REGION_IN_POS_Z_DIR; z++) {
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

            this.createSpheresInTargetRegions(targetRegions, startRegion1, startRegions2);
            this.createTangentplaneAndHide(targetRegions);
        }
    }
    
    private constructInNegativeZDirection(): void {
        var x: number = 0;
        var y: number = 0;
        for (var z = 1; z < Settings.MAX_REGION_IN_NEG_Z_DIR; z++) {
            var targetRegions: Array<number[]>;
            var startRegion1: number[];
            var startRegions2: Array<number[]>;

            if (z % 2 == 1) {
                targetRegions = [[x, y, -(z + 1)], [x + 2, y, -(z + 1)], [x, y + 2, -(z + 1)]];
                startRegion1 = [x + 1, y + 1, -z];
                startRegions2 = [[x + 1, y - 1, -z], [x + 1, y - 1, -z], [x - 1, y + 1, -z]];
            }
            else {
                targetRegions = [[x + 1, y + 1, -(z + 1)], [x + 1, y - 1, -(z + 1)], [x - 1, y + 1, -(z + 1)]];
                startRegion1 = [x, y, -z];
                startRegions2 = [[x + 2, y, -z], [x + 2, y, -z], [x, y + 2, -z]];
            }

            this.createSpheresInTargetRegions(targetRegions, startRegion1, startRegions2);
            this.createTangentplaneAndHide(targetRegions);
        }

    }

    createInitialMidpointRays(): void {
        for (var x: number = -1; x < 2; x = x + 2) {
            for (var y: number = -1; y < 2; y = y + 2) {
                for (var z: number = -1; z < 2; z = z + 2) {
                    var ray: string = this.t.rayOfSphereMidpointsFromRegion2([0, 0, 0], [x, y, z]);
                    this.view.listOfInvisibleObjects.push(ray);
                }
            }
        }
    }

    private createMissingFourthInitialSphere(targetRegion: number[], startRegion2: number[]): void {
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

    private createMissingInitialSpheres(): void {
        this.createMissingFourthInitialSphere([-1, 1, -1], [-1, 1, 1]);
        this.createMissingFourthInitialSphere([1, -1, -1], [1, -1, 1]);
        this.createMissingFourthInitialSphere([-1, -1, 1], [-1, 1, 1]);
    }

    private createEighthSphere(): void {
        this.initialMissingSpheresSubroutine([-1, -1, -1], [-2, 0, 0], [-1, -1, 1], [-1, 1, 1]);
    }

    private initialMissingSpheresSubroutine(targetRegion: number[], helpRegion: number[],
        startRegion1: number[], startRegion2: number[]): void {
        this.sphereMidpointFromTwoLines(helpRegion, startRegion1, startRegion2);
        this.t.radius(helpRegion);
        this.t.sphere(helpRegion);

        var rayName: string = this.t.lineOfSphereMidpointsFromRegion(helpRegion, targetRegion);
        var rayFromOrigin: string = this.toStr.midpointRayFromOrigin(targetRegion);
        var midpointStr: string = this.toStr.midpoint(targetRegion);
        var midpoint: string = this.ggb.intersect(rayName, rayFromOrigin, midpointStr);
        this.t.radius(targetRegion);
        this.t.sphere(targetRegion);

        this.view.listOfInvisibleObjects.push(rayName);
    }

    private constructInYDirection(): void {
        for (var z: number = 0; z < Settings.MAX_REGION_IN_POS_Z_DIR - 1; z += 2) {
            this.constructInPositiveYDirection(z);
            this.constructInNegativeYDirection(z);
        }

        for (var z: number = 0; z < Settings.MAX_REGION_IN_NEG_Z_DIR; z += 2) {
            this.constructInPositiveYDirection(-z);
            this.constructInNegativeYDirection(-z);
        }
    }

    private constructInXDirection(): void {
        for (var z: number = 0; z < Settings.MAX_REGION_IN_POS_Z_DIR - 1; z += 2) {

            for (var y: number = 0; y < Settings.MAX_REGION_IN_POS_Y_DIR; y += 2) {
                this.constructInBothXDirection(y, z);
            }
            for (var y: number = 0; y < Settings.MAX_REGION_IN_NEG_Y_DIR; y += 2) {
                this.constructInBothXDirection(-y, z);
            }
        }

        for (var z: number = 0; z < Settings.MAX_REGION_IN_NEG_Z_DIR - 1; z += 2) {
            for (var y: number = 0; y < Settings.MAX_REGION_IN_POS_Y_DIR - 1; y += 2) {
                this.constructInBothXDirection(y, -z);
            }
            for (var y: number = 0; y < Settings.MAX_REGION_IN_NEG_Y_DIR; y += 2) {
                this.constructInBothXDirection(-y, -z);
            }
        }
    }

    private constructIteratively(): void {
        this.constructInZDirection();
        this.constructInYDirection();
        this.constructInXDirection();
    }

    private constructSecondOrderTangentPlanesInNegDirections(): void {
        var sphereRegionx: number[] = [-1, 1, 1];
        var sphereRegiony: number[] = [1, -1, 1];
        var sphereRegionz: number[] = [1, 1, -1];
        var sphereRegionxy: number[] = [-1, -1, 1];
        var sphereRegionxz: number[] = [-1, 1, -1];
        var sphereRegionyz: number[] = [1, -1, -1];
        
        var planeInNegXDirection: string = this.t.reflectTangentPlane(sphereRegionx, sphereRegionxy, 
                    sphereRegionxz);
        var planeInNegYDirection: string = this.t.reflectTangentPlane(sphereRegiony, sphereRegionxy, 
                    sphereRegionyz);
        var planeInNegZDirection: string = this.t.reflectTangentPlane(sphereRegionz, sphereRegionxz,
                    sphereRegionyz);
        this.view.listOfInvisiblePlanes.push(planeInNegXDirection, planeInNegYDirection, planeInNegZDirection);
    }

    private constructFourthSpheresInBothZDirections(): void {
        /**
         * Construct the spheres s_{-1,-1,z} for z in its parameter domain.
         */
        var firstZCoordThatHasNotBeenInitialized = 3;
        for (var z: number = firstZCoordThatHasNotBeenInitialized; z < Settings.MAX_REGION_IN_POS_Z_DIR; z += 2) {
            this.constructAFourthSphereInZDirection(z);
        }
        for (var z: number = firstZCoordThatHasNotBeenInitialized; z < Settings.MAX_REGION_IN_NEG_Z_DIR; z += 2) {
            this.constructAFourthSphereInZDirection(-z);
        }
    }

    private constructAFourthSphereInZDirection(z: number): void {
        var targetRegion: number[] = [-1, -1, z];
        var ray1: string = this.t.lineOfSphereMidpointsFromRegion([0, 0, z - 1], targetRegion);
        var ray2: string = this.t.lineOfSphereMidpointsFromRegion([0, 0, z + 1], targetRegion);
        var midpointStr: string = this.toStr.midpoint(targetRegion);
        var midpoint: string = this.ggb.intersect(ray1, ray2, midpointStr);
        var sphere: string = this.t.sphere(targetRegion);
    }

    private createTangentplaneAndHide(targetRegions: Array<number[]>): void {
        var tPlaneName: string = this.t.tangentPlaneToThreeSpheres(targetRegions[0], targetRegions[1], targetRegions[2]);
        this.view.listOfInvisiblePlanes.push(tPlaneName);
    }

    public run(): void {
        this.createInitialSphere();
        this.createProjectionPoints();
        this.createInitialTangentplanes();
        this.createInitialMidpointRays();
        this.createParameterMidpoints();
        this.createParameterSpheresAndTangentplanes();
        this.createMissingInitialSpheres();
        this.constructSecondOrderTangentPlanesInNegDirections()
        this.createEighthSphere();
        this.constructIteratively();
        this.view.constumizeViewProperties();
    }
}
