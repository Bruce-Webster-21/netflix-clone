import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  // Use callCallBack for the setvariant() to prevent a render cycle when passing the function as props
  // In depth explanation
  // https://dev.to/nitsancohen770/utilize-the-power-of-usestate-and-usecallback-hooks-in-react-4d1e#:~:text=Sometimes%20we%20will%20want%20to,prop%20is%20wrapped%20with%20React.
  // https://www.reddit.com/r/reactjs/comments/1aygg1d/why_use_usecallback_when_you_can_use_usestate/

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  // When and how to use async functions
  // axios.post("...controller(api route)", {...parameters});

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      // This logins the user once register and created an account
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Netflix Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant == "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant == "register" && (
                <Input
                  label="Username"
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant == "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant == "login" ? "Login" : "Sign Up"}
            </button>
            <p className="text-neutral-500 mt-12 text-center">
              {variant == "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant == "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
