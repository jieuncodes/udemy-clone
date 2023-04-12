import { useUser } from "@supabase/auth-helpers-react";
import { Container, ContentHeader } from "../styles/globalStyles";
import {
  Avatar,
  ContentDescription,
  EditBox,
  Li,
  Nav,
  UserName,
} from "../styles/dashBoard";
import { useState } from "react";

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
                onClick={() => setSelectedLi(item)}
                isSelected={selectedLi === item}
              >
                {item}
              </Li>
            ))}
          </ul>
        </Nav>
        {selectedLi && (
          <EditBox>
            <div>
              <ContentHeader>{selectedLi}</ContentHeader>
              <ContentDescription>
                {menuDescriptions[selectedLi]}
              </ContentDescription>
            </div>
            <div></div>
          </EditBox>
        )}
      </Container>
    </>
  );
};

export default EditProfile;
