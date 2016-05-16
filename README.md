# Start-Stop-EC2-Instances_Across_All_Regions
######Two Lambda functions are needed to run [Start](start.js) and [Stop](stop.js) Scripts.

###a.)Lambda function to Start Instances ([start.js](start.js)):
[The Script](Start.js) runs across all AWS regions and makes API Calls
`DescribeInstances()`
and 
`StartInstances()`, based on applied filters.
###Steps:

*   Create a lambda function.
*   Add the script to your lambda function.
*   Navigate to Event Source.
*   Click Add new Event source and Choose Event type as - `Cloudwatch Events- Schedule`.
*   Add Rule name, Description and Schedule Expression as `cron(30 14 ? * MON-FRI *)` which represents Cron job Schedule to be followed MON-FRI at 14:30 UTC.
*   Enable the source and this script will start all instances tagged @ 14:30.

###Tags:
* To get your instance retrieved by the Lambda function you need to add tags to it.
* In this script, I've used 
  
  ```Key: 'start' ``` and ``` Value : 'StartWeekDays'```
  You can modify it as per your choice.

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
                "logs:CreateLogGroup",
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

###b.) Lambda function to Stop Instances ([stop.js](stop.js)):
The [stop.js](stop.js) script shuts down all EC2 instances across all regions.

Based on requirements cron job can be modified to shut down instances.
Instructions are same as [Starting Instances](start.js), 
####except for the tags.
######For Stop instances, I have used following Key-pair Tag:

`Key: stop`
`Value: StopWeekDays`

Use Same IAM role for this Lambda function also.


