import myAxios from "@/utils/myAxios.js";

/*
 * 上传单个文件
 * 
 */
export function putFile(data) {
	return myAxios.requestYL({
		url: "blade-resource/oss/endpoint/put-file",
		method: "get",
		data,
		header: {
			"content-type": "application/form-data"
		}
	});
}