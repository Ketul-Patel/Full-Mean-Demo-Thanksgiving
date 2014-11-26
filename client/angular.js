// create the angular app
var angularExpress = angular.module('angularExpress', []);

// create the angular controller
angularExpress.controller('MainCtrl', function($scope, FriendFactory) {
	FriendFactory.getInitialFriends(function(data) {
		console.log("data in the controller", data)
		$scope.friends = data
	});
	// add friend and push it onto the friends array
	$scope.addFriend = function() {
		FriendFactory.addFriend($scope.new_friend);
		$scope.friends = FriendFactory.getFriends();
	}
})

// this is our change. gold star for finding it.

angularExpress.factory('FriendFactory', function($http) {
	var friends = [];
	var factory = {};
	factory.addFriend = function(friend) {
		friends.push({name: friend})
		$http.post('/friends/create', {new_friend: friend}).success(function(output) {
			// do something when we get back here
		})
	}
	factory.getFriends = function() {
		return friends
	}
	factory.getInitialFriends = function(cb) {
		$http.get('/friends').success(function(output) {
			console.log("output in factory", output)
			friends = output
			cb(output);
		})
	}
	return factory;
})