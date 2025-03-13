import koa from 'koa';
import { Server, createServer } from 'http';
import { app as appConfig } from './config';
import body from 'koa-bodyparser';
import compress from 'koa-compress';
import logger from 'koa-logger';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import { capture, handle } from './error';
import { cors as corsConfig } from './config';
import { helmet as helmetConfig } from './config';

/**
 * The application class
 *
 * ```ts
 * const app = new App.create();
 * app.start();
 * ```
 */
export class App extends koa {
  private static _instance: App;
  private static _config: { [x: string]: any };
  public http: Server;
  private constructor() {
    super();
  }
  /**
   * create a application
   * @param config  a object, Record<string,any>
   */
  public static create(config: { [x: string]: any }) {
    App._instance = new App();
    App._config = config;
    App._instance.http = createServer(App.instance.callback());
    App._instance.use(logger());
    App._instance.use(cors(corsConfig));
    App._instance.use(body(config.body));
    App._instance.use(compress());
    App._instance.use(helmet.contentSecurityPolicy(helmetConfig));
    App._instance.use(conditional());
    App._instance.use(etag());
    App._instance.use(capture());
    App._instance.on('error', (e, ctx) => handle(e, ctx));

    return App.instance;
  }
  /**
   * single app instance
   */
  public static get instance() {
    return App._instance;
  }
  /**
   * static config
   */
  public static get config() {
    return App._config;
  }
  /**
   * http listen start
   */
  public async start() {
    this.http.listen(appConfig.port);
    console.log(
      `http server start at http://${appConfig.domain}:${appConfig.port}`
    );
  }
}
