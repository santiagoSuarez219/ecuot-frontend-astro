import { useEffect, useState } from "react";
import { actions } from "astro:actions";
import type { Intervention } from "../../../interfaces/interventions-list";

interface Props {
  initialData: Intervention[];
}

export default function InterventionSearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Intervention[]>([]);
  const [hierarchy, setHierarchy] = useState("");

  const fetchResults = async (query: string, hierarchyValue: string) => {
    const { data, error } = await actions.searchInterventions({
      query,
      hierarchy: hierarchyValue,
    });
    if (!error) {
      setResults(data);
    }
  };

  useEffect(() => {
    fetchResults("", "");
  }, []);

  return (
    <div className="mt-6">
      <form className="w-full md:mt-6 grid grid-cols-1 lg:grid-cols-2 min-[1704px]:grid-cols-3 rounded-lg shadow-sm items-center px-0 py-6 md:p-4 gap-6 justify-between">
        <div className="flex flex-col justify-between h-full mb-2">
          <div className="space-y-1">
            <label
              htmlFor="search"
              className="text-xl md:text-2xl font-semibold text-primary"
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
              fetchResults(value, hierarchy);
            }}
          />
        </div>
        <div className="flex flex-col justify-between h-full mb-2">
          <div className="space-y-1">
            <label
              htmlFor="hierarchy"
              className="text-xl md:text-2xl font-semibold text-primary"
            >
              Jerarquia
            </label>
            <p className="text-md text-font-color leading-tight">
              Organización y clasificación de las acciones urbanística según los
              niveles de importancia y función dentro del ordenamiento del
              territorio.
            </p>
          </div>
          <select
            name="hierarchy"
            id="hierarchy"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-md text-font-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            onChange={(e) => {
              const value = e.target.value;
              setHierarchy(value);
              fetchResults(search, value);
            }}
          >
            <option value=""> -- Seleccione -- </option>
            <option value="Ciudad">Ciudad</option>
            <option value="Barrial y Suburbano">Barrial y Suburbano</option>
            <option value="Metropolitano y Regional">
              Metropolitano y Regional
            </option>
            <option value="Zonal y Corregimental">Zonal y Corregimental</option>
          </select>
        </div>
        <div className="flex flex-col justify-between h-full mb-2">
          <div className="space-y-1">
            <label
              htmlFor="hierarchy"
              className="text-xl md:text-2xl font-semibold text-primary"
            >
              Sistema
            </label>
            <p className="text-md text-font-color leading-tight">
              Elementos en torno a los cuales se organiza y estructura el
              territorio para favorecer su desarrollo.
            </p>
          </div>
          <select
            name="system"
            id="system"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-md text-font-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            //   onChange={(event) => setSearchBySystem(event.target.value)}
          >
            <option value=""> -- Seleccione -- </option>

            <option
              value="Sistema de Espacio Público de esparcimiento y
encuentro"
            >
              Sistema de Espacio Público de esparcimiento y encuentro
            </option>
            <option value="Sistema de Movilidad (vías, caminos, ciclorutas, transporte)">
              Sistema de Movilidad (vías, caminos, ciclorutas, transporte)
            </option>
            <option value="Sistema de Equipamientos">
              Sistema de Equipamientos
            </option>
            <option
              value="Sistema de Servicios Públicos (domiciliarios y no
domiciliarios)"
            >
              Sistema de Servicios Públicos (domiciliarios y no domiciliarios)
            </option>
            <option value="Sistema Habitacional">Sistema Habitacional</option>
            <option value="Sistema de Centralidades">
              Sistema de Centralidades
            </option>
            <option value="Sistema de Patrimonio Cultural Inmueble">
              Sistema de Patrimonio Cultural Inmueble
            </option>
          </select>
        </div>
      </form>

      {results.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {results.map((intervention) => (
            <div
              className="w-full bg-font-color-light rounded-lg p-6 flex flex-col gap-6"
              key={intervention._id}
            >
              <figure className="w-full bg-white rounded-md aspect-square relative overflow-hidden">
                <p className="p-2 bg-primary text-white rounded-md absolute top-4 left-4">
                  {intervention.hierarchy}
                </p>
                <img
                  src={intervention.image || "logo.avif"}
                  alt={intervention.interventionName}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="flex-grow flex flex-col gap-2 whitespace-pre-line">
                <h2 className="font-bold text-2xl text-primary">
                  {intervention.interventionName}
                </h2>
                <p>{intervention.description}</p>
                <div>
                  <p className="text-primary font-medium text-lg">
                    Proyecto estrategico
                  </p>
                  <p>{intervention.strategicProject}</p>
                </div>
                <div>
                  <p className="text-primary font-medium text-lg">
                    Sistema interno
                  </p>
                  <p>{intervention.internalSystem.systemName}</p>
                </div>
              </div>
              <input
                type="button"
                value="Ir a la ficha tecnica"
                className="bg-primary text-white rounded-md text-lg font-semibold w-full py-2 cursor-pointer hover:bg-secondary transition-all"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-96 border-2 p-6 md:p-0 border-primary rounded-lg flex flex-col justify-center items-center text-septenary">
          <p className="text-[3rem] font-medium">{`No hay actuaciones urbanisticas`}</p>
        </div>
      )}
    </div>
  );
}
