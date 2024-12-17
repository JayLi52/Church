import request from "@utils/request"

export async function GetUserInfo (param: any): Promise<any> {
  return await request('GET', `/getInfo`, {})
}
