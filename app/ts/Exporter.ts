// http://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
// http://jsfiddle.net/UselessCode/qm5AG/
var textFile: any = null;
function writeTextFile(text: any) {
    var data = new Blob([text], {
        type: 'text/plain'
    });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};

class Exporter {
    private toStr: TypeString;

    public run(): void {
        var extractedDataStr: string = this.extractDataFromGGBApplet();
        var link: any = document.getElementById('downloadlink');
        link.href = writeTextFile(extractedDataStr);
        link.style.display = 'block';
    }

    private extractDataFromGGBApplet(): string {
        this.toStr = new TypeString();
        var outputStr: string = this.extractAllSpheres();
        console.log(outputStr);
        return outputStr;
    }
    
    /** Extracts coords of Sphere midpoint and radius in the form "x y z r" */
    private toLineXYZRadius(sphereIndex: number[]): string {
        var midpoint: string = this.toStr.midpoint(sphereIndex);
        var radiusName: string = this.toStr.radius(sphereIndex);
        return this.toLineOfCoords(midpoint) + ' ' + ggbApplet.getValue(radiusName) + '\n';
    }
    
    /** Extracts coordinates of given point to a string of the form "x y z". */
    private toLineOfCoords(pointName: string): string {
        var xCoord = ggbApplet.getXcoord(pointName);
        var yCoord = ggbApplet.getYcoord(pointName);
        var zCoord = ggbApplet.getZcoord(pointName);
        return xCoord + ' ' + yCoord + ' ' + zCoord;
    }
    
    /**
    * extracts all spheres in form "x y z r" (one line per sphere),
    * where all means all existing spheres specified via Settings MAX_REGION_etc
    */
    private extractAllSpheres(): string {
        var outputStr: string = '';
        for (var x = -Settings.MAX_REGION_IN_NEG_X_DIR; x <= Settings.MAX_REGION_IN_POS_X_DIR; x++) {
            for (var y = -Settings.MAX_REGION_IN_NEG_Y_DIR; y <= Settings.MAX_REGION_IN_POS_Y_DIR; y++) {
                for (var z = -Settings.MAX_REGION_IN_NEG_Z_DIR; z <= Settings.MAX_REGION_IN_POS_Z_DIR; z++) {
                    if (ggbApplet.exists(this.toStr.sphere([x, y, z]))) {
                        outputStr += this.toLineXYZRadius([x, y, z]);
                    }
                }
            }
        }
        return outputStr;
    }
}