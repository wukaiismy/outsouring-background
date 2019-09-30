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
    // headers: { "Content-Type": "multipart/form-data" },
    data
  });
}
// 删除
export function delNews(url, data) {
  return request({
    url: url,
    method: "delete",
    data
  });
}
// 查看客服合作记录/标记申请合作的客户记录：（已联系）
export function showCm(URL) {
  return request({
    url: URL,
    method: "get"
  });
}
export function markCm(URL, data) {
  return request({
    url: URL,
    method: "put",
    data
  });
}
//编辑客户申请记录：（意向）
export function editCm(med, url, data) {
  return request({
    url: url,
    method: med,
    data
  });
}
