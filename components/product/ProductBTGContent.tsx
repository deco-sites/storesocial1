import AddToCartButtonBTG from "$store/islands/AddToCartButton/vtexBTG.tsx";
import { useSignal } from "@preact/signals";
import { formatPrice } from "$store/sdk/format.ts";

const ProductBTGContent = (
  {
    actualProductID,
    actualProductName,
    actualProductPrice,
    currency,
    actualProductImage,
    buyTogetherName,
    buyTogetherPrice,
    buyTogetherImage,
    btgProductLink,
    btgProductID
  }: any) => {

  const quantity1: any = useSignal(1);
  const quantity2: any = useSignal(1);

  return (
    <div class="buy-together-wrapper w-full flex lg-tablet:flex-wrap items-start justify-between lg-tablet:justify-center gap-10 full-phone:gap-2 mb-24">
      <div class="buy-products-wrapper w-full flex items-center justify-between gap-8 full-phone:gap-1 cs-xsm-phone:flex-col">
        <div class="actual-product max-w-[346px] full-phone:max-w-[150px] cs-xsm-phone:max-w-full">
          <div class="product-image flex justify-center w-full">
            <img src={actualProductImage} class="max-w-[346px] w-full" />
          </div>
          <div class="product-name truncate min-h-10 mt-6">
            <span class="text-sm font-semibold text-gray-4 -tracking-tighter">{actualProductName}</span>
          </div>
          <div class="product-price flex items-center justify-start">
            <span class="font-arial font-bold text-base text-primary mr-4">{formatPrice(actualProductPrice, currency)}</span>
            <div class="w-20 flex items-center justify-center border border-gray-1 rounded-full py-2 px-1">
              <div class="flex items-center justify-between">
                <button class="font-montserrat font-normal text-lg" onClick={() =>
                  quantity1.value > 1 ? quantity1.value = quantity1.value - 1 : null
                }>
                  -
                </button>
                <input type="number" class="max-w-[22px] text-center font-montserrat font-normal text-sm text-gray-3" value={quantity1.value} />
                <button class="font-montserrat font-normal text-lg" onClick={() =>
                  quantity1.value = quantity1.value + 1
                }>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <span class="font-montserrat font-light text-gray-6 text-[40px] full-phone:text-xl cs-min-desktop:relative cs-min-desktop:bottom-8">+</span>
        <div class="buy-together-product max-w-[346px] full-phone:max-w-[150px] cs-xsm-phone:max-w-full">
          <a href={`/${btgProductLink}/p`}>
            <div class="product-image flex justify-center w-full">
              <img src={buyTogetherImage} class="max-w-[346px] w-full" />
            </div>
          </a>
          <div class="product-name truncate min-h-10 mt-6">
            <span class="text-sm font-semibold text-gray-4 -tracking-tighter">{buyTogetherName}</span>
          </div>
          <div class="product-price flex items-center justify-start">
            <span class="font-arial font-bold text-base text-primary mr-4">{formatPrice(buyTogetherPrice, currency)}</span>
            <div class="w-20 flex items-center justify-center border border-gray-1 rounded-full py-2 px-1">
              <div class="flex items-center justify-between">
                <button class="font-montserrat font-normal text-lg" onClick={() =>
                  quantity2.value > 1 ? quantity2.value = quantity2.value - 1 : null
                }>
                  -
                </button>
                <input type="number" class="max-w-[22px] text-center font-montserrat font-normal text-sm text-gray-3" value={quantity2.value} />
                <button class="font-montserrat font-normal text-lg" onClick={() =>
                  quantity2.value = quantity2.value + 1
                }>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <span class="lg-tablet:hidden font-montserrat lg-tablet:w-full font-light text-gray-6 text-[40px] cs-min-desktop:relative cs-min-desktop:bottom-8">=</span>
      </div>
      <span class="cs-xmin-tablet:hidden font-montserrat lg-tablet:w-full font-light text-gray-6 text-[40px] full-phone:text-3xl lg-tablet:text-center">=</span>
      <div class="buy-together-combo w-full max-w-[361px] px-4 py-10 border border-gray-9 cs-min-desktop:min-h-[346px] flex flex-col justify-between items-center">
        <div class="combo-product-images flex items-center justify-center gap-2">
          <img src={buyTogetherImage} class="w-14 full-tablet:w-20" />
          <span class="font-arial text-base text-gray-6">+</span>
          <img src={actualProductImage} class="w-14 full-tablet:w-20" />
        </div>
        <div class="product-price text-center my-10">
          <span class="text-primary font-arial font-normal text-xl">por {formatPrice(actualProductPrice + buyTogetherPrice, currency)}</span>
        </div>
        <div class="buy-together-add-to-cart w-full">
          <AddToCartButtonBTG
            seller="1"
            actualProductID={actualProductID}
            btgProductID={btgProductID}
            quantity1={quantity1.value}
            quantity2={quantity2.value}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductBTGContent;