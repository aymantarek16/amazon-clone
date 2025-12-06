import { auth, signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) return redirect('/');
  return (
    <div className="flex flex-col items-center justify-center py-5 md:py-10 gap-5">
      <div className="bg-gray-100 flex items-center justify-center">
        <Card className="text-center p-5 w-96 max-w-md">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardDescription >
            Choose your preferred sign in method
          </CardDescription>

          <CardContent className=" pt-4 rounded-lg mt-4">
            <div className="space-y-3">
              {/* Google Sign in */}
              <form
                action={async () => {
                  "use server"
                  await signIn("google")
                }}
              >
                <Button type="submit" variant="outline" className="w-full flex justify-start">
                  <FcGoogle /> <span className="ml-2">Sign in with Google</span>
                </Button>
              </form>
              {/* Github sign in */}
              <form
                action={async () => {
                  "use server"
                  await signIn("github")
                }}
              >
                <Button type="submit" variant="outline" className="w-full flex justify-start">
                  <FaGithub className="w-5 h-5 mr-2" />
                  <span>Sign in with GitHub</span>
                </Button>
              </form>
              {/* Facebook Sign in */}
              <form
                action={async () => {
                  "use server"
                  await signIn("facebook")
                }}
              >
                <Button type="submit" variant="outline" className="w-full flex justify-start">
                  <FaFacebook className="w-5 h-5 mr-2" />
                  <span>Sign in with Facebook</span>
                </Button>
              </form>
            </div>

            {/* or continue with */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute w-full border-t border-gray-300"></div>
              <span className="relative z-10 bg-white px-3 text-sm text-gray-500 font-medium">
                Or continue with
              </span>
            </div>

            {/* email and password */}
            <div className="email">
              <Label htmlFor="email" className="flex mb-2">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="password">
              <Label htmlFor="password" className="flex mt-4 mb-2">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
              />

            </div>
          </CardContent>


          <CardFooter>
            <Button
              className="w-full bg-amazonOrangeDark"
              onClick={async () => {
                "use server"
                // Handle email/password sign in logic here
              }}
            >
              Sign in
            </Button>
          </CardFooter>


        </Card>
      </div>
    </div>
  )
}

export default LoginPage
