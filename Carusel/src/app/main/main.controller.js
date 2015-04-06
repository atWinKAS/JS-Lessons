'use strict';

angular.module('caruselApp')
  .controller('MainCtrl', function ($scope) {
	  
	  var items = [{"type":"organization","icon":"assets/images/placeholders/_company_2x.png","color":"9d8d6e","backgroundImage":null,"id":155,"displayName":"Swevels diensten en projecten","description":"Ontwikkelen","location":"Willem Beringsstraat 72, Helmond","phoneNumber":"+31619182928"},{"type":"organization","icon":"assets/images/placeholders/_company_2x.png","color":"eec460","backgroundImage":null,"id":194,"displayName":"Scheffers Civiel-Elektro Engineering","description":"Handelsbemiddeling gespecialiseerd in overige goederen","location":"Nieuwenheerd 38, Weert","phoneNumber":"+31654310012"},{"type":"organization","icon":"assets/images/placeholders/_company_2x.png","color":"cecece","backgroundImage":null,"id":164,"displayName":"BeautySalon Anouk","description":"Beauty en spa's","location":"Half Elfje 8 a, Someren","phoneNumber":"+31625555962"},{"type":"organization","icon":"assets/images/placeholders/_company_2x.png","color":"71c475","backgroundImage":null,"id":204,"displayName":"Roertech","description":"Overige bouwinstallatie","location":"Buizerdhorst 5, Roermond","phoneNumber":"+31475691654"},{"type":"organization","icon":"assets/images/placeholders/_company_2x.png","color":"464f54","backgroundImage":null,"id":158,"displayName":"Urban Fit Schutsboom","description":"Overig sport- en recreatieonderwijs","location":"Schutsboom 50, Helmond","phoneNumber":"+31614565295"},{"type":"organization","icon":"assets/images/placeholders/_company_2x.png","color":"e998b3","backgroundImage":null,"id":177,"displayName":"EsPee Holding B.V.","description":"Financiële holdings","location":"Meerloseweg 12, Oirlo","phoneNumber":"+31623031310"},{"type":"organization","icon":"http://api.staging.elephone.com/v1/api/organization/983/image","color":"15545E","backgroundImage":"http://api.staging.elephone.com/v1/api/organization/983/image-background","id":983,"displayName":"Enter.nl B.V.","description":"Advisering op het gebied van informatietechnologie","location":"Watersnip 59, Bodegraven","phoneNumber":"+31624783114"}];

	  $scope.cards = items;
	  console.log($scope.cards);
	  
	  
	  var openCard = function(e){
				console.log('click!!');
				console.log(e);
			};
			
	  /*
    $scope.awesomeThings = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      }
    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
	*/
	
	
  });
