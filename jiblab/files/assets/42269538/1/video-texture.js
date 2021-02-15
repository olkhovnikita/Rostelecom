var VideoTexture = pc.createScript('videoTexture');
VideoTexture.attributes.add('timeline', { type: 'entity' });

VideoTexture.attributes.add('video', {
    title: 'Video',
    description: 'MP4 video asset to play back on this video texture.',
    type: 'asset'
});
VideoTexture.attributes.add('playEvent', {
    title: 'Play Event',
    description: 'Event that is fired as soon as the video texture is ready to play.',
    type: 'string',
    default: ''
});

var video;
// initialize code called once per entity
VideoTexture.prototype.initialize = function() {
    var app = this.app;
    
    // Create HTML Video Element to play the video
    video = document.createElement('video');
    video.loop = true;

    // muted attribute is required for videos to autoplay
    video.muted = true;

    // critical for iOS or the video won't initially play, and will go fullscreen when playing
    video.playsInline = true;
    
    // needed because the video is being hosted on a different server url
    video.crossOrigin = "anonymous";
    video.preload = "auto"; 

    // set video source
    video.src = this.video.getFileUrl();

    // iOS video texture playback requires that you add the video to the DOMParser
    // with at least 1x1 as the video's dimensions
    var style = video.style;
    style.width = '1px';
    style.height = '1px';
    style.position = 'absolute';
    style.opacity = '0';
    style.zIndex = '-1000';
    style.pointerEvents = 'none';

    document.body.appendChild(video);

    // Create a texture to hold the video frame data        
    // .addEventListener

    
    this.videoTexture = new pc.Texture(app.graphicsDevice, {
        format: pc.PIXELFORMAT_R8_G8_B8,
        minFilter: pc.FILTER_LINEAR_MIPMAP_LINEAR,
        magFilter: pc.FILTER_LINEAR,
        addressU: pc.ADDRESS_CLAMP_TO_EDGE,
        addressV: pc.ADDRESS_CLAMP_TO_EDGE,
        mipmaps: true
    });
    this.videoTexture.setSource(video);

    video.addEventListener('canplay', function (e) {
        app.fire(this.playEvent, this.videoTexture);
       // video.play();
    }.bind(this));
    
    video.addEventListener('seeked', function () {
        this.timeline.script.timeline.fire();
    }.bind(this));
    
    video.addEventListener('play', function () {
        this.timeline.script.timeline.fire();
    }.bind(this));
};

// update code called every frame
VideoTexture.prototype.update = function(dt) {
    // Transfer the latest video frame to the video texture
    this.videoTexture.upload();
};

VideoTexture.prototype.playVideo = function(){
    video.play();
    this.timeline.script.timeline.setStarted(true);
};
