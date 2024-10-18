import { createConnection } from "@/app/utils/createConn";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { id, pw, name } = await request.json();
  const conn = await createConnection();

  try {
    const hash = bcrypt.hashSync("groupbyqusalsdn" + id + pw + id + name, 10);
    await conn.execute(`insert into user(id, pw, name) values('${id}', '${hash}', '${name}')`);
    return Response.json({ ok: true });
  } catch (error: any) {
    console.error(error);
    const sqlMessage: string = error.sqlMessage;
    if (sqlMessage.includes("id_UNIQUE")) return Response.json({ ok: false, msg: "아이디가 중복됩니다." });
    else if (sqlMessage.includes("name_UNIQUE")) return Response.json({ ok: false, msg: "이름이 중복됩니다." });
    else return Response.json({ ok: false, msg: "서버오류..." });
  } finally {
    await conn.end();
  }
}
