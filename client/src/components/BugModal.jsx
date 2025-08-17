"use client";

import { Button, Dialog, Flex, Text, TextField, Select } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBug } from "../api/bug";
import { useState } from "react";

const bugSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  severity: z.enum(["low", "medium", "high"], { required_error: "Severity is required" }),
  status: z.enum(["open", "in_progress", "fixed", "closed", "new"], { required_error: "Status is required" }),
});

export default function BugModalForm({ onAddBug }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bugSchema),
    defaultValues: {
      title: "",
      description: "",
      severity: "low",
      status: "open",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await createBug(data); 
      reset();
      setOpen(false);
      if (onAddBug) onAddBug(result); 
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button color="green" className="rounded-lg shadow">
          + New Bug
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="500px">
        <Dialog.Title>Add New Bug</Dialog.Title>
        <Dialog.Description mb="4" size="2">
          Fill out the bug details below.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label>
              <Text size="2" mb="1" weight="bold">Title</Text>
              <TextField.Root placeholder="Enter bug title" {...register("title")} />
              {errors.title && <Text color="red">{errors.title.message}</Text>}
            </label>

            <label>
              <Text size="2" mb="1" weight="bold">Description</Text>
              <TextField.Root placeholder="Enter bug description" {...register("description")} />
              {errors.description && <Text color="red">{errors.description.message}</Text>}
            </label>

            <label>
              <Text size="2" mb="1" weight="bold">Severity</Text>
              <Select.Root defaultValue="low" onValueChange={(val) => setValue("severity", val)}>
                <Select.Trigger placeholder="Select severity" />
                <Select.Content>
                  <Select.Item value="low">Low</Select.Item>
                  <Select.Item value="medium">Medium</Select.Item>
                  <Select.Item value="high">High</Select.Item>
                </Select.Content>
              </Select.Root>
              {errors.severity && <Text color="red">{errors.severity.message}</Text>}
            </label>

            <label>
              <Text size="2" mb="1" weight="bold">Status</Text>
              <Select.Root defaultValue="open" onValueChange={(val) => setValue("status", val)}>
                <Select.Trigger placeholder="Select status" />
                <Select.Content>
                  <Select.Item value="open">Open</Select.Item>
                  <Select.Item value="in_progress">In Progress</Select.Item>
                  <Select.Item value="fixed">Fixed</Select.Item>
                  <Select.Item value="closed">Closed</Select.Item>
                </Select.Content>
              </Select.Root>
              {errors.status && <Text color="red">{errors.status.message}</Text>}
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" type="button">Cancel</Button>
            </Dialog.Close>
            <Button color="green" type="submit">Save</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

