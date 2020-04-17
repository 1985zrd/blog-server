const crypto = require('crypto')
const os = require('os')
const jwt = require("jsonwebtoken")
const config = require('../config/index')
console.log(config)
const secret = 'rd_1985@163.com'

exports.salt = '1985zrd'

exports.cryptMD5 = function (name, salt) {
  let saltName = `${name}:${salt}`
  let md5 = crypto.createHash('md5')
  return md5.update(saltName).digest('hex')
}

exports.getIPAddress = function () { // 获取本地ip
  let interfaces = os.networkInterfaces()
  for (let name in interfaces) {
    let iface = interfaces[name]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

exports.checkEmail = function (email) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)
}

exports.checkPassword = function (password) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(password) // 6位数字和字母组合  {6,} {6, 10}
}

exports.checkMobile = function (mobile) {
  return /^1[0-9]{10}$/.test(mobile) // 11位手机号
}

exports.generateToken = async (userinfo) => {
  return jwt.sign(
    userinfo,
    secret,
    {
      expiresIn: '2h'
      // 设置 token 过期时间，一小时后，秒为单位
    }
  )
}
