// http://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
// http://jsfiddle.net/UselessCode/qm5AG/
var textFileSpheres: any = null;
var objFile: any = null;

/** mode = true then write to OBJ file, else to textFileSpheres */
function writeTextFile(text: any, mode: boolean) {
    var file = mode ? textFileSpheres : objFile;

    var data = new Blob([text], {
        type: 'text/plain'
    });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (file !== null) {
        window.URL.revokeObjectURL(file);
    }

    file = window.URL.createObjectURL(data);

    return file;
};

class Exporter {
    public runExportToOBJ(): void {
        var intersector = new TPlaneIntersectionPointConstruction(new TypeString(), new GGBTools());
        intersector.createTPlaneIntersectionPoints();
        var extractedDataStr: string = this.extractOBJDataFromGGBApplet();
        var link: any = document.getElementById('downloadOBJlink');
        link.href = writeTextFile(extractedDataStr, true);
        link.style.display = 'block';
    }

    public runExportOfSpheres(): void {
        var extractedDataStr: string = this.extractSphereDataFromGGBApplet();
        var link: any = document.getElementById('downloadlink');
        link.href = writeTextFile(extractedDataStr, false);
        link.style.display = 'block';
    }

    private extractOBJDataFromGGBApplet(): string {
        var objExporter = new OBJExporter();
        var outputStr: string = objExporter.extractData();
        if (Settings.debug > 0) {
            console.log(outputStr);
        }
        return outputStr;
    }
    private extractSphereDataFromGGBApplet(): string {
        var sphereExporter: SphereExporter = new SphereExporter();
        var outputStr: string = sphereExporter.extractAllSpheres();
        if (Settings.debug > 0) {
            console.log(outputStr);
        }
        return outputStr;
    }
}