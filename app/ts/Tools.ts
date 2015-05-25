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
        var midpointRayName: string = this.midpointRayToString(midpointRayIndex);
        this.ggb.rayOfSphereMidpoints(TypeString.sphereString(sphereRegion), TypeString.tpString(plane1),
            TypeString.tpString(plane2), TypeString.tpString(plane3), midpointRayName);
        //        ggbApplet.setVisible(midpointRayName, false);
        return midpointRayName;
    }

    tangentialPlaneToThreeSpheres(sphere1: number[], sphere2: number[], sphere3: number[]): string {
        var name: string = this.ggb.tangentialPlaneToThreeSphereAwayFromOrigin(this.ORIGIN,
            TypeString.sphereString(sphere1), TypeString.sphereString(sphere2), TypeString.sphereString(sphere3));
        return name;
    }

    /**
     * Get the index of the next region outlined by the three given tangent planes.
     * For example tp_{1,0,0}, tp_{0,1,0}, tp_{0,0,1} define region {1,1,1}. The
     * algorithm works since each tangent planes only has one index x or y or
     * z different from 0.
     * @param index1 {number-Array} index of the tangent plane in the form "12,1,0" =: "x,y,z"
     * @param index2 see index1
     * @param index3 see index1
     * @return {number-Array} index of the outlined region
     */
    regionIndex(index1: number[], index2: number[], index3: number[]): number[] {
        var regionIndex: number[] = [];
        for (var i: number = 0; i < index1.length; i++) {
            if (index1[i] != 0) {
                regionIndex.push(index1[i]);
            } else {
                if (index2[i] != 0) {
                    regionIndex.push(index2[i]);
                } else {
                    regionIndex.push(index3[i]);
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
    
    
    /**
     * 
     * @param index
     *            {int-Array} the index as an array in the form [0,1,54,1,-1,1]
     *            where the last three entries are either 1 or -1
     * @returns {String} of the form 'midpointRay_{0,1,54,+,+,-}'
     */
    midpointRayToString(index: number[]): string {
        var indexCopy: Array<string> = new Array<string>(index.length);
        for (var i: number = 0; i < index.length; i++) {
            indexCopy[i] = index[i].toString();
        }
        for (var i = 3; i < indexCopy.length; i++) {
            if (indexCopy[i] == '1') {
                indexCopy[i] = '+';
            } else {
                indexCopy[i] = '-';
            }
        }
        return 'midpointRay_{' + indexCopy.toString() + '}';
    }

}