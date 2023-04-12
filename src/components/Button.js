import Image from "next/image";
import { cls } from "../libs/utils";

export default function Button({ text, icon, submitButton = false }) {
  return (
    <button
      className={cls(
        "mb-3 flex h-16 w-full items-center border-[1px] border-solid border-black px-6 text-lg font-medium",
        submitButton
          ? "h-14 w-full justify-center border-none bg-rose-500 text-white"
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
