import { MeshProvider } from "@martifylabs/mesh-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClickScrollToTop from "../components/_common/ClickScrollToTop";
import Footer from "../components/_common/Footer";
import MaintenanceMode from "../components/_common/maintenanceMode";
import NavBar from "../components/_common/navBar";
import ProgressBar from "../components/_common/ProgressBar";
import ScrollToTop from "../components/_common/scrollToTop";
import Splash from "../components/_common/SplashScreen/Splash";
import { handleSettings } from "../services/user.services";
import { store } from "../store";
import { saveSettingsData } from "../store/reducers/settingsSlice";
import "../styles.css";
import { setupAxios } from "../utilty/axiosClient";
import { socket, SocketContext } from "../utilty/context/socket";
import { SOCKET_TYPES } from "../utilty/enums/socket.enum";
import { resetTimer, stopTimer, tickTimer } from "../store/reducers/timerSlice";
const App = (props: any) => {
  const location = useRouter();
  const [splash, setSplash] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const timerState = store.getState().timer;
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const handleMaintenanceMode = async () => {
    try {
      const res = await handleSettings();
      store.dispatch(saveSettingsData(res?.data));
      setMaintenance(res?.data?.maintenance);
    } catch (error) {
      // const err = getNormalizedError(er0ror);
      // toast.error(err);
    }
  };

  const IntSocket = useCallback(() => {
    socket.on("connect_error", (e: any) => {});
    socket.on(SOCKET_TYPES.SETTINGS, (data: any) => {
      store.dispatch(saveSettingsData(data?.data));
      setMaintenance(data?.data?.maintenance);
    });

    return () => {
      socket.removeListener(SOCKET_TYPES.SETTINGS);
    };
  }, []);

  // useEffect(() => {
  //   let timerId;

  //   if (timerState.running) {
  //     timerId = setInterval(() => {
  //       store.dispatch(tickTimer());
  //     }, 1000);
  //   } else if (timerState.duration <= 0) {
  //     store.dispatch(stopTimer());
  //     store.dispatch(resetTimer());
  //   }

  //   return () => clearInterval(timerId);
  // }, [timerState, store?.dispatch]);

  useEffect(() => {
    IntSocket();
    setupAxios();
    handleMaintenanceMode();
  }, []);

  if (splash) {
    return <Splash setSplash={setSplash} />;
  }

  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <Head>
          <title>Fantasy Funduhmentals</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ScrollToTop />
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          style={{ zIndex: 21 }}
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
          closeOnClick={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {store?.getState()?.settingsData?.settingsData?.maintenance ? (
          <MaintenanceMode />
        ) : (
          <MeshProvider>
            <NavBar />
            <ProgressBar />
            <ClickScrollToTop />
            {getLayout(<Component {...pageProps} />)}
            {location?.asPath?.includes("dashboard") ? null : <Footer />}
          </MeshProvider>
        )}
      </SocketContext.Provider>
    </Provider>
  );
};

export default App;
