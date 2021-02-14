var gifReady = Vue.component('gif-ready', ({
    props: ['img'],
    template: `
    <div class='gif-ready-container'>
        <div class='gif-ready-header'>
            <p class='select gif-ready-text'>Твоя GIF-открытка готова.<br>
                Сохрани её и отправь коллеге</p>
            <div class='download-button-group'>
                <a href='#' class='gif-ready-download-btn select-example-button' download>Скачать</a>    
            </div>
        </div>
        <div>
            <img :src="img" alt="selected picture" class='personalise-example gif-ready-example'>
        </div>
        <button type='button' class='select-example-button make-another-btn' @click="$emit('page-number', 'main-content')">Создать еще одно GIF-поздравление</button>
    </div>
    `,



}))