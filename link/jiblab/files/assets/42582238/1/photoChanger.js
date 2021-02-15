var PhotoChanger = pc.createScript('photoChanger');

PhotoChanger.prototype.initialize = function() {
    var self = this;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    const photo = urlParams.get('photo');
    if(photo != null) {
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = function () {
            var texture = new pc.Texture(self.app.graphicsDevice);
            texture.setSource(image);

            var material = self.entity.model.material;
            material.emissiveMap = texture;
            material.opacityMap = texture;
            material.update();
        };
        
        image.src = 'http://23february-rt.com/uploads/' + photo + ".png";
    }
};

