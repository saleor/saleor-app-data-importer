import { Button } from "@saleor/macaw-ui";
import { Table, TableBody } from "@material-ui/core";
import { CustomerImportingRow } from "./customer-importing-row";
import React, { useState } from "react";
import { CustomerColumnSchema } from "../customers-importer-nuvo/customers-columns-model";

export const CustomersImportingResults = ({
  importedLines,
}: {
  importedLines: CustomerColumnSchema[];
}) => {
  const [importingStarted, setImportingStarted] = useState(false);

  return (
    <div>
      {!importingStarted && (
        <Button
          style={{ marginBottom: 20 }}
          variant="primary"
          onClick={() => setImportingStarted(true)}
        >
          Start importing
        </Button>
      )}

      <Table>
        <TableBody>
          {importedLines.map((row) => (
            <CustomerImportingRow
              doImport={importingStarted}
              key={row.customerCreate.email}
              importedModel={row}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
