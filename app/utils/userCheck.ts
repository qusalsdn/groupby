import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export const userCheck = (setLoading: Dispatch<SetStateAction<boolean>>, router: AppRouterInstance) => {
  axios
    .get("/api/user/check")
    .then((res) => {
      if (res.data.ok) setLoading(false);
      else router.replace("/signIn");
    })
    .catch((err) => console.error(err));
};
