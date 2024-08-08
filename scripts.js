// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('fileInput');
    var videoPlayer = document.getElementById('videoPlayer');

    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var fileURL = URL.createObjectURL(file);
            videoPlayer.src = fileURL;
            videoPlayer.style.display = 'block';
            videoPlayer.play();
        }
    });
});
