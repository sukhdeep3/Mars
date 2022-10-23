function getImages() {
  if ($("#sol-input").val() == "" || $("#page-input").val() == "") {
    showNotification("Fill the Details");
    return;
  }

  if ($("#sol-input").val() <= 0 || $("#sol-input").val() >= 1000) {
    showNotification("Fill the value between 0 to 1000");
    $("#sol-input").val("");
    $("#page-input").val("");
    return;
  }

  if ($("#page-input").val() == 0) {
    showNotification("Please enter a valid number of pics");
    $("#page-input").val("");
    return;
  }

  $("#image-container img").remove();
  $.ajax({
    url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
    method: "GET",
    success: images,
    data: {
      sol: $("#sol-input").val(),
      page: $("#page-input").val(),
      api_key: "DEMO_KEY",
    },
  });
}

$("#image-btn").click(getImages);

function images(data) {
  let list = data.photos;

  for (const a of list) {
    let img = $(document.createElement("img"));
    img.attr("src", a.img_src);
    $("#image-container").append(img);
  }
}

function showNotification(text) {
  alert(text);
}
