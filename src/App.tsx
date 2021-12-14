import PageLayout from "./components/PageLayout";
import NFTGalleryPage from "./pages/NFTGalleryPage";
import { Web3Provider } from "./hooks/useWeb3";
import { AppStateProvider } from "./hooks/useAppState";

function App() {
  return (
    <Web3Provider>
      <AppStateProvider>
        <PageLayout>
          <NFTGalleryPage />
        </PageLayout>
      </AppStateProvider>
    </Web3Provider>
  );
}

export default App;
