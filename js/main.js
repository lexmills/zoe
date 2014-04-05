$(document).ready(function() {
  var position = 100;
  var track = 1;
  var tracks = $('.track.number').length;

  setTimeout(function() {
    track = 1;
    song = new Audio('songs/Track_' + track + '.mp3');

    playSong();
    //set song title
    updateTitle(track);
    detectEnd(track);
  }, 300);

  $(window).scroll(function() {
    if($(window).scrollTop() >= position ) {
      $('#player-container').addClass('fixed');
    } else {
      $('#player-container').removeClass('fixed');
    }
  });

  $('#player').on('click', '.button', function(e) {
    if($(this).attr('id') == 'play') {
      playSong();

      //set song title
      updateTitle(track);
      //play next song if song ends
      detectEnd(track);

    }
    // pause button
    else if ($(this).attr('id') == 'pause') {
      song.pause();
      $(this).replaceWith('<a class="button fa fa-play" id="play"></a>');
    }
    //next button
    else if ($(this).attr('id') == 'next') {
      song.pause();

      track == tracks ? track = 1 : track++;

      song = new Audio('songs/Track_' + track + '.mp3');
      //set song title
      updateTitle(track);

      playSong();
      //play next song if song ends
      detectEnd(track);
    } else {
      song.pause();

      track == 1 ? track = tracks : track--;
      song = new Audio('songs/Track_' + track + '.mp3');
      //set song title
      updateTitle(track);

      playSong();
      //play next song if song ends
      detectEnd(track);
    }

    e.preventDefault();
  });

  $('.track-container').on('click', function() {
    var value = $(this).attr('value');
    track = value.match(/\d+$/)[0];
    //stop song if there is one playing
    song.pause();
    //update opacity for active song
    updateTitle(track);

    song = new Audio('songs/Track_' + track + '.mp3');
    song.play();
    $('#play').replaceWith('<a class="button fa fa-pause" id="pause"></a>');

    detectEnd(track);
  });
});

function playSong() {
  //play song
  song.play();
  //update button for pause
  $('#play').replaceWith('<a class="button fa fa-pause" id="pause"></a>');
}

function updateTitle(track) {
  var trackDiv = 'div[value="Track_' + track + '"]';
  $('.track.title').attr('style', '');
  $(trackDiv).children('.track.title').css('opacity', 1);
}

function detectEnd(track) {
  song.addEventListener('ended', function() {
    track++;
    song = new Audio('songs/Track_' + track + '.mp3');
    playSong(song);
    updateTitle(track);
  });
}

function scrubber(song) {
  //set range for song duration
  seek.attr('max', song.duration);
  //fix scrubber
  song.addEventListener('timeupdate',function (){
    curtime = parseInt(song.currentTime, 10);
    $("#seek").attr("value", curtime);
  });
}