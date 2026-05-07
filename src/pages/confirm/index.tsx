import { useEffect, useState } from 'react'
import Taro, { useLoad } from '@tarojs/taro'
import { View, Text, Input, Textarea, Button } from '@tarojs/components'
import { api, BarberDTO, DEV_OPENID, ServiceDTO } from '@/services/api'
import './index.scss'

export default function ConfirmPage() {
  const [serviceId, setServiceId] = useState(1)
  const [barberId, setBarberId] = useState(1)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [service, setService] = useState<ServiceDTO | null>(null)
  const [barber, setBarber] = useState<BarberDTO | null>(null)
  const [customerName, setCustomerName] = useState('体验用户')
  const [customerPhone, setCustomerPhone] = useState('13800000000')
  const [remark, setRemark] = useState('')

  useLoad((query) => {
    setServiceId(Number(query.serviceId || 1))
    setBarberId(Number(query.barberId || 1))
    setDate(String(query.date || ''))
    setTime(String(query.time || ''))
  })

  useEffect(() => {
    api.getServices().then(list => setService(list.find(item => item.id === serviceId) || list[0])).catch(() => {})
    api.getBarber(barberId).then(setBarber).catch(() => {})
  }, [serviceId, barberId])

  const submit = () => {
    if (!date || !time) {
      Taro.showToast({ title: '请选择预约时间', icon: 'none' })
      return
    }
    api.createAppointment({
      openid: DEV_OPENID,
      shopId: 1,
      barberId,
      serviceId,
      appointmentDate: date,
      startTime: time,
      customerName,
      customerPhone,
      remark
    }).then(() => {
      Taro.showToast({ title: '预约已提交', icon: 'success' })
      setTimeout(() => Taro.switchTab({ url: '/pages/appointments/index' }), 600)
    }).catch((error) => {
      Taro.showModal({ title: '预约失败', content: error?.message || '请稍后重试', showCancel: false })
    })
  }

  return (
    <View className='container confirm-page'>
      <View className='section-title'>确认预约信息</View>
      <View className='card summary'>
        <View className='row'><Text>服务</Text><Text>{service?.name || '男士精剪'}</Text></View>
        <View className='row'><Text>理发师</Text><Text>{barber?.name || '阿泽'}</Text></View>
        <View className='row'><Text>时间</Text><Text>{date} {time}</Text></View>
        <View className='row'><Text>预计时长</Text><Text>{service?.durationMinutes || 45} 分钟</Text></View>
        <View className='row total'><Text>价格</Text><Text>¥{service?.price || 88}</Text></View>
      </View>

      <View className='section-title'>联系人</View>
      <View className='card form-card'>
        <Input className='input' value={customerName} placeholder='请输入姓名' onInput={(event) => setCustomerName(String(event.detail.value))} />
        <Input className='input' value={customerPhone} placeholder='请输入手机号' type='number' onInput={(event) => setCustomerPhone(String(event.detail.value))} />
        <Textarea className='textarea' value={remark} placeholder='备注，例如发型偏好、是否赶时间等' onInput={(event) => setRemark(String(event.detail.value))} />
      </View>

      <Button className='primary-btn submit' onClick={submit}>提交预约</Button>
    </View>
  )
}
