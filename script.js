const canvas = document.getElementById('posterCanvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const downloadBtn = document.getElementById('downloadBtn');

const poster = new Image();

// Spck Editor में फाइल का नाम बिल्कुल सही होना चाहिए
poster.src = 'bg.jpg'; 

// यह चेक करने के लिए कि पोस्टर लोड हुआ या नहीं
poster.onload = function() {
    console.log("Poster loaded!");
    drawEverything();
};

poster.onerror = function() {
    alert("Alert: 'bg.jpg' फाइल नहीं मिली! Spck Editor में चेक करें कि फाइल का नाम सही है या नहीं।");
};

function drawEverything(userImg = null) {
    // कैनवास को साफ करें
    ctx.clearRect(0, 0, 1000, 1000);
    
    // पोस्टर को ड्रॉ करें
    ctx.drawImage(poster, 0, 0, 1000, 1000);
    
    if (userImg) {
        ctx.save();
        const circleX = 755; 
        const circleY = 485; 
        const radius = 145; 
        
        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, 0, Math.PI * 2); 
        ctx.clip(); 
        
        // फोटो को थोड़ा बड़ा (Zoom) करके फिट करना
        const zoomSize = 520; 
        ctx.drawImage(userImg, circleX - (zoomSize/2), circleY - (zoomSize/2), zoomSize, zoomSize);
        
        ctx.restore();
    }
}

imageUpload.addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            drawEverything(img);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'hindu_sammelan_poster.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
});
