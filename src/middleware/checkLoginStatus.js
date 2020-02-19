module.exports = async (ctx, next) => {
  if (ctx.session.user) {
    await next()
  } else {
    ctx.error(401, '用户未登录')
  }
}
