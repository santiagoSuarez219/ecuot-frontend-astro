import { useEffect, useState } from "react";
import { actions } from "astro:actions";

import type { Intervention, News } from "@interfaces/news-list";
import CardNews from "@components/News/CardNews/CardNews";

export default function NewsSeach() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<News[]>([]);
  const [intervention, setIntervention] = useState("");
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [visibleCount, setVisibleCount] = useState(30);

  const getInterventions = async (query: string, hierarchy: string, system: string) => {
    const { data, error } = await actions.searchInterventions({
      query,
      hierarchy,
      system,
    });
    if (!error) {
      setInterventions(data);
    }
  };

  const getNews = async (query: string, intervention: string) => {
    const { data, error } = await actions.searchNews({
      query,
      intervention,
    });
    if (!error) {
      setResults(data);
    }
  };

  useEffect(() => {
    getInterventions("", "", "");
    getNews("", "");
  }, []);

  return (
    <div className="mt-6">
      <form
        className="w-full md:mt-6 grid grid-cols-1 lg:grid-cols-2 min-[1704px]:grid-cols-3 rounded-lg shadow-sm items-center px-0 py-6 md:p-4 gap-6 justify-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col justify-between h-full mb-2">
          <div className="space-y-1">
            <label
              htmlFor="search"
              className="text-xl md:text-2xl font-semibold text-quinary"
            >
              Buscar
            </label>
            <p className="text-md text-font-color leading-tight">
              Filtrar por un nombre o una descripcion
            </p>
          </div>
          <input
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-md text-font-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            placeholder="Buscar por nombre o descripcion..."
            type="search"
            id="search"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              getNews(value, intervention);
            }}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col justify-between h-full mb-2">
          <div className="space-y-1">
            <label
              htmlFor="intervention"
              className="text-xl md:text-2xl font-semibold text-quinary"
            >
              Actuación urbanística asociada
            </label>
            <p className="text-md text-font-color leading-tight">
              Filtrar por la actuación urbanistica asociada
            </p>
          </div>
          <select
            name="intervention"
            id="intervention"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-md text-font-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            value={intervention}
            onChange={(e) => {
              const value = e.target.value;
              setIntervention(value);
              getNews(search, value);
            }}
          >
            <option value="">Todas las actuaciones urbanisticas</option>
            {interventions.map((item) => (
              <option key={item._id} value={item._id}>
                {item.interventionName}
              </option>
            ))}
          </select>
        </div>
      </form>
      {results.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {results.slice(0, visibleCount).map((news) => (
              <CardNews
                key={news._id}
                idIntervention={news.intervention._id}
                name={news.newsName}
                description={news.description}
                image={news.intervention.internalSystem}
                interventionName={news.intervention.interventionName}
              />
            ))}
          </div>
          {results.length > visibleCount && (
            <div className="text-center mt-8">
              <button
                className="bg-quinary text-white px-4 py-2 rounded hover:scale-105 transition-all cursor-pointer"
                onClick={() => setVisibleCount((prev) => prev + 15)}
                type="button"
              >
                Ver más
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-96 border-2 p-6 md:p-0 border-primary rounded-lg flex flex-col justify-center items-center text-septenary">
          <p className="text-[3rem] font-medium">{`No hay acontecimientos noticiosos`}</p>
        </div>
      )}
    </div>
  );
}
