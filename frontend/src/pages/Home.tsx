import AddCountryForm from "@/components/Forms/AddCountryForm";
import { LIST_ALL_COUNTRIES } from "@/requests/queries/countries";
import { Country } from "@/types";
import { useQuery } from "@apollo/client";

export function HomePage() {

  const { data, loading, error, refetch } = useQuery(LIST_ALL_COUNTRIES);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  const countries: Country[] = data.countries;

  return (
    <section className="w-full flex p-12 gap-10">
      <div className="w-1/2 p-4 pr-30">        
        <h2 className="text-2xl font-bold mb-8">Ajouter un pays</h2>
        <AddCountryForm updateList={refetch} />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-8">Liste des pays</h2>
        <ul className="grid grid-cols-2 gap-4 overflow-auto max-h-96">
          {countries.map((country) => (
            <a key={country.id} className="flex flex-col items-center justify-center border border-gray-300 p-4 rounded" href={`/country/${country.code}`}>
              <span className="text-2xl">{country.emoji}</span>
              <h3 className="text-lg font-semibold mb-2">{country.name}</h3>
              {country.continent ? <p className="text-sm">{country.continent?.name}</p> : null}
            </a>
          ))}
        </ul>
      </div>
    </section>
  );
}