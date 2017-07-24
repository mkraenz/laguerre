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
        var extractedDataStr: string = this.extractOBJDataFromGGBApplet();
        this.showDownloadLink(extractedDataStr);
    }

    public runExportOfSpheres(): void {
        var extractedDataStr: string = this.extractSphereDataFromGGBApplet();
        this.showDownloadLink(extractedDataStr);
    }

    public runExportOfInputParameters(): void {
        var extractedDataStr: string = this.extractInputParametersFromGGBApplet();
        this.showDownloadLink(extractedDataStr);
    }

    private extractOBJDataFromGGBApplet(): string {
        var objExporter = new OBJExporter(new TypeString());
        var outputStr: string = objExporter.extractData();
        this.toConsoleIfHighDebugLevel(outputStr);
        return outputStr;
    }

    private extractSphereDataFromGGBApplet(): string {
        var sphereExporter: SphereExporter = new SphereExporter(new TypeString());
        var outputStr: string = sphereExporter.extractAllSpheres();
        this.toConsoleIfHighDebugLevel(outputStr);
        return outputStr;
    }

    private extractInputParametersFromGGBApplet(): string {
        var inputParameterExporter = new InputParameterExporter(new TypeString());
        var outputStr: string = inputParameterExporter.export();
        this.toConsoleIfHighDebugLevel(outputStr);
        return outputStr;
    }
    private toConsoleIfHighDebugLevel(outputStr: string) {
        if (Settings.debug > 1) {
            console.log(outputStr);
        }
    }

    private showDownloadLink(extractedDataStr: string) {
        var link: any = document.getElementById('downloadlink');
        link.href = writeTextFile(extractedDataStr, false);
        link.style.display = 'block';
    }
}