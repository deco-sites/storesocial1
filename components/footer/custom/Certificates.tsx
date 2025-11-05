import type { Props as CertificateProps } from "$store/components/footer/Footer.tsx";

const Certificates = ( content: CertificateProps ) => {
  
  return (
    <>
      <div class="flex flex-wrap gap-4 max-w-[225px] mx-auto mt-5">
        {content?.content?.certificates?.map((item: any) => (
            <a href={item.certificates?.link}>
              <img src={item.certificates?.image} class="w-auto" />
            </a>    
          )  
        )}
      </div>
    </>
  )
}

export default Certificates;