import api from "@/utils/api.js";

function App() {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("clicked");
    try {
      const res = await api.get("/status");
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="p-12">
        <button
          type="button"
          className="bg-zinc-800 px-4 py-2 text-zinc-100 cursor-pointer rounded-sm inline-block"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Request
        </button>
      </div>
    </>
  );
}

export default App;
