import ProductTabbedContent from "$store/islands/ProductTabbedContent.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { ProductProps } from "$store/loaders/CustomProductLoader.ts";

export interface Props {
  page: ProductDetailsPage | null;
  productAs: ProductProps | null;
}

const ProductTabbedInfo = ({ page, productAs }: Props) => {
  
  const product = page?.product;
  const descriptionContent: any = product?.isVariantOf?.hasVariant[0]?.description

  return (
    <>
      <ProductTabbedContent 
        descriptionContent={descriptionContent}
        page={page}
        productAs={productAs}
      />
    </>
  );
}

export default ProductTabbedInfo;