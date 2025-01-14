import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import sessionReducer, { activeTabTab } from "../redux/sessionSlice";
import authReducer from "../redux/authSlice";

const listenerMiddleware = createListenerMiddleware();

const store = configureStore({
  reducer: {
    session: sessionReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useActiveTab = () =>
  useAppSelector((state) => state.session.activeTab);

listenerMiddleware.startListening({
  actionCreator: activeTabTab,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log("Todo added: ", action.payload);

    // Can cancel other running instances
    listenerApi.cancelActiveListeners();

    console.log(
      "cancelActiveListeners",
      listenerApi.getState().session.activeTab
    );
    listenerApi.dispatch(
      activeTabTab(listenerApi.getState().session.activeTab)
    );
    return;
    // Run async logic
    // const data = await fetchData()

    // // Pause until action dispatched or state changed
    // if (await listenerApi.condition(matchSomeAction)) {
    //   // Use the listener API methods to dispatch, get state,
    //   // unsubscribe the listener, start child tasks, and more
    //   listenerApi.dispatch(todoAdded('Buy pet food'))

    //   // Spawn "child tasks" that can do more work and return results
    //   const task = listenerApi.fork(async (forkApi) => {
    //     // Can pause execution
    //     await forkApi.delay(5)
    //     // Complete the child by returning a value
    //     return 42
    //   })

    //   const result = await task.result
    //   // Unwrap the child result in the listener
    //   if (result.status === 'ok') {
    //     // Logs the `42` result value that was returned
    //     console.log('Child succeeded: ', result.value)
    //   }
    // }
  },
});

export default store;
