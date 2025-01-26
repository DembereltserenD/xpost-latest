<template>
  <div class="container-custom py-4 pt-5">
    <div v-if="loading && !rates.length" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
    </div>
    
    <div v-else-if="error" class="p-4 bg-destructive/10 text-destructive rounded-lg">
      {{ error }}
    </div>
    
    <div v-else class="w-full max-w-full overflow-hidden">
      <!-- Currency Converter -->
      <div class="bg-card text-card-foreground rounded-lg mb-6 shadow-sm">
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-4">Ханш хөрвүүлэгч</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-muted-foreground mb-2">Хөрвүүлэх дүн</label>
              <input 
                type="number" 
                v-model="amount" 
                class="w-full p-2 rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-muted-foreground mb-2">Валют сонгох</label>
              <select 
                v-model="selectedCurrency" 
                class="w-full p-2 rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option v-for="rate in rates" :key="rate.code" :value="rate">
                  {{ rate.code }} - {{ getCurrencyName(rate.code) }}
                </option>
              </select>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-sm font-medium text-muted-foreground">Хөрвүүлсэн дүн</div>
            <div class="text-2xl font-bold break-all">
              {{ formatNumber(convertedAmount) }} ₮
            </div>
            <div v-if="selectedCurrency" class="text-sm text-muted-foreground mt-1">
              1 {{ selectedCurrency.code }} = {{ formatNumber(selectedCurrency.rate_float) }} ₮
            </div>
          </div>
        </div>
      </div>

      <!-- Exchange Rates List -->
      <div class="bg-card text-card-foreground rounded-lg shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <template v-for="rate in displayedRates" :key="rate.code">
            <div class="p-4 hover:bg-muted/50 transition-colors">
              <div class="flex justify-between items-start gap-2">
                <div class="min-w-0">
                  <div class="text-lg font-medium truncate">{{ rate.code }}</div>
                  <div class="text-sm text-muted-foreground truncate">{{ getCurrencyName(rate.code) }}</div>
                </div>
                <div class="text-right shrink-0">
                  <div class="text-lg font-bold">{{ formatNumber(rate.rate_float) }}</div>
                  <div class="text-xs text-muted-foreground">{{ formatDate(rate.last_date) }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
        
        <!-- Load More Button (Mobile Only) -->
        <div 
          v-if="hasMoreRates" 
          class="p-4 text-center border-t border-border"
          :class="{ 'opacity-50 pointer-events-none': loadingMore }"
        >
          <button 
            @click="loadMore" 
            class="w-full px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
          >
            <span v-if="loadingMore">Уншиж байна...</span>
            <span v-else>Цааш үзэх</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

definePageMeta({
  ssr: false  // Enable CSR for real-time exchange rates
})

const rates = ref([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref(null)
const amount = ref(1)
const selectedCurrency = ref(null)
const itemsPerPage = ref(6)
const currentPage = ref(1)
const isMobile = ref(false)

const displayedRates = computed(() => {
  if (!isMobile.value) {
    return rates.value
  }
  const endIndex = currentPage.value * itemsPerPage.value
  return rates.value.slice(0, endIndex)
})

const hasMoreRates = computed(() => {
  if (!isMobile.value) {
    return false
  }
  return displayedRates.value.length < rates.value.length
})

const loadMore = async () => {
  loadingMore.value = true
  await new Promise(resolve => setTimeout(resolve, 500)) // Add small delay for better UX
  currentPage.value++
  loadingMore.value = false
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('mn-MN', { 
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const currencyNames = {
  USD: 'АНУ-ын доллар',
  EUR: 'Евро',
  JPY: 'Японы иен',
  GBP: 'Английн фунт',
  RUB: 'ОХУ-ын рубль',
  CNY: 'БНХАУ-ын юань',
  KRW: 'БНСУ-ын вон',
  KPW: 'БНАСАУ-ын вон',
  CAD: 'Канадын доллар',
  AUD: 'Австралийн доллар',
  CZK: 'Чехийн крон',
  TWD: 'Тайванийн доллар',
  THB: 'Тайландын бат',
  IDR: 'Индонезийн рупи',
  MYR: 'Малайзын ринггит',
  SGD: 'Сингапурын доллар',
  AED: 'АНЭУ-ын дирхам',
  KWD: 'Кувейтийн динар',
  NZD: 'Шинэ Зеландын доллар',
  DKK: 'Данийн крон',
  PLN: 'Польшийн злот',
  UAH: 'Украины гривн',
  NOK: 'Норвегийн крон',
  NPR: 'Непалын рупи',
  ZAR: 'Өмнөд Африкийн ранд',
  TRY: 'Туркийн лира',
  VND: 'Вьетнамын донг',
  XAU: 'Алт /унцаар/',
  XAG: 'Мөнгө /унцаар/',
  SDR: 'Зээлжих тусгай эрх'
}

const convertedAmount = computed(() => {
  if (!selectedCurrency.value || !amount.value) return '0'
  return (amount.value * selectedCurrency.value.rate_float).toFixed(2)
})

const formatNumber = (value) => {
  if (!value) return '0.00'
  const parts = Number(value).toFixed(2).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

const getCurrencyName = (code) => {
  return currencyNames[code] || code
}

onMounted(async () => {
  // Check if mobile on mount
  isMobile.value = window.innerWidth < 640
  
  // Update on resize
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 640
  })

  loading.value = true
  error.value = null
  
  try {
    const currencies = Object.keys(currencyNames).join('|')
    const response = await fetch(`https://monxansh.appspot.com/xansh.json?currency=${currencies}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    rates.value = data
    if (data.length > 0) {
      selectedCurrency.value = data[0]
    }
  } catch (e) {
    console.error('Error fetching exchange rates:', e)
    error.value = 'Валютын ханш татахад алдаа гарлаа. Дахин оролдоно уу.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Ensure all content fits within viewport width */
:deep(*) {
  max-width: 100vw;
  word-wrap: break-word;
}

/* Hide number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
