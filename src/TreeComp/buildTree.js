import React from "react";
import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const octokit = new Octokit({
  auth: "personal-access-token123",
});

const BuildTree = () => {
  let userName = "SANIANJUM";
  async function build() {
    
    let arrTree = new Array();
    const urlData = await octokit.request("GET /users/{userName}/repos", {
      userName: "USERNAME",
    });

    if (urlData) {
      if (!Array.isArray(urlData)) {
        urlData = [urlData];
      }
      for (let pointer = 0; pointer < urlData; pointer++) {
        const repos = urlData[pointer];
        const urlPullData = await octokit.request(
          "GET /repos/{owner}/{repo}/pulls",
          {
            owner: userName,
            repo: repos,
          }
        );
        let pullData = new Array();
        if (urlPullData) {
          for (let pullpointer = 0; pullpointer < urlPullData; pullpointer++) {
            const pullReq = urlPullData[pullpointer];
            const pullFiles = await octokit.request(
              "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
              {
                owner: userName,
                repo: repos,
                pull_number: pullReq,
              }
            );
            pullData.push({
              //pullData.concat(pullReq),
              ...pullReq,
              files: pullFiles,
            });
          }
        }
        arrTree.push({
          //arrTree.concat(repos),
          ...repos,
          urlPullData: pullData,
        });
      }
    }
    return arrTree;
  }

  return { build };
};

export default BuildTree;
