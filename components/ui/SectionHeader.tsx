import { clx } from "$store/sdk/clx.ts";

export interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment?: "center" | "left";
  colorReverse?: boolean;
}

const fontSizeClasses = {
  Small: "lg:text-2xl",
  Normal: "lg:text-3xl",
  Large: "lg:text-4xl",
};

function Header(props: Props) {
  return (
    <>
      {props.title || props.description ? (
        <div
          class={`flex flex-col gap-2 ${
            props.alignment === "left" ? "text-left" : "text-center"
          }`}
        >
          {props.title && (
            <h2
              class={clx(
                "font-normal text-gray-3 font-montserrat text-xl mt-2",
                props.colorReverse
                  ? "text-primary-content"
                  : "text-base-content",
                "text-xl"
              )}
            >
              {props.title}
            </h2>
          )}
          {props.description && (
            <p
              class={clx(
                "leading-6 lg:leading-8",
                props.colorReverse
                  ? "text-primary-content"
                  : "text-base-content",
                fontSizeClasses[props.fontSize || "Small"]
              )}
            >
              {props.description}
            </p>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Header;
