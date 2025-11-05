import type { Props as FloatingHeaderProps } from "./HeaderSpa.tsx"
import { clx } from "site/sdk/clx.ts";
import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

const scrollAction = signal(false);

const FloatingMobileBar = ({ menu }: FloatingHeaderProps) => {

  useEffect(() => {
    globalThis.addEventListener('scroll', function () {
      const verticalOffset = globalThis.scrollY;
      const bodyMaxHeight = (document?.querySelector('body')?.scrollHeight as number);
      if (verticalOffset > 250 && verticalOffset < bodyMaxHeight - 920) {
        scrollAction.value = true;
      } else {
        scrollAction.value = false;
      }
    });
  }, [])

  return (
    <div class={clx(
      `fixed bottom-0 cs-min-desktop:hidden header-wrapper w-full 
      px-4 h-20 flex justify-between items-center bg-white
      transition-3s
      ${scrollAction.value ? "opacity-100 overcontent" : "opacity-0 -z-10"}`,
    )}>
      <div class="navigation-bar w-full">
        <ul class="menu-wrapper w-full flex justify-center items-center gap-4">
          {menu?.map((item, index) => {
            return item?.menuName !== "Início" ? (
              <li key={index}>
                <a class="flex flex-col items-center justify-center gap-1" href={item?.menuLink}>
                  <img
                    src={item?.icon}
                    class="size-6"
                    width={24}
                    height={24}
                  />
                  <span class="font-montserrat text-center font-medium text-xs text-[#717171] hover:text-primary">
                    {item?.menuName}
                  </span>
                </a>
              </li>
            ) : (
              null
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default FloatingMobileBar;