package org.getaviz.generator.extract;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.getaviz.generator.ProgrammingLanguage;
import org.getaviz.generator.SettingsConfiguration;
import org.getaviz.generator.database.DatabaseConnector;
import org.neo4j.driver.v1.StatementResult;
import java.util.ArrayList;
import java.util.List;

public class Importer {
    private static Log log = LogFactory.getLog(Importer.class);
    private ScanStep scanStep;
    private GitHubIssuesScan gitHubIssuesScan;
    private ArrayList<ProgrammingLanguage> languages = new ArrayList<>();
    private SettingsConfiguration config;
    private Runtime runtime = Runtime.getRuntime();

    public Importer(SettingsConfiguration config){
        this.scanStep = new ScanStep(config.getInputFiles(), config.isSkipScan());
        this.gitHubIssuesScan = new GitHubIssuesScan(config);
        this.config = config;
    }

    public Importer(String inputFiles) {
        this.scanStep = new ScanStep (inputFiles, false);
    }

    public void run() {
        gitHubIssuesScan.run();
        log.info("Import started");
        scanStep.setConfig(gitHubIssuesScan.getConfig());
        scanStep.run();
        log.info("Import finished");
    }

    public List<ProgrammingLanguage> getImportedProgrammingLanguages() {
        if(isJava()) {
            languages.add(ProgrammingLanguage.JAVA);
            log.info("Found imported Java artifacts");
        }
        if(isC()){
            languages.add(ProgrammingLanguage.C);
            log.info("Found imported C artifacts");
        }
        return languages;
    }


    private boolean isC() {
        DatabaseConnector connector = DatabaseConnector.getInstance();
        StatementResult result = connector.executeRead("MATCH (n:C) RETURN n LIMIT 2");
        return result.hasNext();
    }

    private boolean isJava() {
        DatabaseConnector connector = DatabaseConnector.getInstance();
        StatementResult result = connector.executeRead("MATCH (n:Java) RETURN n LIMIT 2");
        return result.hasNext();
    }
}
