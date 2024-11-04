import { memo } from "react";

import { useDocumentTitle } from "~/react";

import { usePathParams } from "~/infrastructure/router";
import { Area, Flex, Title } from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";
import { taskRoute } from "~/concern/general/routes";

export const TaskPage = memo(() => {
  const { id } = usePathParams<typeof taskRoute>();

  useDocumentTitle(`Task ${id}`);

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        <Area marginBottom={0.8}>
          <Flex justifyContent="between" alignItems="center">
            <Title size={3}>Task {id}</Title>
          </Flex>
        </Area>
      </Area>
    </>
  );
});
