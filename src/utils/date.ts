export interface DateOption {
  label: string
  date: string
  apiDate: string
}

const weekLabels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

function pad(value: number) {
  return value < 10 ? `0${value}` : `${value}`
}

export function formatApiDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function formatShortDate(date: Date) {
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function getNextDates(count = 5): DateOption[] {
  return Array.from({ length: count }).map((_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return {
      label: index === 0 ? '今天' : index === 1 ? '明天' : weekLabels[date.getDay()],
      date: formatShortDate(date),
      apiDate: formatApiDate(date)
    }
  })
}
