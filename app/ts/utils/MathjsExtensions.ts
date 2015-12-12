class MathjsExtensions {

    public switchMatrixColumns(matrix: number[][], columnIndex1: number, columnIndex2: number): void {
        for (var i = 0; i < matrix.length; i++) {
            var tmp = matrix[i][columnIndex1];
            matrix[i][columnIndex1] = matrix[i][columnIndex2];
            matrix[i][columnIndex2] = tmp;
        }
    }

    private addFaceInPlane(x: number, y: number, z: number, normalDir: number): void {
        // TODO
        var indexMatrix: number[][] = [[x, y, z], [x, y, z], [x, y, z], [x, y, z]]
        var mathjsExt: MathjsExtensions = new MathjsExtensions();
        var shiftMatrix: number[][] = Utils.getShiftMatrix();
        mathjsExt.switchMatrixColumns(shiftMatrix, 0, normalDir);
        var resultingMatrix = math.add(indexMatrix, shiftMatrix);
        console.log('resulting matrix = ' + resultingMatrix);
    }

    public testSwitchMatrixColumns() {
        this.addFaceInPlane(0, 0, 0, 1);
    }
}
