const { getIPAddress } = require('../utils')

let serverURL = `http://${getIPAddress()}:9000`
// let serverURL = ''

module.exports = {
  app: {
    keys: ['rd_1985@163.com']
  },
  db: {
    url: 'mongodb://1985zrd:Zrd-database@120.27.8.21:27017/blog',
    // url: 'mongodb://1985zrd:Zrd-database@172.31.141.72:27017/blog',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  server: {
    url: serverURL
  }
}
