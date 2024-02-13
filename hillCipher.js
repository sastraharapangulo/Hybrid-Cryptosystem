// Javascript code to implement Hill Cipher

// Following function generates the
// key matrix for the key string
function getKeyMatrix(key, keyMatrix) {
  let k = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      keyMatrix[i][j] = key[k].charCodeAt(0) % 256;
      k++;
    }
  }
}

// Following function encrypts the message
function encrypt(cipherMatrixArr, keyMatrix, messageVector) {
  let x, i, j;
  let cipherMatrix = new Array(2);
  for (let i = 0; i < 2; i++) {
    cipherMatrix[i] = new Array(1);
    cipherMatrix[i][0] = 0;
  }
  for (i = 0; i < 2; i++) {
    for (j = 0; j < 1; j++) {
      cipherMatrix[i][j] = 0;

      for (x = 0; x < 2; x++) {
        cipherMatrix[i][j] += keyMatrix[i][x] * messageVector[x][j];
      }

      cipherMatrix[i][j] = cipherMatrix[i][j] % 256;
    }
  }
  cipherMatrixArr.push(cipherMatrix);
}

// Function to implement Hill Cipher
function HillCipher(message, key) {
  // Get key matrix from the key string
  let keyMatrix = new Array(2);
  for (let i = 0; i < 2; i++) {
    keyMatrix[i] = new Array(2);
    for (let j = 0; j < 2; j++) keyMatrix[i][j] = 0;
  }
  getKeyMatrix(key, keyMatrix);
  console.log(keyMatrix);

  let messageArr = [];
  let k = 0;

  for (let i = 0; i < Math.ceil(message.length / 2); i++) {
    let messageVector = new Array(2);
    for (let j = 0; j < 2; j++) {
      messageVector[j] = new Array(1);
      messageVector[j][0] = 0;
    }

    // Generate vector for the message
    for (let j = 0; j < 2; j++) {
      console.log(k);
      messageVector[j][0] = (message[k] ?? " ").charCodeAt(0) % 256;
      k++;
    }
    console.log(messageVector);

    messageArr.push(messageVector);
  }
  console.log(messageArr);

  let cipherMatrixArr = [];

  // Following function generates
  // the encrypted vector
  messageArr.map((message) => encrypt(cipherMatrixArr, keyMatrix, message));

  let CipherText = "";

  // Generate the encrypted text from
  // the encrypted vector
  cipherMatrixArr.map((cipherMatrix) => {
    for (let j = 0; j < 2; j++)
      CipherText += String.fromCharCode(cipherMatrix[j][0]);
  });
  //   for (let i = 0; i < Math.ceil(message.length / 2); i++) {
  //     for (let j = 0; j < 2; j++)
  //       CipherText += String.fromCharCode(cipherMatrixArr[j][i] + 65);
  //   }

  console.log(cipherMatrixArr);

  // Finally print the ciphertext
  console.log(" Ciphertext: " + CipherText);
  return { matriksKunci: keyMatrix, ciphertext: CipherText };
}

// Driver code
// Get the message to be encrypted
let message = "Nivos Cinta Uti";

// Get the key
let key = "4333";

HillCipher(message, key);

// This code is contributed by rag2127
