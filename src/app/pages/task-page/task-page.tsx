import { memo } from "react";

import { useTitle } from "~/infrastructure/hooks";
import { useParams } from "~/infrastructure/router";
import { Area, Title } from "~/infrastructure/ui";

import { Header } from "~/concern/common/chunks";
import { taskRoute } from "~/concern/common/routes";

export const TaskPage = memo(() => {
  const { id } = useParams<typeof taskRoute>();

  useTitle(`Task ${id}`);

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        <Title size={2}>Task {id}</Title>
      </Area>
    </>
  );
});
