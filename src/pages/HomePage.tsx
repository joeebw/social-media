import { Button } from "@/components/ui/button";
import { logoutUser } from "@/utils/firebase";

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Button onClick={logoutUser} variant={"default"}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
