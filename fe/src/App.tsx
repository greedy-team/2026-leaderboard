import { LeaderboardPage } from "./components/LeaderboardPage";
import { SignupPage } from "./components/SignupPage";

function App() {
  const hash = window.location.hash;

  if (hash === "#/signup") {
    return <SignupPage />;
  }

  return <LeaderboardPage />;
}

export default App;
