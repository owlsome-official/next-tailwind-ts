import { OverlayLoading } from "react-loading-randomizable";
import { OverlayLoadingProps } from "react-loading-randomizable/dist/components";

const OverlayLoadingCustom = (props: OverlayLoadingProps) => {
  return <OverlayLoading {...props} />;
};

export default OverlayLoadingCustom;
