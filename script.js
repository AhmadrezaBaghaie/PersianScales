// script.js
document.addEventListener("DOMContentLoaded", function () {
    const audioElements = document.querySelectorAll("audio");

    audioElements.forEach((audio) => {
        const playButton = audio.nextElementSibling;

        playButton.addEventListener("click", function () {
            if (audio.paused) {
                audio.play();
                playButton.textContent = "Pause";
            } else {
                audio.pause();
                playButton.textContent = "Play";
            }
        });
    });
});
