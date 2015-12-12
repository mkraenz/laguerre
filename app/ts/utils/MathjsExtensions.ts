class MathjsExtensions {

    public switchMatrixColumns(matrix: number[][], columnIndex1: number, columnIndex2: number): void {
        for (var i = 0; i < matrix.length; i++) {
            var tmp = matrix[i][columnIndex1];
            matrix[i][columnIndex1] = matrix[i][columnIndex2];
            matrix[i][columnIndex2] = tmp;
        }
    }

    public multiplyColumnByScalar(matrix: number[][], scalar: number , columnIndex: number){
       for(var i = 0; i< matrix.length; i++){
          matrix[i][columnIndex] *= scalar; 
       } 
    }
    
}
