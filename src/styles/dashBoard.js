import tw from "tailwind-styled-components";
import styled from "tailwind-styled-components";

export const Banner = tw.div`h-28 bg-gray-950 text-white flex items-center p-6 -mx-6 text-2xl`;
export const EnrolledCourses = tw.div``;
export const Avatar = tw.div`self-center w-32 h-32 rounded-full object-contain overflow-hidden`;
export const UserName = tw.span`self-center mt-5`;
export const Nav = tw.nav` mt-10`;

export const Li = styled.li`
  cursor: pointer;
  ${({ isSelected }) => isSelected && "bg-slate-500 text-white"}
`;
export const EditBox = tw.div`grid grid-rows-2 mt-6 pt-6 border-[1px] border-solid border-slate-500 divide-y divide-slate-500 w-full text-center`;
export const ContentDescription = tw.span``;
