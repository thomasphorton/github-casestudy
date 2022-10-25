import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT
})

export async function handler(event) {

  let body = JSON.parse(event.body);
  
  if (body.action === 'created') {
    
    let owner = body.repository.owner.login;
    let repo = body.repository.name;
    let branch = 'main';
    let team = 'contributors';
    let sender = body.sender.login;
    
    console.log(`Repository ${owner}/${repo} created`);
  
    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: 'README.md',
      message: 'initializing with a README.md',
      committer: {
        name: 'Archive Initiator Bot',
        email: process.env.GITHUB_BOT_EMAIL
      },
      content: process.env.GITHUB_README_CONTENTS_BASE64
    })
    
    await octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
      owner,
      repo,
      branch,
      required_status_checks: null,
      enforce_admins: true,
      required_pull_request_reviews: {
        require_code_owner_reviews: true,
        required_approving_review_count: 2
      },
      restrictions: {
        users: [owner],
        teams: [team]
      }
    });
    
    console.log(`Added protection to ${owner}/${repo}/${branch}`)
    
    await octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      title: `Protection added to default branch`,
      body: `Hi @${sender}, I\'ve automatically protected the default branch of this repo. To commit, you must be a member of the team "${team}", and you must receive 2 code review approvals.`,
      labels: [
        'info'
      ]
    })
    
  }
  
  const response = {
      statusCode: 200,
  };
  return response;
};
