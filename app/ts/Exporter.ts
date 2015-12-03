var textFile:any = null;
function makeTextFile(text:any) {
    var data = new Blob([ text ], {
        type : 'text/plain'
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
        link.href = makeTextFile(extractedDataStr);
        link.style.display = 'block';
    }

    private extractDataFromGGBApplet() {
        this.toStr = new TypeString();
        var outputStr: string;

        var midpoint: string = this.toStr.midpoint([0, 0, 2]);

        var xCoord = ggbApplet.getXcoord(midpoint);
        var yCoord = ggbApplet.getYcoord(midpoint);
        var zCoord = ggbApplet.getZcoord(midpoint);
        outputStr = "Coords of M_{0,0,2}: " + xCoord + ',' + yCoord + ',' + zCoord;
        console.log(outputStr);
        return outputStr;
    }
}