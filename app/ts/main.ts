function runLaguerreConstruction() {
    var construction = new Construction();
    construction.run();
}

function runSphereExporter() {
    var exporter = new Exporter();
    exporter.runExportOfSpheres()
}

function runExporterToOBJ() {
    var exporter = new Exporter();
    exporter.runExportToOBJ();
}

function runCreateFaces() {
    var listCreator = new ListCreator(new TypeString(), new View(new GGBTools(), new TypeString()));
    listCreator.getFaceList().createFacesInGGB();
}

function hideAllLabels() {
    var view: View = new View(new GGBTools(), new TypeString());
    view.setLabelsInvisible();
}