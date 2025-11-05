import type { Props as FloatingHeaderProps } from "./HeaderSpa.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { clx } from "site/sdk/clx.ts";
import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

const scrollAction = signal(false);

const FloatingDesktopHeaderPhytoSpa = ({
  logo,
  menu,
  link,
}: FloatingHeaderProps) => {
  useEffect(() => {
    globalThis.addEventListener("scroll", function () {
      const verticalOffset = globalThis.scrollY;
      if (verticalOffset > 250) {
        scrollAction.value = true;
      } else {
        scrollAction.value = false;
      }
    });
  }, []);

  return (
    <div
      class={clx(
        `fixed top-0 full-tablet:hidden header-wrapper w-full 
      px-10 h-20 flex justify-between items-center bg-white
      transition-3s
      ${scrollAction.value ? "opacity-100 overcontent" : "opacity-0 -z-10"}`,
      )}
    >
      <div class="logo full-tablet:hidden">
        <a href="/">
          <Image
            src={logo?.desktop}
            width={230}
            height={60}
            preload={true}
          />
        </a>
      </div>
      <div class="navigation-bar w-full">
        <ul class="menu-wrapper w-full flex justify-center items-center gap-4">
          {menu?.map((item, index) => {
            return (
              <li key={index}>
                <a class="spa-area-link flex items-center justify-center gap-1" href={item?.menuLink} data-item={item?.menuName}>
                  <img
                    src={item?.icon}
                    class="size-6"
                    width={24}
                    height={24}
                  />
                  <span class="font-montserrat font-medium text-sm text-[#717171] hover:text-[#DCA15A]">
                    {item?.menuName}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div class="whatsapp-button">
        <a
          href={link}
          class="w-[180px] h-12 gap-2 flex items-center justify-center bg-[#00582E] rounded-md hover:opacity-80"
        >
          <Icon id="GreenWhatsApp" size={24} strokeWidth={1} />
          <span class="font-montserrat font-semibold text-sm text-white">
            Fale conosco
          </span>
        </a>
      </div>
    </div>
  );
};

export default FloatingDesktopHeaderPhytoSpa;
