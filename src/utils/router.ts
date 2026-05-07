import Taro from '@tarojs/taro'

export function go(url: string) {
  Taro.navigateTo({ url })
}

export function switchTab(url: string) {
  Taro.switchTab({ url })
}
