import { AfterViewportJsGroup } from "./av-group";
export type AfterViewportJsItem = AfterViewportJsItemInterface;
interface AfterViewportJsItemInterface {
    element: Element;
    wrapper?: Element;
    group: AfterViewportJsGroup;
    animation: string;
    duration: string;
    delay: string;
}
export {};
