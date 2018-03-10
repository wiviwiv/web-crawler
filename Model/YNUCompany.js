const mongoose = require('./db')

const YNCCompanySchema = new mongoose.Schema({
  name: String,
  date: String,
  address: String,
  zhuanye: Array,
  info: String,
}, {
  collection: 'YNUCompany',
  timestamps: true,
})

module.exports = mongoose.model('YNUCompany', YNCCompanySchema)
