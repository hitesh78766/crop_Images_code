const preloadImages = document.querySelectorAll(".selectable-image");
const previewImage = document.getElementById("previewImage");
const imageContainer = document.querySelector(".image-container");
const cropButton = document.getElementById("cropButton");
const croppedImageContainer = document.querySelector(".cropped-image-container");
const downLoadButton = document.getElementById("downLoadButton")

let cropper; // store the croper icon

preloadImages.forEach((images) => {
    images.addEventListener("click", function () {
        console.log("the image is :", images)
        previewImage.src = this.src;
        previewImage.style.display = "block";

        if (cropper) {
            cropper.destroy()
        }

        // the new cropping is appears box on top of the image
        cropper = new Cropper(previewImage, {
            aspectRatio: 1  //means define width and height
        })

    })
})

// add event on cropButton
cropButton.addEventListener("click", function () {

    if (!cropper) {
        alert("Please select the image to crop the URL")
        return;
    }

    // this is for to get the crop image data i.e height and width
    const canvas = cropper.getCroppedCanvas()
    console.log("the canvas is:", canvas)

    if (!canvas) {
        alert("Failed to crop the image")
    }



    // reset the cropper
    cropper.destroy()
    previewImage.style.display = "none"


    var dataURL = canvas.toDataURL('image/jpg');

    // Retrieve stored images from LocalStorage (on refresh)
    let croppedImages = JSON.parse(localStorage.getItem("croppedImages")) || [];

    // Add new cropped image to the array
    const newImage = { id: Date.now(), image: dataURL, originalURL : previewImage.src};
    console.log("the console is : " , newImage.originalURL)
    croppedImages.push(newImage);

    // Save updated array back to LocalStorage
    localStorage.setItem("croppedImages", JSON.stringify(croppedImages));



    // create the image section 
    const createImageCropContainer = document.createElement("img");
    createImageCropContainer.src = dataURL;
    createImageCropContainer.style.margin = "10px";
    createImageCropContainer.style.width = "150px";
    createImageCropContainer.style.border = "2px solid #000";

    croppedImageContainer.appendChild(createImageCropContainer)


    createImageCropContainer.addEventListener("click" , ()=>{
        previewImage.src = dataURL;
        previewImage.style.display = "block";
        cropButton.innerHTML = "Update"

        if (cropper) {
            cropper.destroy()
        }

        // the new cropping is appears box on top of the image
        cropper = new Cropper(previewImage, {
            aspectRatio: 1
        })

    })

    cropButton.innerHTML = "Crop and Download"

    // create the download section for download the image 
    const downLoadLink = document.createElement("a");
    downLoadLink.href = dataURL;
    downLoadLink.download = 'cropped-image.png';
    downLoadLink.innerHTML = "Download Image"

    downLoadButton.appendChild(downLoadLink)

})





















