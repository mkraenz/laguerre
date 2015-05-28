class Tools {

    constructor(private ggb: GGBTools, private ORIGIN: string) {
    }

    private indexToString(x: number, y: number, z: number): string {
        var str: string = x + ',' + y + ',' + z;
        return str;
    }

    pointFree(x: number, y: number, z: number, name?: string): string {
        this.ggb.pointFree(x.toString(), y.toString(), z.toString(), name);
        return name;
    }

    radius(region: number[]) {
        var tpIndex: number[];
        if (region[0] == 0) {
            tpIndex = [1, 0, 0];
        }
        else {
            tpIndex = [region[0], 0, 0];
        }
        var midpoint: string = TypeString.midpoint(region);
        var radiusName: string = TypeString.radius(region);
        return this.ggb.distance(midpoint, TypeString.tPlane(tpIndex),
            radiusName);
    }

    /**
     * Creates a Sphere midpoint with a name of the form "M_{1,2,3}"
     */
    sphereMidpointFree(region: number[], x: number, y: number, z: number): string {
        var name: string = TypeString.midpoint(region);
        this.pointFree(x, y, z, name);
        return name;
    }

    /**
     * Constructs the sphere in the given region. If the radius does not exist yet, it will be created.
     * Note that the midpoint in that region must exist beforehand.
     * @return the name of the constructed sphere
     */
    sphere(region: number[]): string {
        var midpoint: string = TypeString.midpoint(region);
        var radius: string = TypeString.radius(region);
        var sphereName: string = TypeString.sphere(region);
        if (!ggbApplet.exists(radius)) {
            this.radius(region);
        }
        return this.ggb.sphere(midpoint, radius, sphereName);
    }
    
    
    

    /**
     * @return the newName input
     */
    renameObject(oldName: string, newName: string): string {
        ggbApplet.renameObject(oldName, newName);
        return newName;
    }

    rayOfSphereMidpoints(sphereRegion: number[], plane1: number[], plane2: number[], plane3: number[]): string {
        //TODO: maybe this is buggy. using initialMidpointRayEmitterDirection() might cause trouble
        var targetRegion: number[] = this.regionIndex(plane1, plane2, plane3);
        var direction: number[] = this.initialMidpointRayEmitterDirection(targetRegion);
        var midpointRayIndex: number[] = targetRegion.concat(direction);
        var midpointRayName: string = TypeString.midpointRayToString(midpointRayIndex);
        this.ggb.rayOfSphereMidpoints(TypeString.sphere(sphereRegion), TypeString.tPlane(plane1),
            TypeString.tPlane(plane2), TypeString.tPlane(plane3), midpointRayName);
        ggbApplet.setVisible(midpointRayName, false);
        return midpointRayName;
    }

    rayOfSphereMidpointsFromRegion(targetRegion: number[], startRegion: number[]): string {
        var planesIndices: number[] = [];
        for (var i: number = 0; i < targetRegion.length; i++) {
            // equality should not appear by construction
            if (Math.abs(targetRegion[i]) == Math.abs(startRegion[i])) {
                throw new Error('Your midpointRay goes to a face instead of a corner. See Tools.ts/rayOfSphereMidpointsFromRegion().');
            }
            if (Math.abs(targetRegion[i]) > Math.abs(startRegion[i])) {
                planesIndices[i] = targetRegion[i];
            }
            else {
                planesIndices[i] = startRegion[i];
            }
        }
        return this.rayOfSphereMidpoints(startRegion, [planesIndices[0], 0, 0], [0, planesIndices[1], 0], [0, 0, planesIndices[1]]);
    }

    tangentPlaneToThreeSpheres(sphere1: number[], sphere2: number[], sphere3: number[]): string {
        var nextPlaneIndex: number[] = this.tangentPlaneIndex(sphere1, sphere2, sphere3);
        var name: string = TypeString.tPlane(nextPlaneIndex);
        this.ggb.tangentPlaneToThreeSpheresAwayFromOrigin(this.ORIGIN,
            TypeString.sphere(sphere1), TypeString.sphere(sphere2), TypeString.sphere(sphere3),
            name);
        return name;
    }

    tangentPlaneIndex(index1: number[], index2: number[], index3: number[]): number[] {
        var commonIndex: number = null;
        for (var i = 0; i < index1.length; i++) {
            // here one might have to use parseInt(indexArray[i]
            if (index1[i] == index2[i]
                && index1[i] == index3[i]) {
                commonIndex = i;
                break;
            }
        }
        var nextPlane: number[] = new Array<number>(3);
        for (var i = 0; i < index1.length; i++) {
            if (i == commonIndex) {
                nextPlane[i] = 1 + index1[i];
            } else {
                nextPlane[i] = 0;
            }
        }
        return nextPlane;
    }
    
    /**
     * Get the index of the next region outlined by the three given tangent planes.
     * For example tp_{1,0,0}, tp_{0,1,0}, tp_{0,0,1} define region {1,1,1}. The
     * algorithm works since each tangent planes only has one index x or y or
     * z different from 0.
     * @return {number-Array} index of the outlined region
     */
    regionIndex(plane1: number[], plane2: number[], plane3: number[]): number[] {
        var regionIndex: number[] = [];
        for (var i: number = 0; i < plane1.length; i++) {
            if (plane1[i] != 0) {
                regionIndex.push(plane1[i]);
            } else {
                if (plane2[i] != 0) {
                    regionIndex.push(plane2[i]);
                } else {
                    regionIndex.push(plane3[i]);
                }
            }
        }
        return regionIndex;
    }
    
    /**
     * see photos taken on 2015-05-19
     * 
     * @param regionIndex index of the region the ray points into.
     */
    initialMidpointRayEmitterDirection(regionIndex: number[]): number[] {
        var direction: number[] = [];
        for (var i: number = 0; i < regionIndex.length; i++) {
            if (regionIndex[i] > 0) {
                direction.push(-1);
            } else {
                direction.push(1);
            }
        }
        return direction;
    }




}