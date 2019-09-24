import request from "@/utils/request";

export function getList(id) {
  return request({
    url: "/website/backstage/img_list/",
    method: "get",
    params: { id }
  });
}
// 修改轮播图
export function changeList(Url, data) {
  return request({
    url: Url,
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
}
