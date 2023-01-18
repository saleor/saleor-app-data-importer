import { TableCell, TableRow, Typography } from "@material-ui/core";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useCustomerCreateMutation } from "../../../../generated/graphql";
import { CustomerColumnSchema } from "../customers-importer-nuvo/customers-columns-model";
import { actions, useAppBridge } from "@saleor/app-sdk/app-bridge";
import { Button } from "@saleor/macaw-ui";

type Props = {
  importedModel: CustomerColumnSchema;
  doImport: boolean;
};

const ImportedStatus = ({ id }: { id: string }) => {
  const { appBridge } = useAppBridge();

  return (
    <span
      onClick={() => {
        appBridge?.dispatch(
          actions.Redirect({
            newContext: true,
            to: `/customers/${id}`,
          })
        );
      }}
    >
      Imported with ID {id}
    </span>
  );
};

const ErrorStatus = ({ message, onRetry }: { message: string; onRetry(): void }) => {
  return (
    <div>
      <Typography color="error">Error importing: {message}</Typography>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
};
const PendingStatus = () => <span>Importing...</span>;

export const CustomerImportingRow = (props: Props) => {
  const [mutationResult, mutate] = useCustomerCreateMutation();
  const triggerMutation = useCallback(() => {
    mutate({
      input: {
        // todo map address
        ...props.importedModel.customerCreate,
        defaultShippingAddress: null,
        defaultBillingAddress: null,
        isActive: false,
      },
    });
  }, [props.importedModel]);

  useEffect(() => {
    if (props.doImport) {
      triggerMutation();
    }
  }, [props.doImport, mutate]);

  const renderStatus = () => {
    if (mutationResult.data?.customerCreate?.user?.id) {
      return <ImportedStatus id={mutationResult.data?.customerCreate?.user?.id} />;
    }

    if (mutationResult.data?.customerCreate?.errors) {
      return (
        <ErrorStatus
          onRetry={triggerMutation}
          message={mutationResult.data?.customerCreate?.errors[0].message ?? "Error importing"}
        />
      );
    }

    if (mutationResult.fetching) {
      return <PendingStatus />;
    }
  };

  return (
    <TableRow>
      <TableCell>{props.importedModel.customerCreate.email}</TableCell>
      <TableCell>{renderStatus()}</TableCell>
    </TableRow>
  );
};
