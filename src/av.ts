import { AfterViewportJsOptions } from "./av-options";
import { AfterViewportJsItem } from "./av-item";
import { AfterViewportJsGroup } from "./av-group";
import { InViewport } from "./av-viewports";

import imagesLoaded from "imagesloaded";
import anime from "animejs";

export class AfterViewportJs {
  public options!: AfterViewportJsOptions;

  private groups: AfterViewportJsGroup[] = [];

  constructor(
    selector: string = "[data-av]",
    options?: AfterViewportJsOptions
  ) {
    let elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      /* the group name if present */
      let gName = element.getAttribute("data-av") ?? "";
      /* options override */
      if (options?.group) {
        gName = options.group;
      }

      /* the sequence of the group */
      let gSequential = element.getAttribute("data-av-sequential") ?? false;
      gSequential = gSequential !== false ? true : false;
      /* options override */
      if (options?.sequential) {
        gSequential = options.sequential;
      }

      /* if this group resets */
      let gResets = element.hasAttribute("data-av-resets") ? true : false;
      /* options override */
      if (options?.resets) {
        gResets = options.resets;
      }

      /* if this group animate only when totally in */
      let gOnlyWhenTotallyIn = element.hasAttribute(
        "data-av-only-when-totally-in"
      )
        ? true
        : false;
      /* options override */
      if (options?.onlyWhenTotallyIn) {
        gOnlyWhenTotallyIn = options.onlyWhenTotallyIn;
      }

      /* creation of the groups array */
      let group: AfterViewportJsGroup = {
        name: gName,
        sequential: gSequential,
        resets: gResets,
        onlyWhenTotallyIn: gOnlyWhenTotallyIn,
        items: [],
      };

      if (
        !this.groups.find((g: AfterViewportJsGroup) => g.name == group.name)
      ) {
        this.groups.push(group);
      }
    });

    /* assignment of the relative items to the group */
    this.groups.forEach((group) => {
      let elements = document.querySelectorAll(`[data-av="${group.name}"]`);
      if (selector != "[data-av]") {
        elements = document.querySelectorAll(selector);
      }
      let elementsArray = Array.from(elements);

      /* if there needs to be a specific sequence */
      if (group.sequential) {
        elementsArray.sort((a, b) => {
          let aVal = a.getAttribute("data-av-sequential") ?? "";
          let bVal = b.getAttribute("data-av-sequential") ?? "";

          /* options override */
          let aIndex = elementsArray.indexOf(a);
          let bIndex = elementsArray.indexOf(b);
          if (
            options?.optionsItem &&
            options.optionsItem[aIndex].sequentialOrder
          ) {
            aVal = options.optionsItem[aIndex].sequentialOrder ?? "";
          }
          if (
            options?.optionsItem &&
            options.optionsItem[bIndex].sequentialOrder
          ) {
            bVal = options.optionsItem[bIndex].sequentialOrder ?? "";
          }

          if (aVal > bVal) return 1;
          if (aVal < bVal) return -1;
          return 0;
        });
      }

      elementsArray.forEach((element, i) => {
        let defaultDuration = "600";
        let latestAddedItemDuration =
          group.items.length > 0
            ? group.items[group.items.length - 1].duration
            : "0";
        let latestAddedItemDelay =
          group.items.length > 0
            ? group.items[group.items.length - 1].delay
            : "0";

        /* the element animation */
        let defaultAnimation = "av-style-01";
        let eAnimation =
          element.getAttribute("data-av-animation") ?? defaultAnimation;
        /* options override */
        if (options?.animation) {
          eAnimation = options.animation;
        }
        if (options?.optionsItem && options.optionsItem[i].animation) {
          eAnimation = options.optionsItem[i].animation ?? defaultAnimation;
        }

        /* the element animation duration */
        let eDuration =
          element.getAttribute("data-av-animation-duration") ?? defaultDuration;
        /* options override */
        if (options?.duration) {
          eDuration = options.duration;
        }
        if (options?.optionsItem && options.optionsItem[i].duration) {
          eDuration = options.optionsItem[i].duration ?? defaultDuration;
        }

        /* the element animation delay */
        let eDelay = element.getAttribute("data-av-animation-delay") ?? 0;
        /* options override */
        if (options?.delay) {
          eDelay = options.delay;
        }
        if (options?.optionsItem && options.optionsItem[i].delay) {
          eDelay = options.optionsItem[i].delay ?? 0;
        }
        eDelay = eDelay
          ? eDelay
          : group.sequential
          ? Number(latestAddedItemDuration) + Number(latestAddedItemDelay)
          : eDelay;

        group.items.push({
          element: element,
          group: group,
          animation: eAnimation,
          duration: eDuration,
          delay: eDelay.toString(),
        });
      });
    });

    this.startBooting();

    window.addEventListener("load", () => {
      imagesLoaded("body", { background: true }, () => {
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

  private isInViewport(item: AfterViewportJsItem): InViewport {
    const inner = item.element.getBoundingClientRect();

    const outer = {
      top: 0,
      right: window.innerWidth || document.documentElement.clientWidth,
      bottom: window.innerHeight || document.documentElement.clientHeight,
      left: 0,
    };

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
    this.groups.forEach((group) => {
      group.items.forEach((item) => {
        this.elAddWrapper(item);
        item.wrapper?.setAttribute(
          "class",
          `av-animation av-animation--${item.animation} av-animation-duration av-animation-duration--${item.duration} av-animation-delay av-animation-delay--${item.delay}`
        );
      });
    });
  }

  private listenersCallback(): void {
    this.groups.forEach((group: AfterViewportJsGroup) => {
      group.items.forEach((item: AfterViewportJsItem) => {
        /* if the item is to be animated (in viewport, totally o partially) */
        if (
          this.isInViewport(item) == InViewport.In ||
          (!group.onlyWhenTotallyIn &&
            this.isInViewport(item) == InViewport.Partial)
        ) {
          /* if the group is sequential */
          if (group.sequential) {
            let counter = 1;
            /* only if its not already animated i continue with the sequence */
            if (!item.wrapper?.classList.contains("av-ani-end")) {
              /* and only if its in viewport i continue with the sequence */
              if (
                this.isInViewport(item) == InViewport.In ||
                (!group.onlyWhenTotallyIn &&
                  this.isInViewport(item) == InViewport.Partial)
              ) {
                item.wrapper?.classList.add(
                  "av-animation-delay--" + Number(item.delay) * counter
                );
                item.wrapper?.classList.add("av-ani-end");
                switch (item.animation) {
                  case "av-style-12":
                    anime({
                      targets: item.element.querySelector("path"),
                      strokeDashoffset: [anime.setDashoffset, 0],
                      easing: "easeInOutSine",
                      duration: Number.parseInt(item.duration),
                      delay: Number(item.delay) * counter,
                      direction: "normal",
                      loop: false,
                    });
                    break;

                  default:
                    break;
                }
                counter++;
              }
            }
            /* if the group isn't sequential */
          } else {
            if (!item.wrapper?.classList.contains("av-ani-end")) {
              item.wrapper?.classList.add("av-ani-end");
              switch (item.animation) {
                case "av-style-12":
                  anime({
                    targets: item.element.querySelector("path"),
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: "easeInOutSine",
                    duration: Number.parseInt(item.duration),
                    delay: Number.parseInt(item.delay),
                    direction: "normal",
                    loop: false,
                  });
                  break;

                default:
                  break;
              }
            }
          }
          /* if the item is going out of the viewport i manage resets */
        } else {
          /* only if the group has the reset active */
          if (group.resets) {
            item.wrapper?.classList.remove("av-ani-end");
            switch (item.animation) {
              case "av-style-12":
                anime({
                  targets: item.element.querySelector("path"),
                  strokeDashoffset: [0, anime.setDashoffset],
                  easing: "easeInOutSine",
                  duration: Number.parseInt(item.duration),
                  delay: Number.parseInt(item.delay),
                  direction: "normal",
                  loop: false,
                });
                break;

              default:
                break;
            }
          }
        }
      });
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
    item.element.insertAdjacentElement("afterend", wrapper);
    wrapper.appendChild(item.element);
    item.wrapper = wrapper;
  }
}
