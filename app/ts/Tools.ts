class Tools {

    indexToString(x: number, y: number, z: number): string {
        var str: string = x + ',' + y + ',' + z;
        return str;
    }

    generalPoint(x: number, y: number, z: number, name: string = 'default'): string {
        var cmd: string = '(' + this.indexToString(x, y, z) + ')';
        if (name !== 'default') {
            cmd = name + '= ' + cmd;
        }
        ggbApplet.evalCommand(cmd);
        return name;
    }

    midpoint(region: number[], x: number, y: number, z: number): string {
        var name: string = 'M_{' + region.toString() + '}';
        this.generalPoint(x, y, z, name);
        return name;
    }

    generalSegment(startPoint: string, endPoint: string, name: string = 'default'): string {

        return name;
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

    slider(start: number, end: number, name: string = 'default', step: number = 0.1): string {
        var cmd: string = "Slider[" + start.toString() + ", " + end.toString() + ", " + step.toString() + "]";
        if (name !== 'default') {
            cmd = name + " = " + cmd;
        }
        ggbApplet.evalCommand(cmd);
        return name;
    }

}