import type { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
    page: ProductDetailsPage | null;
}

const ProductId = ({ page }: Props) => {

    const prodId = page?.product?.productID;

    return prodId;
}

export default ProductId;