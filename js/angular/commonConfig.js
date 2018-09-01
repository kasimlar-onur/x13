
x13.factory("CommonConfig", function($http) {


    // Define the CommonConfig function
    var CommonConfig = function() {



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
        };

        this.getIndexer = function () {
            return  ["Emil", "Tobias", "Linus"];
        };

        this.getWeightingModels = function() {
            return ["BM25", "tf-idf"];
        };

        this.getStemmer = function() {
            return ["Porterstemmer", "Snowballstemmer"];
        };

        this.getSelectedCommonStemmerLang = function() {
            return ["English", "German", "Spanish", "Finnish"];
        };

        this.getNormalizer = function() {
            return ["Normalizer 1", "Normalizer 2"]
        };

        this.getOperators = function() {
            return ["OR", "AND"]
        };


        // Call the initialize function for every new instance
        this.initialize();
    };

    // Return a reference to the function
    return (CommonConfig);

});