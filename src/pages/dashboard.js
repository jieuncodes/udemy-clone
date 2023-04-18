import { useUser } from "@supabase/auth-helpers-react";
import { Banner, EnrolledCourses } from "../styles/dashBoard";
import { Container, ContentHeader, NavLink } from "../styles/globalStyles";
import Link from "next/link";
import { supabase } from "../libs/supabaseClient";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DashBoard = () => {
  const user = useUser();
  const router = useRouter();


  useEffect(() => {
    if (!user) {
      router.push("/enter");
    }
  }, [user, router]);

  const handleLogout = async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.log("Error logging out:", signOutError.message);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Container>
        <button onClick={handleLogout}>로그아웃</button>
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