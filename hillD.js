// Following function calculates the

function getKeyMatrix(key, keyMatrix) {
  let k = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      keyMatrix[i][j] = key[k].charCodeAt(0) % 256;
      k++;
    }
  }
}
// inverse of a matrix using modular arithmetic
function modInverse(a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) if (((a % m) * (x % m)) % m == 1) return x;
  return 1;
}

// Following function calculates the
// determinant of a 2x2 matrix
function calcDeterminant(matrix) {
  return (
    (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0] + 256) % 256
  );
}

// Following function calculates the
// adjugate of a 2x2 matrix
function calcAdjugate(matrix, adjugate) {
  adjugate[0][0] = matrix[1][1];
  adjugate[0][1] = -matrix[0][1];
  adjugate[1][0] = -matrix[1][0];
  adjugate[1][1] = matrix[0][0];
}

// Following function calculates the
// inverse of a 2x2 matrix using modular arithmetic
function inverseMatrix(matrix, inverse) {
  let det = calcDeterminant(matrix);
  if (det === 0) {
    console.log("Matrix is not invertible.");
    return;
  }

  let adjugate = new Array(2);
  for (let i = 0; i < 2; i++) {
    adjugate[i] = new Array(2);
  }

  calcAdjugate(matrix, adjugate);

  let detInverse = modInverse(det, 256);

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      inverse[i][j] = (adjugate[i][j] * detInverse) % 256;
    }
  }
}

// Following function decrypts the message
function decrypt(decryptedMatrixArr, inverseMatrix, cipherMatrix) {
  let x, i, j;
  let decryptedMatrix = new Array(2);
  for (let i = 0; i < 2; i++) {
    decryptedMatrix[i] = new Array(1);
    decryptedMatrix[i][0] = 0;
  }
  for (i = 0; i < 2; i++) {
    for (j = 0; j < 1; j++) {
      decryptedMatrix[i][j] = 0;

      for (x = 0; x < 2; x++) {
        decryptedMatrix[i][j] += inverseMatrix[i][x] * cipherMatrix[x][j];
      }

      decryptedMatrix[i][j] = ((decryptedMatrix[i][j] % 256) + 256) % 256;
    }
  }
  decryptedMatrixArr.push(decryptedMatrix);
}

// Function to implement Hill Cipher decryption
function HillCipherDecrypt(ciphertext, key) {
  let keyMatrix = new Array(2);
  for (let i = 0; i < 2; i++) {
    keyMatrix[i] = new Array(2);
    for (let j = 0; j < 2; j++) keyMatrix[i][j] = 0;
  }
  getKeyMatrix(key, keyMatrix);

  let inverseKeyMatrix = new Array(2);
  for (let i = 0; i < 2; i++) {
    inverseKeyMatrix[i] = new Array(2);
    for (let j = 0; j < 2; j++) inverseKeyMatrix[i][j] = 0;
  }
  inverseMatrix(keyMatrix, inverseKeyMatrix);

  let ciphertextArr = [];
  let k = 0;

  for (let i = 0; i < Math.ceil(ciphertext.length / 2); i++) {
    let cipherMatrix = new Array(2);
    for (let j = 0; j < 2; j++) {
      cipherMatrix[j] = new Array(1);
      cipherMatrix[j][0] = 0;
    }

    for (let j = 0; j < 2; j++) {
      cipherMatrix[j][0] = (ciphertext[k] ?? " ").charCodeAt(0) % 256;
      k++;
    }

    ciphertextArr.push(cipherMatrix);
  }

  console.log(ciphertextArr);

  let decryptedMatrixArr = [];
  ciphertextArr.map((cipherMatrix) =>
    decrypt(decryptedMatrixArr, inverseKeyMatrix, cipherMatrix)
  );

  let decryptedText = "";

  decryptedMatrixArr.map((decryptedMatrix) => {
    for (let j = 0; j < 2; j++)
      decryptedText += String.fromCharCode(decryptedMatrix[j][0]);
  });

  console.log(decryptedMatrixArr);

  console.log(decryptedText);
  return { matriksKunci: keyMatrix, ciphertext: decryptedText };
}

// Driver code for decryption
let ciphertext = "/Üx♣{ ¥HÓì}";
let decryptionKey = "4333";

HillCipherDecrypt(ciphertext, decryptionKey);
