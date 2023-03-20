import { AfterViewportJsOptions } from "./av-options";
import { AfterViewportJsItem } from "./av-item";
import { AfterViewportJsGroup } from "./av-group";
import { InViewport } from "./av-viewports";

import imagesLoaded from "imagesloaded";

export class AfterViewportJs {
  public items: AfterViewportJsItem[] = [];
  public options!: AfterViewportJsOptions;

  private groups: AfterViewportJsGroup[] = [];

  constructor(
    selector: string = "[data-av]",
    options?: AfterViewportJsOptions
  ) {
    let elements = document.querySelectorAll(selector);

    elements.forEach((item) => {
      let group: AfterViewportJsGroup = {
        name: item.getAttribute("data-av") ?? "",
        sequential: false,
        resets: false,
        onlyWhenTotallyIn: false,
      };
      if (
        group.name &&
        !this.groups.find((g: AfterViewportJsGroup) => g.name == group.name)
      ) {
        this.groups.push(group);
      }

      this.items.push({
        element: item,
        group: group,
        animation: item.getAttribute("data-av-animation") ?? "fade",
      });
    });

    this.startBooting();
    window.addEventListener("load", () => {
      imagesLoaded("body", { background: true }, () => {
        console.log("loaded!");
        this.init();
        this.addListeners();

        this.finishBooting();
      });
    });

    return this;
  }

  private startBooting(): void {
    document.querySelector("body")?.setAttribute("style", "opacity:0");
  }

  private finishBooting(): void {
    document.querySelector("body")?.setAttribute("style", "");
  }

  private getItemsInGroup(group: AfterViewportJsGroup): AfterViewportJsItem[] {
    let items = this.items.filter((i: AfterViewportJsItem) => {
      return i.group === group;
    });
    return items;
  }

  private isInViewport(item: AfterViewportJsItem): InViewport {
    const inner = item.element.getBoundingClientRect();

    const outer = {
      top: 0,
      right: window.innerWidth || document.documentElement.clientWidth,
      bottom: window.innerHeight || document.documentElement.clientHeight,
      left: 0,
    };

    let inV = false;
    // If the inner if inside the outer, just partially
    if (
      inner.bottom >= outer.top &&
      inner.right >= outer.left &&
      inner.top <= outer.bottom &&
      inner.left <= outer.right
    ) {
      // If the inner if inside the outer totally
      if (
        inner.top >= outer.top &&
        inner.left >= outer.left &&
        inner.bottom <= outer.bottom &&
        inner.right <= outer.right
      ) {
        return InViewport.In;
      }
      return InViewport.Partial;
    }
    return InViewport.Out;
  }

  protected init(): void {
    this.items.forEach((item) => {
      switch (item.animation) {
        case "fade":
          this.elAddWrapper(item);
          item.wrapper?.setAttribute(
            "class",
            "av-animation av-animation--fade"
          );
          break;

        default:
          break;
      }
    });
  }

  private listenersCallback(): void {
    this.items.forEach((item: AfterViewportJsItem) => {
      if (
        this.isInViewport(item) == InViewport.In ||
        (!item.group.onlyWhenTotallyIn &&
          this.isInViewport(item) == InViewport.Partial)
      ) {
        item.wrapper?.classList.add("av-ani-end");
      } else {
        if (item.group.resets) {
          item.wrapper?.classList.remove("av-ani-end");
        }
      }
    });
  }

  private addListeners(): void {
    window.addEventListener(
      "scroll",
      () => {
        this.listenersCallback();
      },
      {
        passive: true,
      }
    );
    window.addEventListener(
      "resize",
      () => {
        this.listenersCallback();
      },
      {
        passive: true,
      }
    );
    window.dispatchEvent(new Event("resize"));
  }

  private elAddWrapper(item: AfterViewportJsItem): void {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "av-wrapper");
    item.element.insertAdjacentElement("afterend", wrapper);
    wrapper.appendChild(item.element);
    item.wrapper = wrapper;
  }
}
