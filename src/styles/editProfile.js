import tw from "tailwind-styled-components";

export const Avatar = tw.div`self-center w-32 h-32 rounded-full object-contain overflow-hidden`;
export const UserName = tw.span`self-center mt-5`;
export const Nav = tw.nav` mt-10`;

export const Li = tw.li`cursor-pointer
`;
export const EditBox = tw.div`grid grid-rows-[auto_auto] mt-6 mb-10 pt-5 border-[1px] border-solid border-slate-300 divide-y divide-slate-300 w-full text-center items-center`;
export const EditHeader = tw.div`flex items-center align-middle flex-col`;
export const EditTitle = tw.div`text-2xl font-bold mb-2`;
export const EditDescription = tw.span`mb-6`;
export const EditBody = tw.div`px-3 py-6`;
