import Image from "next/image";
import { cls } from "../../libs/utils";

export default function Button({ text, icon, submitButton = false }) {
  return (
    <button
      className={cls(
        "w-full h-16 mb-3 px-4 border-solid border-[1px] border-black font-medium text-lg flex items-center",
        submitButton
          ? "h-14 bg-rose-500 text-white border-none justify-center"
          : ""
      )}
    >
      {icon && (
        <Image src={icon} alt={text} width={30} height={30} className="mr-3" />
      )}
      {text}
    </button>
  );
}
