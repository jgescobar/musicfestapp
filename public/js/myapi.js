$.ajax({
  method: 'GET',
  url: "/artists",
  dataType: "json"
}).done(function(res) {
  console.log("get ajax", res)
  res.artists.forEach(function(artist) {
    $('#line-up').append('<li> <img src="' + artist.imgUrl +'"> ' + artist.name + '</li>')
  })
})
