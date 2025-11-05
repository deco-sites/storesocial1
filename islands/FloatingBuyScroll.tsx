import { useEffect } from "preact/hooks";

const FloatingBuyScroll = () => {

  useEffect(() => {

    globalThis.addEventListener('scroll', function () {

      const floatingBuyWrapper = document.querySelector('.floating-buy-wrapper');
      const bodyMaxHeight: any = document?.querySelector('body')?.scrollHeight;
      const verticalOffset = globalThis.scrollY;

      if (verticalOffset > 667 && verticalOffset < bodyMaxHeight - 920) {
        floatingBuyWrapper?.classList.add('opacity-100', 'z-50');
        floatingBuyWrapper?.classList.remove('opacity-0', '-z-10');
      } else {
        floatingBuyWrapper?.classList.add('opacity-0', '-z-10');
        floatingBuyWrapper?.classList.remove('opacity-100', 'z-50');
      }
    })

  }, [])

  return null;
}

export default FloatingBuyScroll;