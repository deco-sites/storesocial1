import { BreadcrumbList, ProductDetailsPage } from "apps/commerce/types.ts";
import ProductFloatingBuy from "$store/components/product/ProductFloatingBuy.tsx";
import { useId } from "$store/sdk/useId.ts";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import ProductImageGallery from "$store/components/product/ProductImageGallery.tsx";
import ProductInfo from "$store/components/product/ProductInfo.tsx";
import FloatingBuyScroll from "$store/islands/FloatingBuyScroll.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
export interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

const ProductMain = ({page, layout}: Props) => {

  const { product }:any = page;
  const { offers } = product;
  const { availability } = useOffer(offers);

  const breadcrumbList: BreadcrumbList | undefined = page?.breadcrumbList;
  const breadcrumb: any = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1)
  };

  const id = useId();

  return (
    <div class="max-w-[1400px] w-full px-8 mx-auto">
      <div class="breadcrumbs w-full font-arial text-gray-3">
        <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      </div>
      <div id={id} class="image-info-wrapper w-full flex xmd-tablet:flex-col items-start justify-between gap-12">
        <div class="image-wrapper w-1/2 xmd-tablet:w-full">
          <ProductImageGallery page={page} />
        </div>
        <div class="product-info-wrapper w-[40%] xmd-tablet:w-full">
          <ProductInfo page={page} layout={layout} />
        </div>
      </div>
      <ProductFloatingBuy page={page} />
      {availability === "https://schema.org/InStock" && (
        <FloatingBuyScroll />
      )}
    </div>
  );
}

export default ProductMain;