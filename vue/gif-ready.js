var gifReady = Vue.component('gif-ready', ({
    props: ['img'],
    template: `
    <div class='gif-ready-container'>
        <div class='gif-ready-header'>
            <p class='select gif-ready-text'>Твоя GIF-открытка готова.<br></p>
            <div class='download-button-group'>
                <a href='#' class='gif-ready-download-btn select-example-button' download>Скачать</a>    
            </div>
        </div>
        <div>
            <canvas id="gif" ></canvas>
        </div>
        <button type='button' class='select-example-button make-another-btn' @click="$emit('page-number', 'main-content')">Создать еще одно GIF-поздравление</button>
    </div>
    `,
    mounted() {
        /*
        let externalScriptFirst = document.createElement('script')
        externalScriptFirst.setAttribute('src', 'jiblab/__start__.js')
        document.head.appendChild(externalScriptFirst)

        let externalScriptSecond = document.createElement('script')
        externalScriptSecond.setAttribute('src', 'jiblab/__loading__.js')
        document.head.appendChild(externalScriptSecond)*/
    }
}))