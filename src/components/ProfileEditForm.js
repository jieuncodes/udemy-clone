import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { useForm } from "react-hook-form";

const ProfileEditForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const user = useUser();
  useEffect(() => {
    if (user) {
      loadedUserData();
    }
  }, [user]);

  const loadedUserData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();
    console.log("data", data);
    if (data) {
      setValue("full_name", data.full_name);
    } else {
      console.error("Error loading user data:", error.message);
    }
  };
  const onSubmit = async (data) => {
    const { full_name } = data;
    const { error } = await supabase
      .from("users")
      .update({
        full_name,
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating user profile:", error.message);
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="full_name">Full Name</label>
        <input
          id="full_name"
          {...register("full_name")}
          type="text"
          placeholder="Full Name"
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default ProfileEditForm;
