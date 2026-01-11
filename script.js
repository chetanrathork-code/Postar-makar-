// Upload photo
function loadPhoto(event) {
  const img = document.getElementById("preview");
  img.src = URL.createObjectURL(event.target.files[0]);
  img.style.display = "block";
  event.target.previousElementSibling.style.display = "none";
}

// Download poster
document.getElementById("downloadBtn").addEventListener("click", function(){
    const poster = document.querySelector(".poster-container");

    const canvas = document.createElement("canvas");
    canvas.width = poster.offsetWidth * 2;  // high quality
    canvas.height = poster.offsetHeight * 2;
    const ctx = canvas.getContext("2d");

    ctx.scale(2, 2);

    // Draw background
    const bg = poster.querySelector(".background");
    ctx.drawImage(bg, 0, 0, poster.offsetWidth, poster.offsetHeight);

    // Draw uploaded photo
    const userImg = poster.querySelector("#preview");
    if(userImg.src){
        ctx.drawImage(userImg, userImg.offsetLeft, userImg.offsetTop, userImg.offsetWidth, userImg.offsetHeight);
    }

    // Download
    const link = document.createElement("a");
    link.download = "poster_high_quality.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
});