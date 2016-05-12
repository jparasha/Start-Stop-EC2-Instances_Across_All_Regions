var AWS = require('aws-sdk');
exports.handler = function(event, context) {
 usWest_1();
 usWest_2();
 usEast_1();
 euWest_1();
 saEast_1();
 euCentral_1();
 apSouthEast_1();
 apSouthEast_2();
 apNorthEast_1();
 apNorthEast_2();

//////////////////////////////////////////////////Function for CLients of Each Region////////////////////////////////////////////

function usWest_1(){
	var ec2 = new AWS.EC2({ region: 'us-west-1'});
	///// function called describeAllInstances//////
	describeAllInstances(ec2);
}
function usWest_2(){
	var ec2 = new AWS.EC2({ region: 'us-west-2'});
	///// function called describeAllInstances//////
	describeAllInstances(ec2);
}
function usEast_1(){
	var ec2 = new AWS.EC2({ region: 'us-east-1'});
	///// function called describeAllInstances//////
	describeAllInstances(ec2);
}
function euWest_1(){
	var ec2 = new AWS.EC2({ region: 'eu-west-1'});
	///// function called describeAllInstances//////
	describeAllInstances(ec2);
}
function saEast_1(){
	var ec2 = new AWS.EC2({ region: 'sa-east-1'});
	///// function called describeAllInstances//////
	describeAllInstances(ec2);
}
function euCentral_1(){
    var ec2 = new AWS.EC2({ region: 'eu-central-1'});
	///// function called describeAllInstances//////
	describeAllInstances(ec2);
}
function apSouthEast_1(){
	var ec2 = new AWS.EC2({ region: 'ap-southeast-1'});
	///// function called describeAllInstances//////
	describeAllInstances(ec2);
}
function apSouthEast_2(){
	var ec2 = new AWS.EC2({ region: 'ap-southeast-2'});
	///// function called describeAllInstances//////
	describeAllInstances(ec2);
}
function apNorthEast_1(){
	var ec2 = new AWS.EC2({ region: 'ap-northeast-1'});
	///// function called describeAllInstances//////
	describeAllInstances(ec2);
}
function apNorthEast_2(){
	var ec2 = new AWS.EC2({ region: 'ap-northeast-2'});
	///// function called describeAllInstances//////
	describeAllInstances(ec2);
}

/////////////////////////////////////////// Function to Describe Instances  //////////////////////////////////////////

function describeAllInstances(ec2){
	var EC2=ec2;	
	var params = {		
			 Filters: [
	        {
	            Name: 'instance-state-name',
	            Values: [
	                'stopped'
	            ],
	        },
	        {
	            Name: 'tag:StopTry',
	            Values: [
	                    'testfunction'
	            ],
	        },	    
		]
	};
	EC2.describeInstances(params, function (err, data) {
			 if (err) return console.log("Error connecting, No Such Instance Found!");
			  var Ids={
			  	InstanceIds : []
			  };
    data.Reservations.forEach(function (reservation) {
			reservation.Instances.forEach(function (instance) {
					Ids.InstanceIds.push(instance.InstanceId);				
			});
		});

    //function start instances called/////////

	start(EC2, Ids); 

	});
 }

////////////////////////////////////////////Function for Starting Instances///////////////////////////////

function start(EC2, Ids){
		var Id=Ids;
		var ec=EC2;		
		ec.startInstances(Id,function (err, data) {
					 if (err) console.log("OOps! Instance(s) in this region doesn't fall in the condition this lambda function has been written for!"); // an error occurred
					 else console.log(JSON.stringify(data, null, 4)); // successful response
					});	 
	}
};