import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@arvindshahi/medium3-common";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [PostInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendReq() {
    try {
      const requestBody =
        type === "signup"
          ? PostInputs // Include name for signup
          : { username: PostInputs.username, password: PostInputs.password }; // Exclude name for signin

      const response = await axios.post(
        "https://backend.arvindshahi444.workers.dev/api/v1/user/signup",
        {
          name: "shahii",
          username: "arvind55fsassdsdasfajsdfkjhuhhjkj5@gmail.com",
          password: "1234567",
        }
      );

      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
      alert("Error while signing up");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="">
          <div className="px-10">
            <div className="text-3xl font-extrabold text-center">
              {type === "signup"
                ? "Create an account"
                : "Sign in to your account"}
            </div>
            <div className="text-slate-500 text-center">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="pl-2 hover:text-black underline hover:font-bold"
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>

          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Arvind Shahi..."
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, name: e.target.value }))
              }
            />
          )}

          <LabelledInput
            label="Username"
            placeholder="Arvind@gmail.com"
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, username: e.target.value }))
            }
          />

          <LabelledInput
            label="Password"
            placeholder="1234567"
            type="password"
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, password: e.target.value }))
            }
          />

          <button
            type="button"
            className="mt-8 py-2.5 px-5 w-full text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
            onClick={sendReq}
          >
            {type === "signup" ? "Signup" : "Signin"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputProps) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold mt-2 pt-2">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
