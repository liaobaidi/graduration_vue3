import Cookie from 'js-cookie'
export const useCookie = () => {
  const set = (key: string, value: string) => {
    let secure = /https/i.test(location.protocol)
    return Cookie.set(key, value, { secure, expires: 7 })
  }

  const get = (key: string) => {
    return Cookie.get(key)
  }

  const remove = (key: string) => {
    return Cookie.remove(key)
  }

  return {
    set,
    get,
    remove
  }
}
