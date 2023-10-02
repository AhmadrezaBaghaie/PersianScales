// script.js
let baseUrl;
if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
    // Use the local server URL
    baseUrl = "http://127.0.0.1:8080"; // Replace with your local server URL
} else {
    // Use the GitHub Pages URL
    baseUrl = "https://ahmadrezabaghaie.github.io/PersianScales"; // Replace with your GitHub Pages URL
}

// Construct the full URL for the JSON file
const jsonUrl = `${baseUrl}/scales.json?_=${new Date().getTime()}`;

document.addEventListener("DOMContentLoaded", function () {
    // Load scale data from JSON file
    fetch(jsonUrl) // Relative path to the JSON file
        .then(response => response.json())
        .then(data => {
			console.log(data);
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
				
				
				const scaleButton = document.createElement("button");
				scaleButton.classList.add("scale-button");
				scaleButton.textContent = "Scale"; // You can change the button text if needed

				// Define a flag to track whether the scale is currently playing
				let isScalePlaying = false;

				scaleButton.addEventListener("click", function () {
					
					// Check if the scale is already playing; if so, don't do anything
					if (isScalePlaying) {
						return;
					}

					// Set the flag to indicate that the scale is playing
					isScalePlaying = true;
					
					// Create an AudioContext
					const audioContext = new (window.AudioContext || window.webkitAudioContext)();

					// Access the frequencies for the current scale
					const frequencies = scale.frequencies; // This should be inside the loop

					// Create an index to keep track of the current frequency
					let currentIndex = 0;

					// Function to play the next frequency
					function playNextFrequency() {
						if (currentIndex < frequencies.length) {
							const frequency = frequencies[currentIndex];

							const oscillator = audioContext.createOscillator();
							oscillator.type = "sine"; // You can change the waveform type if needed
							oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

							oscillator.connect(audioContext.destination);

							// Start the oscillator
							oscillator.start();

							// Stop the oscillator after half a second (0.5 seconds)
							oscillator.stop(audioContext.currentTime + 1); // Adjust the duration as needed

							// Increment the index to play the next frequency
							currentIndex++;

							// Schedule the next frequency to be played
							setTimeout(playNextFrequency, 1050); // Delay for half a second before playing the next frequency
							
							// Check if all frequencies have been played
							if (currentIndex === frequencies.length) {
								// Reset the flag to indicate that playback is complete
								isScalePlaying = false;
							}
						}
					}

					// Start playing frequencies
					playNextFrequency();
				});

				
				

                scaleDiv.appendChild(img);
                scaleDiv.appendChild(audio);
                scaleDiv.appendChild(playButton);
                scaleDiv.appendChild(pauseButton);
                scaleDiv.appendChild(stopButton);
				scaleDiv.appendChild(speedButton);
				scaleDiv.appendChild(scaleButton);

                scalesContainer.appendChild(scaleDiv);
            });
        })
        .catch(error => console.error(error));
});
