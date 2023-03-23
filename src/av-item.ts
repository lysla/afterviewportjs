import { AfterViewportJsGroup } from "./av-group";

export type AfterViewportJsItem = AfterViewportJsItemInterface;

interface AfterViewportJsItemInterface {
  element: Element;
  wrapper?: Element;
  group: AfterViewportJsGroup;
  animation: "av-style-1" | "av-style-2" | string;
  duration: string;
  delay: string | number;
}
