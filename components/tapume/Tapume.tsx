import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  image: ImageWidget;
}

const Tapume = ({ image }: Props) => {

  return (
    <div class="w-full h-full fixed flex flex-col z-full items-center justify-center gap-8 top-0 left-0 bg-white">
      <img
        class="mx-auto w-full max-w-[600px]" 
        src={image}
        width={1100}
        height={850}
        loading="lazy"
      />
      <div class="text-center w-full flex justify-center items-center">
        <span class="font-bold text-3xl">
          Estamos em Manutenção. Logo retornaremos com mais novidades
        </span>
      </div>
    </div>
  )
}

export default Tapume;