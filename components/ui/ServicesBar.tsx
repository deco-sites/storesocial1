import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
    firstitem?: {
        image: ImageWidget;
        title?: string;
    };
    seconditem?: {
        image: ImageWidget;
        title?: string;
    };
    thirditem?: {
        image: ImageWidget;
        title?: string;
    };
    fourthitem?: {
        image: ImageWidget;
        title?: string;
    };
}

export default function ServicesBar(
    { firstitem, seconditem, thirditem, fourthitem }: Props,
) {
    return (
        <div className="flex fixed bottom-0 w-full bg-white z-50">
             <div className="w-[25%] flex flex-col justify-center">
                <div className="flex justify-center">
                    <img
                        loading="lazy"
                        src={firstitem?.image}
                        width={24}
                        height={24}
                    />
                    </div>
                    <div className="flex justify-center">
                    <p className="font-montserrat text-[12px] text-[#3e2b24]">{firstitem?.title}</p>
                    </div>
            </div>
            <div className="w-[25%] flex flex-col justify-center">
                <div className="flex justify-center">
                    <img
                        loading="lazy"
                        src={seconditem?.image}
                        width={24}
                        height={24}
                    />
                    </div>
                    <div className="flex justify-center">
                    <p className="font-montserrat text-[12px] text-[#3e2b24]">{seconditem?.title}</p>
                    </div>
            </div>
            <div className="w-[25%] flex flex-col justify-center">
                <div className="flex justify-center">
                    <img
                        loading="lazy"
                        src={thirditem?.image}
                        width={24}
                        height={24}
                    />
                    </div>
                    <div className="flex justify-center">
                    <p className="font-montserrat text-[12px] text-[#3e2b24]">{thirditem?.title}</p>
                    </div>
            </div>
            <div className="w-[25%] flex flex-col justify-center">
                <div className="flex justify-center">
                    <img
                        loading="lazy"
                        src={seconditem?.image}
                        width={24}
                        height={24}
                    />
                    </div>
                    <div className="flex justify-center">
                    <p className="font-montserrat text-[12px] text-[#3e2b24]">{thirditem?.title}</p>
                    </div>
            </div>
        </div>
    );
}