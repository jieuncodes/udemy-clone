import tw from "tailwind-styled-components";

export const Container = tw.div`max-w-full flex flex-col items-stretch mx-6`;
export const ContentHeader = tw.h3`text-xl font-bold `;
export const Hr = tw.hr`my-4 w-full bg-slate-700`;
export const HrefBox = tw.div`flex space-x-2`;
export const NavLink = tw.div`flex h-16 items-center justify-center border-[1px] border-solid border-black text-lg font-medium`;

//form
export const Form = tw.form`mb-6 flex flex-col h-auto w-full items-center border-solid px-6 text-lg font-medium`;
export const Input = tw.input`mb-3 h-16 w-full items-center border-[1px] border-solid border-black px-4 text-lg custom-focus-ring`;
