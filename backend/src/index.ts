import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
        email: body.email,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: token });
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("Invalid");
  }
});
app.post("/api/v1/user/signin", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/blog", (c) => {
  return c.text("Hello Hono!");
});

app.put("/api/v1/user/blog", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/v1/user/blog", (c) => {
  return c.text("Hello Hono!");
});
app.get("/api/v1/user/blog/blog", (c) => {
  return c.text("Hello Hono!");
});
//postgresql://Shahi_owner:mKOSw3MsI5eo@ep-delicate-snow-a56c7wm1-pooler.us-east-2.aws.neon.tech/Shahi?sslmode=require
//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMzNlZjMwNGItZDg5My00MmI5LWFiMzItMzY2ZDM4NjM4YmU1IiwidGVuYW50X2lkIjoiYjZmOWM2MTY3OGQ4MWQ2YThhMmYyYWExNjkxYzY4ZjU0ZmIxZTY4ZTVhYTg5Y2U2ZTJhM2NhYmQzOGNjYTY3MCIsImludGVybmFsX3NlY3JldCI6ImQ2NWI0Nzk0LTQ1M2MtNGE5OC05ZGVhLTAxZTg3YTlhM2Q2YSJ9.LjPIzd_QWcPXk9-RmtZp3WwVD52D778WNIuI4Nc7Zv0"

export default app;
