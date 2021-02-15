var UrlParam = pc.createScript('urlParam');
UrlParam.attributes.add('text', { type: 'entity' });
UrlParam.attributes.add('gifText', { type: 'string' });

UrlParam.prototype.initialize = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('text');
    if(product != null){
        this.text.element.text = product;
    }
    else
    {
        this.text.element.text = this.gifText;
    }
    
};

