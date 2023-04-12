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
      /* check if typewriter effect is requested */
      let gTypewriter = element.hasAttribute("data-av-typewriter")
        ? true
        : false;
      /* options override */
      if (options?.typewriter) {
        gTypewriter = options.typewriter;
      }

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

      /* if the typewriter effect is requested i adjust the dom and refresh the elements array */
      if (gTypewriter) {
        /* i adjust the group name so it doesn't conflict with other potential groups that don't want the typewriter effect */
        gName = gName + "--typewriter";
        let text = element.textContent;
        let letters =
          text
            ?.trim()
            .replace(/\s+/g, " ")
            .replace(/\r?\n|\r/g, "")
            .split("") ?? [];
        element.textContent = "";
        let minSingleDuration = 10;
        let singleDuration = minSingleDuration;
        if (element.hasAttribute("data-av-animation-duration")) {
          singleDuration =
            Number(element.getAttribute("data-av-animation-duration")) /
            letters.length;
        }
        singleDuration =
          singleDuration < minSingleDuration
            ? minSingleDuration
            : singleDuration > minSingleDuration * 100
            ? minSingleDuration * 100
            : singleDuration;
        for (let l = letters.length - 1; l >= 0; l--) {
          const wrapper = document.createElement("span");
          element.insertAdjacentElement("afterend", wrapper);
          wrapper.textContent = letters[l];
          let attributes = element.attributes;

          for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            wrapper.setAttribute(attr.name, attr.value);
          }
          wrapper.setAttribute("data-av", gName);
          wrapper.setAttribute(
            "data-av-animation-duration",
            singleDuration.toString()
          );
        }
      }

      /* creation of the groups array */
      let group: AfterViewportJsGroup = {
        name: gName,
        sequential: gSequential,
        resets: gResets,
        onlyWhenTotallyIn: gOnlyWhenTotallyIn,
        typewriter: gTypewriter,
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

        /* the element parallax */
        let eParallax = element.hasAttribute("data-av-parallax") ? true : false;
        /* options override */
        if (options?.parallax) {
          eParallax = options.parallax;
        }
        if (options?.optionsItem && options.optionsItem[i].parallax) {
          eParallax = options.optionsItem[i].parallax ?? eParallax;
        }

        group.items.push({
          element: element,
          group: group,
          animation: eAnimation,
          duration: eDuration,
          delay: eDelay.toString(),
          parallax: eParallax,
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
          `av-animation av-animation--${
            item.animation
          } av-animation-duration av-animation-delay ${
            group.typewriter ? "av-animation-typewriter" : ""
          }`
        );
        item.wrapper?.setAttribute(
          "style",
          `transition-duration:${item.duration}ms;animation-duration:${item.duration}ms;transition-delay:${item.delay}ms;animation-delay:${item.delay}ms;`
        );
      });
    });
  }

  private listenersCallback(event: any): void {
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
                item.wrapper?.classList.add("av-ani-end");
                item.wrapper?.setAttribute(
                  "style",
                  `transition-duration:${item.duration}ms;animation-duration:${
                    item.duration
                  }ms;transition-delay:${
                    Number(item.delay) * counter
                  }ms;animation-delay:${Number(item.delay) * counter}ms;`
                );
                switch (item.animation) {
                  case "av-style-12":
                    anime({
                      targets: item.element.querySelector("path"),
                      strokeDashoffset: [anime.setDashoffset, 0],
                      easing: "linear",
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
              item.wrapper?.setAttribute(
                "style",
                `transition-duration:${item.duration}ms;animation-duration:${item.duration}ms;transition-delay:${item.delay}ms;animation-delay:${item.delay}ms;`
              );
              switch (item.animation) {
                case "av-style-12":
                  anime({
                    targets: item.element.querySelector("path"),
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: "linear",
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
          /* if the item needs parallax */
          if (item.parallax && event.type == "wheel") {
            /* i take the original translate y position */
            let oTranslate: any = window
              .getComputedStyle(item.element)
              .getPropertyValue("transform");
            if (oTranslate != "none") {
              oTranslate = oTranslate.split(",")[5].trim().replace(")", "");
            } else {
              oTranslate = 0;
            }

            /* i calculate the y position based on the vertical center of the element */
            /* let elVCenter =
              item.element.getBoundingClientRect().top +
              item.element.clientHeight / 2;
            let wVCenter = window.innerHeight / 2; */

            /* i define the multiplier */
            let xBase = 20;
            let xDef = (xBase / item.element.clientHeight) * 100;
            //xDef = xDef < xBase ? xBase : xDef;

            /* i check what direction the user is scrolling */
            if (event.deltaY < 0) {
              oTranslate = Number(oTranslate) + xDef;
            } else {
              /* scrolling down */
              oTranslate = Number(oTranslate) - xDef;
            }

            item.element.setAttribute(
              "style",
              `transition-property: transform; transition-duration: 600ms; transition-timing-function: ease; transform: translateY(${oTranslate}px)`
            );
          }
          /* if the item is going out of the viewport i manage resets */
        } else {
          /* only if the group has the reset active */
          if (group.resets) {
            item.wrapper?.classList.remove("av-ani-end");
            item.wrapper?.setAttribute("style", "");
            switch (item.animation) {
              case "av-style-12":
                anime({
                  targets: item.element.querySelector("path"),
                  strokeDashoffset: [0, anime.setDashoffset],
                  easing: "linear",
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
      (event) => {
        this.listenersCallback(event);
      },
      {
        passive: true,
      }
    );
    window.addEventListener(
      "wheel",
      (event) => {
        this.listenersCallback(event);
      },
      {
        passive: true,
      }
    );
    window.addEventListener(
      "resize",
      (event) => {
        this.listenersCallback(event);
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
