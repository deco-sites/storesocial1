import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { Props as ECProps } from "$store/components/header/Header.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
  ecButtons?: ECProps;
  fsTopBar?: ECProps;
}

const Aside = (
  { title, onClose, children }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
  },
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] cs-min-desktop:max-h-full h-full divide-y max-w-[100vw]">
    <div class="flex justify-between items-center">
      <h1 class="px-4 py-3">
        <span class="font-montserrat font-regular text-gray-4 text-sm uppercase tracking-[.05em]">{title}</span>
      </h1>
      {onClose && (
        <Button aria-label="X" class="bg-transparent hover:bg-transparent border-none border-0" onClick={onClose}>
          <Icon id="CloseDrawer" size={18} strokeWidth={2} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform, ecButtons, fsTopBar }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <>
      <Drawer // menu drawer
        open={displayMenu.value}
        onClose={() => {
          displayMenu.value = false;
        }}
        aside={
          <Aside
            onClose={() => {
              displayMenu.value = false;
            }}
            title="Menu"
          >
            {
              displayMenu.value &&
              <Menu {...menu} />
            }
          </Aside>
        }
      >
        {children}
      </Drawer>
      <Drawer // Minicart drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            title="Meu carrinho"
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} ecButtons={ecButtons} fsTopBar={fsTopBar} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </>
  );
}

export default Drawers;
