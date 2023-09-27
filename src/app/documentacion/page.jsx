import SubCard from "../../components/SubCard";
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
        Hola, esta es la documentacion
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SubCard href={"/documentacion/documentacion-main"}>
          Documentacion principal
        </SubCard>

        <SubCard href={"/documentacion/apis"}>Consumo de APIs</SubCard>
      </div>
    </div>
  );
}

export default Documentacion;
