var finalPage = Vue.component('final-page', ({
    props: ['img'],
    template: `
    <div class='gif-ready-container'>
        <div class='gif-ready-header'>
            <p class='select gif-ready-text'>Твоя GIF-открытка!</p>
        </div>
        <div class='gif-container'>
            <canvas id="gif"></canvas>
        <button type='button' class='select-example-button make-another-btn' @click="$emit('page-number', 'main-content')">Создать еще одно GIF-поздравление</button>
        </div>
    </div>
    `,
    mounted() {
        let externalScriptFirst = document.createElement('script')
        externalScriptFirst.setAttribute('src', 'jiblab/__start__.js')
        document.head.appendChild(externalScriptFirst)

        let externalScriptSecond = document.createElement('script')
        externalScriptSecond.setAttribute('src', 'jiblab/__loading__.js')
        document.head.appendChild(externalScriptSecond)
    }


}))