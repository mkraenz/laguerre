
/**
 * This class contains direct translations of the GeoGebraScript commands to TypeScript. 
 * Therefore most method parameters will be strings.
 */
class GGBTools {

    public distance(objName1: string, objName2: string, name?: string): string {
        var cmd: string = 'Distance[' + objName1 + ', ' + objName2 + ']';
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public intersect(objName1: string, objName2: string, name?: string): string {
        var cmd: string = 'Intersect[' + objName1 + ', ' + objName2 + ']';
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public pointFree(x: string, y: string, z?: string, name?: string): string {
        var cmd: string = '(' + x + ',' + y;
        if (z) {
            cmd = cmd + ',' + z;
        }
        cmd = cmd + ')';
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public point(targetObj: string, name?: string, pathParameter?: string): string {
        var cmd: string = 'Point[' + targetObj;
        if (pathParameter) {
            cmd = cmd + ',' + pathParameter;
        }
        cmd = cmd + ']';
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public midpoint(targetName: string, name?: string): string {
        var cmd: string = 'Midpoint[' + targetName + ']';
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public segment(startPoint: string, endPoint: string, name?: string): string {
        var cmd: string = 'Segment[' + startPoint + ', ' + endPoint + ']';
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    /**
     * @param name: string Name of the object inside GeoGebra.
     * @param color: string See GeoGebra page https://wiki.geogebra.org/en/Reference:Colors for reference.
     */
    public setColor(name: string, color: string): void {
        var command: string = 'SetColor[' + name + ',' + color + ']';
        var isSuccessful: boolean = ggbApplet.evalCommand(command);
        if (!isSuccessful) {
            throw new Error(name + ' has not been defined successfully.\nCorresponding command: \n' + command);
        }
    }
    
    /**
     * This is not yet the full GeoGebraScript compatible version of a slider. It contains only some parameters.
     */
    public slider(start: number, end: number, name?: string, step: number = 0.1): string {
        var cmd: string = "Slider[" + start.toString() + ", " + end.toString() + ", " + step.toString() + "]";
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public sphere(midpoint: string, radius: string, name?: string): string {
        var cmd: string = 'Sphere[' + midpoint + ', ' + radius + ']';
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    private fullCommand(cmd: string, name: string): string {
        var fullCommand: string = cmd
        if (name) {
            fullCommand = name + ' = ' + fullCommand;
        }
        return fullCommand;
    }
    
    /**
     * Custom Tool
     */
    public tangentPlaneToSphere(sphere: string, point: string, name?: string): string {
        var cmd: string = 'TangentialPlaneToSphere[' + sphere + ', ' + point + ']';
        this.fullCommandAndExec(cmd, name);
        return name;
    }
    
    /**
     * Custom Tool, where the ray emits from from the midpoint of given sphere and goes through the 
     * intersection point of the three planes.
     */
    public rayOfSphereMidpoints(sphere: string, plane1: string, plane2: string, plane3: string, name?: string) {
        var cmd: string = 'RayOfSphereMidpoints[' + sphere + ',' + plane1 + ',' + plane2 + ',' + plane3 + ']';

        if (!ggbApplet.exists(sphere)) {
            throw new Error(sphere + ' not existing for command:\n' + cmd);
        }
        if (!ggbApplet.exists(plane1)) {
            throw new Error(plane1 + ' not existing for command:\n' + cmd);
        }
        if (!ggbApplet.exists(plane2)) {
            throw new Error(plane2 + ' not existing for command:\n' + cmd);
        }
        if (!ggbApplet.exists(plane3)) {
            throw new Error(plane3 + ' not existing for command:\n' + cmd);
        }
        this.fullCommandAndExec(cmd, name);
        return name;
    }
    
    /**
     * Custom Tool
     */
    public tangentPlaneToThreeSpheresAwayFromOrigin(origin: string, sphere1: string, sphere2: string, sphere3: string, name?: string) {
        var cmd: string = 'TangentialPlaneToThreeSpheresAwayFromOrigin[' + origin +
            ',' + sphere1 + ',' + sphere2 + ',' + sphere3 + ']';
        this.fullCommandAndExec(cmd, name);
        return name;
    }
    
    /**
     * @return true, if successfully executed command in GeoGebra, else false.
     */
    private fullCommandAndExec(command: string, name: string): boolean {
        command = this.fullCommand(command, name);
        var isSuccessful: boolean = ggbApplet.evalCommand(command);
        if (!isSuccessful) {
            throw new Error(name + ' has not been defined successfully.\nCorresponding command: \n' + command);
        }
        return isSuccessful;
    }


}