var mainContent = Vue.component('main-content', ({
    props: ['template'],
    template: `       
     <div class="content">
        <p class="select">Выбери понравившийся шаблон</p>
        <div class="examples">
            <div style="background-image:url(img/img_1.png)" :class="template=='Star' ? 'example active' : 'example'" @click="setSceneId('Star')"></div>
            <div style="background-image:url(img/img_2.png)" :class="template=='Chirlider' ? 'example active' : 'example'" @click="setSceneId('Chirlider')"></div>
            <div style="background-image:url(img/img_3.png)" :class="template=='rocket' ? 'example active' : 'example'" @click="setSceneId('rocket')"></div>
            <div style="background-image:url(img/img_4.png)" :class="template=='city' ? 'example active' : 'example'" @click="setSceneId('city')"></div>
            <div style="background-image:url(img/img_5.png)" :class="template=='Beach' ? 'example active' : 'example'" @click="setSceneId('Beach')"></div>
        </div>
        <div class='select-button'>
            <button type='button' class='select-example-button' @click="$emit('page-number', 'person')" :disabled ='!template'>Выбрать этот шаблон</button>
        </div>
    </div>`,
    methods: {
        setSceneId: function (data) {
            this.$emit('template-number', data);
            SCENE_PATH ='jiblab/' + data + '.json'
        }
    }
}))

