import { useTitle } from "~/infrastructure/hooks";
import { useRouter } from "~/infrastructure/router";

import { taskRoute } from "~/concern/common/routes";

export const TaskPage = () => {
  const { getRouteParams } = useRouter();
  const { id } = getRouteParams(taskRoute);

  useTitle(`Task ${id}`);

  return <div>Task {id}</div>;
};
