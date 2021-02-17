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
        sendPost: function (data) {
            console.log("post");
            let formData = new FormData();
            var d = new Date();
            var fileName = d.getDay().toString() + "_" + d.getMonth().toString() + "_" + d.getHours().toString() + "_" + d.getMinutes().toString() + "_" + d.getSeconds().toString() + "_" + d.getMilliseconds();
            GIFPHOTO = fileName;
            formData.set('image', data, fileName + '.png');
            axios.post('https://23february-rt.com:9000/upload-image', formData, {
                headers: {
                    'content-type': 'multipart/form-data' // do not forget this 
                }
            }).then(restp => {
                this.$emit('show-modal-apply', true);
            })
        },
        ff: function() {

        },

        getCroppedImage: function () {
            this.crop.result({
                type: 'blob',
            }).then((data) => //this.sendPost(data)
            {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                console.log("asd1f");
                var mask = new Image();
                var self = this;
                self.ff();
                mask.onload = function() {
                    self.ff();
                    console.log("asd21f");
                    var face = new Image();
                    face.onload = function() {
                        self.ff();
                        console.log("asd22341f");
                        canvas.width = face.width;
                        canvas.height = face.height;
                        ctx.drawImage(mask, 0, 0, mask.width, mask.height, 0, 0 , canvas.width, canvas.height);
                        ctx.save();
                        ctx.globalCompositeOperation = 'source-in';
                        ctx.drawImage(face, 0, 0);
                        ctx.restore();
                        console.log("asdf");
                        canvas.toBlob((blob) => {
                            self.sendPost(blob);
                        });
                    }
                    face.src = URL.createObjectURL(data);
                }
               mask.src = "final/gif/mask.png";
            })
         
            this.$emit('show-modal-apply', false);
            var textInp = document.getElementById('photoButton');
            textInp.style.pointerEvents = 'none';
            textInp.style.backgroundColor = '#777777';
  
        }
    },
    mounted() {
        this.crop = new Croppie(document.getElementById('applying-photo'), {
            showZoomer: false,
            enableResize: true,
            viewport: { width: 200, height: 250, type: 'square' }
        })
    }

}))

