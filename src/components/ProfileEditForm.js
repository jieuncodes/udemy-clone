import { useSession, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { supabase } from "../libs/supabaseClient";
import { useForm } from "react-hook-form";

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

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        user_email,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
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
      alert("Profile updated successfully!");
    }
  };

  const onSubmitPassword = async (data) => {
    // handle password update here
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitUsername)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>
        <input
          id="username"
          {...register("username")}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">유저네임 변경</button>
      </form>
      <form onSubmit={handleSubmit(onSubmitPassword)}>
        <input
          id="password"
          {...register("password")}
          type="text"
          placeholder="새 바밀번호 입력"
        />
        <input
          id="password-confirm"
          {...register("password-confirm")}
          type="text"
          placeholder="새 비밀번호 다시 입력"
        />
        <button type="submit">비밀번호 변경</button>
      </form>
    </>
  );
};

export default ProfileEditForm;
