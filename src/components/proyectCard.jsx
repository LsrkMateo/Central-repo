import { BiSolidStar } from "react-icons/bi";
import { useRouter } from "next/navigation";
export default function ProyectCard(props) {
  const { image, title, description, tags, stars, index, proyectId } = props;
  const router = useRouter();
  return (
    <div className="dark:bg-gray-800 rounded-lg p-1.5 mt-4 flex justify-center">
      <button
        onClick={() => {
          router.push(`proyectos/${proyectId}`);
        }}
        key={index}
        className="w-full h-full max-w-md border-white border rounded overflow-hidden shadow-lg text-left"
      >
        <div className="m-2">
          {image && (
            <img className="w-full" src={image} alt={`imagen de ${title}`} />
          )}
          <div className="px-6 pt-4 dark:text-white">
            <div className="font-bold text-xl mb-2 dark:text-white">{title}</div>
            <p className="text-base text-gray-600 dark:text-gray-400">
              {description}
            </p>
            <div className="mt-3 text-yellow-500 dark:text-yellow-400 flex gap-2 items-center">
              <BiSolidStar /> {stars}
            </div>
          </div>
          <div className="px-6 pt-4 pb-2">
            {tags &&
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="dark:bg-gray-700 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 dark:text-white"
                >
                  # {tag}
                </span>
              ))}
          </div>
        </div>
      </button>
    </div>
  );
  
}
