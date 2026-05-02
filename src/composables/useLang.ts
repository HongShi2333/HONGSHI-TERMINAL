/**
 * 语言切换 Composable
 * 提供国际化翻译和语言切换功能
 */
import { ref, computed, provide, inject, type InjectionKey } from 'vue'
import i18nConfig, { type Lang, translations } from '@/config/i18n'

const langKey: InjectionKey<ReturnType<typeof createLang>> = Symbol('lang')

function createLang() {
  const lang = ref<Lang>(i18nConfig.defaultLang)

  const t = (key: string): string => {
    return translations[lang.value]?.[key] || translations[i18nConfig.defaultLang]?.[key] || key
  }

  const toggleLang = () => {
    const currentIndex = i18nConfig.supportedLangs.indexOf(lang.value)
    const nextIndex = (currentIndex + 1) % i18nConfig.supportedLangs.length
    lang.value = i18nConfig.supportedLangs[nextIndex]
  }

  const setLang = (newLang: Lang) => {
    lang.value = newLang
  }

  const langLabel = computed(() => i18nConfig.langLabels[lang.value])

  return { lang, t, toggleLang, setLang, langLabel }
}

export function provideLang() {
  const langCtx = createLang()
  provide(langKey, langCtx)
  return langCtx
}

export function useLang() {
  const langCtx = inject(langKey)
  if (!langCtx) {
    throw new Error('useLang must be used after provideLang')
  }
  return langCtx
}
