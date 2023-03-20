import { AfterViewportJsGroup } from "./av-group";

export type AfterViewportJsItem = AfterViewportJsItemInterface;

interface AfterViewportJsItemInterface {
  element: Element;
  wrapper?: Element;
  group: AfterViewportJsGroup;
  animation: "fade" | "slide" | string;
}
