const mongoose = require('mongoose')
const operateData = require('./operateData')

let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true // 必填
  }, // 用户名
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

categorySchema.pre('save', function (next) {
  this.updateTime = Date.now()
  next()
})

categorySchema.statics = operateData.statics

const Category = mongoose.model('categories', categorySchema)

module.exports = Category
