
/**
 * This class contains direct translations of the GeoGebraScript commands to TypeScript. 
 * Therefore most method parameters will be strings.
 */
class GGBTools {

    public distance(objName1: string, objName2: string, name?: string): string {
        var cmd: string = 'Distance[' + objName1 + ', ' + objName2 + ']';
        this.throwErrorIfNotExistentInGGBApplet(objName1, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(objName2, cmd, name);
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public intersect(objName1: string, objName2: string, name?: string): string {
        var cmd: string = 'Intersect[' + objName1 + ', ' + objName2 + ']';
        this.throwErrorIfNotExistentInGGBApplet(objName1, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(objName2, cmd, name);
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public plane(pointName1: string, pointName2: string, pointName3: string, name?: string): string {
        var cmd: string = 'Plane[' + pointName1 + ', ' + pointName2 + ', ' + pointName3 + ']';
        this.throwErrorIfNotExistentInGGBApplet(pointName1, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(pointName2, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(pointName3, cmd, name);
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
        this.throwErrorIfNotExistentInGGBApplet(targetObj, cmd, name);
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public midpoint(targetName: string, name?: string): string {
        var cmd: string = 'Midpoint[' + targetName + ']';
        this.throwErrorIfNotExistentInGGBApplet(targetName, cmd, name);
        this.fullCommandAndExec(cmd, name);
        return name;
    }
    
    /**
     *  Reflect[], also known as Mirror[]
     */
    public reflect(targetName: string, mirrorName: string, name?: string): string {
        var cmd: string = 'Mirror[' + targetName + ',' + mirrorName + ']';
        this.throwErrorIfNotExistentInGGBApplet(targetName, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(mirrorName, cmd, name);
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public reflectIn3Spheres(sphere1: string, sphere2: string, sphere3: string,
        planeToBeMirrored: string, name?: string): string {
        var cmd: string = 'ReflectIn3Spheres[' + sphere1 + ' , ' + sphere2 + ' , ' + sphere3 +
            ' , ' + planeToBeMirrored + ']';
        this.throwErrorIfNotExistentInGGBApplet(sphere1, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(sphere2, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(sphere3, cmd, name);
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    public segment(endpoint1: string, endpoint2: string, name?: string): string {
        var cmd: string = 'Segment[' + endpoint1 + ', ' + endpoint2 + ']';
        this.throwErrorIfNotExistentInGGBApplet(endpoint1, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(endpoint2, cmd, name);
        this.fullCommandAndExec(cmd, name);
        return name;
    }

    /**
     * @param name: string Name of the object inside GeoGebra.
     * @param color: string See GeoGebra page https://wiki.geogebra.org/en/Reference:Colors for reference.
     */
    public setColor(name: string, color: string): void {
        var cmd: string = 'SetColor[' + name + ',' + color + ']';
        this.throwErrorIfNotExistentInGGBApplet(name, cmd, '');
        var isSuccessful: boolean = ggbApplet.evalCommand(cmd);
        if (!isSuccessful) {
            throw new Error(name + ' has not been defined successfully.\nCorresponding command: \n' + cmd);
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
        this.throwErrorIfNotExistentInGGBApplet(midpoint, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(radius, cmd, name);
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
        var cmd: string = 'TangentPlaneToSphere[' + sphere + ', ' + point + ']';
        this.throwErrorIfNotExistentInGGBApplet(sphere, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(point, cmd, name);
        this.fullCommandAndExec(cmd, name);
        return name;
    }
    
    /**
     * Custom Tool, where the ray emits from from the midpoint of given sphere and goes through the 
     * intersection point of the three planes.
     */
    public rayOfSphereMidpoints(sphere: string, plane1: string, plane2: string, plane3: string, name?: string) {
        var cmd: string = 'RayOfSphereMidpoints[' + sphere + ',' + plane1 + ',' + plane2 + ',' + plane3 + ']';

        this.throwErrorIfNotExistentInGGBApplet(sphere, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(plane1, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(plane2, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(plane3, cmd, name);

        this.fullCommandAndExec(cmd, name);
        return name;
    }
    
    /**
     * Custom Tool, where the ray emits from from the midpoint of given sphere and goes through the 
     * intersection point of the three planes.
     */
    public rayOfParameterMidpoints(sphere: string, plane1: string, plane2: string, plane3: string, name?: string) {
        var cmd: string = 'RayOfParameterSphereMidpoints[' + sphere + ',' + plane1 + ',' + plane2 + ',' + plane3 + ']';

        this.throwErrorIfNotExistentInGGBApplet(sphere, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(plane1, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(plane2, cmd, name);
        this.throwErrorIfNotExistentInGGBApplet(plane3, cmd, name);

        this.fullCommandAndExec(cmd, name);
        return name;
    }

    private throwErrorIfNotExistentInGGBApplet(objName: string, cmd: string, definiendum: string) {
        /**
         * Checks if the given object objName exists in the GGBApplet. If not it throws an Error naming the full command
         * including definiendum.
         */
        if (!ggbApplet.exists(objName)) {
            throw new Error(objName + ' not existing for command:\n' + this.fullCommand(cmd, definiendum));
        }
        else {
            return true;
        }
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