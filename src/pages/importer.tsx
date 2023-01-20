import { NextPage } from "next";
import React, { ComponentProps } from "react";
import { Container, Divider, Typography } from "@material-ui/core";
import { Button, PageTab, PageTabs } from "@saleor/macaw-ui";
import { CustomersImporterView } from "../modules/customers/customers-importer-nuvo/customers-importer-view";
import GraphQLProvider from "../providers/GraphQLProvider";
import { actions, useAppBridge } from "@saleor/app-sdk/app-bridge";

type Tab = "customers";

const ImporterPage: NextPage = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>("customers");

  const { appBridge } = useAppBridge();

  const openInNewTab = (url: string) => {
    appBridge?.dispatch(
      actions.Redirect({
        to: url,
        newContext: true,
      })
    );
  };

  return (
    <Container>
      <Typography paragraph variant="h1">
        Saleor Data Importer App
      </Typography>
      <Typography paragraph>Import data from CSV-like files to Saleor</Typography>

      <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
        <Button
          onClick={() => {
            openInNewTab("https://github.com/saleor/saleor-app-data-importer");
          }}
          variant="tertiary"
        >
          Repository
        </Button>
        <Button
          onClick={() => {
            openInNewTab("https://github.com/saleor/apps/discussions");
          }}
          variant="tertiary"
        >
          Request a feature
        </Button>
      </div>

      <PageTabs
        style={{ marginBottom: 20, marginTop: 20 }}
        value={activeTab}
        onChange={(e) => setActiveTab(e as Tab)}
      >
        <PageTab value="customers" label="Customers & addresses" />
        <PageTab disabled value="orders" label="Orders (coming soon)" />
        <PageTab disabled value="products" label="Products (coming soon)" />
      </PageTabs>
      <Divider style={{ marginBottom: 50 }} />
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
