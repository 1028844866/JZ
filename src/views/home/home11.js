function userMedia() {
    var stream;
    hasUserMedia => {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia);
    };
    if (hasUserMedia()) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        navigator.getUserMedia({ video: true, audio: true }, (s) => {
            stream = s;
            let video = document.querySelector("video");
            video.src = window.URL.createObjectURL(stream);
        }, (err) => {});
    } else {
        alert("WebRTC is not supported");
    }
    getAudioTracks => {
        console.log("getAudioTracks");
        console.log(stream.getAudioTracks());

    }
    getTrackById => {
        console.log("getTrackById");
        console.log(stream.getTrackById(stream.getAudioTracks()[0].id));
    }
    getTracks => {
        console.log("getTracks()");
        console.log(stream.getTracks());
    }
    getVideoTracks => {
        console.log("getVideoTracks()");
        console.log(stream.getVideoTracks());
    }
    removeAudioTrack => {
        console.log("removeAudioTrack()");
        stream.removeTrack(stream.getAudioTracks()[0]);
    }
    removeVideoTrack => {
        console.log("removeVideoTrack()");
        stream.removeTrack(stream.getVideoTracks()[0]);
    }
}
export {
    userMedia
}