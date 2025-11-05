import type { Props } from "$store/components/uniqueProduct/interfaces/interfaces.ts";

const UniqueProduct = ({ uniqueProduct }: Props) => {

  return (
    <div className="w-full flex justify-center items-center mt-16 mb-12">
      <div className="flex max-w-3xl w-full items-center justify-between xsm-tablet:flex-col">
        <div className="title-text-cta flex flex-col max-w-sm">
          <span className="title text-center mb-1 font-montserrat -tracking-tighter font-semibold text-lg text-gray-4">
            {uniqueProduct?.title}
          </span>
          <span className="subtitle text-center mb-6 font-montserrat text-gray-4 font-normal italic">
            {uniqueProduct?.subtitle}
          </span>
          <p className="description text-center mb-8 text-sm font-arial text-gray-4 font-normal">
            {uniqueProduct?.shortDescription}
          </p>
          <a 
            href={uniqueProduct?.link} 
            className="cta-button max-w-36 mx-auto transition-3s hover:bg-primary hover:text-white hover:border-primary text-center uppercase font-montserrat font-medium text-gray-4 text-xs border border-gray-4 rounded-full px-9 py-2">
            {uniqueProduct?.ctaText}
          </a>
        </div>
        <div className="image max-w-64">
          <a href={uniqueProduct?.link} className="Home-uniqueProduct-cy image-link">
            <img 
              src={uniqueProduct?.image} 
              alt={uniqueProduct?.title} 
              className="w-full" 
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default UniqueProduct;