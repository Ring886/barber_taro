import Taro from '@tarojs/taro'

const DEFAULT_BASE_URL = 'https://www.ringsora.com/barber'

export const API_BASE_URL = DEFAULT_BASE_URL
export const DEV_OPENID = 'dev-openid'

function buildUrl(path: string, query?: Record<string, string | number | undefined | null>) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const pairs = Object.entries(query || {})
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  return `${API_BASE_URL}${normalizedPath}${pairs.length ? `?${pairs.join('&')}` : ''}`
}

async function request<T>(path: string, options: {
  method?: 'GET' | 'POST'
  query?: Record<string, string | number | undefined | null>
  data?: unknown
} = {}): Promise<T> {
  const response = await Taro.request<T>({
    url: buildUrl(path, options.query),
    method: options.method || 'GET',
    data: options.data,
    timeout: 5000,
    header: {
      'content-type': 'application/json'
    }
  })
  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(`API ${path} failed: ${response.statusCode}`)
  }
  return response.data
}

export interface ShopDTO {
  id: number
  name: string
  address: string
  phone: string
  description: string
  openingTime: string
  closingTime: string
  status: string
}

export interface ServiceDTO {
  id: number
  shopId: number
  name: string
  description: string
  priceCents: number
  price: number
  durationMinutes: number
  imageUrl?: string | null
  status: string
  sortOrder: number
}

export interface BarberDTO {
  id: number
  shopId: number
  name: string
  avatarUrl?: string | null
  title: string
  description: string
  specialties: string
  status: string
  sortOrder: number
}

export interface SlotDTO {
  startTime: string
  endTime: string
  available: boolean
}

export interface AppointmentDTO {
  id: number
  appointmentNo: string
  shopId: number
  shopName: string
  barberId: number
  barberName: string
  serviceId: number
  serviceName: string
  priceCents: number
  price: number
  appointmentDate: string
  startTime: string
  endTime: string
  status: string
  customerName: string
  customerPhone: string
  remark?: string | null
  cancelReason?: string | null
}

export interface CreateAppointmentPayload {
  openid: string
  shopId: number
  barberId: number
  serviceId: number
  appointmentDate: string
  startTime: string
  customerName: string
  customerPhone: string
  remark?: string
}

export const api = {
  getShop: () => request<ShopDTO>('/shops/current'),
  getServices: (shopId = 1) => request<ServiceDTO[]>('/services', { query: { shopId } }),
  getBarbers: (shopId = 1) => request<BarberDTO[]>('/barbers', { query: { shopId } }),
  getBarber: (id: number) => request<BarberDTO>(`/barbers/${id}`),
  getAvailableSlots: (barberId: number, serviceId: number, date: string) => request<SlotDTO[]>('/appointments/available-slots', { query: { barberId, serviceId, date } }),
  createAppointment: (data: CreateAppointmentPayload) => request<AppointmentDTO>('/appointments', { method: 'POST', data }),
  getMyAppointments: (openid = DEV_OPENID) => request<AppointmentDTO[]>('/appointments/my', { query: { openid } }),
  cancelAppointment: (id: number, openid = DEV_OPENID, reason = '用户取消') => request<AppointmentDTO>(`/appointments/${id}/cancel`, { method: 'POST', query: { openid }, data: { reason } })
}
