function runFullLaguerreConstruction() {
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
function runInputParameterExporter() {
    var exporter = new Exporter();
    exporter.runExportOfInputParameters();
}
function runAllIntersectionPointsOfTplanes() {
    var intersector = new TPlaneIntersectionPointConstruction(new TypeString(), new GGBTools());
    intersector.createTPlaneIntersectionPoints();
}

function runCreateFaces() {
    var listCreator = new ListCreator(new TypeString(), new View(new GGBTools(), new TypeString()));
    listCreator.getFaceList().createFacesInGGB();
}

function hideAllLabels() {
    var view: View = new View(new GGBTools(), new TypeString());
    view.setLabelsInvisible();
}

function hideAllNonInspheres() {
    var view: View = new View(new GGBTools(), new TypeString());
    view.hideallNonInspheres();
}