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
  SocialBtns,
  Input,
  Notification,
} from "../styles/authPage";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Container, ContentHeader, Hr, HrefBox } from "../styles/globalStyles";

const Enter = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const isFromJoin = router.query.fromJoin;
  const [session, setSession] = useState(null);
  const [signInError, setSignInError] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  supabase.auth.onAuthStateChange(async (event, session) => {
    setSession(session);
    console.log("session", session);
    console.log("event", event);
    if (event === "SIGNED_IN") {
      router.push("/dashboard");
    }
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("data", data);
    console.log("", signInData);
    if (error) {
      console.error("Error signing in:", error.message);
      setSignInError(error.message);
    } else {
      reset();
      setSignInError(null);
    }
  };

  return (
    <Container>
      {!session && (
        <ContentBox>
          <ContentHeader>계정에 로그인하세요</ContentHeader>
          <SocialBtns className="mt-5">
            <Button
              text={"Google로 계속하기"}
              icon="/assets/images/google-logo.png"
            />
            <Button
              text={"Facebook으로 계속하기"}
              icon="/assets/images/facebook-logo.png"
            />
            <Button
              text={"Apple로 계속하기"}
              icon="/assets/images/apple-logo.png"
            />
          </SocialBtns>
          {isFromJoin && (
            <Notification>
              A verification link has been sent to your email.
            </Notification>
          )}
          {signInError && (
            <Notification>
              <span>{signInError}</span>
            </Notification>
          )}
          <FormBox>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("email", { required: true })}
                placeholder="이메일"
                type="email"
                required
              ></Input>
              <Input
                {...register("password", { required: true })}
                placeholder="비밀번호"
                type="password"
                required
              ></Input>
              <Button text={"로그인"} roseBtn />
            </form>
          </FormBox>

          <FormDescriptions>
            <HrefBox>
              <span>또는</span>
              <span>비밀번호 찾기</span>
            </HrefBox>
            <Hr />
            <HrefBox>
              <span>계정이 없으신가요?</span>
              <Link href="/join" className="text-pink-600 underline">
                가입하기
              </Link>
            </HrefBox>
          </FormDescriptions>
        </ContentBox>
      )}
    </Container>
  );
};

export default Enter;
