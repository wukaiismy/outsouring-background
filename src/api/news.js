import request from "@/utils/request";

export function getList(URL) {
  return request({
    url: URL,
    method: "get"
  });
}
// 添加新闻
export function addNews(URL, data) {
  return request({
    url: URL,
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
}
// 删除新闻
export function delNews(id) {
  return request({
    url: "/website/backstage/del_new/",
    method: "get",
    params: { id }
  });
}
// 查看客服合作记录/标记申请合作的客户记录：（已联系）
export function showCm(URL) {
  return request({
    url: URL,
    method: "get"
  });
}
export function markCm(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
//编辑客户申请记录：（意向）
export function editCm(data) {
  return request({
    url: "/website/backstage/edit_cm/",
    method: "POST",
    data
  });
}
