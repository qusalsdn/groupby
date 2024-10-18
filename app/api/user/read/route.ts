import { User } from "@/app/types/type";
import { createConnection } from "@/app/utils/createConn";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { id, pw } = await request.json();
  const conn = await createConnection();

  try {
    const [[rows]]: any[][] = await conn.execute(`select * from user where id='${id}'`);
    if (rows) {
      const user: User = rows;
      const compare = bcrypt.compareSync("groupbyqusalsdn" + id + pw + id + user.name, user.pw);
      if (compare) {
        cookies().set("accessToken", jwt.sign({ name: user.name }, process.env.NEXT_PUBLIC_PRIVATE ?? "", { expiresIn: 20 }));
        return Response.json({ ok: true, msg: "로그인 성공!" });
      } else {
        return Response.json({ ok: false, msg: "비밀번호가 일치하지 않습니다." });
      }
    } else {
      return Response.json({ ok: false, msg: "아이디가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error });
  } finally {
    await conn.end();
  }
}
