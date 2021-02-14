var UrlParam = pc.createScript('urlParam');
UrlParam.attributes.add('text', { type: 'entity' });


UrlParam.prototype.initialize = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('text');
    this.text.element.text = product;
};

