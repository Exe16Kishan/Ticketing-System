'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import { toast } from '@/components/ui/use-toast'
import { PlusCircle, X } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { addPerformers } from '@/app/actions/addingcaste'



// Form schema
const performerSchema = z.object({
  performName: z.string().min(2, "Performer name must be at least 2 characters."),
  occupation: z.string().min(2, "Occupation must be at least 2 characters."),
  eventId:z.string(),
  image:z.string()
})

const formSchema = z.object({
  performers: z.array(performerSchema).min(1, "At least one performer is required."),
})

export default function MultiPerformerForm() {
  const {eventId} = useParams()

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performers: [{ performName: "", occupation: "" ,eventId:eventId.toString() || "" ,image:"" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "performers",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)
    try {
      const result = await addPerformers(values)
      if (result.success) {
        toast({
          title: "Performers added",
          description: `${values.performers.length} performer(s) have been successfully added to the event.`,
        })
        
        router.push("/")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem adding the performers.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex justify-center '>

    <Card className="w-full max-w-2xl ">
      <CardHeader>
        <CardTitle>Add Performers to Event</CardTitle>
        <CardDescription>Enter the details of performers for this event.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Performer {index + 1}</h4>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`performers.${index}.performName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Performer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter performer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`performers.${index}.occupation`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter occupation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 space-x-10"
              onClick={() => append({ performName: "", occupation: "",eventId:eventId.toString() || "" ,image:"" })}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Create Event"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </div>
  )
}