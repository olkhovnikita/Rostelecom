new Vue({
    components: {
        'no-photo': noPhoto,
        'main-content': mainContent,
        'person': personalisation,
        'apply-photo': applyPhoto,
        'gif-ready': gifReady,
        'my-header': myHeader
    },
    el: '#content',
    data: {
        showModal: false,
        showModalApply: false,
        page: 'gif-ready',
        templateId: null,
        img: null,
        croppedImg: ''
    }
})