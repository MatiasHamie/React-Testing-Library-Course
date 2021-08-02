import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexs/OrderDetails";

// la idea es que si queremos renderizar con wrappers, importemos este render
// pero si no lo necesito, importo directo el render en mi test de @testing-library/react

// ui: cualquier jsx que estamos intentando renderizar
// options
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
