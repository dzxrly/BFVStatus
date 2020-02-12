function httpGet (params, onSuccess, onFailed, onTimeOut, time) {
  let xhr = new XMLHttpRequest()
  if (params.data) {
    params.url += ('?' + params.data)
  }
  xhr.onload = e => {
    console.log(xhr.status)
    if (xhr.status === 200) {
      onSuccess(xhr.response)
    } else {
      // eslint-disable-next-line no-unused-expressions
      onFailed()
    }
  }
  xhr.onerror = e => {
    // eslint-disable-next-line no-unused-expressions
    onFailed()
  }
  xhr.ontimeout = e => {
    // eslint-disable-next-line no-unused-expressions
    onTimeOut()
  }
  xhr.timeout = time
  xhr.open('get', params.url)
  xhr.send()
}
export {
  httpGet
}
