const fs = require('fs');
const report = require('../report.json');

const HEAD_COMMIT = process.env.HEAD_COMMIT;
const TEST_REPO_NAME = process.env.TEST_REPO_NAME;
const REPO_NAME = process.env.REPO_NAME;
const USERNAME = process.env.USERNAME;

const commit = JSON.parse(HEAD_COMMIT);
const tests = report.tests;
const stats = report.stats;


const reportWithMeta = {
  username: USERNAME,
  timestamp: commit.timestamp,
  stats,
  test_repo_name: TEST_REPO_NAME,
  testRepoName: TEST_REPO_NAME,
  repoName: REPO_NAME,
  tests,
  commit
};

fs.writeFileSync('report-with-meta.json', JSON.stringify(reportWithMeta));
