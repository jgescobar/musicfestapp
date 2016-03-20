$.ajax({
  method: 'GET',
  url: "/artists",
  dataType: "json"
}).done(function(res) {
  console.log("get ajax", res)
  res.artists.forEach(function(artist) {
    $('#line-up').append('' + artist.name + '<br><img src="' + artist.imgUrl +'"></br>')
  })
})
