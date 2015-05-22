class Tools {
    tangentialPlaneToSphere(sphere: number[], point: number[], app: any) {
        ggbApplet.evalCommand('tp_{1,0,0} = TangentialPlaneToSphere[s_0, TPoint_{1,0,0}]');
    }

    indexToString(x: number, y: number, z: number): string {
        var str: string = x + ',' + y + ',' + z;
        return str;
    }

    generalPoint(name: string, x: number, y: number, z: number): void {
        ggbApplet.evalCommand(name + '= (' + this.indexToString(x, y, z) + ')');
    }

    midpoint(region: number[], x: number, y: number, z: number): void {
        var name: string = 'M_{' + region.toString() + '}';
        this.generalPoint(name, x, y, z);
    }

    sphere(region: number[]) {
        var cmd: string = 'Sphere[ M_{' + region.toString() + '}, r_{' + region.toString() + '}]';
        ggbApplet.evalCommand('s_{' + region.toString() + '} =' + cmd);
    }
}