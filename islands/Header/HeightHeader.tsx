import { useEffect } from "preact/hooks";

const HeightHeader = () => {

  useEffect(() => {

    globalThis.addEventListener('scroll', function () {

      const floatingHeader = document.querySelector('.floating-header');
      const floatingHeaderDesk = document.querySelector('.floating-header-desktop');
      const verticalOffset = globalThis.scrollY;

      if (verticalOffset > 175) {
        floatingHeader?.classList.add('opacity-100', 'overcontent');
        floatingHeaderDesk?.classList.add('opacity-100', 'overcontent');
        floatingHeader?.classList.remove('opacity-0', '-z-10');
        floatingHeaderDesk?.classList.remove('opacity-0', '-z-10');
      } else {
        floatingHeader?.classList.add('opacity-0', '-z-10');
        floatingHeaderDesk?.classList.add('opacity-0', '-z-10');
        floatingHeader?.classList.remove('opacity-100', 'overcontent');
        floatingHeaderDesk?.classList.remove('opacity-100', 'overcontent');
      }
    })

    const floatingHeaderSearch = document.querySelector('.search-button-bottom');
    const modal = document.querySelector('.modal:not(dialog:not(.modal-open))');
    
    floatingHeaderSearch?.addEventListener('click', function () {
      modal?.classList?.add('mobile-header-open');
      const modalOpen = document.querySelector('.modal-backdrop');
      
      modalOpen?.addEventListener('click', function () {
        modal?.classList?.remove('mobile-header-open');
      })
    })


  }, [])

  return null;
}

export default HeightHeader;