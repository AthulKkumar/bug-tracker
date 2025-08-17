import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../api/axios";
import { Box, Button, Card, Container, Flex, Heading } from "@radix-ui/themes";
import FormField from "../../components/FormField";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/user/register", {
        email: data.email,
        password: data.password,
      });

      alert("✅ Registration successful! Please login.");
      reset();
      window.location.href = "/login";
    } catch (err) {
      alert(err?.response?.data?.message || "❌ Error registering user");
      console.error(err);
    }
  };

  return (
     <Container size="2" p="6">
      
      <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
        <Card size="4" style={{ width: "100%", maxWidth: 400 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-6 border rounded-xl shadow-md space-y-4"
        >
           <Flex direction="column" gap="4">
          <Heading align="center" size="6" mb="4">
            Create an Account
          </Heading>

          <FormField
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            register={register}
            error={errors.email}
          />

          <FormField
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            register={register}
            error={errors.password}
          />

          <FormField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Registering..." : "Register"}
          </Button>

          <p className="text-sm text-center mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
          </Flex>
        </form>
       </Card>
      </Flex>
    </Container>
  );
}


