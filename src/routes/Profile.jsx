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
      user_name: "john_doe",
      email: "john@example.com",
      image_url: "https://www.jquery-az.com/html/images/banana.jpg",
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
