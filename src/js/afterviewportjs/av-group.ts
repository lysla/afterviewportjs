export type AfterViewportJsGroup = AfterViewportJsGroupInterface;

interface AfterViewportJsGroupInterface {
  name: string;
  sequential: boolean;
  resets: boolean;
  onlyWhenTotallyIn: boolean;
}
