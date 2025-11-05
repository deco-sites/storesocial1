import { useEffect } from "preact/hooks";

const HideShowFiltersDesktop = () => {

  useEffect(() => {

    const showHideButton: any = document.querySelector('.dummy-hide-show-filters');
    const sortButton: any = document.querySelector('.sort-button');
    const filtersWrapper: any = document.querySelector('.filters-wrapper');
    const sortWrapper: any = document.querySelector('.sort-wrapper');

    showHideButton.addEventListener('click', function () {
        filtersWrapper.classList.toggle('hide');
        sortWrapper.classList.add('hide');
    })
    sortButton.addEventListener('click', function () {
        sortWrapper.classList.toggle('hide');
        filtersWrapper.classList.add('hide');
    })

  }, [])

  return null;
}

export default HideShowFiltersDesktop;