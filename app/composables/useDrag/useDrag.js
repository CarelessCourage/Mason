import { dragger } from "."
import { onClient } from "../onClient"

//why doesnt this work
export function useDrag(options = o, z = '[data-dropzone]') {
  const fragElement = ref(null)
  onClient(() => dragger(fragElement.value, options, z))
  return fragElement
}