import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function FloatingHeaderSearchButton() {
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  return (
    <>
      <Button
        class="flex full-tablet:hidden align-center bg-transparent hover:bg-transparent shadow-none border-none p-0 text-gray-4 hover:text-primary"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <Icon id="FloatingLupa" size={23} stroke-width={23} class="text-inherit" />
      </Button>
      <Button
        class="flex cs-min-desktop:hidden max-h-[23px] min-h-0 align-center bg-transparent hover:bg-transparent shadow-none border-none p-0"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <Icon id="FloatingLupa" size={23} />
      </Button>
    </>
  );
}
