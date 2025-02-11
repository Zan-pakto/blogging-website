import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
const app = new Hono();
app.use("/*", cors());
app.get("/", (c) => {
  return c.text("hello hono");
});
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
//postgresql://Shahi_owner:mKOSw3MsI5eo@ep-delicate-snow-a56c7wm1-pooler.us-east-2.aws.neon.tech/Shahi?sslmode=require
//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMzNlZjMwNGItZDg5My00MmI5LWFiMzItMzY2ZDM4NjM4YmU1IiwidGVuYW50X2lkIjoiYjZmOWM2MTY3OGQ4MWQ2YThhMmYyYWExNjkxYzY4ZjU0ZmIxZTY4ZTVhYTg5Y2U2ZTJhM2NhYmQzOGNjYTY3MCIsImludGVybmFsX3NlY3JldCI6ImQ2NWI0Nzk0LTQ1M2MtNGE5OC05ZGVhLTAxZTg3YTlhM2Q2YSJ9.LjPIzd_QWcPXk9-RmtZp3WwVD52D778WNIuI4Nc7Zv0"
export default app;
