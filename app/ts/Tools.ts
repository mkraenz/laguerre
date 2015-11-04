class Tools {

    constructor(private toStr: TypeString, private ggb: GGBTools, private ORIGIN: string, private view?: View) {
    }

    private indexToString(x: number, y: number, z: number): string {
        var str: string = x + ',' + y + ',' + z;
        return str;
    }

    pointFree(x: number, y: number, z: number, name?: string): string {
        this.ggb.pointFree(x.toString(), y.toString(), z.toString(), name);
        return name;
    }

    radius(region: number[]): string {
        var tpIndex: number[];
        if (region[0] == 0) {
            tpIndex = [1, 0, 0];
        }
        else {
            tpIndex = [region[0], 0, 0];
        }
        var midpoint: string = this.toStr.midpoint(region);
        var radiusName: string = this.toStr.radius(region);
        return this.ggb.distance(midpoint, this.toStr.tPlane(tpIndex),
            radiusName);
    }

    /**
     * Creates a Sphere midpoint with a name of the form "M_{1,2,3}"
     */
    sphereMidpointFree(region: number[], x: number, y: number, z: number): string {
        var name: string = this.toStr.midpoint(region);
        this.pointFree(x, y, z, name);
        return name;
    }

    /**
     * Constructs the sphere in the given region. If the radius does not exist yet, it will be created.
     * Note that the midpoint in that region must exist beforehand.
     * @return the name of the constructed sphere
     */
    sphere(region: number[]): string {
        var midpoint: string = this.toStr.midpoint(region);
        var radius: string = this.toStr.radius(region);
        var sphereName: string = this.toStr.sphere(region);
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

    rayOfSphereMidpoints(startRegion: number[], planeIndices: number[]): string {
        var tpIndices: number[] = [planeIndices[0], planeIndices[1], planeIndices[2]];
        var targetRegion: number[] = this.regionIndex(startRegion, tpIndices);
        var direction: number[] = this.midpointRayEmitterDirection(targetRegion, startRegion);
        var midpointRayIndex: number[] = targetRegion.concat(direction);
        var midpointRayName: string = this.toStr.midpointRay(midpointRayIndex);
        var plane1: string = this.toStr.tPlane([planeIndices[0], 0, 0]);
        var plane2: string = this.toStr.tPlane([0, planeIndices[1], 0]);
        var plane3: string = this.toStr.tPlane([0, 0, planeIndices[2]]);

        this.ggb.rayOfSphereMidpoints(this.toStr.sphere(startRegion), plane1,
            plane2, plane3, midpointRayName);
        return midpointRayName;
    }

    rayOfSphereMidpointsFromRegion(startRegion: number[], targetRegion: number[]): string {
        var planeIndices: number[] = [];
        for (var i: number = 0; i < targetRegion.length; i++) {
            if (Math.abs(targetRegion[i]) == Math.abs(startRegion[i])) {
                throw new Error('Your midpointRay goes to a face instead of a corner. This is not possible by construction. See Tools.ts/rayOfSphereMidpointsFromRegion().'
                    + ' Parameters:\nstartRegion = ' + startRegion.toString() + '\ntargetRegion = ' + targetRegion.toString());
            }
            if (Math.abs(targetRegion[i]) > Math.abs(startRegion[i])) {
                planeIndices[i] = targetRegion[i];
            }
            else {
                planeIndices[i] = startRegion[i];
            }
        }
        return this.rayOfSphereMidpoints(startRegion, planeIndices);
    }

    /**
     * Returns first found common index position of the three arrays, any common index coming after the first one will not be reported.
     * Output will be a number from 0 to a.length.
     * Contract: a,b,c have equal length.
     */
    private getFirstCommonIndexPosition(a: number[], b: number[], c: number[]): number {
        if (a.length != b.length || a.length != c.length) {
            throw new Error("Tools.getFirstCommonIndexPosition(): Lengthes of given arrays are not all equal.  The arrays are: \n a = " +
                a.toString() + "\n b = " + b.toString() + "\n c = " + c.toString())
        }
        for (var i = 0; i < a.length; i++) {
            if (a[i] == b[i] && a[i] == c[i]) {
                return i;
            }
        }
        throw new Error("Tools.getFirstCommonIndexPosition(): no common index. The arrays are: \n a = " + a.toString() + "\n b = "
            + b.toString() + "\n c = " + c.toString())
    }
    
    tangentPlaneToThreeSpheres(sphere1: number[], sphere2: number[], sphere3: number[]): string {
        var nextPlaneIndex: number[] = this.tangentPlaneIndex(sphere1, sphere2, sphere3);
        var name: string = this.toStr.tPlane(nextPlaneIndex);
        this.ggb.tangentPlaneToThreeSpheresAwayFromOrigin(this.ORIGIN,
            this.toStr.sphere(sphere1), this.toStr.sphere(sphere2), this.toStr.sphere(sphere3),
            name);
        return name;
    }

    private tangentPlaneIndex(index1: number[], index2: number[], index3: number[]): number[] {
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
                if (index1[commonIndex] > 0) {
                    nextPlane[i] = 1 + index1[i];
                }
                else {
                    nextPlane[i] = index1[i] - 1;
                }
            } else {
                nextPlane[i] = 0;
            }
        }
        return nextPlane;
    }
    
    /**
     * Get the index of the next region outlined by the three given tangent planes that is different from the start region.
     * For example tp_{1,0,0}, tp_{0,1,0}, tp_{0,0,1} define region {1,1,1}. The
     * algorithm works since each tangent planes only has one index x or y or
     * z different from 0.
     * @return {number-Array} index of the outlined region
     */
    regionIndex(startRegion: number[], tpIndices: number[]): number[] {
        var targetRegion: number[] = [];
        for (var i: number = 0; i < tpIndices.length; i++) {
            if (Math.abs(startRegion[i]) < Math.abs(tpIndices[i])) {
                targetRegion[i] = tpIndices[i];
            }
            else {
                if (startRegion[i] > 0) {
                    targetRegion[i] = startRegion[i] - 1;
                }
                else {
                    targetRegion[i] = startRegion[i] + 1;
                }
            }
        }
        return targetRegion;
    }
    
    /**
     * see photos taken on 2015-05-19
     * 
     * @param regionIndex index of the region the ray points into.
     */
    midpointRayEmitterDirection(targetRegion: number[], startRegion: number[]): number[] {
        var direction: number[] = [];
        for (var i: number = 0; i < targetRegion.length; i++) {
            if (targetRegion[i] > startRegion[i]) {
                direction.push(-1);
            } else {
                direction.push(1);
            }
        }
        return direction;
    }
}
