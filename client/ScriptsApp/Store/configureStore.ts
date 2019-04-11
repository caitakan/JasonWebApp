import Constants from "../Constants";
import configureStoreDev from "./configureStore.dev";
import configureStoreProd from "./configureStore.prod";

const configure =
  process.env.NODE_ENV === Constants.environmentMode.production ? configureStoreProd : configureStoreDev;

// tslint:disable-next-line:export-name
export default configure;
