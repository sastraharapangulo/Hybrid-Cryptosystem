import { HillCipher } from "./hillCipher";

function enkripsi() {
  var key = document.getElementById("key").value;
  var message = document.getElementById("message").value;

  const hasil = HillCipher(message, key);
  console.log("hasil" + hasil);
  var matriksKunci = document.getElementById("matriks-kunci");
  var ciphertext = document.getElementById("ciphertext");
  matriksKunci.innerHTML = hasil.matriksKunci;
  ciphertext.innerHTML = hasil.ciphertext;
}
