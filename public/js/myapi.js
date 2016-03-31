$.ajax({
  method: 'GET',
  url: "/artists",
  dataType: "json"
}).done(function(res) {
  console.log("get ajax", res)
  res.artists.forEach(function(artist) {
    $('#line-up').append('<div class="new">' + artist.name  +'<img src="' + artist.imgUrl + '">' + '</div>')
  })
})
