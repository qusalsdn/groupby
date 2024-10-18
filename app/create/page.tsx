"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

export interface Group {
  id: number;
  title: string;
  content: string;
  now_people: number;
  max_people: number;
}

export default function Create() {
  const { handleSubmit, register } = useForm<Group>();

  const onSubmit = (data: Group) => {
    axios
      .post("/api/create", data)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <div className="flex flex-col">
          <label htmlFor="maxPeople">인원수</label>
          <select
            id="maxPeople"
            className="w-full border-2 border-green-400 rounded-md p-1"
            defaultValue={"1"}
            {...register("max_people")}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>

        <input
          type="text"
          className="w-full border-2 border-green-400 rounded-md focus:border-green-600 duration-500 p-2 text-center"
          maxLength={40}
          {...register("title")}
        />

        <input
          type="text"
          className="w-full border-2 border-green-400 rounded-md focus:border-green-600 duration-500 p-2 text-center"
          maxLength={500}
          {...register("content")}
        />

        <button type="submit" className="bg-green-400 text-white py-1 rounded-md">
          스터디그룹 생성
        </button>
      </form>
    </div>
  );
}
