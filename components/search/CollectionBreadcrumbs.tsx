export interface Props {
  /** 
   * @title Nome da Coleção 
   * @default Coleção
  */
  collectionName: string;
  /** 
   * @title URL da Coleção 
   * @default /colecao
  */
  collectionUrl: string;
}

const SearchBreadcrumbs = ({ collectionName, collectionUrl }: Props) => {

  return (
    <div class="w-full px-16 mx-auto breadcrumbs my-7">
      <ul>
        <li>
          <a class="text-sm" href="/">
            Home
          </a>
        </li>
        <li>
          <a class="text-sm" href={collectionUrl}>
            {collectionName}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SearchBreadcrumbs;