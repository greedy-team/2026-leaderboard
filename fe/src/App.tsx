import { LeaderboardPage } from "./components/LeaderboardPage";
import { SignupPage } from "./components/SignupPage";

function App() {
  const path = window.location.pathname;

  if (path.includes("/signup")) {
    return <SignupPage />;
  }

  return <LeaderboardPage />;
}

export default App;
