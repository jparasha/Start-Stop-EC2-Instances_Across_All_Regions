# Start-Stop-EC2-Instances_Across_All_Regions

###Start Instances:
[The Script](Start.js) runs across all AWS regions and makes API Calls
`DescribeInstances()`
and 
`StartInstances()`, based on applied filters.
###Steps:
* Add the script to your lambda function.
*  Navigate to Event Source.
*  Click Add new Event source and Choose Event type as - `Cloudwatch Events- Schedule`.
*  Add Rule name, Description and Schedule Expression as `cron(30 14 ? * MON-FRI *)` which represents Cron job Schedule to be followed MON-FRI at 14:30 UTC.
*  Enable the source and this script will start all instances tagged @ 14:30.

###Tags:
* To get your instance retrieved by the Lambda function you need to add tags to it.
* In this script, I've used ```Key: 'StopTry' ``` and ``` Value : 'testfunction'```. You can modify it as per your choice.

### Required IAM Roles for Lambda Function:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "MyStatementId",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:StopInstances",
                logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```
####Stop script for stopping all tagged instances can be found [HERE](Stop.js).
