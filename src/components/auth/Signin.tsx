"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { SignInFormData, signInSchema } from "@/utils/form-schema";

const Signin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (data: SignInFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      // console.log(formData);

      const response = await signIn("credentials", {
        redirect: true, // Prevents automatic redirects to dashboard or another page
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });
      // const response = await signinUser(formData);
      // console.log(response);
      if (response?.error) {
        setErrorMessage(response.error);
      } else {
        form.reset();
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSProviderSignIn = async (provider: string) => {
    setIsSubmitting(true);
    await signIn(provider, { redirect: true, callbackUrl: "/" });
    setIsSubmitting(false);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-1/3 rounded-lg bg-gray-100 p-7 px-10 shadow-sm dark:text-black">
        <div className="md:pb-17 mx-auto max-w-3xl pb-10 text-center text-2xl lg:text-3xl">
          <h1 className="h1">Welcome back</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="space-y-4"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="helloworld@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-md dark:bg-black dark:text-white"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            {errorMessage && (
              <p className="text-center text-red-500">{errorMessage}</p>
            )}
          </form>
        </Form>

        <div className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="hover:text-primary-800 text-gray-800 transition duration-150 ease-in-out"
          >
            Sign up
          </Link>
          <div className="mx-auto mt-3 w-full">
            {/* Sign in with Google */}
            <Button
              onClick={() => handleSProviderSignIn("google")}
              size="lg"
              variant="authgroup"
              className="relative flex w-full items-center rounded-md px-0"
              disabled={isSubmitting}
            >
              <FaGoogle className="mx-1 h-4 w-4 shrink-0 text-white" />
              <span className="">Sign in with Google</span>
            </Button>

            {/* Sign in with GitHub */}
            <Button
              onClick={() => handleSProviderSignIn("github")}
              size="lg"
              variant="authgroup"
              className="relative mt-3 flex w-full items-center rounded-md px-0"
              disabled={isSubmitting}
            >
              <FaGithub className="mx-1 h-4 w-4 shrink-0 text-gray-700" />
              <span className="">Sign in with GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
