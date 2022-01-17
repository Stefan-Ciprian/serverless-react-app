// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";

const html_code = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">Test</div>
    <div>Rendered on Server</div>
  </body>
</html>`;

const handler = async function (event) {
  try {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html_code,
    };
  } catch (error) {
    console.log(`Error ${error.message}`);
    return `Error ${error}`;
  }
};

export { handler };
