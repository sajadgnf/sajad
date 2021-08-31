var $ = document

function _id(id_name) {
    return $.getElementById(id_name)
}

function _class(class_name) {
    return $.getElementsByClassName(class_name)
}

var audioPlay = _id("audio")
var background = _id("background")
var title = _id("musicName")
var artistName = _id("singerName")
var prevBtn = _id("prev")
var playBtn = _id("play")
var nextBtn = _id("next")
var image = _id("cover")
var currentTimeEl = _id('current_time')
var durationEl = _id('duration')
var progress = _id('progress')
var progressContainer = _id("progress_container")

var songsArray = [
    {
        path: 'assets/songs/1.mp3',
        cover: 'assets/images/roqaye.jpg',
        name: 'Nagofti Dokhtari',
        artist: 'Seyed Amir'
    },

    {
        path: 'assets/songs/2.mp3',
        cover: 'assets/images/beynolHaram.jpg',
        name: 'Havaye In Roza',
        artist: 'Seyed Amir'
    },

    {
        path: 'assets/songs/3.mp3',
        cover: 'assets/images/haram.jfif',
        name: 'Hosein Jan',
        artist: 'Seyed Amir'
    },

    {
        path: 'assets/songs/4.mp3',
        cover: 'assets/images/seyed.jfif',
        name: 'Aqaye Man',
        artist: 'Seyed Amir'
    },

]

// check If Playing
let isPlaying = false

// play
function playSong() {
    isPlaying = true
    audioPlay.play()
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", "pause")
}

// pause
function pauseSong() {
    isPlaying = false
    audioPlay.pause()
    playBtn.classList.replace("fa-pause", "fa-play")
    playBtn.setAttribute("title", "play")
}

// play and Pause Event
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()))

// updaye DOM
function loadSong(song) {
    title.textContent = song.name
    artistName.textContent = song.artist
    audioPlay.src = song.path
    changeCover(song.cover)
}

function changeCover(cover) {
    image.classList.remove("active")
    setTimeout(() => {
        image.src = cover
        image.classList.add("active")
    }, 100)
    background.src = cover
}

// Current Song
var songIndex = 0

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songsArray.length - 1
    }
    loadSong(songsArray[songIndex])
    playSong()

}

function nextSong() {
    songIndex++
    if (songIndex > songsArray.length - 1) {
        songIndex = 0
    }
    loadSong(songsArray[songIndex])
    playSong()
}

// song duration
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.target

        // progress
        const progressBar = (currentTime / duration) * 100
        progress.style.width = progressBar + "%"

        // duration Progress
        const durationMinuts = Math.floor(duration / 60)
        let durationSecunds = Math.floor(duration % 60)
        if (durationSecunds < 10) {
            durationSecunds = "0" + durationSecunds
        }
        durationEl.textContent = durationMinuts + ":" + durationSecunds


        // currentTime progress
        const currentMinuts = Math.floor(currentTime / 60)
        let currentSecunds = Math.floor(currentTime % 60)
        if (currentSecunds < 10) {
            currentSecunds = "0" + currentSecunds
        }

        currentTimeEl.textContent = currentMinuts + ":" + currentSecunds
    }
}

// set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration} = audioPlay
    audioPlay.currentTime = (clickX / width) * duration
}

//Event listener
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)
audioPlay.addEventListener("ended", nextSong)
audioPlay.addEventListener("timeupdate", updateProgressBar)
progressContainer.addEventListener("click", setProgressBar)


