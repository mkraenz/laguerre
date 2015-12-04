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