import { Input } from "@/components/ui/input"
import { useMutation } from "@apollo/client";
import { ADD_COUNTRY } from "@/requests/mutations/countries";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";

export default function AddCountryForm({ updateList }: { updateList: () => void }) {

    const formSchema = z.object({
        name: z.string().min(1, "Le nom du pays est requis.").max(20, "Le nom du pays ne doit pas dépasser 20 caractères."),
        code: z.string().min(2, "Le code du pays doit comporter au moins 2 caractères.").max(2, "Le code du pays ne doit pas dépasser 2 caractères."),
        emoji: z.string().min(1, "L'emoji du pays doit être valide.").max(4, "L'emoji du pays doit être valide."),
    })

    type CountryFormInput = z.infer<typeof formSchema>;

    const form = useForm<CountryFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      emoji: "",
    },
  })

    const [addCountry] = useMutation(ADD_COUNTRY);

    const onSubmit = async (values: CountryFormInput) => {
        console.log("Données du formulaire:", values);

        try {
            const { data: createdCountryId } = await addCountry({ variables: { data: { ...values } } });

            if (!createdCountryId || !createdCountryId.addCountry) {
                throw new Error("Échec de la création du pays");
            }

            console.log("Pays créé avec l'id:", createdCountryId.addCountry.id);
            updateList();
            form.reset();
        } catch (error) {
            console.error("Erreur lors de l'ajout du pays:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <FormField name="name" control={form.control} render={({ field }) => (
                <FormItem className="mb-6">
                    <FormLabel>Nom du pays</FormLabel>
                    <FormControl>
                        <Input placeholder="Nom du pays" {...field} />
                    </FormControl>
                    <FormDescription>
                        Renseignez le nom du pays.
                    </FormDescription>
                    {form.formState.errors.name ? <FormMessage>{form.formState.errors.name.message}</FormMessage> : <FormMessage />}
                </FormItem>
            )} />
            <FormField name="code" control={form.control} render={({ field }) => (
                <FormItem className="mb-6">
                    <FormLabel>Code du pays</FormLabel>
                    <FormControl>
                        <Input placeholder="Code du pays" {...field} />
                    </FormControl>
                    <FormDescription>
                        Renseignez le code du pays.
                    </FormDescription>
                    {form.formState.errors.code ? <FormMessage>{form.formState.errors.code.message}</FormMessage> : <FormMessage />}
                </FormItem>
            )} />
            <FormField name="emoji" control={form.control} render={({ field }) => (
                <FormItem className="mb-6">
                    <FormLabel>Emoji du pays</FormLabel>
                    <FormControl>
                        <Input placeholder="Emoji du pays" {...field} />
                    </FormControl>
                    <FormDescription>
                        Renseignez l'emoji du pays.
                    </FormDescription>
                    {form.formState.errors.emoji ? <FormMessage>{form.formState.errors.emoji.message}</FormMessage> : <FormMessage />}
                </FormItem>
            )} />
            <Button type="submit" className="w-full mt-2" disabled={!form.formState.isValid}>Ajouter le pays</Button>
            </form>
        </Form>
        
    )
}