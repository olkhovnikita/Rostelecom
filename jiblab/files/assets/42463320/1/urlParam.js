var UrlParam = pc.createScript('urlParam');
UrlParam.attributes.add('text', { type: 'entity' });


UrlParam.prototype.initialize = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('text');
    if(product != null){
        this.text.element.text = product;
    }
    else
    {
        this.text.element.text = "На страже цифрового будущего";
    }
    
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

