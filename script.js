console.log("Let's write Javascript");
let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    //Show all the songs in the playlist
    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUl.innerHTML = ""
    for (const song of songs) {

        const songName1 = decodeURIComponent(song);
        // const artist = songName1.split(" - ")[1] || songName1;
        const songName2 = songName1.split(" - ")[0] + ".mp3";

        songUl.innerHTML = songUl.innerHTML + `<li><img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div>${song.replaceAll("%20", " ")}</div><br>
                  <div>${artist(songName1)}</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="playsong.svg" alt="">
                </div> </li>`;
    }

    //Attach an event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    return songs
}

function artist(songName1) {
    if (songName1 == "Bade Achhe Lagte Hai.mp3") {
        return "Amit Kumar";
    }
    else if (songName1 == "Gaata rahe mera dil.mp3") {
        return "Kishor Kumar";
    }
    else if (songName1 == "HIGH ON ME.mp3") {
        return "Honey Singh";
    }
    else if (songName1 == "Kabira.mp3") {
        return "Arijit Singh";
    }
    else if (songName1 == "Kya se kya ho gaya bewafa.mp3") {
        return "Mohd. Rafi";
    }
    else if (songName1 == "Pal Pal Dil Ke Paas Tum Rehti Ho.mp3") {
        return "Kishor Kumar";
    }
    else if (songName1 == "Tere mere sapne.mp3") {
        return "Mohd. Rafi";
    }
    else if (songName1 == "Tum hi ho.mp3") {
        return "Arijit Singh";
    }
    else if (songName1 == "aaoge jab tum.mp3") {
        return "Pritam";
    }
    else if (songName1 == "Tu Hi Mera.mp3") {
        return "Pritam";
    }
    else if (songName1 == "Tujhe Sochta Hoon.mp3") {
        return "Pritam";
    }
    else if (songName1 == "Tum Jo Aaye.mp3") {
        return "Pritam";
    }
    else if (songName1 == "tum se hi.mp3") {
        return "Pritam";
    }else if (songName1 == "Apna Bana Le.mp3") {
        return "Sachin-Jigar";
    }
    else if (songName1 == "Jeena Jeena.mp3") {
        return "Sachin-Jigar";
    }
    else if (songName1 == "Jeene Laga Hoon.mp3") {
        return "Sachin-Jigar";
    }
    else if (songName1 == "Rang Jo Lagyo.mp3") {
        return "Sachin-Jigar";
    }
    else if (songName1 == "Tere Vaaste.mp3") {
        return "Sachin-Jigar";
    }
    else if (songName1 == "Hamari Adhuri Kahani.mp3") {
        return "Arijit Singh";
    }
    else if (songName1 == "Humdard.mp3") {
        return "Arijit Singh";
    }
    else if (songName1 == "RAAZ AANKHEIN TERI.mp3") {
        return "Arijit Singh";
    }
    else if (songName1 == "Tujhe Kitna Chahne Lage.mp3") {
        return "Arijit Singh";
    }
    else if (songName1 == "Tum Hi Ho.mp3") {
        return "Arijit Singh";
    }
    else if (songName1 == "Dil Diyan Gallan.mp3") {
        return "Atif Aslam";
    }
    else if (songName1 == "Main Rang Sharbaton Ka.mp3") {
        return "Atif Aslam";
    }
    else if (songName1 == "Piya O Re Piya.mp3") {
        return "Atif Aslam";
    }
    else if (songName1 == "Tera Hone Laga Hoon.mp3") {
        return "Atif Aslam";
    }
    else if (songName1 == "Tere Sang Yaara.mp3") {
        return "Atif Aslam";
    }
    else if (songName1 == "Aye Ajnabi.mp3") {
        return "A.R. Rahman";
    }
    else if (songName1 == "Khwaja Mere Khwaja.mp3") {
        return "A.R. Rahman";
    }
    else if (songName1 == "Jashn-E-Bahaaraa.mp3") {
        return "A.R. Rahman";
    }
    else if (songName1 == "Taal Se Taal Mila.mp3") {
        return "A.R. Rahman";
    }
    else if (songName1 == "Tum Tak.mp3") {
        return "A.R. Rahman";
    }
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track)
    currentSong.src = `/${currFolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {


    //get the list of all the songs
    await getsongs(`songs`)
    playMusic(songs[0], true)

    //play the first song
    //  var audio = new Audio(songs[0]);
    //  audio.play();

    //  audio.addEventListener("loadeddata",() => {
    //      let duration = audio.duration;
    //      console.log(audio.duration, audio.currentSrc)
    //  });

    //Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "playsong.svg"
        }
    })

    //Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle2").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    //Add an event listener for seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle2").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })


    //Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;

    })

    //Add an event listener for close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-140%";
    })

    //Add an event listener to previous
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    //Add an event listener to next
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    //Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100
    })

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e=>{ 
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })

    //Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click", async item=>{
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            
        })
    })
}

main()