var personalisation = Vue.component('person', {
    props: ['template'],
    template: ` 
    <div class='container'>
        <div class='container-page-2'>
                    <p class="select personalise">Персонализируй шаблон</p>
                    <p class='select change-text'>Изменить надпись</p> 
                <div class='form-text'>
                    <input type="text" id="figtext" :value='switchText(template)' class="slogan" maxlength='30'></input>                       
                    <label for='photo' class="select-example-button load-photo-button" id="photoButton" >Загрузить фото</label>
                    <input type="file" id='photo' @change='onChange' accept="image/png, image/jpeg">
                </div>
                    <p class='max-length'>*Максимум 30 символов</p>
                    <div>
                    <img class='selected-gif' :src='src(template)'>
                    </div>
                    <div class='select-button'>
                        <button type='button' class='select-example-button make-a-gif-btn' @click="check">Создать GIF</button>
                    </div>
                </div>
            </div>`,
    mounted() {
        
    },
    methods: {
        switchLength: function (template) {
            switch (template) {
                case 'Star':
                    return 12;
                case 'Chirlider':
                    return 14;
                case 'rocket':
                    return 21;
                case 'city':
                    return 29;
                case 'Beach':
                    return 32;
            }
        },/*
        switchLengthText: function (template) {
            switch (template) {
                case 'Star':
                    return '*Максимум 25 символов'12;
                case 'Chirlider':
                    return '*Максимум 25 символов'14;
                case 'rocket':
                    return '*Максимум 25 символов'21;
                case 'city':
                    return '*Максимум 25 символов'29;
                case 'Beach':
                    return '*Максимум 25 символов'32;
            }
        },*/
        switchText: function (template) {
            switch (template) {
                case 'Star':
                    return 'Ты - звезда!';
                case 'Chirlider':
                    return 'Только Вперёд!';
                case 'rocket':
                    return 'Космических успехов!';
                case 'city':
                    return 'На страже цифрового будущего';
                case 'Beach':
                    return 'Получай удовольствие от удалёнки';

            }
        },

        src: function (template) {
            switch (template) {
                case 'Star':
                    return 'gif/star.gif'
                case 'Chirlider':
                    return 'gif/chir.gif'
                case 'rocket':
                    return 'gif/rocket.gif'
                case 'city':
                    return 'gif/city.gif'
                case 'Beach':
                    return 'gif/beach.gif'
            }
        },
        check: function () {
            var textInp = document.getElementById('figtext');
            GIFTEXT = textInp.value;
            var input = document.getElementById('photo');
            if (input.value) {
                var url = "https://23february-rt.com/final/?type=" + SCENE_PATH;

                if (GIFTEXT != '') {
                    url = url + "&text=" + GIFTEXT;
                }
                if (GIFPHOTO != '') {
                    url = url + "&photo=" + GIFPHOTO;
                }

                window.open(url, "_self");
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
                    this.$emit('show-modal-apply', true);
                    console.log(window.URL.createObjectURL(curFiles[i]));
                } else {
                    console.log('invalid type file');
                }
            }
        },
    },
    computed() {
        switchText(template);
    }
})
