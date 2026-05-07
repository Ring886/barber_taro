import { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { appointments as mockAppointments } from '@/data/mock'
import { api, AppointmentDTO, DEV_OPENID } from '@/services/api'
import { go } from '@/utils/router'
import './index.scss'

interface AppointmentView {
  id: number
  service: string
  barber: string
  time: string
  status: string
}

function statusText(status: string) {
  const map: Record<string, string> = {
    PENDING: '待确认',
    CONFIRMED: '已确认',
    COMPLETED: '已完成',
    CANCELLED: '已取消',
    NO_SHOW: '爽约'
  }
  return map[status] || status
}

function adapt(item: AppointmentDTO): AppointmentView {
  return {
    id: item.id,
    service: item.serviceName,
    barber: item.barberName,
    time: `${item.appointmentDate} ${item.startTime}`,
    status: statusText(item.status)
  }
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentView[]>(mockAppointments)

  const load = () => {
    api.getMyAppointments(DEV_OPENID)
      .then(data => setAppointments(data.map(adapt)))
      .catch(() => {})
  }

  useEffect(load, [])
  useDidShow(load)

  const cancel = (id: number) => {
    api.cancelAppointment(id, DEV_OPENID)
      .then(load)
      .then(() => Taro.showToast({ title: '已取消', icon: 'success' }))
      .catch(() => Taro.showToast({ title: '取消失败', icon: 'none' }))
  }

  return (
    <View className='container appointments-page'>
      <View className='section-title'>我的预约</View>
      {appointments.map(item => (
        <View className='card appointment-card' key={item.id}>
          <View className='head'>
            <View className='service'>{item.service}</View>
            <View className={item.status === '已确认' ? 'status active' : 'status'}>{item.status}</View>
          </View>
          <View className='muted line'>理发师：{item.barber}</View>
          <View className='muted line'>到店时间：{item.time}</View>
          {item.status === '已确认' && <Button className='secondary-btn' onClick={() => cancel(item.id)}>取消预约</Button>}
        </View>
      ))}
      <Button className='primary-btn add-btn' onClick={() => go('/pages/services/index')}>再约一次</Button>
    </View>
  )
}
