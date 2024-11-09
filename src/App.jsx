import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { fetchContacts } from "./redux/contacts/operations";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <Layout>
        <Routes></Routes>
      </Layout>
    </div>
  );
}

export default App;
