import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";
import FloatingDesktopHeaderPhytoSpa from "../../islands/FloatingDesktopHeaderPhytoSpa.tsx";
import FloatingMobileBar from "site/islands/FloatingMobileBar.tsx";

interface NavBarSpaItem {
  /** @title Ícone do Item de Menu */
  icon: ImageWidget;
  /** @title Nome do Item de Menu */
  menuName: string;
  /** @title Link do Item de Menu */
  menuLink: string;
}

export interface Props {
  /** @title Logo do Header PhytoSPA */
  logo?: {
    desktop: ImageWidget;
    mobile: ImageWidget;
  };
  /** @title Menu */
  menu: NavBarSpaItem[];
  /**
   * @title Link do Fale Conosco
   */
  link?: string;
}

const HeaderSpa = ({ logo, menu, link }: Props) => {
  return (
    <>
      {/* HEADER PHYTOSPA DESKTOP */}
      <div class="full-tablet:hidden header-wrapper w-full px-10 h-20 flex justify-between items-center">
        <div class="logo full-tablet:hidden">
          <a href="/phytospa">
            <Image
              src={logo?.desktop ?? ""}
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
                  <a
                    class="spa-area-link flex items-center justify-center gap-1"
                    href={item?.menuLink}
                    data-item={item.menuName}
                  >
                    <img
                      src={item?.icon}
                      class="size-6"
                      width={24}
                      height={24}
                    />
                    <span
                      class={`font-montserrat font-medium text-sm text-[#717171] hover:text-[#DCA15A] `}
                    >
                      {item?.menuName}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div class="whatsapp-button">
          <a href={link} class="w-[180px] h-12 gap-2 flex items-center justify-center bg-[#00582E] rounded-md hover:opacity-80">
            <Icon id="GreenWhatsApp" size={24} strokeWidth={1} />
            <span class="font-montserrat font-semibold text-sm text-white">
              Fale conosco
            </span>
          </a>
        </div>
      </div>
      {/* FLOATING PHYTOSPA HEADER */}
      <FloatingDesktopHeaderPhytoSpa
        logo={logo}
        menu={menu}
        link={link}
      />
      {/* HEADER PHYTOSPA TABLET/MOBILE */}
      <div class="cs-min-desktop:hidden flex justify-between items-center h-[71px] px-8">
        <div class="home-link-wrapper">
          <a href="/phytospa" class="flex flex-col items-center gap-[2px]">
            <Icon id="HomePhytospaMob" size={24} strokeWidth={1} />
            <span class="text-[#717171] text-xs font-inter">Início</span>
          </a>
        </div>
        <div class="w-full flex justify-center items-center">
          <a href="/">
            <Image
              src={logo?.mobile ?? ""}
              width={102}
              height={58}
              preload={true}
              loading="lazy"
            />
          </a>
        </div>
        {/* <div class="spacer"/> */}
        <div class="whatsapp-button">
          <a href={link} class="w-12 h-12 gap-2 flex items-center justify-center bg-[#00582E] rounded-md hover:opacity-80">
            <Icon id="GreenWhatsApp" size={24} strokeWidth={1} />
          </a>
        </div>
      </div>
      {/* FLOATING PHYTOSPA MOBILE BAR */}
      <FloatingMobileBar menu={menu} />
    </>
  );
};

export default HeaderSpa;
