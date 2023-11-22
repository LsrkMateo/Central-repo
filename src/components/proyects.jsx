import { useState } from "react";
function proyects() {
  const [repos, setrepos] = useState(null);
  const getRepos = async () => {
    try {
      const res = await fetch("api/repos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const repos = await res.json();
        await setrepos(repos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);
  return <div>proyects</div>;
}

export default proyects;
