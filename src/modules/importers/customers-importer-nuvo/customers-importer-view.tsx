import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { ConfigureAPI, OnResults, SettingsAPI } from "nuvo-react";
import { getCustomersModelColumns, getResultModelSchema } from "./customers-columns-model";
import dotObject from "dot-object";
import { useCustomerCreateMutation } from "../../../../generated/graphql";
import { appBridgeInstance } from "../../../pages/_app";
import {useAuthorizedToken} from "../../authorization/use-authorized-token";

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
 * - check JWT token, check if MANAGER_USERS is there
 * - display list of importer users after results created, show mutation progress and error and retry
 * - map addresses https://docs.saleor.io/docs/3.x/developer/address
 */
export const CustomersImporterView = () => {
  const [result, mutate] = useCustomerCreateMutation();
  console.log(appBridgeInstance?.getState());
  console.log(result);

  useAuthorizedToken()

  const handleResults: OnResults = useCallback(
    (resultArray) => {
      const parsedResult = resultArray.map((row) =>
        getResultModelSchema().parse(dotObject.object(row))
      );

      mutate({
        input: {
          ...parsedResult[0].customerCreate,
          defaultShippingAddress: null,
          defaultBillingAddress: null,
        },
      });
    },
    [mutate]
  );

  return <NuvoImporter onResults={handleResults} licenseKey={licenseKey} settings={nuvoSettings} />;
};
