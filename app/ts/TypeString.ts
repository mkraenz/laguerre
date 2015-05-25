class TypeString {
    public static typeString(objectType: string, index: number[]): string {
        return objectType + '_{' + index.toString() + '}';
    }

    public static sphereString(index: number[]): string {
        return this.typeString('s', index);
    }

    /**
     * tp = tangent plane
     */
    public static tpString(index: number[]): string {
        return this.typeString('tp', index);
    }


    public static midpointString(index: number[]): string {
        return this.typeString('M', index);
    }

    public static radiusString(index: number[]): string {
        return this.typeString('r', index);
    }

    public static parameterString(index: number[]): string {
        return this.typeString('parameter', index);
    }
    
    /**
    * 
    * @param index
    *            {int-Array} the index as an array in the form [0,1,54,1,-1,1]
    *            where the last three entries are either 1 or -1
    * @returns {String} of the form 'midpointRay_{0,1,54,+,+,-}'
    */
    public static midpointRayToString(index: number[]): string {
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