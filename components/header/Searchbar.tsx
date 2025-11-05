import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import Modal from "$store/components/ui/Modal.tsx";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  return (
    <Modal
      loading="lazy"
      open={displaySearchPopup.value}
      onClose={() => displaySearchPopup.value = false}
      class="flex justify-center"
    >
      <div class="search-bar-container absolute cs-lg-tablet:top-[135px] cs-md-tablet:top-[135px] cs-max-phone:top-[135px] xxsm-phone:top-[116px] cs-min-desktop:top-[44px] cs-min-desktop-left:right-[425px] cs-min-desktop-left-2:right-[420px] cs-md-laptop:right-[420px] bg-base-100 w-full cs-md-laptop:max-w-[352px] cs-max-desktop:max-w-[450px] cs-min-desktop-2:max-w-[650px] cs-min-xlg-desktop:max-w-[1065px] mx-auto full-tablet:max-w-[90%] rounded-[25px]">
        <Searchbar {...searchbar} />
      </div>
    </Modal>
  );
}

export default SearchbarModal;
