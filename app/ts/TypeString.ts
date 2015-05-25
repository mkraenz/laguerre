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
}