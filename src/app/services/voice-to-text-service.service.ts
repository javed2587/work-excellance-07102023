import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var webkitSpeechRecognition: any;
@Injectable({
  providedIn: 'root'
})
export class VoiceToTextServiceService {

  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords:any;
  // lastTempWords: any
  // firstTempWord: Boolean = true
  constructor() { }
  temp: Boolean = true
  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    // this.recognition.addEventListener('result', (e:any) => {
    //   const transcript = Array.from(e.results)
    //   .map((result) => e.results)
    //     .map((result) => result[0])
    //     .join('');
    //   this.tempWords = e.results[0][0]['transcript'];
    //   if (this.firstTempWord){
    //     this.lastTempWords = this.tempWords
    //     this.firstTempWord = false
    //     this.text = this.text + ' ' + this.tempWords + '';
    //   }
    //   this.temp = this.tempWords == this.lastTempWords ? false: true
    //   if(this.temp){
    //     this.lastTempWords = this.tempWords
    //     this.text = this.text + ' ' + this.tempWords + '';
    //     this.temp = false
    //   }
    //   console.log(e.results[0][0]['transcript']);
    // });
    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition:any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.text = ''
    this.recognition.stop();
    console.log("End speech recognition")
  }
  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '';
    this.tempWords = '';
  }

  
}
