const AWS = require('aws-sdk');

// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create CodeDeploy service object
const codedeploy = new AWS.CodeDeploy({ apiVersion: '2014-10-06' });

// Deployment parameters
const deploymentParams = {
  applicationName: 'MyApplication', // Replace with your application name
  deploymentGroupName: 'MyDeploymentGroup', // Replace with your deployment group name
  revision: {
    revisionType: 'S3',
    s3Location: {
      bucket: 'my-bucket', // Replace with your S3 bucket name
      bundleType: 'zip',
      key: 'my-app.zip' // Replace with your S3 object key
    }
  },
  deploymentConfigName: 'CodeDeployDefault.OneAtATime', // Deployment configuration
  description: 'My deployment description', // Optional description
  ignoreApplicationStopFailures: false // Set to true if you want to ignore application stop failures
};

// Create deployment
codedeploy.createDeployment(deploymentParams, (err, data) => {
  if (err) {
    console.error('Error creating deployment:', err);
  } else {
    console.log('Deployment created successfully:', data.deploymentId);
  }
});
