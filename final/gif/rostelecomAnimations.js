var Scene = {
    m_gifRecorder: {},
    m_stages: [],
    m_bgPath: 'bg',
    m_bgFrames: [],
    m_bgsLoaded: 0,
    m_canvas: {},
    m_context: {},
    m_canvasW: 1000,
    m_canvasH: 750,
    m_canvasElementId: 'gif',

    m_face: {},
    m_faceSrc: 'face.png',

    m_framesCount: 55,
    m_halfCount: this.m_framesCount/2,
    m_iterationN: 0,
    m_faceAngle: 0,
    m_facePosX: 140,
    m_facePosY: 290,
    m_faceW: 100,
    m_faceH: 150,
    m_renderStarted: false,

    m_playTimeout: 50,
    m_recTimeout: 150,

    m_text: 'Получай удовольствие от удаленки',
    m_textX: 450,
    m_textY: 140,
    m_canvasFont: "bold 21px Arial",
    m_canvastextAlign: "center",
    m_canvasFillStyle: "#9c27b0",

    initStages(){
    },
    draw(){
        //bg
        this.m_context.drawImage(this.m_bgFrames[this.m_iterationN], 0, 0, this.m_canvasW, this.m_canvasH);
        //text
        this.m_context.fillText(this.m_text, this.m_textX, this.m_textY)
        //face
        this.drawImageRot(this.m_context, this.m_face, this.m_facePosX, this.m_facePosY, this.m_faceW, this.m_faceH, this.m_faceAngle);
        
        this.updatePositions();

        if(!this.m_renderStarted) {
            this.m_gifRecorder.addFrame(this.m_canvas, {delay: this.m_recTimeout});

            if(this.m_iterationN == this.m_framesCount - 1){
                this.renderGif();
            }
        }
    },
    updatePositions(){      
    },
    drawImageRot(a_context, a_img, a_x, a_y, a_width, a_height, a_deg){
        a_context.save();

        var rad = a_deg * Math.PI / 180;
        a_context.translate(a_x + a_width / 2, a_y + a_height / 2);

        a_context.rotate(rad);
        a_context.drawImage(a_img, a_width/2*(-1), a_height/2*(-1), a_width, a_height);
        a_context.rotate(-1 * rad)
        a_context.translate((a_x+a_width/2) * (-1), (a_y + a_height / 2) * (-1));

        a_context.restore();
    },
    renderGif(){
        console.log('Render started')
        this.m_gifRecorder.on('finished', function(blob) {
            console.log('Render complete')
            window.dispatchEvent( new CustomEvent('renderCompleted', {'detail': URL.createObjectURL(blob) }) );
        });
        this.m_gifRecorder.on('progress', function(progress) {
            window.dispatchEvent( new CustomEvent('renderProgress', {'detail': progress * 100 }) );
        });
        this.m_gifRecorder.render();
        this.m_renderStarted = true;
    },
    startPlay(){

        this.m_canvas = document.getElementById(this.m_canvasElementId);
        this.m_context = this.m_canvas.getContext('2d');
        if(!this.m_context) console.error('Null canvas context');
        //canvas draw styles
        this.m_context.font = this.m_canvasFont;
        this.m_context.textAlign = this.m_canvastextAlign;
        this.m_context.fillStyle = this.m_canvasFillStyle;

        this.initStages();

        this.m_face = new Image();
        this.m_face.src = this.m_faceSrc;

        this.m_gifRecorder = new GIF({
            workers: 4,
            quality: 30
        });
    
        var self = this;
        setInterval(function(){
            self.draw();
        }, this.m_playTimeout);
    },
    start(){  
        //bg sprites array
        for(var i = 1; i < this.m_framesCount + 1; i++){
            var img = new Image();
            var self = this;
            img.onload = function(){
                self.m_bgsLoaded++;
                console.log(`Loaded ${self.m_bgsLoaded}/${self.m_bgFrames.length} bg frames`);
                if(self.m_framesCount == self.m_bgsLoaded) self.startPlay();
            }
            var path = `${this.m_bgPath}/bg (${i}).jpg`;

            img.src = path;
            this.m_bgFrames.push(img);
        }
    }
};

var BeachScene = Object.create(Scene);

BeachScene.m_framesCount =  55;
BeachScene.m_halfCount =  this.m_framesCount/2;
BeachScene.m_iterationN = 0;
BeachScene.m_faceAngle = 0;
BeachScene.m_facePosX = 140;
BeachScene.m_facePosY = 290;
BeachScene.m_faceW = 100;
BeachScene.m_faceH = 150;
BeachScene.m_renderStarted = false;
BeachScene.m_playTimeout = 50;
BeachScene.m_recTimeout = 150,
BeachScene.m_text = 'Получай удовольствие от удаленки';
BeachScene.m_textX = 450;
BeachScene.m_textY = 140;
BeachScene.m_canvasFont = "bold 21px Arial";
BeachScene.m_canvastextAlign = "center";
BeachScene.m_canvasFillStyle = "#9c27b0";

BeachScene.initStages = function(){
    this.m_stages.push((this.m_framesCount - 18) / 6);
    this.m_stages.push((this.m_framesCount - 18) / 6 * 2);
    this.m_stages.push((this.m_framesCount - 18) / 6 * 3);
    this.m_stages.push((this.m_framesCount - 18) / 6 * 4);
    this.m_stages.push((this.m_framesCount - 18) / 6 * 5);
    this.m_stages.push((this.m_framesCount - 18) / 6 * 6);
}
BeachScene.updatePositions = function(){
    //update iterations
    if(this.m_iterationN == this.m_framesCount -1) this.m_iterationN = 0;
    else this.m_iterationN++;

    var angleDelta = 1;
    if(this.m_iterationN >= 0 && this.m_iterationN < this.m_stages[0]){
        this.m_faceAngle -= angleDelta;
    }else if(this.m_iterationN >= this.m_stages[0] && this.m_iterationN < this.m_stages[1]){
        this.m_faceAngle += angleDelta;
    }else if(this.m_iterationN >= this.m_stages[1] && this.m_iterationN < this.m_stages[2]){
        this.m_faceAngle += angleDelta;
    }else if(this.m_iterationN >= this.m_stages[2] && this.m_iterationN < this.m_stages[3]){
        this.m_faceAngle -= angleDelta;
    }else if(this.m_iterationN >= this.m_stages[3] && this.m_iterationN < this.m_stages[4]){
        this.m_faceAngle -= angleDelta;
    }else if(this.m_iterationN >= this.m_stages[4] && this.m_iterationN < (this.m_framesCount - 18)){
        this.m_faceAngle += angleDelta;
    }if(this.m_iterationN >= (this.m_framesCount - 18)){
        this.m_faceAngle = 0;
    }
}