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
    
    /**
     * tangent point
     */
    public tPoint(index: number[]): string {
        return this.typeString('TPoint', index);
    }
    
    /**
    * 
    * @param index
    *            {int-Array} the index as an array in the form [0,1,54,1,-1,1]
    *            where the last three entries are either 1 or -1
    * @returns {String} of the form 'midpointRay_{0,1,54,+,+,-}'
    */
    public midpointRay(index: number[]): string {
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