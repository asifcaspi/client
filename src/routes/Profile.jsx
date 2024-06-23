import { useState, useEffect, useContext } from "react";
import Orders from "../components/Orders.jsx";
import componentLoading from "../components/ComponentLoading.jsx";
import ErrorHandler from "../components/ErrorHandeler.jsx";
import AddBalance from "../components/AddBalance.jsx";
import axiosInstance from "../axios.js";
import AuthContext from "../AuthContext.jsx";
import useFetchOrders from "../hooks/useFetchOrders.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import { Rings } from "react-loader-spinner";
import items from "../components/Items.jsx";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { baseUrl, token } = useContext(AuthContext);
  const OrderLoadingComponent = componentLoading(items);
  const { appState, getNextPage, getInitialPage, setAppState } = useFetchOrders(
    {
      url: baseUrl + "animals/",
    }
  );
  const [showBalanceWindow, setShowBalanceWindow] = useState(false);

  const getUser = async () => {
    const res = await axiosInstance.get(baseUrl + `users/${token.id}`);
    setUser(res.data);

    setUser({
      id: "123456",
      user_name: "ohad",
      email: "ohadmontnaiez@gmail.com",
      image_url:
        "data:image/jpeg;base64,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",
      age: 30,
    });
    setLoading(false);
  };

  const refresh = async () => {
    setLoading(true);
    getUser().then(() => setLoading(false));
    getInitialPage().catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    axiosInstance
      .get(baseUrl + `animals/of/${token.id}`)
      .then((res) => {
        const userAnimals = res.data;

        const likers = userAnimals.reduce((pre, animal) => {
          if (animal.liked_by) {
            return [...pre, ...animal.liked_by];
          }

          return pre;
        }, []);

        const likersAsItems = likers.map((liker) => ({
          id: liker.id,
          uploaded_by: liker,
          image: liker.image_url,
          name: liker.user_name,
          age: liker.age,
          sex: "male",
          liked_by: [],
        }));

        setAppState({
          loading: false,
          error: false,
          orders: likersAsItems,
          next: null,
          previous: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    getUser().catch((err) => {
      console.log(err);
    });
  }, []);

  //if (appState.error) return <ErrorHandler retry={refresh}/>;
  return (
    <>
      {showBalanceWindow && (
        <AddBalance setShow={setShowBalanceWindow} refresh={refresh} />
      )}
      <div className="bg-gradient-to-bl min-h-[calc(100vh-5rem)] px-12 flex flex-col  lg:justify-between lg:flex-row from-[#afd9d8] to-sky-100 py-12 lg:px-32">
        <div className="w-fit h-fit self-start mb-12 rounded-md lg:sticky lg:top-24">
          <div>
            <div className="flex flex-col gap-2  whitespace-nowrap w-full justify-center p-2">
              {loading ? (
                <>
                  <Rings
                    height="100"
                    width="100"
                    color="#38bdf8"
                    radius="6"
                    visible={true}
                    ariaLabel="rings-loading"
                  />
                </>
              ) : (
                <>
                  <div className="flex gap-3 items-end">
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-sky-300"
                      src={user.image_url}
                      alt="profile"
                    />
                    <p className="text-lg font-semibold">{user.user_name}</p>
                  </div>
                  <p className="text-lg font-semibold"> {user.email}</p>
                  <p className="text-lg font-semibold"> {user.age} בן \ בת</p>
                  <button
                    className="active-btn rounded w-fit mt-2"
                    onClick={() => setShowBalanceWindow(true)}
                  >
                    ערוך פרופיל
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={`basis-2/3 grow lg:grow-0 bg-white shadow-2xl rounded p-6 ${
            !appState.orders?.length ? "grid place-items-center" : null
          }`}
        >
          {appState?.orders?.length ? (
            <>
              <h1 className="text-center font-semibold text-5xl">
                אנשים שמתעניינים בחיות שלך{" "}
              </h1>
              <div className="flex flex-col w-max p-0 pb-0 gap-8">
                <OrderLoadingComponent
                  className={"flex content-space-between"}
                  isLoading={appState.loading}
                  posts={appState.orders}
                  isUsers={true}
                />
              </div>
            </>
          ) : (
            <OrderLoadingComponent isLoading={appState.loading} posts={[]} />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
