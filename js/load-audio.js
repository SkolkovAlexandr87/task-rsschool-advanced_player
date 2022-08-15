const audio = document.querySelector("audio");
const buttonPlayPause = document.querySelector(".button-play-pause");
const conclusionNameArtist = document.querySelector(".name-artist");
const conclusionNameSong = document.querySelector(".name-song");
const buttonPrev = document.querySelector(".button-prev");
const buttonNext = document.querySelector(".button-next");
const mainContainer = document.querySelector(".main-container");


const timeBar = document.querySelector(".time-bar");
const slider = document.querySelector(".slider");

const widthSlider = parseInt(window.getComputedStyle(slider).width);
const widthBar = parseInt(window.getComputedStyle(timeBar).width);



const artistBeyonce = new Artist("Beyonce", "Don't Hurt YourSelf", "audio/beyonce.mp3", "img/lemonade.png");
const artistDuaLipa = new Artist("Dua Lipa", "Don't Start Now", "audio/dontstartnow.mp3", "img/dontstartnow.png");
const artistJustus = new Artist("Justus", "Satisfaction-Remix-2022", "audio/Benny_Benassi_-_SatisfactionJustus_Remix.mp3", "img/satisfaction-remix.jpg");
const artistShatunov = new Artist("Yurij Shatunov", "Belye Rozy", "audio/Yurijj_SHatunov_-_Belye_rozy.mp3", "img/Yurij_Shatunov-Belye_rozy.jpg");


const arrArtists = [artistDuaLipa, artistBeyonce, artistJustus, artistShatunov ];

let flagPlayPause = false;
let count = 0;

let audioDuration;

conclusionNameArtist.innerHTML = arrArtists[count].nameArtist;
conclusionNameSong.innerHTML = arrArtists[count].nameSong;


function Artist(nameArtist, nameSong, srcSong, srcImage) {
    this.nameArtist = nameArtist;
    this.nameSong = nameSong;
    this.srcSong = srcSong;
    this.srcImage = srcImage;
};


buttonPlayPause.addEventListener('click', playAndPause);

function playAndPause() {
    if(audio.readyState < 2) return;

    if(!flagPlayPause) {
       flagPlayPause = true;
       audio.play();
       buttonPlayPause.classList.add('pause');
    } else {
       flagPlayPause = false;
       audio.pause();
       buttonPlayPause.classList.remove('pause');
    }
 }


 timeBar.addEventListener('click', e => {
    if(audio.readyState > 2) {
      audio.currentTime = e.offsetX / widthBar * audio.duration;
      slider.style.left = e.offsetX - widthSlider / 2 + "px" ;
    }

 });



buttonNext.addEventListener('click', clickNextArtist);
buttonPrev.addEventListener('click', clickPrevArtist);

function clickNextArtist() {

    if(audio.readyState < 2) return;

    count++;

    if(count > arrArtists.length - 1) count = 0;

    changePicture(count);
    changeDescriptionSong(count);
    changeSongSrc(count);

    if(flagPlayPause) {
      audio.play();
    }
}

function clickPrevArtist() {

    if(audio.readyState < 2) return;

    count--;

    if(count < 0) count = arrArtists.length - 1;

    changePicture(count);
    changeDescriptionSong(count);
    changeSongSrc(count);

    if(flagPlayPause) {
      audio.play();
    }
}

function changePicture(count) {

    mainContainer.style.backgroundImage = `url(${arrArtists[count].srcImage})`;
    document.querySelector('.picture-sound').src = arrArtists[count].srcImage;

}

function changeDescriptionSong(count) {
    conclusionNameArtist.innerHTML = arrArtists[count].nameArtist;
    conclusionNameSong.innerHTML = arrArtists[count].nameSong;
}

function changeSongSrc(count) {
    audio.src = arrArtists[count].srcSong;
   
}

audio.addEventListener("loadeddata", function() {
   
    if(this.readyState >= 2) {
      audio.currentTime = 0;

    }
    
}, false);  
 
    const divExamination = document.querySelector(".examination");
     
 
    setInterval(() => {

        divExamination.innerHTML = `${parseInt(audio.currentTime)} <br> ${parseInt(audio.duration)} <br> ${audio.readyState}`
        
        if(audio.readyState < 2) return; 

        if(audio.currentTime == audio.duration) {

          count++;

          if(count > arrArtists.length - 1) count = 0;

          changePicture(count);
          changeDescriptionSong(count);
          changeSongSrc(count);

          audio.play();
          }
    
        
        slider.style.left = (audio.currentTime /  audio.duration * widthBar) - (widthSlider / 2) + "px";
        
    },300);

    



