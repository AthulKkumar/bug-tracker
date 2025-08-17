// src/components/FormField.jsx
import { TextField } from "@radix-ui/themes";

export default function FormField({ label, error, type = "text", register, name, placeholder }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <TextField.Root
        radius="large"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
}
