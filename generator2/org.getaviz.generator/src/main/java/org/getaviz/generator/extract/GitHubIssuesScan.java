package org.getaviz.generator.extract;

import org.getaviz.generator.SettingsConfiguration;
import org.getaviz.generator.Step;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.io.FileUtils;

import org.eclipse.jgit.api.*;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.HashSet;

public class GitHubIssuesScan implements Step {
  private static Log log = LogFactory.getLog(Importer.class);
  public static SettingsConfiguration config;

  GitHubIssuesScan(SettingsConfiguration config) {
    this.config = config;
  }


  @Override
  public boolean checkRequirements() {
    log.info(config.toString());
    return config.isGHIEnabled();
  }

  @Override
  public void run() {
    try {
      Collection<String> branches = new HashSet();
      branches.add("refs/heads/" + "master");

      File localRepoPath = new File("gitrepo");
      System.out.println("Cleaning Target directory");

      FileUtils.deleteDirectory(localRepoPath);

      System.out.println("Cloning Git reposotory to "+localRepoPath.getAbsolutePath());

      Git git = Git.cloneRepository()
          .setURI(config.getGHIURL())
          .setDirectory(localRepoPath)
          .setBranchesToClone(branches)
          .call();
    } catch (Exception e){ // TOOD: replace generic Exception catcher
      System.out.println(e);
    }

  }
}
