var mainContent = Vue.component('main-content', ({
    props: ['template'],
    template: `       
     <div class="content">
        <p class="select">Выбери понравившийся шаблон</p>
        <div class="examples">
            <div style="background-image:url(gif/star.gif)" :class="template=='Star' ? 'example active' : 'example'" @click="setSceneId('Star')"></div>
            <div style="background-image:url(gif/chir.gif)" :class="template=='Chirlider' ? 'example active' : 'example'" @click="setSceneId('Chirlider')"></div>
            <div style="background-image:url(gif/rocket.gif)" :class="template=='rocket' ? 'example active' : 'example'" @click="setSceneId('rocket')"></div>
            <div style="background-image:url(gif/city.gif)" :class="template=='city' ? 'example active' : 'example'" @click="setSceneId('city')"></div>
            <div style="background-image:url(gif/beach.gif)" :class="template=='Beach' ? 'example active' : 'example'" @click="setSceneId('Beach')"></div>
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

