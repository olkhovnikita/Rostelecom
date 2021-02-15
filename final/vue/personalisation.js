
var personalisation = Vue.component('person', {
    props: ['template'],
    template: ` 
    <div class='container'>
        <div class='container-page-2'>
                    <p class="select personalise">Персонализируй шаблон</p>
                    <p class='select change-text'>Изменить надпись</p> 
                <div class='form-text'>
                    <input type="text" placeholder="На страже цифрового будущего" class="slogan" maxlength='25'></input>                       
                    <label for='photo' class="select-example-button load-photo-button" >Загрузить фото</label>
                    <input type="file" id='photo' @change='onChange' accept="image/png, image/jpeg">
                </div>
                    <p class='max-length'>*Максимум 25 символов</p>
                    <div>
                    <canvas id="gif" ></canvas>
                    </div>
                    <div class='select-button'>
                        <button type='button' class='select-example-button make-a-gif-btn' @click="check">Создать GIF</button>
                    </div>
                </div>
            </div>`,
    mounted() {
        let externalScriptFirst = document.createElement('script')
        externalScriptFirst.setAttribute('src', 'jiblab/__start__.js')
        document.head.appendChild(externalScriptFirst)

        let externalScriptSecond = document.createElement('script')
        externalScriptSecond.setAttribute('src', 'jiblab/__loading__.js')
        document.head.appendChild(externalScriptSecond)
    },
    methods: {
        check: function () {
            var input = document.getElementById('photo');
            if (input.value) {
                this.$emit('show-modal-apply', true);
            } else {
                this.$emit('show-modal', true)
            }
        },
        onChange: function () {
            var input = document.getElementById('photo');
            var fileTypes = [
                'image/jpeg',
                'image/pjpeg',
                'image/png'
            ]

            function validFileType(file) {
                for (var i = 0; i < fileTypes.length; i++) {
                    if (file.type === fileTypes[i]) {
                        return true;
                    }
                }

                return false;
            }

            var curFiles = input.files;
            for (var i = 0; i < curFiles.length; i++) {
                if (validFileType(curFiles[i])) {
                    this.$emit('img', window.URL.createObjectURL(curFiles[i]));
                    console.log(window.URL.createObjectURL(curFiles[i]));
                } else {
                    console.log('invalid type file');
                }
            }
        },
    }
})
