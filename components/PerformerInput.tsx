import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";

export function PerformerInput() {
  const { control, register } = useFormContext(); // Destructure register
  const { fields, append, remove } = useFieldArray({
    control,
    name: "performers",
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-4">
          <Input
            {...register(`performers.${index}.performName`)} // Bind input to form state
            placeholder="Performer Name"
          />
          <Input
            {...register(`performers.${index}.occupation`)} // Bind input to form state
            placeholder="Occupation"
          />
          <Button variant="ghost" size="sm" onClick={() => remove(index)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ performName: "", occupation: "", image: "" })}
      >
        <PlusCircle className="w-4 h-4 mr-2" /> Add Performer
      </Button>
    </>
  );
}
