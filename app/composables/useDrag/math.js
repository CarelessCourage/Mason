//takes two elements.boundingClientRect and returns 
//both the combined area of the two elements in pixels 
//and also the overlap between them in a percentage

export function areas(el1, el2) {
  //el1 rect area
  const ax = el1.left
  const ay = el1.top

  const bx = el1.right
  const by = el1.bottom

  const areaA = (bx - ax) * (by - ay)

  //el2 rect area
  const cx = el2.left
  const cy = el2.top

  const dx = el2.right
  const dy = el2.bottom

  const areaB = (dx - cx) * (dy - cy)

  //element overlap area
  function overlap() {
    let area = 0
    const width = Math.min(bx, dx) - Math.max(ax, cx)
    const height = Math.min(by, dy) - Math.max(ay, cy)
    Math.min(width, height) > 0 
      ? area = width * height 
      : area = 0
    return area
  }

  const areaC = overlap()
  return {
    combined: areaA + areaB - areaC,
    overlap: areaC/areaA * 100
  }
}