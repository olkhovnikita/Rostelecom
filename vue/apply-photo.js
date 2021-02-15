var applyPhoto = Vue.component('apply-photo', ({
    props: ['template', 'img'],
    template: `
    <div class='container'>
        <div class="container-page-3">
            <div class="modal">
                <div class='apply-face'>
                    <img id='applying-photo' class='my-image' :src='img' alt='loaded pic'>
                </div>
                <div class="modal-footer">
                    <p class='place-face'>Помести овал лица в выделенную область</p>
                    <button type='button' class="select-example-button apply-face-btn"@click="getCroppedImage" :disabled ='!template' >Применить</button>
                </div>
            </div>
        </div>
    </div>
`,
    methods: {
        sendPost: function(data){
            console.log("post");
            let formData = new FormData();
            var d = new Date();
            var fileName = d.getDay().toString() + "_" + d.getMonth().toString() + "_" + d.getHours().toString() + "_" + d.getMinutes().toString() + "_" + d.getSeconds().toString() + "_" + d.getMilliseconds();
            GIFPHOTO=fileName;
            formData.set('image', data, fileName + '.png');
            axios.post('http://23february-rt.com:9000/upload-image', formData, {
                headers: {
                 'content-type': 'multipart/form-data' // do not forget this 
                }})
        },

        getCroppedImage: function () {
            this.crop.result({
                type: 'blob',
            }).then((data) => this.sendPost(data)          
            )
// this.$emit('cropped-img', data))
            this.$emit('show-modal-apply', false);
            var url = "http://23february-rt.com/final/?type=" + SCENE_PATH;
            
            if(GIFTEXT != ''){
                url = url + "&text=" + GIFTEXT;
            }
            if(GIFPHOTO != ''){
                url = url + "&photo=" + GIFPHOTO;
            }

            window.open(url , "_self"); 
            //this.$emit('page-number', 'gif-ready');
        }
    },
    mounted() {
        this.crop = new Croppie(document.getElementById('applying-photo'), {
            showZoomer: false,
            enableResize: false,
            viewport: { width: 150, height: 250, type: 'circle' }
        })
    }
}))

