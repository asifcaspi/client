import Posts from "../components/Items.jsx";
import ComponentLoading from "../components/ComponentLoading.jsx";
import useFetchData from "../hooks/useFetchData.jsx";
import ErrorHandler from "../components/ErrorHandeler.jsx";
import { useContext } from "react";
import AuthContext from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const HeroRecomend = () => {
  const navigate = useNavigate();
  const { baseUrl, token } = useContext(AuthContext);
  const PostLoadingComponent = ComponentLoading(Posts),
    { appState, getNextPage, getInitialPage } = useFetchData(
      baseUrl + `animals/recommendations/${token.id}`
    );
  const hasPrevious = appState.previous !== null,
    hasNext = appState.next !== null;

  const addAdoption = (e) => {
    e.preventDefault();

    navigate("/adoption");
  };

  if (appState.error) return <ErrorHandler retry={getInitialPage} />;

  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <PostLoadingComponent
        isLoading={appState.loading}
        posts={appState.posts}
      />

      <button
        className="active-btn fixed bottom-4 right-4 rounded-full"
        onClick={addAdoption}
        name="add Animal"
      >
        מסור חיה
      </button>

      {!appState.loading && (
        <div className="flex justify-center gap-5 items-center mb-16">
          <button
            className={hasNext ? "active-btn" : "disabled-btn"}
            onClick={getNextPage}
            name="next"
            disabled={appState.next === null}
          >
            הבא
          </button>
          <button
            className={hasPrevious ? "active-btn" : "disabled-btn"}
            onClick={getNextPage}
            name="prev"
            disabled={appState.previous === null}
          >
            אחורה
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroRecomend;
