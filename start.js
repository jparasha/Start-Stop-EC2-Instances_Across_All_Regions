var AWS = require('aws-sdk');
exports.handler = function (event, context) {

	//////////////////////////////////////////////////Function call for CLients of Each Region////////////////////////////////////////////
	var regionNames = [
		'us-west-1', 'us-west-2', 'us-east-1', 'us-east-2', 'eu-west-1', 'eu-west-2', 'eu-central-1', 'sa-east-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2', 'ap-south-1', 'ca-central-1'
	];
	regionNames.forEach(function (region) { describeAllInstances(region); });

	/////////////////////////////////////////// Function to Describe Instances  //////////////////////////////////////////

	function describeAllInstances(region) {
		var regionName = region;
		var info = {
			region: ''
		};
		info.region = regionName;
		var EC2 = new AWS.EC2(info);
		var params = {
			Filters: [
				{
					Name: 'instance-state-name',
					Values: ['stopped'],
				},
				{
					Name: 'tag:start',
					Values: ['StartWeekDays'],
				},
			]
		};
		EC2.describeInstances(params, function (err, data) {
			if (err) return console.log("Error connecting, No Such Instance Found!");
			var Ids = { InstanceIds: [] };
			data.Reservations.forEach(function (reservation) {
				reservation.Instances.forEach(function (instance) {
					Ids.InstanceIds.push(instance.InstanceId);
				});
			});
			//function start instances called/////////
			start(EC2, Ids, region);
		});
	}

	////////////////////////////////////////////Function for Stopping Instances///////////////////////////////

	function start(EC2, Ids, region) {
		var Id = Ids;
		var ec = EC2;
		ec.startInstances(Id, function (err, data) {
			if (err) { console.log("OOps! Instance(s) in " + region + " region doesn't fall in the condition this lambda function has been written for!"); } // an error occurred
			else { console.log(JSON.stringify(data, null, 4)); } // successful response
		});
	}
};
