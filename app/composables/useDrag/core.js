//internal dependencies
import { zoneHit } from "./hitdetection"

//external dependencies
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable";


//initialize the draggable
let zones = []
const emptyFn = () => {}
const defaultOptions = {
  onDrag: emptyFn,
  onRelease: emptyFn,
  moveDelay: 600,
  moveDuration: 200,
  classTarget: false,
  zones: '[data-dropzone]'
}

export function useDragCore(el, opt) {
  gsap.registerPlugin(Draggable)
  const options = {...defaultOptions, ...opt}
  zones = document.querySelectorAll(options.zones)

  let cc = options.classTarget === String ? document.querySelectorAll(options.classTarget) : options.classTarget
  let classTarget = cc ? options.classTarget : el

  const instance = new Draggable(el, {
    ...options,
    onDrag: (event) => unpackDrag({instance, event}),
    onRelease: (event) => unpackRelease({instance, event}),
  })

  //unpack options and execute functions with all the possible arguments
  function unpackDrag(data) {
    const drag = options.onDrag
    const defaultFn = onDrag
    unpack(drag, defaultFn, data)
  }

  function unpackRelease(data) {
    const release = options.onRelease
    const defaultFn = onRelease
    unpack(release, defaultFn, data)
  }

  //checks if the passed option is a function or an object. 
  //if its an function it executes it. If its an object it 
  //assumes it has a hit and or miss property which should be 
  //fired instead
  function unpack(onFn, defaultFn, data) {
    checkDirectFunction(onFn, data)
    defaultFn(data, options)
  }

  function checkDirectFunction(onFn, data) {
    typeof onFn === 'function'
      ? onFn(data, options)
      : onFn?.on && onFn.on(data, options)
  }


  //land functions fire when the draggable is dropped
  function landMis(zone, opt) {
    zone.element.classList.remove("drag-hit");
    zone.element.classList.remove("land-hit");
    classTarget.classList.remove("drag-hit")
  }

  function landHit(zone, opt) {
    zone.element.classList.remove("drag-hit");
    classTarget.classList.remove("drag-hit")
    zone.element.classList.add("land-hit");
    classTarget.classList.add("landed")
    setTimeout(() => {
      classTarget.classList.remove("landed")
      zone.element.classList.remove("land-hit");
      classTarget.classList.add("returning")
      zone.element.classList.add("returning")
    }, opt.moveDelay)
    setTimeout(() => {
      classTarget.classList.remove("landed")
      zone.element.classList.remove("land-hit")
      classTarget.classList.remove("returning")
      zone.element.classList.remove("returning")
    }, opt.moveDelay + opt.moveDuration)
  }

  function landDud(z, opt) {
    classTarget.classList.remove("landed")
  }

  function dragHit(z, opt) {
    z.element.classList.add("drag-hit")
    classTarget.classList.add("drag-hit")
  }

  function dragMis(z, opt) {
    z.element.classList.remove("drag-hit")
    classTarget.classList.remove("drag-hit")
  }

  //utils for prop fallback
  function actions(opt) {
    return {
      hit: opt?.hit ? opt.hit : () => {},
      mis: opt?.mis ? opt.mis : () => {},
      dud: opt?.dud ? opt.dud : () => {},
    }
  }

  //functions to plug into the draggable
  function onDrag(data, opt) {
    const on = opt.onDrag
    const { hit, mis, dud } = actions(on)
    classTarget.classList.add("drag")
    zoneHit(el, zones, {
      hit: (z) => {dragHit(z, data); hit(z, el, data)},
      mis: (z) => {dragMis(z, data); mis(z, el, data)},
      dud: (z) => {dud(z, data)}
    })
  }

  function onRelease(data, opt) {
    const on = opt.onRelease
    const { hit, mis, dud } = actions(on)
    classTarget.classList.remove("drag")
    zoneHit(el, zones, {
      hit: (z) => {landHit(z, opt); hit(z, el, data)},
      mis: (z) => {landMis(z, opt); mis(z, el, data)},
      dud: (z) => {landDud(z, opt); dud(z, el, data)}
    })
  }

}