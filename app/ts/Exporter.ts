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
    public runExportOfSpheres(): void {
        var extractedDataStr: string = this.extractDataFromGGBApplet();
        var link: any = document.getElementById('downloadlink');
        link.href = writeTextFile(extractedDataStr);
        link.style.display = 'block';
    }

    private extractDataFromGGBApplet(): string {
        var sphereExporter: SphereExporter = new SphereExporter();
        var outputStr: string = sphereExporter.extractAllSpheres();
        console.log(outputStr);
        return outputStr;
    }
}