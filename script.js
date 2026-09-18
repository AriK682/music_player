//load the song
//get elements we need to control the music player
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//song titles
const songs = ['chill.wav', 'edm.mp3', 'riser.wav', 'tropical.wav'];

//keep track of songs
let songIndex = 2;

//load song in player
function loadSong(song) {
    title.innerText = song;
    //load audio and cover
    audio.src = `music/${song}`;
    //to get cover but without the wav or mp3
    const songName = song.split('.')[0];
    cover.src = `images/${songName}.jpg`;
}

//initially load song details into DOM
loadSong(songs[songIndex]);

//add play and pause controls
function playSong() {
    //add play
    musicContainer.classList.add('play');
    //change play to pause icon
    playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
    //play audio
    audio.play();
}

//add pause controls
function pauseSong() {
    //remove play
    musicContainer.classList.remove('play');
    //change pause to play icon
    playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
    //pause audio
    audio.pause();
}

//event listeners for play and pause
playBtn.addEventListener('click', () => {
    //check if song is playing
    const isPlaying = musicContainer.classList.contains('play');
    //if song is playing, pause it, else play it
    isPlaying ? pauseSong() : playSong();
});

//add next and pervious song logic
function prevSong() {
    //move to previous song, if at first song, go to last song
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    //load the songs
    loadSong(songs[songIndex]);
    //play the song
    playSong();
}

//move to next song, if at last song, go to first song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    //load the songs
    loadSong(songs[songIndex]);
    //play the song
    playSong();
}

//event listeners for next and previous buttons
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//update progress bar
function updateProgress(e) {
    //get duration and current time of song
    const { duration, currentTime } = e.srcElement;
    //calculate percentage of song played
    const percent = (currentTime / duration) * 100;
    //update progress bar width
    progress.style.width = `${percent}%`;
}

//update progress bar as song plays
audio.addEventListener('timeupdate', updateProgress);

//click to seek in track
function setProgress(e) {
    //get width of progress bar and click position
    const width = this.clientWidth;
    const clickX = e.offsetX;
    //set current time of audio based on click position
    audio.currentTime = (clickX / width) * audio.duration;
}

//event listener for click on progress bar
progressContainer.addEventListener('click', setProgress);

//song ends
//move to next song when current song ends
audio.addEventListener('ended', nextSong);