
x13.factory("DribblePlayer",function($http) {

    // Define the DribbblePlayer function
    var DribblePlayer = function(player) {
        // Define the initialize function
        this.initialize = function() {
            // Fetch the player from Dribbble
            /*var url = 'http://api.dribbble.com/players/' + player + '?callback=JSON_CALLBACK';
            var playerData = $http.jsonp(url);
            var self = this;

            // When our $http promise resolves
            // Use angular.extend to extend 'this'
            // with the properties of the response
            playerData.then(function(response) {
                angular.extend(self, response.data);
            });
            */
            alert(1);
        };

        // Call the initialize function for every new instance
        this.initialize();
    };

    // Return a reference to the function
    return (DribblePlayer);

});