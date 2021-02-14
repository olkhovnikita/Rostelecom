var ButtonClick = pc.createScript('buttonClick');

ButtonClick.attributes.add('videoTextureEntity', { type: 'entity' });

// initialize code called once per entity
ButtonClick.prototype.initialize = function() {
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
    
};

ButtonClick.prototype.onPress = function (event) {
    this.videoTextureEntity.script.videoTexture.playVideo();
    this.entity.enabled = false;
};




// swap method called for script hot-reloading
// inherit your script state here
// ButtonClick.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/