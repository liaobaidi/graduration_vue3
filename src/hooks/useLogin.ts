import { LoginFormDataType } from '../views/Login'
import { useCookie } from './useCookie'
import store from '/@/store/index'

const cookie = useCookie()

export default (loginInfo: Partial<LoginFormDataType>, rem: Boolean) => {
	return new Promise((resolve) => {
    if (rem) {
      // 记住我
      cookie.set('ACCOUNT', loginInfo.account!)
      cookie.set('PSW', loginInfo.psw!)
    } else {
      cookie.remove('ACCOUNT')
      cookie.remove('PSW')
    }
    store.dispatch('login', loginInfo).then((res) => {
      resolve(res)
    })
  })
}
