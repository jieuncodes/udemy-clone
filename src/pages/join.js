import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../libs/supabaseClient";
import Button from "../components/Button";
import Link from "next/link";
import {
  ContentBox,
  FormBox,
  FormDescriptions,
  Input,
  Notification,
} from "../styles/authPage";
import { Container, ContentHeader, Hr, HrefBox } from "../styles/globalStyles";

const Join = () => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onError = (errors, e) => {
    console.log(errors, e);
  };

  const onValid = async (data) => {
    const { username, email, password } = data;
    console.log(data);
    const { user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      console.error("Error signing up:", signUpError.message);
      setSignUpError(signUpError.message);
    } else if (!user) {
      console.error("Error signing up: no user object returned");
      setSignUpError("An unknown error occurred");
    } else {
      const { error: profileError } = await supabase
        .from("user_profile")
        .insert({ id: user.id, username });
      if (profileError) {
        console.error("Error creating user profile:", profileError.message);
      }
      reset();
      setSignUpError(null);
      router.push("/enter?fromJoin=true");
    }
  };
  

  return (
    <Container>
      {!session && (
        <ContentBox>
          <ContentHeader>가입하여 학습 시작</ContentHeader>
          {signUpError && (
            <Notification>
              <span>{signUpError}</span>
            </Notification>
          )}
          <FormBox>
            <form onSubmit={handleSubmit(onValid, onError)}>
              <Input
                {...register("username", { required: true })}
                placeholder="유저네임"
                type="text"
              ></Input>
              <Input
                {...register("email", { required: true })}
                placeholder="이메일"
                type="email"
              ></Input>
              <Input
                {...register("password", { required: true })}
                placeholder="비밀번호"
                type="password"
              ></Input>
              <Button text={"가입하기"} submitButton />
            </form>
            <FormDescriptions>
              <Hr />
              <HrefBox>
                <span>이미 계정이 있으세요?</span>
                <Link href="/enter" className="text-pink-600 underline">
                  로그인
                </Link>
              </HrefBox>
            </FormDescriptions>
          </FormBox>
        </ContentBox>
      )}
    </Container>
  );
};

export default Join;
