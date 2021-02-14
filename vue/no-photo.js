var noPhoto = Vue.component('no-photo', ({
    props: ['template'],
    template: `       
    <div class="container-no-photo">
        <div class="modal-no-photo">
            <div class="modal-no-photo-header">
                <img src="img/smile.png" class="modal-no-photo-smile" alt='sad smile'>
                <p class="modal-no-photo-text">Ты забыл загрузить фото.<br>Продолжить без него?</p>
            </div>
            <div class="modal-no-photo-footer">
                <button type="button" class="yes-button" @click='yes'>Да</button>
                <button type="button" class="back-button" @click='back'>Вернуться к редактированию</button>
            </div>
        </div>
    </div>`,

    methods: {
        yes: function () {
            this.$emit('page-number', 'gif-ready');
            this.$emit('show-modal', false);
        },
        back: function () {
            this.$emit('show-modal', false);
        },
    }
}))