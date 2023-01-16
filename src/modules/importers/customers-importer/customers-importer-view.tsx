import React from "react";
import dynamic from "next/dynamic";
import { ConfigureAPI, SettingsAPI } from "nuvo-react";
import { getCustomersModelColumns } from "./customers-columns-model";

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

export const CustomersImporterView = () => {
  return (
    <NuvoImporter
      onResults={(r, id, complete) => {
        console.log(r);
        console.log(id);
        complete();
      }}
      licenseKey={licenseKey}
      settings={nuvoSettings}
    />
  );
};
