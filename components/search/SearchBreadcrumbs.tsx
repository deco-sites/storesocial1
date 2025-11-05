import type { ProductListingPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductListingPage | null
}

const SearchBreadcrumbs = ({ page }: Props) => {

  const { seo }: any = page === null ? "" : page;
  

  return (
    <div class="w-full px-16 full-tablet:px-4 mx-auto breadcrumbs my-7">
      <ul>
        <li>
          <a class="text-sm" href="/">
            Home
          </a>
        </li>
        <li>
          {seo === "" ? (
            <a class="text-sm" href={seo?.canonical}>
              {seo?.title}
            </a>
            ) : (
            <a class="text-sm" href={"#"}>
              Busca vazia
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}

export default SearchBreadcrumbs;