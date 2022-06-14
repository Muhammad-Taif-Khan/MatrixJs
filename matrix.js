class Matrix{
    constructor(rows,cols){
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        //the following for loop will automaticaly fill the matrix with zeros.
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
               this.data[i][j] = 0;
            }
        }
    }
    copy(){
        return this;
    }
    //fromArray method will create column Matrix 
    static fromArray(array){
        let mrx = new Matrix(array.length,1);
        for(let i = 0; i< array.length; i++){
            mrx.data[i][0] = array[i];
        }
        return mrx;
    }
    //convert Matrix to Array
    toArray(){
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
              arr.push(this.data[i][j]);
            }
        }
        return arr;
    }
    //randomize() fill the MAtrix  with random numbers between 1 and -1
    randomize(){
        return this.map(e => Math.random() * 2 - 1);
    }

   static subtract(a,b){
    if (a.rows !== b.rows || a.cols !== b.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }
  
      // Return a new Matrix a-b
      return new Matrix(a.rows, a.cols)
        .map((_, i, j) => a.data[i][j] - b.data[i][j]);
    }
    //add one number or two matrices
    add(n){
        if (n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
              console.log('Columns and Rows of A must match Columns and Rows of B.');
              return;
            }
            return this.map((e, i, j) => e + n.data[i][j]);
          } else {
            return this.map(e => e + n);
          }
    }
   static transpose(matrix){
        let result = new Matrix(matrix.cols,matrix.rows);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
               result.data[j][i] = matrix.data[i][j];
            }
        }
        return result;
    }
    //Matrix multiplication
    static multiply(a,b){
        if(a.cols !== b.rows){
            console.error("Cols of 'A' must be equal to Rows of 'B'!");
            return undefined;
        }

        return new Matrix(a.rows, b.cols).map((e, i, j) => {
          // Dot product of values in col
          let sum = 0;
          for (let k = 0; k < a.cols; k++) {
            sum += a.data[i][k] * b.data[k][j];
          }
          return sum;
        });
    }
    //scaler multiplication
    multiply(num){
        if(num instanceof Matrix){
            // if(this.cols !== num.cols){
            //     console.error("Cols of 'A' must be equal to Rows of 'B'!");
            //     return undefined;
            // }
            return this.map((e, i, j) => e * num.data[i][j]);
        } else {
          // Scalar product
          return this.map(e => e * num);
        }
            
    }
 

    map(func){
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
             let val =  this.data[i][j];
             this.data[i][j] = func(val, i, j);
            }
        }
        return this;
}
static map(matrix,func){
    for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.cols; j++) {
         let val =  matrix.data[i][j];
         matrix.data[i][j] = func(val);
        }
    }
    return matrix;
}

remove(row=0,col=0){
    let result = this,
        data = result.data,i,j;
    if(row > 0) result.rows--;
    if(col > 0) result.cols--;
    for (i = 0; i < data.length; i++) {
        if(i === row-1 && i !== 0){
            data.splice(row-1,1);
         }
    }

    for(j = 0; j< data.length;j++){
        if(col !== undefined && col !== 0){
            data[j].splice(col-1,1);
       }
    }

    return result;
}

// determinant(){
//     if(this.rows === this.cols){

// //find determinant of 2x 2 matrix function
//         function twoByTwoMatrixDet(mtx){
               
//             let first_diag = mtx.data[0][0]*mtx.data[1][1];
//             let sec_diag = mtx.data[0][1]*mtx.data[1][0];
//             return first_diag-sec_diag; 
//         }

//         let result=0;
//         //if it is 1x1 matrix
//         if(this.rows === 1){
//             result=this.data[0][0];
//         }
//         //if it is 2x2 matrix
//         else if(this.rows === 2){
//            twoByTwoMatrixDet(this);
//         }
//         //if it is matrix mxn > 2x2 
//         //[
//         //     1  2  3   1|5 6|
//         //               |8 9|
//         //     4  5  6
//         //     7  8  9
//         //]
//         else if(this.rows > 2){
//             let first_row = this.data[0];
                

//             first_row.forEach((elm,i) =>{
//                 // result += elm*twoByTwoMatrixDet(this.remove(1,i+1));
//             });

//             console.log(first_row);
//         }
//         //  console.log(result);
//         this.print();
//         return;
//     }
//     throw new Error('Determinant of a Matrix is only applicable if it is a square Matrix!');
// }
    print(){
        console.table(this.data);
    }
}



let matrixA = new Matrix(3,3);

matrixA.print();
