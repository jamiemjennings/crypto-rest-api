class CryptoService {
  constructor (options = {}) {
    this.logger = options.logger || require('../util/defaultLogger')
  }

  async encrypt (keyName, plaintext) {
    return new Promise((resolve, reject) => {
      this.logger.info(`STUB encrypt() call`)
      resolve({ keyName, cipherText: 'encrypted_data' })
    })
  }

  async decrypt (keyName, ciphertext) {
    return new Promise((resolve, reject) => {
      this.logger.info(`STUB decrypt() call`)
      resolve({ keyName, plaintext: 'decrypted_data' })
    })
  }
}

module.exports = CryptoService
