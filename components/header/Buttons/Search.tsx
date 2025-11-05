import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function SearchButton() {
  const { displaySearchPopup } = useUI();

  return (
    <>
      <Button
        class="sm:flex font-normal font-arial text-[13px] tracking-[.05em] color-gray-3 align-center min-h-[32px] h-[32px] bg-transparent hover:bg-transparent border-solid border-gray-1 hover:border-primary hover:text-primary border-[1px] rounded-[25px] px-[50.5px]"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
        >
        <Icon id="Lupa" size={15} class="text-inherit" />
        <span class="text-inherit">O que você procura?</span>
      </Button>
      <Button
        class="btn-circle btn-sm btn-ghost sm:hidden"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <Icon id="Lupa" size={15} />
      </Button>
    </>
  );
}
