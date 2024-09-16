"use client";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema, SignUpFormData } from "@/utils/form-schema";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const handleSignUp = async (data: SignUpFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("full-name", data.full_name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      // Use credentials provider signIn
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (response?.error) {
        setErrorMessage(response.error);
      } else {
        toast({ title: "Account created successfully, signing you in..." });
        router.push("/");
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
        <div className="md:pb-15 mx-auto max-w-3xl pb-10 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          <h1 className="h1">Course planning made simple!!</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="space-y-4"
          >
            <FormField
              name="full_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="full_name">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      id="full_name"
                      placeholder="First and last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="Password (at least 8 characters)"
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
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>

            {errorMessage && (
              <p className="text-center text-red-500">{errorMessage}</p>
            )}
          </form>
        </Form>

        <div className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="hover:text-primary-800 text-gray-800 transition duration-150 ease-in-out"
          >
            Sign in
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

export default Signup;
