// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import * as cdk from "@aws-cdk/core";
import { CfnParameter } from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";


export class SsrStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const mySiteBucketName = new CfnParameter(this, "mySiteBucketName", {
      type: "String",
      description: "The name of S3 bucket to upload react application"
    });

    const mySiteBucket = new s3.Bucket(this, "ssr-site", {
      bucketName: mySiteBucketName.valueAsString,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      publicReadAccess: false,
      //only for demo not to use in production
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
    new cdk.CfnOutput(this, "Bucket", { value: mySiteBucket.bucketName });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "ssr-oia"
    );
    mySiteBucket.grantRead(originAccessIdentity);

    new s3deploy.BucketDeployment(this, "Client-side React app", {
      sources: [s3deploy.Source.asset("../chart-app/build/")],
      destinationBucket: mySiteBucket
    });

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "ssr-cdn",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: mySiteBucket,
              originAccessIdentity: originAccessIdentity
            },
            behaviors: [
              {
                isDefaultBehavior: true
              }
            ]
          }
        ]
      }
    );

    new cdk.CfnOutput(this, "CF URL", {
      value: `https://${distribution.distributionDomainName}`
    });
  }
}
