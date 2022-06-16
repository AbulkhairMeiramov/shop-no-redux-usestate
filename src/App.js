import { UsersModule } from "./components/UsersModule";
import { AuthorizationForm } from "./components/AuthorizationForm";
import "./styles.css";
import { ShopModule } from "./components/ShopModule";

export default function App() {
  return (
    <div className="App">
      <ShopModule />
    </div>
  );
}
