var app = angular.module('soundboard', ['ionic']);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});

app.controller('SoundBoardCtrl', function ($scope, $window) {

	$scope.media = null;

	$scope.model = {
		showDelete: false,
		showMove: false,
		sounds: [
			{
				'title': 'Cow',
				'image': 'img/animals/cow-icon.png',
				'desc': 'Mooo',
				'file': '/sounds/cow.mp3'
			},
			{
				'title': 'Dolphin',
				'image': 'img/animals/dolphin-icon.png',
				'desc': 'Whistle',
				'file': '/sounds/dolphin.mp3'
			},
			{
				'title': 'Frog',
				'image': 'img/animals/frog-icon.png',
				'desc': 'Croak',
				'file': '/sounds/frog.mp3'
			},
			{
				'title': 'Bird',
				'image': 'img/animals/bird-icon.png',
				'desc': 'Chirp',
				'file': '/sounds/bird.mp3'
			},
			{
				'title': 'Pig',
				'image': 'img/animals/pig-icon.png',
				'desc': 'Oink',
				'file': '/sounds/pig.mp3'
			},
			{
				'title': 'Dog',
				'image': 'img/animals/puppy-icon.png',
				'desc': 'Bark',
				'file': '/sounds/dog.mp3'
			},
			{
				'title': 'Cat',
				'image': 'img/animals/black-cat-icon.png',
				'desc': 'Meow',
				'file': '/sounds/cat.mp3'
			}
		]
	};

	/**
	* Function that remove the sound from list
	* TODO: implement it to backend
	*/

	$scope.deleteSound = function( $index ) {
		$scope.model.sounds.splice($index, 1);
	}

	$scope.moveSound = function(sound, fromIndex, toIndex) {
		// Remove from its previous position
		$scope.model.sounds.splice(fromIndex, 1);

		// Insert the sound into the target position
		$scope.model.sounds.splice(toIndex, 0, sound);
	}

	$scope.play = function (sound) {

		// Check the status of media because we do not want to plays a sound
		// above another one.
		if ( $scope.media ) {
			$scope.media.pause();
		};

		// Steps
		// 1. Check if it's a device or browser running the app
		// 2. Check if the platform is totally ready
		// 3. Plays the sound ***

		if ( $window.cordova ) {
			console.log('Play called on a device!');

			// Let's get sure we are not calling any function before the actual app
			// is total loaded
			ionic.Platform.ready(function(){

				// ***
				var src = sound.file;
				// On android we need to append the www folder
				if ( ionic.Platform.is('android') ) {
					src = '/android_asset/www/' + src;
				};

				$scope.media = $window.Media(src);
				$scope.media.play();

			});

		} else {
			$scope.media = new Audio();
			$scope.media.src = sound.file;
			$scope.media.load();
			$scope.media.play();
		}
	};
});

