/*
 * @Description: 登录接口
 * @Date: 2023-12-23 19:24:30
 */
//登录接口
import myAxios from "@/utils/myAxios.js";

/*
 * 小程序获取所有文章类型
 * */
export function articleTypeList(data) {
  return myAxios.requestYL({
    url: "sc/article/getArticleTypeList",
    method: "get",
    data,
  });
}

/*
 * 小程序文章分页
 * */
export function articlePage(data) {
  return myAxios.requestYL({
    url: "sc/article/page",
    method: "post",
    data,
  });
}

/*
 * 小程序文章详情
 * */
export function articleDetail(data) {
  return myAxios.requestYL({
    url: "sc/article/detail",
    method: "get",
    data,
  });
}
