import { useRouter } from "./context";

export const useNavigator = () => {
  const { navigate } = useRouter();

  return navigate;
};

export const useAnchor = () => {
  const { anchor, setAnchor } = useRouter();

  return <const>[anchor, setAnchor];
};
