export function onClient(fn = () => {}) {
  onMounted(() => process.client && fn())
}