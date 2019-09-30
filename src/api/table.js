import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/yanghua_edu/api/banner_img/banner_img/",
    method: "get",
    params
  });
}
// 图片上传地址
export function updataImg(data) {
  return request({
    url: "/yanghua_edu/api/banner_img/file_or_img/",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
}
// 修改地址
export function changeList(data) {
  return request({
    url: "/yanghua_edu/api/banner_img/banner_img/",
    method: "put",
    // headers: { "Content-Type": "multipart/form-data" },
    data
  });
}
// 新增轮播图
export function addList(data) {
  return request({
    url: "/yanghua_edu/api/banner_img/banner_img/",
    method: "post",
    // headers: { "Content-Type": "multipart/form-data" },
    data
  });
}
// 删除图片
export function deleteImg(data) {
  return request({
    url: "/yanghua_edu/api/banner_img/banner_img/",
    method: "delete",
    // headers: { "Content-Type": "multipart/form-data" },
    data
  });
}

// 获取数据
export function getMsg(methods, url, data) {
  return request({
    url: url,
    method: methods,
    data
  });
}
