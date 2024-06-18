export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('poked', {
    mounted (el, binding) {
      const press = ref(false)

      el.addEventListener('mousedown', () => {
        press.value = true
        setTimeout(() => {
          press.value = false
        }, 100)
      })

      el.addEventListener('mouseup', () => {
        if(press.value) {
          binding.value(el)
        }
      })

    },
    unmounted (el) {
      el.removeEventListener('mousedown');
      el.removeEventListener('mouseup');
  }
  })
})