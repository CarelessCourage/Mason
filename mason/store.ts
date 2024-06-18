import { type Component } from "vue"

import FragProfile from '~/components/frag/profile.vue'
import FragSubject from '~/components/frag/subject.vue'
import TypeSection from '~/components/type/section.vue'
import FragBanner from '~/components/frag/banner.vue'

export const fragments = {
  profile: FragProfile,
  subject: FragSubject,
  section: TypeSection,
  banner: FragBanner
}

export interface MasonType {
  [key: string]: {[key: string]: Component}
}

export const mason = reactive<MasonType>({})

watch(mason, () => {
  console.log('mason changed', mason)
})
