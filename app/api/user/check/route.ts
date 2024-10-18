import { User } from "@/app/types/type";
import { createConnection } from "@/app/utils/createConn";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const conn = await createConnection();
  const accessToken = cookies().get("accessToken")?.value;

  try {
    jwt.verify(accessToken ?? "", process.env.NEXT_PUBLIC_PRIVATE ?? "");
    return Response.json({ ok: true });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      const { name }: any = jwt.decode(accessToken ?? "");
      const [[results]]: any = await conn.execute(`select * from user where name='${name}'`);
      const user: User = results;
      if (user) {
        cookies().set("accessToken", jwt.sign({ name: user.name }, process.env.NEXT_PUBLIC_PRIVATE ?? "", { expiresIn: 20 }));
        return Response.json({ ok: true });
      } else return Response.json({ ok: false });
    } else return Response.json({ ok: false });
  } finally {
    await conn.end();
  }
}
