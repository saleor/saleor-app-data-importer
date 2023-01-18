import { NextPage } from "next";
import React, { ComponentProps } from "react";
import { Container, Divider, Typography } from "@material-ui/core";
import { PageTab, PageTabs } from "@saleor/macaw-ui";
import { CustomersImporterView } from "../modules/customers/customers-importer-nuvo/customers-importer-view";
import GraphQLProvider from "../providers/GraphQLProvider";

type Tab = "customers";

const ImporterPage: NextPage = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>("customers");

  return (
    <Container>
      <Typography variant="h1">Saleor Data Importer App</Typography>

      <PageTabs
        style={{ marginBottom: 20, marginTop: 20 }}
        value={activeTab}
        onChange={(e) => setActiveTab(e as Tab)}
      >
        <PageTab value="customers" label="Customers & addresses" />
        <PageTab disabled value="orders" label="Orders" />
        <PageTab disabled value="products" label="Products" />
      </PageTabs>
      <Divider style={{ marginBottom: 20 }} />
      {activeTab === "customers" && <CustomersImporterView />}
    </Container>
  );
};

const WrappedPage = (props: ComponentProps<NextPage>) => (
  <GraphQLProvider>
    <ImporterPage {...props} />
  </GraphQLProvider>
);

export default WrappedPage;
