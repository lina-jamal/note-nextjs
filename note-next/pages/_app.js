import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";
import "../css/style.css";

const App = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default App;
