import { observable, action } from 'mobx'
import { GetUserInfo } from '@services/BaseService'

// 模拟服务端验证逻辑
const verifyCodeWithServer: (code: string) => Promise<boolean> = async (code) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(code === '12345'); // 假设验证码是12345
    }, 1000);
  });
};

class GlobalStore {
  @observable accessor user = {
    name: '未命名'
  }

  @observable accessor isLoggedIn = true
  @observable accessor isLogIning = false

  @action async checkCode(code: string) {
    try {
      this.isLogIning = true
      const flag = await verifyCodeWithServer(code)
      // this.isLoggedIn = flag
      this.isLogIning = false
      return flag
    } catch (error) {
      console.log('error', error)
    }
  }

  @action async init(user: any) {
    try {
      const res = await GetUserInfo({})
      this.user = {
        name: res.user.nickName || '未登录'
      }
    } catch (e) {
      console.log('init error', e)
    }
  }

  @action reset() {
    this.user = {
      name: '未命名'
    }
  }

  @action changeLoginState(flag: boolean) {
    this.isLoggedIn = flag
  }
}

const globalStore = new GlobalStore()

export default globalStore