import type { Props as ManagedByProps } from "$store/components/footer/Footer.tsx";


const ManagedBy = (content: ManagedByProps) => {
  const infoItem = content?.content?.managedBySection;

  return (
    <>
      <div class="cs-min-desktop:hidden flex flex-col items-center justify-center mb-4 gap-8">
        <>
          <button
            id="cookies-adopt"
            class="text-center text-gray-4 text-xs uppercase font-montserrat underline"
            onClick={()=> {
              globalThis.window.sendAdoptCommand("open");
            }}
          >
            Preferências de Cookies
          </button>
        <a
          href="/institucional/politica-de-privacidade"
          class="text-center text-gray-4 text-xs uppercase font-montserrat underline"
        >
          Aviso de Privacidade
        </a>
        <a
          href="/institucional/termos-e-condicoes"
          class="text-center text-gray-4 text-xs uppercase font-montserrat underline"
        >
          Termos e Condições
        </a>
        </>
      </div>
      <div class="flex full-tablet:flex-col full-tablet:items-center justify-between items-center w-full px-16">
        <div class="w-auto spacer"></div>
        <div class="w-full mx-auto flex justify-center items-center full-tablet:mb-5 px-3">
          <p
            class="Footer-operatedby-cy font-montserrat max-w-4xl -tracking-tighter text-xs text-gray-3 text-center"
            dangerouslySetInnerHTML={{ __html: infoItem?.operatedByText }}
          />
        </div>
        <div class="w-auto flex items-center full-tablet:flex-col full-tablet:items-center">
          <span class="font-montserrat min-w-20 -tracking-tighter text-[10px] text-gray-4 mr-2 full-tablet:text-center">
            Managed By
          </span>
          <a href={infoItem?.link} class="Footer-sociallogo-link-cy">
            <img src={infoItem?.image} class="max-w-32" />
          </a>
        </div>
      </div>
    </>
  );
};

export default ManagedBy;
