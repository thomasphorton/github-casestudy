import { Octokit } from "octokit";

import auth from '../auth.js';
const octokit = new Octokit({
    auth: auth.token
})

await octokit.request('DELETE /repos/{owner}/{repo}', {
    owner: 'thomasphorton-archive',
    repo: 'github-casestudy'
})