#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get current branch name
function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch (error) {
    console.error('Error getting current branch:', error.message);
    process.exit(1);
  }
}

// Function to get Jira ticket number from branch name
function getJiraTicket(branchName) {
  const match = branchName.match(/([A-Z]+-\d+)/);
  return match ? match[1] : null;
}

// Function to get commit messages since last common commit with main
function getCommitMessages() {
  try {
    const command = 'git log --pretty=format:"%s" main..HEAD';
    const commits = execSync(command).toString().trim();
    return commits.split('\n').map(commit => `- ${commit}`).join('\n');
  } catch (error) {
    console.error('Error getting commit messages:', error.message);
    return '';
  }
}

// Function to create PR
async function createPR() {
  const currentBranch = getCurrentBranch();
  const jiraTicket = getJiraTicket(currentBranch);

  if (!jiraTicket) {
    console.error('Could not find Jira ticket number in branch name');
    process.exit(1);
  }

  // Get Jira ticket title (you might want to implement this using Jira API)
  // For now, we'll use the ticket number as title
  const prTitle = jiraTicket;
  
  // Get commit messages
  const commitMessages = getCommitMessages();
  
  // Create PR description template
  const prDescription = `
## Description
This PR addresses ${jiraTicket}

## Changes
${commitMessages}

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed

## Additional Notes
- 
`;

  try {
    // Create PR using GitHub CLI
    const command = `gh pr create --title "${prTitle}" --body "${prDescription}" --base main`;
    execSync(command, { stdio: 'inherit' });
    console.log('PR created successfully!');
  } catch (error) {
    console.error('Error creating PR:', error.message);
    process.exit(1);
  }
}

createPR(); 