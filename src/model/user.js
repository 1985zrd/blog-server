const mongoose = require('mongoose')
const operateData = require('./operateData')

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true // 必填
  }, // 用户名
  password: {
    type: String,
    select: false
  }, // 密码
  email: {
    type: String,
    default: ''
  }, // 邮箱
  avatar: {
    type: String, // 头像
    default: ''
  }, // 头像
  role: {
    type: Number,
    default: 2,
    select: false
  }, // 权限，0禁用、1禁言（不能发布和评论）、2默认可用、9最高管理员（后台管理员）
  createTime: {
    type: Date,
    default: Date.now()
  }, // 创建时间
  updateTime: {
    type: Date,
    default: Date.now()
  } // 更新时间
})

userSchema.pre('save', function (next) {
  this.updateTime = Date.now()
  // 把密码做加密处理
  next()
})

/**
 * 这里留着做密码对比
 */

userSchema.statics = operateData.statics

const Users = mongoose.model('users', userSchema)

module.exports = Users
