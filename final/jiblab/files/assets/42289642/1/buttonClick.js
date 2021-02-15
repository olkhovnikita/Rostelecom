var ButtonClick = pc.createScript('buttonClick');

ButtonClick.attributes.add('videoTextureEntity', { type: 'entity' });
ButtonClick.attributes.add('over', { type: 'entity' });

// initialize code called once per entity
ButtonClick.prototype.initialize = function() {
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
    
};

ButtonClick.prototype.onPress = function (event) {
    this.videoTextureEntity.script.videoTexture.playVideo();
    this.entity.enabled = false;
    this.over.enabled = false;
};