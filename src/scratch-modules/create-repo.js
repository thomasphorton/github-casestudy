import { Octokit } from "octokit";

import auth from '../auth.js';
const octokit = new Octokit({
  auth: auth.token
})

const owner = 'thomasphorton-archive';
const repo = 'github-casestudy-new';
  
await octokit.request('POST /orgs/{org}/repos', {
    org: owner,
    name: repo,
    description: 'This is your first repository',
    homepage: 'https://github.com',
    'private': false,
    has_issues: true,
    has_projects: true,
    has_wiki: true
})

console.log('Repository created');