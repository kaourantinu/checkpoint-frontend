import { GET_COUNTRY_BY_CODE } from "@/requests/queries/country";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export default function CountryPage() {

    const { code } = useParams<{ code: string }>();

    const { loading, error, data } = useQuery(GET_COUNTRY_BY_CODE, {
        variables: { code },
    });

    if(loading) return <p>Chargement...</p>;
    if(error) return <p>Erreur: {error.message}</p>;

    const country = data?.country;

    return (
        <div className="w-full flex flex-col items-center justify-center p-10">
            {country ? (
                <>
                        <span className="text-6xl mb-3">{country.emoji}</span>
                        <h2 className="text-3xl font-semibold mb-6">{country.name}</h2>
                        <div className="flex flex items-center gap-4">
                            <span className="inline-block bg-neutral-200 text-neutral-800 text-sm px-3 py-1 [border-radius:8px]">{country.code}</span>
                            <span className="inline-block bg-neutral-200 text-neutral-800 text-sm px-3 py-1 [border-radius:8px]">{country.emoji}</span>
                            <span className="inline-block bg-neutral-200 text-neutral-800 text-sm px-3 py-1 [border-radius:8px]">{country.continent.name}</span>
                        </div>
                </>
                
            ) : (
                <p>Aucun pays trouvé.</p>
            )}
        </div>
    )
}