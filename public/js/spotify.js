var artistName;

$("#search-artist").submit(function(event) {
 artistName = $("#artist").val()
  event.preventDefault();
  $.ajax({
    method: 'GET',
    url: "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist&limit=5",
    dataType: "json"
  }).done(function(res) {
      res.artists.items.forEach(function(artist) {
       $("#artist-list")
       .append(
        '<li><a href="/lineup" class="add-artist" id="'+ artist.id +'">' + artist.name + '</a></li>')
    })
      $(".add-artist").click(function(event) {
        var id = $(this).attr("id")
        console.log(id);
        $.ajax({
          method: "POST",
          url:    "/artists",
          dataType:  "json",
          data:     { spotifyId: id }
        }).done(function(res) {
          console.log(res);
        })
      });
    })
});

