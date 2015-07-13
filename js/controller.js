//var accessToken = localStorage.getItem('spotify-token');
var base_url = "https://api.spotify.com/v1/search?type=track&market=US&query=";

var spotifyApp = angular.module('spotifyApp', []);
var mainController = spotifyApp.controller('mainController', function ($scope, $http) {

    $scope.audioObject = {};

    $scope.getData = function() {
        if($scope.words.length > 2) {
            var words = $scope.words.split(' ');
            var result = [];
            for (var i = 0; i < words.length; i++) {
                $http.get(base_url + words[i])
                    .success(function (response) {
                        // randomly select a track from the results
                        var track = response.tracks.items[Math.floor(Math.random()*response.tracks.items.length)];
                        result.push(track);
                    });
            }
            $scope.songs = result;
        }
    };

    $scope.getArtists = function (artists){
        // return comma separated names
        var result = artists[0].name;
        for (var i = 1; i < artists.length; i++) {
                result = result + ', ' + artists[i].name;
        }
        return result;
    };

    $scope.msToMinuteSecond = function (millis){
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    $scope.play = function(song) {
        if($scope.currentSong == song) {
            $scope.audioObject.pause();
            $scope.currentSong = false;
            return;
        }
        else {
            if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
            $scope.audioObject = new Audio(song);
            $scope.audioObject.play();
            $scope.currentSong = song
        }
    }
});
