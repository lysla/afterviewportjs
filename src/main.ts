import { AfterViewportJs } from "./av";
import { AfterViewportJsOptions } from "./av-options";

import "./av.scss";

function afterViewportJs(
  selector: string,
  options?: AfterViewportJsOptions
): AfterViewportJs {
  return new AfterViewportJs(selector, options);
}

new AfterViewportJs();

export default afterViewportJs;
