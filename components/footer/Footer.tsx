import BackToTop from "$store/islands/BackToTop.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Logo from "$store/components/footer/Logo.tsx";
import MobileApps from "$store/components/footer/MobileApps.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import Social from "$store/components/footer/Social.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type {
  BottomInfoProps,
  CertificateProps,
  ManagedByProps
} from "$store/components/footer/custom/interfaces/interfaces.ts";
import BottomInfo from "$store/components/footer/custom/BottomInfo.tsx";
import Certificates from "$store/components/footer/custom/Certificates.tsx";
import ManagedBy from "$store/islands/Managedby.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label: "Facebook" | "Instagram" | "YouTube" | "Tiktok" | "Blog";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa" | "Hipercard" | "PayPal" | "Amex" | "Boleto";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
  | "Primary"
  | "Secondary"
  | "Accent"
  | "Base 100"
  | "Base 100 inverted";
  variation?:
  | "Variation 1"
  | "Variation 2"
  | "Variation 3"
  | "Variation 4"
  | "Variation 5";
  hide?: {
    logo?: boolean;
    bottomInfo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    certificates?: boolean;
    managedBySection?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
    link?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  /**
  * @title Informativos do Rodapé
  */
  bottomInfo?: BottomInfoProps;
  /**
  * @title Certificados
  */
  certificates?: CertificateProps[];
  managedBySection?: ManagedByProps;
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

const LAYOUT = {
  "Primary": "bg-primary text-primary-content",
  "Secondary": "bg-secondary text-secondary-content",
  "Accent": "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social,
  payments,
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      certificates: false,
      managedBySection: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
  bottomInfo,
  certificates,
  managedBySection
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );

  const _bottomInfo = layout?.hide?.bottomInfo ? <></> : (
    <BottomInfo bottomInfo={bottomInfo && { ...bottomInfo }} />
  );
  const _certificates = layout?.hide?.certificates ? <></> : (
    <Certificates content={{ certificates }} />
  );
  const _managedBy = layout?.hide?.managedBySection ? <></> : (
    <ManagedBy content={{ managedBySection }} />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social && { ...social }} vertical={layout?.variation == "Variation 3"} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments && { ...payments }} />;

  return (
    <footer class="w-full flex flex-col pt-10 pb-10 gap-10">
      
      {/* Footer Desktop */}
      <div class="Footer-desktop-cy w-full full-tablet:hidden">
        <div class="flex flex-col gap-10">
          {_newsletter}
          {_bottomInfo}
          {layout?.hide?.newsletter ? <></> : <Divider />}
          <div class="flex flex-row justify-between px-16">
            {_sectionLinks}
            <div class="flex flex-col md:flex-row lg:flex-col gap-10 w-[40%]">
              <div class="flex flex-row justify-end">
                <div class="flex-auto max-w-64 mr-8 cs-min-lg-desktop:mr-36">
                  {_payments}
                </div>
                <div class="flex-auto max-w-56">
                  {_logo}
                  <Divider />
                  {_social}
                  <Divider />
                  {_certificates}
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center">
            {_managedBy}
          </div>
        </div>
      </div>

      {/* Footer Mobile */}
      <div class="Footer-mobile-cy w-full cs-min-desktop:hidden pb-28">
        <div class="flex flex-col gap-5">
          {_newsletter}
          {_bottomInfo}
          {_sectionLinks}
          {_payments}
          <div class="flex-col items-center max-w-56 mx-auto py-7">
            {_logo}
            <Divider />
            {_social}
            <Divider />
            {_certificates}
          </div>
          <Divider />
          {_managedBy}
        </div>
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
    </footer>
  );
}

export default Footer;
