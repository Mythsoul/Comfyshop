import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Toast } from "@/components/ui/toast"
export default function LoginForm() {
  const [isloging, Setisloging] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("/api/login", data);
      if (response.status === 200) {
        Setisloging(true);
        reset();
        Toast({
          title: "Login Successful",
          description: "You are logged in",
          variant: "default",
          duration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("username", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: true })}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isloging}>
              {isloging ? "Signing in ..." : "Sign in"}
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
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

