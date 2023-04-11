import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../libs/supabaseClient";
import Button from "../components/Button";
import Link from "next/link";
import {
  ContentBox,
  ContentHeader,
  FormBox,
  FormDescriptions,
  SocialBtns,
  Input,
  HrefBox,
  Hr,
  Notification,
} from "../styles/authPage";

const Enter = () => {
  const router = useRouter();
  const isFromJoin = router.query.fromJoin;
  const [session, setSession] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  supabase.auth.onAuthStateChange(async (event, session) => {
    setSession(session);
    console.log("event", event);
    if (event === "SIGNED_IN") {
      router.push("/dashboard");
    }
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signIn({ email, password });
    console.log("data", data);
    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      reset();
    }
  };

  return (
    <>
      {!session && (
        <ContentBox>
          <ContentHeader>계정에 로그인하세요</ContentHeader>
          <SocialBtns className="mt-5">
            <Button text={"Google로 계속하기"} icon="/images/google-logo.png" />
            <Button
              text={"Facebook으로 계속하기"}
              icon="/images/facebook-logo.png"
            />
            <Button text={"Apple로 계속하기"} icon="/images/apple-logo.png" />
          </SocialBtns>
          {isFromJoin && (
            <Notification>
              A verification link has been sent to your email.
            </Notification>
          )}
          <FormBox>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                register={register("email", { required: true })}
                placeholder="이메일"
                type="email"
                required
              ></Input>
              <Input
                register={register("password", { required: true })}
                placeholder="비밀번호"
                type="password"
                required
              ></Input>
              <Button text={"로그인"} submitButton />
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
    </>
  );
};

export default Enter;
