import type { ProductListingPage } from "apps/commerce/types.ts";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";

export interface Props {
  page: ProductListingPage | null
}

const CategoryBreadcrumbs = ({ page }: Props) => {

  const { breadcrumb }: any = page === null ? "" : page;

  return page !== null ? (
    <div class="breadcrumbs font-arial text-gray-3 w-full px-16 full-tablet:px-4 mx-auto my-7">
      <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
    </div>
  ) : (
    <div class="w-full px-16 full-tablet:px-4 mx-auto breadcrumbs my-7">
      <ul>
        <li>
          <a class="text-sm" href="/">
            Home
          </a>
        </li>
        <li>
          <a class="text-sm" href={"#"}>
            Página não encontrada
          </a>
        </li>
      </ul>
    </div>
  )
}

export default CategoryBreadcrumbs;