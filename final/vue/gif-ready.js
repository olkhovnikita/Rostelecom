var gifReady = Vue.component('gif-ready', ({
    props: ['img'],
    template: `
    <div class='gif-ready-container'>
        <div class='gif-ready-header'>
            <p class='select gif-ready-text'>Твоя GIF-открытка готова.<br></p>
            <textarea id="url" ref="text" class='slogantwo make-another-btn' ></textarea>
            <div class='download-button-group'>     
                <button @click="copyurl" class='select-example-button make-another-btn' download>Скопировать ссылку</button> 
                <a id="downloadButton" href="#" class="progress-button red" data-loading="Создание.." data-finished="Скачать">Скачать</a>
            </div>
            
            <div id="renderProgressDiv"></div>
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

        var linkurl = "https://23february-rt.com/link/?type=" + type;
        if(text != undefined){
            linkurl = linkurl + "&text=" + text;
        }
        if(photo != undefined){
            linkurl = linkurl + "&photo=" + photo;
        }

        let url = document.getElementById("url");
        url.value = linkurl;
        
        document.addEventListener('DOMContentLoaded', function(){
            BeachScene.m_bgPath = 'gif/bg'
            BeachScene.m_cavasElementId = "gif";
            BeachScene.m_faceSrc =  'gif/face.png';
            BeachScene.m_text = 'Получай удовольствие';
            BeachScene.m_canvasW =  1000;
            BeachScene.m_canvasH =  750;        
            BeachScene.start();
        });

        ///BUTTONS
        $(document).ready(function(){
            $('.progress-button').progressInitialize();
            var controlButton = $('#downloadButton');
            var clickable = false;
            controlButton.click(function(e){
                console.log("click");
                console.log(clickable);
                if(clickable){
                    alert('Showing how a callback works!');
                }
                e.preventDefault();
            });
        
            window.addEventListener('renderProgress', function(e) {
                console.log(e.detail);
                controlButton.progressSet(e.detail);
            });

            window.addEventListener('renderCompleted', function(e) {
                console.log(e.detail);
                controlButton.progressFinish();
                clickable = true;
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
                            button.removeClass('finished').addClass('in-progress')
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