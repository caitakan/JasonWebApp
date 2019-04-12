// tslint:disable-next-line:encoding
declare module "react-adal" {
  // tslint:disable-next-line:interface-name
  export interface AdalConfig {
    tenant: string;
    clientId: string;
    endpoints: {
      api: string;
    };
    postLogoutRedirectUri?: string | undefined;
    redirectUri?: string | undefined;
    cacheLocation?: string | undefined;
    expireOffsetSeconds?: number | undefined;
  }

  // tslint:disable-next-line:interface-name
  export interface CompleteAdalConfig extends AdalConfig {
    loginResource: string | undefined;
  }

  export interface IAdalUser {
    userName: string;
    profile: {
      family_name: string;
      given_name: string;
      name: string;
      unique_name: string;
      upn: string;
      ver: string;
    };
  }

  // tslint:disable-next-line:interface-name
  export interface AuthenticationContext {
    config: CompleteAdalConfig;
    getCachedToken(resource: string): string | undefined;
    getCahcedUser(): IAdalUser | undefined;
  }

  export class AuthenticationContext implements AuthenticationContext {
    public config: CompleteAdalConfig;

    constructor(adalConfig: AdalConfig);

    public acquireToken(resource: string, callback: TokenCallback): void;
    public getCachedToken(resource: string): string | undefined;
    public getCachedUser(): IAdalUser | undefined;
  }

  export type TokenCallback = (
    errorDesc: string | null,
    token: string | null,
    // tslint:disable-next-line:no-any
    error: any
  ) => void;

  export function runWithAdal(
    authContext: AuthenticationContext,
    callback: () => void,
    login: boolean
    // tslint:disable-next-line:no-any
  ): any;

  // TODO: Temp work around
  // tslint:disable-next-line:no-any
  export const adalFetch: any;
  // tslint:disable-next-line:no-any
  export const withAdalLogin: any;
}
