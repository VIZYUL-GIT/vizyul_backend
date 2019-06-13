const debug = require('debug')('vizyul:api:util');

const success = (result) => Object.assign({}, result, { status: true });

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.PASSWORD_CRYPTO_KEY.slice(0, 32));
const initializationVector = crypto.randomBytes(parseInt(process.env.CRYPTO_IV_LEN));

debug('key=', key);

function encrypt(text) {
 const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), initializationVector);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return JSON.stringify({ iv: initializationVector.toString('hex'), encryptedData: encrypted.toString('hex') });
}

function decrypt(text) {
 const input = JSON.parse(text);
 const iv = Buffer.from(input.iv, 'hex');
 const encryptedText = Buffer.from(input.encryptedData, 'hex');
 const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}


module.exports = { success, encrypt, decrypt };