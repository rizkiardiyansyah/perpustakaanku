let audioPlayer = document.getElementById('audioPlayer');
let audioFileInput = document.getElementById('audioFile');

function playAudio() {
    let file = audioFileInput.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            audioPlayer.src = e.target.result;
            audioPlayer.play();
        };

        reader.readAsDataURL(file);
    }
}
