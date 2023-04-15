import { useUser } from "@supabase/auth-helpers-react";
import { Container, ContentHeader } from "../styles/globalStyles";
import {
  Avatar,
  EditBody,
  EditBox,
  EditDescription,
  EditHeader,
  EditTitle,
  Li,
  Nav,
  UserName,
} from "../styles/editProfile";
import { useState } from "react";
import Router from "next/router";
import ProfileEditForm from "../components/ProfileEditForm";

const EditProfile = () => {
  const user = useUser();
  const [selectedLi, setSelectedLi] = useState("");

  console.log("user", user);
  const menuItems = ["공개 프로필 보기", "프로필", "사진", "구독", "결제 방법"];
  const menuDescriptions = {
    "공개 프로필 보기": "",
    프로필: "본인에 대한 정보 추가",
    사진: "프로필에 사용할 사진을 추가하세요",
    "등록한 강의": "강의 관리",
    "결제 방법": "결제 방법을 선택하세요",
  };

  return (
    <>
      <Container>
        <Avatar>
          <img src="/assets/images/anon_avatar.webp" />
        </Avatar>
        <UserName>username</UserName>
        <Nav>
          <ul>
            {menuItems.map((item, index) => (
              <Li
                key={index}
                onClick={() => {
                  setSelectedLi(item);
                  if (item == "공개 프로필 보기") {
                    Router.push("/dashboard");
                  }
                }}
                isSelected={selectedLi === item}
              >
                {item}
              </Li>
            ))}
          </ul>
        </Nav>
        {selectedLi && (
          <EditBox>
            <EditHeader>
              <EditTitle>{selectedLi}</EditTitle>
              <EditDescription>{menuDescriptions[selectedLi]}</EditDescription>
            </EditHeader>
            <EditBody>
              {selectedLi == "프로필" ? <ProfileEditForm /> : null}
            </EditBody>
          </EditBox>
        )}
      </Container>
    </>
  );
};

export default EditProfile;
