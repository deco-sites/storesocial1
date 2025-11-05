import { AppContext } from "$store/apps/site.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { Props as CouponProps } from "$store/components/header/Custom/CopyCoupon.tsx";
import type { Props as InfoTopBarProps } from "$store/components/header/Custom/InformativeTopBar.tsx";
import type { EmptyCartButtonsProps } from "$store/components/header/Interfaces/EmptyCartProps.ts";
import InformativeTopBar from "$store/islands/Header/InformativeTopBar.tsx";
import FreeShippingTopBar from "$store/islands/Header/FreeShippingTopBar.tsx";
import HeightHeader from "$store/islands/Header/HeightHeader.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import HelmetHead from "$store/islands/Head.tsx";
import Navbar from "./Navbar.tsx";
import { type SectionProps } from "@deco/deco";
export interface Logo {
    src: ImageWidget;
    alt: string;
    width?: number;
    height?: number;
}
export interface FloatingHeaderLogo {
    src: ImageWidget;
    alt: string;
    width?: number;
    height?: number;
}
export interface MobileLogo {
    src: ImageWidget;
    alt: string;
    width?: number;
    height?: number;
}
export interface Buttons {
    hideSearchButton?: boolean;
    hideAccountButton?: boolean;
    hideWishlistButton?: boolean;
    hideCartButton?: boolean;
}
export interface FSTopBar {
    /**
    * @title Esconde/Mostra TopBar de Frete Grátis
    * @default false
    */
    show?: boolean;
    /**
    * @title Esconde/Mostra TopBar de Frete Grátis do Minicart
    * @default false
    */
    showOnMinicart?: boolean;
    /**
    * @title Valor alvo para Frete Grátis
    * @description Insira o valor mínimo para ganhar Frete Grátis
    */
    target: number;
    /**
    * @title Localidade
    * @description Para este site é "BR" o padrão. Deixar como está.
    */
    locale: string;
    /**
    * @title Moeda Local
    * @description Para este site é "BRL" o padrão. Deixar como está.
    */
    currency: string;
}
export interface Props {
    alerts?: string[];
    /**
    * @title Botões do Minicart Vazio
    *
    */
    ecButtons: EmptyCartButtonsProps;
    /** @title Search Bar */
    searchbar?: Omit<SearchbarProps, "platform">;
    /**
     * @title Navigation items
     * @description Navigation items used both on mobile and desktop menus
    */
    navItems?: SiteNavigationElement[] | null;
    /** @title Logo Desktop */
    logo?: Logo;
    /** @title Logo do Header Flutuante */
    floatingLogo?: FloatingHeaderLogo;
    /** @title Logo Mobile */
    mobileLogo?: MobileLogo;
    logoPosition?: "left" | "center";
    cupom?: CouponProps;
    /**
     * @title Topbar Informativa
    */
    infoTopbar?: InfoTopBarProps;
    /**
     * @title Topbar de Frete Grátis
    */
    fsTopBar?: FSTopBar;
}
function Header({ searchbar, navItems = [], infoTopbar, fsTopBar, cupom, logo, floatingLogo, mobileLogo, logoPosition, buttons, ecButtons, device }: SectionProps<typeof loader>) {
    const platform = usePlatform();
    const items = navItems ?? [];
    return (<>
      <header>
        <Drawers menu={{ items }} searchbar={searchbar} platform={platform} ecButtons={ecButtons} fsTopBar={fsTopBar}/>
        <div class="header-main bg-base-100 w-full relative overcontent">
          <HeightHeader />
          <InformativeTopBar info={infoTopbar}/>
          <div class="full-tablet:hidden">
            <FreeShippingTopBar show={fsTopBar?.show} currency={fsTopBar?.currency} locale={fsTopBar?.locale} target={fsTopBar?.target}/>
          </div>
          <Navbar device={device} items={items} searchbar={searchbar && { ...searchbar, platform }} logo={logo} fsTopBar={fsTopBar && { ...fsTopBar }} floatingLogo={floatingLogo} mobileLogo={mobileLogo} logoPosition={logoPosition} buttons={buttons} cupom={cupom && { ...cupom }}/>
        </div>
        <HelmetHead />
      </header>
    </>);
}
export const loader = (props: Props, _req: Request, ctx: AppContext) => {
    return { ...props, device: ctx.device };
};
export default Header;
