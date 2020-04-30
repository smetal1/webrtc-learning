function hasUserMedia(){
    console.log("****")
    navigator.getUserMedia=navigator.getUserMedia|| navigator.mediaDevices.getUserMedia
    return !!navigator.getUserMedia;
}
function hasRTCPeerConnection(){
    window.RTCPeerConnection=window.RTCPeerConnection
    return !!window.RTCPeerConnection;
}

var yourVideo = document.querySelector('#yours');
var theirVideo = document.querySelector('#theirs');

if(hasUserMedia){
    navigator.getUserMedia({video:true,audio:false}),function(stream){
        yourVideo.src=window.URL.createObjectURL(stream);

        if(hasRTCPeerConnection){
            startPeerConnection(stream);
        }else {
            alert("Un-supported Browser -1")
        }

    },function(error){
        alert("camera error")
    }
}
else {
    alert("Un-supported Browser -2")
}