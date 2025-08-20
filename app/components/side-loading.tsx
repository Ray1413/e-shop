import React from "react";
import { useNavigation } from "react-router";
import Progress from "@/components/progress";

export default function SideLoading() {
  const [key, setKey] = React.useState("");
  const navigation = useNavigation();
  const location = navigation.location;
  const loading = Boolean(location);

  React.useEffect(() => {
    if (location) setKey(location.key);
  }, [loading]);

  return <Progress isAnimating={loading} key={key} />;
}
