export const shop = {
  name: '拾光男士理发馆',
  slogan: '预约制精品理发，不排队更从容',
  address: '上海市静安区南京西路 888 号 2F',
  phone: '021-88886666',
  hours: '10:00 - 21:00',
  notice: '到店请提前 5 分钟签到，如需取消请至少提前 2 小时操作。'
}

export const services = [
  { id: 1, name: '男士精剪', desc: '适合日常清爽造型，含洗吹', price: 88, duration: 45, tag: '人气' },
  { id: 2, name: '总监设计剪', desc: '根据脸型和职业风格定制', price: 168, duration: 60, tag: '推荐' },
  { id: 3, name: '烫发造型', desc: '纹理烫、韩式微分等造型', price: 398, duration: 150, tag: '进阶' },
  { id: 4, name: '染发护理', desc: '低刺激染发，含基础护理', price: 328, duration: 120, tag: '护理' }
]

export const barbers = [
  { id: 1, name: '阿泽', title: '首席理发师', score: '4.9', exp: '8 年经验', specialty: '男士短发 / 油头 / 商务造型', available: true },
  { id: 2, name: 'Kevin', title: '高级理发师', score: '4.8', exp: '6 年经验', specialty: '韩式纹理 / 微分碎盖 / 烫发', available: true },
  { id: 3, name: 'Leo', title: '造型总监', score: '5.0', exp: '10 年经验', specialty: '形象设计 / 长短发改造', available: false }
]

export const dates = [
  { label: '今天', date: '05-05' },
  { label: '明天', date: '05-06' },
  { label: '周四', date: '05-07' },
  { label: '周五', date: '05-08' },
  { label: '周六', date: '05-09' }
]

export const timeSlots = [
  { period: '上午', slots: ['10:00', '10:45', '11:30'] },
  { period: '下午', slots: ['13:00', '13:45', '14:30', '15:15', '16:00', '16:45'] },
  { period: '晚上', slots: ['18:30', '19:15', '20:00'] }
]

export const appointments = [
  { id: 1, service: '男士精剪', barber: '阿泽', time: '05-06 14:30', status: '已确认' },
  { id: 2, service: '总监设计剪', barber: 'Leo', time: '04-28 19:15', status: '已完成' }
]
