function encryptRabin(message) {
  function encryption(m, n) {
    /* c = (m^2) mod n */
    let c = (m * m) % n;
    return c;
  }

  /* chinese remainder theorem implementation */
  function mod(k, b, m) {
    let i = 0;
    let a = 1;
    let v = [];
    while (k > 0) {
      v.push(k % 2);
      k = Math.floor((k - v[i]) / 2);
      i++;
    }
    for (let j = 0; j < i; j++) {
      if (v[j] === 1) {
        a = (a * b) % m;
        b = (b * b) % m;
      } else {
        b = (b * b) % m;
      }
    }
    return a;
  }

  function modulo(a, b) {
    return a >= 0 ? a % b : (b - Math.abs(a % b)) % b;
  }

  /* Extended Eucledian Algorithm */
  function extendedEuclid(a, b) {
    if (b > a) {
      let temp = a;
      a = b;
      b = temp;
    }
    let i = 0;
    let j = 1;
    let x = 1;
    let y = 0;
    while (b !== 0) {
      let q = Math.floor(a / b);
      let temp1 = a % b;
      a = b;
      b = temp1;
      let temp2 = i;
      i = x - q * i;
      x = temp2;
      let temp3 = j;
      j = y - q * j;
      y = temp3;
    }
    let arr = [x, y, 1];
    return arr;
  }

  function decryption(c, p, q) {
    let r = mod((p + 1) / 4, c, p);
    let s = mod((q + 1) / 4, c, q);

    let arr = extendedEuclid(p, q);
    let rootp = arr[0] * p * s;
    let rootq = arr[1] * q * r;
    let r1 = modulo(rootp + rootq, n);
    if (r1 < 128) return r1;
    let negative_r = n - r1;
    if (negative_r < 128) return negative_r;
    let s1 = modulo(rootp - rootq, n);
    if (s1 < 128) return s1;
    let negative_s = n - s1;
    return negative_s;
  }

  /* private key pair(p,q) of the form 3 mod 4 */
  let p = 151;
  let q = 43;

  /* public key n */
  let n = p * q;

  console.log("Plain text: " + message);

  let len = message.length;

  let e = [];
  let d = [];
  let f = [];

  for (let i = 0; i < len; i++) {
    e.push(encryption(message.charCodeAt(i), n));
  }
  for (let i = 0; i < len; i++) {
    d.push(decryption(e[i], p, q));
  }
  let encryptedText = e
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
  let encryptedTexte = e.map((charCode) => charCode).join("");

  for (let i = 0; i < len; i++) {
    f.push(encryptedText.charCodeAt(i));
  }

  console.log(encryptedTexte);
  console.log(f);

  let decryptedText = d
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
  console.log("Encrypted text: " + encryptedText);
  console.log("Decrypted text: " + decryptedText);
  return { encryptedText: encryptedText, decryptedText: decryptedText };
}
