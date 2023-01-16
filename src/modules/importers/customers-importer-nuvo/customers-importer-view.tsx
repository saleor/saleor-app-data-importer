import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ConfigureAPI, OnResults, SettingsAPI } from "nuvo-react";
import {
  CustomerColumnSchema,
  getCustomersModelColumns,
  getResultModelSchema,
} from "./customers-columns-model";
import dotObject from "dot-object";
import { useCustomerCreateMutation } from "../../../../generated/graphql";
import { useAuthorizedToken } from "../../authorization/use-authorized-token";
import { Alert } from "@saleor/macaw-ui";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

let PassSubmitResult: any;
let RejectSubmitResult: any;

const NuvoImporter = dynamic<ConfigureAPI>(
  async () => {
    return import("nuvo-react").then((item) => {
      PassSubmitResult = item.PassSubmitResult;
      RejectSubmitResult = item.RejectSubmitResult;
      return item.NuvoImporter;
    });
  },
  { ssr: false }
);

const columns = getCustomersModelColumns();

const nuvoSettings: SettingsAPI = {
  columns,
  developerMode: true, //todo
  identifier: "customers",
};

const licenseKey = process.env.NEXT_PUBLIC_NUVO_LICENSE_KEY as string;

/**
 * TODO
 * - display list of importer users after results created, show mutation progress and error and retry
 * - map addresses https://docs.saleor.io/docs/3.x/developer/address
 */
export const CustomersImporterView = () => {
  // use mutation-per-line
  // const [mutationResult, mutate] = useCustomerCreateMutation();

  const authorized = useAuthorizedToken("MANAGE_USERS");

  const [importedLines, setImportedLines] = useState<CustomerColumnSchema[] | null>(null);

  const handleResults: OnResults = useCallback((resultArray) => {
    const parsedResult = resultArray.map((row) =>
      getResultModelSchema().parse(dotObject.object(row))
    );

    setImportedLines(parsedResult);
  }, []);

  if (authorized === undefined) {
    return <div>Authorizing</div>;
  }

  if (authorized === false) {
    return <Alert variant="error">To use this importer you need MANAGER_USERS permission</Alert>;
  }

  if (importedLines) {
    return (
      <Table>
        <TableBody>
          {importedLines.map((row) => (
            <TableRow key={row.customerCreate.email}>
              <TableCell>{row.customerCreate.email}</TableCell>
              <TableCell>Status todo</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return <NuvoImporter onResults={handleResults} licenseKey={licenseKey} settings={nuvoSettings} />;
};
