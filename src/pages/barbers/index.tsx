import { useEffect, useState } from 'react'
import Taro, { useLoad } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { barbers as mockBarbers } from '@/data/mock'
import { api } from '@/services/api'
import { go } from '@/utils/router'
import './index.scss'

interface BarberView {
  id: number
  name: string
  title: string
  exp: string
  specialty: string
  score: string
  available: boolean
}

export default function BarbersPage() {
  const [serviceId, setServiceId] = useState(1)
  const [barbers, setBarbers] = useState<BarberView[]>(mockBarbers)

  useLoad((query) => {
    setServiceId(Number(query.serviceId || 1))
  })

  useEffect(() => {
    api.getBarbers()
      .then(data => setBarbers(data.map(item => ({ id: item.id, name: item.name, title: item.title, exp: '', specialty: item.specialties, score: '4.9', available: true }))))
      .catch(() => {})
  }, [])

  const choose = (barber: BarberView) => {
    if (!barber.available) {
      Taro.showToast({ title: '该理发师今日约满', icon: 'none' })
      return
    }
    go(`/pages/time/index?serviceId=${serviceId}&barberId=${barber.id}`)
  }

  return (
    <View className='container barbers-page'>
      <View className='section-title'>选择理发师</View>
      <View className='muted intro'>MVP 版本先支持指定理发师预约，后续可增加“到店随机安排”。</View>
      {barbers.map(item => (
        <View className='card barber-item' key={item.id}>
          <View className='top'>
            <View className='avatar'>{item.name.slice(0, 1)}</View>
            <View className='info'>
              <View className='name'>{item.name}</View>
              <View className='title'>{item.title}{item.exp ? ` · ${item.exp}` : ''}</View>
              <View className='muted specialty'>{item.specialty}</View>
            </View>
            <View className='score'>{item.score}</View>
          </View>
          <Button className={item.available ? 'secondary-btn' : 'disabled-btn'} disabled={!item.available} onClick={() => choose(item)}>
            {item.available ? '选择该理发师' : '今日约满'}
          </Button>
        </View>
      ))}
    </View>
  )
}
