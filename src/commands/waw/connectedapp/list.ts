import {core, SfdxCommand, flags} from '@salesforce/command';

core.Messages.importMessagesDirectory(__dirname);
const messages = core.Messages.loadMessages('sfdx-waw-plugin', 'connectedapp_list');

export default class List extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  protected static flagsConfig = {
    connectedappname: flags.string(
      {
        char: 'n', 
        description: messages.getMessage('connectedAppNameFlagDescription'),
      })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<any> { // tslint:disable-line:no-any
    
    const connectedAppName = this.flags.connectedappname;

    // refresh auth
    await this.org.refreshAuth();

    this.org.getConnection().metadata.read('ConnectedApp', connectedAppName, (readErr, metadataResult) => {

      if (readErr) {
        this.ux.error(readErr);
        return;
      }
 
      this.ux.logJson(metadataResult);

    });
  }
}