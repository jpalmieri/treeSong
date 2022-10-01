class Microphone(){
    constructor(){
        this.initialized = falese;
        navigator.mediaDevices.getUserMedia(audio:true)
        .then(function(stream){
            this.audioContext = new AudioContext();
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 512;
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array (bufferLength);
            this.microphone.connect(this.analyser);
            this.initialized = true;

        }.bind(this)).catch (function(err){
            alert(err);
        });
    }
    getSample(){
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e = > e/128-1);
    }

    getVolume(){
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSample = [...this.dataArray].map(e=>128-1);
        let sum = 0;
        for (let i = 0; i< normSample.length;i ++){
            sum += normSamples[i]*normSample[i];
        }
        let volumn = Math.sqrt(sum/normSample.length);
        return volumn;
    }
} 
