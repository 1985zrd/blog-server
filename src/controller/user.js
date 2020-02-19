const Users = require('../model/user.js')
const { success_cb } = require('../utils/res-model')
const { cryptMD5, salt, checkEmail, checkMobile, checkPassword } = require('../utils/index')

exports.signUp = async (ctx) => { // 注册
  // 判断字段是否合规
  let body = ctx.request.body
  if (!body.username || !body.password || !body.confirmPassword) {
    ctx.error(400, '请输入完整信息')
  }
  if (!checkEmail(body.username) && !checkMobile(body.username)) {
    ctx.error(400, '请输入正确手机号/邮箱')
  }
  if (!checkPassword(body.password)) {
    ctx.error(400, '请输入6-10位数字与字母组合密码')
  }
  if (body.password !== body.confirmPassword) {
    ctx.error(400, '密码与确认密码必须一致')
  }
  let user
  try {
    user = await Users.Find({
      where: {
        username: body.username
      }
    })
  } catch (e) {
    ctx.error(503, '服务端出错了')
  }
  if (user.length > 0) {
    ctx.error(400, '用户名已被注册')
  }

  const _data = {
    username: body.username,
    password: cryptMD5(body.password, salt)
  }
  let _user = new Users({
    ..._data
  }, false)
  let res
  try {
    res = await _user.save()
  } catch (e) {
    ctx.error(503, '保存出错')
  }
  ctx.session.user = res
  return success_cb({
    username: checkMobile(res.username) ? res.username.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2') : res.username
  })
}

exports.signIn = async (ctx) => {
  // console.log(ctx.ip)
  let body = ctx.request.body
  if (!body.username || !body.password) {
    ctx.error(400, '请输入完整信息')
  }
  if (!checkEmail(body.username) && !checkMobile(body.username)) {
    ctx.error(400, '请输入正确手机号/邮箱')
  }
  if (!checkPassword(body.password)) {
    ctx.error(400, '请输入6-10位数字与字母组合密码')
  }
  let user
  try {
    user = await Users.Find({
      where: {
        username: body.username,
        password: cryptMD5(body.password, salt)
      }
    })
  } catch (e) {
    ctx.error(503, '服务端出错了')
  }
  if (user.length <= 0) {
    ctx.error(400, '用户名未注册或密码错误')
  }
  if (user[0].role === 0) {
    ctx.error(403, '用户名已被禁用')
  }
  ctx.session.user = user[0]
  let username = user[0]['username']
  return success_cb({
    username: checkMobile(username) ? username.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2') : username
  })
}

exports.signOut = async (ctx) => {
  ctx.session.user = null
  return success_cb({})
}
