import { navigate } from "astro:transitions/client";

interface CardNewsProps {
    interventionName: string;
    image: string;
    idIntervention: string;
    name: string;
    description: string;
}

export const CardNews: React.FC<CardNewsProps> = ({
    interventionName,
    image,
    idIntervention,
    name,
    description,
}) => (
    <div className="w-full bg-font-color-light rounded-lg p-6 flex flex-col md:flex-row">
        <figure className="w-full md:w-2/5 bg-white rounded-md aspect-square relative overflow-hidden">
            <p className="p-2 bg-font-color-light text-septenary rounded-r-md absolute top-4 left-0 right-4">
                {interventionName}
            </p>

            <img
                src={`/src/assets/Images/${image}.avif`}
                alt={name}
                className="w-full h-full object-cover"
            />
        </figure>
        <div className="w-full md:w-3/5 mt-4 lg:mt-0 md:p-4 flex flex-col">
            <h2 className="font-bold text-2xl text-septenary mb-4">{name}</h2>
            <p className="font-semibold text-base lg:text-lg">
                {description.slice(0, 150) + " ..."}
            </p>
            <div className="flex flex-col md:flex-row gap-4 text-sm mt-4 lg:mt-8">
                <input
                    type="button"
                    value="Leer más"
                    className="bg-quinary text-white rounded-md font-semibold py-2 px-4 cursor-pointer hover:scale-105 transition-all"
                />
                <input
                    type="button"
                    value="Ir actuacion urbanistica"
                    className="bg-primary text-white rounded-md font-semibold py-2 px-4 cursor-pointer hover:scale-105 transition-all"
                    onClick={() => {
                        navigate(`/interventions/${idIntervention}`);
                    }}
                />
            </div>
        </div>
    </div>
);

export default CardNews;