const debounce = (func: any, wait = 800) => {
  let timeout: any

  return function () {
    const context = this: any
    const args = arguments

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = null
      func.apply(context, args)
    }, wait)
  }
}

export default debounce