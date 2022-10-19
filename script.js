console.log("Welcome to Play The Beat");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let ProgressBar = document.getElementById('ProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems= Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Gul-Anuv Jain", filepath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
    {songName: "Baarishein-Anuv Jain", filepath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
    {songName: "Alag Aasmaan-Anuv Jain", filepath: "song/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Guncha-Mohit Chauhan", filepath: "song/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Kasoor-Prateek Kuhad", filepath: "song/5.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Ehsaan Tera Hoga Mujhpaar- Sanam", filepath: "song/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Dhaaga-Nilotpaal Bora", filepath: "song/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Chaan Kithaan-Ali Sethi", filepath: "song/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Heartquake-Papon", filepath: "song/9.mp3", coverPath: "covers/9.jpeg"},
    {songName: "Ek Tukda Dhoop- Raghav Chaitanya", filepath: "song/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Roke Na Ruke Naina", filepath: "song/11.mp3", coverPath: "covers/11.jpg"},

]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    ProgressBar.value = progress;
})

ProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
