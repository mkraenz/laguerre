class OBJExporter {

    constructor(private toStr: TypeString) { }

    public extractData(): string {
        var lists = new ListCreator(this.toStr, new View(new GGBTools(), this.toStr));
        var outputStr: string = lists.getVertexList().toOBJString();
        outputStr += lists.getFaceList().toOBJString();
        return outputStr.trim();
    }
}
