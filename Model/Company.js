const mongoose = require('./db')

const CompanySchema = new mongoose.Schema({
  overdue: String,
  is_yun: String,
  career_state: String,
  sort_time: String,
  career_talk_id: String,
  company_id: String,
  company_name: String,
  logo: String,
  hotcount: String,
  professionals: String,
  career_type: String,
  company_review: String,
  company_property: String,
  industry_category: String,
  city_name: String,
  meet_name: String,
  meet_time: String,
  school_name: String,
  address: String,
  room: String,
  view_count: String,
  is_recommend: String,
  recommend_time: String,
  meet_day: String,
  url: String,
}, {
  collection: 'Company',
  timestamps: true,
})

module.exports = mongoose.model('Company', CompanySchema)
