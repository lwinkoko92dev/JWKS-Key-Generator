const fs = require('fs');
const path = require('path');
const jose = require('node-jose');
const crypto = require('crypto');

async function generateKey(keytype) {
  let key = crypto.generateKeyPairSync('ec', {
    namedCurve: 'prime256v1',
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  let cryptoKey = await jose.JWK.asKey(key.privateKey, 'pem');

  if (keytype === 'signing') {
    saveKeyToFile('keys/sig-key.pem', key.privateKey);
  } else {
    saveKeyToFile('keys/enc-key.pem', key.privateKey);
  }

  return cryptoKey;
}

async function generateJwks() {
  // Creating Signing Key
  let signingKey = await generateKey('signing');
  let publicSigningKeyJSON = signingKey.toJSON();

  // Creating Encryption Key
  let encryptionKey = await generateKey('encryption');
  let publicEncryptionKeyJSON = encryptionKey.toJSON();

  let jwks = {
    keys: [
      {
        ...publicSigningKeyJSON,
        ...{ use: 'sig' },
        ...{ crv: 'P-256' },
        ...{ alg: 'ES256' },
      },
      {
        ...publicEncryptionKeyJSON,
        ...{ use: 'enc' },
        ...{ crv: 'P-256' },
        ...{ alg: 'ECDH-ES+A256KW' },
      },
    ],
  };

  // Save the JWKS to a file in pretty JSON format
  saveKeyToFile('keys/jwks.json', JSON.stringify(jwks, null, 2));

  console.log(JSON.stringify(jwks));
}

function saveKeyToFile(filePath, key) {
  fs.writeFileSync(path.resolve(__dirname, filePath), key, 'utf8');
}

// Example usage
generateJwks();