"use client";

import { User } from "@/app/types/type";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/user/check")
      .then((res) => {
        if (res.data.ok) router.replace("/home");
        else setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [router]);

  const onSubmit = (data: User) => {
    axios
      .post("/api/user/create", data)
      .then((res) => {
        if (res.data.ok) router.replace("/signIn");
        else toast.error(res.data.msg);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {!loading && (
        <div>
          <FontAwesomeIcon icon={faUserPlus} className="text-center w-full text-lg mb-3" />
          <p className="text-center font-bold text-2xl">회원가입</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-3">
              <div className="flex flex-col">
                <label htmlFor="id">아이디</label>
                <input
                  type="text"
                  id="id"
                  className="border-2 border-green-300 focus:border-green-500 duration-500 p-1 text-center"
                  placeholder="3 ~ 45자 사이로 입력해주세요."
                  {...register("id", { required: true, minLength: 3, maxLength: 45 })}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="pw">비밀번호</label>
                <input
                  type="password"
                  id="pw"
                  className="border-2 border-green-300 focus:border-green-500 duration-500 p-1 text-center"
                  placeholder="3 ~ 45자 사이로 입력해주세요."
                  {...register("pw", { required: true, minLength: 3, maxLength: 45 })}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="pw">이름</label>
                <input
                  type="text"
                  id="name"
                  className="border-2 border-green-300 focus:border-green-500 duration-500 p-1 text-center"
                  placeholder="3 ~ 45자 사이로 입력해주세요."
                  {...register("name", { required: true, minLength: 3, maxLength: 45 })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <button type="submit" className="bg-green-400 w-full text-white py-1 rounded-md">
                회원가입
              </button>

              <button
                type="button"
                className="bg-sky-400 w-full text-white py-1 rounded-md"
                onClick={() => router.push("/signIn")}
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
