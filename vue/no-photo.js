var noPhoto = Vue.component('no-photo', ({
    props: ['template'],
    template: `       
    <div class="container-no-photo">
        <div class="modal-no-photo">
            <div class="modal-no-photo-header">
                <img src="img/smile.png" class="modal-no-photo-smile" alt='sad smile'>
                <p class="modal-no-photo-text"> Не забывай добавить фото!<br>Продолжить без него?</p>
            </div>
            <div class="modal-no-photo-footer">
                <button type="button" class="back-button" @click='back'>Вернуться к редактированию</button>
                <button type="button" class="yes-button" @click='yes'>Продолжить без него</button>
            </div>
        </div>
    </div>`,

    methods: {
        yes: function () {
            var url = "http://23february-rt.com/final/?type=" + SCENE_PATH;
            
            if(GIFTEXT != ''){
                url = url + "&text=" + GIFTEXT;
            }
            if(GIFPHOTO != ''){
                url = url + "&photo=" + GIFPHOTO;
            }

            window.open(url , "_self"); 
            //this.$emit('show-modal', false);
            //if(this.gif)
            //window.open("http://192.168.31.167:8080/final/?type=" + SCENE_PATH , "_self"); 
            //this.$emit('page-number', 'gif-ready');
            //this.$emit('show-modal', false);
        },
        back: function () {
            this.$emit('show-modal', false);
        },
    }
}))