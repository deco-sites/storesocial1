function ButtonCookies() {
  return (
    <button
      class="block font-montserrat font-regular text-left text-gray-3 -tracking-tighter hover:text-primary"
      //@ts-ignore
      onClick={() => globalThis.window.sendAdoptCommand("open")}
    >
      Preferências de Cookies asdasd
    </button>
  );
}

export default ButtonCookies;
