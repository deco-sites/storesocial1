import Icon from "$store/components/ui/Icon.tsx";

export type Props = {
  pageInfo: {
    currentPage: number;
    nextPage?: string;
    previousPage?: string;
    records?: number;
    recordPerPage?: number;
  };
};

interface PageParams {
  page: number;
  href: string;
}

export default function CustomPagination({ pageInfo }: Props) {
  const { nextPage, previousPage } = pageInfo;
  const totalPages: number = Math.ceil(
    Number(pageInfo?.records) / Number(pageInfo?.recordPerPage),
  );
  const firstPage = 1;
  const moreThanFourPages = totalPages > firstPage + 3;

  const pageParams = new URLSearchParams(nextPage ?? previousPage);

  const currentPage = pageInfo.currentPage;
  const nextPageNumber = currentPage + 1;
  const prevPageNumber = currentPage - 1;
  const lastPage = totalPages;
  const shouldRenderFirstPage = currentPage >= 3;
  const shouldRenderLastPage = lastPage !== -1 && currentPage <= lastPage - 2;

  const eachPageParams: PageParams[] = Array.from(
    { length: Number(totalPages) },
    (_value, i) => {
      pageParams.set("page", `${i + 1}`);
      return {
        page: i + 1,
        href: pageParams.toString(),
      };
    },
  );

  function SimplePagination() {
    return (
      <>
        {eachPageParams.map(({ page, href }) => (
          <a
            aria-label={`pagina ${page}`}
            rel="page"
            href={`?${href}`}>
            <span class={`w-[35px] h-[35px] flex items-center justify-center font-montserrat font-medium border ${page === pageInfo?.currentPage ? "border-gray-6 text-gray-6" : "border-gray-1 text-gray-1"} rounded-md hover:text-primary hover:border-primary`}>
              {page}
            </span>
          </a>
        ))}
      </>
    );
  }


  function PaginationWithSpread() {
    return (
      <>
        {shouldRenderFirstPage && (
          <a
            aria-label="primeira pagina"
            rel="first"
            href={`?${eachPageParams[0].href}`}
            class="flex items-end gap-2"
          >
            <span class={`w-[35px] h-[35px] flex items-center justify-center font-montserrat font-medium border ${currentPage === firstPage ? "border-gray-6 text-gray-6" : "border-gray-1 text-gray-1"} rounded-md`}>
              {firstPage}
            </span>
            <span class="font-montserrat font-medium text-gray-1">
              ...
            </span>
          </a>
        )}
        {previousPage && (
          <a
            aria-label="pagina anterior"
            rel="prev"
            href={previousPage}
          >
            <span class={`w-[35px] h-[35px] flex items-center justify-center font-montserrat font-medium border border-gray-1 text-gray-1 rounded-md`}>
              {prevPageNumber}
            </span>
          </a>
        )}
        <span class={`w-[35px] h-[35px] flex items-center justify-center font-montserrat font-medium border border-gray-6 text-red-600 rounded-md`}>
          {currentPage}
        </span>
        {nextPage && (
          <a
            aria-label="proxima pagina"
            rel="next"
            href={nextPage}
          >
            <span class={`w-[35px] h-[35px] flex items-center justify-center font-montserrat font-medium border border-gray-1 text-gray-1 rounded-md`}>
              {nextPageNumber}
            </span>
          </a>
        )}
        {shouldRenderLastPage && (
          <a
            aria-label="ultima pagina"
            rel="last"
            href={`?${eachPageParams.pop()?.href}`}
            class="flex items-end gap-2"
          >
            <span class="font-montserrat font-medium text-gray-1">
              ...
            </span>
            <span class={`w-[35px] h-[35px] flex items-center justify-center font-montserrat font-medium border rounded-md ${currentPage === lastPage ? 'border-gray-6 text-gray-6' : 'border-gray-1 text-gray-1'}`}>
              {lastPage}
            </span>
          </a>
        )}
      </>
    );
  }


  return (
    <div class="flex items-center justify-center gap-2 mt-12">
      <a
        aria-label="previous page link"
        rel="prev"
        href={pageInfo?.previousPage ?? "#"}
        class="join-item w-[35px] h-[35px] flex items-center justify-center border border-gray-1 rounded-md hover:text-primary hover:border-primary"
      >
        <Icon
          id="PaginationChevronLeft"
          width={8}
          height={16}
        />
      </a>
      <div class="flex items-center justify-center gap-2">
        {!moreThanFourPages ? <SimplePagination /> : <PaginationWithSpread />}
      </div>
      <a
        aria-label="next page link"
        rel="next"
        href={pageInfo?.nextPage ?? "#"}
        class="join-item w-[35px] h-[35px] flex items-center justify-center border border-gray-1 rounded-md hover:text-primary hover:border-primary"
      >
        <Icon
          id="PaginationChevronright"
          width={8}
          height={16}
        />
      </a>
    </div >
  );
}