import { EmptySearchButton } from "$store/islands/Header/Buttons.tsx";
import EmptySearchParams from "$store/islands/EmptySearchParams.tsx"
import Icon from "$store/components/ui/Icon.tsx";

const EmptySearch = () => {

  return (
    <div class="empty-search-wrapper max-w-[717px] mx-auto full-phone:px-4">
      <div class="icon-wrapper flex justify-center items-center mb-8">
        <Icon id="EmptySearch" width={50} height={50} stroke-width={2} />
      </div>
      <div class="text-center flex flex-col items-center">
        <span class="font-montserrat text-[22px] text-gray-3 mb-4 -tracking-tighter">
          Desculpe, não encontramos nenhum resultado para:
        </span>
        <div class="mb-4">
          <EmptySearchParams />
        </div>
        <span class="font-montserrat text-lg -tracking-tight text-gray-6 mb-[51px]">
          Experimente usar outro termo, pode ser que o seu produto tenha um nome diferente
        </span>
        <EmptySearchButton />
      </div>
    </div>
  );
}

export default EmptySearch;