const path = require('path')
const fs = require('fs')
const { cryptMD5, salt } = require('../utils/index')

const { success_cb } = require('../utils/res-model')

const config = require('../config')

exports.upload = async (ctx) => {
  let files = ctx.request.files
  if (!files || !files.file || files.file.size === 0) {
    ctx.error(400, '请选择文件再上传！')
  }
  const file = files.file

  let fileName = cryptMD5(file.name, salt) + '.' + file.type.split('/')[1]
  const backUrl = `${config.server.url}/upload/${fileName}`

  const filePath = path.join(__dirname, '../public/upload/') + fileName
  const readStream = fs.createReadStream(file.path)
  const writeStream = fs.createWriteStream(filePath)
  readStream.pipe(writeStream)

  return success_cb({
    url: backUrl
  })
}
