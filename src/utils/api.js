import request from "./request";
const requestUrl = "http://192.168.1.72:8088";
// get
const GETAPI = {
    // 登录
    getTest: requestUrl + "/spring_websocket_war/user/index",
}

export function HandleGetAPI(url, data, param) {
    let config = {
        url: GETAPI[url],
        method: "get"
    };

    if (data) {
        let option = param ? param : "data";
        config[option] = data;
    }
    return request(config);
}


// post
const POSTAPI = {
    postTest: requestUrl + "/spring_websocket_war/user/index",

}
export function HandlePostAPI(url, data, param) {
    let config = {
        url: POSTAPI[url],
        method: "post"
    };

    if (data) {
        let option = param ? param : "data";
        config[option] = data;
    }
    return request(config);
}