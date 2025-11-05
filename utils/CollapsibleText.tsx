interface Props {
  content: string;
}

const CollapsibleText = ({ content }: Props) => {
  return (
    <div class="flex flex-col items-center mt-3 mb-5">
      <input id="see-more-toggle" type="checkbox" class="peer hidden" />
      <div
        class="text-base text-center truncate line-clamp-3 whitespace-normal peer-checked:line-clamp-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <label
        for="see-more-toggle"
        class={`${
          content ? "" : "hidden"
        } text-sm font-semibold text-[#DCA15A] join after:join-item after:content-['mais'] peer-checked:after:content-['menos'] border-b border-solid border-[#DCA15A] rounded-none after:pl-1 cursor-pointer mt-2`}
      >
        Ver
      </label>
    </div>
  );
};

export default CollapsibleText;
