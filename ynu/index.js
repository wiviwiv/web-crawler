// 引入
const request = require('request')
const cheerio = require('cheerio')

const YNU = require('../Model/YNUCompany')

const page = {
  count: 3000,
  currentPage: 1,
  host: 'http://jobs.ynu.edu.cn/',
}
const url = `http://jobs.ynu.edu.cn/zczplist.jsp?urltype=tree.TreeTempUrl&wbtreeid=1092&reqformCountNo=${page.count}&reqformNOWPAGE=${page.currentPage}`

let iiii = []

function start() {
  request.get(url, (err, response, body) => {
    if (err) {
      console.error('错误：', err)
      return false
    }
    let $ = cheerio.load(body)
    // a
    let data = $('#alternatecolor tr td a')

    let i = 0

    loadContent()
    function loadContent() {
      let _url = page.host + data.eq(i).attr('href')
      console.log(_url)
      request.get(_url,
        (err, res, body) => {
          if (err) {
            console.error('err', err)
            return false
          }

          let company = {
            name: '',
            date: '',
            address: '',
            zhuanye: [],
            info: _url,
          }
          let $ = cheerio.load(body)
          let data = $('table tr')
          // 拿到并去空格
          company.name = data.eq(0).text().replace(/[\n\s企业名称：]/g, '')
          let info = data.eq(2).text().replace(/[\s\t\n]/g, '')
                         .split('招聘地点：')
          company.address = info[1]
          let _date = info[0].replace('招聘会时间：', '')
          company.date = _date.slice(0, 10) + ' ' + _date.slice(10, 15)
          company.zhuanye = data.eq(3).text().replace(/[\n\s招聘专业：]/g, '').split(',')
          iiii.push(company)
          YNU.findOne({ name: company.name })
             .exec((err, doc) => {
               if (doc) {
                 YNU.remove({ name: company.name }, (err, doc) => {
                   YNU.create(company, (err, doc) => {
                     if (!err) {
                       console.log(doc.name, 'new at ', doc._id)
                     }
                   })
                 })
               } else {
                 YNU.create(company, (err, doc) => {
                   if (!err) {
                     console.log(doc.name, 'is save at ', doc._id)
                   }
                 })
               }
             })
        },
      )

      if (i < data.length) {
        setTimeout(loadContent, 200)
        i++
      }
    }
  })
}

start()
setTimeout(() => {
  process.exit(0)
}, 600 * 1000)