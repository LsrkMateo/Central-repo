import SubCard from "@/components/SubCard";
function Documentacion() {
  return (
    <div className="min-h-screen p-8 dark:bg-gray-950 dark:text-white">
      <div
        className="text-4xl font-bold mb-4 
           dark:text-white text-gray-900"
      >
        Documentación:
      </div>
      <div className="dark:text-gray-400 text-gray-700 mb-4">
        El objetivo de este proyecto es centralizar los proyectos que yo, como
        desarrollador principiante, voy creando. Se hace uso de Next.js con
        estilos Tailwind CSS para la construcción de la página. También se hace
        uso de la API de GitHub para la obtención de datos. En la sección
        "videos" se colocarán los videos en los que me baso para crear los
        proyectos. En la sección "blogs" se colocarán los blogs que voy
        escribiendo, que pueden ser documentación o simplemente un punto de
        vista ante cualquier noticia.
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SubCard href={"/documentacion/modo-oscuro"}>
          Manejo del modo oscuro
        </SubCard>

        <SubCard href={"/documentacion/github-actions"}>Github actions</SubCard>

        <SubCard href={"/documentacion/descubrimientos-extra"}>
          Descubrimientos extra
        </SubCard>

        <SubCard href={"/documentacion/apis"}>Consumo de APIs</SubCard>

        <SubCard href={"/documentacion/machinelearning"}>
          IA y machine learning
        </SubCard>
      </div>
    </div>
  );
}

export default Documentacion;
