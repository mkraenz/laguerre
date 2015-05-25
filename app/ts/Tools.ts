class Tools {
    
    private DEFAULT: string = 'default';

    indexToString(x: number, y: number, z: number): string {
        var str: string = x + ',' + y + ',' + z;
        return str;
    }

    generalPoint(x: number, y: number, z: number, name: string = this.DEFAULT): string {
        var cmd: string = '(' + this.indexToString(x, y, z) + ')';
        this.setCmdOnNondefaultName(cmd, name);
        ggbApplet.evalCommand(cmd);
        return name;
    }

    /**
     * Creates a Sphere midpoint with a name of the form "M_{1,2,3}"
     */
    midpoint(region: number[], x: number, y: number, z: number): string {
        var name: string = 'M_{' + region.toString() + '}';
        this.generalPoint(x, y, z, name);
        return name;
    }

    generalSegment(startPoint: string, endPoint: string, name: string = this.DEFAULT): string {
        var cmd: string = 'Segment[' + startPoint + ', ' + endPoint + ']';
        this.setCmdOnNondefaultName(cmd, name);
        return name;
    }

    private setCmdOnNondefaultName(cmd: string, name: string) {
        if (name !== this.DEFAULT) {
            cmd = name + '= ' + cmd;
        }
    }
    
    /**
     * @param name: string Name of the object inside GeoGebra.
     * @param color: string See GeoGebra page https://wiki.geogebra.org/en/Reference:Colors for reference.
     */
    setColor(name: string, color: string): void {
        ggbApplet.evalCommand('SetColor[' + name + ',' + color + ']');
    }

    sphere(region: number[]): string {
        var cmd: string = 'Sphere[ M_{' + region.toString() + '}, r_{' + region.toString() + '}]';
        var sphereName: string = 's_{' + region.toString() + '}';
        ggbApplet.evalCommand(sphereName + ' =' + cmd);
        return sphereName;
    }

    slider(start: number, end: number, name: string = this.DEFAULT, step: number = 0.1): string {
        var cmd: string = "Slider[" + start.toString() + ", " + end.toString() + ", " + step.toString() + "]";
        this.setCmdOnNondefaultName(cmd, name);
        ggbApplet.evalCommand(cmd);
        return name;
    }

}