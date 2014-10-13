/**
* Created with sports-tracking-likes.
* User: dlafeir
* Date: 2014-09-29
* Time: 03:48 AM
* To change this template use Tools | Templates.
*/
angular.module('likeTracker', [])
  .controller('likeTrackerController', ['$scope', function($scope) {
    $scope.teams = [];
 
      
    var callAPI= function(url){
        return function() {
            FB.api("/" + url, 'get', {}, function(res) {
                $scope.teams.push({
                    name: res.name,
                    likes: res.likes,
                    url: "/" + url
                });
                console.log(res.name);
                $scope.$apply();
            });
        }
    }
    $scope.loadSavedTeams = function(){
          var tempArrayOfSavedTeams = [];
          $.ajax("http://hawaii-divide.codio.io:1337/sportsteams", 
          {
              type: 'get',
              xhrFields: {
                  withCredentials: true
              },
              success: function(data) {
                   console.log(data); 
                   for(var i = 0; i < data.length; i++) {
                        callAPI(data[i].url)();
                   }
              }
          });     
    } 
      
    $scope.addTeam = function() {
       
      FB.api("/" + $scope.toAddText, 'get', {}, function(res) {    
          $scope.teams.push({
              name: res.name,
              likes: res.likes,
              url: "/"+$scope.toAddText
          });     
          console.log(res.name);
          $scope.$apply();     
          
          $.ajax("http://hawaii-divide.codio.io:1337/sportsteams", 
          {
              type: 'post',
              data : {
                  teamName: res.name,
                  url: $scope.toAddText
              },
              xhrFields: {
                  withCredentials: true
              },
              success: function(data){
                  console.log("success");
                  $scope.$apply();  
              }
          });
          
      });
     
    };

  }]);