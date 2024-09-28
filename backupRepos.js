import { Octokit } from "octokit";
import { config } from "dotenv";
import { execSync } from "child_process";
import fs from "fs";

config(); // Load environment variables

async function fetchRepos() {
    const octokit = new Octokit({
        auth: process.env.PAT
    });

    const response = await octokit.request('GET /user/repos', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        },
        type: "owner"
    });

    // Returns a list of strings in the format "{username}/{repo name}"
    return response.data.map(details => details.full_name);
}

function getRepoUrls(repos) {
    return repos.map(repo => `https://${process.env.GITHUB_USERNAME}:${process.env.PAT}@github.com/${repo}`);
}

function createFolder() {
    try {
        if (fs.existsSync(process.env.TARGET_FOLDER)) {
            fs.rmSync(process.env.TARGET_FOLDER, { recursive: true, force: true });
        }
        fs.mkdirSync(process.env.TARGET_FOLDER, { recursive: true });
    } catch (error) {
        throw new Error(`Failed to create folder: ${error.message}`);
    }
}

function cloneRepos(repoUrls) {
    try {
        repoUrls.forEach(repoUrl => execSync(`git clone ${repoUrl}`, { cwd: process.env.TARGET_FOLDER, stdio: "inherit" }));
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    try {
        const repos = await fetchRepos();
        const repoUrls = getRepoUrls(repos);
        createFolder();
        cloneRepos(repoUrls);
    } catch (error) {
        console.log(`Error occured: ${error.message}`);
        process.exit(1);
    }
}

main();