function loadPhoto(event) {
  const img = document.getElementById("preview");
  img.src = URL.createObjectURL(event.target.files[0]);
  img.style.display = "block";
  event.target.previousElementSibling.style.display = "none";
}
document.getElementById("downloadBtn").addEventListener("click", function(){
    const poster = document.querySelector(".poster");

    // High resolution canvas (2x for sharpness)
    const canvas = document.createElement("canvas");
    canvas.width = poster.offsetWidth * 2;   // width double karo
    canvas.height = poster.offsetHeight * 2; // height double karo
    const ctx = canvas.getContext("2d");

    // Scale to make image sharp
    ctx.scale(2, 2);

    // Draw background
    const bg = poster.querySelector(".background");
    ctx.drawImage(bg, 0, 0, poster.offsetWidth, poster.offsetHeight);

    // Draw uploaded photo if exists
    const userImg = poster.querySelector("#preview");
    if(userImg.src){
        ctx.drawImage(userImg, userImg.offsetLeft, userImg.offsetTop, userImg.offsetWidth, userImg.offsetHeight);
    }

    // Download
    const link = document.createElement("a");
    link.download = "poster_high_quality.png";
    link.href = canvas.toDataURL("image/png", 1.0); // Max quality
    link.click();
});