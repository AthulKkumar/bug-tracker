import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Heading,
  Flex,
  Card,
  Text,
} from "@radix-ui/themes";
import FormField from "../../components/FormField";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const { login, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const success = await login(data);
    localStorage.setItem("token", success.token);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <Container size="2" p="6">
      <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
        <Card size="4" style={{ width: "100%", maxWidth: 400 }}>
          <Heading as="h2" size="6" mb="5" align="center">
            Login
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="4">
              <Box>
                <FormField
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  register={register}
                  error={errors.email?.message}
                />
              </Box>
              <Box>
                <FormField
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  register={register}
                  error={errors.password?.message}
                />
              </Box>
              <Button
                type="submit"
                size="3"
                disabled={isSubmitting}
                highContrast
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Flex>

            <p className="text-sm text-center mt-3">
                Create and Account{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Create
                </a>
              </p>
          </form>

        </Card>
      </Flex>
    </Container>
  );
}
