import { OnResults } from "nuvo-react";
import dotObject from "dot-object";
import { getResultModelSchema } from "./customers-columns-model";
import {appBridgeInstance} from "../../../pages/_app";

export const handleImportSubmit: OnResults = (resultArray, identifier, complete) => {
  const parsedResult = resultArray.map((row) =>
    getResultModelSchema().parse(dotObject.object(row))
  );

  console.log(parsedResult);
  console.log(appBridgeInstance?.getState());

  complete();
};
