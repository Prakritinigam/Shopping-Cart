import withHOC from "./withHOC";

function OrderPlaced() {
    return <h2>Thank you, your orders have been placed.</h2>;
}

export default withHOC(OrderPlaced);