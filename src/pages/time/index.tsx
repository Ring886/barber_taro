import { useEffect, useState } from 'react'
import { useLoad } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { timeSlots } from '@/data/mock'
import { api, SlotDTO } from '@/services/api'
import { getNextDates, DateOption } from '@/utils/date'
import { go } from '@/utils/router'
import './index.scss'

export default function TimePage() {
  const [serviceId, setServiceId] = useState(1)
  const [barberId, setBarberId] = useState(1)
  const [dates] = useState<DateOption[]>(getNextDates())
  const [selectedDate, setSelectedDate] = useState<DateOption>(getNextDates()[1])
  const [slots, setSlots] = useState<SlotDTO[]>([])
  const [selectedSlot, setSelectedSlot] = useState('')

  useLoad((query) => {
    setServiceId(Number(query.serviceId || 1))
    setBarberId(Number(query.barberId || 1))
  })

  useEffect(() => {
    api.getAvailableSlots(barberId, serviceId, selectedDate.apiDate)
      .then(data => {
        setSlots(data)
        const first = data.find(item => item.available)
        setSelectedSlot(first ? first.startTime : '')
      })
      .catch(() => {
        const fallback = timeSlots.flatMap(group => group.slots.map(slot => ({ startTime: slot, endTime: slot, available: true })))
        setSlots(fallback)
        setSelectedSlot(fallback[0]?.startTime || '')
      })
  }, [barberId, serviceId, selectedDate])

  const next = () => {
    if (!selectedSlot) return
    go(`/pages/confirm/index?serviceId=${serviceId}&barberId=${barberId}&date=${selectedDate.apiDate}&time=${selectedSlot}`)
  }

  return (
    <View className='container time-page'>
      <View className='section-title'>选择到店时间</View>
      <View className='date-row'>
        {dates.map((item) => (
          <View className={selectedDate.apiDate === item.apiDate ? 'date-card active' : 'date-card'} key={item.apiDate} onClick={() => setSelectedDate(item)}>
            <View className='date-label'>{item.label}</View>
            <View className='date-text'>{item.date}</View>
          </View>
        ))}
      </View>

      <View className='slot-group'>
        <View className='group-title'>可预约时间</View>
        <View className='slot-grid'>
          {slots.map((slot) => {
            const active = selectedSlot === slot.startTime
            return <View className={!slot.available ? 'slot disabled' : active ? 'slot active' : 'slot'} key={slot.startTime} onClick={() => slot.available && setSelectedSlot(slot.startTime)}>{slot.startTime}</View>
          })}
        </View>
      </View>

      <View className='bottom-bar'>
        <Button className='primary-btn' onClick={next}>下一步，确认预约</Button>
      </View>
    </View>
  )
}
