import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { Props as CouponProps } from "$store/components/header/Custom/CopyCoupon.tsx";
import type { Props as CartProps } from "$store/components/minicart/common/Cart.tsx";
import type { Props as FSProps } from "$store/components/header/Header.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton, FloatingHeaderSearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import CopyCoupon from "$store/islands/Header/CopyCoupon.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { Buttons, Logo, FloatingHeaderLogo, MobileLogo } from "$store/components/header/Headerspa.tsx";
import FreeShippingTopBar from "$store/islands/Header/FreeShippingTopBar.tsx";

export interface NavbarProps {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  cupom?: CouponProps;
  logo?: Logo;
  floatingLogo?: FloatingHeaderLogo;
  mobileLogo?: MobileLogo;
  buttons?: Buttons;
  fsTopBar?: FSProps;
  logoPosition?: "left" | "center";
  device: "mobile" | "desktop" | "tablet";
  cartProps?: CartProps;
}


// Make it sure to render it on the server only. DO NOT render it on an island
function Navbarspa({
  items,
  searchbar,
  cupom,
  logo,
  fsTopBar,
  floatingLogo,
  mobileLogo,
  buttons,
  logoPosition = "left",
}: NavbarProps
) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile header */}
      <div class="cs-min-desktop:hidden">
        <div class="mobile-header-container overcontent flex items-center justify-between border-b border-solid border-gray-1 w-full px-6 full-tablet:px-4 full-tablet:py-4 gap-6">
          <MenuButton />
          <a
            class="flex items-center text-xs font-thin"
            href="/login?returnUrl=%2Faccount"
            aria-label="Account"
          >
            <div class="flex items-center justify-center">
              <Icon id="Account" size={25} />
            </div>
          </a>
          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center"
              aria-label="Store logo"
            >
              <Image
                src={mobileLogo?.src}
                alt={mobileLogo?.alt}
                width={mobileLogo?.width || 100}
                height={mobileLogo?.height || 13}
              />
            </a>
          )}

          <div class="flex justify-end gap-6">
            <FloatingHeaderSearchButton />
            {platform === "vtex" && <CartButtonVTEX />}
          </div>
          <Searchbar searchbar={searchbar} />
        </div>
        <div class="flex justify-center items-center py-2 border-b border-gray-1">
          <CopyCoupon cupom={cupom} />
        </div>
      </div>

      {/* Mobile Bottom Floating Header */}
      <div class="floating-header cs-min-desktop:hidden fixed bottom-0 w-full -z-10 opacity-0">
        <FreeShippingTopBar
          show={fsTopBar?.show}
          currency={fsTopBar?.currency}
          locale={fsTopBar?.locale}
          target={fsTopBar?.target}
        />
        <div class="min-h-[71px] bg-white flex justify-between items-center border-b border-base-200 w-full px-6 gap-2">
          <div class="menu-button-bottom flex flex-col items-center">
            <MenuButton />
            <p class="menu-button-text text-[10px] uppercase font-montserrat tracking-[.05em]">
              Menu
            </p>
          </div>
          <div class="account-button-bottom flex flex-col items-center">
            <a class="flex items-center text-xs font-thin" href="/login?returnUrl=%2Faccount" aria-label="Account">
              <div class="flex items-center justify-center">
                <Icon id="Account" size={25} />
              </div>
            </a>
            <p class="account-button-text text-[10px] uppercase font-montserrat tracking-[.05em]">
              Minha Conta
            </p>
          </div>
          <div class="search-button-bottom flex flex-col items-center">
            <FloatingHeaderSearchButton />
            <p class="search-button-text text-[10px] uppercase font-montserrat tracking-[.05em]">
              Buscar
            </p>
          </div>
          <div class="minicart-button-bottom flex flex-col items-center">
            {platform === "vtex" && <CartButtonVTEX />}
            <p class="minicart-button-text text-[10px] uppercase font-montserrat tracking-[.05em]">
              Carrinho
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Header */}

      <div class="full-tablet:hidden header-middle overcontent overflow-hidden flex justify-between items-center border-b border-t border-gray-1 w-full px-[64px] py-[23px]">
        <div
          class={`flex ${logoPosition === "left"
            ? "justify-start -order-1"
            : "justify-center"
            }`}
        >
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
              />
            </a>
          )}
        </div>
        <div class="flex-none relative flex items-center justify-end gap-6 col-span-1">
          <div class="flex items-center text-xs font-thin gap-1">
            <SearchButton />
          </div>
          <Searchbar searchbar={searchbar} />
          <div class="flex items-center">
            <CopyCoupon cupom={cupom} />
          </div>
          {!buttons?.hideAccountButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/login?returnUrl=%2Faccount"
              aria-label="Account"
            >
              <div class="flex items-center justify-center">
                <Icon id="Account" size={25} />
              </div>
            </a>
          )}

          {!buttons?.hideCartButton && (
            <div class="flex items-center text-xs font-thin">
              {platform === "vtex" && <CartButtonVTEX />}
            </div>
          )}
        </div>
      </div>
      <div>
        <ul
          class={`full-tablet:hidden flex relative justify-between col-span-1 px-[64px] border-b border-gray-1 ${logoPosition === "left" ? "justify-center" : "justify-start"
            }`}
        >
          {items.map((item) => <NavItem item={item} />)}
        </ul>
      </div>

      {/* Desktop Header Flutuante */}

      <div class="floating-header-desktop max-w-[1920px] mx-auto full-tablet:hidden fixed w-full border-b border-gray-1 top-0 -z-10 opacity-0">
        <div class="floating-header-container relative px-16 sm-desktop:px-8 flex justify-between items-center bg-white">
          <div
            class={`flex ${logoPosition === "left"
              ? "justify-start -order-1"
              : "justify-center"
              }`}
          >
            {floatingLogo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block"
              >
                <Image
                  src={floatingLogo.src}
                  alt={floatingLogo.alt}
                  width={floatingLogo.width || 100}
                  height={floatingLogo.height || 13}
                />
              </a>
            )}
          </div>
          <ul
            class={`flex justify-between w-full col-span-1 px-[64px] ${logoPosition === "left" ? "justify-center" : "justify-start"
              }`}
          >
            {items.map((item) => <NavItem item={item} />)}
          </ul>
          <div class="flex items-center gap-10">
            <div class="flex items-center text-xs font-thin gap-1">
              <FloatingHeaderSearchButton />
            </div>
            {!buttons?.hideAccountButton && (
              <a
                class="flex items-center text-xs font-thin"
                href="/login?returnUrl=%2Faccount"
                aria-label="Account"
              >
                <div class="flex items-center justify-center">
                  <Icon id="Account" size={25} />
                </div>
              </a>
            )}

            {!buttons?.hideCartButton && (
              <div class="flex items-center text-xs font-thin">
                {platform === "vtex" && <CartButtonVTEX />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


export default Navbarspa;