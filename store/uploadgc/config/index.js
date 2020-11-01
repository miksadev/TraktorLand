const Cloud = require('@google-cloud/storage')
const path = require('path')

const json = path.resolve('public/keys.json')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: json,
  projectId: 'savvy-generator-294012',
})

module.exports = storage