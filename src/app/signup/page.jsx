// "use client";
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField, } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupSchema } from '@/schemas/signupSchema';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // Perform your form submission logic here
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.firstName}>
        <FormLabel>First Name:</FormLabel>
        <Input {...register("firstName")} />
        <FormMessage>{errors.firstName?.message}</FormMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.lastName} mt="4">
        <FormLabel>Last Name:</FormLabel>
        <Input {...register("lastName")} />
        <FormMessage>{errors.lastName?.message}</FormMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email} mt="4">
        <FormLabel>Email:</FormLabel>
        <Input {...register("email")} />
        <FormMessage>{errors.email?.message}</FormMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password} mt="4">
        <FormLabel>Password:</FormLabel>
        <Input type="password" {...register("password")} />
        <FormMessage>{errors.password?.message}</FormMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword} mt="4">
        <FormLabel>Confirm Password:</FormLabel>
        <Input type="password" {...register("confirmPassword")} />
        <FormMessage>{errors.confirmPassword?.message}</FormMessage>
      </FormControl>

      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignupForm; 
