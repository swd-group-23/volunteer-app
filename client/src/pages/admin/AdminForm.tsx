import React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "../../components/NavBar";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import * as z from "zod";
import "../../index.css";

const schema = z.object({
  volunteer_name: z.string(),
  matched_event: z.string(),
});

type Schema = z.infer<typeof schema>;

const AdminForm = () => {
  const { register, handleSubmit, control } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const names: string[] = ["Alan", "Alina", "Josh", "Jusvin"];

  const onSubmit = (data: Schema) => {
    alert([data.volunteer_name, data.matched_event]);
  };
  return (
    <div className="m-3">
      <h1 className="text-3xl">Admin Page</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-40"
      >
        <select {...register("volunteer_name")}>
          {names.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <select {...register("matched_event")}>
          {names.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <input type="submit" />
      </form>
    </div>
  );
};

export default AdminForm;
