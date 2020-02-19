const mongoose = require('mongoose')
const operateData = require('./operateData')

let bannerSchema = new mongoose.Schema({
  name: String, // 图片名称
  url: String, // 图片地址
  linkUrl: String, // 跳转地址
  state: {
    type: Number,
    defalut: 1
  }, // 是否可用，1可用、0不可用
  createTime: {
    type: Date,
    default: Date.now()
  }, // 创建时间
  updateTime: {
    type: Date,
    default: Date.now()
  } // 更新时间
})

bannerSchema.pre('save', function (next) {
  this.updateTime = Date.now()
  next()
})

bannerSchema.statics = operateData.statics

const banner = mongoose.model('banner', bannerSchema)

module.exports = banner
