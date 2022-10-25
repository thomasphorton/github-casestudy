# GitHub Case Study

## Requirements
* [X] Automate the protection of the default branch on repository creation
* [X] Notify the repository creator with an @mention in an issue within the repository

## TODO
* [] Investigate GitHub Apps to avoid generating/rotating Personal Access Tokens
* [] Initialize repository to include GitHub Action YAML for a testing workflow 
* [] Error handling- absolutely none currently exist within the current module
* [] Tests :)

## Data Flow
When a new repository in the `thomasphorton-archive` organization is created, a webhook is fired targetting an AWS Lambda Function URL.

The Lambda function filters for the `created` event type. If present, it creates a commit on the repository containing a base64 encoded `README.md` file. This commit initializes a default branch in the repository.

Once the branch has been created, the function creates a protection rule for the default branch. In this example, it enforces a minimum of 2 code review approvals prior to merge, as well as restricting contributions to the repository owner and members of a team within the organization.

After setup is complete, the function creates an issue within the repository to notify the creator of the repo that the protections have been applied.

## Deploying the solution
* Create a new GitHub account to act as the 'bot'. Add it to your organization

* Create a package to upload to lambda by running `./package-lambda.sh`

* Create an AWS Lambda function in the AWS console. Upload `/dist/lambda.zip` as the function code.

* Create an AWS Lambda Function URL. In the Lambda function console, `Configuration` -> `Function URL` -> `Create Function URL`. Note this URL for later.

* Generate a personal access token for the bot. In the GitHub console, `Settings` -> `Developer Settings` -> `Personal access tokens` -> `Fine-grained tokens` -> `Generate new token`. Scope the token access to all repositories owned by the organization, and give it Read and Write access to administration and code. Note the Access token for the next step.

* Create environment variables in the Lambda function. In the Lambda function console, `Configuration` -> `Environment Variables` -> `Edit` -> `Add environment variables`

|*Key*|*Value*|
|-|-|
|GITHUB_BOT_EMAIL| _the email address of your GitHub bot account_|
|GITHUB_PAT| _the Personal Access Token generated above_|
|GITHUB_README_CONTENTS_BASE64| _base64 encoded contents of the initial README file. example: `IyBIZWxsbyB3b3JsZCEKCkhhdmUgZnVuIQ==`_|

* In the GitHub organization, create a webhook for repository creation `Organization settings` -> `Webhooks` -> `Add webhook`. Enter the Lambda Function URL as the **Payload URL** and change **Content type** to `application/json`. Select **Let me select individual events**, and then choose `Repositories` to filter events. Add the webhook to save it.
