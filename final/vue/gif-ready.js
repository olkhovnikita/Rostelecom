var gifReady = Vue.component('gif-ready', ({
    props: ['img'],
    template: `
    <div class='gif-ready-container'>
        <div class='gif-ready-header'>
            <p class='select gif-ready-text'>Твоя GIF-открытка готова.<br></p>
            <a id="downloadButton" href="#" class="progress-button red make-another-btn" data-loading="Создание.." data-finished="Скачать">Скачать</a>
            <p id="helper" class='commets'>Дождитесь создания GIF для скачивания</p>
            <canvas width="1000" height="750" id="gif" ></canvas>
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

        var photo = urlParams.get('photo');
        var text = urlParams.get('text');

        document.addEventListener('DOMContentLoaded', function(){
            var CurrentScene;
            console.log(type);
            switch(type){
                case 'Chirlider':
                    CurrentScene = CheerScene;
                    CurrentScene.m_bgPath = 'gif/bg/cheer'
                    break;
                case 'Star':
                    CurrentScene = StarScene;
                    CurrentScene.m_bgPath = 'gif/bg/star'
                    break;
                case 'rocket':
                    CurrentScene = RocketScene;
                    CurrentScene.m_bgPath = 'gif/bg/rocket'
                    break;
                case 'city':
                    CurrentScene = CityScene;
                    CurrentScene.m_facePosY = 220;
                    CurrentScene.m_bgPath = 'gif/bg/city'
                    break;
                case 'Beach':
                    CurrentScene = BeachScene;
                    CurrentScene.m_bgPath = 'gif/bg/beach';
                    break;
            }
            

            if(text != undefined)
            {
                CurrentScene.m_text = text;
            }
            else 
            {
                CurrentScene.m_text = 'Полный вперед!';
            }

        
            CurrentScene.m_cavasElementId = "gif";
            
            if(photo != undefined){
                CurrentScene.m_faceSrc =  "https://23february-rt.com/uploads/" + photo + ".png";
            }
            else {
                if(type === 'Chirlider') {
                    CurrentScene.m_faceSrc =  'img/headGirl.png';
                }
                else {
                    CurrentScene.m_faceSrc =  'img/head2.png';
                }
            }
            CurrentScene.m_canvasW =  1000;
            CurrentScene.m_canvasH =  750;        
            CurrentScene.start();
        });

        ///BUTTONS
        $(document).ready(function(){
            $('.progress-button').progressInitialize();
            var controlButton = $('#downloadButton');
            var clickable = false;
            controlButton.progressIncrement();
            var gifBlob;
            controlButton.click(function(e){
                if(clickable){
                    if(/webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                        console.log('mobile');
                        window.open(gifBlob, "_self");
                      }else{
                        console.log('pc');
                        const contentType = 'application/octet-stream';
                        var filename = 'rostelecom.gif',
                        e    = document.createEvent('MouseEvents'),
                        a    = document.createElement('a');

                        a.download = filename;
                        a.href = gifBlob;
                        a.dataset.downloadurl =  [contentType, a.download, a.href].join(':');
                        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        a.dispatchEvent(e);
                      }                           
                }
                e.preventDefault();
            });
        
            window.addEventListener('renderProgress', function(e) {
                controlButton.progressSet(e.detail);
            });

            window.addEventListener('renderCompleted', function(e) {
                gifBlob = e.detail;
                controlButton.progressFinish();
                clickable = true;

                var text = document.getElementById("helper");
                if(/webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                    text.textContent="Для скачивания с телефона нажми скачать, а затем зажми GIF-открытку на несколько секунд";
                  }else{
                    text.parentElement.removeChild(text);
                  }
            });        
        });

        (function($){        
            $.fn.progressInitialize = function(){
       
                return this.each(function(){
        
                    var button = $(this),
                        progress = 0;        
                    var options = $.extend({
                        type:'background-horizontal',
                        loading: 'Loading..',
                        finished: 'Done!'
                    }, button.data());

                    button.attr({'data-loading': options.loading, 'data-finished': options.finished});
                    var bar = $('<span class="tz-bar ' + options.type + '">').appendTo(button);
                    button.on('progress', function(e, val, absolute, finish){
        
                        if(!button.hasClass('in-progress')){       
                            bar.show();
                            progress = 0;
                            button.removeClass('finished').addClass('in-progress');
                        }
        
                        if(absolute){
                            progress = val;
                        }
                        else{
                            progress += val;
                        }
        
                        if(progress >= 100){
                            progress = 100;
                        }
        
                        if(finish){
        
                            button.removeClass('in-progress').addClass('finished');
        
                            bar.delay(500).fadeOut(function(){
                                button.trigger('progress-finish');
                                setProgress(0);
                            });
        
                        }
                        setProgress(progress);
                    });
        
                    function setProgress(percentage){
                        bar.filter('.background-horizontal,.background-bar').width(percentage+'%');
                        bar.filter('.background-vertical').height(percentage+'%');
                    }
        
                });
        
            };
        
            $.fn.progressStart = function(){
        
                var button = this.first(),
                    last_progress = new Date().getTime();
        
                if(button.hasClass('in-progress')){
                    return this;
                }
        
                button.on('progress', function(){
                    last_progress = new Date().getTime();
                });

                var interval = window.setInterval(function(){
        
                    if( new Date().getTime() > 2000+last_progress){
                        button.progressIncrement(5);
                    }
        
                }, 500);
        
                button.on('progress-finish',function(){
                    window.clearInterval(interval);
                });
        
                return button.progressIncrement(10);
            };
        
            $.fn.progressFinish = function(){
                return this.first().progressSet(100);
            };
        
            $.fn.progressIncrement = function(val){
        
                val = val || 10;
        
                var button = this.first();
        
                button.trigger('progress',[val])
        
                return this;
            };
        
            $.fn.progressSet = function(val){
                val = val || 10;
        
                var finish = false;
                if(val >= 100){
                    finish = true;
                }
        
                return this.first().trigger('progress',[val, true, finish]);
            };
        
            $.fn.progressTimed = function(seconds, cb){
        
                var button = this.first(),
                    bar = button.find('.tz-bar');
        
                if(button.is('.in-progress')){
                    return this;
                }

                bar.css('transition', seconds+'s linear');
                button.progressSet(99);
        
                window.setTimeout(function(){
                    bar.css('transition','');
                    button.progressFinish();
        
                    if($.isFunction(cb)){
                        cb();
                    }
        
                }, seconds*1000);
            };
        
        })(jQuery);
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