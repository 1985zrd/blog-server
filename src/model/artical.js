const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const operateData = require('./operateData')

const ObjectId = mongoose.Schema.Types.ObjectId

let articalSchema = new mongoose.Schema({
  category: {
    type: ObjectId,
    ref: 'categories'
  }, // 栏目1，关联栏目1表
  title: String, // 标题
  content: String, // 内容
  author: {
    type: ObjectId,
    ref: 'users'
  }, // 作者，关联用户表
  anonymous: {
    type: Boolean,
    default: false
  }, // 是否匿名发布，默认实名发布
  introduction: {
    type: String,
    default: ''
  }, // 简介
  imageUrl: {
    type: String,
    default: ''
  }, // 封面图
  state: {
    type: Number,
    defalut: 1
  }, // 状态，0（不可用）、1（草稿）、2（发布）、3（下架）
  visitor: {
    type: Number,
    default: 0
  }, // 访问人数
  commentators: {
    type: Number,
    default: 0
  }, // 评论条数
  shared: {
    type: Number,
    default: 0
  }, // 分享次数
  star: { // 点赞数
    type: Number,
    default: 0
  },
  starList: {
    type: Array,
    default: []
  }, // 点赞人的数组集合 ['_id']
  following: {
    type: [ {
      type: ObjectId
    } ]
  },
  createTime: {
    type: Date,
    default: Date.now()
  }, // 创建时间
  updateTime: {
    type: Date,
    default: Date.now()
  } // 更新时间
})

articalSchema.pre('save', function (next) {
  this.createTime = Date.now()
  this.updateTime = Date.now()
  next()
})

articalSchema.statics = operateData.statics

const Artical = mongoose.model('articals', articalSchema)

module.exports = Artical
