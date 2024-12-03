console.log("Let's write Javascript");
let currentSong = new Audio();
let songs;

function secondsToMinutes(seconds){
    if(isNaN(seconds) || seconds < 0){
        return "Invalid";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs() {
    let a = await fetch("http://127.0.0.1:3001/songs/")
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
        
        
    }
    return songs
}

const playMusic = (track, pause = false)=>{
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track
    if(!pause){
        currentSong.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main(){

    
    //get the list of all the songs
    let songs = await getsongs()

    playMusic(songs[0], true)
    
    //Show all the songs in the playlist
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {

        const songName1 = decodeURIComponent(song);
        // const artist = songName1.split(" - ")[1] || songName1;
        const songName2 = songName1.split(" - ")[0] + ".mp3";

        songul.innerHTML = songul.innerHTML + `<li><img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div>${song.replaceAll("%20"," ")}</div><br>
                  <div>${artist(songName1)}</div>
                  
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="playsong.svg" alt="">
                </div>
        </li>`;
    }

    //play the first song
    // var audio = new Audio(songs[0]);
    // audio.play();
    
    // audio.addEventListener("loadeddata",() => {
    //     let duration = audio.duration;
    //     console.log(audio.duration, audio.currentSrc)
    // });


    //Attach an event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    //Attach an event listener to play, next and previous
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "playsong.svg"
        }
    })

    //Listen for timeupdate event
    currentSong.addEventListener("timeupdate", ()=>{
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutes(currentSong.currentTime)}/${secondsToMinutes(currentSong.duration)}`
        document.querySelector(".circle2").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    //Add an event listener for seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle2").style.left = percent + "%"
        currentSong.currentTime = (currentSong.duration * percent) / 100
    })

    //Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = 0;
        
    })

    //Add an event listener for close
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-140%";
    })

    //Add an event listener to previous
    previous.addEventListener("click", ()=>{
        let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
        if((index-1) >= 0){
            playMusic(songs[index - 1])
        }
    })

    //Add an event listener to next
    next.addEventListener("click", ()=>{
        let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
        if((index+1) < songs.length){
            playMusic(songs[index + 1])
        }
    })

    //Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
        currentSong.volume = parseInt(e.target.value) / 100
    })

    function artist(songName1){
        if(songName1 == "Bade Achhe Lagte Hai.mp3"){
            return "Amit Kumar";
        }
        else if(songName1 == "Gaata rahe mera dil.mp3"){
            return "Kishor Kumar";
        }
        else if(songName1 == "HIGH ON ME.mp3"){
            return "Honey Singh";
        }
        else if(songName1 == "Kabira.mp3"){
            return "Arijit Singh";
        }
        else if(songName1 == "Kya se kya ho gaya bewafa.mp3"){
            return "Mohd. Rafi";
        }
        else if(songName1 == "Pal Pal Dil Ke Paas Tum Rehti Ho.mp3"){
            return "Kishor Kumar";
        }
        else if(songName1 == "Tere mere sapne.mp3"){
            return "Mohd. Rafi";
        }
        else if(songName1 == "Tum hi ho.mp3"){
            return "Arijit Singh";
        }
        
    }

}
 
main()