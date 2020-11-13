const dragable = {
  inserted: (el, binding) => {
    let triggerDom = document.querySelector(binding.value.trigger)
    triggerDom.style.cursor = 'move'
    let bodyDom = document.querySelector(binding.value.body)
    let pageX = 0
    let pageY = 0
    let canMove = false
    const handleMousedown = e => {
      e.preventDefault() // 移动时禁用默认事件

      // 鼠标相对元素的位置
      pageX = e.clientX - el.offsetLeft
      pageY = e.clientY - el.offsetTop
      canMove = true
    }
    const handleMousemove = e => {
      let leftBox = e.clientX - pageX
      let topBox = e.clientY - pageY
      // 设置边界
      if (leftBox < 0) {
        leftBox = 0
      }
      let maxLeft = window.innerWidth - el.offsetWidth;
      if (leftBox > maxLeft) {
        leftBox = maxLeft;
      }

      if (topBox < 0) {
        topBox = 0
      }
      let maxTop = window.innerHeight - el.offsetHeight;
      if (topBox > maxTop) {
        topBox = maxTop;
      }


      if (canMove) bodyDom.style.left = leftBox + 'px'
      if (canMove) bodyDom.style.top = topBox + 'px'

    }
    const handleMouseup = () => {
      canMove = false
    }
    triggerDom.addEventListener('mousedown', handleMousedown);
    document.addEventListener('mousemove', handleMousemove);
    document.addEventListener('mouseup', handleMouseup);
  },
  update: (el, binding) => {
    if (!binding.value.recover) return
    let bodyDom = document.querySelector(binding.value.body)
    bodyDom.style.transform = ''
  }
}

export default dragable