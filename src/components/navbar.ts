import { b } from "../../lib/builder";

interface BuildContext {
  [key: string]: any;
  addEventListener?: Parameters<typeof HTMLElement.prototype.addEventListener>;
  children?: NodeListOf<ChildNode> | HTMLElement[];
  onBuild?: (element: HTMLElement) => void;
  style?: Partial<CSSStyleDeclaration>;
}

export function createNavbar(): HTMLElement {
  const nav = b("nav", {
    children: [
      b("ul", {
        children: [
          b("li", {
            children: [
              b("a", {
                innerText: "Home"
              })
            ]
          }),
          b("li", {
            children: [
              b("a", {
                href: "#",
                innerText: "About"
              })
            ]
          }),
          b("li", {
            children: [
              b("a", {
                href: "#",
                innerText: "Dropdown"
              }),
              b("ul", {
                className: "dropdown-menu",
                children: [
                  b("li", {
                    children: [
                      b("a", {
                        href: "#",
                        innerText: "Item 1"
                      })
                    ]
                  }),
                  b("li", {
                    children: [
                      b("a", {
                        href: "#",
                        innerText: "Item 2"
                      })
                    ]
                  }),
                  b("li", {
                    children: [
                      b("a", {
                        href: "#",
                        innerText: "Item 3"
                      })
                    ]
                  })
                ],
                onBuild: (element: HTMLElement) => {
                  element.style.display = "none"; // hide the menu by default
                }
              })
            ]
          }),
          b("li", {
            children: [
              b("a", {
                href: "#",
                innerText: "Contact"
              })
            ]
          })
        ]
      })
    ]
  });

  const dropdownMenus = nav.querySelectorAll("li");

  dropdownMenus.forEach((menu) => {
    const dropdownMenu = menu.querySelector(".dropdown-menu") as HTMLElement;
    if (dropdownMenu) {
      const dropdownLink = menu.querySelector("a[href='#']");
      dropdownLink?.addEventListener("click", (event) => {
        event.preventDefault(); // prevent the link from navigating to #
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
      });
    }
  });

  return nav;
}

document.body.append(createNavbar());
