import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Navigate, useNavigate } from "react-router"
import { Toast } from "@/components/ui/toast"
import { useDispatch } from "react-redux"
import { login } from "@/store/Authslice"

export default function RegisterForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
axios.defaults.withCredentials = true;
  const handleRegister = async (data) => {
    try {
      setIsRegistering(true);
      const url = import.meta.env.VITE_REGISTER_API_URL;
      if (!url) {
        console.error("VITE_REGISTER_API_URL is not defined");
        return;
      }
      console.log(data)
      const response = await axios.post(url, data);
      if (response.status === 201) {
        reset();
        setIsRegistering(false);
        dispatch(login(response.data));
        navigate("/");
        <Toast
          title="Registration successful"
          description="You have successfully registered"
          variant="default"
          duration={3000}
        />;
      } else if (response.status === 409) {
        setError("Account is already registered");
      } else {
        setError("An error occurred while registering the user");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Account is already registered");
      } else {
        setError("An error occurred while registering the user");
      }
      console.error("Registration error:", err);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>Enter your details to create an account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit(handleRegister)}>
          <div className="space-y-2">
              <Input
                id="username"
                type="username"
                placeholder="username"
                {...register("username", { required: "Username is required" , pattern : {value : /^[a-zA-Z0-9_]{5,20}$/ , message : "Username should be at least 5 characters and at most 20 characters long"} })}

              />
              {errors.username && <p className="text-red-500 font-mono">{errors.username?.message}</p>}
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
             
              />
              {errors.email && <p className="text-red-500 font-mono">{errors.email?.message}</p>}
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
      
              />
              {errors.password && <p className="text-red-500 font-mono">{errors.password?.message}</p>}
            </div>
            <Button className="w-full" type="submit" disabled={isRegistering}>
              {isRegistering ? "Registering ..." : "Register"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" className="flex items-center justify-center">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Icons.github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Icons.facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="mt-2 text-xs text-center text-gray-700">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

