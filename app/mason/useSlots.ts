import { type Component } from "vue"
import { mason, fragments } from "~/mason/store"

const defaultSlots = {
  banner: fragments.banner, 
  subject: fragments.subject, 
  section: fragments.section
}

interface SlotType {
  name: string,
  slots: {[key: string]: Component}
}

export function useSlots(name = 'BlockCard'): SlotType {
  mason[name] = defaultSlots
  return {name, slots: mason[name]}
}
