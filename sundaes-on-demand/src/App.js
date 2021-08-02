import Container from "react-bootstrap/Container";
import { OrderDetailsProvider } from "./contexs/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirmation page dos not need provider */}
    </Container>
  );
}

export default App;
