import { View, Text, Button } from '@tarojs/components'
import { shop } from '@/data/mock'
import './index.scss'

export default function ProfilePage() {
  return (
    <View className='container profile-page'>
      <View className='profile-card'>
        <View className='avatar'>客</View>
        <View>
          <View className='name'>微信用户</View>
          <View className='muted'>欢迎使用理发预约服务</View>
        </View>
      </View>

      <View className='section-title'>常用功能</View>
      <View className='card menu-card'>
        <View className='menu-row'><Text>我的预约</Text><Text>›</Text></View>
        <View className='menu-row'><Text>联系客服</Text><Text>{shop.phone}</Text></View>
        <View className='menu-row'><Text>门店地址</Text><Text>{shop.address}</Text></View>
      </View>

      <View className='section-title'>预约说明</View>
      <View className='card tips'>
        <View>1. 请提前 5 分钟到店签到。</View>
        <View>2. 如需取消，请至少提前 2 小时操作。</View>
        <View>3. MVP 阶段暂不接入微信支付，默认到店付款。</View>
      </View>
    </View>
  )
}
