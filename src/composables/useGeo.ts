/**
 * 用户地理信息获取 Composable
 * 直接从外部 API 获取用户地理信息，适用于纯静态部署
 */
import { ref, onMounted } from 'vue'
import { detectDevice } from '@/utils/device'

const GEO_API_URL = 'https://hongshi819-location.hf.space/'

export interface GeoInfo {
  ip: string
  locationDisplay: string
  ispDisplay: string
  country: { code: string; name: string } | null
  registered_country: { code: string; name: string } | null
  regions: string[]
  as: { number: number; name: string; info: string } | null
  location: { latitude: number; longitude: number } | null
  addr: string
  coordinatesDisplay: string
  asDisplay: string
}

function computeDisplayFields(data: Record<string, unknown>): {
  locationDisplay: string
  ispDisplay: string
  coordinatesDisplay: string
  asDisplay: string
} {
  const country = data.country as { code: string; name: string } | null
  const regions = data.regions as string[] | []
  const as = data.as as { number: number; name: string; info: string } | null
  const location = data.location as { latitude: number; longitude: number } | null

  return {
    locationDisplay: [
      country?.name,
      ...(regions || []),
    ].filter(Boolean).join(' ') || '未知',
    ispDisplay: as?.name || as?.info || '未知',
    coordinatesDisplay: location
      ? `${location.latitude}, ${location.longitude}`
      : '',
    asDisplay: as
      ? `AS${as.number} · ${as.info || as.name}`
      : '',
  }
}

async function fetchGeoInfo(): Promise<GeoInfo> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(GEO_API_URL, { signal: controller.signal })
    clearTimeout(timeoutId)
    const data = await res.json()
    const display = computeDisplayFields(data)

    return {
      ip: data.ip || '未知',
      as: data.as || null,
      addr: data.addr || '',
      location: data.location || null,
      country: data.country || null,
      registered_country: data.registered_country || null,
      regions: data.regions || [],
      ...display,
    }
  } catch {
    return {
      ip: '未知',
      as: null,
      addr: '',
      location: null,
      country: null,
      registered_country: null,
      regions: [],
      locationDisplay: '未知',
      ispDisplay: '未知',
      coordinatesDisplay: '',
      asDisplay: '',
    }
  }
}

export function useGeo() {
  const info = ref<GeoInfo | null>(null)
  const loading = ref(true)
  const deviceInfo = ref('')

  onMounted(async () => {
    deviceInfo.value = detectDevice()
    const geoInfo = await fetchGeoInfo()
    info.value = geoInfo
    loading.value = false
  })

  return { info, loading, deviceInfo }
}
