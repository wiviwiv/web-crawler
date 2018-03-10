// 加载上次的爬虫位置
const fs = require('fs')
const path = require('path')
const request = require('request')

module.exports = function() {
  const file = path.join(__dirname, '../data/cursor.txt')
  let data = {}
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({}), 'utf-8')
  }
  try {
    data = fs.readFileSync(file, 'utf-8')
    data = JSON.parse(data)
  } catch (e) {
    data = {}
  }
  return data
}
