import Button from "../components/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Enter = () => {
  const { register, handleSubmit, reset } = useForm();
  const [method, setMethod] = useState("email");
  const onValid = (validForm) => {
    if (loading) return;
    enter(validForm);
  };
  return (
    <div className="mt-16 px-6">
      <h3 className="text-xl font-bold ">계정에 로그인하세요</h3>
      <div className="mt-5">
        <Button text={"Google로 계속하기"} icon="/images/google-logo.png" />
        <Button
          text={"Facebook으로 계속하기"}
          icon="/images/facebook-logo.png"
        />
        <Button text={"Apple로 계속하기"} icon="/images/apple-logo.png" />
        <form>
          <input
            className="w-full h-16 mb-3 px-4 border-solid border-[1px] border-black font-medium text-lg flex items-center"
            register={register("email", { required: true })}
            placeholder="이메일"
            name="email"
            label="email"
            type="email"
            required
          ></input>
          <input
            className="w-full h-16 mb-3 px-4 border-solid border-[1px] border-black font-medium text-lg flex items-center"
            register={register("password", { required: true })}
            placeholder="비밀번호"
            name="password"
            label="password"
            type="password"
            required
          ></input>
          <Button text={"로그인"} submitButton />
        </form>
        <div className="mt-6 flex flex-col items-center">
          <div>
            <span className="mr-2">또는</span>
            <span>비밀번호 찾기</span>
          </div>
          <hr className="w-full bg-slate-700 my-4"></hr>
          <div className="mb-5">
            <span className="mr-2">계정이 없으신가요?</span>
            <span>가입하기</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Enter;
