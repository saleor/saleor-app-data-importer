import { Client, gql } from "urql";
import { CustomerColumnSchema } from "../importers/customers-importer-nuvo/customers-columns-model";
import { CustomerCreateDocument } from "../../../generated/graphql";

gql`
  mutation CustomerCreate($input: UserCreateInput!) {
    customerCreate(input: $input) {
      user {
        id
      }
      errors {
        message
      }
    }
  }
`;

export class CustomerCreator {
  constructor(private client: Client) {}

  createCustomer(inputData: CustomerColumnSchema) {
    return this.client.mutation(CustomerCreateDocument, {
      input: {
        ...inputData.customerCreate,
        defaultBillingAddress: null, // todo with enum mapping
        defaultShippingAddress: null, // todo with enum mapping
      },
    });
  }
}
