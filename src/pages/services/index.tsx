import { useEffect, useState } from 'react'
import { View, Button } from '@tarojs/components'
import { services as mockServices } from '@/data/mock'
import { api } from '@/services/api'
import { go } from '@/utils/router'
import './index.scss'

interface ServiceView {
  id: number
  name: string
  desc: string
  price: number
  duration: number
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceView[]>(mockServices.map(item => ({ id: item.id, name: item.name, desc: item.desc, price: item.price, duration: item.duration })))

  useEffect(() => {
    api.getServices()
      .then(data => setServices(data.map(item => ({ id: item.id, name: item.name, desc: item.description, price: item.price, duration: item.durationMinutes }))))
      .catch(() => {})
  }, [])

  return (
    <View className='container services-page'>
      <View className='section-title'>选择服务项目</View>
      <View className='muted intro'>先选择本次需要预约的理发服务，后续会按服务时长生成可预约时间段。</View>
      {services.map(item => (
        <View className='card service-item' key={item.id}>
          <View className='service-main'>
            <View>
              <View className='service-name'>{item.name}</View>
              <View className='muted service-desc'>{item.desc}</View>
              <View className='service-duration'>预计 {item.duration} 分钟</View>
            </View>
            <View className='service-price'>¥{item.price}</View>
          </View>
          <Button className='secondary-btn' onClick={() => go(`/pages/barbers/index?serviceId=${item.id}`)}>选择该服务</Button>
        </View>
      ))}
    </View>
  )
}
