export interface Props {
  /** 
   * @title Título da Vitrine
   * @default Quem viu esta <b>categoria</b>, viu também:
  */
  relatedTitle?: string;
}

const ProductRelatedTitle = ({ relatedTitle }: Props) => {

  return (
    <>
      <div class="w-full">
        {relatedTitle &&
          <h2
            class="text-center font-normal text-gray-3 font-montserrat text-xl mt-24"
            dangerouslySetInnerHTML={{ __html: relatedTitle }}
          />
        }
      </div>
    </>
  );
}

export default ProductRelatedTitle;