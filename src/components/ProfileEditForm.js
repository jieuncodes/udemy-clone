import { useSession, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { supabase } from "../libs/supabaseClient";
import { useForm } from "react-hook-form";
import { Form, Input } from "../styles/globalStyles";
import Button from "./Button";

const ProfileEditForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const user = useUser();
  const session = useSession();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      const { data, error } = await supabase
        .from("user_profile")
        .select("username")
        .eq("id", user.id);

      if (error) {
        console.log("Error fetching user profile:", error.message);
      } else {
        if (data && data.length > 0) {
          setUsername(data[0].username);
        } else {
          setUsername("");
        }
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmitUsername = async (data) => {
    const { username } = data;
    const { error } = await supabase
      .from("user_profile")
      .update({
        username,
      })
      .eq("id", user.id);
    if (error) {
      console.error("Error updating user profile:", error.message);
    } else {
      alert("유저네임이 성공젹으로 변경되었습니다.");
      window.location.reload();
    }
  };

  async function resetPassword() {
    console.log("user.email", user.email);
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      user.email
    );
    if (error) console.log("Error:", error.message);
    else {
      alert("비밀번호 재설정 이메일이 발송되었습니다. 이메일함을 확인하세요.");
      console.log("Password reset email sent");
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmitUsername)}>
        <Input
          id="username"
          {...register("username")}
          type="text"
          value={username}
          placeholder="유저네임"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button text="유저네임 변경" blackBtn />
      </Form>
      <Form onSubmit={handleSubmit(resetPassword)}>
        <Button text="비밀번호 변경" blackBtn />
      </Form>
    </>
  );
};

export default ProfileEditForm;
