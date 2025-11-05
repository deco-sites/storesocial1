import Icon from "$store/components/ui/Icon.tsx";

export default function WhatsappContact() {
  return (
    <div className="flex w-full justify-center mt-[40px]">
      <a
        href="https://wa.me/5511980183865?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20que%20oferecem,%20hor%C3%A1rios%20e%20valores."
        className="flex flex-row w-[351px] h-10 rounded bg-[#00582e] justify-center items-center hover:opacity-80"
      >
        <div>
          <Icon className="w-6 h-6" id="whatsappbtn" />
        </div>
        <div className="ml-[10px]">
          <span className="font-montserrat font-semibold text-sm text-white">
            Agendar Agora
          </span>
        </div>
      </a>
    </div>
  );
}
