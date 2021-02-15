var TimeTwo = pc.createScript('timeTwo');


var started = false;
var state = 0;

var tweens = [];

TimeTwo.attributes.add('autoplay', { type : 'boolean' });

TimeTwo.attributes.add('position', { type : 'boolean', default : false });
TimeTwo.attributes.add('scale', { type : 'boolean', default : false });
TimeTwo.attributes.add('rotation', { type : 'boolean', default : false });
TimeTwo.attributes.add('opacity', { type : 'boolean', default : false });
TimeTwo.attributes.add('custom', { type : 'boolean', default : false });
TimeTwo.attributes.add('duration', { type : 'number', default : 1 });
TimeTwo.attributes.add('delay', { type : 'number', default : 0 });
TimeTwo.attributes.add('yoyo', { type : 'number', default : 4 });
TimeTwo.attributes.add('ease', {
    type : 'string',
    enum : [
        { Linear : 'Linear' },
        { QuadraticIn : 'QuadraticIn' },
        { QuadraticOut : 'QuadraticOut' },
        { QuadraticInOut : 'QuadraticInOut' },
        { CubicIn : 'CubicIn' },
        { CubicOut : 'CubicOut' },
        { CubicInOut : 'CubicInOut' },
        { QuarticIn : 'QuarticIn' },
        { QuarticOut : 'QuarticOut' },
        { QuarticInOut : 'QuarticInOut' },
        { QuinticIn : 'QuinticIn' },
        { QuinticOut : 'QuinticOut' },
        { QuinticInOut : 'QuinticInOut' },
        { SineIn : 'SineIn' },
        { SineOut : 'SineOut' },
        { SineInOut : 'SineInOut' },
        { ExponentialIn : 'ExponentialIn' },
        { ExponentialOut : 'ExponentialOut' },
        { ExponentialInOut : 'ExponentialInOut' },
        { CircularIn : 'CircularIn' },
        { CircularOut : 'CircularOut' },
        { CircularInOut : 'CircularInOut' },
        { BackIn : 'BackIn' },
        { BackOut : 'BackOut' },
        { BackInOut : 'BackInOut' },
        { BounceIn : 'BounceIn' },
        { BounceOut : 'BounceOut' },
        { BounceInOut : 'BounceInOut' },
        { ElasticIn : 'ElasticIn' },
        { ElasticOut : 'ElasticOut' },
        { ElasticInOut : 'ElasticInOut' }
    ],
    default : 'Linear'
});

TimeTwo.attributes.add('startFrame', {
    type: 'json',
    schema: [{
        name: 'position',
        type: 'vec3',
    }, {
        name: 'rotation',
        type: 'vec3'
    }, {
        name: 'scale',
        type: 'vec3',
        default : [1, 1, 1]
    },{
        name  : 'opacity',
        type  : 'number',
        default : 1
    },{
        name  : 'custom',
        type  : 'string',
        description : 'For example camera.fov = 40'
    },{
        name  : 'delta',
        type  : 'number',
        default : 1
    }]
});

TimeTwo.attributes.add('endFrame', {
    type: 'json',
    schema: [{
        name: 'position',
        type: 'vec3',
    }, {
        name: 'rotation',
        type: 'vec3'
    }, {
        name: 'scale',
        type: 'vec3',
        default : [1, 1, 1]
    },{
        name  : 'opacity',
        type  : 'number',
        default : 1
    },{
        name  : 'custom',
        type  : 'string',
        description : 'For example camera.fov = 40'
    },{
        name  : 'delta',
        type  : 'number',
        default : 1
    }]
});

TimeTwo.attributes.add('step', { type : 'number' , default : 1});

TimeTwo.prototype.initialize = function() {
    this.animation = {
        custom : 0  
    };
    
    this.app.on(this.entity.name + ':Timeline', this.onPlay, this);
    this.on('destroy', this.onDestroy, this);
    this.on('state', this.onStateChange, this);
    
    if(this.autoplay){
        this.onPlay();
    }
};

TimeTwo.prototype.onStateChange = function(state) {
    if(state === true){
        if(this.autoplay){
            this.onPlay();
        }
    }else{
        this.reset();
    }
};

TimeTwo.prototype.onDestroy = function() {
    
};

TimeTwo.prototype.getEase = function() {
    return pc[this.ease];
};

TimeTwo.prototype.reset = function() {
    if(this.positionFrames){
        this.positionFrames.stop();    
    }
    
    if(this.rotationFrames){
        this.rotationFrames.stop();    
    }
    
    if(this.scaleFrames){
        this.scaleFrames.stop();    
    }
    
    if(this.opacityFrames){
        this.opacityFrames.stop();    
    }
    
    if(this.customFrames){
        this.customFrames.stop();    
    }
};

TimeTwo.prototype.setFirstFrame = function() {
    if(this.position){
        this.entity.setLocalPosition(this.startFrame.position);
    }
    
    if(this.rotation){
        this.entity.setLocalEulerAngles(this.startFrame.rotation);
    }
    
    if(this.scale){
        this.entity.setLocalScale(this.startFrame.scale);
    }
    
    if(this.opacity){
        this.entity.element.opacity = this.startFrame.opacity;
    }
    
    if(this.custom){
        var parts = this.startFrame.custom.split(' = ');
        var query = parts[0];
        var value = parseFloat(parts[1]);
        
        this.animation.custom = value;
        eval('this.entity.' + this.custom);
    }
};

TimeTwo.prototype.setStarted = function(isStarted) {
    started = isStarted;
};



TimeTwo.prototype.fire = function() {
    if(started){
        this.onPlay();
    }
};

TimeTwo.prototype.onPlay = function() {
    var self = this;
    
    this.reset();
    this.setFirstFrame();
    
    if(this.position){
        this.positionFrames = this.entity.tween(
            this.entity.getLocalPosition()
        ).to({
            x : this.endFrame.position.x,
            y : this.endFrame.position.y,
            z : this.endFrame.position.z
        }, this.duration, this.getEase()).delay(this.delay);
        this.positionFrames.yoyo(true).repeat(this.yoyo);
        
        this.positionFrames.start();
    }
    
    if(this.rotation){
        this.rotationFrames = this.entity.tween(
            this.entity.getLocalEulerAngles()
        ).rotate({
            x : this.endFrame.rotation.x,
            y : this.endFrame.rotation.y,
            z : this.endFrame.rotation.z
        }, this.duration, this.getEase()).delay(this.delay);
        this.rotationFrames.yoyo(true).repeat(this.yoyo);
        
        this.rotationFrames.start();
    }
    
    if(this.scale){
        this.scaleFrames = this.entity.tween(
            this.entity.getLocalScale()
        ).to({
            x : this.endFrame.scale.x,
            y : this.endFrame.scale.y,
            z : this.endFrame.scale.z
        }, this.duration, this.getEase()).delay(this.delay);
        
        this.scaleFrames.start();
    }
    
    if(this.opacity){
        this.opacityFrames = this.entity.tween(
            this.entity.element
        ).to({
            opacity : this.endFrame.opacity
        }, this.duration, this.getEase()).delay(this.delay);
        
        this.opacityFrames.start();
    }
    
    if(this.custom){
        var parts = this.endFrame.custom.split(' = ');
        var query = parts[0];
        var value = parseFloat(parts[1]);
        
        this.customFrames = this.entity.tween(
            this.animation
        ).to({
            custom : value
        }, this.duration, this.getEase()).delay(this.delay);
        
        this.customFrames.on('update', function(){
            eval('this.entity.' + query + ' = ' + self.animation.custom);
        });
        
        this.customFrames.start();
    }
};