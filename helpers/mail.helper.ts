import {
  GetInboxRequest,
  GetMessageRequest,
  DeleteInboxMessagesRequest,
  Inbox,
  MailinatorClient,
  Message,
  Sort,
  DeletedMessages,
} from 'mailinator-client';
import { IRestResponse } from 'typed-rest-client';
import * as cheerio from 'cheerio';

export type MailinatorInboxClientConfig = {
  apiKey: string;
  domain: string;
};

const mailConfig: MailinatorInboxClientConfig = {
  apiKey: 'cc54f937eaea4b6397b534912709b694',
  domain: 'team610662.testinator.com',
};

// https://www.mailinator.com/docs/index.html?shell#the-mailinator-api
// https://github.com/manybrain/mailinator-javascript-client

class MailinatorInboxClient {
  private readonly mailinatorClient: MailinatorClient;

  constructor(private readonly config: MailinatorInboxClientConfig) {
    this.mailinatorClient = new MailinatorClient(config.apiKey);
  }

  public async getInboxMessages(
    inboxName: string,
    filter = { skip: 0, limit: 20, sort: Sort.DESC, decodeSubject: true },
  ): Promise<Inbox> {
    const request = new GetInboxRequest(
      this.config.domain,
      inboxName,
      filter.skip,
      filter.limit,
      filter.sort,
      filter.decodeSubject,
    );

    const response: IRestResponse<Inbox> = await this.mailinatorClient.request(request);

    if (!response.result) {
      throw new Error(`Failed to get inbox messages: ${JSON.stringify(response)}`);
    }

    return response.result;
  }

  public async getInboxMessage(inboxName: string, messageId: string): Promise<Message> {
    const messageRequest = new GetMessageRequest(this.config.domain, inboxName, messageId);

    const response: IRestResponse<Message> = await this.mailinatorClient.request(messageRequest);

    if (!response.result) {
      throw new Error(`Failed to get inbox message: ${JSON.stringify(response)}`);
    }

    return response.result;
  }

  public async getLatestInboxMessage(inboxName: string): Promise<Message> {
    const inbox = await this.getInboxMessages(inboxName);

    if (!inbox.msgs || inbox.msgs.length === 0) {
      throw new Error(`No messages found in inbox ${inboxName}`);
    }

    return this.getInboxMessage(inboxName, inbox.msgs[0].id);
  }

  public async waitForMessage(email: string, timeout = 30000): Promise<Message> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        // eslint-disable-next-line no-await-in-loop
        return await this.getLatestInboxMessage(this.getInboxNameFromEmail(email));
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }

    throw new Error(`Failed to get inbox message in ${timeout}ms`);
  }

  public getInboxNameFromEmail(email: string): string {
    const [inboxName, domain] = email.split('@');

    if (this.config.domain !== domain) {
      throw new Error(`Invalid email domain: ${domain}`);
    }

    return inboxName;
  }

  public getEmailFromInboxName(inboxName: string): string {
    return `${inboxName}@${this.config.domain}`;
  }

  public async deleteAllMessagesForEmail(email: string): Promise<void> {
    const deleteInboxMessagesRequestPayload = new DeleteInboxMessagesRequest(
      this.config.domain,
      this.getInboxNameFromEmail(email),
    );

    const response: IRestResponse<DeletedMessages> = await this.mailinatorClient.request(
      deleteInboxMessagesRequestPayload,
    );

    if (response.result?.status !== 'ok') {
      throw new Error(`Failed to delete inbox messages: ${JSON.stringify(response)}`);
    }
  }

  public async getLatestMessageBodyFor(email: string, timeout = 30000): Promise<string> {
    const message = await this.waitForMessage(email, timeout);
    return message.parts[0].body;
  }

  public getJoinYourTeamLink(html: any) {
    const $ = cheerio.load(html);
    const link = $('a:contains("Join your team")'); //"click here" link
    return this.getHrefValue(link);
  }

  getDeleteAccountLink(html: any) {
    const $ = cheerio.load(html);
    const link = $('a:contains("Delete account")'); //"click here" link
    return this.getHrefValue(link);
  }

  getHrefValue(link) {
    const href = link.attr('href');
    console.log(href);
    return href;
  }
}

export const mailinatorInboxClient = new MailinatorInboxClient(mailConfig);
