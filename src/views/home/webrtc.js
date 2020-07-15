function webrtc() {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
    if (navigator.getUserMedia) {
        // 支持
    } else {
        // 不支持
    }
    // getUserMedia方法支持三个参数
    // navigator.getUserMedia({
    //     video: true,
    //     audio: true
    // }, onSuccess, onError);
    // 例子
    var constrains = { video: true };

    function onSuccess() {

    }

}
export {
    webrtc
}