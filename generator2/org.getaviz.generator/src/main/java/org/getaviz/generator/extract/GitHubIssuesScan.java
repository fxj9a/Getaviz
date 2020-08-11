package org.getaviz.generator.extract;

import org.getaviz.generator.SettingsConfiguration;
import org.getaviz.generator.Step;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.io.FileUtils;

import org.eclipse.jgit.api.*;

import java.io.File;
import java.io.FileWriter;
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
  public void run(){
    System.out.println("Feature not implemented");
  }

  public SettingsConfiguration runNow() {
    if(checkRequirements()) {
      try {
        Collection<String> branches = new HashSet();
        branches.add(config.getGHIBranch());

        File localRepoPath = new File("gitrepo");
        System.out.println("Cleaning Target directory");

        FileUtils.deleteDirectory(localRepoPath);

        System.out.println("Cloning Git reposotory to " + localRepoPath.getAbsolutePath());

        Git git = Git.cloneRepository()
            .setURI(config.getGHIURL())
            .setDirectory(localRepoPath)
            .call();
        git.checkout().setName(config.getGHIBranch()).call();

        File gitHubConfig = new File("gitrepo/githubissues.xml");
        FileWriter fw = new FileWriter("gitrepo/githubissues.xml");
        gitHubConfig.createNewFile();

        String gitHubRepoURL = config.getGHIURL(); //
        // replaceFirst-regex https? matches both http and https (although github always uses https)
        gitHubRepoURL = gitHubRepoURL.replaceFirst("https?://github.com/", "").replace(".git","");
        String[] gitHubRepoInfo = gitHubRepoURL.split("/");

        String gitHubIssuesPluginConfig = "<github-issues-configuration>\n" +
            "    <github-repository>\n" +
            "        <user>" + gitHubRepoInfo[0] + "</user>\n" +
            "        <name>" + gitHubRepoInfo[1] + "</name>\n" +
            "        <credentials>\n" +
            "            <user>" + config.getGitHubUser() + "</user>\n" +
            "            <password>" + config.getGitHubPassword()+ "</password>\n" +
            "        </credentials>\n" +
            "    </github-repository>\n" +
            "</github-issues-configuration>\n";

        fw.write(gitHubIssuesPluginConfig);
        fw.close();

        config.addInputFile(localRepoPath.getAbsolutePath());
        return config;
      } catch (Exception e) { // TODO: replace generic throwable
        System.out.println(e);
      }
    }
    return null;
  }
}
