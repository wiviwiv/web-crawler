const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

// 日期格式化
const formater = require('./lib/loadDate')
// 加载配置文件
const config = require('./lib/loadCursor')()

const KMUST = {
  url: 'http://kmlg.bibibi.net/module/careers', // 基本页面
  range: [config.last || '2017-10-9', formater()], // 时间范围
  getCount: 'http://kmlg.bibibi.net/module/getcareers?is_total=1&start=0&count=0&keyword=&type=inner&day=!#!date!#!',
  getList: 'http://kmlg.bibibi.net/module/getcareers?start_page=1&keyword=&type=inner&day=!#!date!#!&count=15&start=1',
  getDetail: 'http://kmlg.bibibi.net/detail/career?id=!#!career_talk_id!#!'
}
const YNU = 'http://jobs.ynu.edu.cn/'
let list = []

function loadData(date, url) {
  if (!date) {
    throw new Error('爬取日期不能为空')
  }
  let _url = url || KMUST.getCount.replace('!#!date!#!', date)
  // 加载数量
  request.get(_url, (err, response, body) => {
    // 数量 > 0
    if (!err && body > 0) {
      // 加载当天的列表
      _url = KMUST.getList.replace('!#!date!#!', date)
      request.get(_url, (err, response, body) => {
        if (!err && body) {
          const schoolList = JSON.parse(body)
          // 循环当前列表
          schoolList.data.forEach((item) => {
            let single = item
            // 读取详细信息
            _url = KMUST.getDetail.replace('!#!career_talk_id!#!', item.career_talk_id)
            single.url = _url
            console.log('完成:  ', single.company_name)
            list.push(single)
          })
        }
      })
    } else {
      return 0
    }
  })
}

// 这里传入日期
const date = '2017-10-30'
loadData(date)
console.log('请等待30s ...')

setTimeout(() => {
  fs.writeFileSync(`${date}.json`, JSON.stringify(list), 'utf-8')
  console.log(`全部完成: 抓取到 ${list.length} 个数据 保存到${date}.json`)
}, 30 * 1000)