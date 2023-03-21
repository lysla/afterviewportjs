export type AfterViewportJsGroup = AfterViewportJsGroupInterface;

interface AfterViewportJsGroupInterface {
  name: string;
  sequential: string | boolean;
  resets: boolean;
  onlyWhenTotallyIn: boolean;
}
