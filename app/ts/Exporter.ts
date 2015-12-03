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

    public run() {
        var extractedDataStr: string = this.extractDataFromGGBApplet();
        var link: any = document.getElementById('downloadlink');
        link.href = writeTextFile(extractedDataStr);
        link.style.display = 'block';
    }

    private extractDataFromGGBApplet() {
        this.toStr = new TypeString();
        var outputStr: string = this.toVertexLineInOBJ(this.toStr.midpoint([0, 0, 2]));
        console.log(outputStr);
        return outputStr;
    }


    /** for export to wavefront OBJ format */
    private toVertexLineInOBJ(pointName: string) {
        return 'v ' + this.toLineOfCoords(pointName) + '\n';
    }
    
    /** Extracts coordinates of given point to a string of the form "x y z". */
    private toLineOfCoords(pointName: string): string {
        var xCoord = ggbApplet.getXcoord(pointName);
        var yCoord = ggbApplet.getYcoord(pointName);
        var zCoord = ggbApplet.getZcoord(pointName);
        return xCoord + ' ' + yCoord + ' ' + zCoord;
    }
}