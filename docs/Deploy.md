# How to deploy our app

Our continuous integration pipeline is configured to automatically deploy our frontend and backend applications. This document describes the steps for manual deployment.

_Before you begin, make sure you are running Python 3.6 and you have a valid AWS account and your [AWS credentials file](https://aws.amazon.com/blogs/security/a-new-and-standardized-way-to-manage-credentials-in-the-aws-sdks/) is properly installed._

## Backend
Flask app packaged using Zappa and deployed to AWS Lambda.

```bash
virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt
zappa deploy production
```

Note: if already deployed use `zappa update production` to update.

## Frontend
React app deployed to GitHub Pages.

```bash
cd client
yarn install
REACT_APP_API_BASE=endpoint_url yarn deploy
```

Note: environment variable `REACT_APP_API_BASE` is the production AWS backend endpoint.
