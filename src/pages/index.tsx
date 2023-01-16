import { NextPage } from "next";
import React from "react";
import { Container, Divider, Typography } from "@material-ui/core";
import { PageTab, PageTabs } from "@saleor/macaw-ui";
import { CustomersImporterView } from "../modules/importers/customers-importer/customers-importer-view";

type Tab = "customers";

const IndexPage: NextPage = () => {
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

export default IndexPage;
