package org.getaviz.generator.jqa;

import org.getaviz.generator.SettingsConfiguration;
import org.getaviz.generator.Step;
import org.getaviz.generator.database.DatabaseConnector;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.getaviz.generator.ProgrammingLanguage;
import org.getaviz.generator.database.Labels;
import org.neo4j.driver.v1.Record;
import org.neo4j.driver.v1.Value;
import org.neo4j.driver.v1.types.Node;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import static org.apache.commons.text.StringEscapeUtils.escapeHtml4;

public class Issue2JSON implements Step {
  private Log log = LogFactory.getLog(this.getClass());
  private DatabaseConnector connector = DatabaseConnector.getInstance();
  private SettingsConfiguration config;
  private boolean isGHIEnabled;

  public Issue2JSON(SettingsConfiguration config) {
    this.isGHIEnabled = config.isGHIEnabled();
    this.config = config;
  }

  @Override
  public boolean checkRequirements() {
    return this.isGHIEnabled;
  }

  @Override
  public void run() {
    if (checkRequirements()) {
      log.info("Issue2JSON has started.");

      ArrayList<Node> elements = new ArrayList<>();
      connector.executeRead("MATCH (n:Git) RETURN n ORDER BY n.hash").forEachRemaining((result) -> elements.add(result.get("n").asNode()));
      connector.executeRead("MATCH (n:GitHub) RETURN n ORDER BY n.hash").forEachRemaining((result) -> elements.add(result.get("n").asNode()));

      Writer fw = null;
      try {
        String path = config.getOutputPath() + "ghIssues.json";
        fw = new FileWriter(path);
        fw.write(toJSON(elements));
      } catch (IOException e) {
        log.error(e);
      } finally {
        if (fw != null)
          try {
            fw.close();
          } catch (IOException e) {
            e.printStackTrace();
          }
      }
      log.info("Issue2JSON has finished.");
    }

  }

  private String toJSON(List<Node> list) {
    StringBuilder builder = new StringBuilder();
    boolean hasElements = false;
    for (final Node el : list) {
      if (!hasElements) {
        hasElements = true;
        builder.append("[{");
      } else {
        builder.append("\n},{");
      }
      if (el.hasLabel(Labels.GitHub.name()) && el.hasLabel((Labels.Repository.name()))) {
        builder.append(toJsonGitHubRepo(el));
        builder.append("\n");
      }
      if (el.hasLabel(Labels.Git.name()) && el.hasLabel((Labels.Repository.name()))) {
        builder.append(toJsonGitRepo(el));
        builder.append("\n");
      }
      if (el.hasLabel(Labels.GitHub.name()) && el.hasLabel((Labels.Issue.name()))) {
        builder.append(toJsonIssue(el));
        builder.append("\n");
      }
      if (el.hasLabel(Labels.GitHub.name()) && el.hasLabel((Labels.PullRequest.name()))) {
        builder.append(toJsonPR(el));
        builder.append("\n");
      }
      if (el.hasLabel(Labels.GitHub.name()) && el.hasLabel((Labels.Comment.name()))) {
        builder.append(toJsonComment(el));
        builder.append("\n");
      }
      if ((el.hasLabel(Labels.GitHub.name()) && el.hasLabel(Labels.Commit.name()))) {
        builder.append(toJsonGitHubCommit(el));
        builder.append("\n");
      }
      if ((el.hasLabel(Labels.Git.name()) && el.hasLabel(Labels.Commit.name()))) {
        builder.append(toJsonGitCommit(el));
        builder.append("\n");
      }
      if ((el.hasLabel(Labels.Git.name()) && el.hasLabel(Labels.Change.name()))) {
        builder.append(toJsonGitChange(el));
        builder.append("\n");
      }
      if ((el.hasLabel(Labels.Git.name()) && el.hasLabel(Labels.File.name()))) {
        builder.append(toJsonGitFile(el));
        builder.append("\n");
      }
      if ((el.hasLabel(Labels.Git.name()) && el.hasLabel(Labels.Author.name()))) {
        builder.append(toJsonGitAuthor(el));
        builder.append("\n");
      }

    }

    if (hasElements) {
      builder.append("}]");
    }
    return builder.toString();
  }

  private String toJsonGitHubRepo(Node repository) {
    return formatLine("repositoryId", repository.get("repositoryId").asString()) +
        formatLine("name", repository.get("name").asString()) +
        formatEndline("user", repository.get("user").asString());
  }

  private String toJsonGitRepo(Node repository) {
    return ""; // doesn't have any attributes
  }
  private String toJsonIssue(Node issue) {
    return formatLine("issueId", issue.get("issueId").asString()) +
        formatLine("title", issue.get("title").asString()) +
        formatLine("state", issue.get("state").asString()) +
        formatLine("createdAt", issue.get("createdAt").asString()) +
        formatLine("updatedAt", issue.get("updatedAt").asString()) +
        formatLine("number", issue.get("number").asString()) +
        formatLine("locked", issue.get("locked").asString()) +
        formatEndline("body", issue.get("body").asString());

  }
  private String toJsonPR(Node pr) {
    return formatLine("issueId", pr.get("issueId").asString()) +
        formatLine("title", pr.get("title").asString()) +
        formatLine("state", pr.get("state").asString()) +
        formatLine("createdAt", pr.get("createdAt").asString()) +
        formatLine("updatedAt", pr.get("updatedAt").asString()) +
        formatLine("number", pr.get("number").asString()) +
        formatLine("locked", pr.get("locked").asString()) +
        formatEndline("body", pr.get("body").asString());
  }
  private String toJsonComment(Node comment) {
    return formatLine("createdAt", comment.get("createdAt").asString()) +
        formatLine("updatedAt", comment.get("updatedAt").asString()) +
        formatLine("number", comment.get("number").asString()) +
        formatEndline("body", comment.get("body").asString());
  }
  private String toJsonGitHubCommit(Node c) {
    return formatLine("sha", c.get("sha").asString()) +
        formatEndline("id", c.get("id").asString());
    // TODO: put formatEndline at end of all returns
  }
  private String toJsonGitCommit(Node c) {
    return formatLine("sha", c.get("sha").asString()) +
        formatLine("author", c.get("author").asString()) +
        formatLine("committer", c.get("committer").asString()) +
        formatLine("date", c.get("date").asString()) +
        formatLine("time", c.get("time").asString()) +
        formatLine("epoch", c.get("epoch").asString()) +
        formatLine("message", c.get("message").asString()) +
        formatEndline("shortMessage", c.get("shortMessage").asString());

  }
  private String toJsonGitChange(Node c) {
    return formatEndline("modificationKind", c.get("modificationKind").asString());
  }
  private String toJsonGitFile(Node f) {
    return formatLine("relativePath", f.get("relativePath").asString()) +
        formatLine("createdAt", f.get("createdAt").asString()) +
        formatLine("changedAt", f.get("changedAt").asString()) +
        formatLine("deletedAt", f.get("deletedAt").asString()) +
        formatLine("lastModificationAt", f.get("lastModificationAt").asString()) +
        formatLine("createdAtEpoch", f.get("createdAtEpoch").asString()) +
        formatLine("deletedAtEpoch", f.get("deletedAtEpoch").asString()) +
        formatEndline("lastModificationAt", f.get("lastModificationAt").asString());
  }

  private String toJsonGitAuthor(Node a) {
    return formatLine("identString", a.get("identString").asString()) +
        formatLine("name", a.get("name").asString()) +
        formatEndline("email", a.get("email").asString());
  }

  private String formatLine(String key, String value) {
    return "\"" + key + "\":            \"" + value + "\",";
  }

  private String formatEndline(String key, String value) {
    return "\"" + key + "\":            \"" + value + "\"";
  }
}
