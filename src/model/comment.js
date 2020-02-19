const mongoose = require('mongoose')
const operateData = require('./operateData')

const ObjectId = mongoose.Schema.Types.ObjectId

let commentSchema = new mongoose.Schema({
  artical: {
    type: ObjectId,
    ref: 'articals'
  }, // 
  author: {
    type: ObjectId,
    ref: 'users'
  }, // 
  zan: {
    type: Number,
    default: 0
  }, // 
  content: String, // 内容
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

commentSchema.pre('save', function (next) {
  this.updateTime = Date.now()
  next()
})

commentSchema.statics = operateData.statics

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment
