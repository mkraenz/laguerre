class TypeString {
    public typeString(objectType: string, index: number[]): string {
        return objectType + '_{' + index.toString() + '}';
    }

    public sphere(index: number[]): string {
        return this.typeString('s', index);
    }

    /**
     * tplane = tangent plane
     */
    public tPlane(index: number[]): string {
        return this.typeString('tp', index);
    }

    public midpoint(index: number[]): string {
        return this.typeString('M', index);
    }

    public radius(index: number[]): string {
        return this.typeString('r', index);
    }

    public parameter(index: number[]): string {
        return this.typeString('parameter', index);
    }
    
    /** tangent point */
    public tPoint(index: number[]): string {
        return this.typeString('TPoint', index);
    }

    public planeIntersectionPoint(index: number[]): string {
        return this.typeString('I', index);
    }
    
    /**
    * @param index
    *            {number-Array} the index as an array in the form [0,1,54,1,-1,1]
    *            where the last three entries are either 1 or -1
    * @returns {String} of the form 'midpointRay_{0,1,54,+,-,+}'
    */
    public midpointRay(indices: number[]): string {
        var indicesStringArray: Array<string> = new Array<string>(indices.length);
        for (var i: number = 0; i < indices.length; i++) {
            indicesStringArray[i] = indices[i].toString();
        }
        for (var i = 3; i < indicesStringArray.length; i++) {
            if (indicesStringArray[i] == '1') {
                indicesStringArray[i] = '+';
            } else {
                indicesStringArray[i] = '-';
            }
        }
        return 'midpointRay_{' + indicesStringArray.toString() + '}';
    }

    public midpointRayFromOrigin(targetRegion: number[]) {
        var indices: number[] = [];
        for (var i: number = 0; i < targetRegion.length; i++) {
            indices[i] = targetRegion[i];
        }
        for (var i: number = 0; i < targetRegion.length; i++) {
            indices[i + targetRegion.length] = -targetRegion[i];
        }
        return this.midpointRay(indices);
    }

    public face(index1: number[], index2: number[], index3: number[], index4: number[]) {
        return 'face_{' + index1.toString() + ',' + index2.toString() + ',' + index3.toString() + ',' + index4.toString() + '}';
    }
}