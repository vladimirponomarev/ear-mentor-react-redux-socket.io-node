import crypto from 'crypto';

const algorithm = 'aes-128-ofb';

export function encrypt(key, text) {
  const cipher = crypto.createCipher(algorithm, key);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

export function decrypt(key, encrypted) {
  const decipher = crypto.createDecipher(algorithm, key);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
