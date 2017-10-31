// 日期格式化
const dateformat = require('dateformat')

module.exports = function(date) {
  return dateformat(date || new Date(), 'yyyy-mm-dd')
}
