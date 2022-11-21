let songindex = 0;
let audioelement = new Audio('./imgs/songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let progressbar = document.getElementById('pbbar');
let gif = document.getElementById('gif');
let songitem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "./imgs/songs/1.mp3", coverPath: "imgs/covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "./imgs/songs/2.mp3", coverPath: "imgs/covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "./imgs/songs/3.mp3", coverPath: "imgs/covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "./imgs/songs/4.mp3", coverPath: "imgs/covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "./imgs/songs/5.mp3", coverPath: "imgs/covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "./imgs/songs/6.mp3", coverPath: "imgs/covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "./imgs/songs/7.mp3", coverPath: "imgs/covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "./imgs/songs/8.mp3", coverPath: "imgs/covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "./imgs/songs/9.mp3", coverPath: "imgs/covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "./imgs/songs/10.mp3", coverPath: "imgs/covers/10.jpg"},
]

songitem.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    // let audiotime = new Audio(songs[i].filePath);
    // let a;
    // setTimeout(() => {
    //     a = new Date( audiotime.duration*1000 ).toISOString().slice(14,19);
    //     element.getElementsByClassName('timestamp')[0].innerHTML = `${a} <i id=${i} class="far songItemPlay fa-play-circle"></i>`;
    // }, 1000);
})

// event added to change pasue and play button
masterplay.addEventListener('click',()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        document.getElementById('infoname').innerText = `${songs[songindex].songName}`;
    }
    else{
        audioelement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// event added for getting time progressed
audioelement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioelement.currentTime/audioelement.duration)*100);
    progressbar.value = progress;
})

// event to take to duration if changes by progressbar
progressbar.addEventListener('change',()=>{
    audioelement.currentTime = (progressbar.value*audioelement.duration)/100; 
})

console.log(Array.from(document.getElementsByClassName('songItemPlay')));

// event to run other songs
const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
const makechanges = (id)=>{
    id = parseInt(id);
    audioelement.currentTime = 0;
    audioelement.src = `./imgs/songs/${id+1}.mp3`
    masterplay.classList.add('fa-pause-circle');
    masterplay.classList.remove('fa-play-circle');
    document.getElementById('infoname').innerText = `${songs[id].songName}`;
    audioelement.play();
    gif.style.opacity = 1;
}


// audio ended play next song from the list 
audioelement.addEventListener('ended',()=>{
    songindex ++;
    if(songindex >= 10){
        songindex = 0;
    }
    makechanges(songindex);
});

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        songindex = parseInt(e.target.id);
        console.log(e.target.id);
        makeallplays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        makechanges(e.target.id);
        audioelement.play();
    })
})


// previous and next button 
document.getElementById('prev').addEventListener('click',()=>{
    if(songindex > 0){
        songindex --;
        console.log(songindex);
        makechanges(songindex);
    }
})
document.getElementById('forward').addEventListener('click',()=>{
    if(songindex < 9){
        songindex ++;
        console.log(songindex);
        makechanges(songindex);
    }
})