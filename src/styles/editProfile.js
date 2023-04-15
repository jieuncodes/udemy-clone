import tw from "tailwind-styled-components";
import styled from "tailwind-styled-components";

export const Avatar = tw.div`self-center w-32 h-32 rounded-full object-contain overflow-hidden`;
export const UserName = tw.span`self-center mt-5`;
export const Nav = tw.nav` mt-10`;

export const Li = styled.li`
  cursor: pointer;
  ${({ isSelected }) => isSelected && "bg-slate-500 text-white"}
`;
export const EditBox = tw.div`grid grid-rows-2 mt-6 pt-5 border-[1px] border-solid border-slate-500 divide-y divide-slate-500 w-full text-center items-center`;
export const EditHeader = tw.div`flex items-center align-middle flex-col`;
export const EditTitle = tw.div`text-2xl font-bold mb-2`;
export const EditDescription = tw.span``;
export const EditBody = tw.div``;
