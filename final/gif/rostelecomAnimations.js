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
    m_recoderWorcers: 2,
    m_recoderQuality: 10,

    m_face: {},
    m_faceSrc: 'face.png',
    m_faceIsCustom: false,
    m_faceMask: {},
    m_faceMaskSrc: 'mask.png',


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
        this.drawImageRot(this.m_context, this.m_face, this.m_faceMask, this.m_faceIsCustom, this.m_facePosX, this.m_facePosY, this.m_faceW, this.m_faceH, this.m_faceAngle);
        
        this.updatePositions();

        if(!this.m_renderStarted) {
            this.grabFrame();

            if(this.m_iterationN == this.m_framesCount - 1){
                this.renderGif();
            }
        }
    },
    updatePositions(){      
    },
    drawImageRot(a_context, a_img, a_msk, a_cutom, a_x, a_y, a_width, a_height, a_deg){
        /*
            var red = new Image();
        red.onload = function () {
            canvas.width = red.width;
            canvas.height = red.height;
            ctx.drawImage(red, 0, 0);

            var grass = new Image();
            grass.onload = function () {
                ctx.save();
                ctx.globalCompositeOperation = 'source-in';
                ctx.drawImage(grass, 0, 0, grass.width, grass.height, 0, 0, canvas.width, canvas.height);
                ctx.restore();
            }
            grass.src = "tex/1.jpg";

        }
        red.src = "tex/msk.png";*/
        if(a_cutom){
            a_context.save();

            //var rad = a_deg * Math.PI / 180;
            //a_context.translate(a_x + a_width / 2, a_y + a_height / 2);
            //a_context.rotate(rad);
            a_context.drawImage(a_msk, a_width/2*(-1), a_height/2*(-1), a_width, a_height);
            a_context.globalCompositeOperation = 'source-in';
            a_context.drawImage(a_img, a_width/2*(-1), a_height/2*(-1), a_width, a_height);

            //a_context.rotate(-1 * rad)
            //a_context.translate((a_x+a_width/2) * (-1), (a_y + a_height / 2) * (-1));
    
            a_context.restore();
        }
        else {
            a_context.save();

            var rad = a_deg * Math.PI / 180;
            a_context.translate(a_x + a_width / 2, a_y + a_height / 2);
    
            a_context.rotate(rad);
            a_context.drawImage(a_img, a_width/2*(-1), a_height/2*(-1), a_width, a_height);
            a_context.rotate(-1 * rad)
            a_context.translate((a_x+a_width/2) * (-1), (a_y + a_height / 2) * (-1));
    
            a_context.restore();
        }

    },
    grabFrame(){
        this.m_gifRecorder.addFrame(this.m_canvas, {delay: this.m_recTimeout, copy: true});
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
        this.m_renderStarted = true;
        this.m_gifRecorder.render();
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
        

        if(this.m_faceIsCustom){
            this.m_faceMask = new Image();
            this.m_faceMask.src = this.m_faceMaskSrc;
/*
            var red = new Image();
        red.onload = function () {
            canvas.width = red.width;
            canvas.height = red.height;
            ctx.drawImage(red, 0, 0);

            var grass = new Image();
            grass.onload = function () {
                ctx.save();
                ctx.globalCompositeOperation = 'source-in';
                ctx.drawImage(grass, 0, 0, grass.width, grass.height, 0, 0, canvas.width, canvas.height);
                ctx.restore();
            }
            grass.src = "tex/1.jpg";

        }
        red.src = "tex/msk.png";*/

        }
        else {

        }
       

        this.m_gifRecorder = new GIF({
            workers: this.m_recoderWorcers,
            quality: this.m_recoderQuality,
            dither: 'FloydSteinberg'
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
BeachScene.m_halfCount =  BeachScene.m_framesCount/2;
BeachScene.m_iterationN = 0;
BeachScene.m_faceAngle = 0;
BeachScene.m_facePosX = 160;
BeachScene.m_facePosY = 290;
BeachScene.m_faceW = 100;
BeachScene.m_faceH = 150;
BeachScene.m_renderStarted = false;
BeachScene.m_playTimeout = 70;
BeachScene.m_recTimeout = 120,
BeachScene.m_text = '';
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
BeachScene.grabFrame = function(){
    if(BeachScene.m_iterationN % 2) this.m_gifRecorder.addFrame(this.m_canvas, {delay: this.m_recTimeout, copy: true});
}

var StarScene = Object.create(Scene);

StarScene.m_framesCount =  43;
StarScene.m_halfCount =  StarScene.m_framesCount/2;
StarScene.m_iterationN = 0;
StarScene.m_faceAngle = 5;
StarScene.m_facePosX = 500;
StarScene.m_facePosY = 270;
StarScene.m_faceW = 100;
StarScene.m_faceH = 150;
StarScene.m_renderStarted = false;
StarScene.m_playTimeout = 70;
StarScene.m_recTimeout = 120,
StarScene.m_text = '';
StarScene.m_textX = 500;
StarScene.m_textY = 90;
StarScene.m_canvasFont = "bold 40px Arial";
StarScene.m_canvastextAlign = "center";
StarScene.m_canvasFillStyle = "#9c27b0";

StarScene.initStages = function(){
    
}
StarScene.updatePositions = function(){
    //update iterations
    if(this.m_iterationN == this.m_framesCount -1) this.m_iterationN = 0;
    else this.m_iterationN++;

    var angleConst = 20;
    //update face angle amd pos
    if(this.m_iterationN >= 0 && this.m_iterationN < this.m_halfCount){
        this.m_facePosX += 1;
        this.m_faceAngle += 1;
    }else if(this.m_iterationN >= this.m_halfCount && this.m_iterationN < this.m_framesCount){
        this.m_facePosX -= 1;
        this.m_faceAngle -= 1;
    }
    if(this.m_iterationN == 0) {
        this.m_faceAngle = 5;
        this.m_facePosX = 500;
    }
}
StarScene.grabFrame = function(){
    if(this.m_iterationN % 2) this.m_gifRecorder.addFrame(this.m_canvas, {delay: this.m_recTimeout, copy: true});
}


var CheerScene = Object.create(Scene);

CheerScene.m_framesCount =  11;
CheerScene.m_halfCount =  CheerScene.m_framesCount/2;
CheerScene.m_iterationN = 0;
CheerScene.m_faceAngle = 5;
CheerScene.m_facePosX = 490;
CheerScene.m_facePosY = 240;
CheerScene.m_faceW = 100;
CheerScene.m_faceH = 150;
CheerScene.m_renderStarted = false;
CheerScene.m_playTimeout = 70;
CheerScene.m_recTimeout = 70,
CheerScene.m_text = '';
CheerScene.m_textX = 500;
CheerScene.m_textY = 160;
CheerScene.m_canvasFont = "bold 40px Arial";
CheerScene.m_canvastextAlign = "center";
CheerScene.m_canvasFillStyle = "#9c27b0";

CheerScene.initStages = function(){
    this.m_stages.push((this.m_framesCount) / 4);
    this.m_stages.push((this.m_framesCount) / 4 * 2);
    this.m_stages.push((this.m_framesCount) / 4 * 3);
    this.m_stages.push((this.m_framesCount) / 4 * 4);
}
CheerScene.updatePositions = function(){
    //update iterations
    if(this.m_iterationN == this.m_framesCount -1) this.m_iterationN = 0;
    else this.m_iterationN++;

    var deltaFaceX = 2,
        deltaFaceY = 3;
    if(this.m_iterationN >= 0 && this.m_iterationN < this.m_stages[0]){
        this.m_facePosY -= deltaFaceY;
        this.m_facePosX -= deltaFaceX;
    }else if(this.m_iterationN >= this.m_stages[0] && this.m_iterationN < this.m_stages[1]){
        this.m_facePosY += deltaFaceY;
        this.m_facePosX -= deltaFaceX;
    }else if(this.m_iterationN >= this.m_stages[1] && this.m_iterationN < this.m_stages[2]){
        this.m_facePosY -= deltaFaceY;
        this.m_facePosX += deltaFaceX;
    }else if(this.m_iterationN >= this.m_stages[2] && this.m_iterationN < this.m_stages[3]){
        this.m_facePosY += deltaFaceY;
        this.m_facePosX += deltaFaceX;
    }

    if(this.m_iterationN == 0){
        this.m_facePosX = 490;
        this.m_facePosY = 240;
    }
}


var RocketScene = Object.create(Scene);

RocketScene.m_framesCount =  41;
RocketScene.m_halfCount =  RocketScene.m_framesCount/2;
RocketScene.m_iterationN = 0;
RocketScene.m_faceAngle = 5;
RocketScene.m_facePosX = 500;
RocketScene.m_facePosY = 60;
RocketScene.m_faceW = 100;
RocketScene.m_faceH = 150;
RocketScene.m_renderStarted = false;
RocketScene.m_playTimeout = 70;
RocketScene.m_recTimeout = 120,
RocketScene.m_text = '';
RocketScene.m_textX = 500;
RocketScene.m_textY = 630;
RocketScene.m_canvasFont = "600 70px Tahoma";
RocketScene.m_canvastextAlign = "center";
RocketScene.m_canvasFillStyle = "#fff";

RocketScene.initStages = function(){
    this.m_stages.push((this.m_framesCount) / 4);
    this.m_stages.push((this.m_framesCount) / 4 * 2);
    this.m_stages.push((this.m_framesCount) / 4 * 3);
    this.m_stages.push((this.m_framesCount) / 4 * 4);
}
RocketScene.updatePositions = function(){
    //update iterations
    if(this.m_iterationN == this.m_framesCount -1) this.m_iterationN = 0;
    else this.m_iterationN++;

    var deltaFaceX = 1.5,
        deltaFaceY = 3;
    if(this.m_iterationN >= 0 && this.m_iterationN < this.m_stages[0]){
        this.m_facePosY += deltaFaceY;
        this.m_facePosX += deltaFaceX;
    }else if(this.m_iterationN >= this.m_stages[0] && this.m_iterationN < this.m_stages[1]){
        this.m_facePosY -= deltaFaceY;
        this.m_facePosX -= deltaFaceX;
    }else if(this.m_iterationN >= this.m_stages[1] && this.m_iterationN < this.m_stages[2]){
        this.m_facePosY += deltaFaceY;
        this.m_facePosX += deltaFaceX * 2;
    }else if(this.m_iterationN >= this.m_stages[2] && this.m_iterationN < this.m_stages[3]){
        this.m_facePosY -= deltaFaceY;
        this.m_facePosX -= deltaFaceX * 2;
    }

    if(this.m_iterationN == 0){
        this.m_facePosX = 500;
        this.m_facePosY = 60;
    }
}

RocketScene.grabFrame = function(){
    if(this.m_iterationN % 2) this.m_gifRecorder.addFrame(this.m_canvas, {delay: this.m_recTimeout, copy: true});
}

var CityScene = Object.create(Scene);

CityScene.m_framesCount =  75;
CityScene.m_halfCount =  CityScene.m_framesCount/2;
CityScene.m_iterationN = 0;
CityScene.m_faceAngle = -5;
CityScene.m_facePosX = -150;
CityScene.m_facePosY = 230;
CityScene.m_faceW = 150;
CityScene.m_faceH = 220;
CityScene.m_renderStarted = false;
CityScene.m_playTimeout = 70;
CityScene.m_recTimeout = 120,
CityScene.m_text = '';
CityScene.m_textX = 500;
CityScene.m_textY = 80;
CityScene.m_canvasFont = "600 50px Tahoma";
CityScene.m_canvastextAlign = "center";
CityScene.m_canvasFillStyle = "#fff";

CityScene.initStages = function(){
    this.m_stages.push(6);
    this.m_stages.push(10);
    this.m_stages.push(20);
    this.m_stages.push(30);
    this.m_stages.push(40);
    this.m_stages.push(50);
    this.m_stages.push(60);
}
CityScene.updatePositions = function(){
    //update iterations
    if(this.m_iterationN == this.m_framesCount -1) this.m_iterationN = 0;
    else this.m_iterationN++;

    var deltaFaceX = 1.5,
        deltaFaceY = 3;
    if(this.m_iterationN >= 0 && this.m_iterationN < this.m_stages[0]){
        this.m_facePosX += 65;
    }else if(this.m_iterationN >= this.m_stages[0] && this.m_iterationN < this.m_stages[1]){
        this.m_facePosX += 20;
    }else if(this.m_iterationN >= this.m_stages[1] && this.m_iterationN <= this.m_stages[2]){
        this.m_faceAngle += 1;
    }else if(this.m_iterationN >= this.m_stages[2] && this.m_iterationN <= this.m_stages[3]){
        this.m_faceAngle -= 1;
    }else if(this.m_iterationN >= this.m_stages[3] && this.m_iterationN <= this.m_stages[4]){
        this.m_faceAngle += 1;
    }else if(this.m_iterationN >= this.m_stages[4] && this.m_iterationN <= this.m_stages[5]){
        this.m_faceAngle -= 1;
    }else if(this.m_iterationN >= this.m_stages[5] && this.m_iterationN <= this.m_stages[6]){
        this.m_faceAngle += 1;
    }else if(this.m_iterationN >= this.m_stages[6]){
        this.m_facePosX += 120;
    }

    if(this.m_iterationN == 0){
        this.m_facePosX = -150;
        this.m_faceAngle = -5;
    }
}

CityScene.grabFrame = function(){
    if(this.m_iterationN % 2) this.m_gifRecorder.addFrame(this.m_canvas, {delay: this.m_recTimeout, copy: true});
}