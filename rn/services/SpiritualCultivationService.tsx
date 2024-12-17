import request from "@utils/request"

export async function GetAllSpiritualCultivation (param: any): Promise<any> {
  return await request('GET', '/biz/volumeExt/allList', {
    partId: param.partId
  })
}
