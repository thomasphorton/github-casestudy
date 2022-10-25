import { Octokit } from "octokit";

import auth from './auth.js';
const octokit = new Octokit({
  auth: auth.token
})

const ownerName = 'thomasphorton-archive';
const repoName = 'github-casestudy-new';

await octokit.request('DELETE /repos/{owner}/{repo}', {
    owner: ownerName,
    repo: repoName
})

console.log(`Repository ${ownerName}/${repoName} deleted`);

await octokit.request('POST /orgs/{org}/repos', {
    org: ownerName,
    name: repoName,
    description: 'This is your first repository',
    homepage: 'https://github.com',
    'private': false,
    has_issues: true,
    has_projects: true,
    has_wiki: true
})

console.log(`Repository ${ownerName}/${repoName} created`)