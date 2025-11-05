import Icon from "$store/components/ui/Icon.tsx";

const NotFound = () => {

  return (
    <div class="empty-search-wrapper max-w-[717px] mx-auto full-phone:px-4">
      <div class="icon-wrapper flex justify-center items-center mb-8">
        <Icon id="NotFound" width={50} height={50} stroke-width={2} />
      </div>
      <div class="text-center flex flex-col items-center">
        <span class="font-montserrat text-[22px] text-gray-3 mb-4 -tracking-tighter">
          Desculpe, esta página não foi encontrada
        </span>
        <span class="font-arial text-lg -tracking-tight text-gray-6 mb-6">
          A página que você está tentando acessar não existe ou está indisponível
        </span>
        <a href="/" class="uppercase flex justify-center items-center font-montserrat text-white bg-primary border-primary hover:bg-primary hover:opacity-80 rounded-full text-xs py-4 max-w-[333px] w-full mb-[51px]">
          Voltar às compras
        </a>
      </div>
    </div>
  );
}

export default NotFound;