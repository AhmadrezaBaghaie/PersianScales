// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Load scale data from JSON file
    fetch("http://127.0.0.1:8080/scales.json") // Relative path to the JSON file
        .then(response => response.json())
        .then(data => {
            const scalesContainer = document.getElementById("scales-container");

            data.forEach(scale => {
                const scaleDiv = document.createElement("div");
                scaleDiv.classList.add("scale");

                const img = document.createElement("img");
                img.src = scale.image;
                img.alt = scale.name;

                const audio = document.createElement("audio");
                audio.src = scale.audio;

                const playButton = document.createElement("button");
                playButton.classList.add("play-button");
                playButton.textContent = "Play";

                const pauseButton = document.createElement("button");
                pauseButton.classList.add("pause-button");
                pauseButton.textContent = "Pause";
                pauseButton.style.display = "none";

                const stopButton = document.createElement("button");
                stopButton.classList.add("stop-button");
                stopButton.textContent = "Stop";

                playButton.addEventListener("click", function () {
                    audio.play();
                    playButton.style.display = "none";
                    pauseButton.style.display = "inline";
                    stopButton.style.display = "inline";
                });

                pauseButton.addEventListener("click", function () {
                    audio.pause();
                    playButton.style.display = "inline";
                    pauseButton.style.display = "none";
                    stopButton.style.display = "inline";
                });

                stopButton.addEventListener("click", function () {
                    audio.pause();
                    audio.currentTime = 0; // Rewind to the beginning
                    playButton.style.display = "inline";
                    pauseButton.style.display = "none";
                    stopButton.style.display = "inline";
                });

                audio.addEventListener("ended", function () {
                    playButton.style.display = "inline";
                    pauseButton.style.display = "none";
                    stopButton.style.display = "inline";
                });
				
				
				const speedButton = document.createElement("button");
				speedButton.classList.add("speed-button");
				speedButton.textContent = "2x Speed";

				speedButton.addEventListener("click", function () {
					if (audio.playbackRate === 1) {
						audio.playbackRate = 2; // Set playback rate to 2x (double speed)
						speedButton.style.fontWeight = "bold"; // Set the text to bold
					} else {
						audio.playbackRate = 1; // Reset to normal speed
						speedButton.style.fontWeight = "normal"; // Set the text to normal
					}
				});
				

                scaleDiv.appendChild(img);
                scaleDiv.appendChild(audio);
                scaleDiv.appendChild(playButton);
                scaleDiv.appendChild(pauseButton);
                scaleDiv.appendChild(stopButton);
				scaleDiv.appendChild(speedButton);

                scalesContainer.appendChild(scaleDiv);
            });
        })
        .catch(error => console.error(error));
});
