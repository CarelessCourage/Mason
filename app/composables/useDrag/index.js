//internal dependencies
import { useDragCore } from "./core"

//external dependencies
import { gsap } from "gsap"
import { Flip } from "gsap/Flip";

//initialize the draggable
const emptyFn = () => {}
const defaultOptions = {
  onDrag: emptyFn,
  onRelease: emptyFn,
  moveDelay: 600,
  moveDuration: 500,
}

export function useDrag(el, opt) {
  gsap.registerPlugin(Flip)
  const options = {...defaultOptions, ...opt}

  useDragCore(el, {
    ...options,
    onRelease: {
      hit: (zone, element, data) => landHit(zone, element, data),
      dud: (zone, element, data) => landDud(zone, element, data),
    }
  })

  //Functions for moving the element
  function landHit(zone, element, data) {
    data.instance.disable()
    setTimeout(() => passedHit(zone, element, data), options.moveDelay)
    safeFit(element, zone.element, {onDone: () => {
      data.instance.enable()
      resetTransform(element)
    }})
  }

  function passedHit(zone, element, data) {
    const ph = options.onRelease.hit
    ph && ph(zone, element, data)
  }

  function landDud(zone, element, data) {
    const passedDud = options.onRelease.dud
    const snapback = options?.snapback ? options.snapback : true
    snapback && resetTransform(element);
    passedDud && passedDud(zone, element, data)
  }

  //Utility functions for moving the element
  function safeFit(el, target, {onDone = emptyFn}) {
    force(() => fitEl(el, target), {
      delay: options.moveDelay, 
      onDone: () => setTimeout(() => onDone(), options.moveDelay)
    })
  }

  function force(repeat, options) {
    let active = true
    function repeatUntil(delay) {
      repeat()
      delay && setTimeout(() => (active = false), delay)
      active
        ? requestAnimationFrame(repeatUntil)
        : options.onDone()
    }
    repeatUntil(options.delay)
  }

  function fitEl(el, zone) {
    Flip.fit(el, zone, {
      duration: options.moveDuration / 1000,
    })
  }

  function resetTransform(el, duration = options.moveDuration / 1000) {
    gsap.to(el, {duration: duration, x:0, y:0})
  }

}