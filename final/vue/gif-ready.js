var gifReady = Vue.component('gif-ready', ({
    props: ['img'],
    template: `
    <div class='gif-ready-container'>
        <div class='gif-ready-header'>
            <p class='select gif-ready-text'>Твоя GIF-открытка готова.<br></p>
            <textarea id="url" ref="text" class='slogantwo make-another-btn' ></textarea>
            <div class='download-button-group'>     
                <button @click="copyurl" class='select-example-button make-another-btn' download>Скопировать ссылку</button> 
            </div>

            <canvas id="gif" ></canvas>
        </div>
        <button type='button' class='select-example-button make-another-btn' @click="openStart">Создать еще одно GIF-поздравление</button>
    </div>
    `,
    mounted() {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var type = urlParams.get('type');
        console.log(type);
        SCENE_PATH = type;

        let externalScriptFirst = document.createElement('script')
        externalScriptFirst.setAttribute('src', 'jiblab/__start__.js')
        document.head.appendChild(externalScriptFirst)

        let externalScriptSecond = document.createElement('script')
        externalScriptSecond.setAttribute('src', 'jiblab/__loading__.js')
        document.head.appendChild(externalScriptSecond)

        var photo = urlParams.get('photo');
        var text = urlParams.get('text');

        var linkurl = "https://23february-rt.com/link/?type=" + type;
        if(text != undefined){
            linkurl = linkurl + "&text=" + text;
        }
        if(photo != undefined){
            linkurl = linkurl + "&photo=" + photo;
        }

        let url = document.getElementById("url");
        url.value = linkurl;
    },
    methods: {
        openStart: function(){
            window.open("https://23february-rt.com/", "_self");

        },
        copyurl: function(){
            this.$refs.text.select();
            document.execCommand('copy');
        }
    }


}))