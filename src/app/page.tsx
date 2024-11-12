import ActionZone from "@/components/Common/ActionZone";
import AfterInstallation from "@/components/Common/AfterInstallation";

const Home = () => {
  return (
    <div className="glass-effect flex h-full w-full flex-col justify-between gap-8 p-4">
      <AfterInstallation />
      <hr className="border-black/10" />
      <ActionZone />
    </div>
  );
};

export default Home;
