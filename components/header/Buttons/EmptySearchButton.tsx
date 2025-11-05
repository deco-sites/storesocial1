import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function EmptySearchButton() {
  const { displaySearchPopup } = useUI();

  return (
    <>
      <Button
        class="sm:flex font-bold font-montserrat text-sm h-12 -tracking-tighter text-primary align-center min-h-12 border-primary border border-solid rounded-full bg-white hover:bg-primary hover:border-primary hover:text-white px-[50.5px]"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
        >
        <Icon id="LupaGreen" size={14} />
        O que você procura?
      </Button>
    </>
  );
}
