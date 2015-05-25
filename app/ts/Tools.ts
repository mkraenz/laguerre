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
        var tpIndex: number[] = [0, 0, region[2]];
        var midpoint: string = TypeString.midpointString(region);
        var radiusName: string = TypeString.radiusString(region);
        return this.ggb.distance(midpoint, TypeString.tpString(tpIndex),
            radiusName);
    }

    /**
     * Creates a Sphere midpoint with a name of the form "M_{1,2,3}"
     */
    sphereMidpointFree(region: number[], x: number, y: number, z: number): string {
        // TODO: write something useful instead of this crap
        var name: string = TypeString.midpointString(region);
        this.pointFree(x, y, z, name);
        return name;
    }

    sphere(region: number[]): string {
        var midpoint: string = TypeString.midpointString(region);
        var radius: string = TypeString.radiusString(region);
        var sphereName: string = TypeString.sphereString(region);
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
        var targetRegion: number[] = this.regionIndex(plane1, plane2, plane3);
        var direction: number[] = this.initialMidpointRayEmitterDirection(targetRegion);
        var midpointRayIndex: number[] = targetRegion.concat(direction);
        var midpointRayName: string = TypeString.midpointRayToString(midpointRayIndex);
        this.ggb.rayOfSphereMidpoints(TypeString.sphereString(sphereRegion), TypeString.tpString(plane1),
            TypeString.tpString(plane2), TypeString.tpString(plane3), midpointRayName);
        //        ggbApplet.setVisible(midpointRayName, false);
        return midpointRayName;
    }

    tangentPlaneToThreeSpheres(sphere1: number[], sphere2: number[], sphere3: number[]): string {
        var nextPlaneIndex: number[] = this.tangentPlaneIndex(sphere1, sphere2, sphere3);
        var name: string = TypeString.tpString(nextPlaneIndex);
        this.ggb.tangentPlaneToThreeSpheresAwayFromOrigin(this.ORIGIN,
            TypeString.sphereString(sphere1), TypeString.sphereString(sphere2), TypeString.sphereString(sphere3),
            name);
        return name;
    }

    tangentPlaneIndex(index1: number[], index2: number[], index3: number[]): number[] {
        var commonIndex = null;
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