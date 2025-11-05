import { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  page: ProductDetailsPage | null;
}

const ProductRelatedTitle = ({ page }: Props) => {

  const { product }: any = page;
  const productName = product?.name;
  const finalName = productName?.split(' - ');

  return (
    <>
      <div class="w-full">
        <h2 class="text-center font-normal text-gray-3 font-montserrat text-xl mt-24">
          Quem viu <b>{finalName[0]}</b>, viu também:
        </h2>
      </div>
    </>
  );
}

export default ProductRelatedTitle;