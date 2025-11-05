import Icon from "$store/components/ui/Icon.tsx";

export default function BackToTop({ content }: { content?: string }) {
  
  const backToTop = () => {
		globalThis.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
  
  return (
    <>
      {content && (
        <div class="w-11 h-11 flex items-center justify-center fixed right-5 bottom-5 z-50 full-tablet:bottom-24">
          <button onClick={backToTop} class="bg-gray-3 flex items-center justify-center rounded-full w-11 h-11 relative right-16">
            <Icon id="ArrowUp" width={16} height={16} />
          </button>
        </div>
      )}
    </>
  );
}
