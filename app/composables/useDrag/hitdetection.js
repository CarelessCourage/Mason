//internal dependencies
import { areas } from "./math"

//sorts all zones into an array of hits and another of misses 
//depending on whether the element is overlapping with the zone
function hitOrMiss(el, zones) {
  const elRect = el.getBoundingClientRect()
  const hits = []
  const miss = []

  zones.forEach((element) => {
    const zoneRect = element.getBoundingClientRect()
    const { overlap } = areas(elRect, zoneRect)
    overlap > 0 
      ? hits.push({element, overlap})
      : miss.push({element, overlap})
  })

  const hitsByOverlap = hits.sort((a, b) => b.overlap - a.overlap)
  return {
    hits: hitsByOverlap,
    miss
  }
}

//pases the hit element with the greatest overlap to the hit callback
//all the other zones are passed to one mis callback for each miss
//if all zones are missed, the dud callback is called with the element as a prop
const fn = () => {}

export function zoneHit(el, zones, {hit = fn, mis = fn, dud = fn}) {
  const { hits, miss } = hitOrMiss(el, zones)
  
  function onHit() {
    hits.length && hit(hits[0], el)
  }
  
  miss.forEach((zone) => {
    mis(zone, el)
  })

  if(hits.length > 1) {
    hits.forEach((zone, i) => {
      i > 0 && mis(zone, el)
  })}

  hits.length === 0 
    ? dud(el)
    : onHit()
}