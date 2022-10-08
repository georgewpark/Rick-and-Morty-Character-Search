const debounce = (func, wait = 800) => {
  let timeout

  return function () {
    const context = this
    const args = arguments

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = null
      func.apply(context, args)
    }, wait)
  }
}

export default debounce