import { AfterViewportJsItem } from "./av-item";
export type AfterViewportJsGroup = AfterViewportJsGroupInterface;
interface AfterViewportJsGroupInterface {
    name: string;
    items: AfterViewportJsItem[];
    sequential: string | boolean;
    resets: boolean;
    onlyWhenTotallyIn: boolean;
}
export {};
