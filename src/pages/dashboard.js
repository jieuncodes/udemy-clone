import { useUser } from "@supabase/auth-helpers-react";
import {
  Banner,
  DashBoardContainer,
  EnrolledCourses,
} from "../styles/dashBoard";
import {
  Container,
  ContentHeader,
  HrefBox,
  NavLink,
} from "../styles/globalStyles";
import Link from "next/link";

const DashBoard = () => {
  const user = useUser();
  console.log("user", user);

  return (
    <>
      <Container>
        <Banner>
          <span>username</span>
        </Banner>
        <EnrolledCourses>
          <ContentHeader>수강 신청한 강의</ContentHeader>
          <li></li>
        </EnrolledCourses>
        <NavLink>
          <Link href="/edit-profile">프로필 수정</Link>
        </NavLink>
      </Container>
    </>
  );
};

export default DashBoard;
