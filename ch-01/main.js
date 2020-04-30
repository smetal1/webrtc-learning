function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
  if (hasGetUserMedia()) {
    // Good to go!
    const constraints = {
        video: true,
        audio: false
      };
      
      const video = document.querySelector('video'),
            canvas=document.querySelector('canvas'),
            streaming=false;
      
      navigator.mediaDevices.getUserMedia(constraints).
        then((stream) => {video.srcObject = stream});
        document.querySelector('#capture').addEventListener('click',
        function(event){
            if(stream){
                canvas.width=video.clientWidth;
                canvas.height=video.clientHeight;
                var context = canvas.getContext('2d');
                context.drawImage(video,0,0)
            }
        })
  } else {
    alert('getUserMedia() is not supported by your browser');
  }