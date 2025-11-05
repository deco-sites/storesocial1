import ProductBTGContent from "$store/islands/ProductBTGContent.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { BuyTogetherProps } from "$store/loaders/CustomBuyTogether.ts";

export interface Props {
  page: ProductDetailsPage | null;
  buyTogether: BuyTogetherProps | null;

  /**
   * @title Título de vitrine Compre Junto
   * @default Produtos frequentemente comprados juntos:
   */
  buyTogetherTitle?: string;
}

const ProductBuyTogether = ({ page, buyTogether, buyTogetherTitle }: Props) => {

  const actualProduct: any = page?.product;
  const actualProductName: any = actualProduct?.name;
  const actualProductID: any = page?.product?.inProductGroupWithID;
  const actualProductPrice: any = page?.product?.offers?.offers[0]?.price;
  const currency: any = page?.product?.offers?.priceCurrency;
  const actualProductImage: any = actualProduct?.image[0]?.url;

  return buyTogether?.buyTogether?.length > 0 && (
    <div class="max-w-[1400px] w-full mx-auto px-8">
      <div class="title-buy-together mt-24 mb-8 text-center">
        <h2 class="font-medium text-xl text-gray-3">
          {buyTogetherTitle}
        </h2>
      </div>
      {buyTogether?.buyTogether?.map((item: any) => {

        const buyTogetherPrice = item?.items[0]?.sellers[0]?.commertialOffer?.Price;
        const buyTogetherName = item?.productName
        const buyTogetherImage = item?.items[0]?.images[0]?.imageUrl;
        const btgProductLink = item?.linkText;
        const btgProductID = item?.productId;

        return (
          <>
            <ProductBTGContent
              actualProductName={actualProductName}
              actualProductID={actualProductID}
              actualProductPrice={actualProductPrice}
              currency={currency}
              actualProductImage={actualProductImage}
              buyTogetherPrice={buyTogetherPrice}
              buyTogetherName={buyTogetherName}
              buyTogetherImage={buyTogetherImage}
              btgProductLink={btgProductLink}
              btgProductID={btgProductID}
            />
          </>
        );
      })
      }
    </div>
  );
}

export default ProductBuyTogether;