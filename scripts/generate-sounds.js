const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Create the sounds directory if it doesn't exist
const soundsDir = path.join(__dirname, '../public/sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// Function to create a simple HTML file that generates a sound and downloads it
function createSoundGenerator(frequency, duration, type, filename) {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Sound Generator</title>
</head>
<body>
  <button id="generate">Generate and Download Sound</button>
  
  <script>
    document.getElementById('generate').addEventListener('click', async () => {
      // Create an audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create an oscillator
      const oscillator = audioContext.createOscillator();
      oscillator.type = '${type}'; // sine, square, sawtooth, triangle
      oscillator.frequency.setValueAtTime(${frequency}, audioContext.currentTime); // value in hertz
      
      // Create a gain node (for volume control)
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime); // Set volume to 30%
      
      // Connect the oscillator to the gain node and the gain node to the destination
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Start the oscillator
      oscillator.start();
      
      // Stop the oscillator after the specified duration
      setTimeout(() => {
        oscillator.stop();
        
        // Create a MediaRecorder to record the audio
        const dest = audioContext.createMediaStreamDestination();
        const oscillator2 = audioContext.createOscillator();
        oscillator2.type = '${type}';
        oscillator2.frequency.setValueAtTime(${frequency}, audioContext.currentTime);
        
        const gainNode2 = audioContext.createGain();
        gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(dest);
        
        const mediaRecorder = new MediaRecorder(dest.stream);
        const chunks = [];
        
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/mp3' });
          const url = URL.createObjectURL(blob);
          
          const a = document.createElement('a');
          a.href = url;
          a.download = '${filename}';
          a.click();
        };
        
        mediaRecorder.start();
        oscillator2.start();
        
        setTimeout(() => {
          oscillator2.stop();
          mediaRecorder.stop();
        }, ${duration});
      }, 100);
    });
  </script>
</body>
</html>
  `;
  
  return htmlContent;
}

// Create HTML files for different sounds
const sounds = [
  { frequency: 440, duration: 200, type: 'sine', filename: 'click.mp3' },
  { frequency: 880, duration: 1000, type: 'sine', filename: 'success.mp3' },
  { frequency: 220, duration: 500, type: 'sawtooth', filename: 'error.mp3' }
];

// Since we can't directly generate audio files in Node.js, we'll create placeholder files
sounds.forEach(sound => {
  const filePath = path.join(soundsDir, sound.filename);
  
  // Create a small placeholder MP3 file
  const buffer = Buffer.from([
    0xFF, 0xFB, 0x90, 0x44, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ]);
  
  fs.writeFileSync(filePath, buffer);
  console.log(`Created placeholder sound file: ${sound.filename}`);
});

console.log('Sound files created successfully!');
console.log('Note: These are placeholder files. For real sound effects, you should use proper audio files.'); 