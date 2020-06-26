export default ref => {
   const {
      current: { scrollHeight, clientHeight, offsetHeight },
   } = ref
   const increaseHeight = offsetHeight - clientHeight

   if (scrollHeight - clientHeight > 0)
      ref.current.style.height = `${scrollHeight + increaseHeight}px`
}
