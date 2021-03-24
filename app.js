
window.addEventListener('DOMContentLoaded', function () {

  // Parte uno
  var avatar = document.getElementById('avatar');

  var dropzone = document.getElementById('dropzone');
  var $modal = $('#modal');

  // Modal
  var input = document.getElementById('input');
  var foto = document.getElementById('foto');
  var fotoOriginal = document.getElementById('fotoOriginal');


  var avatar2 = document.getElementById('avatar2');

  // Modal crop
  var image = document.getElementById('image');
  var buttonCrop = document.getElementById('buttonCrop');

  var $modalCrop = $('#modalCrop');
  var cropper;

  // URL
  var avatar3 = document.getElementById('avatar3');


  $('[data-toggle="tooltip"]').tooltip();

  dropzone.addEventListener('click', function(e) {
    $modal.modal('show');
  });

  input.addEventListener('change', function (e) {
    var files = e.target.files;

    var done = function (url) {
      image.src = url;
      $modalCrop.modal('show');
    };

    var reader;
    var file;

    if (files && files.length > 0) {
      file = files[0];

      if (URL) {
        done(URL.createObjectURL(file));
      } else if (FileReader) {
        reader = new FileReader();
        reader.onload = function (e) {
          done(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  });

  buttonCrop.addEventListener('click', function (e) {
    $modalCrop.modal('show');
  });

  $modalCrop.on('shown.bs.modal', function () {
    cropper = new Cropper(image, {
      dragMode: 'move',
      aspectRatio: 1,
      viewMode: 3,
    });
  }).on('hidden.bs.modal', function () {
    cropper.destroy();
    cropper = null;
  });

  document.getElementById('crop').addEventListener('click', function () {
    var initialAvatarURL;
    var canvas;

    $modalCrop.modal('hide');

    if (cropper) {
      canvas = cropper.getCroppedCanvas({
        width: 400,
        height: 400,
      });

      initialAvatarURL = avatar.src;
      var ImgToDataURL = canvas.toDataURL();
      fotoOriginal.value = ImgToDataURL;
      avatar.src = ImgToDataURL;
      avatar2.src = ImgToDataURL;
      foto.value = ImgToDataURL;
    }
  });
});


{/* function isBase64(encodedString) {
var regexBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
return regexBase64.test(encodedString);   // return TRUE if its base64 string.
}

function isValidHttpUrl(string) {
let url;
try { url = new URL(string);} catch (_) { return false; }
return url.protocol === "http:" || url.protocol === "https:";
}

function searchURL(){
let url_link = document.getElementById('url_link');
$("#url_link").removeClass("is-invalid");
// console
if(url_link.value){
  if(isBase64(url_link.value)){
  avatar3.src = url_link.value;
  }else{
  if(isValidHttpUrl(url_link.value)){

    let config = {
    responseType: 'arraybuffer',
    headers: {
      // "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
    };

    axios
    .get(url_link.value, config)
    .then(response => {
      console.log(response);

      let base64 = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
      );

      base64 = "data:;base64," + base64;
      avatar3.src = base64;
      avatar2.src = base64;
      avatar.src = base64;
      foto.value = base64;
      image.src = base64;

    }).catch(e => {
      console.log(e);
      $("#url_link").addClass("is-invalid");
    });
  }else{
    $("#url_link").addClass("is-invalid");
  }
  }
}else{
  $("#url_link").addClass("is-invalid");
}
} */}

document.getElementById('pills-form-tab').addEventListener('click', function(e) {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(mediaStream => {
    const stream = mediaStream;
    const tracks = stream.getTracks();
    tracks[0].stop();
    tracks.forEach(track => track.stop())
  })
});

document.getElementById('pills-camera-tab').addEventListener('click', function(e) {
  // Grab elements, create settings, etc.
  var video = document.getElementById('video');
  // Get access to the camera!
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Not adding `{ audio: true }` since we only want video now
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    //video.src = window.URL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
  });
  }

  /* Legacy code below: getUserMedia
  else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
      video.src = stream;
      video.play();
    }, errBack);
  } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
      video.src = window.webkitURL.createObjectURL(stream);
      video.play();
    }, errBack);
  } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
      video.srcObject = stream;
      video.play();
    }, errBack);
  }
  */

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var video = document.getElementById('video');

  // Trigger photo
  document.getElementById("snap").addEventListener("click", function() {
    console.log('Foto');
    context.drawImage(video, 0, 0, 640, 480);

    var ImgToDataURL = canvas.toDataURL();
    avatar.src = ImgToDataURL;
    avatar2.src = ImgToDataURL;
    foto.value = ImgToDataURL;
    fotoOriginal.value = ImgToDataURL;
    image.src = ImgToDataURL;

    $('#pills-form-tab').click();
  });
});
