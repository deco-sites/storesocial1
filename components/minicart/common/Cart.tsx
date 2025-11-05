import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import type { Props as ECProps } from "$store/components/minicart/vtex/Cart.tsx";
import FreeShippingTopBar from "$store/islands/Header/FreeShippingTopBar.tsx";

export interface Props {
    items: Item[];
    loading: boolean;
    total: number;
    subtotal: number;
    discounts: number;
    locale: string;
    ecButtons?: ECProps;
    fsTopBar?: ECProps;
    currency: string;
    coupon?: string;
    freeShippingTarget: number;
    checkoutHref: string;
    onUpdateQuantity: ItemProps["onUpdateQuantity"];
    itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
    items,
    total,
    subtotal,
    locale,
    coupon,
    loading,
    ecButtons,
    fsTopBar,
    currency,
    discounts,
    checkoutHref,
    itemToAnalyticsItem,
    onUpdateQuantity
}: Props) {

    const { displayCart } = useUI();
    const isEmtpy = items.length === 0;
    const buttons = ecButtons?.ecButtons;
    const buttonOne = buttons?.button1;
    const buttonTwo = buttons?.button2;
    const buttonThree = buttons?.button3;

    return (
        <div
            class="flex flex-col justify-start items-center overflow-hidden"
            style={{ minWidth: "calc(min(100vw, 375px))", maxWidth: "375px" }}
        >
            {isEmtpy
                ? (
                    <div class="flex flex-col mt-[39px] relative h-full w-full items-center">
                        <span class="font-regular font-montserrat text-center text-[12px] uppercase tracking-[.05em]">
                            Seu carrinho está vazio
                        </span>
                        <span class="font-extrabold text-center text-primary font-montserrat text-[13px] uppercase tracking-[.05em]">
                            Comece a explorar:
                        </span>
                        <div class="empty-cart-button-wrapper flex flex-col gap-[16.58px] mt-[33.63px]">
                            {buttonOne?.buttonShow && (
                                <a href={buttonOne?.buttonLink}>
                                    <div class="button-wrapper transition-3s hover:shadow-button rounded-[8px] flex flex-col gap-[8px] bg-gray-2 w-[243px] h-[104px] items-center justify-center">
                                        <img src={buttonOne?.buttonIcon} class="button-icon" />
                                        <p class="button-text font-montserrat text-[12px] text-gray-4 text-center uppercase tracking-[.05em]">
                                            {buttonOne?.buttonText}
                                        </p>
                                    </div>
                                </a>
                            )}
                            {buttonTwo?.buttonShow && (
                                <a href={buttonTwo?.buttonLink}>
                                    <div class="button-wrapper transition-3s hover:shadow-button rounded-[8px] bg-gray-2 w-[243px] h-[104px] flex flex-col gap-[8px] items-center justify-center">
                                        <img src={buttonTwo?.buttonIcon} class="button-icon" />
                                        <p class="button-text font-montserrat text-[12px] text-gray-4 text-center uppercase tracking-[.05em]">
                                            {buttonTwo?.buttonText}
                                        </p>
                                    </div>
                                </a>
                            )}
                            {buttonThree?.buttonShow && (
                                <a href={buttonThree?.buttonLink}>
                                    <div class="button-wrapper transition-3s hover:shadow-button rounded-[8px] bg-gray-2 w-[243px] h-[104px] flex flex-col gap-[8px] items-center justify-center">
                                        <img src={buttonThree?.buttonIcon} class="button-icon" />
                                        <p class="button-text font-montserrat text-[12px] text-gray-4 text-center uppercase tracking-[.05em]">
                                            {buttonThree?.buttonText}
                                        </p>
                                    </div>
                                </a>
                            )}
                        </div>
                        <div class="absolute bottom-0 w-full min-h-[224px]">
                            <div class="flex flex-col justify-end items-center gap-4 min-h-[224px] pb-[34px]">
                                <FreeShippingTopBar
                                    show={fsTopBar?.showOnMinicart}
                                    currency={fsTopBar?.currency}
                                    locale={fsTopBar?.locale}
                                    target={fsTopBar?.target}
                                />
                                <a href="/account#/orders" class="flex items-center">
                                    <Icon id="Repeat" width={18} height={21} />
                                    <span class="text-gray-3 tracking-[.05em] font-arial text-[12px] ml-[7.72px]">Repetir último pedido</span>
                                </a>
                                <Button class="w-[90%] font-montserrat text-[12px] mx-auto font-medium hover:bg-primary uppercase bg-primary hover:opacity-80 text-white tracking-[.05em] rounded-full" onClick={() => {
                                    displayCart.value = false;
                                }}>
                                    Ir às compras
                                </Button>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <>
                        {/* Cart Items */}
                        <ul
                            role="list"
                            class="mt-6 px-2 flex-grow overflow-y-auto pb-[20px] flex flex-col gap-6 w-full"
                        >
                            {items.map((item, index) => (
                                <li key={index}>
                                    <CartItem
                                        item={item}
                                        index={index}
                                        locale={locale}
                                        currency={currency}
                                        onUpdateQuantity={onUpdateQuantity}
                                        itemToAnalyticsItem={itemToAnalyticsItem}
                                    />
                                </li>
                            ))}
                        </ul>

                        {/* Cart Footer */}
                        <footer class="w-full">
                            {/* Subtotal */}
                            <FreeShippingTopBar
                                show={fsTopBar?.showOnMinicart}
                                currency={fsTopBar?.currency}
                                locale={fsTopBar?.locale}
                                target={fsTopBar?.target}
                            />
                            <div class="border-b border-gray-1 py-4 flex flex-col">
                                <div class="w-full flex justify-between px-4 text-sm">
                                    <span class="font-arial tracking-[.05em] uppercase text-gray-4 text-sm">Subtotal</span>
                                    <span class="font-arial tracking-[.05em] uppercase text-gray-4 text-sm">
                                        {formatPrice(subtotal, currency, locale)}
                                    </span>
                                </div>
                            </div>
                            {discounts > 0 && (
                                <div class="border-b border-gray-1 py-4 flex flex-col">
                                    <div class="flex justify-between items-center px-4">
                                        <span class="font-arial tracking-[.05em] uppercase text-gray-4 text-sm">Descontos</span>
                                        <span class="font-arial tracking-[.05em] uppercase text-gray-4 text-sm">
                                            {formatPrice(discounts, currency, locale)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Total */}
                            <div class="border-b border-gray-1 py-4 flex flex-col">
                                <div class="flex justify-between items-center px-4">
                                    <span class="font-arial tracking-[.05em] uppercase text-gray-4 text-sm">Total</span>
                                    <span class="font-bold font-arial text-[15px] text-primary">
                                        {formatPrice(total, currency, locale)}
                                    </span>
                                </div>
                                <div class="flex justify-end items-center px-4">
                                    <span class="font-arial font-normal tracking-[.05em] text-[12px] text-gray-5">
                                        Taxas e fretes serão calculados no checkout
                                    </span>
                                </div>
                            </div>

                            <div class="flex flex-col items-center mb-[22px] mt-[31px]">
                                <a href="/account#/orders" class="flex items-center justify-center mx-auto mb-[22px]">
                                    <Icon id="Repeat" width={18} height={21} />
                                    <span class="text-gray-3 tracking-[.05em] font-arial text-[12px] ml-[7.72px]">Repetir último pedido</span>
                                </a>
                                <button class="flex text-gray-3 justify-center tracking-[.05em] uppercase border-0 bg-transparent underline font-montserrat font-medium text-[12px]" onClick={() => {
                                    displayCart.value = false;
                                }}>
                                    Continuar comprando
                                </button>
                            </div>

                            <div class="p-4">
                                <a class="inline-block w-full" href={checkoutHref}>
                                    <Button
                                        data-deco="buy-button"
                                        class="text-white uppercase tracking-[.05em] w-full font-normal font-montserrat bg-primary hover:opacity-80 hover:bg-primary text-[12px] rounded-full"
                                        disabled={loading || isEmtpy}
                                        onClick={() => {
                                            sendEvent({
                                                name: "begin_checkout",
                                                params: {
                                                    coupon,
                                                    currency,
                                                    value: total,
                                                    items: items
                                                        .map((_, index) => itemToAnalyticsItem(index))
                                                        .filter((x): x is AnalyticsItem => Boolean(x)),
                                                },
                                            });
                                        }}
                                    >
                                        Finalizar Compra
                                    </Button>
                                </a>
                            </div>
                        </footer>
                    </>
                )}
        </div>
    );
}

export default Cart;
