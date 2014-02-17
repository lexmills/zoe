$(document).ready(function() {
  $('#play').trigger('click');

  playTrack();
  trackSelect();
});

var song;
var track = 1;
var seek = $('#seek');

function playTrack() {
  song = new Audio('songs/Track_' + track + '.mp3');
  duration = song.duration;

  $('#player').on('click', '.button', function(e) {

    if($(this).attr('id') == 'play') {
      playSong();

      //set song title
      updateTitle(track);

      scrubber(song);
    }
    // pause button
    else if ($(this).attr('id') == 'pause') {
      song.pause();
      $(this).replaceWith('<a class="button fa fa-play" id="play"></a>');
    }
    //next button
    else {
      song.pause();
      track++;
      song = new Audio('songs/Track_' + track + '.mp3');
      //set song title
      updateTitle(track);

      playSong();
    }

    e.preventDefault();

  });
}

function trackSelect() {
  $('.track-container').on('click', function() {
    var value = $(this).attr('value');
    track = value.match(/\d+$/)[0];
    //stop song if there is one playing
    song.pause();
    //update opacity for active song
    updateTitle($(this));

    song = new Audio('songs/Track_' + track + '.mp3');
    song.play();
    $('#play').replaceWith('<a class="button fa fa-pause" id="pause"></a>');
  });
}

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

function scrubber(song) {
  //set range for song duration
  seek.attr('max', song.duration);
  //fix scrubber
  song.addEventListener('timeupdate',function (){
    curtime = parseInt(song.currentTime, 10);
    $("#seek").attr("value", curtime);
  });
}