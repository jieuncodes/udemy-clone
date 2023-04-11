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
  Hr,
  HrefBox,
  Input,
  Notification,
} from "../styles/authPage";

const Join = () => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onError = (errors, e) => {
    console.log(errors, e);
  };

  const onValid = async (data) => {
    const { email, password } = data;
    console.log(data);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );
    if (signUpError) {
      console.error("Error signing in:", signUpError.message);
      setSignUpError(signUpError.message);
    } else {
      reset();
      setSignUpError(null);
      router.push("/enter?fromJoin=true");
    }
  };

  return (
    <>
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
    </>
  );
};

export default Join;
