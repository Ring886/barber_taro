import { useEffect, useState } from 'react'
import { View, Button } from '@tarojs/components'
import { shop as mockShop, services as mockServices, barbers as mockBarbers } from '@/data/mock'
import { api, BarberDTO, ServiceDTO, ShopDTO } from '@/services/api'
import { go } from '@/utils/router'
import './index.scss'

function adaptService(item: ServiceDTO) {
  return { id: item.id, name: item.name, desc: item.description, price: item.price, duration: item.durationMinutes, tag: '推荐' }
}

function adaptBarber(item: BarberDTO) {
  return { id: item.id, name: item.name, title: item.title, score: '4.9', specialty: item.specialties }
}

export default function HomePage() {
  const [shop, setShop] = useState<ShopDTO | typeof mockShop>(mockShop)
  const [services, setServices] = useState(mockServices)
  const [barbers, setBarbers] = useState(mockBarbers)

  useEffect(() => {
    Promise.all([api.getShop(), api.getServices(), api.getBarbers()])
      .then(([shopData, serviceData, barberData]) => {
        setShop(shopData)
        setServices(serviceData.map(adaptService))
        setBarbers(barberData.map(item => ({ ...adaptBarber(item), exp: '', available: true })))
      })
      .catch(() => {})
  }, [])

  const hours = 'hours' in shop ? shop.hours : `${shop.openingTime} - ${shop.closingTime}`
  const slogan = 'slogan' in shop ? shop.slogan : '预约制精品理发，不排队更从容'
  const notice = 'notice' in shop ? shop.notice : shop.description

  return (
    <View className='container home-page'>
      <View className='hero'>
        <View className='hero-label'>BARBER BOOKING</View>
        <View className='hero-title'>{shop.name}</View>
        <View className='hero-slogan'>{slogan}</View>
        <View className='hero-meta'>营业时间 {hours}</View>
        <Button className='primary-btn hero-btn' onClick={() => go('/pages/services/index')}>立即预约</Button>
      </View>

      <View className='card shop-card'>
        <View className='shop-row'><View className='shop-key'>地址</View><View className='shop-value'>{shop.address}</View></View>
        <View className='shop-row'><View className='shop-key'>电话</View><View className='shop-value'>{shop.phone}</View></View>
        <View className='notice'>{notice}</View>
      </View>

      <View className='section-title'>热门服务</View>
      <View className='service-grid'>
        {services.slice(0, 2).map(item => (
          <View className='service-card' key={item.id} onClick={() => go('/pages/services/index')}>
            <View className='service-tag'>{item.tag}</View>
            <View className='service-name'>{item.name}</View>
            <View className='muted'>{item.duration} 分钟</View>
            <View className='service-price'>¥{item.price}</View>
          </View>
        ))}
      </View>

      <View className='section-title'>推荐理发师</View>
      <View className='barber-list'>
        {barbers.slice(0, 2).map(item => (
          <View className='barber-card' key={item.id} onClick={() => go('/pages/barbers/index')}>
            <View className='avatar'>{item.name.slice(0, 1)}</View>
            <View className='barber-info'>
              <View className='barber-name'>{item.name} · {item.title}</View>
              <View className='muted'>{item.specialty}</View>
            </View>
            <View className='score'>{item.score}</View>
          </View>
        ))}
      </View>
    </View>
  )
}
