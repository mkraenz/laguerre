class Tools {

    private ggb = new GGBTools();

    private indexToString(x: number, y: number, z: number): string {
        var str: string = x + ',' + y + ',' + z;
        return str;
    }

    point(x: number, y: number, z: number, name?: string): string {
        this.ggb.point(x.toString(), y.toString(), z.toString(), name);
        return name;
    }

    /**
     * Creates a Sphere midpoint with a name of the form "M_{1,2,3}"
     */
    sphereMidpoint(region: number[], x: number, y: number, z: number): string {
        // TODO: write something useful instead of this crap
        var name: string = 'M_{' + region.toString() + '}';
        this.point(x, y, z, name);
        return name;
    }

    /**
     * @return: GeoGebraScript command for distance without executing it.
     */
    distanceCmdString(objName1: string, objName2: string): string {
        return 'Distance[' + objName1 + ', ' + objName2 + ']';
    }

    sphere(region: number[]): string {
        var midpoint: string = 'M_{' + region.toString() + '}';
        var radius: string = 'r_{' + region.toString() + '}';
        var sphereName: string = 's_{' + region.toString() + '}';
        return this.ggb.sphere(midpoint, radius, sphereName);
    }

    /**
     * @return the newName input
     */
    renameObject(oldName: string, newName: string): string {
        ggbApplet.renameObject(oldName, newName);
        return newName;
    }

}