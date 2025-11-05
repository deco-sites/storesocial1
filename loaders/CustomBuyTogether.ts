import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export interface BuyTogetherProps {
  buyTogether: any;
}

export default async function CustomBuyTogether({ page }: Props): Promise<BuyTogetherProps | null> {
  
  const productId = page?.product?.inProductGroupWithID;
  const urlFetch = `https://phytoterapica.vtexcommercestable.com.br/api/catalog_system/pub/products/crossselling/showtogether/${productId}`;
  const buyTogetherReq = await fetch(urlFetch);
  const fetchedBuyTogether = await buyTogetherReq.json();

  return {
    buyTogether: fetchedBuyTogether
  }
}