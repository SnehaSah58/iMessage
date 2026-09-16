import { Show, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/react" ;
import { Button } from '@heroui/react';
import { ThemeProvider } from "./context/ThemeContext";
import { WALLPAPERS } from "./data/wallpapers";
import { WallpaperProvider } from "./context/WallpaperContext";
import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const { isSignedIn, isLoaded } = useAuth();

  if(!isLoaded) return <p> Loading...</p>;

  return (
    <ThemeProvider>
      <WallpaperProvider>
      <Routes>
        <Route path = "/" element = { isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} />
        <Route path = "/auth" element = {!isSignedIn ? <AuthPage /> :  <Navigate to={"/chat"} replace/>} />
      </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  );
}
     
export default App;
