// src/components/EditBugModal.jsx
"use client";

import { useEffect, useState } from "react";
import { Button, Dialog, Flex, Text, TextField, Select } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBug } from "../api/bug";

const bugSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    severity: z.enum(["low", "medium", "high"]),
    status: z.enum(["open", "in_progress", "fixed", "closed", "new"]),
});

export default function EditBugModal({ bugData, onUpdate }) {
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

    useEffect(() => {
        if (bugData) {
            reset({
                title: bugData.title || "",
                description: bugData.description || "",
                severity: bugData.severity || "low",
                status: bugData.status || "open",
            });
        }
    }, [bugData, reset]);

    const onSubmit = async (data, event) => {
        event.preventDefault();
        try {
            const updatedBug = await updateBug(bugData._id, data);

            if (onUpdate) onUpdate(updatedBug);

            setOpen(false);
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || "Failed to update bug");
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <Button color="blue" className="rounded-lg shadow">
                    Edit Bug
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Bug</Dialog.Title>
                <Dialog.Description mb="4" size="2">
                    Update the bug details below.
                </Dialog.Description>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text size="2" mb="1" weight="bold">
                                Title
                            </Text>
                            <TextField.Root placeholder="Enter bug title" {...register("title")} />
                            {errors.title && <Text color="red" size="1">{errors.title.message}</Text>}
                        </label>

                        <label>
                            <Text size="2" mb="1" weight="bold">
                                Description
                            </Text>
                            <TextField.Root placeholder="Enter bug description" {...register("description")} />
                            {errors.description && <Text color="red" size="1">{errors.description.message}</Text>}
                        </label>

                        <label>
                            <Text size="2" mb="1" weight="bold">
                                Severity
                            </Text>
                            <Select.Root
                                defaultValue={bugData?.severity || "low"}
                                onValueChange={(val) => setValue("severity", val)}
                            >
                                <Select.Trigger placeholder="Select severity" />
                                <Select.Content>
                                    <Select.Item value="low">Low</Select.Item>
                                    <Select.Item value="medium">Medium</Select.Item>
                                    <Select.Item value="high">High</Select.Item>
                                </Select.Content>
                            </Select.Root>
                            {errors.severity && <Text color="red" size="1">{errors.severity.message}</Text>}
                        </label>

                        <label>
                            <Text size="2" mb="1" weight="bold">
                                Status
                            </Text>
                            <Select.Root
                                defaultValue={bugData?.status || "open"}
                                onValueChange={(val) => setValue("status", val)}
                            >
                                <Select.Trigger placeholder="Select status" />
                                <Select.Content>
                                    <Select.Item value="open">Open</Select.Item>
                                    <Select.Item value="in_progress">In Progress</Select.Item>
                                    <Select.Item value="fixed">Fixed</Select.Item>
                                    <Select.Item value="closed">Closed</Select.Item>
                                </Select.Content>
                            </Select.Root>
                            {errors.status && <Text color="red" size="1">{errors.status.message}</Text>}
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close asChild>
                            <Button variant="soft" color="gray" type="button" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Button color="blue" type="submit">Save</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
}
