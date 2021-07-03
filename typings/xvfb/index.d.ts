declare module "xvfb" {
  class Xvfb {
    constructor(options: any);
    startSync(): void;
    stopSync(): void;
  }
  export = Xvfb;
}
