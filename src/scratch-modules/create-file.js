import { Octokit } from "octokit";

import auth from './auth.js';
const octokit = new Octokit({
  auth: auth.token
})

const owner = 'thomasphorton-archive';
const repo = 'github-casestudy-new';
  
await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
  owner,
  repo,
  path: 'README.md',
  message: 'initializing with a README.md',
  committer: {
    name: 'Tom Horton',
    email: 'thomasphorton@gmail.com'
  },
  content: 'IyBIZWxsbyB3b3JsZCEKCkhhdmUgZnVuIQ=='
})