import type { Props as InformativeTopBarProps } from "$store/components/header/Header.tsx";

export interface Props {
  /** 
* @title Esconder/Mostrar Topbar Informativa
* @default false
*/
  showTopBar?: boolean;
  /** 
* @title Texto da Topbar
* @description Insira aqui o texto de aviso.
* @default Loren ipsum dolor sit amet
*/
  text?: string;
}

const InformativeTopBar = (info): InformativeTopBarProps => {

  const data = info.info;

  return data?.showTopBar ? (
    <div className="informative-topbar w-full bg-gray-3">
      <p className="informative-topbar-text text-center tracking-normal leading-none font-arial font-bold text-[13px] w-full py-[10px] flex justify-center items-center text-white">
        {data?.text}
      </p>
    </div>
  ) : null;
}

export default InformativeTopBar;