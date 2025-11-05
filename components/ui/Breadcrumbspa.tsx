interface Props {
  /**
   * @title Nome da página
   */
  pageText?: string;
}

const Breadcrumbspa = ({ pageText }: Props) => {
  return (
    <div class="breadcrumbs w-auto py-[6px] px-3">
      <ul class="text-white">
        <li>
          <a class="text-sm" href="/phytospa">
            Home
          </a>
        </li>
        {pageText && (
          <li class="text-sm">
            {pageText}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbspa;
