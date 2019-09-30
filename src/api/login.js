import request from "@/utils/request";

export function login(name, password) {
  const data = {
    name,
    password
  };
  console.log(data);
  return request({
    url: "/yanghua_edu/api/other_module/login/",
    method: "post",
    data
  });
}

export function getInfo(token) {
  return request({
    url: "/website/backstage/info",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/website/backstage/logout",
    method: "post"
  });
}
